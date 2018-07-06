"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("nativescript-angular/common");
var options_component_1 = require("./options.component");
var OptionsModule = /** @class */ (function () {
    function OptionsModule() {
    }
    OptionsModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.NativeScriptCommonModule
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
