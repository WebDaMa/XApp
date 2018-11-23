import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { PaymentsAddComponent } from "~/pages/payments/payments-add/paymentsAdd.component";
import { PaymentsComponent } from "~/pages/payments/payments.component";

const routes: Routes = [
    { path: "", component: PaymentsComponent },
    { path: ":customer_id", component: PaymentsAddComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class PaymentsRoutingModule { }
