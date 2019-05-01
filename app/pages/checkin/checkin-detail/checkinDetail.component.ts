import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { PageRoute, RouterExtensions } from "nativescript-angular";
import { RadDataForm } from "nativescript-ui-dataform";
import { switchMap } from "rxjs/operators";
import { Page } from "tns-core-modules/ui/page";
import { CheckinCustomerDetail } from "~/shared/models/checkinCustomerDetail.model";
import { CustomerService } from "~/shared/services/customer.service";

@Component({
    selector: "CheckinDetail",
    moduleId: module.id,
    providers: [CustomerService],
    templateUrl: "./checkinDetail.component.html"
})
export class CheckinDetailComponent implements OnInit {
    customerId: number;
    customerCheckinDetail: CheckinCustomerDetail = {
        id: "",
        firstName: "",
        lastName: "",
        licensePlate: "",
        expireDate: "",
        nationalRegisterNumber: "",
        gsm: "",
        emergencyNumber: "",
        email: "",
        birthdate: ""
    };

    isBusy: boolean = true;

    constructor(private customerService: CustomerService,
                private routerExtensions: RouterExtensions, private pageRoute: PageRoute,
                private page: Page, private activeRoute: ActivatedRoute) {
        this.pageRoute.activatedRoute.pipe(
            switchMap((activatedRoute) => activatedRoute.params)
        ).forEach((params) => { this.customerId = params.customer_id; });
    }

    ngOnInit(): void {
        this.page.backgroundSpanUnderStatusBar = true;
        this.page.on("loaded", (args) => {
            if (this.page.android) {
                this.page.android.setFitsSystemWindows(true);
            }
        });
        this.getCustomerDetail();
    }

    getCustomerDetail(): void {
        this.isBusy = true;
        this.customerService.getCheckinByCustomerId(this.customerId)
            .subscribe(
                (result: CheckinCustomerDetail) => {
                    this.customerCheckinDetail = result;
                    console.log("found me some customer checkin detail");
                    this.isBusy = false;
                },
                (error) => {
                    console.dir(error);
                    /*TODO: handle errors*/
                }
            );
    }

    dfPropertyCommitted(args): void {
        const dataForm = <RadDataForm>args.object;
        const customer: CheckinCustomerDetail = <CheckinCustomerDetail> JSON.parse(dataForm.editedObject);

        const lenght = customer.birthdate.toString().length;

        if (customer.birthdate !== null && lenght > 11) {
            /*Remove mili seconds*/
            customer.birthdate = (customer.birthdate / 1000) + "";
        }
        this.isBusy = true;

        this.customerService.putCheckinCustomerDetailAction(customer).subscribe(
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
        this.routerExtensions.back();
    }
}
