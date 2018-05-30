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
        var guideId = 3;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0ZXJpYWxzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1hdGVyaWFscy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBa0Q7QUFLbEQsdUVBQXFFO0FBUXJFO0lBR0ksNEJBQW9CLGVBQWdDO1FBQWhDLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUNoRCxxREFBcUQ7SUFDekQsQ0FBQztJQUVELHFDQUFRLEdBQVI7UUFDSSxJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztRQUNuQixJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7UUFDekIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO1FBQzlCLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQztRQUM5QixJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUM7UUFDaEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO1FBRTdCLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNsQixDQUFDO0lBRUQsc0JBQUksd0NBQVE7YUFBWjtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQzFCLENBQUM7YUFFRCxVQUFhLEtBQXFCO1lBQzlCLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1FBQzNCLENBQUM7OztPQUpBO0lBTUQsbUNBQU0sR0FBTjtRQUFBLGlCQXVCQztRQXRCRyxJQUFNLFdBQVcsR0FBRyxPQUFPLENBQUMsc0JBQXNCLENBQUMsQ0FBQztRQUVwRCxJQUFNLEdBQUcsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO1FBQ3ZCLElBQUksSUFBSSxHQUFXLEdBQUcsQ0FBQyxXQUFXLEVBQUUsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUN4RixFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNyQyxJQUFJLEdBQUcsV0FBVyxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUNqRCxDQUFDO1FBQ0QsSUFBSSxPQUFPLEdBQVcsQ0FBQyxDQUFDO1FBQ3hCLEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2hDLE9BQU8sR0FBRyxXQUFXLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQy9DLENBQUM7UUFDRCxJQUFJLENBQUMsZUFBZSxDQUFDLDZCQUE2QixDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQyxTQUFTLENBQ3ZFLFVBQUMsTUFBZ0I7WUFFYixLQUFJLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQztRQUUzQixDQUFDLEVBQ0QsVUFBQyxLQUFLO1lBQ0YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNuQix1QkFBdUI7UUFDM0IsQ0FBQyxDQUNKLENBQUM7SUFDTixDQUFDO0lBakRRLGtCQUFrQjtRQU45QixnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLFdBQVc7WUFDckIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFNBQVMsRUFBRSxDQUFDLGtDQUFlLENBQUM7WUFDNUIsV0FBVyxFQUFFLDRCQUE0QjtTQUM1QyxDQUFDO3lDQUl1QyxrQ0FBZTtPQUgzQyxrQkFBa0IsQ0FtRDlCO0lBQUQseUJBQUM7Q0FBQSxBQW5ERCxJQW1EQztBQW5EWSxnREFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xyXG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyXCI7XHJcbmltcG9ydCB7IExvY2F0aW9uIH0gZnJvbSBcIn4vc2hhcmVkL21vZGVscy9sb2NhdGlvbi5tb2RlbFwiO1xyXG5pbXBvcnQgeyBNYXRlcmlhbCB9IGZyb20gXCJ+L3NoYXJlZC9tb2RlbHMvbWF0ZXJpYWwubW9kZWxcIjtcclxuaW1wb3J0IHsgTWF0ZXJpYWxTZXJ2aWNlIH0gZnJvbSBcIn4vc2hhcmVkL3NlcnZpY2VzL21hdGVyaWFsLnNlcnZpY2VcIjtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6IFwiTWF0ZXJpYWxzXCIsXHJcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxyXG4gICAgcHJvdmlkZXJzOiBbTWF0ZXJpYWxTZXJ2aWNlXSxcclxuICAgIHRlbXBsYXRlVXJsOiBcIi4vbWF0ZXJpYWxzLmNvbXBvbmVudC5odG1sXCJcclxufSlcclxuZXhwb3J0IGNsYXNzIE1hdGVyaWFsc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgICBwcml2YXRlIF9tYXRlcmlhbDogYW55IHwgTWF0ZXJpYWw7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBtYXRlcmlhbFNlcnZpY2U6IE1hdGVyaWFsU2VydmljZSkge1xyXG4gICAgICAgIC8vIFVzZSB0aGUgY29tcG9uZW50IGNvbnN0cnVjdG9yIHRvIGluamVjdCBwcm92aWRlcnMuXHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5tYXRlcmlhbCA9IHt9O1xyXG4gICAgICAgIHRoaXMubWF0ZXJpYWwuZ3VpZGUgPSB7fTtcclxuICAgICAgICB0aGlzLm1hdGVyaWFsLmJlbHRUb3RhbHMgPSBbXTtcclxuICAgICAgICB0aGlzLm1hdGVyaWFsLnNpemVUb3RhbHMgPSBbXTtcclxuICAgICAgICB0aGlzLm1hdGVyaWFsLmhlbG1ldFRvdGFscyA9IFtdO1xyXG4gICAgICAgIHRoaXMubWF0ZXJpYWwudXNlclNpemVzID0gW107XHJcblxyXG4gICAgICAgIHRoaXMucmVsb2FkKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IG1hdGVyaWFsKCk6IE1hdGVyaWFsIHwgYW55IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbWF0ZXJpYWw7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IG1hdGVyaWFsKHZhbHVlOiBNYXRlcmlhbCB8IGFueSkge1xyXG4gICAgICAgIHRoaXMuX21hdGVyaWFsID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgcmVsb2FkKCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IGFwcFNldHRpbmdzID0gcmVxdWlyZShcImFwcGxpY2F0aW9uLXNldHRpbmdzXCIpO1xyXG5cclxuICAgICAgICBjb25zdCBub3cgPSBuZXcgRGF0ZSgpO1xyXG4gICAgICAgIGxldCBkYXRlOiBzdHJpbmcgPSBub3cuZ2V0RnVsbFllYXIoKSArIFwiLVwiICsgKG5vdy5nZXRNb250aCgpICsgMSkgKyBcIi1cIiArIG5vdy5nZXREYXRlKCk7XHJcbiAgICAgICAgaWYgKGFwcFNldHRpbmdzLmhhc0tleShcIm1hdGVyaWFsRGF0ZVwiKSkge1xyXG4gICAgICAgICAgICBkYXRlID0gYXBwU2V0dGluZ3MuZ2V0U3RyaW5nKFwibWF0ZXJpYWxEYXRlXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgZ3VpZGVJZDogbnVtYmVyID0gMztcclxuICAgICAgICBpZiAoYXBwU2V0dGluZ3MuaGFzS2V5KFwiZ3VpZGVJZFwiKSkge1xyXG4gICAgICAgICAgICBndWlkZUlkID0gYXBwU2V0dGluZ3MuZ2V0U3RyaW5nKFwiZ3VpZGVJZFwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5tYXRlcmlhbFNlcnZpY2UuZ2V0VG90YWxGb3JHdWlkZUFuZERhdGVBY3Rpb24oZ3VpZGVJZCwgZGF0ZSkuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgICAocmVzdWx0OiBNYXRlcmlhbCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMubWF0ZXJpYWwgPSByZXN1bHQ7XHJcblxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAoZXJyb3IpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZGlyKGVycm9yKTtcclxuICAgICAgICAgICAgICAgIC8qVE9ETzogaGFuZGxlIGVycm9ycyovXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=