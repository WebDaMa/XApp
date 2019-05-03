"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var nativescript_angular_1 = require("nativescript-angular");
var common_1 = require("nativescript-angular/common");
var http_client_1 = require("nativescript-angular/http-client");
var angular_1 = require("nativescript-ui-dataform/angular");
var lodging_routing_module_1 = require("~/pages/lodging/lodging-routing.module");
var lodging_component_1 = require("./lodging.component");
var LodgingModule = /** @class */ (function () {
    function LodgingModule() {
    }
    LodgingModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.NativeScriptCommonModule,
                lodging_routing_module_1.LodgingRoutingModule,
                nativescript_angular_1.NativeScriptFormsModule,
                http_client_1.NativeScriptHttpClientModule,
                angular_1.NativeScriptUIDataFormModule
            ],
            declarations: [
                lodging_component_1.LodgingComponent
            ],
            schemas: [
                core_1.NO_ERRORS_SCHEMA
            ]
        })
    ], LodgingModule);
    return LodgingModule;
}());
exports.LodgingModule = LodgingModule;
