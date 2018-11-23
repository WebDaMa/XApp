import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { PlanningComponent } from "~/pages/planning/planning.component";

const routes: Routes = [
    { path: "", component: PlanningComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class PlanningRoutingModule { }
