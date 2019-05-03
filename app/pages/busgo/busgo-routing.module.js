"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var busgo_component_1 = require("~/pages/busgo/busgo.component");
var routes = [
    { path: "", component: busgo_component_1.BusgoComponent }
];
var BusgoRoutingModule = /** @class */ (function () {
    function BusgoRoutingModule() {
    }
    BusgoRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.NativeScriptRouterModule.forChild(routes)],
            exports: [router_1.NativeScriptRouterModule]
        })
    ], BusgoRoutingModule);
    return BusgoRoutingModule;
}());
exports.BusgoRoutingModule = BusgoRoutingModule;
