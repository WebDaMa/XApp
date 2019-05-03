"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var planning_component_1 = require("~/pages/planning/planning.component");
var routes = [
    { path: "", component: planning_component_1.PlanningComponent }
];
var PlanningRoutingModule = /** @class */ (function () {
    function PlanningRoutingModule() {
    }
    PlanningRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.NativeScriptRouterModule.forChild(routes)],
            exports: [router_1.NativeScriptRouterModule]
        })
    ], PlanningRoutingModule);
    return PlanningRoutingModule;
}());
exports.PlanningRoutingModule = PlanningRoutingModule;
