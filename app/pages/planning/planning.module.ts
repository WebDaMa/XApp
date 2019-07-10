import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";

import { NativeScriptFormsModule } from "nativescript-angular";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";
import { NativeScriptUIDataFormModule } from "nativescript-ui-dataform/angular";
import { WeekActionModule } from "~/components/week-action/week-action.module";
import { PlanningRoutingModule } from "~/pages/planning/planning-routing.module";
import { PlanningComponent } from "./planning.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        PlanningRoutingModule,
        NativeScriptFormsModule,
        NativeScriptHttpClientModule,
        NativeScriptUIDataFormModule,
        WeekActionModule
    ],
    declarations: [
        PlanningComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class PlanningModule { }
