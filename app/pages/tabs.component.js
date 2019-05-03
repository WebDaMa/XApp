"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var nativescript_angular_1 = require("nativescript-angular");
var page_1 = require("tns-core-modules/ui/page");
var TabsComponent = /** @class */ (function () {
    function TabsComponent(page, routerExtension, activeRoute) {
        this.page = page;
        this.routerExtension = routerExtension;
        this.activeRoute = activeRoute;
        // Use the component constructor to inject providers.
    }
    TabsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.page.actionBarHidden = true;
        // Init your component properties here.
        this.page.backgroundSpanUnderStatusBar = true;
        this.page.on("loaded", function (args) {
            if (_this.page.android) {
                _this.page.android.setFitsSystemWindows(true);
            }
        });
        this.routerExtension.navigate([{
                outlets: {
                    materialsTab: ["materials"],
                    weekOverviewTab: ["weekOverview"],
                    sizesTab: ["sizes"],
                    optionsTab: ["options"]
                }
            }], { relativeTo: this.activeRoute });
    };
    TabsComponent = __decorate([
        core_1.Component({
            selector: "Tabs",
            moduleId: module.id,
            templateUrl: "./tabs.component.html",
            styleUrls: ["./tabs.component.scss"]
        }),
        __metadata("design:paramtypes", [page_1.Page, nativescript_angular_1.RouterExtensions,
            router_1.ActivatedRoute])
    ], TabsComponent);
    return TabsComponent;
}());
exports.TabsComponent = TabsComponent;
