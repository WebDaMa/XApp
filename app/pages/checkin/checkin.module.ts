import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";

import { NativeScriptCommonModule } from "nativescript-angular/common";
import { CheckinComponent } from "./checkin.component";

@NgModule({
    imports: [
        NativeScriptCommonModule
    ],
    declarations: [
        CheckinComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class CheckinModule { }
