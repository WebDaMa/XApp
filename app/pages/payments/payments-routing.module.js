"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var paymentsAdd_component_1 = require("~/pages/payments/payments-add/paymentsAdd.component");
var payments_component_1 = require("~/pages/payments/payments.component");
var routes = [
    { path: "", component: payments_component_1.PaymentsComponent },
    { path: ":customer_id", component: paymentsAdd_component_1.PaymentsAddComponent }
];
var PaymentsRoutingModule = /** @class */ (function () {
    function PaymentsRoutingModule() {
    }
    PaymentsRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.NativeScriptRouterModule.forChild(routes)],
            exports: [router_1.NativeScriptRouterModule]
        })
    ], PaymentsRoutingModule);
    return PaymentsRoutingModule;
}());
exports.PaymentsRoutingModule = PaymentsRoutingModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF5bWVudHMtcm91dGluZy5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwYXltZW50cy1yb3V0aW5nLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUF5QztBQUV6QyxzREFBdUU7QUFFdkUsNkZBQTJGO0FBQzNGLDBFQUF3RTtBQUV4RSxJQUFNLE1BQU0sR0FBVztJQUNuQixFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsU0FBUyxFQUFFLHNDQUFpQixFQUFFO0lBQzFDLEVBQUUsSUFBSSxFQUFFLGNBQWMsRUFBRSxTQUFTLEVBQUUsNENBQW9CLEVBQUU7Q0FDNUQsQ0FBQztBQU1GO0lBQUE7SUFBcUMsQ0FBQztJQUF6QixxQkFBcUI7UUFKakMsZUFBUSxDQUFDO1lBQ04sT0FBTyxFQUFFLENBQUMsaUNBQXdCLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3BELE9BQU8sRUFBRSxDQUFDLGlDQUF3QixDQUFDO1NBQ3RDLENBQUM7T0FDVyxxQkFBcUIsQ0FBSTtJQUFELDRCQUFDO0NBQUEsQUFBdEMsSUFBc0M7QUFBekIsc0RBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgUm91dGVzIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0Um91dGVyTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xuXG5pbXBvcnQgeyBQYXltZW50c0FkZENvbXBvbmVudCB9IGZyb20gXCJ+L3BhZ2VzL3BheW1lbnRzL3BheW1lbnRzLWFkZC9wYXltZW50c0FkZC5jb21wb25lbnRcIjtcbmltcG9ydCB7IFBheW1lbnRzQ29tcG9uZW50IH0gZnJvbSBcIn4vcGFnZXMvcGF5bWVudHMvcGF5bWVudHMuY29tcG9uZW50XCI7XG5cbmNvbnN0IHJvdXRlczogUm91dGVzID0gW1xuICAgIHsgcGF0aDogXCJcIiwgY29tcG9uZW50OiBQYXltZW50c0NvbXBvbmVudCB9LFxuICAgIHsgcGF0aDogXCI6Y3VzdG9tZXJfaWRcIiwgY29tcG9uZW50OiBQYXltZW50c0FkZENvbXBvbmVudCB9XG5dO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtOYXRpdmVTY3JpcHRSb3V0ZXJNb2R1bGUuZm9yQ2hpbGQocm91dGVzKV0sXG4gICAgZXhwb3J0czogW05hdGl2ZVNjcmlwdFJvdXRlck1vZHVsZV1cbn0pXG5leHBvcnQgY2xhc3MgUGF5bWVudHNSb3V0aW5nTW9kdWxlIHsgfVxuIl19