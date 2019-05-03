"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var nativescript_angular_1 = require("nativescript-angular");
var common_1 = require("nativescript-angular/common");
var http_client_1 = require("nativescript-angular/http-client");
var angular_1 = require("nativescript-ui-dataform/angular");
var busback_routing_module_1 = require("~/pages/busback/busback-routing.module");
var busback_component_1 = require("./busback.component");
var BusbackModule = /** @class */ (function () {
    function BusbackModule() {
    }
    BusbackModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.NativeScriptCommonModule,
                busback_routing_module_1.BusbackRoutingModule,
                nativescript_angular_1.NativeScriptFormsModule,
                http_client_1.NativeScriptHttpClientModule,
                angular_1.NativeScriptUIDataFormModule
            ],
            declarations: [
                busback_component_1.BusbackComponent
            ],
            schemas: [
                core_1.NO_ERRORS_SCHEMA
            ]
        })
    ], BusbackModule);
    return BusbackModule;
}());
exports.BusbackModule = BusbackModule;
