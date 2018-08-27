import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";

import { NativeScriptFormsModule } from "nativescript-angular";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";
import { NativeScriptUIDataFormModule } from "nativescript-ui-dataform/angular";
import { VolpensionRoutingModule } from "~/pages/volpension/volpension-routing.module";
import { VolpensionComponent } from "./volpension.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        VolpensionRoutingModule,
        NativeScriptFormsModule,
        NativeScriptHttpClientModule,
        NativeScriptUIDataFormModule
    ],
    declarations: [
        VolpensionComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class VolpensionModule { }
