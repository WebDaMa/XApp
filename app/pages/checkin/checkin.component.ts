import { Component, OnInit } from "@angular/core";
import { RadDataForm } from "nativescript-ui-dataform";
import { Page } from "tns-core-modules/ui/page";
import { SegmentedBar, SegmentedBarItem } from "tns-core-modules/ui/segmented-bar";
import { BusCustomer } from "~/shared/models/busCustomer.model";
import { BusPlace } from "~/shared/models/busPlace.model";
import { CheckinBus } from "~/shared/models/checkinBus.model";
import { GroepCustomer } from "~/shared/models/groepCustomer.model";
import { CustomerService } from "~/shared/services/customer.service";

/* ***********************************************************
* Before you can navigate to this page from your app, you need to reference this page's module in the
* global app router module. Add the following object to the global array of routes:
* { path: "sizes", loadChildren: "./sizes/sizes.module#SizesModule" }
* Note that this simply points the path to the page module file. If you move the page, you need to update the route too.
*************************************************************/

@Component({
    selector: "Checkin",
    moduleId: module.id,
    providers: [CustomerService],
    templateUrl: "./checkin.component.html"
})
export class CheckinComponent implements OnInit {
    BUS_HEEN: string = "Bus Heen";
    BUS_TERUG: string = "Bus Terug";
    VERBLIJF: string = "Verblijf";
    VOLPENSION: string = "Vol Pension";

    isBusy: boolean = true;

    items: Array<SegmentedBarItem> = [];
    selectedIndex = 0;
    titles = [this.BUS_HEEN, this.BUS_TERUG, this.VERBLIJF, this.VOLPENSION];

    checkinBusGo: CheckinBus = {
        total: "0",
        places: [],
        date: ""
    };
    checkinBusBack: CheckinBus = {
        total: "0",
        places: [],
        date: ""
    };

    constructor(private customerService: CustomerService, private page: Page) {
    }

    ngOnInit(): void {
        for (const title of this.titles) {
            const segmentedBarItem = <SegmentedBarItem>new SegmentedBarItem();
            segmentedBarItem.title = title;
            this.items.push(segmentedBarItem);
        }
        this.selectedIndex = 0;
    }

    onSelectedIndexChange(args) {
        const segmentedBar = <SegmentedBar>args.object;
        this.selectedIndex = segmentedBar.selectedIndex;

        this.loadData();
    }

    getCustomersBusGo(): void {
        const appSettings = require("application-settings");

        const now = new Date();
        let date: string = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate();
        if (appSettings.hasKey("materialDate")) {
            date = appSettings.getString("materialDate");
        }

        this.customerService.getBusGoCustomersByWeek(date)
            .subscribe(
                (result: CheckinBus) => {
                    this.checkinBusGo = result;
                    this.isBusy = false;
                },
                (error) => {
                    console.dir(error);
                    /*TODO: handle errors*/
                }
            );
    }

    getCustomersBusBack(): void {
        const appSettings = require("application-settings");

        const now = new Date();
        let date: string = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate();
        if (appSettings.hasKey("materialDate")) {
            date = appSettings.getString("materialDate");
        }

        this.customerService.getBusBackCustomersByWeek(date)
            .subscribe(
                (result: CheckinBus) => {
                    this.checkinBusBack = result;
                    this.isBusy = false;
                },
                (error) => {
                    console.dir(error);
                    /*TODO: handle errors*/
                }
            );
    }

    dfPropertyGoCommitted(args) {
        const dataForm = <RadDataForm>args.object;
        const busCostumer: BusCustomer = <BusCustomer> JSON.parse(dataForm.editedObject);

        this.customerService.putBusGoCustomerAction(busCostumer)
            .subscribe(
                (res) => {
                    console.log("Updated customer");
                    this.isBusy = false;
                },
                (error) => {
                    console.dir(error);
                    /*TODO: handle errors*/
                }
            );
    }

    dfPropertyBackCommitted(args) {
        const dataForm = <RadDataForm>args.object;
        const busCostumer: BusCustomer = <BusCustomer> JSON.parse(dataForm.editedObject);

        this.customerService.putBusBackCustomerAction(busCostumer)
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

    loadData(): void {
        this.isBusy = true;
        switch (this.titles[this.selectedIndex]) {
            case this.BUS_HEEN:
                this.getCustomersBusGo();
                break;

            case this.BUS_TERUG:
                this.getCustomersBusBack();
                break;

            case this.VERBLIJF:

                break;

            case this.VOLPENSION:

                break;
        }
    }

}
