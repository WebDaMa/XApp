"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var nativescript_angular_1 = require("nativescript-angular");
var page_1 = require("tns-core-modules/ui/page");
var settings_1 = require("~/settings/settings");
var agency_service_1 = require("~/shared/services/agency.service");
var customer_service_1 = require("~/shared/services/customer.service");
var LodgingComponent = /** @class */ (function () {
    function LodgingComponent(customerService, agencyService, routerExtensions, page, activeRoute) {
        this.customerService = customerService;
        this.agencyService = agencyService;
        this.routerExtensions = routerExtensions;
        this.page = page;
        this.activeRoute = activeRoute;
        this.selectedIndex = 0;
        this.agencies = [];
        this.agency = {
            id: "",
            name: ""
        };
        this.agenciesItems = {};
        this.hasAgencies = false;
        this.lodging = {
            date: "",
            customers: []
        };
        this.lastTimer = { id: null, value: -1 };
    }
    LodgingComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.getAgencies();
        this.page.backgroundSpanUnderStatusBar = true;
        this.page.on("loaded", function (args) {
            if (_this.page.android) {
                _this.page.android.setFitsSystemWindows(true);
            }
        });
    };
    LodgingComponent.prototype.getAgencies = function () {
        var _this = this;
        var date = settings_1.Settings.getDate();
        var locationId = settings_1.Settings.getLocation();
        this.isBusy = true;
        this.agencyService.getAllAgenciesForWeekAndLocationAction(date, locationId)
            .subscribe(function (result) {
            _this.locations = result;
            if (_this.agencies.length > 0) {
                _this.locatonsItems = {
                    items: _this.agencies,
                    length: _this.agencies.length,
                    getItem: function (index) {
                        var item = _this.agencies[index];
                        return item.name;
                    }
                };
                _this.hasLocations = true;
                _this.location = _this.agencies[0];
                console.log("found me some agencies");
            }
            _this.isBusy = false;
            _this.getCustomersLodging();
        }, function (error) {
            console.dir(error);
            _this.hasLocations = false;
            _this.isBusy = false;
            /*TODO: handle errors*/
        });
    };
    LodgingComponent.prototype.dfPropertyLodgingCommitted = function (args) {
        var _this = this;
        var dataForm = args.object;
        var lodgingCustomer = JSON.parse(dataForm.editedObject);
        this.isBusy = true;
        this.customerService.putLodgingLayoutCustomerAction(lodgingCustomer)
            .subscribe(function () {
            console.log("Updated customer");
            _this.isBusy = false;
        }, function (error) {
            console.dir(error);
            _this.isBusy = false;
            /*TODO: handle errors*/
        });
    };
    LodgingComponent.prototype.getCustomersLodging = function () {
        var _this = this;
        this.isBusy = true;
        var date = settings_1.Settings.getDate();
        var locationId = settings_1.Settings.getLocation();
        if ((typeof this.agency !== "undefined" &&
            this.agency !== null ? this.agency.id : void 0) != null) {
            this.customerService.getAllByAgencyForLodgingAndLocationAndPeriodAction(this.agency.id, locationId, date)
                .subscribe(function (result) {
                _this.lodging = result;
                _this.isBusy = false;
            }, function (error) {
                console.dir(error);
                /*TODO: handle errors*/
                _this.isBusy = false;
            });
        }
    };
    LodgingComponent.prototype.selectedIndexChangeDebouncer = function (args) {
        var _this = this;
        var picker = args.object;
        // If we are the same index as the last time, or the next time; we skip doing anything.
        if (picker.selectedIndex === this.lastTimer.value) {
            return;
        }
        // Grab our current value...
        this.lastTimer.value = picker.selectedIndex;
        // If the timer is already running, clear it...
        if (this.lastTimer.id != null) {
            clearTimeout(this.lastTimer.id);
        }
        // Start a new timer  (runs in 1/4 of a second)
        this.lastTimer.id = setTimeout(function () {
            _this.lastTimer.id = null;
            _this.selectedIndexAgencyChanged(args);
        }, 350);
    };
    LodgingComponent.prototype.selectedIndexAgencyChanged = function (args) {
        var picker = args.object;
        if (this.agencies.length > 0) {
            this.agency = this.agencies[picker.selectedIndex];
            this.getCustomersLodging();
        }
    };
    LodgingComponent.prototype.goBack = function () {
        this.routerExtensions.navigate(["/tabs/default"], {
            transition: {
                name: "fade"
            }
        });
    };
    LodgingComponent = __decorate([
        core_1.Component({
            selector: "Lodging",
            moduleId: module.id,
            providers: [customer_service_1.CustomerService, agency_service_1.AgencyService],
            templateUrl: "./lodging.component.html"
        }),
        __metadata("design:paramtypes", [customer_service_1.CustomerService, agency_service_1.AgencyService,
            nativescript_angular_1.RouterExtensions, page_1.Page, router_1.ActivatedRoute])
    ], LodgingComponent);
    return LodgingComponent;
}());
exports.LodgingComponent = LodgingComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9kZ2luZy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJsb2RnaW5nLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUE2RDtBQUM3RCwwQ0FBaUQ7QUFDakQsNkRBQXdEO0FBR3hELGlEQUFnRDtBQUNoRCxnREFBK0M7QUFJL0MsbUVBQWlFO0FBQ2pFLHVFQUFxRTtBQVFyRTtJQW9CSSwwQkFBb0IsZUFBZ0MsRUFBVSxhQUE0QixFQUN0RSxnQkFBa0MsRUFBVSxJQUFVLEVBQVUsV0FBMkI7UUFEM0Ysb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQVUsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFDdEUscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUFVLFNBQUksR0FBSixJQUFJLENBQU07UUFBVSxnQkFBVyxHQUFYLFdBQVcsQ0FBZ0I7UUFwQi9HLGtCQUFhLEdBQVcsQ0FBQyxDQUFDO1FBSTFCLGFBQVEsR0FBa0IsRUFBRSxDQUFDO1FBQzdCLFdBQU0sR0FBVztZQUNiLEVBQUUsRUFBRSxFQUFFO1lBQ04sSUFBSSxFQUFFLEVBQUU7U0FDWCxDQUFDO1FBQ0Ysa0JBQWEsR0FBVyxFQUFFLENBQUM7UUFDM0IsZ0JBQVcsR0FBWSxLQUFLLENBQUM7UUFFN0IsWUFBTyxHQUFZO1lBQ2YsSUFBSSxFQUFFLEVBQUU7WUFDUixTQUFTLEVBQUUsRUFBRTtTQUNoQixDQUFDO1FBRUYsY0FBUyxHQUFHLEVBQUMsRUFBRSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLEVBQUMsQ0FBQztJQUlsQyxDQUFDO0lBRUQsbUNBQVEsR0FBUjtRQUFBLGlCQVFDO1FBUEcsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyxJQUFJLENBQUMsNEJBQTRCLEdBQUcsSUFBSSxDQUFDO1FBQzlDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxVQUFDLElBQUk7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LElBQUksQ0FBQztZQUN6QixLQUFJLENBQUMsMEJBQTBCLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDMUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ1osQ0FBQztJQUVELHFEQUEwQixHQUExQixVQUEyQixJQUFJO1FBQzNCLElBQU0sTUFBTSxHQUFlLElBQUksQ0FBQyxNQUFNLENBQUM7UUFFdkMsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDMUIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUNsRCxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztTQUM5QjtJQUVMLENBQUM7SUFFRCxpQ0FBTSxHQUFOO1FBQ0ksSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxFQUFFO1lBQzlDLFVBQVUsRUFBRTtnQkFDUixJQUFJLEVBQUUsTUFBTTthQUNmO1NBQ0osQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQWxKUSxnQkFBZ0I7UUFONUIsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxTQUFTO1lBQ25CLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixTQUFTLEVBQUUsQ0FBQyxrQ0FBZSxFQUFFLDhCQUFhLENBQUM7WUFDM0MsV0FBVyxFQUFFLDBCQUEwQjtTQUMxQyxDQUFDO3lDQXFCdUMsa0NBQWUsRUFBeUIsOEJBQWE7WUFDcEQsdUNBQWdCLEVBQWdCLFdBQUksRUFBdUIsdUJBQWM7T0FyQnRHLGdCQUFnQixDQW1KNUI7SUFBRCx1QkFBQztDQUFBLEFBbkpELElBbUpDO0FBbkpZLDRDQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBWaWV3Q2hpbGQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyXCI7XG5pbXBvcnQgeyBSYWREYXRhRm9ybSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtdWktZGF0YWZvcm1cIjtcbmltcG9ydCB7IExpc3RQaWNrZXIgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9saXN0LXBpY2tlclwiO1xuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3BhZ2VcIjtcbmltcG9ydCB7IFNldHRpbmdzIH0gZnJvbSBcIn4vc2V0dGluZ3Mvc2V0dGluZ3NcIjtcbmltcG9ydCB7IEFnZW5jeSB9IGZyb20gXCJ+L3NoYXJlZC9tb2RlbHMvYWdlbmN5Lm1vZGVsXCI7XG5pbXBvcnQgeyBMb2RnaW5nIH0gZnJvbSBcIn4vc2hhcmVkL21vZGVscy9sb2RnaW5nLm1vZGVsXCI7XG5pbXBvcnQgeyBMb2RnaW5nQ3VzdG9tZXIgfSBmcm9tIFwifi9zaGFyZWQvbW9kZWxzL2xvZGdpbmdDdXN0b21lci5tb2RlbFwiO1xuaW1wb3J0IHsgQWdlbmN5U2VydmljZSB9IGZyb20gXCJ+L3NoYXJlZC9zZXJ2aWNlcy9hZ2VuY3kuc2VydmljZVwiO1xuaW1wb3J0IHsgQ3VzdG9tZXJTZXJ2aWNlIH0gZnJvbSBcIn4vc2hhcmVkL3NlcnZpY2VzL2N1c3RvbWVyLnNlcnZpY2VcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwiTG9kZ2luZ1wiLFxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgcHJvdmlkZXJzOiBbQ3VzdG9tZXJTZXJ2aWNlLCBBZ2VuY3lTZXJ2aWNlXSxcbiAgICB0ZW1wbGF0ZVVybDogXCIuL2xvZGdpbmcuY29tcG9uZW50Lmh0bWxcIlxufSlcbmV4cG9ydCBjbGFzcyBMb2RnaW5nQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBzZWxlY3RlZEluZGV4OiBudW1iZXIgPSAwO1xuXG4gICAgaXNCdXN5OiBib29sZWFuO1xuXG4gICAgYWdlbmNpZXM6IEFycmF5PEFnZW5jeT4gPSBbXTtcbiAgICBhZ2VuY3k6IEFnZW5jeSA9IHtcbiAgICAgICAgaWQ6IFwiXCIsXG4gICAgICAgIG5hbWU6IFwiXCJcbiAgICB9O1xuICAgIGFnZW5jaWVzSXRlbXM6IG9iamVjdCA9IHt9O1xuICAgIGhhc0FnZW5jaWVzOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBsb2RnaW5nOiBMb2RnaW5nID0ge1xuICAgICAgICBkYXRlOiBcIlwiLFxuICAgICAgICBjdXN0b21lcnM6IFtdXG4gICAgfTtcblxuICAgIGxhc3RUaW1lciA9IHtpZDogbnVsbCwgdmFsdWU6IC0xfTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgY3VzdG9tZXJTZXJ2aWNlOiBDdXN0b21lclNlcnZpY2UsIHByaXZhdGUgYWdlbmN5U2VydmljZTogQWdlbmN5U2VydmljZSxcbiAgICAgICAgICAgICAgICBwcml2YXRlIHJvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMsIHByaXZhdGUgcGFnZTogUGFnZSwgcHJpdmF0ZSBhY3RpdmVSb3V0ZTogQWN0aXZhdGVkUm91dGUpIHtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5nZXRBZ2VuY2llcygpO1xuICAgICAgICB0aGlzLnBhZ2UuYmFja2dyb3VuZFNwYW5VbmRlclN0YXR1c0JhciA9IHRydWU7XG4gICAgICAgIHRoaXMucGFnZS5vbihcImxvYWRlZFwiLCAoYXJncykgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMucGFnZS5hbmRyb2lkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wYWdlLmFuZHJvaWQuc2V0Rml0c1N5c3RlbVdpbmRvd3ModHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGdldEFnZW5jaWVzKCk6IHZvaWQge1xuICAgICAgICBjb25zdCBkYXRlID0gU2V0dGluZ3MuZ2V0RGF0ZSgpO1xuICAgICAgICBjb25zdCBsb2NhdGlvbklkID0gU2V0dGluZ3MuZ2V0TG9jYXRpb24oKTtcblxuICAgICAgICB0aGlzLmlzQnVzeSA9IHRydWU7XG5cbiAgICAgICAgdGhpcy5hZ2VuY3lTZXJ2aWNlLmdldEFsbEFnZW5jaWVzRm9yV2Vla0FuZExvY2F0aW9uQWN0aW9uKGRhdGUsIGxvY2F0aW9uSWQpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgIChyZXN1bHQ6IEFycmF5PEFnZW5jeT4pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZ2VuY2llcyA9IHJlc3VsdDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuYWdlbmNpZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hZ2VuY2llc0l0ZW1zID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1zOiB0aGlzLmFnZW5jaWVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlbmd0aDogdGhpcy5hZ2VuY2llcy5sZW5ndGgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2V0SXRlbTogKGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSB0aGlzLmFnZW5jaWVzW2luZGV4XTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXRlbS5uYW1lO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhhc0FnZW5jaWVzID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hZ2VuY3kgPSB0aGlzLmFnZW5jaWVzWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJmb3VuZCBtZSBzb21lIGFnZW5jaWVzXCIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNCdXN5ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0Q3VzdG9tZXJzTG9kZ2luZygpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZGlyKGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYXNBZ2VuY2llcyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzQnVzeSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAvKlRPRE86IGhhbmRsZSBlcnJvcnMqL1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7XG4gICAgfVxuXG4gICAgZGZQcm9wZXJ0eUxvZGdpbmdDb21taXR0ZWQoYXJncykge1xuICAgICAgICBjb25zdCBkYXRhRm9ybSA9IDxSYWREYXRhRm9ybT5hcmdzLm9iamVjdDtcbiAgICAgICAgY29uc3QgbG9kZ2luZ0N1c3RvbWVyOiBMb2RnaW5nQ3VzdG9tZXIgPSA8TG9kZ2luZ0N1c3RvbWVyPiBKU09OLnBhcnNlKGRhdGFGb3JtLmVkaXRlZE9iamVjdCk7XG5cbiAgICAgICAgdGhpcy5pc0J1c3kgPSB0cnVlO1xuICAgICAgICB0aGlzLmN1c3RvbWVyU2VydmljZS5wdXRMb2RnaW5nTGF5b3V0Q3VzdG9tZXJBY3Rpb24obG9kZ2luZ0N1c3RvbWVyKVxuICAgICAgICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVXBkYXRlZCBjdXN0b21lclwiKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc0J1c3kgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmRpcihlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNCdXN5ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIC8qVE9ETzogaGFuZGxlIGVycm9ycyovXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcbiAgICB9XG5cbiAgICBnZXRDdXN0b21lcnNMb2RnaW5nKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmlzQnVzeSA9IHRydWU7XG4gICAgICAgIGNvbnN0IGRhdGUgPSBTZXR0aW5ncy5nZXREYXRlKCk7XG4gICAgICAgIGNvbnN0IGxvY2F0aW9uSWQgPSBTZXR0aW5ncy5nZXRMb2NhdGlvbigpO1xuXG4gICAgICAgIGlmICgodHlwZW9mIHRoaXMuYWdlbmN5ICE9PSBcInVuZGVmaW5lZFwiICYmXG4gICAgICAgIHRoaXMuYWdlbmN5ICE9PSBudWxsID8gdGhpcy5hZ2VuY3kuaWQgOiB2b2lkIDApICE9IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuY3VzdG9tZXJTZXJ2aWNlLmdldEFsbEJ5QWdlbmN5Rm9yTG9kZ2luZ0FuZExvY2F0aW9uQW5kUGVyaW9kQWN0aW9uKHRoaXMuYWdlbmN5LmlkLCBsb2NhdGlvbklkLCBkYXRlKVxuICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgIChyZXN1bHQ6IExvZGdpbmcpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9kZ2luZyA9IHJlc3VsdDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaXNCdXN5ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5kaXIoZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLypUT0RPOiBoYW5kbGUgZXJyb3JzKi9cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaXNCdXN5ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2VsZWN0ZWRJbmRleENoYW5nZURlYm91bmNlcihhcmdzKSB7XG4gICAgICAgIGNvbnN0IHBpY2tlciA9IDxMaXN0UGlja2VyPmFyZ3Mub2JqZWN0O1xuICAgICAgICAvLyBJZiB3ZSBhcmUgdGhlIHNhbWUgaW5kZXggYXMgdGhlIGxhc3QgdGltZSwgb3IgdGhlIG5leHQgdGltZTsgd2Ugc2tpcCBkb2luZyBhbnl0aGluZy5cbiAgICAgICAgaWYgKHBpY2tlci5zZWxlY3RlZEluZGV4ID09PSB0aGlzLmxhc3RUaW1lci52YWx1ZSkgeyByZXR1cm47IH1cblxuICAgICAgICAvLyBHcmFiIG91ciBjdXJyZW50IHZhbHVlLi4uXG4gICAgICAgIHRoaXMubGFzdFRpbWVyLnZhbHVlID0gcGlja2VyLnNlbGVjdGVkSW5kZXg7XG5cbiAgICAgICAgLy8gSWYgdGhlIHRpbWVyIGlzIGFscmVhZHkgcnVubmluZywgY2xlYXIgaXQuLi5cbiAgICAgICAgaWYgKHRoaXMubGFzdFRpbWVyLmlkICE9IG51bGwpIHsgY2xlYXJUaW1lb3V0KHRoaXMubGFzdFRpbWVyLmlkKTsgfVxuXG4gICAgICAgIC8vIFN0YXJ0IGEgbmV3IHRpbWVyICAocnVucyBpbiAxLzQgb2YgYSBzZWNvbmQpXG4gICAgICAgIHRoaXMubGFzdFRpbWVyLmlkID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmxhc3RUaW1lci5pZCA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkSW5kZXhBZ2VuY3lDaGFuZ2VkKGFyZ3MpO1xuICAgICAgICB9LCAzNTApO1xuICAgIH1cblxuICAgIHNlbGVjdGVkSW5kZXhBZ2VuY3lDaGFuZ2VkKGFyZ3MpIHtcbiAgICAgICAgY29uc3QgcGlja2VyID0gPExpc3RQaWNrZXI+YXJncy5vYmplY3Q7XG5cbiAgICAgICAgaWYgKHRoaXMuYWdlbmNpZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdGhpcy5hZ2VuY3kgPSB0aGlzLmFnZW5jaWVzW3BpY2tlci5zZWxlY3RlZEluZGV4XTtcbiAgICAgICAgICAgIHRoaXMuZ2V0Q3VzdG9tZXJzTG9kZ2luZygpO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBnb0JhY2soKSB7XG4gICAgICAgIHRoaXMucm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvdGFicy9kZWZhdWx0XCJdLCB7XG4gICAgICAgICAgICB0cmFuc2l0aW9uOiB7XG4gICAgICAgICAgICAgICAgbmFtZTogXCJmYWRlXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxufVxuIl19