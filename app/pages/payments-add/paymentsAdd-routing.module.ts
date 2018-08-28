import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { PaymentsAddComponent } from "~/pages/payments-add/paymentsAdd.component";

const routes: Routes = [
    { path: "", component: PaymentsAddComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class PaymentsAddRoutingModule { }
