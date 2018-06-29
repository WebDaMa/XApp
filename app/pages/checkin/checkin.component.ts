import { Component, OnInit } from "@angular/core";
import { RadDataForm } from "nativescript-ui-dataform";
import { ListPicker } from "tns-core-modules/ui/list-picker";
import { Page } from "tns-core-modules/ui/page";
import { SegmentedBar, SegmentedBarItem } from "tns-core-modules/ui/segmented-bar";
import { Settings } from "~/settings/settings";
import { Agency } from "~/shared/models/agency.model";
import { BusCustomer } from "~/shared/models/busCustomer.model";
import { CheckinBus } from "~/shared/models/checkinBus.model";
import { Lodging } from "~/shared/models/lodging.model";
import { LodgingCustomer } from "~/shared/models/lodgingCustomer.model";
import { Volpension } from "~/shared/models/volpension.model";
import { AgencyService } from "~/shared/services/agency.service";
import { CustomerService } from "~/shared/services/customer.service";

@Component({
    selector: "Checkin",
    moduleId: module.id,
    providers: [CustomerService, AgencyService],
    templateUrl: "./checkin.component.html"
})
export class CheckinComponent implements OnInit {
    BUS_HEEN: string = "Bus Heen";
    BUS_TERUG: string = "Bus Terug";
    VERBLIJF: string = "Verblijf";
    VOLPENSION: string = "Volpension";

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

    volpension: Volpension = {
        total: "0",
        allInTypes: [],
        date: ""
    };

    agencies: Array<Agency> = [];
    agency: Agency = {
        id: "",
        name: ""
    };
    agenciesItems: object = {};
    hasAgencies: boolean = false;

    lodging: Lodging = {
        date: "",
        customers: []
    };

    constructor(private customerService: CustomerService, private agencyService: AgencyService,
                private page: Page) {
    }

    ngOnInit(): void {
        for (const title of this.titles) {
            const segmentedBarItem = <SegmentedBarItem>new SegmentedBarItem();
            segmentedBarItem.title = title;
            this.items.push(segmentedBarItem);
        }
        this.selectedIndex = 0;
        this.page.on(Page.navigatingToEvent, () => {
            this.loadData();
        });
    }

    onSelectedIndexChange(args) {
        const segmentedBar = <SegmentedBar>args.object;
        this.selectedIndex = segmentedBar.selectedIndex;

        this.loadData();
    }

    getCustomersBusGo(): void {
        const date = Settings.getDate();

        this.customerService.getBusGoCustomersByWeek(date)
            .subscribe(
                (result: CheckinBus) => {
                    this.checkinBusGo = result;
                    console.log("got me some bus customers");
                    this.isBusy = false;
                },
                (error) => {
                    console.dir(error);
                    /*TODO: handle errors*/
                }
            );
    }

    getCustomersVolpension(): void {
        const date = Settings.getDate();
        const locationId = Settings.getLocation();

        this.customerService.getAllByAllInTypeForLocationAndPeriodAction(locationId, date)
            .subscribe(
                (result: Volpension) => {
                    this.volpension = result;
                    console.log("got me some volpension customers");
                    this.isBusy = false;
                },
                (error) => {
                    console.dir(error);
                    /*TODO: handle errors*/
                }
            );
    }

    getAgencies(): void {
        const date = Settings.getDate();
        const locationId = Settings.getLocation();

        this.agencyService.getAllAgenciesForWeekAndLocationAction(date, locationId)
            .subscribe(
                (result: Array<Agency>) => {
                    this.agencies = result;

                    if (this.agencies.length > 0) {
                        this.agenciesItems = {
                            items: this.agencies,
                            length: this.agencies.length,
                            getItem: (index) => {
                                const item = this.agencies[index];

                                return item.name;
                            }
                        };

                        this.hasAgencies = true;
                        this.agency = this.agencies[0];
                        console.log("found me some agencies");
                    }
                    this.getCustomersLodging();
                },
                (error) => {
                    console.dir(error);
                    this.hasAgencies = false;
                    /*TODO: handle errors*/
                }
            );
    }

    getCustomersBusBack(): void {
        const date = Settings.getDate();

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

    dfPropertyLodgingCommitted(args) {
        const dataForm = <RadDataForm>args.object;
        const lodgingCustomer: LodgingCustomer = <LodgingCustomer> JSON.parse(dataForm.editedObject);
        console.log(lodgingCustomer);

        this.customerService.putLodgingLayoutCustomerAction(lodgingCustomer)
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

    getCustomersLodging(): void {
        this.isBusy = true;
        const date = Settings.getDate();
        const locationId = Settings.getLocation();

        this.customerService.getAllByAgencyForLodgingAndLocationAndPeriodAction(this.agency.id, locationId, date)
            .subscribe(
                (result: Lodging) => {
                    this.lodging = result;
                    this.isBusy = false;
                },
                (error) => {
                    console.dir(error);
                    /*TODO: handle errors*/
                }
            );
    }

    selectedIndexAgencyChanged(args) {
        const picker = <ListPicker>args.object;

        if (this.agencies.length > 0) {
            this.agency = this.agencies[picker.selectedIndex];
            this.getCustomersLodging();
        }

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
                this.getAgencies();
                break;

            case this.VOLPENSION:
                this.getCustomersVolpension();
                break;
        }
    }

}
