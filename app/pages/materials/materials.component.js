"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var app = require("tns-core-modules/application");
var settings_1 = require("~/settings/settings");
var material_service_1 = require("~/shared/services/material.service");
var MaterialsComponent = /** @class */ (function () {
    function MaterialsComponent(materialService) {
        this.materialService = materialService;
        this.isBusy = true;
        // Use the component constructor to inject providers.
    }
    MaterialsComponent.prototype.ngOnInit = function () {
        this.material = {};
        this.material.guide = {};
        this.material.beltTotals = [];
        this.material.sizeTotals = [];
        this.material.helmetTotals = [];
        this.material.userSizes = [];
        this.reload();
    };
    Object.defineProperty(MaterialsComponent.prototype, "material", {
        get: function () {
            return this._material;
        },
        set: function (value) {
            this._material = value;
        },
        enumerable: true,
        configurable: true
    });
    MaterialsComponent.prototype.reload = function () {
        var _this = this;
        this.isBusy = true;
        var date = settings_1.Settings.getDate();
        var appSettings = require("tns-core-modules/application-settings");
        var guideId = "3";
        if (appSettings.hasKey("guideId")) {
            guideId = appSettings.getString("guideId");
        }
        this.materialService.getTotalForGuideAndDateAction(guideId, date).subscribe(function (result) {
            _this.material = result;
            _this.isBusy = false;
        }, function (error) {
            console.dir(error);
            /*TODO: handle errors*/
            _this.isBusy = false;
        });
    };
    MaterialsComponent.prototype.onDrawerButtonTap = function () {
        var sideDrawer = app.getRootView();
        sideDrawer.showDrawer();
    };
    MaterialsComponent = __decorate([
        core_1.Component({
            selector: "Materials",
            moduleId: module.id,
            providers: [material_service_1.MaterialService],
            templateUrl: "./materials.component.html"
        }),
        __metadata("design:paramtypes", [material_service_1.MaterialService])
    ], MaterialsComponent);
    return MaterialsComponent;
}());
exports.MaterialsComponent = MaterialsComponent;
