"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var nativescript_angular_1 = require("nativescript-angular");
var page_1 = require("tns-core-modules/ui/page");
var settings_1 = require("~/settings/settings");
var customer_service_1 = require("~/shared/services/customer.service");
var guide_service_1 = require("~/shared/services/guide.service");
var planning_service_1 = require("~/shared/services/planning.service");
var PlanningComponent = /** @class */ (function () {
    function PlanningComponent(customerService, routerExtensions, planningService, guideService, page, activeRoute) {
        this.customerService = customerService;
        this.routerExtensions = routerExtensions;
        this.planningService = planningService;
        this.guideService = guideService;
        this.page = page;
        this.activeRoute = activeRoute;
        this.guides = [];
        this.date = "";
        this.locationId = "";
        this.isBusy = false;
    }
    PlanningComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.date = settings_1.Settings.getDate();
        this.locationId = settings_1.Settings.getLocation();
        this.getGuides();
        this.page.backgroundSpanUnderStatusBar = true;
        this.page.on("loaded", function (args) {
            if (_this.page.android) {
                _this.page.android.setFitsSystemWindows(true);
            }
        });
    };
    PlanningComponent.prototype.getPlannings = function () {
        var _this = this;
        this.isBusy = true;
        this.planningService.getAllByDayAndLocationAction(this.date, this.locationId)
            .subscribe(function (result) {
            _this.plannings = result;
            console.log("found me some plannings");
            _this.isBusy = false;
        }, function (error) {
            console.dir(error);
            /*TODO: handle errors*/
        });
    };
    PlanningComponent.prototype.getGuides = function () {
        var _this = this;
        this.isBusy = true;
        this.guideService.getAllGuidesForWeekAndLocationAction(this.date, this.locationId)
            .subscribe(function (result) {
            _this.guides = [{ key: "0", label: "Kies een Gids" }];
            _this.guides = _this.guides.concat(result.map(function (_a) {
                var id = _a.id, guideShort = _a.guideShort, guideFirstName = _a.guideFirstName, guideLastName = _a.guideLastName;
                return ({ key: id, label: guideShort + " - " + guideFirstName + " " + guideLastName });
            }));
            _this.getPlannings();
        }, function (error) {
            console.dir(error);
            /*TODO: handle errors*/
        });
    };
    PlanningComponent.prototype.dfPropertyCommitted = function (args) {
        var _this = this;
        var dataForm = args.object;
        var planning = JSON.parse(dataForm.editedObject);
        if (planning.guideId !== "0") {
            this.isBusy = true;
            this.planningService.putPlanningUpdateAction(planning)
                .subscribe(function (res) {
                console.log("Updated planning");
                _this.isBusy = false;
            }, function (error) {
                console.dir(error);
                /*TODO: handle errors*/
            });
        }
    };
    PlanningComponent.prototype.goBack = function () {
        this.routerExtensions.navigate(["/tabs/default"], {
            transition: {
                name: "fade"
            }
        });
    };
    PlanningComponent = __decorate([
        core_1.Component({
            selector: "Planning",
            moduleId: module.id,
            providers: [customer_service_1.CustomerService, planning_service_1.PlanningService, guide_service_1.GuideService],
            templateUrl: "./planning.component.html"
        }),
        __metadata("design:paramtypes", [customer_service_1.CustomerService,
            nativescript_angular_1.RouterExtensions, planning_service_1.PlanningService,
            guide_service_1.GuideService, page_1.Page, router_1.ActivatedRoute])
    ], PlanningComponent);
    return PlanningComponent;
}());
exports.PlanningComponent = PlanningComponent;
