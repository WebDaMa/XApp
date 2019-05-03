"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var nativescript_angular_1 = require("nativescript-angular");
var page_1 = require("tns-core-modules/ui/page");
var settings_1 = require("~/settings/settings");
var customer_service_1 = require("~/shared/services/customer.service");
var groep_service_1 = require("~/shared/services/groep.service");
var BillComponent = /** @class */ (function () {
    function BillComponent(groepService, customerService, routerExtensions, page, activeRoute) {
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
    BillComponent.prototype.ngOnInit = function () {
        this.getGroeps();
    };
    BillComponent.prototype.selectedIndexChanged = function (args) {
        var picker = args.object;
        if (this.groeps.length > 0) {
            this.groep = this.groeps[picker.selectedIndex];
            this.getCustomers();
        }
    };
    BillComponent.prototype.getGroeps = function () {
        var _this = this;
        var locationId = settings_1.Settings.getLocation();
        var date = settings_1.Settings.getDate();
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
                console.log("found me some bill groeps");
                _this.groep = _this.groeps[0];
            }
            _this.getCustomers();
        }, function (error) {
            console.dir(error);
            /*TODO: handle errors*/
        });
    };
    BillComponent.prototype.getCustomers = function () {
        var _this = this;
        if ((typeof this.groep !== "undefined" &&
            this.groep !== null ? this.groep.id : void 0) != null) {
            this.isBusy = true;
            this.customerService.getAllByGroepForBillAction(this.groep.id)
                .subscribe(function (result) {
                _this.customers = result;
                console.log("found me some bill customers");
                _this.isBusy = false;
            }, function (error) {
                console.dir(error);
                _this.hasGroeps = false;
                /*TODO: handle errors*/
            });
        }
    };
    BillComponent.prototype.goBack = function () {
        this.routerExtensions.navigate(["/tabs/default"], {
            transition: {
                name: "fade"
            }
        });
    };
    BillComponent = __decorate([
        core_1.Component({
            selector: "Bill",
            moduleId: module.id,
            providers: [groep_service_1.GroepService, customer_service_1.CustomerService],
            templateUrl: "./bill.component.html"
        }),
        __metadata("design:paramtypes", [groep_service_1.GroepService, customer_service_1.CustomerService,
            nativescript_angular_1.RouterExtensions, page_1.Page, router_1.ActivatedRoute])
    ], BillComponent);
    return BillComponent;
}());
exports.BillComponent = BillComponent;
