import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";

import { NativeScriptFormsModule } from "nativescript-angular";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";
import { CheckinRoutingModule } from "~/pages/checkin/checkin-routing.module";
import { CheckinComponent } from "./checkin.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        CheckinRoutingModule,
        NativeScriptFormsModule,
        NativeScriptHttpClientModule
    ],
    declarations: [
        CheckinComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class CheckinModule { }
