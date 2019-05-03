"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var options_component_1 = require("~/pages/options/options.component");
var routes = [
    { path: "", redirectTo: "options" },
    { path: "options", component: options_component_1.OptionsComponent }
];
var OptionsRoutingModule = /** @class */ (function () {
    function OptionsRoutingModule() {
    }
    OptionsRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.NativeScriptRouterModule.forChild(routes)],
            exports: [router_1.NativeScriptRouterModule]
        })
    ], OptionsRoutingModule);
    return OptionsRoutingModule;
}());
exports.OptionsRoutingModule = OptionsRoutingModule;
