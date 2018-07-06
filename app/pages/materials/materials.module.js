"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("nativescript-angular/common");
var materials_component_1 = require("./materials.component");
var MaterialsModule = /** @class */ (function () {
    function MaterialsModule() {
    }
    MaterialsModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.NativeScriptCommonModule,
            ],
            declarations: [
                materials_component_1.MaterialsComponent
            ],
            schemas: [
                core_1.NO_ERRORS_SCHEMA
            ]
        })
    ], MaterialsModule);
    return MaterialsModule;
}());
exports.MaterialsModule = MaterialsModule;
