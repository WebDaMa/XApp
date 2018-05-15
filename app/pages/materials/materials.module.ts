import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { MaterialsComponent } from "./materials.component";
import {MaterialsRoutingModule} from "~/pages/materials/materials-routing.module";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        MaterialsRoutingModule
    ],
    declarations: [
        MaterialsComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class MaterialsModule { }
