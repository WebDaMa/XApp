import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";

import { NativeScriptFormsModule } from "nativescript-angular";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptUIDataFormModule } from "nativescript-ui-dataform/angular";
import { GroupsActionModule } from "~/components/groups-action/groups-action.module";
import { SizesRoutingModule } from "~/pages/sizes/sizes-routing.module";
import { SizesComponent } from "./sizes.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        SizesRoutingModule,
        NativeScriptFormsModule,
        NativeScriptUIDataFormModule,
        GroupsActionModule
    ],
    declarations: [
        SizesComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class SizesModule { }
