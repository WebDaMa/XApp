"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("nativescript-angular/common");
var sizes_component_1 = require("./sizes.component");
var SizesModule = /** @class */ (function () {
    function SizesModule() {
    }
    SizesModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.NativeScriptCommonModule
            ],
            declarations: [
                sizes_component_1.SizesComponent
            ],
            schemas: [
                core_1.NO_ERRORS_SCHEMA
            ]
        })
    ], SizesModule);
    return SizesModule;
}());
exports.SizesModule = SizesModule;
