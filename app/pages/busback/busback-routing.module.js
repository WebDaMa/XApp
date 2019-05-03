"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var busback_component_1 = require("~/pages/busback/busback.component");
var routes = [
    { path: "", component: busback_component_1.BusbackComponent }
];
var BusbackRoutingModule = /** @class */ (function () {
    function BusbackRoutingModule() {
    }
    BusbackRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.NativeScriptRouterModule.forChild(routes)],
            exports: [router_1.NativeScriptRouterModule]
        })
    ], BusbackRoutingModule);
    return BusbackRoutingModule;
}());
exports.BusbackRoutingModule = BusbackRoutingModule;
