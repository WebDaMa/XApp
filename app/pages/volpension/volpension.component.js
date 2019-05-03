"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var nativescript_angular_1 = require("nativescript-angular");
var page_1 = require("tns-core-modules/ui/page");
var settings_1 = require("~/settings/settings");
var customer_service_1 = require("~/shared/services/customer.service");
var VolpensionComponent = /** @class */ (function () {
    function VolpensionComponent(customerService, routerExtensions, page, activeRoute) {
        this.customerService = customerService;
        this.routerExtensions = routerExtensions;
        this.page = page;
        this.activeRoute = activeRoute;
        this.volpension = {
            total: "0",
            allInTypes: [],
            date: ""
        };
        this.isBusy = true;
    }
    VolpensionComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.getCustomersVolpension();
        this.page.backgroundColor = "#000000";
        this.page.backgroundSpanUnderStatusBar = true;
        this.page.on("loaded", function (args) {
            if (_this.page.android) {
                _this.page.android.setFitsSystemWindows(true);
            }
        });
    };
    VolpensionComponent.prototype.getCustomersVolpension = function () {
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
    VolpensionComponent.prototype.goBack = function () {
        this.routerExtensions.navigate(["/tabs/default"], {
            transition: {
                name: "fade"
            }
        });
    };
    VolpensionComponent = __decorate([
        core_1.Component({
            selector: "Volpension",
            moduleId: module.id,
            providers: [customer_service_1.CustomerService],
            templateUrl: "./volpension.component.html"
        }),
        __metadata("design:paramtypes", [customer_service_1.CustomerService, nativescript_angular_1.RouterExtensions,
            page_1.Page, router_1.ActivatedRoute])
    ], VolpensionComponent);
    return VolpensionComponent;
}());
exports.VolpensionComponent = VolpensionComponent;
