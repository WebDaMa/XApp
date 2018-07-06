"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var checkin_component_1 = require("~/pages/checkin/checkin.component");
var materials_settings_component_1 = require("~/pages/materials-settings/materials-settings.component");
var materials_component_1 = require("~/pages/materials/materials.component");
var options_component_1 = require("~/pages/options/options.component");
var sizes_component_1 = require("~/pages/sizes/sizes.component");
var tabs_component_1 = require("~/pages/tabs.component");
var routes = [
    { path: "", redirectTo: "/login", pathMatch: "full" },
    { path: "login", loadChildren: "./pages/login/login.module#LoginModule" },
    { path: "settings", loadChildren: "./pages/settings/settings.module#SettingsModule" },
    { path: "tabs", component: tabs_component_1.TabsComponent, children: [
            { path: "materials", component: materials_component_1.MaterialsComponent, outlet: "materialsTab" },
            { path: "materials/settings", component: materials_settings_component_1.MaterialsSettingsComponent, outlet: "materialsTab" },
            { path: "sizes", component: sizes_component_1.SizesComponent, outlet: "sizesTab" },
            { path: "options", component: options_component_1.OptionsComponent, outlet: "optionsTab" },
            { path: "checkin", component: checkin_component_1.CheckinComponent, outlet: "checkinTab" }
        ] },
    /*current fix to skip outlets*/
    { path: "materials/settings", component: materials_settings_component_1.MaterialsSettingsComponent }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.NativeScriptRouterModule.forRoot(routes)],
            exports: [router_1.NativeScriptRouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
exports.navigatableComponents = [
    tabs_component_1.TabsComponent,
    materials_component_1.MaterialsComponent,
    materials_settings_component_1.MaterialsSettingsComponent,
    sizes_component_1.SizesComponent,
    options_component_1.OptionsComponent,
    checkin_component_1.CheckinComponent
];
