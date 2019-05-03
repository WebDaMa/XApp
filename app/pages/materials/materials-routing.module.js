"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var materials_settings_component_1 = require("~/pages/materials/materials-settings/materials-settings.component");
var materials_component_1 = require("~/pages/materials/materials.component");
var routes = [
    { path: "", redirectTo: "materials" },
    { path: "materials", component: materials_component_1.MaterialsComponent },
    { path: "materials/settings", component: materials_settings_component_1.MaterialsSettingsComponent }
];
var MaterialsRoutingModule = /** @class */ (function () {
    function MaterialsRoutingModule() {
    }
    MaterialsRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.NativeScriptRouterModule.forChild(routes)],
            exports: [router_1.NativeScriptRouterModule]
        })
    ], MaterialsRoutingModule);
    return MaterialsRoutingModule;
}());
exports.MaterialsRoutingModule = MaterialsRoutingModule;
