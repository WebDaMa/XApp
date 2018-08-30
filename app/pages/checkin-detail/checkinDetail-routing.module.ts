import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { CheckinDetailComponent } from "~/pages/checkin-detail/checkinDetail.component";

const routes: Routes = [
    { path: "", component: CheckinDetailComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class CheckinDetailRoutingModule { }
