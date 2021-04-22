import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { MaterialsComponent } from "~/pages/materials/materials.component";

const routes: Routes = [
    { path: "", component: MaterialsComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class MaterialsRoutingModule { }
