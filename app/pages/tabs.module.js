"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("nativescript-angular/common");
var materials_component_1 = require("./materials/materials.component");
var options_component_1 = require("./options/options.component");
var sizes_component_1 = require("./sizes/sizes.component");
var tabs_routing_module_1 = require("./tabs-routing.module");
var tabs_component_1 = require("./tabs.component");
var checkin_component_1 = require("~/pages/checkin/checkin.component");
var TabsModule = /** @class */ (function () {
    function TabsModule() {
    }
    TabsModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.NativeScriptCommonModule,
                tabs_routing_module_1.TabsRoutingModule
            ],
            declarations: [
                checkin_component_1.CheckinComponent,
                tabs_component_1.TabsComponent,
                materials_component_1.MaterialsComponent,
                options_component_1.OptionsComponent,
                sizes_component_1.SizesComponent
            ],
            schemas: [
                core_1.NO_ERRORS_SCHEMA
            ]
        })
    ], TabsModule);
    return TabsModule;
}());
exports.TabsModule = TabsModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFicy5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0YWJzLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEyRDtBQUMzRCxzREFBdUU7QUFFdkUsdUVBQXFFO0FBQ3JFLGlFQUErRDtBQUUvRCwyREFBeUQ7QUFDekQsNkRBQTBEO0FBQzFELG1EQUFpRDtBQUNqRCx1RUFBbUU7QUFrQm5FO0lBQUE7SUFBMEIsQ0FBQztJQUFkLFVBQVU7UUFoQnRCLGVBQVEsQ0FBQztZQUNOLE9BQU8sRUFBRTtnQkFDTCxpQ0FBd0I7Z0JBQ3hCLHVDQUFpQjthQUNwQjtZQUNELFlBQVksRUFBRTtnQkFDVixvQ0FBZ0I7Z0JBQ2hCLDhCQUFhO2dCQUNiLHdDQUFrQjtnQkFDbEIsb0NBQWdCO2dCQUNoQixnQ0FBYzthQUNqQjtZQUNELE9BQU8sRUFBRTtnQkFDTCx1QkFBZ0I7YUFDbkI7U0FDSixDQUFDO09BQ1csVUFBVSxDQUFJO0lBQUQsaUJBQUM7Q0FBQSxBQUEzQixJQUEyQjtBQUFkLGdDQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE5PX0VSUk9SU19TQ0hFTUEgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRDb21tb25Nb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvY29tbW9uXCI7XHJcblxyXG5pbXBvcnQgeyBNYXRlcmlhbHNDb21wb25lbnQgfSBmcm9tIFwiLi9tYXRlcmlhbHMvbWF0ZXJpYWxzLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBPcHRpb25zQ29tcG9uZW50IH0gZnJvbSBcIi4vb3B0aW9ucy9vcHRpb25zLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBTZXR0aW5nc0NvbXBvbmVudCB9IGZyb20gXCIuL3NldHRpbmdzL3NldHRpbmdzLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBTaXplc0NvbXBvbmVudCB9IGZyb20gXCIuL3NpemVzL3NpemVzLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBUYWJzUm91dGluZ01vZHVsZSB9IGZyb20gXCIuL3RhYnMtcm91dGluZy5tb2R1bGVcIjtcclxuaW1wb3J0IHsgVGFic0NvbXBvbmVudCB9IGZyb20gXCIuL3RhYnMuY29tcG9uZW50XCI7XHJcbmltcG9ydCB7Q2hlY2tpbkNvbXBvbmVudH0gZnJvbSBcIn4vcGFnZXMvY2hlY2tpbi9jaGVja2luLmNvbXBvbmVudFwiO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICAgIGltcG9ydHM6IFtcclxuICAgICAgICBOYXRpdmVTY3JpcHRDb21tb25Nb2R1bGUsXHJcbiAgICAgICAgVGFic1JvdXRpbmdNb2R1bGVcclxuICAgIF0sXHJcbiAgICBkZWNsYXJhdGlvbnM6IFtcclxuICAgICAgICBDaGVja2luQ29tcG9uZW50LFxyXG4gICAgICAgIFRhYnNDb21wb25lbnQsXHJcbiAgICAgICAgTWF0ZXJpYWxzQ29tcG9uZW50LFxyXG4gICAgICAgIE9wdGlvbnNDb21wb25lbnQsXHJcbiAgICAgICAgU2l6ZXNDb21wb25lbnRcclxuICAgIF0sXHJcbiAgICBzY2hlbWFzOiBbXHJcbiAgICAgICAgTk9fRVJST1JTX1NDSEVNQVxyXG4gICAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgVGFic01vZHVsZSB7IH1cclxuIl19