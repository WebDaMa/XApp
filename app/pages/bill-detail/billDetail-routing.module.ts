import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { BillDetailComponent } from "~/pages/bill-detail/billDetail.component";

const routes: Routes = [
    { path: "", component: BillDetailComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class BillDetailRoutingModule { }
