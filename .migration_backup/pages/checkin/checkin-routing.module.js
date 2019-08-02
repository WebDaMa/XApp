"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var checkinDetail_component_1 = require("~/pages/checkin/checkin-detail/checkinDetail.component");
var checkin_component_1 = require("~/pages/checkin/checkin.component");
var routes = [
    { path: "", component: checkin_component_1.CheckinComponent },
    { path: ":customer_id", component: checkinDetail_component_1.CheckinDetailComponent }
];
var CheckinRoutingModule = /** @class */ (function () {
    function CheckinRoutingModule() {
    }
    CheckinRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.NativeScriptRouterModule.forChild(routes)],
            exports: [router_1.NativeScriptRouterModule]
        })
    ], CheckinRoutingModule);
    return CheckinRoutingModule;
}());
exports.CheckinRoutingModule = CheckinRoutingModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tpbi1yb3V0aW5nLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNoZWNraW4tcm91dGluZy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBeUM7QUFFekMsc0RBQXVFO0FBQ3ZFLGtHQUFnRztBQUNoRyx1RUFBcUU7QUFFckUsSUFBTSxNQUFNLEdBQVc7SUFDbkIsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRSxvQ0FBZ0IsRUFBRTtJQUN6QyxFQUFFLElBQUksRUFBRSxjQUFjLEVBQUUsU0FBUyxFQUFFLGdEQUFzQixFQUFFO0NBQzlELENBQUM7QUFNRjtJQUFBO0lBQW9DLENBQUM7SUFBeEIsb0JBQW9CO1FBSmhDLGVBQVEsQ0FBQztZQUNOLE9BQU8sRUFBRSxDQUFDLGlDQUF3QixDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNwRCxPQUFPLEVBQUUsQ0FBQyxpQ0FBd0IsQ0FBQztTQUN0QyxDQUFDO09BQ1csb0JBQW9CLENBQUk7SUFBRCwyQkFBQztDQUFBLEFBQXJDLElBQXFDO0FBQXhCLG9EQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IFJvdXRlcyB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdFJvdXRlck1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IENoZWNraW5EZXRhaWxDb21wb25lbnQgfSBmcm9tIFwifi9wYWdlcy9jaGVja2luL2NoZWNraW4tZGV0YWlsL2NoZWNraW5EZXRhaWwuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBDaGVja2luQ29tcG9uZW50IH0gZnJvbSBcIn4vcGFnZXMvY2hlY2tpbi9jaGVja2luLmNvbXBvbmVudFwiO1xuXG5jb25zdCByb3V0ZXM6IFJvdXRlcyA9IFtcbiAgICB7IHBhdGg6IFwiXCIsIGNvbXBvbmVudDogQ2hlY2tpbkNvbXBvbmVudCB9LFxuICAgIHsgcGF0aDogXCI6Y3VzdG9tZXJfaWRcIiwgY29tcG9uZW50OiBDaGVja2luRGV0YWlsQ29tcG9uZW50IH1cbl07XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW05hdGl2ZVNjcmlwdFJvdXRlck1vZHVsZS5mb3JDaGlsZChyb3V0ZXMpXSxcbiAgICBleHBvcnRzOiBbTmF0aXZlU2NyaXB0Um91dGVyTW9kdWxlXVxufSlcbmV4cG9ydCBjbGFzcyBDaGVja2luUm91dGluZ01vZHVsZSB7IH1cbiJdfQ==