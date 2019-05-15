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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2Vla092ZXJ2aWV3Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIndlZWtPdmVydmlldy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkQ7QUFDM0Qsc0RBQXVFO0FBRXZFLDZEQUErRDtBQUMvRCw0REFBZ0Y7QUFDaEYsZ0dBQTZGO0FBQzdGLG1FQUFpRTtBQWdCakU7SUFBQTtJQUFrQyxDQUFDO0lBQXRCLGtCQUFrQjtRQWQ5QixlQUFRLENBQUM7WUFDTixPQUFPLEVBQUU7Z0JBQ0wsaUNBQXdCO2dCQUN4Qix1REFBeUI7Z0JBQ3pCLDhDQUF1QjtnQkFDdkIsc0NBQTRCO2FBQy9CO1lBQ0QsWUFBWSxFQUFFO2dCQUNWLDhDQUFxQjthQUN4QjtZQUNELE9BQU8sRUFBRTtnQkFDTCx1QkFBZ0I7YUFDbkI7U0FDSixDQUFDO09BQ1csa0JBQWtCLENBQUk7SUFBRCx5QkFBQztDQUFBLEFBQW5DLElBQW1DO0FBQXRCLGdEQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBOT19FUlJPUlNfU0NIRU1BIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgTmF0aXZlU2NyaXB0Q29tbW9uTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2NvbW1vblwiO1xyXG5cclxuaW1wb3J0IHsgTmF0aXZlU2NyaXB0Rm9ybXNNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXJcIjtcclxuaW1wb3J0IHsgTmF0aXZlU2NyaXB0VUlEYXRhRm9ybU1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtdWktZGF0YWZvcm0vYW5ndWxhclwiO1xyXG5pbXBvcnQgeyBXZWVrT3ZlcnZpZXdSb3V0aW5nTW9kdWxlIH0gZnJvbSBcIn4vcGFnZXMvd2Vla092ZXJ2aWV3L3dlZWtPdmVydmlldy1yb3V0aW5nLm1vZHVsZVwiO1xyXG5pbXBvcnQgeyBXZWVrT3ZlcnZpZXdDb21wb25lbnQgfSBmcm9tIFwiLi93ZWVrT3ZlcnZpZXcuY29tcG9uZW50XCI7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gICAgaW1wb3J0czogW1xyXG4gICAgICAgIE5hdGl2ZVNjcmlwdENvbW1vbk1vZHVsZSxcclxuICAgICAgICBXZWVrT3ZlcnZpZXdSb3V0aW5nTW9kdWxlLFxyXG4gICAgICAgIE5hdGl2ZVNjcmlwdEZvcm1zTW9kdWxlLFxyXG4gICAgICAgIE5hdGl2ZVNjcmlwdFVJRGF0YUZvcm1Nb2R1bGVcclxuICAgIF0sXHJcbiAgICBkZWNsYXJhdGlvbnM6IFtcclxuICAgICAgICBXZWVrT3ZlcnZpZXdDb21wb25lbnRcclxuICAgIF0sXHJcbiAgICBzY2hlbWFzOiBbXHJcbiAgICAgICAgTk9fRVJST1JTX1NDSEVNQVxyXG4gICAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgV2Vla092ZXJ2aWV3TW9kdWxlIHsgfVxyXG4iXX0=