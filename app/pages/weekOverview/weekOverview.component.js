"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var app = require("tns-core-modules/application");
var page_1 = require("tns-core-modules/ui/page");
var settings_1 = require("~/settings/settings");
var guide_service_1 = require("~/shared/services/guide.service");
var planning_service_1 = require("~/shared/services/planning.service");
var WeekOverviewComponent = /** @class */ (function () {
    function WeekOverviewComponent(planningService, guideService, page) {
        this.planningService = planningService;
        this.guideService = guideService;
        this.page = page;
        this.guides = [];
        this.days = ["Zondag", "Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag", "Zaterdag"];
        this.plannings = [];
        // Use the component constructor to inject providers.
    }
    WeekOverviewComponent.prototype.ngOnInit = function () {
        this.getGuides();
    };
    WeekOverviewComponent.prototype.getWeekPlanning = function () {
        var _this = this;
        this.isBusy = true;
        var date = settings_1.Settings.getDate();
        var location = settings_1.Settings.getLocation();
        var appSettings = require("tns-core-modules/application-settings");
        var guideId = "3";
        if (appSettings.hasKey("guideId")) {
            guideId = appSettings.getString("guideId");
        }
        this.planningService.getAllByGuideAndWeekAndLocationAction(guideId, date, location)
            .subscribe(function (result) {
            _this.plannings = result;
            console.log("Found me some Planning!");
            _this.isBusy = false;
        }, function (error) {
            console.dir(error);
            _this.isBusy = false;
        });
    };
    WeekOverviewComponent.prototype.getGuides = function () {
        var _this = this;
        this.isBusy = true;
        var locationId = settings_1.Settings.getLocation();
        var date = settings_1.Settings.getDate();
        this.guideService.getAllGuidesForWeekAndLocationAction(date, locationId)
            .subscribe(function (result) {
            _this.guides = [{ key: "0", label: "/" }];
            _this.guides = _this.guides.concat(result.map(function (_a) {
                var id = _a.id, guideShort = _a.guideShort, guideFirstName = _a.guideFirstName, guideLastName = _a.guideLastName;
                return ({ key: id, label: guideShort + " - " + guideFirstName + " " + guideLastName });
            }));
            console.log("Found me some Guides!");
            _this.isBusy = false;
            _this.getWeekPlanning();
        }, function (error) {
            console.dir(error);
            _this.isBusy = false;
            /*TODO: handle errors*/
        });
    };
    WeekOverviewComponent.prototype.getDayOfWeek = function (date) {
        var dateObj = new Date(date);
        var day = dateObj.getDay();
        return this.days[day];
    };
    WeekOverviewComponent.prototype.onDrawerButtonTap = function () {
        var sideDrawer = app.getRootView();
        sideDrawer.showDrawer();
    };
    WeekOverviewComponent = __decorate([
        core_1.Component({
            selector: "WeekOverview",
            moduleId: module.id,
            providers: [guide_service_1.GuideService, planning_service_1.PlanningService],
            templateUrl: "./weekOverview.component.html"
        }),
        __metadata("design:paramtypes", [planning_service_1.PlanningService, guide_service_1.GuideService,
            page_1.Page])
    ], WeekOverviewComponent);
    return WeekOverviewComponent;
}());
exports.WeekOverviewComponent = WeekOverviewComponent;
