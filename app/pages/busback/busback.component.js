"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var nativescript_angular_1 = require("nativescript-angular");
var settings_1 = require("~/settings/settings");
var customer_service_1 = require("~/shared/services/customer.service");
var BusbackComponent = /** @class */ (function () {
    function BusbackComponent(customerService, routerExtensions, activeRoute) {
        this.customerService = customerService;
        this.routerExtensions = routerExtensions;
        this.activeRoute = activeRoute;
        this.checkinBusBack = {
            total: "0",
            places: [],
            date: ""
        };
    }
    BusbackComponent.prototype.ngOnInit = function () {
        this.getCustomersBusBack();
    };
    BusbackComponent.prototype.getCustomersBusBack = function () {
        var _this = this;
        var date = settings_1.Settings.getDate();
        this.isBusy = true;
        this.customerService.getBusBackCustomersByWeek(date)
            .subscribe(function (result) {
            _this.checkinBusBack = result;
            _this.isBusy = false;
        }, function (error) {
            console.dir(error);
            _this.isBusy = false;
            /*TODO: handle errors*/
        });
    };
    BusbackComponent.prototype.dfPropertyBackCommitted = function (args) {
        var _this = this;
        var dataForm = args.object;
        var busCostumer = JSON.parse(dataForm.editedObject);
        this.isBusy = true;
        this.customerService.putBusBackCustomerAction(busCostumer)
            .subscribe(function () {
            _this.isBusy = false;
            console.log("Updated customer");
        }, function (error) {
            console.dir(error);
            _this.isBusy = false;
            /*TODO: handle errors*/
        });
    };
    BusbackComponent.prototype.goBack = function () {
        this.routerExtensions.navigate(["/tabs/default"], {
            transition: {
                name: "fade"
            }
        });
    };
    BusbackComponent = __decorate([
        core_1.Component({
            selector: "Busback",
            moduleId: module.id,
            providers: [customer_service_1.CustomerService],
            templateUrl: "./busback.component.html"
        }),
        __metadata("design:paramtypes", [customer_service_1.CustomerService, nativescript_angular_1.RouterExtensions,
            router_1.ActivatedRoute])
    ], BusbackComponent);
    return BusbackComponent;
}());
exports.BusbackComponent = BusbackComponent;
