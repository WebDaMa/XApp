import { Component, OnInit, ViewChild } from "@angular/core";
import { RouterExtensions } from "nativescript-angular";
import { Settings } from "~/settings/settings";
import { Volpension } from "~/shared/models/volpension.model";
import { CustomerService } from "~/shared/services/customer.service";

@Component({
    selector: "Volpension",
    moduleId: module.id,
    providers: [CustomerService],
    templateUrl: "./volpension.component.html"
})
export class VolpensionComponent implements OnInit {
    volpension: Volpension = {
        total: "0",
        allInTypes: [],
        date: ""
    };

    isBusy: boolean = true;

    constructor(private customerService: CustomerService, private routerExtensions: RouterExtensions) {
    }

    ngOnInit(): void {
        this.getCustomersVolpension();
    }

    getCustomersVolpension(): void {
        const date = Settings.getDate();
        const locationId = Settings.getLocation();

        this.customerService.getAllByAllInTypeForLocationAndPeriodAction(locationId, date)
            .subscribe(
                (result: Volpension) => {
                    this.volpension = result;
                    console.log("got me some volpension customers");
                    this.isBusy = false;
                },
                (error) => {
                    console.dir(error);
                    /*TODO: handle errors*/
                    this.isBusy = false;

                }
            );
    }

    goBack() {
        this.routerExtensions.backToPreviousPage();
    }
}
