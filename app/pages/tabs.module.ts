import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { MaterialsComponent } from "./materials/materials.component";
import { OptionsComponent } from "./options/options.component";
import { SettingsComponent } from "./settings/settings.component";
import { SizesComponent } from "./sizes/sizes.component";
import { TabsRoutingModule } from "./tabs-routing.module";
import { TabsComponent } from "./tabs.component";
import {CheckinComponent} from "~/pages/checkin/checkin.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        TabsRoutingModule
    ],
    declarations: [
        CheckinComponent,
        TabsComponent,
        MaterialsComponent,
        OptionsComponent,
        SizesComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class TabsModule { }
