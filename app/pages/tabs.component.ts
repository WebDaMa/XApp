import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RouterExtensions } from "nativescript-angular";
import { Page } from "tns-core-modules/ui/page";
import {RadSideDrawer} from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";

@Component({
    selector: "MainTabs",
    moduleId: module.id,
    templateUrl: "./tabs.component.html",
    styleUrls: ["./tabs.component.scss"]
})
export class TabsComponent implements OnInit {

    constructor(private page: Page, private routerExtension: RouterExtensions,
                private activeRoute: ActivatedRoute) {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        this.routerExtension.navigate([{
            outlets: {
                materialsTab: ["materials"],
                weekOverviewTab: ["weekOverview"],
                sizesTab: ["sizes"],
                optionsTab: ["options"]
            }
        }], { relativeTo: this.activeRoute });
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
}
