"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var nativescript_angular_1 = require("nativescript-angular");
var common_1 = require("nativescript-angular/common");
var http_client_1 = require("nativescript-angular/http-client");
var angular_1 = require("nativescript-ui-dataform/angular");
var checkinDetail_routing_module_1 = require("~/pages/checkin-detail/checkinDetail-routing.module");
var checkinDetail_component_1 = require("./checkinDetail.component");
var CheckinDetailModule = /** @class */ (function () {
    function CheckinDetailModule() {
    }
    CheckinDetailModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.NativeScriptCommonModule,
                checkinDetail_routing_module_1.CheckinDetailRoutingModule,
                http_client_1.NativeScriptHttpClientModule,
                angular_1.NativeScriptUIDataFormModule,
                nativescript_angular_1.NativeScriptFormsModule
            ],
            declarations: [
                checkinDetail_component_1.CheckinDetailComponent
            ],
            schemas: [
                core_1.NO_ERRORS_SCHEMA
            ]
        })
    ], CheckinDetailModule);
    return CheckinDetailModule;
}());
exports.CheckinDetailModule = CheckinDetailModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tpbkRldGFpbC5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjaGVja2luRGV0YWlsLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEyRDtBQUUzRCw2REFBK0Q7QUFDL0Qsc0RBQXVFO0FBQ3ZFLGdFQUFnRjtBQUNoRiw0REFBZ0Y7QUFDaEYsb0dBQWlHO0FBQ2pHLHFFQUFtRTtBQWlCbkU7SUFBQTtJQUFtQyxDQUFDO0lBQXZCLG1CQUFtQjtRQWYvQixlQUFRLENBQUM7WUFDTixPQUFPLEVBQUU7Z0JBQ0wsaUNBQXdCO2dCQUN4Qix5REFBMEI7Z0JBQzFCLDBDQUE0QjtnQkFDNUIsc0NBQTRCO2dCQUM1Qiw4Q0FBdUI7YUFDMUI7WUFDRCxZQUFZLEVBQUU7Z0JBQ1YsZ0RBQXNCO2FBQ3pCO1lBQ0QsT0FBTyxFQUFFO2dCQUNMLHVCQUFnQjthQUNuQjtTQUNKLENBQUM7T0FDVyxtQkFBbUIsQ0FBSTtJQUFELDBCQUFDO0NBQUEsQUFBcEMsSUFBb0M7QUFBdkIsa0RBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE5PX0VSUk9SU19TQ0hFTUEgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuXG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRGb3Jtc01vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhclwiO1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0Q29tbW9uTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2NvbW1vblwiO1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0SHR0cENsaWVudE1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9odHRwLWNsaWVudFwiO1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0VUlEYXRhRm9ybU1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtdWktZGF0YWZvcm0vYW5ndWxhclwiO1xuaW1wb3J0IHsgQ2hlY2tpbkRldGFpbFJvdXRpbmdNb2R1bGUgfSBmcm9tIFwifi9wYWdlcy9jaGVja2luLWRldGFpbC9jaGVja2luRGV0YWlsLXJvdXRpbmcubW9kdWxlXCI7XG5pbXBvcnQgeyBDaGVja2luRGV0YWlsQ29tcG9uZW50IH0gZnJvbSBcIi4vY2hlY2tpbkRldGFpbC5jb21wb25lbnRcIjtcblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIE5hdGl2ZVNjcmlwdENvbW1vbk1vZHVsZSxcbiAgICAgICAgQ2hlY2tpbkRldGFpbFJvdXRpbmdNb2R1bGUsXG4gICAgICAgIE5hdGl2ZVNjcmlwdEh0dHBDbGllbnRNb2R1bGUsXG4gICAgICAgIE5hdGl2ZVNjcmlwdFVJRGF0YUZvcm1Nb2R1bGUsXG4gICAgICAgIE5hdGl2ZVNjcmlwdEZvcm1zTW9kdWxlXG4gICAgXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgICAgQ2hlY2tpbkRldGFpbENvbXBvbmVudFxuICAgIF0sXG4gICAgc2NoZW1hczogW1xuICAgICAgICBOT19FUlJPUlNfU0NIRU1BXG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBDaGVja2luRGV0YWlsTW9kdWxlIHsgfVxuIl19