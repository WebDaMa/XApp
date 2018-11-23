import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { NativeScriptFormsModule } from "nativescript-angular";
import { NativeScriptUIDataFormModule } from "nativescript-ui-dataform/angular";
import { WeekOverviewRoutingModule } from "~/pages/weekOverview/weekOverview-routing.module";
import { WeekOverviewComponent } from "./weekOverview.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        WeekOverviewRoutingModule,
        NativeScriptFormsModule,
        NativeScriptUIDataFormModule
    ],
    declarations: [
        WeekOverviewComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class WeekOverviewModule { }
