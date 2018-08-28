import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";

import { NativeScriptFormsModule } from "nativescript-angular";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";
import { PaymentsRoutingModule } from "~/pages/payments/payments-routing.module";
import { PaymentsComponent } from "./payments.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        PaymentsRoutingModule,
        NativeScriptFormsModule,
        NativeScriptHttpClientModule
    ],
    declarations: [
        PaymentsComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class PaymentsModule { }
