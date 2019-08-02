"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var nativescript_angular_1 = require("nativescript-angular");
var common_1 = require("nativescript-angular/common");
var http_client_1 = require("nativescript-angular/http-client");
var angular_1 = require("nativescript-ui-dataform/angular");
var checkinDetail_component_1 = require("~/pages/checkin/checkin-detail/checkinDetail.component");
var checkin_routing_module_1 = require("~/pages/checkin/checkin-routing.module");
var checkin_component_1 = require("./checkin.component");
var CheckinModule = /** @class */ (function () {
    function CheckinModule() {
    }
    CheckinModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.NativeScriptCommonModule,
                checkin_routing_module_1.CheckinRoutingModule,
                nativescript_angular_1.NativeScriptFormsModule,
                http_client_1.NativeScriptHttpClientModule,
                angular_1.NativeScriptUIDataFormModule
            ],
            declarations: [
                checkin_component_1.CheckinComponent,
                checkinDetail_component_1.CheckinDetailComponent
            ],
            schemas: [
                core_1.NO_ERRORS_SCHEMA
            ]
        })
    ], CheckinModule);
    return CheckinModule;
}());
exports.CheckinModule = CheckinModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tpbi5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjaGVja2luLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEyRDtBQUUzRCw2REFBK0Q7QUFDL0Qsc0RBQXVFO0FBQ3ZFLGdFQUFnRjtBQUNoRiw0REFBZ0Y7QUFDaEYsa0dBQWdHO0FBQ2hHLGlGQUE4RTtBQUM5RSx5REFBdUQ7QUFrQnZEO0lBQUE7SUFBNkIsQ0FBQztJQUFqQixhQUFhO1FBaEJ6QixlQUFRLENBQUM7WUFDTixPQUFPLEVBQUU7Z0JBQ0wsaUNBQXdCO2dCQUN4Qiw2Q0FBb0I7Z0JBQ3BCLDhDQUF1QjtnQkFDdkIsMENBQTRCO2dCQUM1QixzQ0FBNEI7YUFDL0I7WUFDRCxZQUFZLEVBQUU7Z0JBQ1Ysb0NBQWdCO2dCQUNoQixnREFBc0I7YUFDekI7WUFDRCxPQUFPLEVBQUU7Z0JBQ0wsdUJBQWdCO2FBQ25CO1NBQ0osQ0FBQztPQUNXLGFBQWEsQ0FBSTtJQUFELG9CQUFDO0NBQUEsQUFBOUIsSUFBOEI7QUFBakIsc0NBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgTk9fRVJST1JTX1NDSEVNQSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5cbmltcG9ydCB7IE5hdGl2ZVNjcmlwdEZvcm1zTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyXCI7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRDb21tb25Nb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvY29tbW9uXCI7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRIdHRwQ2xpZW50TW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2h0dHAtY2xpZW50XCI7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRVSURhdGFGb3JtTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC11aS1kYXRhZm9ybS9hbmd1bGFyXCI7XG5pbXBvcnQgeyBDaGVja2luRGV0YWlsQ29tcG9uZW50IH0gZnJvbSBcIn4vcGFnZXMvY2hlY2tpbi9jaGVja2luLWRldGFpbC9jaGVja2luRGV0YWlsLmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgQ2hlY2tpblJvdXRpbmdNb2R1bGUgfSBmcm9tIFwifi9wYWdlcy9jaGVja2luL2NoZWNraW4tcm91dGluZy5tb2R1bGVcIjtcbmltcG9ydCB7IENoZWNraW5Db21wb25lbnQgfSBmcm9tIFwiLi9jaGVja2luLmNvbXBvbmVudFwiO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtcbiAgICAgICAgTmF0aXZlU2NyaXB0Q29tbW9uTW9kdWxlLFxuICAgICAgICBDaGVja2luUm91dGluZ01vZHVsZSxcbiAgICAgICAgTmF0aXZlU2NyaXB0Rm9ybXNNb2R1bGUsXG4gICAgICAgIE5hdGl2ZVNjcmlwdEh0dHBDbGllbnRNb2R1bGUsXG4gICAgICAgIE5hdGl2ZVNjcmlwdFVJRGF0YUZvcm1Nb2R1bGVcbiAgICBdLFxuICAgIGRlY2xhcmF0aW9uczogW1xuICAgICAgICBDaGVja2luQ29tcG9uZW50LFxuICAgICAgICBDaGVja2luRGV0YWlsQ29tcG9uZW50XG4gICAgXSxcbiAgICBzY2hlbWFzOiBbXG4gICAgICAgIE5PX0VSUk9SU19TQ0hFTUFcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIENoZWNraW5Nb2R1bGUgeyB9XG4iXX0=