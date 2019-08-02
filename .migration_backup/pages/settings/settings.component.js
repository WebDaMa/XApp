"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var nativescript_angular_1 = require("nativescript-angular");
var date_picker_1 = require("tns-core-modules/ui/date-picker");
var dialogs = require("tns-core-modules/ui/dialogs");
var location_service_1 = require("~/shared/services/location.service");
var SettingsComponent = /** @class */ (function () {
    function SettingsComponent(locationService, routerExtensions) {
        this.locationService = locationService;
        this.routerExtensions = routerExtensions;
        this.locations = [];
        this.locationItems = {};
        this.selectedIndex = 0;
        this.isBusy = true;
    }
    SettingsComponent.prototype.ngOnInit = function () {
        this.getLocations();
    };
    SettingsComponent.prototype.selectedIndexChanged = function (args) {
        var picker = args.object;
        var appSettings = require("tns-core-modules/application-settings");
        if (this.locations.length > 0) {
            appSettings.setNumber("locationIndex", picker.selectedIndex);
            this.location = this.locations[picker.selectedIndex];
            appSettings.setString("locationId", this.location.id);
            appSettings.setNumber("guideIndex", 0);
            appSettings.setNumber("groepIndex", 0);
        }
    };
    SettingsComponent.prototype.getLocations = function () {
        var _this = this;
        var appSettings = require("tns-core-modules/application-settings");
        this.locationService.getLocationsAction()
            .subscribe(function (result) {
            _this.locations = result;
            _this.locationItems = {
                items: _this.locations,
                length: _this.locations.length,
                getItem: function (index) {
                    var item = _this.locations[index];
                    return item.code;
                }
            };
            _this.selectedIndex = appSettings.hasKey("locationIndex") ?
                appSettings.getNumber("locationIndex") : 0;
            _this.isBusy = false;
        }, function (error) {
            console.dir(error);
            /*TODO: handle errors*/
            _this.isBusy = false;
        });
    };
    SettingsComponent.prototype.onPickerLoaded = function (args) {
        var datePicker = args.object;
        var appSettings = require("tns-core-modules/application-settings");
        if (appSettings.hasKey("settingsDate")) {
            var date = new Date(appSettings.getString("settingsDate"));
            datePicker.year = date.getFullYear();
            datePicker.month = date.getMonth() + 1;
            datePicker.day = date.getDate();
        }
        datePicker.minDate = new Date(2017, 0, 1);
        datePicker.maxDate = new Date(2035, 12, 30);
    };
    SettingsComponent.prototype.onDateChanged = function (args) {
        var appSettings = require("tns-core-modules/application-settings");
        var date = args.value;
        var year;
        var month;
        var day;
        year = date.getFullYear();
        month = date.getMonth() + 1;
        day = date.getDate();
        appSettings.setString("settingsDate", year + "-" + month + "-" + day);
        if (this.datePicker !== null && typeof this.datePicker !== "undefined") {
            this.datePicker.year = year;
            this.datePicker.month = month;
            this.datePicker.day = day;
        }
        /* Show alert on Saturday, as there are 2 groups, current group should use Friday.*/
        this.alertSaturday(date);
    };
    SettingsComponent.prototype.alertSaturday = function (date) {
        var weekDay = date.getDay();
        if (weekDay === 6) {
            var options = {
                title: "Transfer Day",
                message: "Indien je acties voor huidige groepen wenst te doen, " +
                    "pas je de datum naar vrijdag aan!",
                okButtonText: "OK"
            };
            dialogs.alert(options);
        }
    };
    SettingsComponent.prototype.setCurrentDay = function () {
        var appSettings = require("tns-core-modules/application-settings");
        var now = new Date();
        var year;
        var month;
        var day;
        year = now.getFullYear();
        month = now.getMonth() + 1;
        day = now.getDate();
        if (this.datePicker !== null && typeof this.datePicker !== "undefined") {
            this.datePicker.year = year;
            this.datePicker.month = month;
            this.datePicker.day = day;
        }
        appSettings.remove("settingsDate");
        alert("Datum ingesteld op: " + year + "-" + month + "-" + day);
    };
    SettingsComponent.prototype.goBack = function () {
        this.routerExtensions.navigate(["/tabs/default"], {
            transition: {
                name: "fade"
            }
        });
    };
    __decorate([
        core_1.ViewChild(date_picker_1.DatePicker),
        __metadata("design:type", date_picker_1.DatePicker)
    ], SettingsComponent.prototype, "datePicker", void 0);
    SettingsComponent = __decorate([
        core_1.Component({
            selector: "Settings",
            moduleId: module.id,
            providers: [location_service_1.LocationService],
            templateUrl: "./settings.component.html"
        }),
        __metadata("design:paramtypes", [location_service_1.LocationService, nativescript_angular_1.RouterExtensions])
    ], SettingsComponent);
    return SettingsComponent;
}());
exports.SettingsComponent = SettingsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0dGluZ3MuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2V0dGluZ3MuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTZEO0FBQzdELDZEQUF3RDtBQUN4RCwrREFBNkQ7QUFDN0QscURBQXVEO0FBR3ZELHVFQUFxRTtBQVFyRTtJQVNJLDJCQUFvQixlQUFnQyxFQUFVLGdCQUFrQztRQUE1RSxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFBVSxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBUmhHLGNBQVMsR0FBb0IsRUFBRSxDQUFDO1FBQ2hDLGtCQUFhLEdBQVcsRUFBRSxDQUFDO1FBRTNCLGtCQUFhLEdBQVcsQ0FBQyxDQUFDO1FBRTFCLFdBQU0sR0FBWSxJQUFJLENBQUM7SUFJdkIsQ0FBQztJQUVELG9DQUFRLEdBQVI7UUFDSSxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQUVELGdEQUFvQixHQUFwQixVQUFxQixJQUFJO1FBQ3JCLElBQU0sTUFBTSxHQUFlLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDdkMsSUFBTSxXQUFXLEdBQUcsT0FBTyxDQUFDLHVDQUF1QyxDQUFDLENBQUM7UUFFckUsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDM0IsV0FBVyxDQUFDLFNBQVMsQ0FBQyxlQUFlLEVBQUUsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQzdELElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUM7WUFDckQsV0FBVyxDQUFDLFNBQVMsQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUN0RCxXQUFXLENBQUMsU0FBUyxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUMsQ0FBQztZQUN2QyxXQUFXLENBQUMsU0FBUyxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUMsQ0FBQztTQUMxQztJQUVMLENBQUM7SUFFRCx3Q0FBWSxHQUFaO1FBQUEsaUJBNkJDO1FBNUJHLElBQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQyx1Q0FBdUMsQ0FBQyxDQUFDO1FBQ3JFLElBQUksQ0FBQyxlQUFlLENBQUMsa0JBQWtCLEVBQUU7YUFDcEMsU0FBUyxDQUNOLFVBQUMsTUFBdUI7WUFFcEIsS0FBSSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUM7WUFFeEIsS0FBSSxDQUFDLGFBQWEsR0FBRztnQkFDakIsS0FBSyxFQUFFLEtBQUksQ0FBQyxTQUFTO2dCQUNyQixNQUFNLEVBQUUsS0FBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNO2dCQUM3QixPQUFPLEVBQUUsVUFBQyxLQUFLO29CQUNYLElBQU0sSUFBSSxHQUFHLEtBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBRW5DLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQztnQkFDckIsQ0FBQzthQUNKLENBQUM7WUFFRixLQUFJLENBQUMsYUFBYSxHQUFHLFdBQVcsQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQztnQkFDdEQsV0FBVyxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQy9DLEtBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBRXhCLENBQUMsRUFDRCxVQUFDLEtBQUs7WUFDRixPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ25CLHVCQUF1QjtZQUN2QixLQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUN4QixDQUFDLENBQ0osQ0FBQztJQUNWLENBQUM7SUFFRCwwQ0FBYyxHQUFkLFVBQWUsSUFBSTtRQUNmLElBQU0sVUFBVSxHQUFlLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDM0MsSUFBTSxXQUFXLEdBQUcsT0FBTyxDQUFDLHVDQUF1QyxDQUFDLENBQUM7UUFFckUsSUFBSSxXQUFXLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxFQUFFO1lBQ3BDLElBQU0sSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztZQUM3RCxVQUFVLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUNyQyxVQUFVLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDdkMsVUFBVSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDbkM7UUFFRCxVQUFVLENBQUMsT0FBTyxHQUFHLElBQUksSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDMUMsVUFBVSxDQUFDLE9BQU8sR0FBRyxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFFRCx5Q0FBYSxHQUFiLFVBQWMsSUFBSTtRQUNkLElBQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQyx1Q0FBdUMsQ0FBQyxDQUFDO1FBQ3JFLElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDeEIsSUFBSSxJQUFJLENBQUM7UUFDVCxJQUFJLEtBQUssQ0FBQztRQUNWLElBQUksR0FBRyxDQUFDO1FBRVIsSUFBSSxHQUFHLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUMxQixLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUM1QixHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ3JCLFdBQVcsQ0FBQyxTQUFTLENBQUMsY0FBYyxFQUFFLElBQUksR0FBRyxHQUFHLEdBQUcsS0FBSyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUV0RSxJQUFJLElBQUksQ0FBQyxVQUFVLEtBQUssSUFBSSxJQUFJLE9BQU8sSUFBSSxDQUFDLFVBQVUsS0FBSyxXQUFXLEVBQUU7WUFDcEUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1lBQzVCLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztZQUM5QixJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7U0FDN0I7UUFFRCxvRkFBb0Y7UUFFcEYsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUU3QixDQUFDO0lBRUQseUNBQWEsR0FBYixVQUFjLElBQUk7UUFDZCxJQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDOUIsSUFBSSxPQUFPLEtBQUssQ0FBQyxFQUFFO1lBQ2YsSUFBTSxPQUFPLEdBQUc7Z0JBQ1osS0FBSyxFQUFFLGNBQWM7Z0JBQ3JCLE9BQU8sRUFBRSx1REFBdUQ7b0JBQ2hFLG1DQUFtQztnQkFDbkMsWUFBWSxFQUFFLElBQUk7YUFDckIsQ0FBQztZQUVGLE9BQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDMUI7SUFDTCxDQUFDO0lBRUQseUNBQWEsR0FBYjtRQUNJLElBQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQyx1Q0FBdUMsQ0FBQyxDQUFDO1FBQ3JFLElBQU0sR0FBRyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7UUFFdkIsSUFBSSxJQUFJLENBQUM7UUFDVCxJQUFJLEtBQUssQ0FBQztRQUNWLElBQUksR0FBRyxDQUFDO1FBRVIsSUFBSSxHQUFHLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUN6QixLQUFLLEdBQUcsR0FBRyxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUMzQixHQUFHLEdBQUcsR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBRXBCLElBQUksSUFBSSxDQUFDLFVBQVUsS0FBSyxJQUFJLElBQUksT0FBTyxJQUFJLENBQUMsVUFBVSxLQUFLLFdBQVcsRUFBRTtZQUNwRSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7WUFDNUIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1lBQzlCLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztTQUM3QjtRQUVELFdBQVcsQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUM7UUFFbkMsS0FBSyxDQUFDLHNCQUFzQixHQUFHLElBQUksR0FBRyxHQUFHLEdBQUcsS0FBSyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQztJQUNuRSxDQUFDO0lBRUQsa0NBQU0sR0FBTjtRQUNJLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxlQUFlLENBQUMsRUFBRTtZQUM5QyxVQUFVLEVBQUU7Z0JBQ1IsSUFBSSxFQUFFLE1BQU07YUFDZjtTQUNKLENBQUMsQ0FBQztJQUNQLENBQUM7SUF2SXNCO1FBQXRCLGdCQUFTLENBQUMsd0JBQVUsQ0FBQztrQ0FBYSx3QkFBVTt5REFBQztJQVJyQyxpQkFBaUI7UUFON0IsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxVQUFVO1lBQ3BCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixTQUFTLEVBQUUsQ0FBQyxrQ0FBZSxDQUFDO1lBQzVCLFdBQVcsRUFBRSwyQkFBMkI7U0FDM0MsQ0FBQzt5Q0FVdUMsa0NBQWUsRUFBNEIsdUNBQWdCO09BVHZGLGlCQUFpQixDQWdKN0I7SUFBRCx3QkFBQztDQUFBLEFBaEpELElBZ0pDO0FBaEpZLDhDQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBWaWV3Q2hpbGQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhclwiO1xuaW1wb3J0IHsgRGF0ZVBpY2tlciB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2RhdGUtcGlja2VyXCI7XG5pbXBvcnQgKiBhcyBkaWFsb2dzIGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2RpYWxvZ3NcIjtcbmltcG9ydCB7IExpc3RQaWNrZXIgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9saXN0LXBpY2tlclwiO1xuaW1wb3J0IHsgTG9jYXRpb24gfSBmcm9tIFwifi9zaGFyZWQvbW9kZWxzL2xvY2F0aW9uLm1vZGVsXCI7XG5pbXBvcnQgeyBMb2NhdGlvblNlcnZpY2UgfSBmcm9tIFwifi9zaGFyZWQvc2VydmljZXMvbG9jYXRpb24uc2VydmljZVwiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJTZXR0aW5nc1wiLFxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgcHJvdmlkZXJzOiBbTG9jYXRpb25TZXJ2aWNlXSxcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3NldHRpbmdzLmNvbXBvbmVudC5odG1sXCJcbn0pXG5leHBvcnQgY2xhc3MgU2V0dGluZ3NDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIGxvY2F0aW9uczogQXJyYXk8TG9jYXRpb24+ID0gW107XG4gICAgbG9jYXRpb25JdGVtczogb2JqZWN0ID0ge307XG4gICAgbG9jYXRpb246IExvY2F0aW9uO1xuICAgIHNlbGVjdGVkSW5kZXg6IG51bWJlciA9IDA7XG5cbiAgICBpc0J1c3k6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgQFZpZXdDaGlsZChEYXRlUGlja2VyKSBkYXRlUGlja2VyOiBEYXRlUGlja2VyO1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgbG9jYXRpb25TZXJ2aWNlOiBMb2NhdGlvblNlcnZpY2UsIHByaXZhdGUgcm91dGVyRXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9ucykge1xuICAgIH1cblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmdldExvY2F0aW9ucygpO1xuICAgIH1cblxuICAgIHNlbGVjdGVkSW5kZXhDaGFuZ2VkKGFyZ3MpIHtcbiAgICAgICAgY29uc3QgcGlja2VyID0gPExpc3RQaWNrZXI+YXJncy5vYmplY3Q7XG4gICAgICAgIGNvbnN0IGFwcFNldHRpbmdzID0gcmVxdWlyZShcInRucy1jb3JlLW1vZHVsZXMvYXBwbGljYXRpb24tc2V0dGluZ3NcIik7XG5cbiAgICAgICAgaWYgKHRoaXMubG9jYXRpb25zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGFwcFNldHRpbmdzLnNldE51bWJlcihcImxvY2F0aW9uSW5kZXhcIiwgcGlja2VyLnNlbGVjdGVkSW5kZXgpO1xuICAgICAgICAgICAgdGhpcy5sb2NhdGlvbiA9IHRoaXMubG9jYXRpb25zW3BpY2tlci5zZWxlY3RlZEluZGV4XTtcbiAgICAgICAgICAgIGFwcFNldHRpbmdzLnNldFN0cmluZyhcImxvY2F0aW9uSWRcIiwgdGhpcy5sb2NhdGlvbi5pZCk7XG4gICAgICAgICAgICBhcHBTZXR0aW5ncy5zZXROdW1iZXIoXCJndWlkZUluZGV4XCIsIDApO1xuICAgICAgICAgICAgYXBwU2V0dGluZ3Muc2V0TnVtYmVyKFwiZ3JvZXBJbmRleFwiLCAwKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgZ2V0TG9jYXRpb25zKCk6IHZvaWQge1xuICAgICAgICBjb25zdCBhcHBTZXR0aW5ncyA9IHJlcXVpcmUoXCJ0bnMtY29yZS1tb2R1bGVzL2FwcGxpY2F0aW9uLXNldHRpbmdzXCIpO1xuICAgICAgICB0aGlzLmxvY2F0aW9uU2VydmljZS5nZXRMb2NhdGlvbnNBY3Rpb24oKVxuICAgICAgICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICAocmVzdWx0OiBBcnJheTxMb2NhdGlvbj4pID0+IHtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvY2F0aW9ucyA9IHJlc3VsdDtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvY2F0aW9uSXRlbXMgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtczogdGhpcy5sb2NhdGlvbnMsXG4gICAgICAgICAgICAgICAgICAgICAgICBsZW5ndGg6IHRoaXMubG9jYXRpb25zLmxlbmd0aCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGdldEl0ZW06IChpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSB0aGlzLmxvY2F0aW9uc1tpbmRleF07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXRlbS5jb2RlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRJbmRleCA9IGFwcFNldHRpbmdzLmhhc0tleShcImxvY2F0aW9uSW5kZXhcIikgP1xuICAgICAgICAgICAgICAgICAgICAgICAgYXBwU2V0dGluZ3MuZ2V0TnVtYmVyKFwibG9jYXRpb25JbmRleFwiKSA6IDA7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNCdXN5ID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmRpcihlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIC8qVE9ETzogaGFuZGxlIGVycm9ycyovXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNCdXN5ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcbiAgICB9XG5cbiAgICBvblBpY2tlckxvYWRlZChhcmdzKSB7XG4gICAgICAgIGNvbnN0IGRhdGVQaWNrZXIgPSA8RGF0ZVBpY2tlcj5hcmdzLm9iamVjdDtcbiAgICAgICAgY29uc3QgYXBwU2V0dGluZ3MgPSByZXF1aXJlKFwidG5zLWNvcmUtbW9kdWxlcy9hcHBsaWNhdGlvbi1zZXR0aW5nc1wiKTtcblxuICAgICAgICBpZiAoYXBwU2V0dGluZ3MuaGFzS2V5KFwic2V0dGluZ3NEYXRlXCIpKSB7XG4gICAgICAgICAgICBjb25zdCBkYXRlID0gbmV3IERhdGUoYXBwU2V0dGluZ3MuZ2V0U3RyaW5nKFwic2V0dGluZ3NEYXRlXCIpKTtcbiAgICAgICAgICAgIGRhdGVQaWNrZXIueWVhciA9IGRhdGUuZ2V0RnVsbFllYXIoKTtcbiAgICAgICAgICAgIGRhdGVQaWNrZXIubW9udGggPSBkYXRlLmdldE1vbnRoKCkgKyAxO1xuICAgICAgICAgICAgZGF0ZVBpY2tlci5kYXkgPSBkYXRlLmdldERhdGUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGRhdGVQaWNrZXIubWluRGF0ZSA9IG5ldyBEYXRlKDIwMTcsIDAsIDEpO1xuICAgICAgICBkYXRlUGlja2VyLm1heERhdGUgPSBuZXcgRGF0ZSgyMDM1LCAxMiwgMzApO1xuICAgIH1cblxuICAgIG9uRGF0ZUNoYW5nZWQoYXJncykge1xuICAgICAgICBjb25zdCBhcHBTZXR0aW5ncyA9IHJlcXVpcmUoXCJ0bnMtY29yZS1tb2R1bGVzL2FwcGxpY2F0aW9uLXNldHRpbmdzXCIpO1xuICAgICAgICBjb25zdCBkYXRlID0gYXJncy52YWx1ZTtcbiAgICAgICAgbGV0IHllYXI7XG4gICAgICAgIGxldCBtb250aDtcbiAgICAgICAgbGV0IGRheTtcblxuICAgICAgICB5ZWFyID0gZGF0ZS5nZXRGdWxsWWVhcigpO1xuICAgICAgICBtb250aCA9IGRhdGUuZ2V0TW9udGgoKSArIDE7XG4gICAgICAgIGRheSA9IGRhdGUuZ2V0RGF0ZSgpO1xuICAgICAgICBhcHBTZXR0aW5ncy5zZXRTdHJpbmcoXCJzZXR0aW5nc0RhdGVcIiwgeWVhciArIFwiLVwiICsgbW9udGggKyBcIi1cIiArIGRheSk7XG5cbiAgICAgICAgaWYgKHRoaXMuZGF0ZVBpY2tlciAhPT0gbnVsbCAmJiB0eXBlb2YgdGhpcy5kYXRlUGlja2VyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgICB0aGlzLmRhdGVQaWNrZXIueWVhciA9IHllYXI7XG4gICAgICAgICAgICB0aGlzLmRhdGVQaWNrZXIubW9udGggPSBtb250aDtcbiAgICAgICAgICAgIHRoaXMuZGF0ZVBpY2tlci5kYXkgPSBkYXk7XG4gICAgICAgIH1cblxuICAgICAgICAvKiBTaG93IGFsZXJ0IG9uIFNhdHVyZGF5LCBhcyB0aGVyZSBhcmUgMiBncm91cHMsIGN1cnJlbnQgZ3JvdXAgc2hvdWxkIHVzZSBGcmlkYXkuKi9cblxuICAgICAgICB0aGlzLmFsZXJ0U2F0dXJkYXkoZGF0ZSk7XG5cbiAgICB9XG5cbiAgICBhbGVydFNhdHVyZGF5KGRhdGUpOiB2b2lkIHtcbiAgICAgICAgY29uc3Qgd2Vla0RheSA9IGRhdGUuZ2V0RGF5KCk7XG4gICAgICAgIGlmICh3ZWVrRGF5ID09PSA2KSB7XG4gICAgICAgICAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgICAgICAgICAgIHRpdGxlOiBcIlRyYW5zZmVyIERheVwiLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwiSW5kaWVuIGplIGFjdGllcyB2b29yIGh1aWRpZ2UgZ3JvZXBlbiB3ZW5zdCB0ZSBkb2VuLCBcIiArXG4gICAgICAgICAgICAgICAgXCJwYXMgamUgZGUgZGF0dW0gbmFhciB2cmlqZGFnIGFhbiFcIixcbiAgICAgICAgICAgICAgICBva0J1dHRvblRleHQ6IFwiT0tcIlxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgZGlhbG9ncy5hbGVydChvcHRpb25zKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldEN1cnJlbnREYXkoKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGFwcFNldHRpbmdzID0gcmVxdWlyZShcInRucy1jb3JlLW1vZHVsZXMvYXBwbGljYXRpb24tc2V0dGluZ3NcIik7XG4gICAgICAgIGNvbnN0IG5vdyA9IG5ldyBEYXRlKCk7XG5cbiAgICAgICAgbGV0IHllYXI7XG4gICAgICAgIGxldCBtb250aDtcbiAgICAgICAgbGV0IGRheTtcblxuICAgICAgICB5ZWFyID0gbm93LmdldEZ1bGxZZWFyKCk7XG4gICAgICAgIG1vbnRoID0gbm93LmdldE1vbnRoKCkgKyAxO1xuICAgICAgICBkYXkgPSBub3cuZ2V0RGF0ZSgpO1xuXG4gICAgICAgIGlmICh0aGlzLmRhdGVQaWNrZXIgIT09IG51bGwgJiYgdHlwZW9mIHRoaXMuZGF0ZVBpY2tlciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgICAgdGhpcy5kYXRlUGlja2VyLnllYXIgPSB5ZWFyO1xuICAgICAgICAgICAgdGhpcy5kYXRlUGlja2VyLm1vbnRoID0gbW9udGg7XG4gICAgICAgICAgICB0aGlzLmRhdGVQaWNrZXIuZGF5ID0gZGF5O1xuICAgICAgICB9XG5cbiAgICAgICAgYXBwU2V0dGluZ3MucmVtb3ZlKFwic2V0dGluZ3NEYXRlXCIpO1xuXG4gICAgICAgIGFsZXJ0KFwiRGF0dW0gaW5nZXN0ZWxkIG9wOiBcIiArIHllYXIgKyBcIi1cIiArIG1vbnRoICsgXCItXCIgKyBkYXkpO1xuICAgIH1cblxuICAgIGdvQmFjaygpIHtcbiAgICAgICAgdGhpcy5yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFtcIi90YWJzL2RlZmF1bHRcIl0sIHtcbiAgICAgICAgICAgIHRyYW5zaXRpb246IHtcbiAgICAgICAgICAgICAgICBuYW1lOiBcImZhZGVcIlxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG59XG4iXX0=