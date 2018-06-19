import { Component, OnInit, QueryList, ViewChild} from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { ListPicker } from "tns-core-modules/ui/list-picker";
import { Page } from "tns-core-modules/ui/page";
import { Groep } from "~/shared/models/groep.model";
import { GroepCustomer } from "~/shared/models/groepCustomer.model";
import { SuitSize } from "~/shared/models/suitSize.model";
import { CustomerService } from "~/shared/services/customer.service";
import { GroepService } from "~/shared/services/groep.service";
import { SuitSizeService } from "~/shared/services/suitSize.service";

@Component({
    selector: "Sizes",
    moduleId: module.id,
    providers: [GroepService, CustomerService, SuitSizeService],
    templateUrl: "./sizes.component.html"
})
export class SizesComponent implements OnInit {
    groeps: Array<Groep> = [];
    groepItems: object = {};
    groep: Groep;
    hasGroeps: boolean = false;

    isBusy: boolean = true;

    selectedIndex: number = 0;
    customers: Array<GroepCustomer> = [];
    sizes: Array<object> = [];

    constructor(private groepService: GroepService, private customerService: CustomerService,
                private suitSizeService: SuitSizeService, private page: Page) {
    }

    ngOnInit(): void {
        this.getSizes();
        this.page.on(Page.navigatingToEvent, () => {
            this.getGroeps();
        });
    }

    selectedIndexChanged(args) {
        const picker = <ListPicker>args.object;
        const appSettings = require("application-settings");

        if (this.groeps.length > 0) {
            appSettings.setNumber("groepIndex", picker.selectedIndex);
            this.groep = this.groeps[picker.selectedIndex];
            appSettings.setString("groepId", this.groep.id);
            this.getCustomers();
        }

    }

    getGroeps(): void {
        const appSettings = require("application-settings");
        let locationId: string = "1";
        if (appSettings.hasKey("locationId")) {
            locationId = appSettings.getString("locationId");
        }

        const now = new Date();
        let date: string = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate();
        if (appSettings.hasKey("materialDate")) {
            date = appSettings.getString("materialDate");
        }

        this.groepService.getAllGroepsForWeekAndLocationAction(date, locationId)
            .subscribe(
                (result: Array<Groep>) => {

                    this.groeps = result;

                    if (this.groeps.length > 0) {
                        this.groepItems = {
                            items: this.groeps,
                            length: this.groeps.length,
                            getItem: (index) => {
                                const item = this.groeps[index];

                                return item.name;
                            }
                        };

                        this.hasGroeps = true;
                        console.log("found me some groeps");
                    }

                    this.selectedIndex = appSettings.hasKey("groepIndex") ?
                        appSettings.getNumber("groepIndex") : 0;

                    this.getCustomers();

                },
                (error) => {
                    console.dir(error);
                    this.hasGroeps = false;
                    /*TODO: handle errors*/
                }
            );
    }

    getCustomers(): void {
        this.isBusy = true;
        const appSettings = require("application-settings");
        if (appSettings.hasKey("groepId")) {
            const groepId = appSettings.getString("groepId");

            this.customerService.getAllByGroepAction(groepId)
                .subscribe(
                    (result: Array<GroepCustomer>) => {

                        this.customers = result;
                        console.log("found me some customers");
                        this.isBusy = false;
                    },
                    (error) => {
                        console.dir(error);
                        this.hasGroeps = false;
                        /*TODO: handle errors*/
                    }
                );
        }

    }

    getSizes(): void {
        this.suitSizeService.getAllAction()
            .subscribe(
                (result: Array<SuitSize>) => {

                    this.sizes = result.map(({ id, name }) => ({ key: id, label: name }));
                },
                (error) => {
                    console.dir(error);
                    /*TODO: handle errors*/
                }
            );

    }

    dfPropertyCommitted(groepCustomer: GroepCustomer) {
        this.customerService.putCustomerSizeAction(groepCustomer)
            .subscribe(
                () => {
                    console.log("Updated customer");
                },
                (error) => {
                    console.dir(error);
                    /*TODO: handle errors*/
                }
            );
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

}
