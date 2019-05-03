"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var nativescript_angular_1 = require("nativescript-angular");
var common_1 = require("nativescript-angular/common");
var http_client_1 = require("nativescript-angular/http-client");
var angular_1 = require("nativescript-ui-dataform/angular");
var volpension_routing_module_1 = require("~/pages/volpension/volpension-routing.module");
var volpension_component_1 = require("./volpension.component");
var VolpensionModule = /** @class */ (function () {
    function VolpensionModule() {
    }
    VolpensionModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.NativeScriptCommonModule,
                volpension_routing_module_1.VolpensionRoutingModule,
                nativescript_angular_1.NativeScriptFormsModule,
                http_client_1.NativeScriptHttpClientModule,
                angular_1.NativeScriptUIDataFormModule
            ],
            declarations: [
                volpension_component_1.VolpensionComponent
            ],
            schemas: [
                core_1.NO_ERRORS_SCHEMA
            ]
        })
    ], VolpensionModule);
    return VolpensionModule;
}());
exports.VolpensionModule = VolpensionModule;
