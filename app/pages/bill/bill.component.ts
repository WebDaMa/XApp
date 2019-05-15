import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RouterExtensions } from "nativescript-angular";
import { ListPicker } from "tns-core-modules/ui/list-picker";
import { Page } from "tns-core-modules/ui/page";
import { Settings } from "~/settings/settings";
import { BillCustomer } from "~/shared/models/billCustomer.model";
import { Groep } from "~/shared/models/groep.model";
import { CustomerService } from "~/shared/services/customer.service";
import { GroepService } from "~/shared/services/groep.service";

@Component({
    selector: "Bill",
    moduleId: module.id,
    providers: [GroepService, CustomerService],
    templateUrl: "./bill.component.html"
})
export class BillComponent implements OnInit {
    groeps: Array<Groep> = [];
    groepItems: object = {};
    groep: Groep;
    hasGroeps: boolean = false;

    selectedIndex: number = 0;

    customers: Array<BillCustomer> = [];

    isBusy: boolean = true;

    lastTimer = {id: null, value: -1};

    constructor(private groepService: GroepService, private customerService: CustomerService,
                private routerExtensions: RouterExtensions, private page: Page, private activeRoute: ActivatedRoute) {
        this.page.on(Page.navigatingToEvent, () => {
            this.getCustomers();
        });
    }

    ngOnInit(): void {
        this.getGroeps();
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
                        console.log("found me some bill groeps");
                        this.groep = this.groeps[0];
                    }

                    this.getCustomers();

                },
                (error) => {
                    console.dir(error);
                    /*TODO: handle errors*/
                }
            );
    }

    getCustomers(): void {
        if ((typeof this.groep !== "undefined" &&
        this.groep !== null ? this.groep.id : void 0) != null) {
            this.isBusy = true;
            this.customerService.getAllByGroepForBillAction(this.groep.id)
                .subscribe(
                    (result: Array<BillCustomer>) => {

                        this.customers = result;
                        console.log("found me some bill customers");
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

    goBack() {
        this.routerExtensions.navigate(["/tabs/default"], {
            transition: {
                name: "fade"
            }
        });
    }
}
