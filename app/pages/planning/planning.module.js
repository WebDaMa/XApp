"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var nativescript_angular_1 = require("nativescript-angular");
var common_1 = require("nativescript-angular/common");
var http_client_1 = require("nativescript-angular/http-client");
var angular_1 = require("nativescript-ui-dataform/angular");
var planning_routing_module_1 = require("~/pages/planning/planning-routing.module");
var planning_component_1 = require("./planning.component");
var PlanningModule = /** @class */ (function () {
    function PlanningModule() {
    }
    PlanningModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.NativeScriptCommonModule,
                planning_routing_module_1.PlanningRoutingModule,
                nativescript_angular_1.NativeScriptFormsModule,
                http_client_1.NativeScriptHttpClientModule,
                angular_1.NativeScriptUIDataFormModule
            ],
            declarations: [
                planning_component_1.PlanningComponent
            ],
            schemas: [
                core_1.NO_ERRORS_SCHEMA
            ]
        })
    ], PlanningModule);
    return PlanningModule;
}());
exports.PlanningModule = PlanningModule;
