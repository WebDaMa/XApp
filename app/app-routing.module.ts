import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { BillComponent } from "~/pages/bill/bill.component";
import { BusbackComponent } from "~/pages/busback/busback.component";
import { BusgoComponent } from "~/pages/busgo/busgo.component";
import { LodgingComponent } from "~/pages/lodging/lodging.component";
import { MaterialsSettingsComponent } from "~/pages/materials-settings/materials-settings.component";
import { MaterialsComponent } from "~/pages/materials/materials.component";
import { OptionsComponent } from "~/pages/options/options.component";
import { SizesComponent } from "~/pages/sizes/sizes.component";
import { TabsComponent } from "~/pages/tabs.component";
import { VolpensionComponent } from "~/pages/volpension/volpension.component";

const routes: Routes = [
    { path: "", redirectTo: "/login", pathMatch: "full" },
    { path: "login", loadChildren: "./pages/login/login.module#LoginModule" },
    { path: "settings", loadChildren: "./pages/settings/settings.module#SettingsModule" },
    { path: "busgo", loadChildren: "./pages/busgo/busgo.module#BusgoModule" },
    { path: "busback", loadChildren: "./pages/busback/busback.module#BusbackModule" },
    { path: "volpension", loadChildren: "./pages/volpension/volpension.module#VolpensionModule" },
    { path: "lodging", loadChildren: "./pages/lodging/lodging.module#LodgingModule" },
    { path: "payments", loadChildren: "./pages/payments/payments.module#PaymentsModule" },
    { path: "payments/:customer_id", loadChildren: "./pages/payments-add/paymentsAdd.module#PaymentsAddModule" },
    { path: "bill", loadChildren: "./pages/bill/bill.module#BillModule" },
    { path: "bill/:customer_id", loadChildren: "./pages/bill-detail/billDetail.module#BillDetailModule" },
    { path: "tabs", component: TabsComponent, children: [
            { path: "materials", component: MaterialsComponent },
            { path: "sizes", component: SizesComponent },
            { path: "options", component: OptionsComponent }
        ] },

    /*current fix to skip outlets*/
    { path: "materials/settings", component: MaterialsSettingsComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }

export const navigatableComponents = [
    TabsComponent,
    MaterialsComponent,
    MaterialsSettingsComponent,
    SizesComponent,
    OptionsComponent
];
