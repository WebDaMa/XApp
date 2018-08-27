import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { VolpensionComponent } from "~/pages/volpension/volpension.component";

const routes: Routes = [
    { path: "", component: VolpensionComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class VolpensionRoutingModule { }
