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
