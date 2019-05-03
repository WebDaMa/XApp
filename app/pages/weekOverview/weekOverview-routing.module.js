"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var weekOverview_component_1 = require("~/pages/weekOverview/weekOverview.component");
var routes = [
    { path: "", redirectTo: "weekOverview" },
    { path: "weekOverview", component: weekOverview_component_1.WeekOverviewComponent }
];
var WeekOverviewRoutingModule = /** @class */ (function () {
    function WeekOverviewRoutingModule() {
    }
    WeekOverviewRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.NativeScriptRouterModule.forChild(routes)],
            exports: [router_1.NativeScriptRouterModule]
        })
    ], WeekOverviewRoutingModule);
    return WeekOverviewRoutingModule;
}());
exports.WeekOverviewRoutingModule = WeekOverviewRoutingModule;
