import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { GuidesActionComponent } from "~/components/guides-action/guides-action.component";
import { WeekActionModule } from "~/components/week-action/week-action.module";
import { MaterialsRoutingModule } from "~/pages/materials/materials-routing.module";
import { MaterialsSettingsComponent } from "~/pages/materials/materials-settings/materials-settings.component";
import { MaterialsComponent } from "./materials.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        MaterialsRoutingModule,
        WeekActionModule
    ],
    declarations: [
        MaterialsComponent,
        MaterialsSettingsComponent,
        GuidesActionComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class MaterialsModule { }
