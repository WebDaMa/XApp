import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RouterExtensions } from "nativescript-angular";
import { RadDataForm } from "nativescript-ui-dataform";
import { Settings } from "~/settings/settings";
import { BusCustomer } from "~/shared/models/busCustomer.model";
import { CheckinBus } from "~/shared/models/checkinBus.model";
import { CustomerService } from "~/shared/services/customer.service";

@Component({
    selector: "Busgo",
    moduleId: module.id,
    providers: [CustomerService],
    templateUrl: "./busgo.component.html"
})
export class BusgoComponent implements OnInit {

    checkinBusGo: CheckinBus = {
        total: "0",
        places: [],
        date: ""
    };

    isBusy: boolean;

    constructor(private customerService: CustomerService, private routerExtensions: RouterExtensions,
                private activeRoute: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.getCustomersBusGo();
    }

    getCustomersBusGo(): void {
        const date = Settings.getDate();
        this.isBusy = true;

        this.customerService.getBusGoCustomersByWeek(date)
            .subscribe(
                (result: CheckinBus) => {
                    this.checkinBusGo = result;
                    console.log("got me some bus customers");
                    this.isBusy = false;
                },
                (error) => {
                    console.dir(error);
                    this.isBusy = false;
                    /*TODO: handle errors*/
                }
            );
    }

    dfPropertyGoCommitted(args) {
        const dataForm = <RadDataForm>args.object;
        const busCostumer: BusCustomer = <BusCustomer> JSON.parse(dataForm.editedObject);

        this.isBusy = true;

        this.customerService.putBusGoCustomerAction(busCostumer)
            .subscribe(
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
