import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RouterExtensions } from "nativescript-angular";
import { ListPicker } from "tns-core-modules/ui/list-picker";
import { Page } from "tns-core-modules/ui/page";
import { Switch } from "tns-core-modules/ui/switch";
import { Settings } from "~/settings/settings";
import { CheckinCustomer } from "~/shared/models/checkinCustomer.model";
import { Groep } from "~/shared/models/groep.model";
import { CustomerService } from "~/shared/services/customer.service";
import { GroepService } from "~/shared/services/groep.service";

@Component({
    selector: "Checkin",
    moduleId: module.id,
    providers: [GroepService, CustomerService],
    templateUrl: "./checkin.component.html"
})
export class CheckinComponent implements OnInit {
    groeps: Array<Groep> = [];
    groepItems: object = {};
    groep: Groep;
    hasGroeps: boolean = false;

    selectedIndex: number = 0;

    customers: Array<CheckinCustomer> = [];

    isBusy: boolean = true;

    lastTimer = {id: null, value: -1};

    constructor(private groepService: GroepService, private customerService: CustomerService,
                private routerExtensions: RouterExtensions, private page: Page,
                private activeRoute: ActivatedRoute) {
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
                        console.log("found me some checkin groeps");
                        this.groep = this.groeps[0];
                    }

                    this.getCustomers();
                    this.isBusy = false;

                },
                (error) => {
                    console.dir(error);
                    this.isBusy = false;
                    /*TODO: handle errors*/
                }
            );
    }

    getCustomers(): void {
        if ((typeof this.groep !== "undefined" &&
        this.groep !== null ? this.groep.id : void 0) != null) {
            this.isBusy = true;
            this.customerService.getAllByGroepForCheckinAction(this.groep.id)
                .subscribe(
                    (result: Array<CheckinCustomer>) => {

                        for (const customer of result) {
                            customer.isComplete = this.isInfoComplete(customer);
                        }

                        this.customers = result;
                        console.log("found me some checkin customers");
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

    isInfoComplete(customer: CheckinCustomer): boolean {

        return (customer.email !== "" && customer.email !== null && customer.birthdate !== "" &&
            customer.birthdate !== null
            && customer.expireDate !== "" && customer.expireDate !== null &&
            customer.nationalRegisterNumber !== "" && customer.nationalRegisterNumber !== null);
    }

    checkinCustomer(args, customer: CheckinCustomer) {
        const checkinSwitch = <Switch>args.object;
        customer.checkedin = checkinSwitch.checked;

        this.isBusy = true;

        this.customerService.putCheckinCustomerAction(customer).subscribe(
            (res) => {
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

    goBack() {
        this.routerExtensions.navigate(["/tabs/default"], {
            transition: {
                name: "fade"
            }
        });
    }
}
