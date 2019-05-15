"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var nativescript_angular_1 = require("nativescript-angular");
var common_1 = require("nativescript-angular/common");
var http_client_1 = require("nativescript-angular/http-client");
var angular_1 = require("nativescript-ui-dataform/angular");
var planning_routing_module_1 = require("~/pages/planning/planning-routing.module");
var planning_component_1 = require("./planning.component");
var PlanningModule = /** @class */ (function () {
    function PlanningModule() {
    }
    PlanningModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.NativeScriptCommonModule,
                planning_routing_module_1.PlanningRoutingModule,
                nativescript_angular_1.NativeScriptFormsModule,
                http_client_1.NativeScriptHttpClientModule,
                angular_1.NativeScriptUIDataFormModule
            ],
            declarations: [
                planning_component_1.PlanningComponent
            ],
            schemas: [
                core_1.NO_ERRORS_SCHEMA
            ]
        })
    ], PlanningModule);
    return PlanningModule;
}());
exports.PlanningModule = PlanningModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxhbm5pbmcubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicGxhbm5pbmcubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJEO0FBRTNELDZEQUErRDtBQUMvRCxzREFBdUU7QUFDdkUsZ0VBQWdGO0FBQ2hGLDREQUFnRjtBQUNoRixvRkFBaUY7QUFDakYsMkRBQXlEO0FBaUJ6RDtJQUFBO0lBQThCLENBQUM7SUFBbEIsY0FBYztRQWYxQixlQUFRLENBQUM7WUFDTixPQUFPLEVBQUU7Z0JBQ0wsaUNBQXdCO2dCQUN4QiwrQ0FBcUI7Z0JBQ3JCLDhDQUF1QjtnQkFDdkIsMENBQTRCO2dCQUM1QixzQ0FBNEI7YUFDL0I7WUFDRCxZQUFZLEVBQUU7Z0JBQ1Ysc0NBQWlCO2FBQ3BCO1lBQ0QsT0FBTyxFQUFFO2dCQUNMLHVCQUFnQjthQUNuQjtTQUNKLENBQUM7T0FDVyxjQUFjLENBQUk7SUFBRCxxQkFBQztDQUFBLEFBQS9CLElBQStCO0FBQWxCLHdDQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE5PX0VSUk9SU19TQ0hFTUEgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuXG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRGb3Jtc01vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhclwiO1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0Q29tbW9uTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2NvbW1vblwiO1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0SHR0cENsaWVudE1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9odHRwLWNsaWVudFwiO1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0VUlEYXRhRm9ybU1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtdWktZGF0YWZvcm0vYW5ndWxhclwiO1xuaW1wb3J0IHsgUGxhbm5pbmdSb3V0aW5nTW9kdWxlIH0gZnJvbSBcIn4vcGFnZXMvcGxhbm5pbmcvcGxhbm5pbmctcm91dGluZy5tb2R1bGVcIjtcbmltcG9ydCB7IFBsYW5uaW5nQ29tcG9uZW50IH0gZnJvbSBcIi4vcGxhbm5pbmcuY29tcG9uZW50XCI7XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW1xuICAgICAgICBOYXRpdmVTY3JpcHRDb21tb25Nb2R1bGUsXG4gICAgICAgIFBsYW5uaW5nUm91dGluZ01vZHVsZSxcbiAgICAgICAgTmF0aXZlU2NyaXB0Rm9ybXNNb2R1bGUsXG4gICAgICAgIE5hdGl2ZVNjcmlwdEh0dHBDbGllbnRNb2R1bGUsXG4gICAgICAgIE5hdGl2ZVNjcmlwdFVJRGF0YUZvcm1Nb2R1bGVcbiAgICBdLFxuICAgIGRlY2xhcmF0aW9uczogW1xuICAgICAgICBQbGFubmluZ0NvbXBvbmVudFxuICAgIF0sXG4gICAgc2NoZW1hczogW1xuICAgICAgICBOT19FUlJPUlNfU0NIRU1BXG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBQbGFubmluZ01vZHVsZSB7IH1cbiJdfQ==