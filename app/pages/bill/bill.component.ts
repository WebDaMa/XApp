import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { RouterExtensions } from "nativescript-angular";
import * as dialogs from "tns-core-modules/ui/dialogs";
import { GroupsActionComponent } from "~/components/groups-action/groups-action.component";
import { Settings } from "~/settings/settings";
import { BillCustomer } from "~/shared/models/billCustomer.model";
import { CustomerService } from "~/shared/services/customer.service";
import {RadSideDrawer} from "nativescript-ui-sidedrawer";
import * as app from "application";

@Component({
    selector: "Bill",
    moduleId: module.id,
    providers: [CustomerService],
    templateUrl: "./bill.component.html"
})
export class BillComponent implements OnInit, AfterViewInit {
    customers: Array<BillCustomer> = [];

    isBusy: boolean = true;

    @ViewChild(GroupsActionComponent, {static: false}) groupsAction: GroupsActionComponent;
    constructor(private customerService: CustomerService,
                private routerExtensions: RouterExtensions) {
    }

    ngOnInit(): void {
        this.alertSaturday();
    }

    ngAfterViewInit() {
        this.groupsAction.groupEmitter.subscribe((group) => {
            this.getCustomers();
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

    getCustomers(): void {
        if ((typeof this.groupsAction.group !== "undefined" &&
        this.groupsAction.group !== null ? this.groupsAction.group.id : void 0) != null) {
            this.isBusy = true;
            this.customerService.getAllByGroepForBillAction(this.groupsAction.group.id)
                .subscribe(
                    (result: Array<BillCustomer>) => {

                        this.customers = result;
                        console.log("found me some bill customers");
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
