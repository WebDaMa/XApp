import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { BusbackComponent } from "~/pages/busback/busback.component";

const routes: Routes = [
    { path: "", component: BusbackComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class BusbackRoutingModule { }
