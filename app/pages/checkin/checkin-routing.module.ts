import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { CheckinDetailComponent } from "~/pages/checkin/checkin-detail/checkinDetail.component";
import { CheckinComponent } from "~/pages/checkin/checkin.component";

const routes: Routes = [
    { path: "", component: CheckinComponent },
    { path: ":customer_id", component: CheckinDetailComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class CheckinRoutingModule { }
