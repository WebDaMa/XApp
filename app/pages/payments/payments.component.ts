import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import * as app from "application";
import { RouterExtensions } from "nativescript-angular";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as dialogs from "tns-core-modules/ui/dialogs";
import { GroupsActionComponent } from "~/components/groups-action/groups-action.component";
import { Settings } from "~/settings/settings";
import { Group } from "~/shared/models/groep.model";
import { PaymentCustomer } from "~/shared/models/paymentCustomer.model";
import { CustomerService } from "~/shared/services/customer.service";

@Component({
    selector: "Payments",
    moduleId: module.id,
    providers: [CustomerService],
    templateUrl: "./payments.component.html"
})
export class PaymentsComponent implements OnInit, AfterViewInit {
    customers: Array<PaymentCustomer> = [];

    isBusy: boolean = true;

    @ViewChild(GroupsActionComponent, {static: false}) groupsAction: GroupsActionComponent;
    constructor(private customerService: CustomerService,
                private routerExtensions: RouterExtensions) {
    }

    ngOnInit(): void {
        this.alertSaturday();
    }

    ngAfterViewInit() {
        this.groupsAction.groupEmitter.subscribe((group: Group) => {
            this.getCustomers(group);
        });
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

    getCustomers(group: Group): void {
        if ((typeof group !== "undefined" &&
        group !== null ? group.id : void 0) != null) {
            this.isBusy = true;
            this.customerService.getAllByGroepForPaymentsAction(group.id)
                .subscribe(
                    (result: Array<PaymentCustomer>) => {

                        this.customers = result;
                        console.log("found me some costs customers");
                        this.isBusy = false;
                    },
                    (error) => {
                        console.dir(error);
                        this.isBusy = false;
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
