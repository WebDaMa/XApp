import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { RouterExtensions } from "nativescript-angular";
import { RadDataForm } from "nativescript-ui-dataform";
import { Page } from "tns-core-modules/ui/page";
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

    lodging: Lodging = {
        date: "",
        customers: []
    };

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

    goBack() {
        this.routerExtensions.navigate(["/tabs/default"], {
            transition: {
                name: "fade"
            }
        });
    }
}
