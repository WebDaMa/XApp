"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var volpension_component_1 = require("~/pages/volpension/volpension.component");
var routes = [
    { path: "", component: volpension_component_1.VolpensionComponent }
];
var VolpensionRoutingModule = /** @class */ (function () {
    function VolpensionRoutingModule() {
    }
    VolpensionRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.NativeScriptRouterModule.forChild(routes)],
            exports: [router_1.NativeScriptRouterModule]
        })
    ], VolpensionRoutingModule);
    return VolpensionRoutingModule;
}());
exports.VolpensionRoutingModule = VolpensionRoutingModule;
