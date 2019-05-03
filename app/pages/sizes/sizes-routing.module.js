"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var sizes_component_1 = require("~/pages/sizes/sizes.component");
var routes = [
    { path: "", redirectTo: "sizes" },
    { path: "sizes", component: sizes_component_1.SizesComponent }
];
var SizesRoutingModule = /** @class */ (function () {
    function SizesRoutingModule() {
    }
    SizesRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.NativeScriptRouterModule.forChild(routes)],
            exports: [router_1.NativeScriptRouterModule]
        })
    ], SizesRoutingModule);
    return SizesRoutingModule;
}());
exports.SizesRoutingModule = SizesRoutingModule;
