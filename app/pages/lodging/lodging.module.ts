import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";

import { NativeScriptFormsModule } from "nativescript-angular";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";
import { NativeScriptUIDataFormModule } from "nativescript-ui-dataform/angular";
import { LodgingRoutingModule } from "~/pages/lodging/lodging-routing.module";
import { LodgingComponent } from "./lodging.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        LodgingRoutingModule,
        NativeScriptFormsModule,
        NativeScriptHttpClientModule,
        NativeScriptUIDataFormModule
    ],
    declarations: [
        LodgingComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class LodgingModule { }
