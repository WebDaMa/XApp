import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { WeekOverviewComponent } from "~/pages/weekOverview/weekOverview.component";

const routes: Routes = [
    { path: "", redirectTo: "weekOverview"},
    { path: "weekOverview", component: WeekOverviewComponent}
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class WeekOverviewRoutingModule { }
