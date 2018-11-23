import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { PageRoute, RouterExtensions } from "nativescript-angular";
import { switchMap } from "rxjs/operators";
import { Page } from "tns-core-modules/ui/page";
import { Payment } from "~/shared/models/payment.model";
import { CustomerService } from "~/shared/services/customer.service";
import { GroepService } from "~/shared/services/groep.service";

@Component({
    selector: "PaymentsAdd",
    moduleId: module.id,
    providers: [GroepService, CustomerService],
    templateUrl: "./paymentsAdd.component.html"
})
export class PaymentsAddComponent implements OnInit {
    isBusy: boolean = false;

    payment: Payment = {
        customerId: 0,
        description: "",
        price: 0
    };

    constructor(private groepService: GroepService, private customerService: CustomerService,
                private routerExtensions: RouterExtensions, private page: Page, private pageRoute: PageRoute,
                private activeRoute: ActivatedRoute) {
        this.pageRoute.activatedRoute.pipe(
            switchMap((activatedRoute) => activatedRoute.params)
        ).forEach((params) => { this.payment.customerId = params.customer_id; });

    }

    ngOnInit(): void {
        this.page.backgroundSpanUnderStatusBar = true;
        this.page.on("loaded", (args) => {
            if (this.page.android) {
                this.page.android.setFitsSystemWindows(true);
            }
        });
    }

    addPayment(): void {
        this.isBusy = true;
        this.customerService.putPaymentToCustomerAction(this.payment).subscribe(
            (res) => {
                console.log("Added payment");
                this.isBusy = false;
                this.goBack();
            },
            (error) => {
                console.dir(error);
                /*TODO: handle errors*/
            }
        );
    }

    goBack() {
        this.routerExtensions.back({ relativeTo: this.activeRoute });
    }
}
