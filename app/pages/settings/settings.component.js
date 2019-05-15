"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var nativescript_angular_1 = require("nativescript-angular");
var date_picker_1 = require("tns-core-modules/ui/date-picker");
var location_service_1 = require("~/shared/services/location.service");
var SettingsComponent = /** @class */ (function () {
    function SettingsComponent(locationService, routerExtensions, activeRoute) {
        this.locationService = locationService;
        this.routerExtensions = routerExtensions;
        this.activeRoute = activeRoute;
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
        __metadata("design:paramtypes", [location_service_1.LocationService, nativescript_angular_1.RouterExtensions,
            router_1.ActivatedRoute])
    ], SettingsComponent);
    return SettingsComponent;
}());
exports.SettingsComponent = SettingsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0dGluZ3MuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2V0dGluZ3MuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTZEO0FBQzdELDBDQUFpRDtBQUNqRCw2REFBd0Q7QUFDeEQsK0RBQTZEO0FBRzdELHVFQUFxRTtBQVFyRTtJQVNJLDJCQUFvQixlQUFnQyxFQUFVLGdCQUFrQyxFQUM1RSxXQUEyQjtRQUQzQixvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFBVSxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQzVFLGdCQUFXLEdBQVgsV0FBVyxDQUFnQjtRQVQvQyxjQUFTLEdBQW9CLEVBQUUsQ0FBQztRQUNoQyxrQkFBYSxHQUFXLEVBQUUsQ0FBQztRQUUzQixrQkFBYSxHQUFXLENBQUMsQ0FBQztRQUUxQixXQUFNLEdBQVksSUFBSSxDQUFDO0lBS3ZCLENBQUM7SUFFRCxvQ0FBUSxHQUFSO1FBQ0ksSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUFFRCxnREFBb0IsR0FBcEIsVUFBcUIsSUFBSTtRQUNyQixJQUFNLE1BQU0sR0FBZSxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ3ZDLElBQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQyx1Q0FBdUMsQ0FBQyxDQUFDO1FBRXJFLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQzNCLFdBQVcsQ0FBQyxTQUFTLENBQUMsZUFBZSxFQUFFLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUM3RCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQ3JELFdBQVcsQ0FBQyxTQUFTLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDdEQsV0FBVyxDQUFDLFNBQVMsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDdkMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDMUM7SUFFTCxDQUFDO0lBRUQsd0NBQVksR0FBWjtRQUFBLGlCQTZCQztRQTVCRyxJQUFNLFdBQVcsR0FBRyxPQUFPLENBQUMsdUNBQXVDLENBQUMsQ0FBQztRQUNyRSxJQUFJLENBQUMsZUFBZSxDQUFDLGtCQUFrQixFQUFFO2FBQ3BDLFNBQVMsQ0FDTixVQUFDLE1BQXVCO1lBRXBCLEtBQUksQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDO1lBRXhCLEtBQUksQ0FBQyxhQUFhLEdBQUc7Z0JBQ2pCLEtBQUssRUFBRSxLQUFJLENBQUMsU0FBUztnQkFDckIsTUFBTSxFQUFFLEtBQUksQ0FBQyxTQUFTLENBQUMsTUFBTTtnQkFDN0IsT0FBTyxFQUFFLFVBQUMsS0FBSztvQkFDWCxJQUFNLElBQUksR0FBRyxLQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUVuQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUM7Z0JBQ3JCLENBQUM7YUFDSixDQUFDO1lBRUYsS0FBSSxDQUFDLGFBQWEsR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7Z0JBQ3RELFdBQVcsQ0FBQyxTQUFTLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMvQyxLQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUV4QixDQUFDLEVBQ0QsVUFBQyxLQUFLO1lBQ0YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNuQix1QkFBdUI7WUFDdkIsS0FBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDeEIsQ0FBQyxDQUNKLENBQUM7SUFDVixDQUFDO0lBRUQsMENBQWMsR0FBZCxVQUFlLElBQUk7UUFDZixJQUFNLFVBQVUsR0FBZSxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQzNDLElBQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQyx1Q0FBdUMsQ0FBQyxDQUFDO1FBRXJFLElBQUksV0FBVyxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsRUFBRTtZQUNwQyxJQUFNLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7WUFDN0QsVUFBVSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDckMsVUFBVSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQ3ZDLFVBQVUsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1NBQ25DO1FBRUQsVUFBVSxDQUFDLE9BQU8sR0FBRyxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzFDLFVBQVUsQ0FBQyxPQUFPLEdBQUcsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBRUQseUNBQWEsR0FBYixVQUFjLElBQUk7UUFDZCxJQUFNLFdBQVcsR0FBRyxPQUFPLENBQUMsdUNBQXVDLENBQUMsQ0FBQztRQUNyRSxJQUFNLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3hCLElBQUksSUFBSSxDQUFDO1FBQ1QsSUFBSSxLQUFLLENBQUM7UUFDVixJQUFJLEdBQUcsQ0FBQztRQUVSLElBQUksR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDMUIsS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDNUIsR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNyQixXQUFXLENBQUMsU0FBUyxDQUFDLGNBQWMsRUFBRSxJQUFJLEdBQUcsR0FBRyxHQUFHLEtBQUssR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFFdEUsSUFBSSxJQUFJLENBQUMsVUFBVSxLQUFLLElBQUksSUFBSSxPQUFPLElBQUksQ0FBQyxVQUFVLEtBQUssV0FBVyxFQUFFO1lBQ3BFLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztZQUM1QixJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7WUFDOUIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1NBQzdCO0lBRUwsQ0FBQztJQUVELHlDQUFhLEdBQWI7UUFDSSxJQUFNLFdBQVcsR0FBRyxPQUFPLENBQUMsdUNBQXVDLENBQUMsQ0FBQztRQUNyRSxJQUFNLEdBQUcsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO1FBRXZCLElBQUksSUFBSSxDQUFDO1FBQ1QsSUFBSSxLQUFLLENBQUM7UUFDVixJQUFJLEdBQUcsQ0FBQztRQUVSLElBQUksR0FBRyxHQUFHLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDekIsS0FBSyxHQUFHLEdBQUcsQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDM0IsR0FBRyxHQUFHLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUVwQixJQUFJLElBQUksQ0FBQyxVQUFVLEtBQUssSUFBSSxJQUFJLE9BQU8sSUFBSSxDQUFDLFVBQVUsS0FBSyxXQUFXLEVBQUU7WUFDcEUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1lBQzVCLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztZQUM5QixJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7U0FDN0I7UUFFRCxXQUFXLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBRW5DLEtBQUssQ0FBQyxzQkFBc0IsR0FBRyxJQUFJLEdBQUcsR0FBRyxHQUFHLEtBQUssR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUM7SUFDbkUsQ0FBQztJQUVELGtDQUFNLEdBQU47UUFDSSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUMsZUFBZSxDQUFDLEVBQUU7WUFDOUMsVUFBVSxFQUFFO2dCQUNSLElBQUksRUFBRSxNQUFNO2FBQ2Y7U0FDSixDQUFDLENBQUM7SUFDUCxDQUFDO0lBdEhzQjtRQUF0QixnQkFBUyxDQUFDLHdCQUFVLENBQUM7a0NBQWEsd0JBQVU7eURBQUM7SUFSckMsaUJBQWlCO1FBTjdCLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsVUFBVTtZQUNwQixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsU0FBUyxFQUFFLENBQUMsa0NBQWUsQ0FBQztZQUM1QixXQUFXLEVBQUUsMkJBQTJCO1NBQzNDLENBQUM7eUNBVXVDLGtDQUFlLEVBQTRCLHVDQUFnQjtZQUMvRCx1QkFBYztPQVZ0QyxpQkFBaUIsQ0ErSDdCO0lBQUQsd0JBQUM7Q0FBQSxBQS9IRCxJQStIQztBQS9IWSw4Q0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgVmlld0NoaWxkIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhclwiO1xuaW1wb3J0IHsgRGF0ZVBpY2tlciB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2RhdGUtcGlja2VyXCI7XG5pbXBvcnQgeyBMaXN0UGlja2VyIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvbGlzdC1waWNrZXJcIjtcbmltcG9ydCB7IExvY2F0aW9uIH0gZnJvbSBcIn4vc2hhcmVkL21vZGVscy9sb2NhdGlvbi5tb2RlbFwiO1xuaW1wb3J0IHsgTG9jYXRpb25TZXJ2aWNlIH0gZnJvbSBcIn4vc2hhcmVkL3NlcnZpY2VzL2xvY2F0aW9uLnNlcnZpY2VcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwiU2V0dGluZ3NcIixcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHByb3ZpZGVyczogW0xvY2F0aW9uU2VydmljZV0sXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9zZXR0aW5ncy5jb21wb25lbnQuaHRtbFwiXG59KVxuZXhwb3J0IGNsYXNzIFNldHRpbmdzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBsb2NhdGlvbnM6IEFycmF5PExvY2F0aW9uPiA9IFtdO1xuICAgIGxvY2F0aW9uSXRlbXM6IG9iamVjdCA9IHt9O1xuICAgIGxvY2F0aW9uOiBMb2NhdGlvbjtcbiAgICBzZWxlY3RlZEluZGV4OiBudW1iZXIgPSAwO1xuXG4gICAgaXNCdXN5OiBib29sZWFuID0gdHJ1ZTtcblxuICAgIEBWaWV3Q2hpbGQoRGF0ZVBpY2tlcikgZGF0ZVBpY2tlcjogRGF0ZVBpY2tlcjtcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGxvY2F0aW9uU2VydmljZTogTG9jYXRpb25TZXJ2aWNlLCBwcml2YXRlIHJvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBhY3RpdmVSb3V0ZTogQWN0aXZhdGVkUm91dGUpIHtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5nZXRMb2NhdGlvbnMoKTtcbiAgICB9XG5cbiAgICBzZWxlY3RlZEluZGV4Q2hhbmdlZChhcmdzKSB7XG4gICAgICAgIGNvbnN0IHBpY2tlciA9IDxMaXN0UGlja2VyPmFyZ3Mub2JqZWN0O1xuICAgICAgICBjb25zdCBhcHBTZXR0aW5ncyA9IHJlcXVpcmUoXCJ0bnMtY29yZS1tb2R1bGVzL2FwcGxpY2F0aW9uLXNldHRpbmdzXCIpO1xuXG4gICAgICAgIGlmICh0aGlzLmxvY2F0aW9ucy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBhcHBTZXR0aW5ncy5zZXROdW1iZXIoXCJsb2NhdGlvbkluZGV4XCIsIHBpY2tlci5zZWxlY3RlZEluZGV4KTtcbiAgICAgICAgICAgIHRoaXMubG9jYXRpb24gPSB0aGlzLmxvY2F0aW9uc1twaWNrZXIuc2VsZWN0ZWRJbmRleF07XG4gICAgICAgICAgICBhcHBTZXR0aW5ncy5zZXRTdHJpbmcoXCJsb2NhdGlvbklkXCIsIHRoaXMubG9jYXRpb24uaWQpO1xuICAgICAgICAgICAgYXBwU2V0dGluZ3Muc2V0TnVtYmVyKFwiZ3VpZGVJbmRleFwiLCAwKTtcbiAgICAgICAgICAgIGFwcFNldHRpbmdzLnNldE51bWJlcihcImdyb2VwSW5kZXhcIiwgMCk7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIGdldExvY2F0aW9ucygpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgYXBwU2V0dGluZ3MgPSByZXF1aXJlKFwidG5zLWNvcmUtbW9kdWxlcy9hcHBsaWNhdGlvbi1zZXR0aW5nc1wiKTtcbiAgICAgICAgdGhpcy5sb2NhdGlvblNlcnZpY2UuZ2V0TG9jYXRpb25zQWN0aW9uKClcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgKHJlc3VsdDogQXJyYXk8TG9jYXRpb24+KSA9PiB7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2NhdGlvbnMgPSByZXN1bHQ7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2NhdGlvbkl0ZW1zID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbXM6IHRoaXMubG9jYXRpb25zLFxuICAgICAgICAgICAgICAgICAgICAgICAgbGVuZ3RoOiB0aGlzLmxvY2F0aW9ucy5sZW5ndGgsXG4gICAgICAgICAgICAgICAgICAgICAgICBnZXRJdGVtOiAoaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBpdGVtID0gdGhpcy5sb2NhdGlvbnNbaW5kZXhdO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW0uY29kZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkSW5kZXggPSBhcHBTZXR0aW5ncy5oYXNLZXkoXCJsb2NhdGlvbkluZGV4XCIpID9cbiAgICAgICAgICAgICAgICAgICAgICAgIGFwcFNldHRpbmdzLmdldE51bWJlcihcImxvY2F0aW9uSW5kZXhcIikgOiAwO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzQnVzeSA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5kaXIoZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICAvKlRPRE86IGhhbmRsZSBlcnJvcnMqL1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzQnVzeSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7XG4gICAgfVxuXG4gICAgb25QaWNrZXJMb2FkZWQoYXJncykge1xuICAgICAgICBjb25zdCBkYXRlUGlja2VyID0gPERhdGVQaWNrZXI+YXJncy5vYmplY3Q7XG4gICAgICAgIGNvbnN0IGFwcFNldHRpbmdzID0gcmVxdWlyZShcInRucy1jb3JlLW1vZHVsZXMvYXBwbGljYXRpb24tc2V0dGluZ3NcIik7XG5cbiAgICAgICAgaWYgKGFwcFNldHRpbmdzLmhhc0tleShcInNldHRpbmdzRGF0ZVwiKSkge1xuICAgICAgICAgICAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKGFwcFNldHRpbmdzLmdldFN0cmluZyhcInNldHRpbmdzRGF0ZVwiKSk7XG4gICAgICAgICAgICBkYXRlUGlja2VyLnllYXIgPSBkYXRlLmdldEZ1bGxZZWFyKCk7XG4gICAgICAgICAgICBkYXRlUGlja2VyLm1vbnRoID0gZGF0ZS5nZXRNb250aCgpICsgMTtcbiAgICAgICAgICAgIGRhdGVQaWNrZXIuZGF5ID0gZGF0ZS5nZXREYXRlKCk7XG4gICAgICAgIH1cblxuICAgICAgICBkYXRlUGlja2VyLm1pbkRhdGUgPSBuZXcgRGF0ZSgyMDE3LCAwLCAxKTtcbiAgICAgICAgZGF0ZVBpY2tlci5tYXhEYXRlID0gbmV3IERhdGUoMjAzNSwgMTIsIDMwKTtcbiAgICB9XG5cbiAgICBvbkRhdGVDaGFuZ2VkKGFyZ3MpIHtcbiAgICAgICAgY29uc3QgYXBwU2V0dGluZ3MgPSByZXF1aXJlKFwidG5zLWNvcmUtbW9kdWxlcy9hcHBsaWNhdGlvbi1zZXR0aW5nc1wiKTtcbiAgICAgICAgY29uc3QgZGF0ZSA9IGFyZ3MudmFsdWU7XG4gICAgICAgIGxldCB5ZWFyO1xuICAgICAgICBsZXQgbW9udGg7XG4gICAgICAgIGxldCBkYXk7XG5cbiAgICAgICAgeWVhciA9IGRhdGUuZ2V0RnVsbFllYXIoKTtcbiAgICAgICAgbW9udGggPSBkYXRlLmdldE1vbnRoKCkgKyAxO1xuICAgICAgICBkYXkgPSBkYXRlLmdldERhdGUoKTtcbiAgICAgICAgYXBwU2V0dGluZ3Muc2V0U3RyaW5nKFwic2V0dGluZ3NEYXRlXCIsIHllYXIgKyBcIi1cIiArIG1vbnRoICsgXCItXCIgKyBkYXkpO1xuXG4gICAgICAgIGlmICh0aGlzLmRhdGVQaWNrZXIgIT09IG51bGwgJiYgdHlwZW9mIHRoaXMuZGF0ZVBpY2tlciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgICAgdGhpcy5kYXRlUGlja2VyLnllYXIgPSB5ZWFyO1xuICAgICAgICAgICAgdGhpcy5kYXRlUGlja2VyLm1vbnRoID0gbW9udGg7XG4gICAgICAgICAgICB0aGlzLmRhdGVQaWNrZXIuZGF5ID0gZGF5O1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBzZXRDdXJyZW50RGF5KCk6IHZvaWQge1xuICAgICAgICBjb25zdCBhcHBTZXR0aW5ncyA9IHJlcXVpcmUoXCJ0bnMtY29yZS1tb2R1bGVzL2FwcGxpY2F0aW9uLXNldHRpbmdzXCIpO1xuICAgICAgICBjb25zdCBub3cgPSBuZXcgRGF0ZSgpO1xuXG4gICAgICAgIGxldCB5ZWFyO1xuICAgICAgICBsZXQgbW9udGg7XG4gICAgICAgIGxldCBkYXk7XG5cbiAgICAgICAgeWVhciA9IG5vdy5nZXRGdWxsWWVhcigpO1xuICAgICAgICBtb250aCA9IG5vdy5nZXRNb250aCgpICsgMTtcbiAgICAgICAgZGF5ID0gbm93LmdldERhdGUoKTtcblxuICAgICAgICBpZiAodGhpcy5kYXRlUGlja2VyICE9PSBudWxsICYmIHR5cGVvZiB0aGlzLmRhdGVQaWNrZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICAgIHRoaXMuZGF0ZVBpY2tlci55ZWFyID0geWVhcjtcbiAgICAgICAgICAgIHRoaXMuZGF0ZVBpY2tlci5tb250aCA9IG1vbnRoO1xuICAgICAgICAgICAgdGhpcy5kYXRlUGlja2VyLmRheSA9IGRheTtcbiAgICAgICAgfVxuXG4gICAgICAgIGFwcFNldHRpbmdzLnJlbW92ZShcInNldHRpbmdzRGF0ZVwiKTtcblxuICAgICAgICBhbGVydChcIkRhdHVtIGluZ2VzdGVsZCBvcDogXCIgKyB5ZWFyICsgXCItXCIgKyBtb250aCArIFwiLVwiICsgZGF5KTtcbiAgICB9XG5cbiAgICBnb0JhY2soKSB7XG4gICAgICAgIHRoaXMucm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvdGFicy9kZWZhdWx0XCJdLCB7XG4gICAgICAgICAgICB0cmFuc2l0aW9uOiB7XG4gICAgICAgICAgICAgICAgbmFtZTogXCJmYWRlXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxufVxuIl19