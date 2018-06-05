import {Component, OnInit, QueryList, ViewChild} from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { ListPicker } from "tns-core-modules/ui/list-picker";
import { Page } from "tns-core-modules/ui/page";
import { Groep } from "~/shared/models/groep";
import { GroepCustomer } from "~/shared/models/groepCustomer.model";
import { SuitSize } from "~/shared/models/suitSize.model";
import { CustomerService } from "~/shared/services/customer.service";
import { GroepService } from "~/shared/services/groep.service";
import { SuitSizeService } from "~/shared/services/suitSize.service";
import {RadDataFormComponent} from "nativescript-ui-dataform/angular";

/* ***********************************************************
* Before you can navigate to this page from your app, you need to reference this page's module in the
* global app router module. Add the following object to the global array of routes:
* { path: "sizes", loadChildren: "./sizes/sizes.module#SizesModule" }
* Note that this simply points the path to the page module file. If you move the page, you need to update the route too.
*************************************************************/

@Component({
    selector: "Sizes",
    moduleId: module.id,
    providers: [GroepService, CustomerService, SuitSizeService],
    templateUrl: "./sizes.component.html"
})
export class SizesComponent implements OnInit {
    @ViewChild("cdf") cdf: QueryList<RadDataFormComponent>;
    groeps: Array<Groep> = [];
    items: object = {};
    groep: Groep;
    hasGroeps: boolean = false;
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
                        this.items = {
                            items: this.groeps,
                            length: this.groeps.length,
                            getItem(index) {
                                const item = this.items[index];

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
        const appSettings = require("application-settings");
        if (appSettings.hasKey("groepId")) {
            const groepId = appSettings.getString("groepId");

            this.customerService.getAllByGroepAction(groepId)
                .subscribe(
                    (result: Array<GroepCustomer>) => {

                        this.customers = result;
                        console.log("found me some customers");
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
        console.dir(groepCustomer);
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
