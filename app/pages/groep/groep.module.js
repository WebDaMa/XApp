"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var nativescript_angular_1 = require("nativescript-angular");
var common_1 = require("nativescript-angular/common");
var http_client_1 = require("nativescript-angular/http-client");
var angular_1 = require("nativescript-ui-dataform/angular");
var groep_routing_module_1 = require("~/pages/groep/groep-routing.module");
var groep_component_1 = require("./groep.component");
var GroepModule = /** @class */ (function () {
    function GroepModule() {
    }
    GroepModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.NativeScriptCommonModule,
                groep_routing_module_1.GroepRoutingModule,
                nativescript_angular_1.NativeScriptFormsModule,
                http_client_1.NativeScriptHttpClientModule,
                angular_1.NativeScriptUIDataFormModule
            ],
            declarations: [
                groep_component_1.GroepComponent
            ],
            schemas: [
                core_1.NO_ERRORS_SCHEMA
            ]
        })
    ], GroepModule);
    return GroepModule;
}());
exports.GroepModule = GroepModule;
