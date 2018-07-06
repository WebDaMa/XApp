"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("nativescript-angular/common");
var checkin_component_1 = require("./checkin.component");
var CheckinModule = /** @class */ (function () {
    function CheckinModule() {
    }
    CheckinModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.NativeScriptCommonModule
            ],
            declarations: [
                checkin_component_1.CheckinComponent
            ],
            schemas: [
                core_1.NO_ERRORS_SCHEMA
            ]
        })
    ], CheckinModule);
    return CheckinModule;
}());
exports.CheckinModule = CheckinModule;
