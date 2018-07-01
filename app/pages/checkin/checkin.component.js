"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var page_1 = require("tns-core-modules/ui/page");
var segmented_bar_1 = require("tns-core-modules/ui/segmented-bar");
var settings_1 = require("~/settings/settings");
var agency_service_1 = require("~/shared/services/agency.service");
var customer_service_1 = require("~/shared/services/customer.service");
var CheckinComponent = /** @class */ (function () {
    function CheckinComponent(customerService, agencyService, page) {
        this.customerService = customerService;
        this.agencyService = agencyService;
        this.page = page;
        this.BUS_HEEN = "Bus Heen";
        this.BUS_TERUG = "Bus Terug";
        this.VERBLIJF = "Verblijf";
        this.VOLPENSION = "Volpension";
        this.isBusy = true;
        this.items = [];
        this.selectedIndex = 0;
        this.titles = [this.BUS_HEEN, this.BUS_TERUG, this.VERBLIJF, this.VOLPENSION];
        this.checkinBusGo = {
            total: "0",
            places: [],
            date: ""
        };
        this.checkinBusBack = {
            total: "0",
            places: [],
            date: ""
        };
        this.volpension = {
            total: "0",
            allInTypes: [],
            date: ""
        };
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
    CheckinComponent.prototype.ngOnInit = function () {
        var _this = this;
        for (var _i = 0, _a = this.titles; _i < _a.length; _i++) {
            var title = _a[_i];
            var segmentedBarItem = new segmented_bar_1.SegmentedBarItem();
            segmentedBarItem.title = title;
            this.items.push(segmentedBarItem);
        }
        this.selectedIndex = 0;
        this.page.on(page_1.Page.navigatingToEvent, function () {
            _this.loadData();
        });
    };
    CheckinComponent.prototype.onSelectedIndexChange = function (args) {
        var segmentedBar = args.object;
        this.selectedIndex = segmentedBar.selectedIndex;
        this.loadData();
    };
    CheckinComponent.prototype.getCustomersBusGo = function () {
        var _this = this;
        var date = settings_1.Settings.getDate();
        this.customerService.getBusGoCustomersByWeek(date)
            .subscribe(function (result) {
            _this.checkinBusGo = result;
            console.log("got me some bus customers");
            _this.isBusy = false;
        }, function (error) {
            console.dir(error);
            /*TODO: handle errors*/
        });
    };
    CheckinComponent.prototype.getCustomersVolpension = function () {
        var _this = this;
        var date = settings_1.Settings.getDate();
        var locationId = settings_1.Settings.getLocation();
        this.customerService.getAllByAllInTypeForLocationAndPeriodAction(locationId, date)
            .subscribe(function (result) {
            _this.volpension = result;
            console.log("got me some volpension customers");
            _this.isBusy = false;
        }, function (error) {
            console.dir(error);
            /*TODO: handle errors*/
        });
    };
    CheckinComponent.prototype.getAgencies = function () {
        var _this = this;
        var date = settings_1.Settings.getDate();
        var locationId = settings_1.Settings.getLocation();
        this.agencyService.getAllAgenciesForWeekAndLocationAction(date, locationId)
            .subscribe(function (result) {
            _this.agencies = result;
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
    CheckinComponent.prototype.getCustomersBusBack = function () {
        var _this = this;
        var date = settings_1.Settings.getDate();
        this.customerService.getBusBackCustomersByWeek(date)
            .subscribe(function (result) {
            _this.checkinBusBack = result;
            _this.isBusy = false;
        }, function (error) {
            console.dir(error);
            /*TODO: handle errors*/
        });
    };
    CheckinComponent.prototype.dfPropertyGoCommitted = function (args) {
        var _this = this;
        var dataForm = args.object;
        var busCostumer = JSON.parse(dataForm.editedObject);
        this.customerService.putBusGoCustomerAction(busCostumer)
            .subscribe(function (res) {
            console.log("Updated customer");
            _this.isBusy = false;
        }, function (error) {
            console.dir(error);
            /*TODO: handle errors*/
        });
    };
    CheckinComponent.prototype.dfPropertyBackCommitted = function (args) {
        var dataForm = args.object;
        var busCostumer = JSON.parse(dataForm.editedObject);
        this.customerService.putBusBackCustomerAction(busCostumer)
            .subscribe(function () {
            console.log("Updated customer");
        }, function (error) {
            console.dir(error);
            /*TODO: handle errors*/
        });
    };
    CheckinComponent.prototype.dfPropertyLodgingCommitted = function (args) {
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
    CheckinComponent.prototype.getCustomersLodging = function () {
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
            });
        }
    };
    CheckinComponent.prototype.selectedIndexAgencyChanged = function (args) {
        var picker = args.object;
        if (this.agencies.length > 0) {
            this.agency = this.agencies[picker.selectedIndex];
            this.getCustomersLodging();
        }
    };
    CheckinComponent.prototype.loadData = function () {
        this.isBusy = true;
        switch (this.titles[this.selectedIndex]) {
            case this.BUS_HEEN:
                this.getCustomersBusGo();
                break;
            case this.BUS_TERUG:
                this.getCustomersBusBack();
                break;
            case this.VERBLIJF:
                this.getAgencies();
                break;
            case this.VOLPENSION:
                this.getCustomersVolpension();
                break;
        }
    };
    CheckinComponent = __decorate([
        core_1.Component({
            selector: "Checkin",
            moduleId: module.id,
            providers: [customer_service_1.CustomerService, agency_service_1.AgencyService],
            templateUrl: "./checkin.component.html"
        }),
        __metadata("design:paramtypes", [customer_service_1.CustomerService, agency_service_1.AgencyService,
            page_1.Page])
    ], CheckinComponent);
    return CheckinComponent;
}());
exports.CheckinComponent = CheckinComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tpbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjaGVja2luLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFrRDtBQUdsRCxpREFBZ0Q7QUFDaEQsbUVBQW1GO0FBQ25GLGdEQUErQztBQU8vQyxtRUFBaUU7QUFDakUsdUVBQXFFO0FBUXJFO0lBMkNJLDBCQUFvQixlQUFnQyxFQUFVLGFBQTRCLEVBQ3RFLElBQVU7UUFEVixvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFBVSxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUN0RSxTQUFJLEdBQUosSUFBSSxDQUFNO1FBM0M5QixhQUFRLEdBQVcsVUFBVSxDQUFDO1FBQzlCLGNBQVMsR0FBVyxXQUFXLENBQUM7UUFDaEMsYUFBUSxHQUFXLFVBQVUsQ0FBQztRQUM5QixlQUFVLEdBQVcsWUFBWSxDQUFDO1FBRWxDLFdBQU0sR0FBWSxJQUFJLENBQUM7UUFFdkIsVUFBSyxHQUE0QixFQUFFLENBQUM7UUFDcEMsa0JBQWEsR0FBRyxDQUFDLENBQUM7UUFDbEIsV0FBTSxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBRXpFLGlCQUFZLEdBQWU7WUFDdkIsS0FBSyxFQUFFLEdBQUc7WUFDVixNQUFNLEVBQUUsRUFBRTtZQUNWLElBQUksRUFBRSxFQUFFO1NBQ1gsQ0FBQztRQUVGLG1CQUFjLEdBQWU7WUFDekIsS0FBSyxFQUFFLEdBQUc7WUFDVixNQUFNLEVBQUUsRUFBRTtZQUNWLElBQUksRUFBRSxFQUFFO1NBQ1gsQ0FBQztRQUVGLGVBQVUsR0FBZTtZQUNyQixLQUFLLEVBQUUsR0FBRztZQUNWLFVBQVUsRUFBRSxFQUFFO1lBQ2QsSUFBSSxFQUFFLEVBQUU7U0FDWCxDQUFDO1FBRUYsYUFBUSxHQUFrQixFQUFFLENBQUM7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QUU7WUFDbkIsU0FBUyxFQUFFLENBQUMsa0NBQWUsRUFBRSw4QkFBYSxDQUFDO1lBQzNDLFdBQVcsRUFBRSwwQkFBMEI7U0FDMUMsQ0FBQzt5Q0E0Q3VDLGtDQUFlLEVBQXlCLDhCQUFhO1lBQ2hFLFdBQUk7T0E1Q3JCLGdCQUFnQixDQTZQNUI7SUFBRCx1QkFBQztDQUFBLEFBN1BELElBNlBDO0FBN1BZLDRDQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IFJhZERhdGFGb3JtIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC11aS1kYXRhZm9ybVwiO1xuaW1wb3J0IHsgTGlzdFBpY2tlciB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2xpc3QtcGlja2VyXCI7XG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvcGFnZVwiO1xuaW1wb3J0IHsgU2VnbWVudGVkQmFyLCBTZWdtZW50ZWRCYXJJdGVtIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvc2VnbWVudGVkLWJhclwiO1xuaW1wb3J0IHsgU2V0dGluZ3MgfSBmcm9tIFwifi9zZXR0aW5ncy9zZXR0aW5nc1wiO1xuaW1wb3J0IHsgQWdlbmN5IH0gZnJvbSBcIn4vc2hhcmVkL21vZGVscy9hZ2VuY3kubW9kZWxcIjtcbmltcG9ydCB7IEJ1c0N1c3RvbWVyIH0gZnJvbSBcIn4vc2hhcmVkL21vZGVscy9idXNDdXN0b21lci5tb2RlbFwiO1xuaW1wb3J0IHsgQ2hlY2tpbkJ1cyB9IGZyb20gXCJ+L3NoYXJlZC9tb2RlbHMvY2hlY2tpbkJ1cy5tb2RlbFwiO1xuaW1wb3J0IHsgTG9kZ2luZyB9IGZyb20gXCJ+L3NoYXJlZC9tb2RlbHMvbG9kZ2luZy5tb2RlbFwiO1xuaW1wb3J0IHsgTG9kZ2luZ0N1c3RvbWVyIH0gZnJvbSBcIn4vc2hhcmVkL21vZGVscy9sb2RnaW5nQ3VzdG9tZXIubW9kZWxcIjtcbmltcG9ydCB7IFZvbHBlbnNpb24gfSBmcm9tIFwifi9zaGFyZWQvbW9kZWxzL3ZvbHBlbnNpb24ubW9kZWxcIjtcbmltcG9ydCB7IEFnZW5jeVNlcnZpY2UgfSBmcm9tIFwifi9zaGFyZWQvc2VydmljZXMvYWdlbmN5LnNlcnZpY2VcIjtcbmltcG9ydCB7IEN1c3RvbWVyU2VydmljZSB9IGZyb20gXCJ+L3NoYXJlZC9zZXJ2aWNlcy9jdXN0b21lci5zZXJ2aWNlXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcIkNoZWNraW5cIixcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHByb3ZpZGVyczogW0N1c3RvbWVyU2VydmljZSwgQWdlbmN5U2VydmljZV0sXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9jaGVja2luLmNvbXBvbmVudC5odG1sXCJcbn0pXG5leHBvcnQgY2xhc3MgQ2hlY2tpbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgQlVTX0hFRU46IHN0cmluZyA9IFwiQnVzIEhlZW5cIjtcbiAgICBCVVNfVEVSVUc6IHN0cmluZyA9IFwiQnVzIFRlcnVnXCI7XG4gICAgVkVSQkxJSkY6IHN0cmluZyA9IFwiVmVyYmxpamZcIjtcbiAgICBWT0xQRU5TSU9OOiBzdHJpbmcgPSBcIlZvbHBlbnNpb25cIjtcblxuICAgIGlzQnVzeTogYm9vbGVhbiA9IHRydWU7XG5cbiAgICBpdGVtczogQXJyYXk8U2VnbWVudGVkQmFySXRlbT4gPSBbXTtcbiAgICBzZWxlY3RlZEluZGV4ID0gMDtcbiAgICB0aXRsZXMgPSBbdGhpcy5CVVNfSEVFTiwgdGhpcy5CVVNfVEVSVUcsIHRoaXMuVkVSQkxJSkYsIHRoaXMuVk9MUEVOU0lPTl07XG5cbiAgICBjaGVja2luQnVzR286IENoZWNraW5CdXMgPSB7XG4gICAgICAgIHRvdGFsOiBcIjBcIixcbiAgICAgICAgcGxhY2VzOiBbXSxcbiAgICAgICAgZGF0ZTogXCJcIlxuICAgIH07XG5cbiAgICBjaGVja2luQnVzQmFjazogQ2hlY2tpbkJ1cyA9IHtcbiAgICAgICAgdG90YWw6IFwiMFwiLFxuICAgICAgICBwbGFjZXM6IFtdLFxuICAgICAgICBkYXRlOiBcIlwiXG4gICAgfTtcblxuICAgIHZvbHBlbnNpb246IFZvbHBlbnNpb24gPSB7XG4gICAgICAgIHRvdGFsOiBcIjBcIixcbiAgICAgICAgYWxsSW5UeXBlczogW10sXG4gICAgICAgIGRhdGU6IFwiXCJcbiAgICB9O1xuXG4gICAgYWdlbmNpZXM6IEFycmF5PEFnZW5jeT4gPSBbXTtcbiAgICBhZ2VuY3k6IEFnZW5jeSA9IHtcbiAgICAgICAgaWQ6IFwiXCIsXG4gICAgICAgIG5hbWU6IFwiXCJcbiAgICB9O1xuICAgIGFnZW5jaWVzSXRlbXM6IG9iamVjdCA9IHt9O1xuICAgIGhhc0FnZW5jaWVzOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBsb2RnaW5nOiBMb2RnaW5nID0ge1xuICAgICAgICBkYXRlOiBcIlwiLFxuICAgICAgICBjdXN0b21lcnM6IFtdXG4gICAgfTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgY3VzdG9tZXJTZXJ2aWNlOiBDdXN0b21lclNlcnZpY2UsIHByaXZhdGUgYWdlbmN5U2VydmljZTogQWdlbmN5U2VydmljZSxcbiAgICAgICAgICAgICAgICBwcml2YXRlIHBhZ2U6IFBhZ2UpIHtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgZm9yIChjb25zdCB0aXRsZSBvZiB0aGlzLnRpdGxlcykge1xuICAgICAgICAgICAgY29uc3Qgc2VnbWVudGVkQmFySXRlbSA9IDxTZWdtZW50ZWRCYXJJdGVtPm5ldyBTZWdtZW50ZWRCYXJJdGVtKCk7XG4gICAgICAgICAgICBzZWdtZW50ZWRCYXJJdGVtLnRpdGxlID0gdGl0bGU7XG4gICAgICAgICAgICB0aGlzLml0ZW1zLnB1c2goc2VnbWVudGVkQmFySXRlbSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zZWxlY3RlZEluZGV4ID0gMDtcbiAgICAgICAgdGhpcy5wYWdlLm9uKFBhZ2UubmF2aWdhdGluZ1RvRXZlbnQsICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMubG9hZERhdGEoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgb25TZWxlY3RlZEluZGV4Q2hhbmdlKGFyZ3MpIHtcbiAgICAgICAgY29uc3Qgc2VnbWVudGVkQmFyID0gPFNlZ21lbnRlZEJhcj5hcmdzLm9iamVjdDtcbiAgICAgICAgdGhpcy5zZWxlY3RlZEluZGV4ID0gc2VnbWVudGVkQmFyLnNlbGVjdGVkSW5kZXg7XG5cbiAgICAgICAgdGhpcy5sb2FkRGF0YSgpO1xuICAgIH1cblxuICAgIGdldEN1c3RvbWVyc0J1c0dvKCk6IHZvaWQge1xuICAgICAgICBjb25zdCBkYXRlID0gU2V0dGluZ3MuZ2V0RGF0ZSgpO1xuXG4gICAgICAgIHRoaXMuY3VzdG9tZXJTZXJ2aWNlLmdldEJ1c0dvQ3VzdG9tZXJzQnlXZWVrKGRhdGUpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgIChyZXN1bHQ6IENoZWNraW5CdXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGVja2luQnVzR28gPSByZXN1bHQ7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZ290IG1lIHNvbWUgYnVzIGN1c3RvbWVyc1wiKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc0J1c3kgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmRpcihlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIC8qVE9ETzogaGFuZGxlIGVycm9ycyovXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcbiAgICB9XG5cbiAgICBnZXRDdXN0b21lcnNWb2xwZW5zaW9uKCk6IHZvaWQge1xuICAgICAgICBjb25zdCBkYXRlID0gU2V0dGluZ3MuZ2V0RGF0ZSgpO1xuICAgICAgICBjb25zdCBsb2NhdGlvbklkID0gU2V0dGluZ3MuZ2V0TG9jYXRpb24oKTtcblxuICAgICAgICB0aGlzLmN1c3RvbWVyU2VydmljZS5nZXRBbGxCeUFsbEluVHlwZUZvckxvY2F0aW9uQW5kUGVyaW9kQWN0aW9uKGxvY2F0aW9uSWQsIGRhdGUpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgIChyZXN1bHQ6IFZvbHBlbnNpb24pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52b2xwZW5zaW9uID0gcmVzdWx0O1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImdvdCBtZSBzb21lIHZvbHBlbnNpb24gY3VzdG9tZXJzXCIpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzQnVzeSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZGlyKGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgLypUT0RPOiBoYW5kbGUgZXJyb3JzKi9cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuICAgIH1cblxuICAgIGdldEFnZW5jaWVzKCk6IHZvaWQge1xuICAgICAgICBjb25zdCBkYXRlID0gU2V0dGluZ3MuZ2V0RGF0ZSgpO1xuICAgICAgICBjb25zdCBsb2NhdGlvbklkID0gU2V0dGluZ3MuZ2V0TG9jYXRpb24oKTtcblxuICAgICAgICB0aGlzLmFnZW5jeVNlcnZpY2UuZ2V0QWxsQWdlbmNpZXNGb3JXZWVrQW5kTG9jYXRpb25BY3Rpb24oZGF0ZSwgbG9jYXRpb25JZClcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgKHJlc3VsdDogQXJyYXk8QWdlbmN5PikgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFnZW5jaWVzID0gcmVzdWx0O1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmFnZW5jaWVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWdlbmNpZXNJdGVtcyA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtczogdGhpcy5hZ2VuY2llcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZW5ndGg6IHRoaXMuYWdlbmNpZXMubGVuZ3RoLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdldEl0ZW06IChpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBpdGVtID0gdGhpcy5hZ2VuY2llc1tpbmRleF07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW0ubmFtZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhhc0FnZW5jaWVzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWdlbmN5ID0gdGhpcy5hZ2VuY2llc1swXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZm91bmQgbWUgc29tZSBhZ2VuY2llc1wiKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdldEN1c3RvbWVyc0xvZGdpbmcoKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmRpcihlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGFzQWdlbmNpZXMgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgLypUT0RPOiBoYW5kbGUgZXJyb3JzKi9cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuICAgIH1cblxuICAgIGdldEN1c3RvbWVyc0J1c0JhY2soKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGRhdGUgPSBTZXR0aW5ncy5nZXREYXRlKCk7XG5cbiAgICAgICAgdGhpcy5jdXN0b21lclNlcnZpY2UuZ2V0QnVzQmFja0N1c3RvbWVyc0J5V2VlayhkYXRlKVxuICAgICAgICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICAocmVzdWx0OiBDaGVja2luQnVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tpbkJ1c0JhY2sgPSByZXN1bHQ7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNCdXN5ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5kaXIoZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICAvKlRPRE86IGhhbmRsZSBlcnJvcnMqL1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7XG4gICAgfVxuXG4gICAgZGZQcm9wZXJ0eUdvQ29tbWl0dGVkKGFyZ3MpIHtcbiAgICAgICAgY29uc3QgZGF0YUZvcm0gPSA8UmFkRGF0YUZvcm0+YXJncy5vYmplY3Q7XG4gICAgICAgIGNvbnN0IGJ1c0Nvc3R1bWVyOiBCdXNDdXN0b21lciA9IDxCdXNDdXN0b21lcj4gSlNPTi5wYXJzZShkYXRhRm9ybS5lZGl0ZWRPYmplY3QpO1xuXG4gICAgICAgIHRoaXMuY3VzdG9tZXJTZXJ2aWNlLnB1dEJ1c0dvQ3VzdG9tZXJBY3Rpb24oYnVzQ29zdHVtZXIpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgIChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJVcGRhdGVkIGN1c3RvbWVyXCIpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzQnVzeSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZGlyKGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgLypUT0RPOiBoYW5kbGUgZXJyb3JzKi9cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuICAgIH1cblxuICAgIGRmUHJvcGVydHlCYWNrQ29tbWl0dGVkKGFyZ3MpIHtcbiAgICAgICAgY29uc3QgZGF0YUZvcm0gPSA8UmFkRGF0YUZvcm0+YXJncy5vYmplY3Q7XG4gICAgICAgIGNvbnN0IGJ1c0Nvc3R1bWVyOiBCdXNDdXN0b21lciA9IDxCdXNDdXN0b21lcj4gSlNPTi5wYXJzZShkYXRhRm9ybS5lZGl0ZWRPYmplY3QpO1xuXG4gICAgICAgIHRoaXMuY3VzdG9tZXJTZXJ2aWNlLnB1dEJ1c0JhY2tDdXN0b21lckFjdGlvbihidXNDb3N0dW1lcilcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlVwZGF0ZWQgY3VzdG9tZXJcIik7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5kaXIoZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICAvKlRPRE86IGhhbmRsZSBlcnJvcnMqL1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7XG4gICAgfVxuXG4gICAgZGZQcm9wZXJ0eUxvZGdpbmdDb21taXR0ZWQoYXJncykge1xuICAgICAgICBjb25zdCBkYXRhRm9ybSA9IDxSYWREYXRhRm9ybT5hcmdzLm9iamVjdDtcbiAgICAgICAgY29uc3QgbG9kZ2luZ0N1c3RvbWVyOiBMb2RnaW5nQ3VzdG9tZXIgPSA8TG9kZ2luZ0N1c3RvbWVyPiBKU09OLnBhcnNlKGRhdGFGb3JtLmVkaXRlZE9iamVjdCk7XG4gICAgICAgIGNvbnNvbGUubG9nKGxvZGdpbmdDdXN0b21lcik7XG5cbiAgICAgICAgdGhpcy5jdXN0b21lclNlcnZpY2UucHV0TG9kZ2luZ0xheW91dEN1c3RvbWVyQWN0aW9uKGxvZGdpbmdDdXN0b21lcilcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlVwZGF0ZWQgY3VzdG9tZXJcIik7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5kaXIoZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICAvKlRPRE86IGhhbmRsZSBlcnJvcnMqL1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7XG4gICAgfVxuXG4gICAgZ2V0Q3VzdG9tZXJzTG9kZ2luZygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5pc0J1c3kgPSB0cnVlO1xuICAgICAgICBjb25zdCBkYXRlID0gU2V0dGluZ3MuZ2V0RGF0ZSgpO1xuICAgICAgICBjb25zdCBsb2NhdGlvbklkID0gU2V0dGluZ3MuZ2V0TG9jYXRpb24oKTtcblxuICAgICAgICBpZiAoKHR5cGVvZiB0aGlzLmFnZW5jeSAhPT0gXCJ1bmRlZmluZWRcIiAmJlxuICAgICAgICB0aGlzLmFnZW5jeSAhPT0gbnVsbCA/IHRoaXMuYWdlbmN5LmlkIDogdm9pZCAwKSAhPSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLmN1c3RvbWVyU2VydmljZS5nZXRBbGxCeUFnZW5jeUZvckxvZGdpbmdBbmRMb2NhdGlvbkFuZFBlcmlvZEFjdGlvbih0aGlzLmFnZW5jeS5pZCwgbG9jYXRpb25JZCwgZGF0ZSlcbiAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICAocmVzdWx0OiBMb2RnaW5nKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZGdpbmcgPSByZXN1bHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmlzQnVzeSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZGlyKGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8qVE9ETzogaGFuZGxlIGVycm9ycyovXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2VsZWN0ZWRJbmRleEFnZW5jeUNoYW5nZWQoYXJncykge1xuICAgICAgICBjb25zdCBwaWNrZXIgPSA8TGlzdFBpY2tlcj5hcmdzLm9iamVjdDtcblxuICAgICAgICBpZiAodGhpcy5hZ2VuY2llcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB0aGlzLmFnZW5jeSA9IHRoaXMuYWdlbmNpZXNbcGlja2VyLnNlbGVjdGVkSW5kZXhdO1xuICAgICAgICAgICAgdGhpcy5nZXRDdXN0b21lcnNMb2RnaW5nKCk7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIGxvYWREYXRhKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmlzQnVzeSA9IHRydWU7XG4gICAgICAgIHN3aXRjaCAodGhpcy50aXRsZXNbdGhpcy5zZWxlY3RlZEluZGV4XSkge1xuICAgICAgICAgICAgY2FzZSB0aGlzLkJVU19IRUVOOlxuICAgICAgICAgICAgICAgIHRoaXMuZ2V0Q3VzdG9tZXJzQnVzR28oKTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSB0aGlzLkJVU19URVJVRzpcbiAgICAgICAgICAgICAgICB0aGlzLmdldEN1c3RvbWVyc0J1c0JhY2soKTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSB0aGlzLlZFUkJMSUpGOlxuICAgICAgICAgICAgICAgIHRoaXMuZ2V0QWdlbmNpZXMoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSB0aGlzLlZPTFBFTlNJT046XG4gICAgICAgICAgICAgICAgdGhpcy5nZXRDdXN0b21lcnNWb2xwZW5zaW9uKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbn1cbiJdfQ==