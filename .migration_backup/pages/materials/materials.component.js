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
        var locationId = "1";
        if (appSettings.hasKey("locationId")) {
            locationId = appSettings.getString("locationId");
        }
        if (appSettings.hasKey("guideId")) {
            guideId = appSettings.getString("guideId");
        }
        this.materialService.getTotalForGuideDateAndLocationAction(guideId, date, locationId).subscribe(function (result) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0ZXJpYWxzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1hdGVyaWFscy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBa0Q7QUFFbEQsa0RBQW9EO0FBQ3BELGdEQUErQztBQUUvQyx1RUFBcUU7QUFRckU7SUFLSSw0QkFBb0IsZUFBZ0M7UUFBaEMsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBSHBELFdBQU0sR0FBWSxJQUFJLENBQUM7UUFJbkIscURBQXFEO0lBQ3pELENBQUM7SUFFRCxxQ0FBUSxHQUFSO1FBQ0ksSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7UUFDbkIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQztRQUM5QixJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7UUFDOUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDO1FBQ2hDLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztRQUU3QixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDbEIsQ0FBQztJQUVELHNCQUFJLHdDQUFRO2FBQVo7WUFDSSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDMUIsQ0FBQzthQUVELFVBQWEsS0FBcUI7WUFDOUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7UUFDM0IsQ0FBQzs7O09BSkE7SUFNRCxtQ0FBTSxHQUFOO1FBQUEsaUJBMkJDO1FBMUJHLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBRW5CLElBQU0sSUFBSSxHQUFHLG1CQUFRLENBQUMsT0FBTyxFQUFFLENBQUM7UUFFaEMsSUFBTSxXQUFXLEdBQUcsT0FBTyxDQUFDLHVDQUF1QyxDQUFDLENBQUM7UUFDckUsSUFBSSxPQUFPLEdBQVcsR0FBRyxDQUFDO1FBQzFCLElBQUksVUFBVSxHQUFXLEdBQUcsQ0FBQztRQUM3QixJQUFJLFdBQVcsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLEVBQUU7WUFDbEMsVUFBVSxHQUFHLFdBQVcsQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLENBQUM7U0FDcEQ7UUFDRCxJQUFJLFdBQVcsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLEVBQUU7WUFDL0IsT0FBTyxHQUFHLFdBQVcsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDOUM7UUFDRCxJQUFJLENBQUMsZUFBZSxDQUFDLHFDQUFxQyxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsVUFBVSxDQUFDLENBQUMsU0FBUyxDQUMzRixVQUFDLE1BQWdCO1lBRWIsS0FBSSxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUM7WUFDdkIsS0FBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFFeEIsQ0FBQyxFQUNELFVBQUMsS0FBSztZQUNGLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDbkIsdUJBQXVCO1lBQ3ZCLEtBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3hCLENBQUMsQ0FDSixDQUFDO0lBQ04sQ0FBQztJQUVELDhDQUFpQixHQUFqQjtRQUNJLElBQU0sVUFBVSxHQUFrQixHQUFHLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDcEQsVUFBVSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQzVCLENBQUM7SUE1RFEsa0JBQWtCO1FBTjlCLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsV0FBVztZQUNyQixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsU0FBUyxFQUFFLENBQUMsa0NBQWUsQ0FBQztZQUM1QixXQUFXLEVBQUUsNEJBQTRCO1NBQzVDLENBQUM7eUNBTXVDLGtDQUFlO09BTDNDLGtCQUFrQixDQThEOUI7SUFBRCx5QkFBQztDQUFBLEFBOURELElBOERDO0FBOURZLGdEQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgUmFkU2lkZURyYXdlciB9IGZyb20gXCJuYXRpdmVzY3JpcHQtdWktc2lkZWRyYXdlclwiO1xyXG5pbXBvcnQgKiBhcyBhcHAgZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvYXBwbGljYXRpb25cIjtcclxuaW1wb3J0IHsgU2V0dGluZ3MgfSBmcm9tIFwifi9zZXR0aW5ncy9zZXR0aW5nc1wiO1xyXG5pbXBvcnQgeyBNYXRlcmlhbCB9IGZyb20gXCJ+L3NoYXJlZC9tb2RlbHMvbWF0ZXJpYWwubW9kZWxcIjtcclxuaW1wb3J0IHsgTWF0ZXJpYWxTZXJ2aWNlIH0gZnJvbSBcIn4vc2hhcmVkL3NlcnZpY2VzL21hdGVyaWFsLnNlcnZpY2VcIjtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6IFwiTWF0ZXJpYWxzXCIsXHJcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxyXG4gICAgcHJvdmlkZXJzOiBbTWF0ZXJpYWxTZXJ2aWNlXSxcclxuICAgIHRlbXBsYXRlVXJsOiBcIi4vbWF0ZXJpYWxzLmNvbXBvbmVudC5odG1sXCJcclxufSlcclxuZXhwb3J0IGNsYXNzIE1hdGVyaWFsc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcblxyXG4gICAgaXNCdXN5OiBib29sZWFuID0gdHJ1ZTtcclxuICAgIHByaXZhdGUgX21hdGVyaWFsOiBhbnkgfCBNYXRlcmlhbDtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIG1hdGVyaWFsU2VydmljZTogTWF0ZXJpYWxTZXJ2aWNlKSB7XHJcbiAgICAgICAgLy8gVXNlIHRoZSBjb21wb25lbnQgY29uc3RydWN0b3IgdG8gaW5qZWN0IHByb3ZpZGVycy5cclxuICAgIH1cclxuXHJcbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm1hdGVyaWFsID0ge307XHJcbiAgICAgICAgdGhpcy5tYXRlcmlhbC5ndWlkZSA9IHt9O1xyXG4gICAgICAgIHRoaXMubWF0ZXJpYWwuYmVsdFRvdGFscyA9IFtdO1xyXG4gICAgICAgIHRoaXMubWF0ZXJpYWwuc2l6ZVRvdGFscyA9IFtdO1xyXG4gICAgICAgIHRoaXMubWF0ZXJpYWwuaGVsbWV0VG90YWxzID0gW107XHJcbiAgICAgICAgdGhpcy5tYXRlcmlhbC51c2VyU2l6ZXMgPSBbXTtcclxuXHJcbiAgICAgICAgdGhpcy5yZWxvYWQoKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgbWF0ZXJpYWwoKTogTWF0ZXJpYWwgfCBhbnkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9tYXRlcmlhbDtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgbWF0ZXJpYWwodmFsdWU6IE1hdGVyaWFsIHwgYW55KSB7XHJcbiAgICAgICAgdGhpcy5fbWF0ZXJpYWwgPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICByZWxvYWQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5pc0J1c3kgPSB0cnVlO1xyXG5cclxuICAgICAgICBjb25zdCBkYXRlID0gU2V0dGluZ3MuZ2V0RGF0ZSgpO1xyXG5cclxuICAgICAgICBjb25zdCBhcHBTZXR0aW5ncyA9IHJlcXVpcmUoXCJ0bnMtY29yZS1tb2R1bGVzL2FwcGxpY2F0aW9uLXNldHRpbmdzXCIpO1xyXG4gICAgICAgIGxldCBndWlkZUlkOiBzdHJpbmcgPSBcIjNcIjtcclxuICAgICAgICBsZXQgbG9jYXRpb25JZDogc3RyaW5nID0gXCIxXCI7XHJcbiAgICAgICAgaWYgKGFwcFNldHRpbmdzLmhhc0tleShcImxvY2F0aW9uSWRcIikpIHtcclxuICAgICAgICAgICAgbG9jYXRpb25JZCA9IGFwcFNldHRpbmdzLmdldFN0cmluZyhcImxvY2F0aW9uSWRcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChhcHBTZXR0aW5ncy5oYXNLZXkoXCJndWlkZUlkXCIpKSB7XHJcbiAgICAgICAgICAgIGd1aWRlSWQgPSBhcHBTZXR0aW5ncy5nZXRTdHJpbmcoXCJndWlkZUlkXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm1hdGVyaWFsU2VydmljZS5nZXRUb3RhbEZvckd1aWRlRGF0ZUFuZExvY2F0aW9uQWN0aW9uKGd1aWRlSWQsIGRhdGUsIGxvY2F0aW9uSWQpLnN1YnNjcmliZShcclxuICAgICAgICAgICAgKHJlc3VsdDogTWF0ZXJpYWwpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLm1hdGVyaWFsID0gcmVzdWx0O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pc0J1c3kgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5kaXIoZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgLypUT0RPOiBoYW5kbGUgZXJyb3JzKi9cclxuICAgICAgICAgICAgICAgIHRoaXMuaXNCdXN5ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIG9uRHJhd2VyQnV0dG9uVGFwKCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IHNpZGVEcmF3ZXIgPSA8UmFkU2lkZURyYXdlcj5hcHAuZ2V0Um9vdFZpZXcoKTtcclxuICAgICAgICBzaWRlRHJhd2VyLnNob3dEcmF3ZXIoKTtcclxuICAgIH1cclxuXHJcbn1cclxuIl19