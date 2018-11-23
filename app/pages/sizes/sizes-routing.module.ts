import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { SizesComponent } from "~/pages/sizes/sizes.component";

const routes: Routes = [
    { path: "", redirectTo: "sizes" },
    { path: "sizes", component: SizesComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class SizesRoutingModule { }
