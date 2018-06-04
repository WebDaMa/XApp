"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var material_service_1 = require("~/shared/services/material.service");
var MaterialsComponent = /** @class */ (function () {
    function MaterialsComponent(materialService) {
        this.materialService = materialService;
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
        var appSettings = require("application-settings");
        var now = new Date();
        var date = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate();
        if (appSettings.hasKey("materialDate")) {
            date = appSettings.getString("materialDate");
        }
        var guideId = "3";
        if (appSettings.hasKey("guideId")) {
            guideId = appSettings.getString("guideId");
        }
        this.materialService.getTotalForGuideAndDateAction(guideId, date).subscribe(function (result) {
            _this.material = result;
        }, function (error) {
            console.dir(error);
            /*TODO: handle errors*/
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0ZXJpYWxzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1hdGVyaWFscy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBa0Q7QUFFbEQsdUVBQXFFO0FBUXJFO0lBR0ksNEJBQW9CLGVBQWdDO1FBQWhDLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUNoRCxxREFBcUQ7SUFDekQsQ0FBQztJQUVELHFDQUFRLEdBQVI7UUFDSSxJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztRQUNuQixJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7UUFDekIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO1FBQzlCLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQztRQUM5QixJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUM7UUFDaEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO1FBRTdCLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNsQixDQUFDO0lBRUQsc0JBQUksd0NBQVE7YUFBWjtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQzFCLENBQUM7YUFFRCxVQUFhLEtBQXFCO1lBQzlCLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1FBQzNCLENBQUM7OztPQUpBO0lBTUQsbUNBQU0sR0FBTjtRQUFBLGlCQXVCQztRQXRCRyxJQUFNLFdBQVcsR0FBRyxPQUFPLENBQUMsc0JBQXNCLENBQUMsQ0FBQztRQUVwRCxJQUFNLEdBQUcsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO1FBQ3ZCLElBQUksSUFBSSxHQUFXLEdBQUcsQ0FBQyxXQUFXLEVBQUUsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUN4RixFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNyQyxJQUFJLEdBQUcsV0FBVyxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUNqRCxDQUFDO1FBQ0QsSUFBSSxPQUFPLEdBQVcsR0FBRyxDQUFDO1FBQzFCLEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2hDLE9BQU8sR0FBRyxXQUFXLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQy9DLENBQUM7UUFDRCxJQUFJLENBQUMsZUFBZSxDQUFDLDZCQUE2QixDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQyxTQUFTLENBQ3ZFLFVBQUMsTUFBZ0I7WUFFYixLQUFJLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQztRQUUzQixDQUFDLEVBQ0QsVUFBQyxLQUFLO1lBQ0YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNuQix1QkFBdUI7UUFDM0IsQ0FBQyxDQUNKLENBQUM7SUFDTixDQUFDO0lBakRRLGtCQUFrQjtRQU45QixnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLFdBQVc7WUFDckIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFNBQVMsRUFBRSxDQUFDLGtDQUFlLENBQUM7WUFDNUIsV0FBVyxFQUFFLDRCQUE0QjtTQUM1QyxDQUFDO3lDQUl1QyxrQ0FBZTtPQUgzQyxrQkFBa0IsQ0FtRDlCO0lBQUQseUJBQUM7Q0FBQSxBQW5ERCxJQW1EQztBQW5EWSxnREFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IE1hdGVyaWFsIH0gZnJvbSBcIn4vc2hhcmVkL21vZGVscy9tYXRlcmlhbC5tb2RlbFwiO1xyXG5pbXBvcnQgeyBNYXRlcmlhbFNlcnZpY2UgfSBmcm9tIFwifi9zaGFyZWQvc2VydmljZXMvbWF0ZXJpYWwuc2VydmljZVwiO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogXCJNYXRlcmlhbHNcIixcclxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcbiAgICBwcm92aWRlcnM6IFtNYXRlcmlhbFNlcnZpY2VdLFxyXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9tYXRlcmlhbHMuY29tcG9uZW50Lmh0bWxcIlxyXG59KVxyXG5leHBvcnQgY2xhc3MgTWF0ZXJpYWxzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICAgIHByaXZhdGUgX21hdGVyaWFsOiBhbnkgfCBNYXRlcmlhbDtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIG1hdGVyaWFsU2VydmljZTogTWF0ZXJpYWxTZXJ2aWNlKSB7XHJcbiAgICAgICAgLy8gVXNlIHRoZSBjb21wb25lbnQgY29uc3RydWN0b3IgdG8gaW5qZWN0IHByb3ZpZGVycy5cclxuICAgIH1cclxuXHJcbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm1hdGVyaWFsID0ge307XHJcbiAgICAgICAgdGhpcy5tYXRlcmlhbC5ndWlkZSA9IHt9O1xyXG4gICAgICAgIHRoaXMubWF0ZXJpYWwuYmVsdFRvdGFscyA9IFtdO1xyXG4gICAgICAgIHRoaXMubWF0ZXJpYWwuc2l6ZVRvdGFscyA9IFtdO1xyXG4gICAgICAgIHRoaXMubWF0ZXJpYWwuaGVsbWV0VG90YWxzID0gW107XHJcbiAgICAgICAgdGhpcy5tYXRlcmlhbC51c2VyU2l6ZXMgPSBbXTtcclxuXHJcbiAgICAgICAgdGhpcy5yZWxvYWQoKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgbWF0ZXJpYWwoKTogTWF0ZXJpYWwgfCBhbnkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9tYXRlcmlhbDtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgbWF0ZXJpYWwodmFsdWU6IE1hdGVyaWFsIHwgYW55KSB7XHJcbiAgICAgICAgdGhpcy5fbWF0ZXJpYWwgPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICByZWxvYWQoKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgYXBwU2V0dGluZ3MgPSByZXF1aXJlKFwiYXBwbGljYXRpb24tc2V0dGluZ3NcIik7XHJcblxyXG4gICAgICAgIGNvbnN0IG5vdyA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgbGV0IGRhdGU6IHN0cmluZyA9IG5vdy5nZXRGdWxsWWVhcigpICsgXCItXCIgKyAobm93LmdldE1vbnRoKCkgKyAxKSArIFwiLVwiICsgbm93LmdldERhdGUoKTtcclxuICAgICAgICBpZiAoYXBwU2V0dGluZ3MuaGFzS2V5KFwibWF0ZXJpYWxEYXRlXCIpKSB7XHJcbiAgICAgICAgICAgIGRhdGUgPSBhcHBTZXR0aW5ncy5nZXRTdHJpbmcoXCJtYXRlcmlhbERhdGVcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBndWlkZUlkOiBzdHJpbmcgPSBcIjNcIjtcclxuICAgICAgICBpZiAoYXBwU2V0dGluZ3MuaGFzS2V5KFwiZ3VpZGVJZFwiKSkge1xyXG4gICAgICAgICAgICBndWlkZUlkID0gYXBwU2V0dGluZ3MuZ2V0U3RyaW5nKFwiZ3VpZGVJZFwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5tYXRlcmlhbFNlcnZpY2UuZ2V0VG90YWxGb3JHdWlkZUFuZERhdGVBY3Rpb24oZ3VpZGVJZCwgZGF0ZSkuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgICAocmVzdWx0OiBNYXRlcmlhbCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMubWF0ZXJpYWwgPSByZXN1bHQ7XHJcblxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAoZXJyb3IpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZGlyKGVycm9yKTtcclxuICAgICAgICAgICAgICAgIC8qVE9ETzogaGFuZGxlIGVycm9ycyovXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=