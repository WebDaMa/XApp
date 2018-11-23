import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule, NSEmptyOutletComponent } from "nativescript-angular/router";

import { TabsComponent } from "~/pages/tabs.component";

const routes: Routes = [
    {
        path: "default", component: TabsComponent, children: [
            {
                path: "materials",
                outlet: "materialsTab",
                component: NSEmptyOutletComponent,
                loadChildren: "./pages/materials/materials.module#MaterialsModule"
            },
            {
                path: "weekOverview",
                outlet: "weekOverviewTab",
                component: NSEmptyOutletComponent,
                loadChildren: "./pages/weekOverview/weekOverview.module#WeekOverviewModule"
            },
            {
                path: "sizes",
                outlet: "sizesTab",
                component: NSEmptyOutletComponent,
                loadChildren: "./pages/sizes/sizes.module#SizesModule"
            },
            {
                path: "options",
                outlet: "optionsTab",
                component: NSEmptyOutletComponent,
                loadChildren: "./pages/options/options.module#OptionsModule"
            }
        ]
    }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class TabsRoutingModule { }
