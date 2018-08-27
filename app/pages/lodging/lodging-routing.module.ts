import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { LodgingComponent } from "~/pages/lodging/lodging.component";

const routes: Routes = [
    { path: "", component: LodgingComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class LodgingRoutingModule { }
