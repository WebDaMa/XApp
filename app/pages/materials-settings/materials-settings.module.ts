import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { MaterialsSettingsComponent } from "./materials-settings.component";

@NgModule({
    imports: [
        NativeScriptCommonModule
    ],
    declarations: [
        MaterialsSettingsComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class MaterialsModule { }
