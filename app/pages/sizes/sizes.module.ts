import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";

import { SizesComponent } from "./sizes.component";

@NgModule({
    imports: [
        NativeScriptModule
    ],
    declarations: [
        SizesComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class SizesModule { }
