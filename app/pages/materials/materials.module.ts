import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { MaterialsRoutingModule } from "~/pages/materials/materials-routing.module";
import { MaterialsSettingsComponent } from "~/pages/materials/materials-settings/materials-settings.component";
import { MaterialsComponent } from "./materials.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        MaterialsRoutingModule
    ],
    declarations: [
        MaterialsComponent,
        MaterialsSettingsComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class MaterialsModule { }
