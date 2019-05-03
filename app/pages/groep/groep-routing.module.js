"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var groep_component_1 = require("~/pages/groep/groep.component");
var routes = [
    { path: "", component: groep_component_1.GroepComponent }
];
var GroepRoutingModule = /** @class */ (function () {
    function GroepRoutingModule() {
    }
    GroepRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.NativeScriptRouterModule.forChild(routes)],
            exports: [router_1.NativeScriptRouterModule]
        })
    ], GroepRoutingModule);
    return GroepRoutingModule;
}());
exports.GroepRoutingModule = GroepRoutingModule;
