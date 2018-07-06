"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var nativescript_angular_1 = require("nativescript-angular");
var page_1 = require("tns-core-modules/ui/page");
var settings_1 = require("~/settings/settings");
var guide_service_1 = require("~/shared/services/guide.service");
var MaterialsSettingsComponent = /** @class */ (function () {
    function MaterialsSettingsComponent(guideService, page, routerExtensions) {
        this.guideService = guideService;
        this.page = page;
        this.routerExtensions = routerExtensions;
        this.guides = [];
        this.guideItems = {};
        this.hasGuides = false;
        this.selectedIndex = 0;
    }
    MaterialsSettingsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.page.on(page_1.Page.navigatingToEvent, function () {
            _this.getGuides();
        });
        this.getGuides();
    };
    MaterialsSettingsComponent.prototype.selectedIndexChanged = function (args) {
        var picker = args.object;
        var appSettings = require("application-settings");
        if (this.guides.length > 0) {
            appSettings.setNumber("guideIndex", picker.selectedIndex);
            this.guide = this.guides[picker.selectedIndex];
            appSettings.setString("guideId", this.guide.id);
        }
    };
    MaterialsSettingsComponent.prototype.getGuides = function () {
        var _this = this;
        var appSettings = require("application-settings");
        var locationId = settings_1.Settings.getLocation();
        var date = settings_1.Settings.getDate();
        this.guideService.getAllGuidesForWeekAndLocationAction(date, locationId)
            .subscribe(function (result) {
            _this.guides = result;
            if (_this.guides.length > 0) {
                _this.guideItems = {
                    items: _this.guides,
                    length: _this.guides.length,
                    getItem: function (index) {
                        var item = _this.guides[index];
                        return item.guideShort + " - " + item.guideFirstName + " - " + item.guideLastName;
                    }
                };
                _this.hasGuides = true;
                console.log("found me some guides");
            }
            _this.selectedIndex = appSettings.hasKey("guideIndex") ?
                appSettings.getNumber("guideIndex") : 0;
            _this.guide = _this.guides[_this.selectedIndex];
            appSettings.setString("guideId", _this.guide.id);
        }, function (error) {
            console.dir(error);
            _this.hasGuides = false;
            /*TODO: handle errors*/
        });
    };
    MaterialsSettingsComponent.prototype.goBack = function () {
        this.routerExtensions.backToPreviousPage();
    };
    MaterialsSettingsComponent = __decorate([
        core_1.Component({
            selector: "MaterialsSettings",
            moduleId: module.id,
            providers: [guide_service_1.GuideService],
            templateUrl: "./materials-settings.component.html"
        }),
        __metadata("design:paramtypes", [guide_service_1.GuideService, page_1.Page, nativescript_angular_1.RouterExtensions])
    ], MaterialsSettingsComponent);
    return MaterialsSettingsComponent;
}());
exports.MaterialsSettingsComponent = MaterialsSettingsComponent;
