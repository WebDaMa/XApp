import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { MaterialsComponent } from "./materials.component";
import {NativeScriptHttpClientModule} from "nativescript-angular/http-client";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        NativeScriptHttpClientModule
    ],
    declarations: [
        MaterialsComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class MaterialsModule { }
