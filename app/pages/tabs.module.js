"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("nativescript-angular/common");
var http_client_1 = require("nativescript-angular/http-client");
var tabs_routing_module_1 = require("~/pages/tabs-routing.module");
var tabs_component_1 = require("./tabs.component");
var TabsModule = /** @class */ (function () {
    function TabsModule() {
    }
    TabsModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.NativeScriptCommonModule,
                http_client_1.NativeScriptHttpClientModule,
                tabs_routing_module_1.TabsRoutingModule
            ],
            declarations: [
                tabs_component_1.TabsComponent
            ],
            providers: [],
            schemas: [core_1.NO_ERRORS_SCHEMA]
        })
    ], TabsModule);
    return TabsModule;
}());
exports.TabsModule = TabsModule;
