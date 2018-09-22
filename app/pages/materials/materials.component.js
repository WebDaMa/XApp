"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
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
        var appSettings = require("application-settings");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0ZXJpYWxzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1hdGVyaWFscy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBa0Q7QUFDbEQsZ0RBQStDO0FBRS9DLHVFQUFxRTtBQVFyRTtJQUtJLDRCQUFvQixlQUFnQztRQUFoQyxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFIcEQsV0FBTSxHQUFZLElBQUksQ0FBQztRQUluQixxREFBcUQ7SUFDekQsQ0FBQztJQUVELHFDQUFRLEdBQVI7UUFDSSxJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztRQUNuQixJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7UUFDekIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO1FBQzlCLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQztRQUM5QixJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUM7UUFDaEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO1FBRTdCLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNsQixDQUFDO0lBRUQsc0JBQUksd0NBQVE7YUFBWjtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQzFCLENBQUM7YUFFRCxVQUFhLEtBQXFCO1lBQzlCLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1FBQzNCLENBQUM7OztPQUpBO0lBTUQsbUNBQU0sR0FBTjtRQUFBLGlCQXVCQztRQXRCRyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUVuQixJQUFNLElBQUksR0FBRyxtQkFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBRWhDLElBQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1FBQ3BELElBQUksT0FBTyxHQUFXLEdBQUcsQ0FBQztRQUMxQixFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNoQyxPQUFPLEdBQUcsV0FBVyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUMvQyxDQUFDO1FBQ0QsSUFBSSxDQUFDLGVBQWUsQ0FBQyw2QkFBNkIsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUMsU0FBUyxDQUN2RSxVQUFDLE1BQWdCO1lBRWIsS0FBSSxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUM7WUFDdkIsS0FBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFFeEIsQ0FBQyxFQUNELFVBQUMsS0FBSztZQUNGLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDbkIsdUJBQXVCO1lBQ3ZCLEtBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3hCLENBQUMsQ0FDSixDQUFDO0lBQ04sQ0FBQztJQW5EUSxrQkFBa0I7UUFOOUIsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxXQUFXO1lBQ3JCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixTQUFTLEVBQUUsQ0FBQyxrQ0FBZSxDQUFDO1lBQzVCLFdBQVcsRUFBRSw0QkFBNEI7U0FDNUMsQ0FBQzt5Q0FNdUMsa0NBQWU7T0FMM0Msa0JBQWtCLENBcUQ5QjtJQUFELHlCQUFDO0NBQUEsQUFyREQsSUFxREM7QUFyRFksZ0RBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBTZXR0aW5ncyB9IGZyb20gXCJ+L3NldHRpbmdzL3NldHRpbmdzXCI7XHJcbmltcG9ydCB7IE1hdGVyaWFsIH0gZnJvbSBcIn4vc2hhcmVkL21vZGVscy9tYXRlcmlhbC5tb2RlbFwiO1xyXG5pbXBvcnQgeyBNYXRlcmlhbFNlcnZpY2UgfSBmcm9tIFwifi9zaGFyZWQvc2VydmljZXMvbWF0ZXJpYWwuc2VydmljZVwiO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogXCJNYXRlcmlhbHNcIixcclxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcbiAgICBwcm92aWRlcnM6IFtNYXRlcmlhbFNlcnZpY2VdLFxyXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9tYXRlcmlhbHMuY29tcG9uZW50Lmh0bWxcIlxyXG59KVxyXG5leHBvcnQgY2xhc3MgTWF0ZXJpYWxzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuXHJcbiAgICBpc0J1c3k6IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgcHJpdmF0ZSBfbWF0ZXJpYWw6IGFueSB8IE1hdGVyaWFsO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgbWF0ZXJpYWxTZXJ2aWNlOiBNYXRlcmlhbFNlcnZpY2UpIHtcclxuICAgICAgICAvLyBVc2UgdGhlIGNvbXBvbmVudCBjb25zdHJ1Y3RvciB0byBpbmplY3QgcHJvdmlkZXJzLlxyXG4gICAgfVxyXG5cclxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMubWF0ZXJpYWwgPSB7fTtcclxuICAgICAgICB0aGlzLm1hdGVyaWFsLmd1aWRlID0ge307XHJcbiAgICAgICAgdGhpcy5tYXRlcmlhbC5iZWx0VG90YWxzID0gW107XHJcbiAgICAgICAgdGhpcy5tYXRlcmlhbC5zaXplVG90YWxzID0gW107XHJcbiAgICAgICAgdGhpcy5tYXRlcmlhbC5oZWxtZXRUb3RhbHMgPSBbXTtcclxuICAgICAgICB0aGlzLm1hdGVyaWFsLnVzZXJTaXplcyA9IFtdO1xyXG5cclxuICAgICAgICB0aGlzLnJlbG9hZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBtYXRlcmlhbCgpOiBNYXRlcmlhbCB8IGFueSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hdGVyaWFsO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBtYXRlcmlhbCh2YWx1ZTogTWF0ZXJpYWwgfCBhbnkpIHtcclxuICAgICAgICB0aGlzLl9tYXRlcmlhbCA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbG9hZCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmlzQnVzeSA9IHRydWU7XHJcblxyXG4gICAgICAgIGNvbnN0IGRhdGUgPSBTZXR0aW5ncy5nZXREYXRlKCk7XHJcblxyXG4gICAgICAgIGNvbnN0IGFwcFNldHRpbmdzID0gcmVxdWlyZShcImFwcGxpY2F0aW9uLXNldHRpbmdzXCIpO1xyXG4gICAgICAgIGxldCBndWlkZUlkOiBzdHJpbmcgPSBcIjNcIjtcclxuICAgICAgICBpZiAoYXBwU2V0dGluZ3MuaGFzS2V5KFwiZ3VpZGVJZFwiKSkge1xyXG4gICAgICAgICAgICBndWlkZUlkID0gYXBwU2V0dGluZ3MuZ2V0U3RyaW5nKFwiZ3VpZGVJZFwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5tYXRlcmlhbFNlcnZpY2UuZ2V0VG90YWxGb3JHdWlkZUFuZERhdGVBY3Rpb24oZ3VpZGVJZCwgZGF0ZSkuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgICAocmVzdWx0OiBNYXRlcmlhbCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMubWF0ZXJpYWwgPSByZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzQnVzeSA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgKGVycm9yKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmRpcihlcnJvcik7XHJcbiAgICAgICAgICAgICAgICAvKlRPRE86IGhhbmRsZSBlcnJvcnMqL1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pc0J1c3kgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==