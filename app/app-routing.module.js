"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var routes = [
    { path: "", redirectTo: "/login", pathMatch: "full" },
    { path: "login", loadChildren: "~/pages/login/login.module#LoginModule" },
    { path: "settings", loadChildren: "~/pages/settings/settings.module#SettingsModule" },
    { path: "busgo", loadChildren: "~/pages/busgo/busgo.module#BusgoModule" },
    { path: "busback", loadChildren: "~/pages/busback/busback.module#BusbackModule" },
    { path: "volpension", loadChildren: "~/pages/volpension/volpension.module#VolpensionModule" },
    { path: "lodging", loadChildren: "~/pages/lodging/lodging.module#LodgingModule" },
    { path: "groep", loadChildren: "~/pages/groep/groep.module#GroepModule" },
    { path: "checkin", loadChildren: "~/pages/checkin/checkin.module#CheckinModule" },
    { path: "planning", loadChildren: "~/pages/planning/planning.module#PlanningModule" },
    { path: "payments", loadChildren: "~/pages/payments/payments.module#PaymentsModule" },
    { path: "bill", loadChildren: "~/pages/bill/bill.module#BillModule" },
    {
        path: "tabs",
        loadChildren: "~/pages/tabs.module#TabsModule"
    }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.NativeScriptRouterModule.forRoot(routes)],
            exports: [router_1.NativeScriptRouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
exports.navigatableComponents = [];
