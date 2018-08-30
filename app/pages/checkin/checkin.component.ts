import { Component, OnInit, ViewChild } from "@angular/core";
import { RouterExtensions } from "nativescript-angular";
import { ListPicker } from "tns-core-modules/ui/list-picker";
import { Page } from "tns-core-modules/ui/page";
import { Switch } from "tns-core-modules/ui/switch";
import { Settings } from "~/settings/settings";
import { BillCustomer } from "~/shared/models/billCustomer.model";
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

    constructor(private groepService: GroepService, private customerService: CustomerService,
                private routerExtensions: RouterExtensions, private page: Page) {
        this.page.on(Page.navigatingToEvent, () => {
            this.getCustomers();
        });
    }

    ngOnInit(): void {
        this.getGroeps();
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
                        console.log("found me some checkin groeps");
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
            this.customerService.getAllByGroepForCheckinAction(this.groep.id)
                .subscribe(
                    (result: Array<CheckinCustomer>) => {

                        this.customers = result;
                        console.log("found me some checkin customers");
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

    isInfoComplete(customer: CheckinCustomer): boolean {

        return (customer.email !== "" && customer.email !== null && customer.birthdate !== "" &&
            customer.birthdate !== null
            && customer.expireDate !== "" && customer.expireDate !== null &&
            customer.nationalRegisterNumber !== "" && customer.nationalRegisterNumber !== null);
    }

    checkinCustomer(args, customer: CheckinCustomer) {
        const checkinSwitch = <Switch>args.object;
        const checkin = checkinSwitch.checked;

        customer.checkedin = checkin;

        this.customerService.putCheckinCustomerAction(customer).subscribe(
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

    goBack() {
        this.routerExtensions.backToPreviousPage();
    }
}
