import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import * as app from "application";
import { RouterExtensions } from "nativescript-angular";
import { RadDataForm } from "nativescript-ui-dataform";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { Page } from "tns-core-modules/ui/page";
import { SearchBar } from "ui/search-bar";
import { AgenciesActionComponent } from "~/components/agencies-action/agencies-action.component";
import { Settings } from "~/settings/settings";
import { Lodging } from "~/shared/models/lodging.model";
import { LodgingCustomer } from "~/shared/models/lodgingCustomer.model";
import { CustomerService } from "~/shared/services/customer.service";

@Component({
    selector: "Lodging",
    moduleId: module.id,
    providers: [CustomerService],
    templateUrl: "./lodging.component.html"
})
export class LodgingComponent implements OnInit, AfterViewInit {
    isBusy: boolean;
    searchPhrase: string = "";

    lodging: Lodging = {
        date: "",
        customers: []
    };

    filteredCustomers: Array<LodgingCustomer> = [];

    @ViewChild(AgenciesActionComponent, {static: false}) agenciesAction: AgenciesActionComponent;
    constructor(private customerService: CustomerService,
                private routerExtensions: RouterExtensions, private page: Page) {
    }

    ngOnInit(): void {
        this.page.backgroundSpanUnderStatusBar = true;
        this.page.on("loaded", (args) => {
            if (this.page.android) {
                this.page.android.setFitsSystemWindows(true);
            }
        });
    }

    ngAfterViewInit() {
        this.agenciesAction.agencyEmitter.subscribe((agency) => {
            this.getCustomersLodging();
        });
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

        if ((typeof this.agenciesAction.agency !== "undefined" &&
        this.agenciesAction.agency !== null ? this.agenciesAction.agency.id : void 0) != null) {
            this.customerService.getAllByAgencyForLodgingAndLocationAndPeriodAction(this.agenciesAction.agency.id,
                locationId, date)
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

    onSubmit(args) {
        const searchBar = args.object as SearchBar;
        this.filterCustomers(searchBar.text);
    }

    onTextChanged(args) {
        const searchBar = args.object as SearchBar;
        this.filterCustomers(searchBar.text);
    }

    onClear(args) {
        this.filteredCustomers = [];
    }

    filterCustomers(filter: string) {
        this.searchPhrase = filter;
        this.filteredCustomers = this.lodging.customers.filter((customer) => {
            return customer.customer.toLowerCase().includes(filter.toLowerCase());
        });
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
}
