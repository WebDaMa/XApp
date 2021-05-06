import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import * as appversion from "nativescript-appversion";
import { DrawerTransitionBase, RadSideDrawer, SlideInOnTopTransition } from "nativescript-ui-sidedrawer";
import { RadSideDrawerComponent } from "nativescript-ui-sidedrawer/angular";
import { filter } from "rxjs/operators";
import * as app from "tns-core-modules/application";
import * as appSettings from "tns-core-modules/application-settings";
import { isAndroid, isIOS } from "tns-core-modules/platform";
import { Settings } from "~/settings/settings";

@Component({
    selector: "ns-app",
    templateUrl: "app.component.html"
})
export class AppComponent implements OnInit, AfterViewInit {
    @ViewChild(RadSideDrawerComponent, {static: false}) drawerComponent: RadSideDrawerComponent;
    private _activatedUrl: string;
    private _sideDrawerTransition: DrawerTransitionBase;
    private drawer: RadSideDrawer;
    private _appVersionNumber: string = "";
    private _username: string = "";

    constructor(private router: Router, private routerExtensions: RouterExtensions,
                private changeDetectionRef: ChangeDetectorRef) {
        // Use the component constructor to inject services.
    }

    ngOnInit(): void {
        this._activatedUrl = "/home";
        this._sideDrawerTransition = new SlideInOnTopTransition();

        this.router.events
            .pipe(filter((event: any) => event instanceof NavigationEnd))
            .subscribe((event: NavigationEnd) => this._activatedUrl = event.urlAfterRedirects);
    }

    ngAfterViewInit(): void {
        this.username = appSettings.getString("username");
        this.drawer = this.drawerComponent.sideDrawer;
        this.changeDetectionRef.detectChanges();

        if (isIOS) {
            // This disables the swipe gesture to open menu
            this.drawer.ios.defaultSideDrawer.allowEdgeSwipe = false;
        }

        // Show app Version
        appversion.getVersionName().then((v: string) => {
            this._appVersionNumber = v;
        });
    }

    onLoaded() {
        if (isAndroid) {
            // This disables the swipe gesture to open menu, by setting the treshhold to '0'
            this.drawer.android.setTouchTargetThreshold(0);
        }
    }

    get sideDrawerTransition(): DrawerTransitionBase {
        return this._sideDrawerTransition;
    }

    get username(): string {
        return this._username;
    }

    set username(username: string) {
        this._username = username;
    }

    get appVersionNumber(): string {
        return this._appVersionNumber;
    }

    isComponentSelected(url: string): boolean {
        return this._activatedUrl === url;
    }

    onNavItemTap(navItemRoute: string): void {
        this.routerExtensions.navigate([navItemRoute], {
            transition: {
                name: "fade"
            },
            clearHistory: true
        });

        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.closeDrawer();
    }

    logout(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.closeDrawer();
        appSettings.setString("token", "");
        appSettings.setString("username", "");
        this.routerExtensions.navigate(["/login"], { clearHistory: true });
    }

    checkRoles(roles: Array<string>): boolean {
        const role = Settings.getRole();

        return roles.indexOf(role) !== -1;
    }
}
