"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("nativescript-angular/common");
var materials_routing_module_1 = require("~/pages/materials/materials-routing.module");
var materials_settings_component_1 = require("~/pages/materials/materials-settings/materials-settings.component");
var materials_component_1 = require("./materials.component");
var MaterialsModule = /** @class */ (function () {
    function MaterialsModule() {
    }
    MaterialsModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.NativeScriptCommonModule,
                materials_routing_module_1.MaterialsRoutingModule
            ],
            declarations: [
                materials_component_1.MaterialsComponent,
                materials_settings_component_1.MaterialsSettingsComponent
            ],
            schemas: [
                core_1.NO_ERRORS_SCHEMA
            ]
        })
    ], MaterialsModule);
    return MaterialsModule;
}());
exports.MaterialsModule = MaterialsModule;
