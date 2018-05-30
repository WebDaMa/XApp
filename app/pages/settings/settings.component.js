"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var app = require("tns-core-modules/application");
var location_service_1 = require("~/shared/services/location.service");
/* ***********************************************************
* Before you can navigate to this page from your app, you need to reference this page's module in the
* global app router module. Add the following object to the global array of routes:
* { path: "sizes", loadChildren: "./sizes/sizes.module#SizesModule" }
* Note that this simply points the path to the page module file. If you move the page, you need to update the route too.
*************************************************************/
var SettingsComponent = /** @class */ (function () {
    function SettingsComponent(locationService) {
        this.locationService = locationService;
        this.locations = [];
        this.items = {};
        this.selectedIndex = 0;
    }
    SettingsComponent.prototype.ngOnInit = function () {
        var _this = this;
        var appSettings = require("application-settings");
        this.locationService.getLocationsAction()
            .subscribe(function (result) {
            _this.locations = result;
            _this.items = {
                items: _this.locations,
                length: _this.locations.length,
                getItem: function (index) {
                    var item = this.items[index];
                    return item.code;
                }
            };
            _this.selectedIndex = appSettings.hasKey("locationIndex") ?
                appSettings.getNumber("locationIndex") : 0;
        }, function (error) {
            console.dir(error);
            /*TODO: handle errors*/
        });
    };
    SettingsComponent.prototype.selectedIndexChanged = function (args) {
        var picker = args.object;
        var appSettings = require("application-settings");
        if (picker.selectedIndex !== 0) {
            appSettings.setNumber("locationIndex", picker.selectedIndex);
        }
        this.location = this.locations[picker.selectedIndex];
        appSettings.setNumber("locationId", this.location.id);
        appSettings.setNumber("guideIndex", 0);
    };
    SettingsComponent.prototype.onDrawerButtonTap = function () {
        var sideDrawer = app.getRootView();
        sideDrawer.showDrawer();
    };
    SettingsComponent = __decorate([
        core_1.Component({
            selector: "Settings",
            moduleId: module.id,
            providers: [location_service_1.LocationService],
            templateUrl: "./settings.component.html"
        }),
        __metadata("design:paramtypes", [location_service_1.LocationService])
    ], SettingsComponent);
    return SettingsComponent;
}());
exports.SettingsComponent = SettingsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0dGluZ3MuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2V0dGluZ3MuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBRWxELGtEQUFvRDtBQUdwRCx1RUFBcUU7QUFFckU7Ozs7OzhEQUs4RDtBQVE5RDtJQU1JLDJCQUFvQixlQUFnQztRQUFoQyxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFMcEQsY0FBUyxHQUFvQixFQUFFLENBQUM7UUFDaEMsVUFBSyxHQUFXLEVBQUUsQ0FBQztRQUVuQixrQkFBYSxHQUFXLENBQUMsQ0FBQztJQUcxQixDQUFDO0lBRUQsb0NBQVEsR0FBUjtRQUFBLGlCQTRCQztRQTNCRyxJQUFNLFdBQVcsR0FBRyxPQUFPLENBQUMsc0JBQXNCLENBQUMsQ0FBQztRQUNwRCxJQUFJLENBQUMsZUFBZSxDQUFDLGtCQUFrQixFQUFFO2FBQ3BDLFNBQVMsQ0FDTixVQUFDLE1BQXVCO1lBRXBCLEtBQUksQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDO1lBRXhCLEtBQUksQ0FBQyxLQUFLLEdBQUc7Z0JBQ1QsS0FBSyxFQUFFLEtBQUksQ0FBQyxTQUFTO2dCQUNyQixNQUFNLEVBQUUsS0FBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNO2dCQUM3QixPQUFPLFlBQUMsS0FBSztvQkFDVCxJQUFNLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUUvQixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztnQkFFckIsQ0FBQzthQUNKLENBQUM7WUFFRixLQUFJLENBQUMsYUFBYSxHQUFHLFdBQVcsQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQztnQkFDdEQsV0FBVyxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRW5ELENBQUMsRUFDRCxVQUFDLEtBQUs7WUFDRixPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ25CLHVCQUF1QjtRQUMzQixDQUFDLENBQ0osQ0FBQztJQUNWLENBQUM7SUFFRCxnREFBb0IsR0FBcEIsVUFBcUIsSUFBSTtRQUNyQixJQUFNLE1BQU0sR0FBZSxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ3ZDLElBQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1FBRXBELEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxhQUFhLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM3QixXQUFXLENBQUMsU0FBUyxDQUFDLGVBQWUsRUFBRSxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDakUsQ0FBQztRQUVELElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDckQsV0FBVyxDQUFDLFNBQVMsQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUN0RCxXQUFXLENBQUMsU0FBUyxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBRUQsNkNBQWlCLEdBQWpCO1FBQ0ksSUFBTSxVQUFVLEdBQWtCLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNwRCxVQUFVLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDNUIsQ0FBQztJQXZEUSxpQkFBaUI7UUFON0IsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxVQUFVO1lBQ3BCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixTQUFTLEVBQUUsQ0FBQyxrQ0FBZSxDQUFDO1lBQzVCLFdBQVcsRUFBRSwyQkFBMkI7U0FDM0MsQ0FBQzt5Q0FPdUMsa0NBQWU7T0FOM0MsaUJBQWlCLENBd0Q3QjtJQUFELHdCQUFDO0NBQUEsQUF4REQsSUF3REM7QUF4RFksOENBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgUmFkU2lkZURyYXdlciB9IGZyb20gXCJuYXRpdmVzY3JpcHQtdWktc2lkZWRyYXdlclwiO1xuaW1wb3J0ICogYXMgYXBwIGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2FwcGxpY2F0aW9uXCI7XG5pbXBvcnQgeyBMaXN0UGlja2VyIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvbGlzdC1waWNrZXJcIjtcbmltcG9ydCB7IExvY2F0aW9uIH0gZnJvbSBcIn4vc2hhcmVkL21vZGVscy9sb2NhdGlvbi5tb2RlbFwiO1xuaW1wb3J0IHsgTG9jYXRpb25TZXJ2aWNlIH0gZnJvbSBcIn4vc2hhcmVkL3NlcnZpY2VzL2xvY2F0aW9uLnNlcnZpY2VcIjtcblxuLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiogQmVmb3JlIHlvdSBjYW4gbmF2aWdhdGUgdG8gdGhpcyBwYWdlIGZyb20geW91ciBhcHAsIHlvdSBuZWVkIHRvIHJlZmVyZW5jZSB0aGlzIHBhZ2UncyBtb2R1bGUgaW4gdGhlXG4qIGdsb2JhbCBhcHAgcm91dGVyIG1vZHVsZS4gQWRkIHRoZSBmb2xsb3dpbmcgb2JqZWN0IHRvIHRoZSBnbG9iYWwgYXJyYXkgb2Ygcm91dGVzOlxuKiB7IHBhdGg6IFwic2l6ZXNcIiwgbG9hZENoaWxkcmVuOiBcIi4vc2l6ZXMvc2l6ZXMubW9kdWxlI1NpemVzTW9kdWxlXCIgfVxuKiBOb3RlIHRoYXQgdGhpcyBzaW1wbHkgcG9pbnRzIHRoZSBwYXRoIHRvIHRoZSBwYWdlIG1vZHVsZSBmaWxlLiBJZiB5b3UgbW92ZSB0aGUgcGFnZSwgeW91IG5lZWQgdG8gdXBkYXRlIHRoZSByb3V0ZSB0b28uXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJTZXR0aW5nc1wiLFxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgcHJvdmlkZXJzOiBbTG9jYXRpb25TZXJ2aWNlXSxcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3NldHRpbmdzLmNvbXBvbmVudC5odG1sXCJcbn0pXG5leHBvcnQgY2xhc3MgU2V0dGluZ3NDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIGxvY2F0aW9uczogQXJyYXk8TG9jYXRpb24+ID0gW107XG4gICAgaXRlbXM6IG9iamVjdCA9IHt9O1xuICAgIGxvY2F0aW9uOiBMb2NhdGlvbjtcbiAgICBzZWxlY3RlZEluZGV4OiBudW1iZXIgPSAwO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBsb2NhdGlvblNlcnZpY2U6IExvY2F0aW9uU2VydmljZSkge1xuICAgIH1cblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICBjb25zdCBhcHBTZXR0aW5ncyA9IHJlcXVpcmUoXCJhcHBsaWNhdGlvbi1zZXR0aW5nc1wiKTtcbiAgICAgICAgdGhpcy5sb2NhdGlvblNlcnZpY2UuZ2V0TG9jYXRpb25zQWN0aW9uKClcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgKHJlc3VsdDogQXJyYXk8TG9jYXRpb24+KSA9PiB7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2NhdGlvbnMgPSByZXN1bHQ7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pdGVtcyA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1zOiB0aGlzLmxvY2F0aW9ucyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxlbmd0aDogdGhpcy5sb2NhdGlvbnMubGVuZ3RoLFxuICAgICAgICAgICAgICAgICAgICAgICAgZ2V0SXRlbShpbmRleCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSB0aGlzLml0ZW1zW2luZGV4XTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpdGVtLmNvZGU7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkSW5kZXggPSBhcHBTZXR0aW5ncy5oYXNLZXkoXCJsb2NhdGlvbkluZGV4XCIpID9cbiAgICAgICAgICAgICAgICAgICAgICAgIGFwcFNldHRpbmdzLmdldE51bWJlcihcImxvY2F0aW9uSW5kZXhcIikgOiAwO1xuXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5kaXIoZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICAvKlRPRE86IGhhbmRsZSBlcnJvcnMqL1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7XG4gICAgfVxuXG4gICAgc2VsZWN0ZWRJbmRleENoYW5nZWQoYXJncykge1xuICAgICAgICBjb25zdCBwaWNrZXIgPSA8TGlzdFBpY2tlcj5hcmdzLm9iamVjdDtcbiAgICAgICAgY29uc3QgYXBwU2V0dGluZ3MgPSByZXF1aXJlKFwiYXBwbGljYXRpb24tc2V0dGluZ3NcIik7XG5cbiAgICAgICAgaWYgKHBpY2tlci5zZWxlY3RlZEluZGV4ICE9PSAwKSB7XG4gICAgICAgICAgICBhcHBTZXR0aW5ncy5zZXROdW1iZXIoXCJsb2NhdGlvbkluZGV4XCIsIHBpY2tlci5zZWxlY3RlZEluZGV4KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubG9jYXRpb24gPSB0aGlzLmxvY2F0aW9uc1twaWNrZXIuc2VsZWN0ZWRJbmRleF07XG4gICAgICAgIGFwcFNldHRpbmdzLnNldE51bWJlcihcImxvY2F0aW9uSWRcIiwgdGhpcy5sb2NhdGlvbi5pZCk7XG4gICAgICAgIGFwcFNldHRpbmdzLnNldE51bWJlcihcImd1aWRlSW5kZXhcIiwgMCk7XG4gICAgfVxuXG4gICAgb25EcmF3ZXJCdXR0b25UYXAoKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHNpZGVEcmF3ZXIgPSA8UmFkU2lkZURyYXdlcj5hcHAuZ2V0Um9vdFZpZXcoKTtcbiAgICAgICAgc2lkZURyYXdlci5zaG93RHJhd2VyKCk7XG4gICAgfVxufVxuIl19