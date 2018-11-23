import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { MaterialsSettingsComponent } from "~/pages/materials/materials-settings/materials-settings.component";
import { MaterialsComponent } from "~/pages/materials/materials.component";

const routes: Routes = [
    { path: "", redirectTo: "materials" },
    { path: "materials", component: MaterialsComponent },
    { path: "materials/settings", component: MaterialsSettingsComponent}
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class MaterialsRoutingModule { }
