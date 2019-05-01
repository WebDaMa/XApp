import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RouterExtensions } from "nativescript-angular";
import { ListPicker } from "tns-core-modules/ui/list-picker";
import { Page } from "tns-core-modules/ui/page";
import { Settings } from "~/settings/settings";
import { Groep } from "~/shared/models/groep.model";
import { PaymentCustomer } from "~/shared/models/paymentCustomer.model";
import { CustomerService } from "~/shared/services/customer.service";
import { GroepService } from "~/shared/services/groep.service";

@Component({
    selector: "Payments",
    moduleId: module.id,
    providers: [GroepService, CustomerService],
    templateUrl: "./payments.component.html"
})
export class PaymentsComponent implements OnInit {
    groeps: Array<Groep> = [];
    groepItems: object = {};
    groep: Groep;
    hasGroeps: boolean = false;

    selectedIndex: number = 0;

    customers: Array<PaymentCustomer> = [];

    isBusy: boolean = true;

    constructor(private groepService: GroepService, private customerService: CustomerService,
                private routerExtensions: RouterExtensions, private page: Page, private activeRoute: ActivatedRoute) {
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
                        console.log("found me some size groeps");
                        this.groep = this.groeps[0];
                    }

                    this.getCustomers();

                },
                (error) => {
                    console.dir(error);
                    this.hasGroeps = false;
                    /*TODO: handle errors*/
                }
            );
    }

    getCustomers(): void {
        if ((typeof this.groep !== "undefined" &&
        this.groep !== null ? this.groep.id : void 0) != null) {
            this.isBusy = true;
            this.customerService.getAllByGroepForPaymentsAction(this.groep.id)
                .subscribe(
                    (result: Array<PaymentCustomer>) => {

                        this.customers = result;
                        console.log("found me some costs customers");
                        this.isBusy = false;
                    },
                    (error) => {
                        console.dir(error);
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
