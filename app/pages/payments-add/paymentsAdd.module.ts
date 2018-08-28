import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";

import { NativeScriptFormsModule } from "nativescript-angular";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";
import { NativeScriptUIDataFormModule } from "nativescript-ui-dataform/angular";
import { PaymentsAddRoutingModule } from "~/pages/payments-add/paymentsAdd-routing.module";
import { PaymentsAddComponent } from "./paymentsAdd.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        PaymentsAddRoutingModule,
        NativeScriptFormsModule,
        NativeScriptHttpClientModule,
        NativeScriptUIDataFormModule
    ],
    declarations: [
        PaymentsAddComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class PaymentsAddModule { }
