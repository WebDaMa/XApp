import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { LoginComponent } from "~/pages/login/login.component";
import { MaterialsSettingsComponent } from "~/pages/materials-settings/materials-settings.component";

const routes: Routes = [
    { path: "", component: LoginComponent,
      children: [
            { path: "materials/settings", component: MaterialsSettingsComponent }
        ]}
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class MaterialsRoutingModule { }
