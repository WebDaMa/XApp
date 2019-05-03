"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var app = require("tns-core-modules/application");
var router_2 = require("nativescript-angular/router");
var nativescript_ui_sidedrawer_1 = require("nativescript-ui-sidedrawer");
var angular_1 = require("nativescript-ui-sidedrawer/angular");
var operators_1 = require("rxjs/operators");
var platform_1 = require("tns-core-modules/platform");
var settings_1 = require("~/settings/settings");
var AppComponent = /** @class */ (function () {
    function AppComponent(router, routerExtensions, changeDetectionRef) {
        this.router = router;
        this.routerExtensions = routerExtensions;
        this.changeDetectionRef = changeDetectionRef;
        // Use the component constructor to inject services.
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._activatedUrl = "/home";
        this._sideDrawerTransition = new nativescript_ui_sidedrawer_1.SlideInOnTopTransition();
        this.router.events
            .pipe(operators_1.filter(function (event) { return event instanceof router_1.NavigationEnd; }))
            .subscribe(function (event) { return _this._activatedUrl = event.urlAfterRedirects; });
    };
    AppComponent.prototype.ngAfterViewInit = function () {
        this.drawer = this.drawerComponent.sideDrawer;
        this.changeDetectionRef.detectChanges();
        if (platform_1.isIOS) {
            // This disables the swipe gesture to open menu
            this.drawer.ios.defaultSideDrawer.allowEdgeSwipe = false;
        }
    };
    AppComponent.prototype.onLoaded = function () {
        if (platform_1.isAndroid) {
            // This disables the swipe gesture to open menu, by setting the treshhold to '0'
            this.drawer.android.setTouchTargetThreshold(0);
        }
    };
    Object.defineProperty(AppComponent.prototype, "sideDrawerTransition", {
        get: function () {
            return this._sideDrawerTransition;
        },
        enumerable: true,
        configurable: true
    });
    AppComponent.prototype.isComponentSelected = function (url) {
        return this._activatedUrl === url;
    };
    AppComponent.prototype.onNavItemTap = function (navItemRoute) {
        this.routerExtensions.navigate([navItemRoute], {
            transition: {
                name: "fade"
            }
        });
        var sideDrawer = app.getRootView();
        sideDrawer.closeDrawer();
    };
    AppComponent.prototype.logout = function () {
        var sideDrawer = app.getRootView();
        sideDrawer.closeDrawer();
        var appSettings = require("tns-core-modules/application-settings");
        appSettings.setString("token", "");
        appSettings.setString("username", "");
        this.routerExtensions.navigate(["/login"], { clearHistory: true });
    };
    AppComponent.prototype.checkRoles = function (roles) {
        var role = settings_1.Settings.getRole();
        return roles.indexOf(role) !== -1;
    };
    __decorate([
        core_1.ViewChild(angular_1.RadSideDrawerComponent),
        __metadata("design:type", angular_1.RadSideDrawerComponent)
    ], AppComponent.prototype, "drawerComponent", void 0);
    AppComponent = __decorate([
        core_1.Component({
            selector: "ns-app",
            templateUrl: "app.component.html"
        }),
        __metadata("design:paramtypes", [router_1.Router, router_2.RouterExtensions,
            core_1.ChangeDetectorRef])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
