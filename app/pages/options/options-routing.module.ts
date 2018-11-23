import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { OptionsComponent } from "~/pages/options/options.component";

const routes: Routes = [
    { path: "", redirectTo: "options" },
    { path: "options", component: OptionsComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class OptionsRoutingModule { }
