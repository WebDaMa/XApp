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
