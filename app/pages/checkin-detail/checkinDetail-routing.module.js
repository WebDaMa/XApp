"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var checkinDetail_component_1 = require("~/pages/checkin-detail/checkinDetail.component");
var routes = [
    { path: "", component: checkinDetail_component_1.CheckinDetailComponent }
];
var CheckinDetailRoutingModule = /** @class */ (function () {
    function CheckinDetailRoutingModule() {
    }
    CheckinDetailRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.NativeScriptRouterModule.forChild(routes)],
            exports: [router_1.NativeScriptRouterModule]
        })
    ], CheckinDetailRoutingModule);
    return CheckinDetailRoutingModule;
}());
exports.CheckinDetailRoutingModule = CheckinDetailRoutingModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tpbkRldGFpbC1yb3V0aW5nLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNoZWNraW5EZXRhaWwtcm91dGluZy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBeUM7QUFFekMsc0RBQXVFO0FBRXZFLDBGQUF3RjtBQUV4RixJQUFNLE1BQU0sR0FBVztJQUNuQixFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsU0FBUyxFQUFFLGdEQUFzQixFQUFFO0NBQ2xELENBQUM7QUFNRjtJQUFBO0lBQTBDLENBQUM7SUFBOUIsMEJBQTBCO1FBSnRDLGVBQVEsQ0FBQztZQUNOLE9BQU8sRUFBRSxDQUFDLGlDQUF3QixDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNwRCxPQUFPLEVBQUUsQ0FBQyxpQ0FBd0IsQ0FBQztTQUN0QyxDQUFDO09BQ1csMEJBQTBCLENBQUk7SUFBRCxpQ0FBQztDQUFBLEFBQTNDLElBQTJDO0FBQTlCLGdFQUEwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IFJvdXRlcyB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdFJvdXRlck1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcblxuaW1wb3J0IHsgQ2hlY2tpbkRldGFpbENvbXBvbmVudCB9IGZyb20gXCJ+L3BhZ2VzL2NoZWNraW4tZGV0YWlsL2NoZWNraW5EZXRhaWwuY29tcG9uZW50XCI7XG5cbmNvbnN0IHJvdXRlczogUm91dGVzID0gW1xuICAgIHsgcGF0aDogXCJcIiwgY29tcG9uZW50OiBDaGVja2luRGV0YWlsQ29tcG9uZW50IH1cbl07XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW05hdGl2ZVNjcmlwdFJvdXRlck1vZHVsZS5mb3JDaGlsZChyb3V0ZXMpXSxcbiAgICBleHBvcnRzOiBbTmF0aXZlU2NyaXB0Um91dGVyTW9kdWxlXVxufSlcbmV4cG9ydCBjbGFzcyBDaGVja2luRGV0YWlsUm91dGluZ01vZHVsZSB7IH1cbiJdfQ==