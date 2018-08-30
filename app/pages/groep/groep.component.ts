import { Component, OnInit, ViewChild } from "@angular/core";
import { RouterExtensions } from "nativescript-angular";
import { RadDataForm } from "nativescript-ui-dataform";
import { Switch } from "tns-core-modules/ui/switch";
import { Settings } from "~/settings/settings";
import { CheckinCustomer } from "~/shared/models/checkinCustomer.model";
import { Groep } from "~/shared/models/groep.model";
import { GroepCustomer } from "~/shared/models/groepCustomer.model";
import { CustomerService } from "~/shared/services/customer.service";
import { GroepService } from "~/shared/services/groep.service";

@Component({
    selector: "Groep",
    moduleId: module.id,
    providers: [GroepService, CustomerService],
    templateUrl: "./groep.component.html"
})
export class GroepComponent implements OnInit {
    groeps: Array<object> = [];

    customers: Array<GroepCustomer> = [];

    isBusy: boolean = true;

    constructor(private groepService: GroepService, private customerService: CustomerService,
                private routerExtensions: RouterExtensions) {
    }

    ngOnInit(): void {
        this.getGroeps();
    }

    getGroeps(): void {
        const locationId = Settings.getLocation();
        const date = Settings.getDate();

        this.groepService.getAllGroepsForWeekAndLocationAction(date, locationId)
            .subscribe(
                (result: Array<Groep>) => {

                    this.groeps = [{key: "0", label: "Kies een Groep"}];
                    this.groeps = [...this.groeps, ...result.map(({ id, name }) => ({ key: id, label: name }))];

                    this.getCustomers();

                },
                (error) => {
                    console.dir(error);
                    /*TODO: handle errors*/
                }
            );
    }

    getCustomers(): void {
        this.isBusy = true;
        const locationId = Settings.getLocation();
        const date = Settings.getDate();

        this.customerService.getAllByPeriodIdAndLocationIdForGroupLayoutAction(date, locationId)
            .subscribe(
                (result: Array<GroepCustomer>) => {

                    this.customers = result;
                    console.log("found me some groep customers");
                    this.isBusy = false;
                },
                (error) => {
                    console.dir(error);
                    /*TODO: handle errors*/
                }
            );

    }

    dfPropertyCommitted(args) {
        const dataForm = <RadDataForm>args.object;
        const groepCustomer: GroepCustomer = <GroepCustomer> JSON.parse(dataForm.editedObject);

        if (groepCustomer.groupLayoutId !== "0") {
            this.isBusy = true;

            this.customerService.putGroepCustomerAction(groepCustomer)
                .subscribe(
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
    }

    goBack() {
        this.routerExtensions.backToPreviousPage();
    }
}