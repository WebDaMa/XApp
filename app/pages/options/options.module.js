"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var nativescript_angular_1 = require("nativescript-angular");
var common_1 = require("nativescript-angular/common");
var angular_1 = require("nativescript-ui-dataform/angular");
var options_routing_module_1 = require("~/pages/options/options-routing.module");
var options_component_1 = require("./options.component");
var OptionsModule = /** @class */ (function () {
    function OptionsModule() {
    }
    OptionsModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.NativeScriptCommonModule,
                options_routing_module_1.OptionsRoutingModule,
                nativescript_angular_1.NativeScriptFormsModule,
                angular_1.NativeScriptUIDataFormModule
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3B0aW9ucy5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJvcHRpb25zLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEyRDtBQUUzRCw2REFBK0Q7QUFDL0Qsc0RBQXVFO0FBQ3ZFLDREQUFnRjtBQUNoRixpRkFBOEU7QUFDOUUseURBQXVEO0FBZ0J2RDtJQUFBO0lBQTZCLENBQUM7SUFBakIsYUFBYTtRQWR6QixlQUFRLENBQUM7WUFDTixPQUFPLEVBQUU7Z0JBQ0wsaUNBQXdCO2dCQUN4Qiw2Q0FBb0I7Z0JBQ3BCLDhDQUF1QjtnQkFDdkIsc0NBQTRCO2FBQy9CO1lBQ0QsWUFBWSxFQUFFO2dCQUNWLG9DQUFnQjthQUNuQjtZQUNELE9BQU8sRUFBRTtnQkFDTCx1QkFBZ0I7YUFDbkI7U0FDSixDQUFDO09BQ1csYUFBYSxDQUFJO0lBQUQsb0JBQUM7Q0FBQSxBQUE5QixJQUE4QjtBQUFqQixzQ0FBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBOT19FUlJPUlNfU0NIRU1BIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcblxuaW1wb3J0IHsgTmF0aXZlU2NyaXB0Rm9ybXNNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXJcIjtcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdENvbW1vbk1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9jb21tb25cIjtcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdFVJRGF0YUZvcm1Nb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXVpLWRhdGFmb3JtL2FuZ3VsYXJcIjtcbmltcG9ydCB7IE9wdGlvbnNSb3V0aW5nTW9kdWxlIH0gZnJvbSBcIn4vcGFnZXMvb3B0aW9ucy9vcHRpb25zLXJvdXRpbmcubW9kdWxlXCI7XG5pbXBvcnQgeyBPcHRpb25zQ29tcG9uZW50IH0gZnJvbSBcIi4vb3B0aW9ucy5jb21wb25lbnRcIjtcblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIE5hdGl2ZVNjcmlwdENvbW1vbk1vZHVsZSxcbiAgICAgICAgT3B0aW9uc1JvdXRpbmdNb2R1bGUsXG4gICAgICAgIE5hdGl2ZVNjcmlwdEZvcm1zTW9kdWxlLFxuICAgICAgICBOYXRpdmVTY3JpcHRVSURhdGFGb3JtTW9kdWxlXG4gICAgXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgICAgT3B0aW9uc0NvbXBvbmVudFxuICAgIF0sXG4gICAgc2NoZW1hczogW1xuICAgICAgICBOT19FUlJPUlNfU0NIRU1BXG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBPcHRpb25zTW9kdWxlIHsgfVxuIl19