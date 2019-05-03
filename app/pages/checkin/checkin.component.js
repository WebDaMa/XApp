"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var nativescript_angular_1 = require("nativescript-angular");
var page_1 = require("tns-core-modules/ui/page");
var settings_1 = require("~/settings/settings");
var customer_service_1 = require("~/shared/services/customer.service");
var groep_service_1 = require("~/shared/services/groep.service");
var CheckinComponent = /** @class */ (function () {
    function CheckinComponent(groepService, customerService, routerExtensions, page, activeRoute) {
        var _this = this;
        this.groepService = groepService;
        this.customerService = customerService;
        this.routerExtensions = routerExtensions;
        this.page = page;
        this.activeRoute = activeRoute;
        this.groeps = [];
        this.groepItems = {};
        this.hasGroeps = false;
        this.selectedIndex = 0;
        this.customers = [];
        this.isBusy = true;
        this.page.on(page_1.Page.navigatingToEvent, function () {
            _this.getCustomers();
        });
    }
    CheckinComponent.prototype.ngOnInit = function () {
        this.getGroeps();
    };
    CheckinComponent.prototype.selectedIndexChanged = function (args) {
        var picker = args.object;
        if (this.groeps.length > 0) {
            this.groep = this.groeps[picker.selectedIndex];
            this.getCustomers();
        }
    };
    CheckinComponent.prototype.getGroeps = function () {
        var _this = this;
        var locationId = settings_1.Settings.getLocation();
        var date = settings_1.Settings.getDate();
        this.isBusy = true;
        this.groepService.getAllGroepsForWeekAndLocationAction(date, locationId)
            .subscribe(function (result) {
            _this.groeps = result;
            if (_this.groeps.length > 0) {
                _this.groepItems = {
                    items: _this.groeps,
                    length: _this.groeps.length,
                    getItem: function (index) {
                        var item = _this.groeps[index];
                        return item.name;
                    }
                };
                _this.hasGroeps = true;
                console.log("found me some checkin groeps");
                _this.groep = _this.groeps[0];
            }
            _this.getCustomers();
            _this.isBusy = false;
        }, function (error) {
            console.dir(error);
            _this.isBusy = false;
            /*TODO: handle errors*/
        });
    };
    CheckinComponent.prototype.getCustomers = function () {
        var _this = this;
        if ((typeof this.groep !== "undefined" &&
            this.groep !== null ? this.groep.id : void 0) != null) {
            this.isBusy = true;
            this.customerService.getAllByGroepForCheckinAction(this.groep.id)
                .subscribe(function (result) {
                for (var _i = 0, result_1 = result; _i < result_1.length; _i++) {
                    var customer = result_1[_i];
                    customer.isComplete = _this.isInfoComplete(customer);
                }
                _this.customers = result;
                console.log("found me some checkin customers");
                _this.isBusy = false;
            }, function (error) {
                console.dir(error);
                _this.hasGroeps = false;
                _this.isBusy = false;
                /*TODO: handle errors*/
            });
        }
    };
    CheckinComponent.prototype.isInfoComplete = function (customer) {
        return (customer.email !== "" && customer.email !== null && customer.birthdate !== "" &&
            customer.birthdate !== null
            && customer.expireDate !== "" && customer.expireDate !== null &&
            customer.nationalRegisterNumber !== "" && customer.nationalRegisterNumber !== null);
    };
    CheckinComponent.prototype.checkinCustomer = function (args, customer) {
        var _this = this;
        var checkinSwitch = args.object;
        customer.checkedin = checkinSwitch.checked;
        this.isBusy = true;
        this.customerService.putCheckinCustomerAction(customer).subscribe(function (res) {
            console.log("Updated customer");
            _this.isBusy = false;
        }, function (error) {
            console.dir(error);
            _this.isBusy = false;
            /*TODO: handle errors*/
        });
    };
    CheckinComponent.prototype.goBack = function () {
        this.routerExtensions.navigate(["/tabs/default"], {
            transition: {
                name: "fade"
            }
        });
    };
    CheckinComponent = __decorate([
        core_1.Component({
            selector: "Checkin",
            moduleId: module.id,
            providers: [groep_service_1.GroepService, customer_service_1.CustomerService],
            templateUrl: "./checkin.component.html"
        }),
        __metadata("design:paramtypes", [groep_service_1.GroepService, customer_service_1.CustomerService,
            nativescript_angular_1.RouterExtensions, page_1.Page,
            router_1.ActivatedRoute])
    ], CheckinComponent);
    return CheckinComponent;
}());
exports.CheckinComponent = CheckinComponent;
