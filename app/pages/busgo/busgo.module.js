"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var nativescript_angular_1 = require("nativescript-angular");
var common_1 = require("nativescript-angular/common");
var http_client_1 = require("nativescript-angular/http-client");
var angular_1 = require("nativescript-ui-dataform/angular");
var busgo_routing_module_1 = require("~/pages/busgo/busgo-routing.module");
var busgo_component_1 = require("./busgo.component");
var BusgoModule = /** @class */ (function () {
    function BusgoModule() {
    }
    BusgoModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.NativeScriptCommonModule,
                busgo_routing_module_1.BusgoRoutingModule,
                nativescript_angular_1.NativeScriptFormsModule,
                http_client_1.NativeScriptHttpClientModule,
                angular_1.NativeScriptUIDataFormModule
            ],
            declarations: [
                busgo_component_1.BusgoComponent
            ],
            schemas: [
                core_1.NO_ERRORS_SCHEMA
            ]
        })
    ], BusgoModule);
    return BusgoModule;
}());
exports.BusgoModule = BusgoModule;
