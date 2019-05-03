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
