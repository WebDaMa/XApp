"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var signup_component_1 = require("./signup.component");
var routes = [
    { path: "", component: signup_component_1.SignupComponent }
];
var SignupRoutingModule = /** @class */ (function () {
    function SignupRoutingModule() {
    }
    SignupRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.NativeScriptRouterModule.forChild(routes)],
            exports: [router_1.NativeScriptRouterModule]
        })
    ], SignupRoutingModule);
    return SignupRoutingModule;
}());
exports.SignupRoutingModule = SignupRoutingModule;
