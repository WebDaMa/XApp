import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { PaymentsComponent } from "~/pages/payments/payments.component";

const routes: Routes = [
    { path: "", component: PaymentsComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class PaymentsRoutingModule { }
