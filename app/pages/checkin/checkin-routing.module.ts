import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { CheckinComponent } from "~/pages/checkin/checkin.component";

const routes: Routes = [
    { path: "", component: CheckinComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class CheckinRoutingModule { }
