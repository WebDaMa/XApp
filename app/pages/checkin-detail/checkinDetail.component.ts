import { Component, OnInit } from "@angular/core";
import { PageRoute, RouterExtensions } from "nativescript-angular";
import { RadDataForm } from "nativescript-ui-dataform";
import { switchMap } from "rxjs/operators";
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
                private routerExtensions: RouterExtensions, private pageRoute: PageRoute) {
        this.pageRoute.activatedRoute.pipe(
            switchMap((activatedRoute) => activatedRoute.params)
        ).forEach((params) => { this.customerId = params.customer_id; });
    }

    ngOnInit(): void {
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
        this.routerExtensions.backToPreviousPage();
    }
}
