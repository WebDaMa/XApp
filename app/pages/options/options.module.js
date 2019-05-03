"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var nativescript_angular_1 = require("nativescript-angular");
var common_1 = require("nativescript-angular/common");
var angular_1 = require("nativescript-ui-dataform/angular");
var options_routing_module_1 = require("~/pages/options/options-routing.module");
var options_component_1 = require("./options.component");
var OptionsModule = /** @class */ (function () {
    function OptionsModule() {
    }
    OptionsModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.NativeScriptCommonModule,
                options_routing_module_1.OptionsRoutingModule,
                nativescript_angular_1.NativeScriptFormsModule,
                angular_1.NativeScriptUIDataFormModule
            ],
            declarations: [
                options_component_1.OptionsComponent
            ],
            schemas: [
                core_1.NO_ERRORS_SCHEMA
            ]
        })
    ], OptionsModule);
    return OptionsModule;
}());
exports.OptionsModule = OptionsModule;
