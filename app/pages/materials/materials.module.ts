import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { MaterialsComponent } from "./materials.component";

@NgModule({
    imports: [
        NativeScriptCommonModule
    ],
    declarations: [
        MaterialsComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class MaterialsModule { }
