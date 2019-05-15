"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var billDetail_component_1 = require("~/pages/bill/bill-detail/billDetail.component");
var bill_component_1 = require("~/pages/bill/bill.component");
var routes = [
    { path: "", component: bill_component_1.BillComponent },
    { path: ":customer_id", component: billDetail_component_1.BillDetailComponent }
];
var BillRoutingModule = /** @class */ (function () {
    function BillRoutingModule() {
    }
    BillRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.NativeScriptRouterModule.forChild(routes)],
            exports: [router_1.NativeScriptRouterModule]
        })
    ], BillRoutingModule);
    return BillRoutingModule;
}());
exports.BillRoutingModule = BillRoutingModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmlsbC1yb3V0aW5nLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImJpbGwtcm91dGluZy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBeUM7QUFFekMsc0RBQXVFO0FBRXZFLHNGQUFvRjtBQUNwRiw4REFBNEQ7QUFFNUQsSUFBTSxNQUFNLEdBQVc7SUFDbkIsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRSw4QkFBYSxFQUFFO0lBQ3RDLEVBQUUsSUFBSSxFQUFFLGNBQWMsRUFBRSxTQUFTLEVBQUUsMENBQW1CLEVBQUU7Q0FDM0QsQ0FBQztBQU1GO0lBQUE7SUFBaUMsQ0FBQztJQUFyQixpQkFBaUI7UUFKN0IsZUFBUSxDQUFDO1lBQ04sT0FBTyxFQUFFLENBQUMsaUNBQXdCLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3BELE9BQU8sRUFBRSxDQUFDLGlDQUF3QixDQUFDO1NBQ3RDLENBQUM7T0FDVyxpQkFBaUIsQ0FBSTtJQUFELHdCQUFDO0NBQUEsQUFBbEMsSUFBa0M7QUFBckIsOENBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgUm91dGVzIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0Um91dGVyTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xuXG5pbXBvcnQgeyBCaWxsRGV0YWlsQ29tcG9uZW50IH0gZnJvbSBcIn4vcGFnZXMvYmlsbC9iaWxsLWRldGFpbC9iaWxsRGV0YWlsLmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgQmlsbENvbXBvbmVudCB9IGZyb20gXCJ+L3BhZ2VzL2JpbGwvYmlsbC5jb21wb25lbnRcIjtcblxuY29uc3Qgcm91dGVzOiBSb3V0ZXMgPSBbXG4gICAgeyBwYXRoOiBcIlwiLCBjb21wb25lbnQ6IEJpbGxDb21wb25lbnQgfSxcbiAgICB7IHBhdGg6IFwiOmN1c3RvbWVyX2lkXCIsIGNvbXBvbmVudDogQmlsbERldGFpbENvbXBvbmVudCB9XG5dO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtOYXRpdmVTY3JpcHRSb3V0ZXJNb2R1bGUuZm9yQ2hpbGQocm91dGVzKV0sXG4gICAgZXhwb3J0czogW05hdGl2ZVNjcmlwdFJvdXRlck1vZHVsZV1cbn0pXG5leHBvcnQgY2xhc3MgQmlsbFJvdXRpbmdNb2R1bGUgeyB9XG4iXX0=