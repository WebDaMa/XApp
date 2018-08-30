import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { GroepComponent } from "~/pages/groep/groep.component";

const routes: Routes = [
    { path: "", component: GroepComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class GroepRoutingModule { }
