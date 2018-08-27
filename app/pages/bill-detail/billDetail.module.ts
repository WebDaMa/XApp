import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";

import { NativeScriptFormsModule } from "nativescript-angular";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";
import { NativeScriptUIDataFormModule } from "nativescript-ui-dataform/angular";
import { BillDetailRoutingModule } from "~/pages/bill-detail/billDetail-routing.module";
import { BillDetailComponent } from "./billDetail.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        BillDetailRoutingModule,
        NativeScriptHttpClientModule,
        NativeScriptUIDataFormModule,
        NativeScriptFormsModule
    ],
    declarations: [
        BillDetailComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class BillDetailModule { }
