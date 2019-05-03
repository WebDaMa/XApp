"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var nativescript_angular_1 = require("nativescript-angular");
var operators_1 = require("rxjs/operators");
var page_1 = require("tns-core-modules/ui/page");
var customer_service_1 = require("~/shared/services/customer.service");
var CheckinDetailComponent = /** @class */ (function () {
    function CheckinDetailComponent(customerService, routerExtensions, pageRoute, page, activeRoute) {
        var _this = this;
        this.customerService = customerService;
        this.routerExtensions = routerExtensions;
        this.pageRoute = pageRoute;
        this.page = page;
        this.activeRoute = activeRoute;
        this.customerCheckinDetail = {
            id: "",
            firstName: "",
            lastName: "",
            licensePlate: "",
            expireDate: "",
            nationalRegisterNumber: "",
            gsm: "",
            emergencyNumber: "",
            email: "",
            birthdate: ""
        };
        this.isBusy = true;
        this.pageRoute.activatedRoute.pipe(operators_1.switchMap(function (activatedRoute) { return activatedRoute.params; })).forEach(function (params) { _this.customerId = params.customer_id; });
    }
    CheckinDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.page.backgroundSpanUnderStatusBar = true;
        this.page.on("loaded", function (args) {
            if (_this.page.android) {
                _this.page.android.setFitsSystemWindows(true);
            }
        });
        this.getCustomerDetail();
    };
    CheckinDetailComponent.prototype.getCustomerDetail = function () {
        var _this = this;
        this.isBusy = true;
        this.customerService.getCheckinByCustomerId(this.customerId)
            .subscribe(function (result) {
            _this.customerCheckinDetail = result;
            console.log("found me some customer checkin detail");
            _this.isBusy = false;
        }, function (error) {
            console.dir(error);
            /*TODO: handle errors*/
        });
    };
    CheckinDetailComponent.prototype.dfPropertyCommitted = function (args) {
        var _this = this;
        var dataForm = args.object;
        var customer = JSON.parse(dataForm.editedObject);
        var lenght = customer.birthdate.toString().length;
        if (customer.birthdate !== null && lenght > 11) {
            /*Remove mili seconds*/
            customer.birthdate = (customer.birthdate / 1000) + "";
        }
        this.isBusy = true;
        this.customerService.putCheckinCustomerDetailAction(customer).subscribe(function (res) {
            console.log("Updated customer");
            _this.isBusy = false;
        }, function (error) {
            console.dir(error);
            /*TODO: handle errors*/
        });
    };
    CheckinDetailComponent.prototype.goBack = function () {
        this.routerExtensions.back();
    };
    CheckinDetailComponent = __decorate([
        core_1.Component({
            selector: "CheckinDetail",
            moduleId: module.id,
            providers: [customer_service_1.CustomerService],
            templateUrl: "./checkinDetail.component.html"
        }),
        __metadata("design:paramtypes", [customer_service_1.CustomerService,
            nativescript_angular_1.RouterExtensions, nativescript_angular_1.PageRoute,
            page_1.Page, router_1.ActivatedRoute])
    ], CheckinDetailComponent);
    return CheckinDetailComponent;
}());
exports.CheckinDetailComponent = CheckinDetailComponent;
