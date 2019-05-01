import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RouterExtensions } from "nativescript-angular";
import { RadDataForm } from "nativescript-ui-dataform";
import { ListPicker } from "tns-core-modules/ui/list-picker";
import { Page } from "tns-core-modules/ui/page";
import { Settings } from "~/settings/settings";
import { Agency } from "~/shared/models/agency.model";
import { Lodging } from "~/shared/models/lodging.model";
import { LodgingCustomer } from "~/shared/models/lodgingCustomer.model";
import { AgencyService } from "~/shared/services/agency.service";
import { CustomerService } from "~/shared/services/customer.service";

@Component({
    selector: "Lodging",
    moduleId: module.id,
    providers: [CustomerService, AgencyService],
    templateUrl: "./lodging.component.html"
})
export class LodgingComponent implements OnInit {
    selectedIndex: number = 0;

    isBusy: boolean;

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
                private routerExtensions: RouterExtensions, private page: Page, private activeRoute: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.getAgencies();
        this.page.backgroundSpanUnderStatusBar = true;
        this.page.on("loaded", (args) => {
            if (this.page.android) {
                this.page.android.setFitsSystemWindows(true);
            }
        });
    }

    getAgencies(): void {
        const date = Settings.getDate();
        const locationId = Settings.getLocation();

        this.isBusy = true;

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
                    this.isBusy = false;
                    this.getCustomersLodging();
                },
                (error) => {
                    console.dir(error);
                    this.hasAgencies = false;
                    this.isBusy = false;
                    /*TODO: handle errors*/
                }
            );
    }

    dfPropertyLodgingCommitted(args) {
        const dataForm = <RadDataForm>args.object;
        const lodgingCustomer: LodgingCustomer = <LodgingCustomer> JSON.parse(dataForm.editedObject);

        this.isBusy = true;
        this.customerService.putLodgingLayoutCustomerAction(lodgingCustomer)
            .subscribe(
                () => {
                    console.log("Updated customer");
                    this.isBusy = false;
                },
                (error) => {
                    console.dir(error);
                    this.isBusy = false;
                    /*TODO: handle errors*/
                }
            );
    }

    getCustomersLodging(): void {
        this.isBusy = true;
        const date = Settings.getDate();
        const locationId = Settings.getLocation();

        if ((typeof this.agency !== "undefined" &&
        this.agency !== null ? this.agency.id : void 0) != null) {
            this.customerService.getAllByAgencyForLodgingAndLocationAndPeriodAction(this.agency.id, locationId, date)
                .subscribe(
                    (result: Lodging) => {
                        this.lodging = result;
                        this.isBusy = false;
                    },
                    (error) => {
                        console.dir(error);
                        /*TODO: handle errors*/
                        this.isBusy = false;
                    }
                );
        }
    }

    selectedIndexAgencyChanged(args) {
        const picker = <ListPicker>args.object;

        if (this.agencies.length > 0) {
            this.agency = this.agencies[picker.selectedIndex];
            this.getCustomersLodging();
        }

    }

    goBack() {
        this.routerExtensions.navigate(["/tabs/default"], {
            transition: {
                name: "fade"
            }
        });
    }
}
