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
            _this.isBusy = false;
            _this.getCustomersLodging();
        }, function (error) {
            console.dir(error);
            _this.hasAgencies = false;
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
