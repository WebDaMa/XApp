"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var nativescript_angular_1 = require("nativescript-angular");
var date_picker_1 = require("tns-core-modules/ui/date-picker");
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
        var appSettings = require("application-settings");
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
        var appSettings = require("application-settings");
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
        var appSettings = require("application-settings");
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
        var appSettings = require("application-settings");
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
        var appSettings = require("application-settings");
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
        this.routerExtensions.backToPreviousPage();
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
