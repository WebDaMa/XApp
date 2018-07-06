"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var login_component_1 = require("~/pages/login/login.component");
var materials_settings_component_1 = require("~/pages/materials-settings/materials-settings.component");
var routes = [
    { path: "", component: login_component_1.LoginComponent,
        children: [
            { path: "materials/settings", component: materials_settings_component_1.MaterialsSettingsComponent }
        ] }
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
