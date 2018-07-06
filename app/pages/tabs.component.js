"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_1 = require("platform");
var app = require("tns-core-modules/application");
var TabsComponent = /** @class */ (function () {
    function TabsComponent() {
        // Use the component constructor to inject providers.
    }
    TabsComponent.prototype.ngOnInit = function () {
        // Init your component properties here.
    };
    Object.defineProperty(TabsComponent.prototype, "title", {
        get: function () {
            return this._title;
        },
        set: function (value) {
            if (this._title !== value) {
                this._title = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    TabsComponent.prototype.getIconSource = function (icon) {
        return platform_1.isAndroid ? "" : "res://tabIcons/" + icon;
    };
    TabsComponent.prototype.onSelectedIndexChanged = function (args) {
        var appSettings = require("application-settings");
        appSettings.setNumber("tabViewIndex", args.newIndex);
        var tabView = args.object;
        var selectedTabViewItem = tabView.items[args.newIndex];
        this.title = selectedTabViewItem.title;
    };
    TabsComponent.prototype.onDrawerButtonTap = function () {
        var sideDrawer = app.getRootView();
        sideDrawer.showDrawer();
    };
    TabsComponent = __decorate([
        core_1.Component({
            selector: "Tabs",
            moduleId: module.id,
            templateUrl: "./tabs.component.html",
            styleUrls: ["./tabs.component.scss"]
        }),
        __metadata("design:paramtypes", [])
    ], TabsComponent);
    return TabsComponent;
}());
exports.TabsComponent = TabsComponent;
