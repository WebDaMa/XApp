import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { BusgoComponent } from "~/pages/busgo/busgo.component";

const routes: Routes = [
    { path: "", component: BusgoComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class BusgoRoutingModule { }
