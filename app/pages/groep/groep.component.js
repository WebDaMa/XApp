"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var nativescript_angular_1 = require("nativescript-angular");
var page_1 = require("tns-core-modules/ui/page");
var settings_1 = require("~/settings/settings");
var customer_service_1 = require("~/shared/services/customer.service");
var groep_service_1 = require("~/shared/services/groep.service");
var GroepComponent = /** @class */ (function () {
    function GroepComponent(groepService, customerService, routerExtensions, page, activeRoute) {
        this.groepService = groepService;
        this.customerService = customerService;
        this.routerExtensions = routerExtensions;
        this.page = page;
        this.activeRoute = activeRoute;
        this.groeps = [];
        this.customers = [];
        this.isBusy = true;
    }
    GroepComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.getGroeps();
        this.page.backgroundSpanUnderStatusBar = true;
        this.page.on("loaded", function (args) {
            if (_this.page.android) {
                _this.page.android.setFitsSystemWindows(true);
            }
        });
    };
    GroepComponent.prototype.getGroeps = function () {
        var _this = this;
        var locationId = settings_1.Settings.getLocation();
        var date = settings_1.Settings.getDate();
        this.isBusy = true;
        this.groepService.getAllGroepsForWeekAndLocationAction(date, locationId)
            .subscribe(function (result) {
            _this.groeps = [{ key: "0", label: "Kies een Groep" }];
            _this.groeps = _this.groeps.concat(result.map(function (_a) {
                var id = _a.id, name = _a.name;
                return ({ key: id, label: name });
            }));
            _this.isBusy = false;
            _this.getCustomers();
        }, function (error) {
            console.dir(error);
            _this.isBusy = false;
            /*TODO: handle errors*/
        });
    };
    GroepComponent.prototype.getCustomers = function () {
        var _this = this;
        this.isBusy = true;
        var locationId = settings_1.Settings.getLocation();
        var date = settings_1.Settings.getDate();
        this.customerService.getAllByPeriodIdAndLocationIdForGroupLayoutAction(date, locationId)
            .subscribe(function (result) {
            _this.customers = result;
            console.log("found me some groep customers");
            _this.isBusy = false;
        }, function (error) {
            console.dir(error);
            /*TODO: handle errors*/
            _this.isBusy = false;
        });
    };
    GroepComponent.prototype.dfPropertyCommitted = function (args) {
        var _this = this;
        var dataForm = args.object;
        var groepCustomer = JSON.parse(dataForm.editedObject);
        if (groepCustomer.groupLayoutId !== "0") {
            this.isBusy = true;
            this.customerService.putGroepCustomerAction(groepCustomer)
                .subscribe(function (res) {
                console.log("Updated customer");
                _this.isBusy = false;
            }, function (error) {
                console.dir(error);
                /*TODO: handle errors*/
                _this.isBusy = false;
            });
        }
    };
    GroepComponent.prototype.goBack = function () {
        this.routerExtensions.navigate(["/tabs/default"], {
            transition: {
                name: "fade"
            }
        });
    };
    GroepComponent = __decorate([
        core_1.Component({
            selector: "Groep",
            moduleId: module.id,
            providers: [groep_service_1.GroepService, customer_service_1.CustomerService],
            templateUrl: "./groep.component.html"
        }),
        __metadata("design:paramtypes", [groep_service_1.GroepService, customer_service_1.CustomerService,
            nativescript_angular_1.RouterExtensions, page_1.Page,
            router_1.ActivatedRoute])
    ], GroepComponent);
    return GroepComponent;
}());
exports.GroepComponent = GroepComponent;
