import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { WeekOverviewComponent } from "./weekOverview.component";

@NgModule({
    imports: [
        NativeScriptCommonModule
    ],
    declarations: [
        WeekOverviewComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class WeekOverviewModule { }
