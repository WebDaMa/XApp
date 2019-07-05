import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";

import { NativeScriptFormsModule } from "nativescript-angular";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";
import { NativeScriptUIDataFormModule } from "nativescript-ui-dataform/angular";
import { GroupsActionModule } from "~/components/groups-action/groups-action.module";
import { PaymentsAddComponent } from "~/pages/payments/payments-add/paymentsAdd.component";
import { PaymentsRoutingModule } from "~/pages/payments/payments-routing.module";
import { PaymentsComponent } from "./payments.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        PaymentsRoutingModule,
        NativeScriptFormsModule,
        NativeScriptHttpClientModule,
        NativeScriptUIDataFormModule,
        GroupsActionModule
    ],
    declarations: [
        PaymentsComponent,
        PaymentsAddComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class PaymentsModule { }
