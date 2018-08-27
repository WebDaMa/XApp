import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";

import { NativeScriptFormsModule } from "nativescript-angular";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";
import { NativeScriptUIDataFormModule } from "nativescript-ui-dataform/angular";
import { BusbackRoutingModule } from "~/pages/busback/busback-routing.module";
import { BusbackComponent } from "./busback.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        BusbackRoutingModule,
        NativeScriptFormsModule,
        NativeScriptHttpClientModule,
        NativeScriptUIDataFormModule
    ],
    declarations: [
        BusbackComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class BusbackModule { }
