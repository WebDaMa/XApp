"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var nativescript_angular_1 = require("nativescript-angular");
var common_1 = require("nativescript-angular/common");
var angular_1 = require("nativescript-ui-dataform/angular");
var sizes_routing_module_1 = require("~/pages/sizes/sizes-routing.module");
var sizes_component_1 = require("./sizes.component");
var SizesModule = /** @class */ (function () {
    function SizesModule() {
    }
    SizesModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.NativeScriptCommonModule,
                sizes_routing_module_1.SizesRoutingModule,
                nativescript_angular_1.NativeScriptFormsModule,
                angular_1.NativeScriptUIDataFormModule
            ],
            declarations: [
                sizes_component_1.SizesComponent
            ],
            schemas: [
                core_1.NO_ERRORS_SCHEMA
            ]
        })
    ], SizesModule);
    return SizesModule;
}());
exports.SizesModule = SizesModule;
