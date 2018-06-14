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
        if (this.locations.length > 0) {
            appSettings.setNumber("locationIndex", picker.selectedIndex);
            this.location = this.locations[picker.selectedIndex];
            appSettings.setString("locationId", this.location.id);
            appSettings.setNumber("guideIndex", 0);
            appSettings.setNumber("groepIndex", 0);
        }
    };
    SettingsComponent.prototype.onPickerLoaded = function (args) {
        var datePicker = args.object;
        var appSettings = require("application-settings");
        if (appSettings.hasKey("materialDate")) {
            var date = new Date(appSettings.getString("materialDate"));
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
        appSettings.setString("materialDate", date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate());
    };
    SettingsComponent.prototype.setCurrentDay = function () {
        var appSettings = require("application-settings");
        var now = new Date();
        appSettings.remove("materialDate");
        alert("Datum ingesteld op: " + now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate());
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0dGluZ3MuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2V0dGluZ3MuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBRWxELGtEQUFvRDtBQUdwRCx1RUFBcUU7QUFHckU7Ozs7OzhEQUs4RDtBQVE5RDtJQU1JLDJCQUFvQixlQUFnQztRQUFoQyxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFMcEQsY0FBUyxHQUFvQixFQUFFLENBQUM7UUFDaEMsVUFBSyxHQUFXLEVBQUUsQ0FBQztRQUVuQixrQkFBYSxHQUFXLENBQUMsQ0FBQztJQUcxQixDQUFDO0lBRUQsb0NBQVEsR0FBUjtRQUFBLGlCQTRCQztRQTNCRyxJQUFNLFdBQVcsR0FBRyxPQUFPLENBQUMsc0JBQXNCLENBQUMsQ0FBQztRQUNwRCxJQUFJLENBQUMsZUFBZSxDQUFDLGtCQUFrQixFQUFFO2FBQ3BDLFNBQVMsQ0FDTixVQUFDLE1BQXVCO1lBRXBCLEtBQUksQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDO1lBRXhCLEtBQUksQ0FBQyxLQUFLLEdBQUc7Z0JBQ1QsS0FBSyxFQUFFLEtBQUksQ0FBQyxTQUFTO2dCQUNyQixNQUFNLEVBQUUsS0FBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNO2dCQUM3QixPQUFPLFlBQUMsS0FBSztvQkFDVCxJQUFNLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUUvQixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztnQkFFckIsQ0FBQzthQUNKLENBQUM7WUFFRixLQUFJLENBQUMsYUFBYSxHQUFHLFdBQVcsQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQztnQkFDdEQsV0FBVyxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRW5ELENBQUMsRUFDRCxVQUFDLEtBQUs7WUFDRixPQUFPLENBQUMs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R0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3BELFVBQVUsQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUM1QixDQUFDO0lBckZRLGlCQUFpQjtRQU43QixnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLFVBQVU7WUFDcEIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFNBQVMsRUFBRSxDQUFDLGtDQUFlLENBQUM7WUFDNUIsV0FBVyxFQUFFLDJCQUEyQjtTQUMzQyxDQUFDO3lDQU91QyxrQ0FBZTtPQU4zQyxpQkFBaUIsQ0FzRjdCO0lBQUQsd0JBQUM7Q0FBQSxBQXRGRCxJQXNGQztBQXRGWSw4Q0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBSYWRTaWRlRHJhd2VyIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC11aS1zaWRlZHJhd2VyXCI7XG5pbXBvcnQgKiBhcyBhcHAgZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvYXBwbGljYXRpb25cIjtcbmltcG9ydCB7IExpc3RQaWNrZXIgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9saXN0LXBpY2tlclwiO1xuaW1wb3J0IHsgTG9jYXRpb24gfSBmcm9tIFwifi9zaGFyZWQvbW9kZWxzL2xvY2F0aW9uLm1vZGVsXCI7XG5pbXBvcnQgeyBMb2NhdGlvblNlcnZpY2UgfSBmcm9tIFwifi9zaGFyZWQvc2VydmljZXMvbG9jYXRpb24uc2VydmljZVwiO1xuaW1wb3J0IHtEYXRlUGlja2VyfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9kYXRlLXBpY2tlclwiO1xuXG4vKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuKiBCZWZvcmUgeW91IGNhbiBuYXZpZ2F0ZSB0byB0aGlzIHBhZ2UgZnJvbSB5b3VyIGFwcCwgeW91IG5lZWQgdG8gcmVmZXJlbmNlIHRoaXMgcGFnZSdzIG1vZHVsZSBpbiB0aGVcbiogZ2xvYmFsIGFwcCByb3V0ZXIgbW9kdWxlLiBBZGQgdGhlIGZvbGxvd2luZyBvYmplY3QgdG8gdGhlIGdsb2JhbCBhcnJheSBvZiByb3V0ZXM6XG4qIHsgcGF0aDogXCJzaXplc1wiLCBsb2FkQ2hpbGRyZW46IFwiLi9zaXplcy9zaXplcy5tb2R1bGUjU2l6ZXNNb2R1bGVcIiB9XG4qIE5vdGUgdGhhdCB0aGlzIHNpbXBseSBwb2ludHMgdGhlIHBhdGggdG8gdGhlIHBhZ2UgbW9kdWxlIGZpbGUuIElmIHlvdSBtb3ZlIHRoZSBwYWdlLCB5b3UgbmVlZCB0byB1cGRhdGUgdGhlIHJvdXRlIHRvby5cbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcIlNldHRpbmdzXCIsXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICBwcm92aWRlcnM6IFtMb2NhdGlvblNlcnZpY2VdLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vc2V0dGluZ3MuY29tcG9uZW50Lmh0bWxcIlxufSlcbmV4cG9ydCBjbGFzcyBTZXR0aW5nc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgbG9jYXRpb25zOiBBcnJheTxMb2NhdGlvbj4gPSBbXTtcbiAgICBpdGVtczogb2JqZWN0ID0ge307XG4gICAgbG9jYXRpb246IExvY2F0aW9uO1xuICAgIHNlbGVjdGVkSW5kZXg6IG51bWJlciA9IDA7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGxvY2F0aW9uU2VydmljZTogTG9jYXRpb25TZXJ2aWNlKSB7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGFwcFNldHRpbmdzID0gcmVxdWlyZShcImFwcGxpY2F0aW9uLXNldHRpbmdzXCIpO1xuICAgICAgICB0aGlzLmxvY2F0aW9uU2VydmljZS5nZXRMb2NhdGlvbnNBY3Rpb24oKVxuICAgICAgICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICAocmVzdWx0OiBBcnJheTxMb2NhdGlvbj4pID0+IHtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvY2F0aW9ucyA9IHJlc3VsdDtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLml0ZW1zID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbXM6IHRoaXMubG9jYXRpb25zLFxuICAgICAgICAgICAgICAgICAgICAgICAgbGVuZ3RoOiB0aGlzLmxvY2F0aW9ucy5sZW5ndGgsXG4gICAgICAgICAgICAgICAgICAgICAgICBnZXRJdGVtKGluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaXRlbSA9IHRoaXMuaXRlbXNbaW5kZXhdO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW0uY29kZTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRJbmRleCA9IGFwcFNldHRpbmdzLmhhc0tleShcImxvY2F0aW9uSW5kZXhcIikgP1xuICAgICAgICAgICAgICAgICAgICAgICAgYXBwU2V0dGluZ3MuZ2V0TnVtYmVyKFwibG9jYXRpb25JbmRleFwiKSA6IDA7XG5cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmRpcihlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIC8qVE9ETzogaGFuZGxlIGVycm9ycyovXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcbiAgICB9XG5cbiAgICBzZWxlY3RlZEluZGV4Q2hhbmdlZChhcmdzKSB7XG4gICAgICAgIGNvbnN0IHBpY2tlciA9IDxMaXN0UGlja2VyPmFyZ3Mub2JqZWN0O1xuICAgICAgICBjb25zdCBhcHBTZXR0aW5ncyA9IHJlcXVpcmUoXCJhcHBsaWNhdGlvbi1zZXR0aW5nc1wiKTtcblxuICAgICAgICBpZiAodGhpcy5sb2NhdGlvbnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgYXBwU2V0dGluZ3Muc2V0TnVtYmVyKFwibG9jYXRpb25JbmRleFwiLCBwaWNrZXIuc2VsZWN0ZWRJbmRleCk7XG4gICAgICAgICAgICB0aGlzLmxvY2F0aW9uID0gdGhpcy5sb2NhdGlvbnNbcGlja2VyLnNlbGVjdGVkSW5kZXhdO1xuICAgICAgICAgICAgYXBwU2V0dGluZ3Muc2V0U3RyaW5nKFwibG9jYXRpb25JZFwiLCB0aGlzLmxvY2F0aW9uLmlkKTtcbiAgICAgICAgICAgIGFwcFNldHRpbmdzLnNldE51bWJlcihcImd1aWRlSW5kZXhcIiwgMCk7XG4gICAgICAgICAgICBhcHBTZXR0aW5ncy5zZXROdW1iZXIoXCJncm9lcEluZGV4XCIsIDApO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBvblBpY2tlckxvYWRlZChhcmdzKSB7XG4gICAgICAgIGNvbnN0IGRhdGVQaWNrZXIgPSA8RGF0ZVBpY2tlcj5hcmdzLm9iamVjdDtcbiAgICAgICAgY29uc3QgYXBwU2V0dGluZ3MgPSByZXF1aXJlKFwiYXBwbGljYXRpb24tc2V0dGluZ3NcIik7XG5cbiAgICAgICAgaWYgKGFwcFNldHRpbmdzLmhhc0tleShcIm1hdGVyaWFsRGF0ZVwiKSkge1xuICAgICAgICAgICAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKGFwcFNldHRpbmdzLmdldFN0cmluZyhcIm1hdGVyaWFsRGF0ZVwiKSk7XG4gICAgICAgICAgICBkYXRlUGlja2VyLnllYXIgPSBkYXRlLmdldEZ1bGxZZWFyKCk7XG4gICAgICAgICAgICBkYXRlUGlja2VyLm1vbnRoID0gZGF0ZS5nZXRNb250aCgpICsgMTtcbiAgICAgICAgICAgIGRhdGVQaWNrZXIuZGF5ID0gZGF0ZS5nZXREYXRlKCk7XG4gICAgICAgIH1cblxuICAgICAgICBkYXRlUGlja2VyLm1pbkRhdGUgPSBuZXcgRGF0ZSgyMDE3LCAwLCAxKTtcbiAgICAgICAgZGF0ZVBpY2tlci5tYXhEYXRlID0gbmV3IERhdGUoMjAzNSwgMTIsIDMwKTtcbiAgICB9XG5cbiAgICBvbkRhdGVDaGFuZ2VkKGFyZ3MpIHtcbiAgICAgICAgY29uc3QgYXBwU2V0dGluZ3MgPSByZXF1aXJlKFwiYXBwbGljYXRpb24tc2V0dGluZ3NcIik7XG4gICAgICAgIGNvbnN0IGRhdGUgPSBhcmdzLnZhbHVlO1xuICAgICAgICBhcHBTZXR0aW5ncy5zZXRTdHJpbmcoXCJtYXRlcmlhbERhdGVcIiwgZGF0ZS5nZXRGdWxsWWVhcigpICsgXCItXCIgKyAoZGF0ZS5nZXRNb250aCgpICsgMSkgKyBcIi1cIiArIGRhdGUuZ2V0RGF0ZSgpKTtcbiAgICB9XG5cbiAgICBzZXRDdXJyZW50RGF5KCk6IHZvaWQge1xuICAgICAgICBjb25zdCBhcHBTZXR0aW5ncyA9IHJlcXVpcmUoXCJhcHBsaWNhdGlvbi1zZXR0aW5nc1wiKTtcbiAgICAgICAgY29uc3Qgbm93ID0gbmV3IERhdGUoKTtcblxuICAgICAgICBhcHBTZXR0aW5ncy5yZW1vdmUoXCJtYXRlcmlhbERhdGVcIik7XG4gICAgICAgIGFsZXJ0KFwiRGF0dW0gaW5nZXN0ZWxkIG9wOiBcIiArIG5vdy5nZXRGdWxsWWVhcigpICsgXCItXCIgKyAobm93LmdldE1vbnRoKCkgKyAxKSArIFwiLVwiICsgbm93LmdldERhdGUoKSk7XG4gICAgfVxuXG4gICAgb25EcmF3ZXJCdXR0b25UYXAoKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHNpZGVEcmF3ZXIgPSA8UmFkU2lkZURyYXdlcj5hcHAuZ2V0Um9vdFZpZXcoKTtcbiAgICAgICAgc2lkZURyYXdlci5zaG93RHJhd2VyKCk7XG4gICAgfVxufVxuIl19