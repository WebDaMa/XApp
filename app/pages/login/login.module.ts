import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";

import { NativeScriptFormsModule } from "nativescript-angular";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";
import { LoginRoutingModule } from "~/pages/login/login-routing.module";
import { LoginComponent } from "./login.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        LoginRoutingModule,
        NativeScriptFormsModule,
        NativeScriptHttpClientModule
    ],
    declarations: [
        LoginComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class LoginModule { }
