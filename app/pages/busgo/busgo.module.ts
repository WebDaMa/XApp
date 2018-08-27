import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";

import { NativeScriptFormsModule } from "nativescript-angular";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";
import { NativeScriptUIDataFormModule } from "nativescript-ui-dataform/angular";
import { BusgoRoutingModule } from "~/pages/busgo/busgo-routing.module";
import { BusgoComponent } from "./busgo.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        BusgoRoutingModule,
        NativeScriptFormsModule,
        NativeScriptHttpClientModule,
        NativeScriptUIDataFormModule
    ],
    declarations: [
        BusgoComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class BusgoModule { }
