import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";

import { NativeScriptFormsModule } from "nativescript-angular";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";
import { BillRoutingModule } from "~/pages/bill/bill-routing.module";
import { BillComponent } from "./bill.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        BillRoutingModule,
        NativeScriptFormsModule,
        NativeScriptHttpClientModule
    ],
    declarations: [
        BillComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class BillModule { }
