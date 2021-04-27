import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { BillDetailComponent } from "~/pages/bill/bill-detail/billDetail.component";
import { BillComponent } from "~/pages/bill/bill.component";

const routes: Routes = [
    { path: "", component: BillComponent },
    { path: ":customer_id", component: BillDetailComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class BillRoutingModule { }
