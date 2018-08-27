"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var login_component_1 = require("~/pages/login/login.component");
var materials_settings_component_1 = require("~/pages/materials-settings/materials-settings.component");
var routes = [
    { path: "", component: login_component_1.LoginComponent,
        children: [
            { path: "materials/settings", component: materials_settings_component_1.MaterialsSettingsComponent }
        ] }
];
var MaterialsRoutingModule = /** @class */ (function () {
    function MaterialsRoutingModule() {
    }
    MaterialsRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.NativeScriptRouterModule.forChild(routes)],
            exports: [router_1.NativeScriptRouterModule]
        })
    ], MaterialsRoutingModule);
    return MaterialsRoutingModule;
}());
exports.MaterialsRoutingModule = MaterialsRoutingModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0ZXJpYWxzLXJvdXRpbmcubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWF0ZXJpYWxzLXJvdXRpbmcubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQXlDO0FBRXpDLHNEQUF1RTtBQUV2RSxpRUFBK0Q7QUFDL0Qsd0dBQXFHO0FBRXJHLElBQU0sTUFBTSxHQUFXO0lBQ25CLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxTQUFTLEVBQUUsZ0NBQWM7UUFDbkMsUUFBUSxFQUFFO1lBQ0osRUFBRSxJQUFJLEVBQUUsb0JBQW9CLEVBQUUsU0FBUyxFQUFFLHlEQUEwQixFQUFFO1NBQ3hFLEVBQUM7Q0FDVCxDQUFDO0FBTUY7SUFBQTtJQUFzQyxDQUFDO0lBQTFCLHNCQUFzQjtRQUpsQyxlQUFRLENBQUM7WUFDTixPQUFPLEVBQUUsQ0FBQyxpQ0FBd0IsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDcEQsT0FBTyxFQUFFLENBQUMsaUNBQXdCLENBQUM7U0FDdEMsQ0FBQztPQUNXLHNCQUFzQixDQUFJO0lBQUQsNkJBQUM7Q0FBQSxBQUF2QyxJQUF1QztBQUExQix3REFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBSb3V0ZXMgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRSb3V0ZXJNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XG5cbmltcG9ydCB7IExvZ2luQ29tcG9uZW50IH0gZnJvbSBcIn4vcGFnZXMvbG9naW4vbG9naW4uY29tcG9uZW50XCI7XG5pbXBvcnQgeyBNYXRlcmlhbHNTZXR0aW5nc0NvbXBvbmVudCB9IGZyb20gXCJ+L3BhZ2VzL21hdGVyaWFscy1zZXR0aW5ncy9tYXRlcmlhbHMtc2V0dGluZ3MuY29tcG9uZW50XCI7XG5cbmNvbnN0IHJvdXRlczogUm91dGVzID0gW1xuICAgIHsgcGF0aDogXCJcIiwgY29tcG9uZW50OiBMb2dpbkNvbXBvbmVudCxcbiAgICAgIGNoaWxkcmVuOiBbXG4gICAgICAgICAgICB7IHBhdGg6IFwibWF0ZXJpYWxzL3NldHRpbmdzXCIsIGNvbXBvbmVudDogTWF0ZXJpYWxzU2V0dGluZ3NDb21wb25lbnQgfVxuICAgICAgICBdfVxuXTtcblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbTmF0aXZlU2NyaXB0Um91dGVyTW9kdWxlLmZvckNoaWxkKHJvdXRlcyldLFxuICAgIGV4cG9ydHM6IFtOYXRpdmVTY3JpcHRSb3V0ZXJNb2R1bGVdXG59KVxuZXhwb3J0IGNsYXNzIE1hdGVyaWFsc1JvdXRpbmdNb2R1bGUgeyB9XG4iXX0=