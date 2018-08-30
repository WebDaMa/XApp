import { Component, OnInit, ViewChild } from "@angular/core";
import * as app from "application";
import { RouterExtensions } from "nativescript-angular/router";
import { DrawerTransitionBase, RadSideDrawer, SlideInOnTopTransition } from "nativescript-ui-sidedrawer";
import { Observable } from "tns-core-modules/data/observable";
import { Settings } from "~/settings/settings";
import {forEach} from "@angular/router/src/utils/collection";

@Component({
    selector: "ns-app",
    templateUrl: "app.component.html"
})
export class AppComponent implements OnInit {
    private _selectedPage: string;
    private _sideDrawerTransition: DrawerTransitionBase;

    constructor(private routerExtensions: RouterExtensions) {
        // Use the component constructor to inject services.
    }

    ngOnInit(): void {
        this._selectedPage = "/tabs";
        this._sideDrawerTransition = new SlideInOnTopTransition();
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

        this._selectedPage = navItemRoute;

        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.closeDrawer();
    }

    logout(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.closeDrawer();
        const appSettings = require("application-settings");
        appSettings.setString("token", "");
        appSettings.setString("username", "");
        this.routerExtensions.navigate(["/login"], { clearHistory: true });
    }

    checkRoles(roles: Array<string>): boolean {
        const role = Settings.getRole();

        return roles.indexOf(role) !== -1;
    }
}
