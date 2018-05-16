import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { CheckinComponent } from "~/pages/checkin/checkin.component";
import { MaterialsSettingsComponent } from "~/pages/materials-settings/materials-settings.component";
import { MaterialsComponent } from "~/pages/materials/materials.component";
import { OptionsComponent } from "~/pages/options/options.component";
import { SizesComponent } from "~/pages/sizes/sizes.component";
import { TabsComponent } from "~/pages/tabs.component";

const routes: Routes = [
    { path: "", redirectTo: "/login", pathMatch: "full" },
    { path: "login", loadChildren: "./pages/login/login.module#LoginModule" },
    { path: "settings", loadChildren: "./pages/settings/settings.module#SettingsModule" },
    { path: "tabs", component: TabsComponent, children: [
            { path: "materials", component: MaterialsComponent, outlet: "materialsTab"  },
            { path: "materials/settings", component: MaterialsSettingsComponent, outlet: "materialsTab"  },

            { path: "sizes", component: SizesComponent, outlet: "sizesTab" },

            { path: "options", component: OptionsComponent, outlet: "optionsTab" },

            { path: "checkin", component: CheckinComponent, outlet: "checkinTab" }
        ] },

    /*current fix to skip outlets*/
    { path: "materials/settings", component: MaterialsSettingsComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }

export const navigatableComponents = [
    TabsComponent,
    MaterialsComponent,
    MaterialsSettingsComponent,
    SizesComponent,
    OptionsComponent,
    CheckinComponent
];
