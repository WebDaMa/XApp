"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("nativescript-angular/common");
var materials_routing_module_1 = require("~/pages/materials/materials-routing.module");
var materials_settings_component_1 = require("~/pages/materials/materials-settings/materials-settings.component");
var materials_component_1 = require("./materials.component");
var MaterialsModule = /** @class */ (function () {
    function MaterialsModule() {
    }
    MaterialsModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.NativeScriptCommonModule,
                materials_routing_module_1.MaterialsRoutingModule
            ],
            declarations: [
                materials_component_1.MaterialsComponent,
                materials_settings_component_1.MaterialsSettingsComponent
            ],
            schemas: [
                core_1.NO_ERRORS_SCHEMA
            ]
        })
    ], MaterialsModule);
    return MaterialsModule;
}());
exports.MaterialsModule = MaterialsModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0ZXJpYWxzLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1hdGVyaWFscy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkQ7QUFDM0Qsc0RBQXVFO0FBRXZFLHVGQUFvRjtBQUNwRixrSEFBK0c7QUFDL0csNkRBQTJEO0FBZTNEO0lBQUE7SUFBK0IsQ0FBQztJQUFuQixlQUFlO1FBYjNCLGVBQVEsQ0FBQztZQUNOLE9BQU8sRUFBRTtnQkFDTCxpQ0FBd0I7Z0JBQ3hCLGlEQUFzQjthQUN6QjtZQUNELFlBQVksRUFBRTtnQkFDVix3Q0FBa0I7Z0JBQ2xCLHlEQUEwQjthQUM3QjtZQUNELE9BQU8sRUFBRTtnQkFDTCx1QkFBZ0I7YUFDbkI7U0FDSixDQUFDO09BQ1csZUFBZSxDQUFJO0lBQUQsc0JBQUM7Q0FBQSxBQUFoQyxJQUFnQztBQUFuQiwwQ0FBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBOT19FUlJPUlNfU0NIRU1BIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgTmF0aXZlU2NyaXB0Q29tbW9uTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2NvbW1vblwiO1xyXG5cclxuaW1wb3J0IHsgTWF0ZXJpYWxzUm91dGluZ01vZHVsZSB9IGZyb20gXCJ+L3BhZ2VzL21hdGVyaWFscy9tYXRlcmlhbHMtcm91dGluZy5tb2R1bGVcIjtcclxuaW1wb3J0IHsgTWF0ZXJpYWxzU2V0dGluZ3NDb21wb25lbnQgfSBmcm9tIFwifi9wYWdlcy9tYXRlcmlhbHMvbWF0ZXJpYWxzLXNldHRpbmdzL21hdGVyaWFscy1zZXR0aW5ncy5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgTWF0ZXJpYWxzQ29tcG9uZW50IH0gZnJvbSBcIi4vbWF0ZXJpYWxzLmNvbXBvbmVudFwiO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICAgIGltcG9ydHM6IFtcclxuICAgICAgICBOYXRpdmVTY3JpcHRDb21tb25Nb2R1bGUsXHJcbiAgICAgICAgTWF0ZXJpYWxzUm91dGluZ01vZHVsZVxyXG4gICAgXSxcclxuICAgIGRlY2xhcmF0aW9uczogW1xyXG4gICAgICAgIE1hdGVyaWFsc0NvbXBvbmVudCxcclxuICAgICAgICBNYXRlcmlhbHNTZXR0aW5nc0NvbXBvbmVudFxyXG4gICAgXSxcclxuICAgIHNjaGVtYXM6IFtcclxuICAgICAgICBOT19FUlJPUlNfU0NIRU1BXHJcbiAgICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBNYXRlcmlhbHNNb2R1bGUgeyB9XHJcbiJdfQ==