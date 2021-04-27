import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RouterExtensions } from "nativescript-angular";
import { Page } from "tns-core-modules/ui/page";
import { Settings } from "~/settings/settings";
import { Volpension } from "~/shared/models/volpension.model";
import { CustomerService } from "~/shared/services/customer.service";
import {RadSideDrawer} from "nativescript-ui-sidedrawer";
import * as app from "application";

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

    constructor(private customerService: CustomerService, private routerExtensions: RouterExtensions,
                private page: Page, private activeRoute: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.getCustomersVolpension();

        this.page.backgroundColor = "#000000";
        this.page.backgroundSpanUnderStatusBar = true;
        this.page.on("loaded", (args) => {
            if (this.page.android) {
                this.page.android.setFitsSystemWindows(true);
            }
        });
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

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    isTotal(total: string): boolean {
        return Number(total) + 1 < 2;
    }
}
