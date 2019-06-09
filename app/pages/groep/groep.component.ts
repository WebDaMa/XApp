import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular";
import { RadDataForm } from "nativescript-ui-dataform";
import * as dialogs from "tns-core-modules/ui/dialogs";
import { Page } from "tns-core-modules/ui/page";
import { Settings } from "~/settings/settings";
import { Groep } from "~/shared/models/groep.model";
import { GroepCustomer } from "~/shared/models/groepCustomer.model";
import { CustomerService } from "~/shared/services/customer.service";
import { GroepService } from "~/shared/services/groep.service";

@Component({
    selector: "Groep",
    moduleId: module.id,
    providers: [GroepService, CustomerService],
    templateUrl: "./groep.component.html"
})
export class GroepComponent implements OnInit {
    groeps: Array<object> = [];

    customers: Array<GroepCustomer> = [];
    hasCustomers: boolean = false;

    isBusy: boolean = true;

    constructor(private groepService: GroepService, private customerService: CustomerService,
                private routerExtensions: RouterExtensions, private page: Page) {
    }

    ngOnInit(): void {
        this.getGroeps();
        this.page.backgroundSpanUnderStatusBar = true;
        this.page.on("loaded", (args) => {
            if (this.page.android) {
                this.page.android.setFitsSystemWindows(true);
            }
        });

        this.alertSaturday();
    }

    alertSaturday(): void {
        const appSettings = require("tns-core-modules/application-settings");

        if (appSettings.hasKey("settingsDate")) {
            const weekDay = new Date(appSettings.getString("settingsDate")).getDay();

            if (weekDay === 6) {
                const options = {
                    title: "Transfer Day",
                    message: "Indien je acties voor huidige groepen wenst te doen, " +
                    "pas je de datum naar vrijdag deze week aan bij settings!",
                    okButtonText: "Settings",
                    cancelButtonText: "Nieuwe groep"
                };

                dialogs.confirm(options).then((result: boolean) => {
                    if (result) {
                        this.routerExtensions.navigate(["/settings"], {
                            transition: {
                                name: "fade"
                            }
                        });
                    }
                });
            }
        }

    }

    getGroeps(): void {
        const locationId = Settings.getLocation();
        const date = Settings.getDate();
        this.isBusy = true;

        this.groepService.getAllGroepsForWeekAndLocationAction(date, locationId)
            .subscribe(
                (result: Array<Groep>) => {

                    this.groeps = [{key: "0", label: "Kies een Groep"}];
                    this.groeps = [...this.groeps, ...result.map(({ id, name }) => ({ key: id, label: name }))];

                    this.isBusy = false;
                    this.getCustomers();
                },
                (error) => {
                    console.dir(error);
                    this.isBusy = false;
                    /*TODO: handle errors*/
                }
            );
    }

    getCustomers(): void {
        this.isBusy = true;
        const locationId = Settings.getLocation();
        const date = Settings.getDate();

        this.customerService.getAllByPeriodIdAndLocationIdForGroupLayoutAction(date, locationId)
            .subscribe(
                (result: Array<GroepCustomer>) => {

                    this.customers = result;
                    if (this.customers.length > 0) {
                        this.hasCustomers = true;
                    }
                    console.log("found me some groep customers");
                    this.isBusy = false;
                },
                (error) => {
                    console.dir(error);
                    /*TODO: handle errors*/
                    this.isBusy = false;
                }
            );

    }

    dfPropertyCommitted(args) {
        const dataForm = <RadDataForm>args.object;
        const groepCustomer: GroepCustomer = <GroepCustomer> JSON.parse(dataForm.editedObject);

        if (groepCustomer.groupLayoutId !== "0") {
            this.isBusy = true;

            this.customerService.putGroepCustomerAction(groepCustomer)
                .subscribe(
                    (res) => {
                        console.log("Updated customer");
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
