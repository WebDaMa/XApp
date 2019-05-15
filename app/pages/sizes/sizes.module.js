"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var nativescript_angular_1 = require("nativescript-angular");
var common_1 = require("nativescript-angular/common");
var angular_1 = require("nativescript-ui-dataform/angular");
var sizes_routing_module_1 = require("~/pages/sizes/sizes-routing.module");
var sizes_component_1 = require("./sizes.component");
var SizesModule = /** @class */ (function () {
    function SizesModule() {
    }
    SizesModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.NativeScriptCommonModule,
                sizes_routing_module_1.SizesRoutingModule,
                nativescript_angular_1.NativeScriptFormsModule,
                angular_1.NativeScriptUIDataFormModule
            ],
            declarations: [
                sizes_component_1.SizesComponent
            ],
            schemas: [
                core_1.NO_ERRORS_SCHEMA
            ]
        })
    ], SizesModule);
    return SizesModule;
}());
exports.SizesModule = SizesModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2l6ZXMubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2l6ZXMubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJEO0FBRTNELDZEQUErRDtBQUMvRCxzREFBdUU7QUFDdkUsNERBQWdGO0FBQ2hGLDJFQUF3RTtBQUN4RSxxREFBbUQ7QUFnQm5EO0lBQUE7SUFBMkIsQ0FBQztJQUFmLFdBQVc7UUFkdkIsZUFBUSxDQUFDO1lBQ04sT0FBTyxFQUFFO2dCQUNMLGlDQUF3QjtnQkFDeEIseUNBQWtCO2dCQUNsQiw4Q0FBdUI7Z0JBQ3ZCLHNDQUE0QjthQUMvQjtZQUNELFlBQVksRUFBRTtnQkFDVixnQ0FBYzthQUNqQjtZQUNELE9BQU8sRUFBRTtnQkFDTCx1QkFBZ0I7YUFDbkI7U0FDSixDQUFDO09BQ1csV0FBVyxDQUFJO0lBQUQsa0JBQUM7Q0FBQSxBQUE1QixJQUE0QjtBQUFmLGtDQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE5PX0VSUk9SU19TQ0hFTUEgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuXG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRGb3Jtc01vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhclwiO1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0Q29tbW9uTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2NvbW1vblwiO1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0VUlEYXRhRm9ybU1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtdWktZGF0YWZvcm0vYW5ndWxhclwiO1xuaW1wb3J0IHsgU2l6ZXNSb3V0aW5nTW9kdWxlIH0gZnJvbSBcIn4vcGFnZXMvc2l6ZXMvc2l6ZXMtcm91dGluZy5tb2R1bGVcIjtcbmltcG9ydCB7IFNpemVzQ29tcG9uZW50IH0gZnJvbSBcIi4vc2l6ZXMuY29tcG9uZW50XCI7XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW1xuICAgICAgICBOYXRpdmVTY3JpcHRDb21tb25Nb2R1bGUsXG4gICAgICAgIFNpemVzUm91dGluZ01vZHVsZSxcbiAgICAgICAgTmF0aXZlU2NyaXB0Rm9ybXNNb2R1bGUsXG4gICAgICAgIE5hdGl2ZVNjcmlwdFVJRGF0YUZvcm1Nb2R1bGVcbiAgICBdLFxuICAgIGRlY2xhcmF0aW9uczogW1xuICAgICAgICBTaXplc0NvbXBvbmVudFxuICAgIF0sXG4gICAgc2NoZW1hczogW1xuICAgICAgICBOT19FUlJPUlNfU0NIRU1BXG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBTaXplc01vZHVsZSB7IH1cbiJdfQ==