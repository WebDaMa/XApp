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
