import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";

import { NativeScriptCommonModule } from "nativescript-angular/common";
import { SettingsRoutingModule } from "~/pages/settings/settings-routing.module";
import { SettingsComponent } from "./settings.component";
import {NativeScriptFormsModule} from "nativescript-angular";
import {NativeScriptHttpClientModule} from "nativescript-angular/http-client";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        SettingsRoutingModule,
        NativeScriptFormsModule,
        NativeScriptHttpClientModule
    ],
    declarations: [
        SettingsComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class SettingsModule { }
