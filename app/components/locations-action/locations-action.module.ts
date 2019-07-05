import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";

import { NativeScriptCommonModule } from "nativescript-angular/common";
import { LocationsActionComponent } from "~/components/locations-action/locations-action.component";

@NgModule({
    imports: [
        NativeScriptCommonModule
    ],
    declarations: [
        LocationsActionComponent
    ],
    exports: [
        LocationsActionComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class LocationsActionModule { }
