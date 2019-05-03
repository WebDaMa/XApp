"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var nativescript_angular_1 = require("nativescript-angular");
var operators_1 = require("rxjs/operators");
var page_1 = require("tns-core-modules/ui/page");
var customer_service_1 = require("~/shared/services/customer.service");
var groep_service_1 = require("~/shared/services/groep.service");
var PaymentsAddComponent = /** @class */ (function () {
    function PaymentsAddComponent(groepService, customerService, routerExtensions, page, pageRoute, activeRoute) {
        var _this = this;
        this.groepService = groepService;
        this.customerService = customerService;
        this.routerExtensions = routerExtensions;
        this.page = page;
        this.pageRoute = pageRoute;
        this.activeRoute = activeRoute;
        this.isBusy = false;
        this.payment = {
            customerId: 0,
            description: "",
            price: 0
        };
        this.pageRoute.activatedRoute.pipe(operators_1.switchMap(function (activatedRoute) { return activatedRoute.params; })).forEach(function (params) { _this.payment.customerId = params.customer_id; });
    }
    PaymentsAddComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.page.backgroundSpanUnderStatusBar = true;
        this.page.on("loaded", function (args) {
            if (_this.page.android) {
                _this.page.android.setFitsSystemWindows(true);
            }
        });
    };
    PaymentsAddComponent.prototype.addPayment = function () {
        var _this = this;
        this.isBusy = true;
        this.customerService.putPaymentToCustomerAction(this.payment).subscribe(function (res) {
            console.log("Added payment");
            _this.isBusy = false;
            _this.goBack();
        }, function (error) {
            console.dir(error);
            /*TODO: handle errors*/
        });
    };
    PaymentsAddComponent.prototype.goBack = function () {
        this.routerExtensions.back();
    };
    PaymentsAddComponent = __decorate([
        core_1.Component({
            selector: "PaymentsAdd",
            moduleId: module.id,
            providers: [groep_service_1.GroepService, customer_service_1.CustomerService],
            templateUrl: "./paymentsAdd.component.html"
        }),
        __metadata("design:paramtypes", [groep_service_1.GroepService, customer_service_1.CustomerService,
            nativescript_angular_1.RouterExtensions, page_1.Page, nativescript_angular_1.PageRoute,
            router_1.ActivatedRoute])
    ], PaymentsAddComponent);
    return PaymentsAddComponent;
}());
exports.PaymentsAddComponent = PaymentsAddComponent;
