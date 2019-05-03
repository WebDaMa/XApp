"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var lodging_component_1 = require("~/pages/lodging/lodging.component");
var routes = [
    { path: "", component: lodging_component_1.LodgingComponent }
];
var LodgingRoutingModule = /** @class */ (function () {
    function LodgingRoutingModule() {
    }
    LodgingRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.NativeScriptRouterModule.forChild(routes)],
            exports: [router_1.NativeScriptRouterModule]
        })
    ], LodgingRoutingModule);
    return LodgingRoutingModule;
}());
exports.LodgingRoutingModule = LodgingRoutingModule;
