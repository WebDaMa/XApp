"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var weekOverview_component_1 = require("~/pages/weekOverview/weekOverview.component");
var routes = [
    { path: "", component: weekOverview_component_1.WeekOverviewComponent }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2Vla092ZXJ2aWV3LXJvdXRpbmcubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsid2Vla092ZXJ2aWV3LXJvdXRpbmcubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQXlDO0FBRXpDLHNEQUF1RTtBQUV2RSxzRkFBa0Y7QUFFbEYsSUFBTSxNQUFNLEdBQVc7SUFDbkIsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRSw4Q0FBcUIsRUFBQztDQUNoRCxDQUFDO0FBTUY7SUFBQTtJQUF5QyxDQUFDO0lBQTdCLHlCQUF5QjtRQUpyQyxlQUFRLENBQUM7WUFDTixPQUFPLEVBQUUsQ0FBQyxpQ0FBd0IsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDcEQsT0FBTyxFQUFFLENBQUMsaUNBQXdCLENBQUM7U0FDdEMsQ0FBQztPQUNXLHlCQUF5QixDQUFJO0lBQUQsZ0NBQUM7Q0FBQSxBQUExQyxJQUEwQztBQUE3Qiw4REFBeUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBSb3V0ZXMgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRSb3V0ZXJNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XG5cbmltcG9ydCB7V2Vla092ZXJ2aWV3Q29tcG9uZW50fSBmcm9tIFwifi9wYWdlcy93ZWVrT3ZlcnZpZXcvd2Vla092ZXJ2aWV3LmNvbXBvbmVudFwiO1xuXG5jb25zdCByb3V0ZXM6IFJvdXRlcyA9IFtcbiAgICB7IHBhdGg6IFwiXCIsIGNvbXBvbmVudDogV2Vla092ZXJ2aWV3Q29tcG9uZW50fVxuXTtcblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbTmF0aXZlU2NyaXB0Um91dGVyTW9kdWxlLmZvckNoaWxkKHJvdXRlcyldLFxuICAgIGV4cG9ydHM6IFtOYXRpdmVTY3JpcHRSb3V0ZXJNb2R1bGVdXG59KVxuZXhwb3J0IGNsYXNzIFdlZWtPdmVydmlld1JvdXRpbmdNb2R1bGUgeyB9XG4iXX0=