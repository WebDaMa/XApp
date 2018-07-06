"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var nativescript_module_1 = require("nativescript-angular/nativescript.module");
var angular_1 = require("nativescript-ui-sidedrawer/angular");
var nativescript_angular_1 = require("nativescript-angular");
var http_client_1 = require("nativescript-angular/http-client");
var angular_2 = require("nativescript-ui-dataform/angular");
var app_routing_module_1 = require("./app-routing.module");
var app_component_1 = require("./app.component");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            bootstrap: [
                app_component_1.AppComponent
            ],
            imports: [
                app_routing_module_1.AppRoutingModule,
                nativescript_module_1.NativeScriptModule,
                nativescript_angular_1.NativeScriptFormsModule,
                http_client_1.NativeScriptHttpClientModule,
                nativescript_module_1.NativeScriptModule,
                angular_1.NativeScriptUISideDrawerModule,
                angular_2.NativeScriptUIDataFormModule
            ],
            declarations: [
                app_component_1.AppComponent
            ].concat(app_routing_module_1.navigatableComponents),
            schemas: [
                core_1.NO_ERRORS_SCHEMA
            ]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
