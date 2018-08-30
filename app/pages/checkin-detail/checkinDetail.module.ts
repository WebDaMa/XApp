import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";

import { NativeScriptFormsModule } from "nativescript-angular";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";
import { NativeScriptUIDataFormModule } from "nativescript-ui-dataform/angular";
import { CheckinDetailRoutingModule } from "~/pages/checkin-detail/checkinDetail-routing.module";
import { CheckinDetailComponent } from "./checkinDetail.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        CheckinDetailRoutingModule,
        NativeScriptHttpClientModule,
        NativeScriptUIDataFormModule,
        NativeScriptFormsModule
    ],
    declarations: [
        CheckinDetailComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class CheckinDetailModule { }
