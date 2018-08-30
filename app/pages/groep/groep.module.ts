import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";

import { NativeScriptFormsModule } from "nativescript-angular";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";
import { NativeScriptUIDataFormModule } from "nativescript-ui-dataform/angular";
import { GroepRoutingModule } from "~/pages/groep/groep-routing.module";
import { GroepComponent } from "./groep.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        GroepRoutingModule,
        NativeScriptFormsModule,
        NativeScriptHttpClientModule,
        NativeScriptUIDataFormModule
    ],
    declarations: [
        GroepComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class GroepModule { }
