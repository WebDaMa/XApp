import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";

import { NativeScriptFormsModule } from "nativescript-angular";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptUIDataFormModule } from "nativescript-ui-dataform/angular";
import { GroupsActionModule } from "~/components/groups-action/groups-action.module";
import { OptionsRoutingModule } from "~/pages/options/options-routing.module";
import { OptionsComponent } from "./options.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        OptionsRoutingModule,
        NativeScriptFormsModule,
        NativeScriptUIDataFormModule,
        GroupsActionModule
    ],
    declarations: [
        OptionsComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class OptionsModule { }
