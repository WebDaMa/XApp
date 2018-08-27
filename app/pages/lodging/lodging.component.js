"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var nativescript_angular_1 = require("nativescript-angular");
var settings_1 = require("~/settings/settings");
var agency_service_1 = require("~/shared/services/agency.service");
var customer_service_1 = require("~/shared/services/customer.service");
var LodgingComponent = /** @class */ (function () {
    function LodgingComponent(customerService, agencyService, routerExtensions) {
        this.customerService = customerService;
        this.agencyService = agencyService;
        this.routerExtensions = routerExtensions;
        this.selectedIndex = 0;
        this.isBusy = true;
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
    }
    LodgingComponent.prototype.ngOnInit = function () {
        this.getAgencies();
    };
    LodgingComponent.prototype.getAgencies = function () {
        var _this = this;
        var date = settings_1.Settings.getDate();
        var locationId = settings_1.Settings.getLocation();
        this.agencyService.getAllAgenciesForWeekAndLocationAction(date, locationId)
            .subscribe(function (result) {
            _this.agencies = result;
            _this.isBusy = false;
            if (_this.agencies.length > 0) {
                _this.agenciesItems = {
                    items: _this.agencies,
                    length: _this.agencies.length,
                    getItem: function (index) {
                        var item = _this.agencies[index];
                        return item.name;
                    }
                };
                _this.hasAgencies = true;
                _this.agency = _this.agencies[0];
                console.log("found me some agencies");
            }
            _this.getCustomersLodging();
        }, function (error) {
            console.dir(error);
            _this.hasAgencies = false;
            /*TODO: handle errors*/
        });
    };
    LodgingComponent.prototype.dfPropertyLodgingCommitted = function (args) {
        var dataForm = args.object;
        var lodgingCustomer = JSON.parse(dataForm.editedObject);
        console.log(lodgingCustomer);
        this.customerService.putLodgingLayoutCustomerAction(lodgingCustomer)
            .subscribe(function () {
            console.log("Updated customer");
        }, function (error) {
            console.dir(error);
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
    LodgingComponent.prototype.selectedIndexAgencyChanged = function (args) {
        var picker = args.object;
        if (this.agencies.length > 0) {
            this.agency = this.agencies[picker.selectedIndex];
            this.getCustomersLodging();
        }
    };
    LodgingComponent.prototype.goBack = function () {
        this.routerExtensions.backToPreviousPage();
    };
    LodgingComponent = __decorate([
        core_1.Component({
            selector: "Lodging",
            moduleId: module.id,
            providers: [customer_service_1.CustomerService, agency_service_1.AgencyService],
            templateUrl: "./lodging.component.html"
        }),
        __metadata("design:paramtypes", [customer_service_1.CustomerService, agency_service_1.AgencyService,
            nativescript_angular_1.RouterExtensions])
    ], LodgingComponent);
    return LodgingComponent;
}());
exports.LodgingComponent = LodgingComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9kZ2luZy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJsb2RnaW5nLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUE2RDtBQUM3RCw2REFBd0Q7QUFHeEQsZ0RBQStDO0FBSS9DLG1FQUFpRTtBQUNqRSx1RUFBcUU7QUFRckU7SUFrQkksMEJBQW9CLGVBQWdDLEVBQVUsYUFBNEIsRUFDdEUsZ0JBQWtDO1FBRGxDLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUFVLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQ3RFLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFsQnRELGtCQUFhLEdBQVcsQ0FBQyxDQUFDO1FBRTFCLFdBQU0sR0FBWSxJQUFJLENBQUM7UUFFdkIsYUFBUSxHQUFrQixFQUFFLENBQUM7UUFDN0IsV0FBTSxHQUFXO1lBQ2IsRUFBRSxFQUFFLEVBQUU7WUFDTixJQUFJLEVBQUUsRUFBRTtTQUNYLENBQUM7UUFDRixrQkFBYSxHQUFXLEVBQUUsQ0FBQztRQUMzQixnQkFBVyxHQUFZLEtBQUssQ0FBQztRQUU3QixZQUFPLEdBQVk7WUFDZixJQUFJLEVBQUUsRUFBRTtZQUNSLFNBQVMsRUFBRSxFQUFFO1NBQ2hCLENBQUM7SUFJRixDQUFDO0lBRUQsbUNBQVEsR0FBUjtRQUNJLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN2QixDQUFDO0lBRUQsc0NBQVcsR0FBWDtRQUFBLGlCQWdDQztRQS9CRyxJQUFNLElBQUksR0FBRyxtQkFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ2hDLElBQU0sVUFBVSxHQUFHLG1CQUFRLENBQUMsV0FBVyxFQUFFLENBQUM7UUFFMUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxzQ0FBc0MsQ0FBQyxJQUFJLEVBQUUsVUFBVSxDQUFDO2FBQ3RFLFNBQVMsQ0FDTixVQUFDLE1BQXFCO1lBQ2xCLEtBQUksQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDO1lBQ3ZC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LE1BQU0sR0FBZSxJQUFJLENBQUMsTUFBTSxDQUFDO1FBRXZDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDM0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUNsRCxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztRQUMvQixDQUFDO0lBRUwsQ0FBQztJQUVELGlDQUFNLEdBQU47UUFDSSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztJQUMvQyxDQUFDO0lBL0dRLGdCQUFnQjtRQU41QixnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLFNBQVM7WUFDbkIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFNBQVMsRUFBRSxDQUFDLGtDQUFlLEVBQUUsOEJBQWEsQ0FBQztZQUMzQyxXQUFXLEVBQUUsMEJBQTBCO1NBQzFDLENBQUM7eUNBbUJ1QyxrQ0FBZSxFQUF5Qiw4QkFBYTtZQUNwRCx1Q0FBZ0I7T0FuQjdDLGdCQUFnQixDQWdINUI7SUFBRCx1QkFBQztDQUFBLEFBaEhELElBZ0hDO0FBaEhZLDRDQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBWaWV3Q2hpbGQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhclwiO1xuaW1wb3J0IHsgUmFkRGF0YUZvcm0gfSBmcm9tIFwibmF0aXZlc2NyaXB0LXVpLWRhdGFmb3JtXCI7XG5pbXBvcnQgeyBMaXN0UGlja2VyIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvbGlzdC1waWNrZXJcIjtcbmltcG9ydCB7IFNldHRpbmdzIH0gZnJvbSBcIn4vc2V0dGluZ3Mvc2V0dGluZ3NcIjtcbmltcG9ydCB7IEFnZW5jeSB9IGZyb20gXCJ+L3NoYXJlZC9tb2RlbHMvYWdlbmN5Lm1vZGVsXCI7XG5pbXBvcnQgeyBMb2RnaW5nIH0gZnJvbSBcIn4vc2hhcmVkL21vZGVscy9sb2RnaW5nLm1vZGVsXCI7XG5pbXBvcnQgeyBMb2RnaW5nQ3VzdG9tZXIgfSBmcm9tIFwifi9zaGFyZWQvbW9kZWxzL2xvZGdpbmdDdXN0b21lci5tb2RlbFwiO1xuaW1wb3J0IHsgQWdlbmN5U2VydmljZSB9IGZyb20gXCJ+L3NoYXJlZC9zZXJ2aWNlcy9hZ2VuY3kuc2VydmljZVwiO1xuaW1wb3J0IHsgQ3VzdG9tZXJTZXJ2aWNlIH0gZnJvbSBcIn4vc2hhcmVkL3NlcnZpY2VzL2N1c3RvbWVyLnNlcnZpY2VcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwiTG9kZ2luZ1wiLFxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgcHJvdmlkZXJzOiBbQ3VzdG9tZXJTZXJ2aWNlLCBBZ2VuY3lTZXJ2aWNlXSxcbiAgICB0ZW1wbGF0ZVVybDogXCIuL2xvZGdpbmcuY29tcG9uZW50Lmh0bWxcIlxufSlcbmV4cG9ydCBjbGFzcyBMb2RnaW5nQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBzZWxlY3RlZEluZGV4OiBudW1iZXIgPSAwO1xuXG4gICAgaXNCdXN5OiBib29sZWFuID0gdHJ1ZTtcblxuICAgIGFnZW5jaWVzOiBBcnJheTxBZ2VuY3k+ID0gW107XG4gICAgYWdlbmN5OiBBZ2VuY3kgPSB7XG4gICAgICAgIGlkOiBcIlwiLFxuICAgICAgICBuYW1lOiBcIlwiXG4gICAgfTtcbiAgICBhZ2VuY2llc0l0ZW1zOiBvYmplY3QgPSB7fTtcbiAgICBoYXNBZ2VuY2llczogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgbG9kZ2luZzogTG9kZ2luZyA9IHtcbiAgICAgICAgZGF0ZTogXCJcIixcbiAgICAgICAgY3VzdG9tZXJzOiBbXVxuICAgIH07XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGN1c3RvbWVyU2VydmljZTogQ3VzdG9tZXJTZXJ2aWNlLCBwcml2YXRlIGFnZW5jeVNlcnZpY2U6IEFnZW5jeVNlcnZpY2UsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSByb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zKSB7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZ2V0QWdlbmNpZXMoKTtcbiAgICB9XG5cbiAgICBnZXRBZ2VuY2llcygpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgZGF0ZSA9IFNldHRpbmdzLmdldERhdGUoKTtcbiAgICAgICAgY29uc3QgbG9jYXRpb25JZCA9IFNldHRpbmdzLmdldExvY2F0aW9uKCk7XG5cbiAgICAgICAgdGhpcy5hZ2VuY3lTZXJ2aWNlLmdldEFsbEFnZW5jaWVzRm9yV2Vla0FuZExvY2F0aW9uQWN0aW9uKGRhdGUsIGxvY2F0aW9uSWQpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgIChyZXN1bHQ6IEFycmF5PEFnZW5jeT4pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZ2VuY2llcyA9IHJlc3VsdDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc0J1c3kgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuYWdlbmNpZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hZ2VuY2llc0l0ZW1zID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1zOiB0aGlzLmFnZW5jaWVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlbmd0aDogdGhpcy5hZ2VuY2llcy5sZW5ndGgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2V0SXRlbTogKGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSB0aGlzLmFnZW5jaWVzW2luZGV4XTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXRlbS5uYW1lO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGFzQWdlbmNpZXMgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hZ2VuY3kgPSB0aGlzLmFnZW5jaWVzWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJmb3VuZCBtZSBzb21lIGFnZW5jaWVzXCIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0Q3VzdG9tZXJzTG9kZ2luZygpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZGlyKGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYXNBZ2VuY2llcyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAvKlRPRE86IGhhbmRsZSBlcnJvcnMqL1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7XG4gICAgfVxuXG4gICAgZGZQcm9wZXJ0eUxvZGdpbmdDb21taXR0ZWQoYXJncykge1xuICAgICAgICBjb25zdCBkYXRhRm9ybSA9IDxSYWREYXRhRm9ybT5hcmdzLm9iamVjdDtcbiAgICAgICAgY29uc3QgbG9kZ2luZ0N1c3RvbWVyOiBMb2RnaW5nQ3VzdG9tZXIgPSA8TG9kZ2luZ0N1c3RvbWVyPiBKU09OLnBhcnNlKGRhdGFGb3JtLmVkaXRlZE9iamVjdCk7XG4gICAgICAgIGNvbnNvbGUubG9nKGxvZGdpbmdDdXN0b21lcik7XG5cbiAgICAgICAgdGhpcy5jdXN0b21lclNlcnZpY2UucHV0TG9kZ2luZ0xheW91dEN1c3RvbWVyQWN0aW9uKGxvZGdpbmdDdXN0b21lcilcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlVwZGF0ZWQgY3VzdG9tZXJcIik7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5kaXIoZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICAvKlRPRE86IGhhbmRsZSBlcnJvcnMqL1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7XG4gICAgfVxuXG4gICAgZ2V0Q3VzdG9tZXJzTG9kZ2luZygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5pc0J1c3kgPSB0cnVlO1xuICAgICAgICBjb25zdCBkYXRlID0gU2V0dGluZ3MuZ2V0RGF0ZSgpO1xuICAgICAgICBjb25zdCBsb2NhdGlvbklkID0gU2V0dGluZ3MuZ2V0TG9jYXRpb24oKTtcblxuICAgICAgICBpZiAoKHR5cGVvZiB0aGlzLmFnZW5jeSAhPT0gXCJ1bmRlZmluZWRcIiAmJlxuICAgICAgICB0aGlzLmFnZW5jeSAhPT0gbnVsbCA/IHRoaXMuYWdlbmN5LmlkIDogdm9pZCAwKSAhPSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLmN1c3RvbWVyU2VydmljZS5nZXRBbGxCeUFnZW5jeUZvckxvZGdpbmdBbmRMb2NhdGlvbkFuZFBlcmlvZEFjdGlvbih0aGlzLmFnZW5jeS5pZCwgbG9jYXRpb25JZCwgZGF0ZSlcbiAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICAocmVzdWx0OiBMb2RnaW5nKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZGdpbmcgPSByZXN1bHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmlzQnVzeSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZGlyKGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8qVE9ETzogaGFuZGxlIGVycm9ycyovXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmlzQnVzeSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNlbGVjdGVkSW5kZXhBZ2VuY3lDaGFuZ2VkKGFyZ3MpIHtcbiAgICAgICAgY29uc3QgcGlja2VyID0gPExpc3RQaWNrZXI+YXJncy5vYmplY3Q7XG5cbiAgICAgICAgaWYgKHRoaXMuYWdlbmNpZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdGhpcy5hZ2VuY3kgPSB0aGlzLmFnZW5jaWVzW3BpY2tlci5zZWxlY3RlZEluZGV4XTtcbiAgICAgICAgICAgIHRoaXMuZ2V0Q3VzdG9tZXJzTG9kZ2luZygpO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBnb0JhY2soKSB7XG4gICAgICAgIHRoaXMucm91dGVyRXh0ZW5zaW9ucy5iYWNrVG9QcmV2aW91c1BhZ2UoKTtcbiAgICB9XG59XG4iXX0=