import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

const routes: Routes = [
    { path: "", redirectTo: "/login", pathMatch: "full" },
    { path: "login", loadChildren: "~/pages/login/login.module#LoginModule" },
    { path: "settings", loadChildren: "~/pages/settings/settings.module#SettingsModule" },
    { path: "busgo", loadChildren: "~/pages/busgo/busgo.module#BusgoModule" },
    { path: "busback", loadChildren: "~/pages/busback/busback.module#BusbackModule" },
    { path: "volpension", loadChildren: "~/pages/volpension/volpension.module#VolpensionModule" },
    { path: "lodging", loadChildren: "~/pages/lodging/lodging.module#LodgingModule" },
    { path: "groep", loadChildren: "~/pages/groep/groep.module#GroepModule" },
    { path: "planning", loadChildren: "~/pages/planning/planning.module#PlanningModule" },
    {
        path: "tabs",
        loadChildren: "~/pages/tabs.module#TabsModule"
    }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }

export const navigatableComponents = [
];
