"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var nativescript_angular_1 = require("nativescript-angular");
var common_1 = require("nativescript-angular/common");
var http_client_1 = require("nativescript-angular/http-client");
var angular_1 = require("nativescript-ui-dataform/angular");
var billDetail_component_1 = require("~/pages/bill/bill-detail/billDetail.component");
var bill_routing_module_1 = require("~/pages/bill/bill-routing.module");
var bill_component_1 = require("./bill.component");
var BillModule = /** @class */ (function () {
    function BillModule() {
    }
    BillModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.NativeScriptCommonModule,
                bill_routing_module_1.BillRoutingModule,
                nativescript_angular_1.NativeScriptFormsModule,
                http_client_1.NativeScriptHttpClientModule,
                angular_1.NativeScriptUIDataFormModule
            ],
            declarations: [
                bill_component_1.BillComponent,
                billDetail_component_1.BillDetailComponent
            ],
            schemas: [
                core_1.NO_ERRORS_SCHEMA
            ]
        })
    ], BillModule);
    return BillModule;
}());
exports.BillModule = BillModule;
