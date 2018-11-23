import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";

import { NativeScriptFormsModule } from "nativescript-angular";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";
import { NativeScriptUIDataFormModule } from "nativescript-ui-dataform/angular";
import { CheckinDetailComponent } from "~/pages/checkin/checkin-detail/checkinDetail.component";
import { CheckinRoutingModule } from "~/pages/checkin/checkin-routing.module";
import { CheckinComponent } from "./checkin.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        CheckinRoutingModule,
        NativeScriptFormsModule,
        NativeScriptHttpClientModule,
        NativeScriptUIDataFormModule
    ],
    declarations: [
        CheckinComponent,
        CheckinDetailComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class CheckinModule { }
