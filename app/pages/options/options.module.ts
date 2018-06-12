import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";

import { NativeScriptCommonModule } from "nativescript-angular/common";
import { OptionsComponent } from "./options.component";

@NgModule({
    imports: [
        NativeScriptCommonModule
    ],
    declarations: [
        OptionsComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class OptionsModule { }
