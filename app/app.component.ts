import { Component, OnInit, ViewChild } from "@angular/core";
import * as app from "application";
import { RouterExtensions } from "nativescript-angular/router";
import { DrawerTransitionBase, RadSideDrawer, SlideInOnTopTransition } from "nativescript-ui-sidedrawer";

@Component({
    selector: "ns-app",
    templateUrl: "app.component.html"
})
export class AppComponent implements OnInit {
    private _selectedPage: string;
    private _sideDrawerTransition: DrawerTransitionBase;
    private appSettings = require("application-settings");
    private username: string;

    constructor(private routerExtensions: RouterExtensions) {
        // Use the component constructor to inject services.
    }

    ngOnInit(): void {
        this._selectedPage = "Home";
        this._sideDrawerTransition = new SlideInOnTopTransition();
        this.username = this.appSettings.getString("username");
    }

    get sideDrawerTransition(): DrawerTransitionBase {
        return this._sideDrawerTransition;
    }

    isPageSelected(pageTitle: string): boolean {
        return pageTitle === this._selectedPage;
    }

    onNavItemTap(navItemRoute: string): void {
        this.routerExtensions.navigate([navItemRoute], {
            transition: {
                name: "fade"
            }
        });

        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.closeDrawer();
    }

    logout(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.closeDrawer();
        this.appSettings.setString("token", "");
        this.appSettings.setString("username", "");
        this.routerExtensions.navigate(["/login"], { clearHistory: true });
    }
}
