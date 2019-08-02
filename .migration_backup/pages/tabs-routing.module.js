"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var tabs_component_1 = require("~/pages/tabs.component");
var routes = [
    {
        path: "default", component: tabs_component_1.TabsComponent, children: [
            {
                path: "materials",
                outlet: "materialsTab",
                component: router_1.NSEmptyOutletComponent,
                loadChildren: "~/pages/materials/materials.module#MaterialsModule"
            },
            {
                path: "weekOverview",
                outlet: "weekOverviewTab",
                component: router_1.NSEmptyOutletComponent,
                loadChildren: "~/pages/weekOverview/weekOverview.module#WeekOverviewModule"
            },
            {
                path: "sizes",
                outlet: "sizesTab",
                component: router_1.NSEmptyOutletComponent,
                loadChildren: "~/pages/sizes/sizes.module#SizesModule"
            },
            {
                path: "options",
                outlet: "optionsTab",
                component: router_1.NSEmptyOutletComponent,
                loadChildren: "~/pages/options/options.module#OptionsModule"
            }
        ]
    }
];
var TabsRoutingModule = /** @class */ (function () {
    function TabsRoutingModule() {
    }
    TabsRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.NativeScriptRouterModule.forChild(routes)],
            exports: [router_1.NativeScriptRouterModule]
        })
    ], TabsRoutingModule);
    return TabsRoutingModule;
}());
exports.TabsRoutingModule = TabsRoutingModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFicy1yb3V0aW5nLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRhYnMtcm91dGluZy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBeUM7QUFFekMsc0RBQStGO0FBRS9GLHlEQUF1RDtBQUV2RCxJQUFNLE1BQU0sR0FBVztJQUNuQjtRQUNJLElBQUksRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLDhCQUFhLEVBQUUsUUFBUSxFQUFFO1lBQ2pEO2dCQUNJLElBQUksRUFBRSxXQUFXO2dCQUNqQixNQUFNLEVBQUUsY0FBYztnQkFDdEIsU0FBUyxFQUFFLCtCQUFzQjtnQkFDakMsWUFBWSxFQUFFLG9EQUFvRDthQUNyRTtZQUNEO2dCQUNJLElBQUksRUFBRSxjQUFjO2dCQUNwQixNQUFNLEVBQUUsaUJBQWlCO2dCQUN6QixTQUFTLEVBQUUsK0JBQXNCO2dCQUNqQyxZQUFZLEVBQUUsNkRBQTZEO2FBQzlFO1lBQ0Q7Z0JBQ0ksSUFBSSxFQUFFLE9BQU87Z0JBQ2IsTUFBTSxFQUFFLFVBQVU7Z0JBQ2xCLFNBQVMsRUFBRSwrQkFBc0I7Z0JBQ2pDLFlBQVksRUFBRSx3Q0FBd0M7YUFDekQ7WUFDRDtnQkFDSSxJQUFJLEVBQUUsU0FBUztnQkFDZixNQUFNLEVBQUUsWUFBWTtnQkFDcEIsU0FBUyxFQUFFLCtCQUFzQjtnQkFDakMsWUFBWSxFQUFFLDhDQUE4QzthQUMvRDtTQUNKO0tBQ0o7Q0FDSixDQUFDO0FBTUY7SUFBQTtJQUFpQyxDQUFDO0lBQXJCLGlCQUFpQjtRQUo3QixlQUFRLENBQUM7WUFDTixPQUFPLEVBQUUsQ0FBQyxpQ0FBd0IsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDcEQsT0FBTyxFQUFFLENBQUMsaUNBQXdCLENBQUM7U0FDdEMsQ0FBQztPQUNXLGlCQUFpQixDQUFJO0lBQUQsd0JBQUM7Q0FBQSxBQUFsQyxJQUFrQztBQUFyQiw4Q0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBSb3V0ZXMgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRSb3V0ZXJNb2R1bGUsIE5TRW1wdHlPdXRsZXRDb21wb25lbnQgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XG5cbmltcG9ydCB7IFRhYnNDb21wb25lbnQgfSBmcm9tIFwifi9wYWdlcy90YWJzLmNvbXBvbmVudFwiO1xuXG5jb25zdCByb3V0ZXM6IFJvdXRlcyA9IFtcbiAgICB7XG4gICAgICAgIHBhdGg6IFwiZGVmYXVsdFwiLCBjb21wb25lbnQ6IFRhYnNDb21wb25lbnQsIGNoaWxkcmVuOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgcGF0aDogXCJtYXRlcmlhbHNcIixcbiAgICAgICAgICAgICAgICBvdXRsZXQ6IFwibWF0ZXJpYWxzVGFiXCIsXG4gICAgICAgICAgICAgICAgY29tcG9uZW50OiBOU0VtcHR5T3V0bGV0Q29tcG9uZW50LFxuICAgICAgICAgICAgICAgIGxvYWRDaGlsZHJlbjogXCJ+L3BhZ2VzL21hdGVyaWFscy9tYXRlcmlhbHMubW9kdWxlI01hdGVyaWFsc01vZHVsZVwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHBhdGg6IFwid2Vla092ZXJ2aWV3XCIsXG4gICAgICAgICAgICAgICAgb3V0bGV0OiBcIndlZWtPdmVydmlld1RhYlwiLFxuICAgICAgICAgICAgICAgIGNvbXBvbmVudDogTlNFbXB0eU91dGxldENvbXBvbmVudCxcbiAgICAgICAgICAgICAgICBsb2FkQ2hpbGRyZW46IFwifi9wYWdlcy93ZWVrT3ZlcnZpZXcvd2Vla092ZXJ2aWV3Lm1vZHVsZSNXZWVrT3ZlcnZpZXdNb2R1bGVcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBwYXRoOiBcInNpemVzXCIsXG4gICAgICAgICAgICAgICAgb3V0bGV0OiBcInNpemVzVGFiXCIsXG4gICAgICAgICAgICAgICAgY29tcG9uZW50OiBOU0VtcHR5T3V0bGV0Q29tcG9uZW50LFxuICAgICAgICAgICAgICAgIGxvYWRDaGlsZHJlbjogXCJ+L3BhZ2VzL3NpemVzL3NpemVzLm1vZHVsZSNTaXplc01vZHVsZVwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHBhdGg6IFwib3B0aW9uc1wiLFxuICAgICAgICAgICAgICAgIG91dGxldDogXCJvcHRpb25zVGFiXCIsXG4gICAgICAgICAgICAgICAgY29tcG9uZW50OiBOU0VtcHR5T3V0bGV0Q29tcG9uZW50LFxuICAgICAgICAgICAgICAgIGxvYWRDaGlsZHJlbjogXCJ+L3BhZ2VzL29wdGlvbnMvb3B0aW9ucy5tb2R1bGUjT3B0aW9uc01vZHVsZVwiXG4gICAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICB9XG5dO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtOYXRpdmVTY3JpcHRSb3V0ZXJNb2R1bGUuZm9yQ2hpbGQocm91dGVzKV0sXG4gICAgZXhwb3J0czogW05hdGl2ZVNjcmlwdFJvdXRlck1vZHVsZV1cbn0pXG5leHBvcnQgY2xhc3MgVGFic1JvdXRpbmdNb2R1bGUgeyB9XG4iXX0=