"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var materials_settings_component_1 = require("~/pages/materials/materials-settings/materials-settings.component");
var materials_component_1 = require("~/pages/materials/materials.component");
var routes = [
    { path: "", redirectTo: "materials" },
    { path: "materials", component: materials_component_1.MaterialsComponent },
    { path: "materials/settings", component: materials_settings_component_1.MaterialsSettingsComponent }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0ZXJpYWxzLXJvdXRpbmcubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWF0ZXJpYWxzLXJvdXRpbmcubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQXlDO0FBRXpDLHNEQUF1RTtBQUN2RSxrSEFBK0c7QUFDL0csNkVBQTJFO0FBRTNFLElBQU0sTUFBTSxHQUFXO0lBQ25CLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFO0lBQ3JDLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsd0NBQWtCLEVBQUU7SUFDcEQsRUFBRSxJQUFJLEVBQUUsb0JBQW9CLEVBQUUsU0FBUyxFQUFFLHlEQUEwQixFQUFDO0NBQ3ZFLENBQUM7QUFNRjtJQUFBO0lBQXNDLENBQUM7SUFBMUIsc0JBQXNCO1FBSmxDLGVBQVEsQ0FBQztZQUNOLE9BQU8sRUFBRSxDQUFDLGlDQUF3QixDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNwRCxPQUFPLEVBQUUsQ0FBQyxpQ0FBd0IsQ0FBQztTQUN0QyxDQUFDO09BQ1csc0JBQXNCLENBQUk7SUFBRCw2QkFBQztDQUFBLEFBQXZDLElBQXVDO0FBQTFCLHdEQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IFJvdXRlcyB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdFJvdXRlck1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IE1hdGVyaWFsc1NldHRpbmdzQ29tcG9uZW50IH0gZnJvbSBcIn4vcGFnZXMvbWF0ZXJpYWxzL21hdGVyaWFscy1zZXR0aW5ncy9tYXRlcmlhbHMtc2V0dGluZ3MuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBNYXRlcmlhbHNDb21wb25lbnQgfSBmcm9tIFwifi9wYWdlcy9tYXRlcmlhbHMvbWF0ZXJpYWxzLmNvbXBvbmVudFwiO1xuXG5jb25zdCByb3V0ZXM6IFJvdXRlcyA9IFtcbiAgICB7IHBhdGg6IFwiXCIsIHJlZGlyZWN0VG86IFwibWF0ZXJpYWxzXCIgfSxcbiAgICB7IHBhdGg6IFwibWF0ZXJpYWxzXCIsIGNvbXBvbmVudDogTWF0ZXJpYWxzQ29tcG9uZW50IH0sXG4gICAgeyBwYXRoOiBcIm1hdGVyaWFscy9zZXR0aW5nc1wiLCBjb21wb25lbnQ6IE1hdGVyaWFsc1NldHRpbmdzQ29tcG9uZW50fVxuXTtcblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbTmF0aXZlU2NyaXB0Um91dGVyTW9kdWxlLmZvckNoaWxkKHJvdXRlcyldLFxuICAgIGV4cG9ydHM6IFtOYXRpdmVTY3JpcHRSb3V0ZXJNb2R1bGVdXG59KVxuZXhwb3J0IGNsYXNzIE1hdGVyaWFsc1JvdXRpbmdNb2R1bGUgeyB9XG4iXX0=