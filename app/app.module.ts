import { NgModule, NgModuleFactoryLoader, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptUISideDrawerModule } from "nativescript-ui-sidedrawer/angular";

import { NativeScriptFormsModule } from "nativescript-angular";
import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";
import { AppRoutingModule, navigatableComponents } from "./app-routing.module";
import { AppComponent } from "./app.component";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        AppRoutingModule,
        NativeScriptModule,
        NativeScriptFormsModule,
        NativeScriptHttpClientModule,
        NativeScriptModule,
        NativeScriptUISideDrawerModule
    ],
    declarations: [
        AppComponent,
        ...navigatableComponents
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
