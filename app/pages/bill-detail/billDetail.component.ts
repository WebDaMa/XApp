import { Component, OnInit } from "@angular/core";
import { PageRoute, RouterExtensions } from "nativescript-angular";
import { RadDataForm } from "nativescript-ui-dataform";
import { switchMap } from "rxjs/operators";
import { Switch } from "tns-core-modules/ui/switch";
import { BillCustomerDetail } from "~/shared/models/billCustomerDetail.model";
import { BillCustomerTotal } from "~/shared/models/billCustomerTotal.model";
import { BusCustomer } from "~/shared/models/busCustomer.model";
import { CustomerService } from "~/shared/services/customer.service";
import { GroepService } from "~/shared/services/groep.service";

@Component({
    selector: "BillDetail",
    moduleId: module.id,
    providers: [GroepService, CustomerService],
    templateUrl: "./billDetail.component.html"
})
export class BillDetailComponent implements OnInit {
    customerId: number;
    customerBillDetail: BillCustomerDetail = {
        id: "",
        customer: "",
        booker: {
            id: "",
            customer: "",
            total: "",
            payed: false
        },
        totals: [],
        options: []
    };

    isBusy: boolean = true;

    constructor(private groepService: GroepService, private customerService: CustomerService,
                private routerExtensions: RouterExtensions, private pageRoute: PageRoute) {
        this.pageRoute.activatedRoute.pipe(
            switchMap((activatedRoute) => activatedRoute.params)
        ).forEach((params) => { this.customerId = +params.customer_id; });
    }

    ngOnInit(): void {
        this.getCustomerDetail();
    }

    getCustomerDetail(): void {
        this.isBusy = true;
        this.customerService.getBillByCustomerId(this.customerId)
            .subscribe(
                (result: BillCustomerDetail) => {
                    this.customerBillDetail = result;
                    console.log("found me some size customer bill detail");
                    this.isBusy = false;
                },
                (error) => {
                    console.dir(error);
                    /*TODO: handle errors*/
                }
            );
    }

    dfPropertyPayedCommitted(args): void {
        const dataForm = <RadDataForm>args.object;
        const customer: BillCustomerTotal = <BillCustomerTotal> JSON.parse(dataForm.editedObject);
        this.customerService.putBillPayedAction(customer).subscribe(
            (res) => {
                console.log("Updated customer");
                this.getCustomerDetail();
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
