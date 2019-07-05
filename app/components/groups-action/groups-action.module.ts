import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";

import { NativeScriptCommonModule } from "nativescript-angular/common";
import { GroupsActionComponent } from "~/components/groups-action/groups-action.component";

@NgModule({
    imports: [
        NativeScriptCommonModule
    ],
    declarations: [
        GroupsActionComponent
    ],
    exports: [
        GroupsActionComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class GroupsActionModule { }
