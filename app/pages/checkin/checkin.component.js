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
            _this.isBusy = false;
        });
    };
    CheckinComponent.prototype.getAgencies = function () {
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
                _this.isBusy = false;
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
