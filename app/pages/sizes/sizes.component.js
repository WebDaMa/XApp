"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var app = require("tns-core-modules/application");
var page_1 = require("tns-core-modules/ui/page");
var settings_1 = require("~/settings/settings");
var customer_service_1 = require("~/shared/services/customer.service");
var groep_service_1 = require("~/shared/services/groep.service");
var suitSize_service_1 = require("~/shared/services/suitSize.service");
var SizesComponent = /** @class */ (function () {
    function SizesComponent(groepService, customerService, suitSizeService, page) {
        this.groepService = groepService;
        this.customerService = customerService;
        this.suitSizeService = suitSizeService;
        this.page = page;
        this.groeps = [];
        this.groepItems = {};
        this.hasGroeps = false;
        this.isBusy = true;
        this.selectedIndex = 0;
        this.customers = [];
        this.sizes = [];
    }
    SizesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.getSizes();
        this.getGroeps();
        this.page.backgroundSpanUnderStatusBar = true;
        this.page.on("loaded", function (args) {
            if (_this.page.android) {
                _this.page.android.setFitsSystemWindows(true);
            }
        });
    };
    SizesComponent.prototype.selectedIndexChanged = function (args) {
        var picker = args.object;
        if (this.groeps.length > 0) {
            this.groep = this.groeps[picker.selectedIndex];
            this.getCustomers();
        }
    };
    SizesComponent.prototype.getGroeps = function () {
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
                console.log("found me some size groeps");
                _this.groep = _this.groeps[0];
            }
            _this.isBusy = false;
            _this.getCustomers();
        }, function (error) {
            console.dir(error);
            _this.isBusy = false;
            _this.hasGroeps = false;
            /*TODO: handle errors*/
        });
    };
    SizesComponent.prototype.getCustomers = function () {
        var _this = this;
        if ((typeof this.groep !== "undefined" &&
            this.groep !== null ? this.groep.id : void 0) != null) {
            this.isBusy = true;
            this.customerService.getAllByGroepAction(this.groep.id)
                .subscribe(function (result) {
                _this.customers = result;
                console.log("found me some size customers");
                _this.isBusy = false;
            }, function (error) {
                console.dir(error);
                _this.hasGroeps = false;
                _this.isBusy = false;
                /*TODO: handle errors*/
            });
        }
    };
    SizesComponent.prototype.getSizes = function () {
        var _this = this;
        this.isBusy = true;
        this.suitSizeService.getAllAction()
            .subscribe(function (result) {
            _this.sizes = [{ key: "0", label: "Kies een Maat" }];
            _this.sizes = _this.sizes.concat(result.map(function (_a) {
                var id = _a.id, name = _a.name;
                return ({ key: id, label: name });
            }));
            _this.isBusy = false;
        }, function (error) {
            console.dir(error);
            _this.isBusy = false;
            /*TODO: handle errors*/
        });
    };
    SizesComponent.prototype.dfPropertyCommitted = function (args) {
        var _this = this;
        var dataForm = args.object;
        var sizeCustomer = JSON.parse(dataForm.editedObject);
        if (sizeCustomer.size !== "0") {
            this.isBusy = true;
            this.customerService.putCustomerSizeAction(sizeCustomer)
                .subscribe(function () {
                console.log("Updated customer");
                _this.isBusy = false;
            }, function (error) {
                console.dir(error);
                _this.isBusy = false;
                /*TODO: handle errors*/
            });
        }
    };
    SizesComponent.prototype.onDrawerButtonTap = function () {
        var sideDrawer = app.getRootView();
        sideDrawer.showDrawer();
    };
    SizesComponent = __decorate([
        core_1.Component({
            selector: "Sizes",
            moduleId: module.id,
            providers: [groep_service_1.GroepService, customer_service_1.CustomerService, suitSize_service_1.SuitSizeService],
            templateUrl: "./sizes.component.html"
        }),
        __metadata("design:paramtypes", [groep_service_1.GroepService, customer_service_1.CustomerService,
            suitSize_service_1.SuitSizeService, page_1.Page])
    ], SizesComponent);
    return SizesComponent;
}());
exports.SizesComponent = SizesComponent;
