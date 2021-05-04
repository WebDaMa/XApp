import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { GuidesActionModule } from "~/components/guides-action/guides-action.module";
import { WeekActionModule } from "~/components/week-action/week-action.module";
import { MaterialsRoutingModule } from "~/pages/materials/materials-routing.module";
import { MaterialsComponent } from "./materials.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        MaterialsRoutingModule,
        WeekActionModule,
        GuidesActionModule
    ],
    declarations: [
        MaterialsComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class MaterialsModule { }
