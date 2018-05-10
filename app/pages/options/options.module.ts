import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";

import { OptionsComponent } from "./options.component";

@NgModule({
    imports: [
        NativeScriptModule
    ],
    declarations: [
        OptionsComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class OptionsModule { }
