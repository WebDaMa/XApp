import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";

import { NativeScriptCommonModule } from "nativescript-angular/common";
import { WeekActionComponent } from "~/components/week-action/week-action.component";

@NgModule({
    imports: [
        NativeScriptCommonModule
    ],
    declarations: [
        WeekActionComponent
    ],
    exports: [
        WeekActionComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class WeekActionModule { }
