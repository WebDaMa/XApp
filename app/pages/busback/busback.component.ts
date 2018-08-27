import { Component, OnInit, ViewChild } from "@angular/core";
import { RouterExtensions } from "nativescript-angular";
import { RadDataForm } from "nativescript-ui-dataform";
import { Settings } from "~/settings/settings";
import { BusCustomer } from "~/shared/models/busCustomer.model";
import { CheckinBus } from "~/shared/models/checkinBus.model";
import { CustomerService } from "~/shared/services/customer.service";

@Component({
    selector: "Busback",
    moduleId: module.id,
    providers: [CustomerService],
    templateUrl: "./busback.component.html"
})
export class BusbackComponent implements OnInit {
    isBusy: boolean = true;

    checkinBusBack: CheckinBus = {
        total: "0",
        places: [],
        date: ""
    };

    constructor(private customerService: CustomerService, private routerExtensions: RouterExtensions) {
    }

    ngOnInit(): void {
        this.getCustomersBusBack();
    }

    getCustomersBusBack(): void {
        const date = Settings.getDate();

        this.customerService.getBusBackCustomersByWeek(date)
            .subscribe(
                (result: CheckinBus) => {
                    this.checkinBusBack = result;
                    this.isBusy = false;
                },
                (error) => {
                    console.dir(error);
                    /*TODO: handle errors*/
                }
            );
    }

    dfPropertyBackCommitted(args) {
        const dataForm = <RadDataForm>args.object;
        const busCostumer: BusCustomer = <BusCustomer> JSON.parse(dataForm.editedObject);

        this.customerService.putBusBackCustomerAction(busCostumer)
            .subscribe(
                () => {
                    console.log("Updated customer");
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
