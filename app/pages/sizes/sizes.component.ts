import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular";
import { RadDataForm } from "nativescript-ui-dataform";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import * as dialogs from "tns-core-modules/ui/dialogs";
import { ListPicker } from "tns-core-modules/ui/list-picker";
import { Page } from "tns-core-modules/ui/page";
import { Settings } from "~/settings/settings";
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
    lastTimer = {id: null, value: -1};

    constructor(private groepService: GroepService, private customerService: CustomerService,
                private suitSizeService: SuitSizeService, private page: Page, private routerExtensions: RouterExtensions) {
    }

    ngOnInit(): void {
        this.getSizes();
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

    selectedIndexChangeDebouncer(args) {
        const picker = <ListPicker>args.object;
        // If we are the same index as the last time, or the next time; we skip doing anything.
        if (picker.selectedIndex === this.lastTimer.value) { return; }

        // Grab our current value...
        this.lastTimer.value = picker.selectedIndex;

        // If the timer is already running, clear it...
        if (this.lastTimer.id != null) { clearTimeout(this.lastTimer.id); }

        // Start a new timer  (runs in 1/4 of a second)
        this.lastTimer.id = setTimeout(() => {
            this.lastTimer.id = null;
            this.selectedIndexChanged(args);
        }, 350);
    }

    selectedIndexChanged(args) {
        const picker = <ListPicker>args.object;

        if (this.groeps.length > 0) {
            this.groep = this.groeps[picker.selectedIndex];
            this.getCustomers();
        }
    }

    getGroeps(): void {
        const locationId = Settings.getLocation();
        const date = Settings.getDate();

        this.isBusy = true;

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

                    this.isBusy = false;

                    this.getCustomers();

                },
                (error) => {
                    console.dir(error);
                    this.isBusy = false;
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
                        this.isBusy = false;
                        /*TODO: handle errors*/
                    }
                );
        }

    }

    getSizes(): void {
        this.isBusy = true;
        this.suitSizeService.getAllAction()
            .subscribe(
                (result: Array<SuitSize>) => {
                    this.sizes = [{key: "0", label: "Kies een Maat"}];
                    this.sizes = [...this.sizes, ...result.map(({ id, name }) => ({ key: id, label: name }))];
                    this.isBusy = false;
                },
                (error) => {
                    console.dir(error);
                    this.isBusy = false;
                    /*TODO: handle errors*/
                }
            );

    }

    dfPropertyCommitted(args) {
        const dataForm = <RadDataForm>args.object;
        const sizeCustomer: SizeCustomer = <SizeCustomer> JSON.parse(dataForm.editedObject);

        if (sizeCustomer.size !== "0") {
            this.isBusy = true;
            this.customerService.putCustomerSizeAction(sizeCustomer)
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
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

}
