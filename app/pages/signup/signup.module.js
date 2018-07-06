"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var nativescript_module_1 = require("nativescript-angular/nativescript.module");
var signup_component_1 = require("./signup.component");
var SignupModule = /** @class */ (function () {
    function SignupModule() {
    }
    SignupModule = __decorate([
        core_1.NgModule({
            imports: [
                nativescript_module_1.NativeScriptModule
            ],
            declarations: [
                signup_component_1.SignupComponent
            ],
            schemas: [
                core_1.NO_ERRORS_SCHEMA
            ]
        })
    ], SignupModule);
    return SignupModule;
}());
exports.SignupModule = SignupModule;
