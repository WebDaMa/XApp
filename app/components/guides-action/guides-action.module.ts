import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";

import { NativeScriptCommonModule } from "nativescript-angular/common";
import { GuidesActionComponent } from "~/components/guides-action/guides-action.component";

@NgModule({
    imports: [
        NativeScriptCommonModule
    ],
    declarations: [
        GuidesActionComponent
    ],
    exports: [
        GuidesActionComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class GuidesActionModule { }
