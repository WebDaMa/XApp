"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("nativescript-angular/common");
var nativescript_angular_1 = require("nativescript-angular");
var angular_1 = require("nativescript-ui-dataform/angular");
var weekOverview_routing_module_1 = require("~/pages/weekOverview/weekOverview-routing.module");
var weekOverview_component_1 = require("./weekOverview.component");
var WeekOverviewModule = /** @class */ (function () {
    function WeekOverviewModule() {
    }
    WeekOverviewModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.NativeScriptCommonModule,
                weekOverview_routing_module_1.WeekOverviewRoutingModule,
                nativescript_angular_1.NativeScriptFormsModule,
                angular_1.NativeScriptUIDataFormModule
            ],
            declarations: [
                weekOverview_component_1.WeekOverviewComponent
            ],
            schemas: [
                core_1.NO_ERRORS_SCHEMA
            ]
        })
    ], WeekOverviewModule);
    return WeekOverviewModule;
}());
exports.WeekOverviewModule = WeekOverviewModule;
