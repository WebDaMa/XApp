import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";

import { NativeScriptCommonModule } from "nativescript-angular/common";
import { AgenciesActionComponent } from "~/components/agencies-action/agencies-action.component";

@NgModule({
    imports: [
        NativeScriptCommonModule
    ],
    declarations: [
        AgenciesActionComponent
    ],
    exports: [
        AgenciesActionComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AgenciesActionModule { }
