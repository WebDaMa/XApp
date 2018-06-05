import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";

import { NativeScriptCommonModule } from "nativescript-angular/common";
import { SizesComponent } from "./sizes.component";

@NgModule({
    imports: [
        NativeScriptCommonModule
    ],
    declarations: [
        SizesComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class SizesModule { }
