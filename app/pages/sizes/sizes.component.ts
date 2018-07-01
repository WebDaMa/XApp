import { Component, OnInit, QueryList, ViewChild } from "@angular/core";
import { RadDataForm } from "nativescript-ui-dataform";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { ListPicker } from "tns-core-modules/ui/list-picker";
import { Page } from "tns-core-modules/ui/page";
import { Settings } from "~/settings/settings";
import { BusCustomer } from "~/shared/models/busCustomer.model";
import { Groep } from "~/shared/models/groep.model";
import { SizeCustomer } from "~/shared/models/sizeCustomer.model";
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
    customers: Array<SizeCustomer> = [];
    sizes: Array<object> = [];

    constructor(private groepService: GroepService, private customerService: CustomerService,
                private suitSizeService: SuitSizeService, private page: Page) {
    }

    ngOnInit(): void {
        this.getSizes();
        this.getGroeps();
        this.page.on(Page.navigatingToEvent, () => {
            this.getGroeps();
        });
    }

    selectedIndexChanged(args) {
        const picker = <ListPicker>args.object;
        const appSettings = require("application-settings");

        if (this.groeps.length > 0) {
            this.groep = this.groeps[picker.selectedIndex];
            this.getCustomers();
        }
    }

    getGroeps(): void {
        const locationId = Settings.getLocation();
        const date = Settings.getDate();

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
                        console.log("found me some size groeps");
                        this.groep = this.groeps[0];
                    }

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
        if ((typeof this.groep !== "undefined" &&
        this.groep !== null ? this.groep.id : void 0) != null) {
            this.isBusy = true;
            this.customerService.getAllByGroepAction(this.groep.id)
                .subscribe(
                    (result: Array<SizeCustomer>) => {

                        this.customers = result;
                        console.log("found me some size customers");
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
                    this.sizes = [{key: "0", label: "Kies een Maat"}];
                    this.sizes = [...this.sizes, ...result.map(({ id, name }) => ({ key: id, label: name }))];
                },
                (error) => {
                    console.dir(error);
                    /*TODO: handle errors*/
                }
            );

    }

    dfPropertyCommitted(args) {
        const dataForm = <RadDataForm>args.object;
        const sizeCustomer: SizeCustomer = <SizeCustomer> JSON.parse(dataForm.editedObject);

        if (sizeCustomer.size !== "0") {
            this.customerService.putCustomerSizeAction(sizeCustomer)
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
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

}
