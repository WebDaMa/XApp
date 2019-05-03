"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var nativescript_angular_1 = require("nativescript-angular");
var common_1 = require("nativescript-angular/common");
var http_client_1 = require("nativescript-angular/http-client");
var angular_1 = require("nativescript-ui-dataform/angular");
var checkinDetail_component_1 = require("~/pages/checkin/checkin-detail/checkinDetail.component");
var checkin_routing_module_1 = require("~/pages/checkin/checkin-routing.module");
var checkin_component_1 = require("./checkin.component");
var CheckinModule = /** @class */ (function () {
    function CheckinModule() {
    }
    CheckinModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.NativeScriptCommonModule,
                checkin_routing_module_1.CheckinRoutingModule,
                nativescript_angular_1.NativeScriptFormsModule,
                http_client_1.NativeScriptHttpClientModule,
                angular_1.NativeScriptUIDataFormModule
            ],
            declarations: [
                checkin_component_1.CheckinComponent,
                checkinDetail_component_1.CheckinDetailComponent
            ],
            schemas: [
                core_1.NO_ERRORS_SCHEMA
            ]
        })
    ], CheckinModule);
    return CheckinModule;
}());
exports.CheckinModule = CheckinModule;
