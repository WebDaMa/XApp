"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var nativescript_angular_1 = require("nativescript-angular");
var page_1 = require("tns-core-modules/ui/page");
var settings_1 = require("~/settings/settings");
var guide_service_1 = require("~/shared/services/guide.service");
var router_1 = require("@angular/router");
var MaterialsSettingsComponent = /** @class */ (function () {
    function MaterialsSettingsComponent(guideService, page, routerExtensions, activeRoute) {
        this.guideService = guideService;
        this.page = page;
        this.routerExtensions = routerExtensions;
        this.activeRoute = activeRoute;
        this.guides = [];
        this.guideItems = {};
        this.selectedIndex = 0;
    }
    MaterialsSettingsComponent.prototype.ngOnInit = function () {
        this.getGuides();
    };
    MaterialsSettingsComponent.prototype.selectedIndexChanged = function (args) {
        var picker = args.object;
        var appSettings = require("tns-core-modules/application-settings");
        if (this.guides.length > 0) {
            appSettings.setNumber("guideIndex", picker.selectedIndex);
            this.guide = this.guides[picker.selectedIndex];
            appSettings.setString("guideId", this.guide.id);
        }
    };
    MaterialsSettingsComponent.prototype.getGuides = function () {
        var _this = this;
        var appSettings = require("tns-core-modules/application-settings");
        var locationId = settings_1.Settings.getLocation();
        var date = settings_1.Settings.getDate();
        this.isBusy = true;
        this.hasGuides = false;
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
                console.log("found me some guides");
                _this.selectedIndex = appSettings.hasKey("guideIndex") ?
                    appSettings.getNumber("guideIndex") : 0;
                _this.guide = _this.guides[_this.selectedIndex];
                appSettings.setString("guideId", _this.guide.id);
                _this.hasGuides = true;
            }
            _this.isBusy = false;
        }, function (error) {
            console.dir(error);
            _this.isBusy = false;
            /*TODO: handle errors*/
        });
    };
    MaterialsSettingsComponent.prototype.goBack = function () {
        this.routerExtensions.back({
            relativeTo: this.activeRoute
        });
    };
    MaterialsSettingsComponent = __decorate([
        core_1.Component({
            selector: "MaterialsSettings",
            moduleId: module.id,
            providers: [guide_service_1.GuideService],
            templateUrl: "./materials-settings.component.html"
        }),
        __metadata("design:paramtypes", [guide_service_1.GuideService, page_1.Page, nativescript_angular_1.RouterExtensions,
            router_1.ActivatedRoute])
    ], MaterialsSettingsComponent);
    return MaterialsSettingsComponent;
}());
exports.MaterialsSettingsComponent = MaterialsSettingsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0ZXJpYWxzLXNldHRpbmdzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1hdGVyaWFscy1zZXR0aW5ncy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBa0Q7QUFDbEQsNkRBQXdEO0FBRXhELGlEQUFnRDtBQUNoRCxnREFBK0M7QUFFL0MsaUVBQStEO0FBQy9ELDBDQUErQztBQVEvQztJQVFJLG9DQUFvQixZQUEwQixFQUFVLElBQVUsRUFBVSxnQkFBa0MsRUFDMUYsV0FBMkI7UUFEM0IsaUJBQVksR0FBWixZQUFZLENBQWM7UUFBVSxTQUFJLEdBQUosSUFBSSxDQUFNO1FBQVUscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUMxRixnQkFBVyxHQUFYLFdBQVcsQ0FBZ0I7UUFSL0MsV0FBTSxHQUFpQixFQUFFLENBQUM7UUFDMUIsZUFBVSxHQUFXLEVBQUUsQ0FBQztRQUd4QixrQkFBYSxHQUFXLENBQUMsQ0FBQztJQUsxQixDQUFDO0lBRUQsNkNBQVEsR0FBUjtRQUNJLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBRUQseURBQW9CLEdBQXBCLFVBQXFCLElBQUk7UUFDckIsSUFBTSxNQUFNLEdBQWUsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUN2QyxJQUFNLFdBQVcsR0FBRyxPQUFPLENBQUMsdUNBQXVDLENBQUMsQ0FBQztRQUVyRSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUN4QixXQUFXLENBQUMsU0FBUyxDQUFDLFlBQVksRUFBRSxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUM7WUFDMUQsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUMvQyxXQUFXLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQ25EO0lBRUwsQ0FBQztJQUVELDhDQUFTLEdBQVQ7UUFBQSxpQkF1Q0M7UUF0Q0csSUFBTSxXQUFXLEdBQUcsT0FBTyxDQUFDLHVDQUF1QyxDQUFDLENBQUM7UUFDckUsSUFBTSxVQUFVLEdBQUcsbUJBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUMxQyxJQUFNLElBQUksR0FBRyxtQkFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBRWhDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ25CLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxZQUFZLENBQUMsb0NBQW9DLENBQUMsSUFBSSxFQUFFLFVBQVUsQ0FBQzthQUNuRSxTQUFTLENBQ04sVUFBQyxNQUFvQjtZQUVqQixLQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztZQUVyQixJQUFJLEtBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtnQkFDeEIsS0FBSSxDQUFDLFVBQVUsR0FBRztvQkFDZCxLQUFLLEVBQUUsS0FBSSxDQUFDLE1BQU07b0JBQ2xCLE1BQU0sRUFBRSxLQUFJLENBQUMsTUFBTSxDQUFDLE1BQU07b0JBQzFCLE9BQU8sRUFBRSxVQUFDLEtBQUs7d0JBQ1gsSUFBTSxJQUFJLEdBQUcsS0FBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQzt3QkFFaEMsT0FBTyxJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssR0FBRyxJQUFJLENBQUMsY0FBYyxHQUFHLEtBQUssR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDO29CQUV0RixDQUFDO2lCQUNKLENBQUM7Z0JBQ0YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO2dCQUNwQyxLQUFJLENBQUMsYUFBYSxHQUFHLFdBQVcsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztvQkFDbkQsV0FBVyxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM1QyxLQUFJLENBQUMsS0FBSyxHQUFHLEtBQUksQ0FBQyxNQUFNLENBQUMsS0FBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO2dCQUM3QyxXQUFXLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRSxLQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUNoRCxLQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQzthQUN6QjtZQUNELEtBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3hCLENBQUMsRUFDRCxVQUFDLEtBQUs7WUFDRixPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ25CLEtBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1lBQ3BCLHVCQUF1QjtRQUMzQixDQUFDLENBQ0osQ0FBQztJQUNWLENBQUM7SUFFRCwyQ0FBTSxHQUFOO1FBQ0ksSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQztZQUN2QixVQUFVLEVBQUUsSUFBSSxDQUFDLFdBQVc7U0FDL0IsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQXpFUSwwQkFBMEI7UUFOdEMsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxtQkFBbUI7WUFDN0IsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFNBQVMsRUFBRSxDQUFDLDRCQUFZLENBQUM7WUFDekIsV0FBVyxFQUFFLHFDQUFxQztTQUNyRCxDQUFDO3lDQVNvQyw0QkFBWSxFQUFnQixXQUFJLEVBQTRCLHVDQUFnQjtZQUM3RSx1QkFBYztPQVR0QywwQkFBMEIsQ0EyRXRDO0lBQUQsaUNBQUM7Q0FBQSxBQTNFRCxJQTJFQztBQTNFWSxnRUFBMEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXJcIjtcclxuaW1wb3J0IHsgTGlzdFBpY2tlciB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2xpc3QtcGlja2VyXCI7XHJcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9wYWdlXCI7XHJcbmltcG9ydCB7IFNldHRpbmdzIH0gZnJvbSBcIn4vc2V0dGluZ3Mvc2V0dGluZ3NcIjtcclxuaW1wb3J0IHsgR3VpZGUgfSBmcm9tIFwifi9zaGFyZWQvbW9kZWxzL2d1aWRlLm1vZGVsXCI7XHJcbmltcG9ydCB7IEd1aWRlU2VydmljZSB9IGZyb20gXCJ+L3NoYXJlZC9zZXJ2aWNlcy9ndWlkZS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7QWN0aXZhdGVkUm91dGV9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6IFwiTWF0ZXJpYWxzU2V0dGluZ3NcIixcclxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcbiAgICBwcm92aWRlcnM6IFtHdWlkZVNlcnZpY2VdLFxyXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9tYXRlcmlhbHMtc2V0dGluZ3MuY29tcG9uZW50Lmh0bWxcIlxyXG59KVxyXG5leHBvcnQgY2xhc3MgTWF0ZXJpYWxzU2V0dGluZ3NDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gICAgZ3VpZGVzOiBBcnJheTxHdWlkZT4gPSBbXTtcclxuICAgIGd1aWRlSXRlbXM6IG9iamVjdCA9IHt9O1xyXG4gICAgZ3VpZGU6IEd1aWRlO1xyXG4gICAgaGFzR3VpZGVzOiBib29sZWFuO1xyXG4gICAgc2VsZWN0ZWRJbmRleDogbnVtYmVyID0gMDtcclxuICAgIGlzQnVzeTogYm9vbGVhbjtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGd1aWRlU2VydmljZTogR3VpZGVTZXJ2aWNlLCBwcml2YXRlIHBhZ2U6IFBhZ2UsIHByaXZhdGUgcm91dGVyRXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9ucyxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgYWN0aXZlUm91dGU6IEFjdGl2YXRlZFJvdXRlKSB7XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5nZXRHdWlkZXMoKTtcclxuICAgIH1cclxuXHJcbiAgICBzZWxlY3RlZEluZGV4Q2hhbmdlZChhcmdzKSB7XHJcbiAgICAgICAgY29uc3QgcGlja2VyID0gPExpc3RQaWNrZXI+YXJncy5vYmplY3Q7XHJcbiAgICAgICAgY29uc3QgYXBwU2V0dGluZ3MgPSByZXF1aXJlKFwidG5zLWNvcmUtbW9kdWxlcy9hcHBsaWNhdGlvbi1zZXR0aW5nc1wiKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuZ3VpZGVzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgYXBwU2V0dGluZ3Muc2V0TnVtYmVyKFwiZ3VpZGVJbmRleFwiLCBwaWNrZXIuc2VsZWN0ZWRJbmRleCk7XHJcbiAgICAgICAgICAgIHRoaXMuZ3VpZGUgPSB0aGlzLmd1aWRlc1twaWNrZXIuc2VsZWN0ZWRJbmRleF07XHJcbiAgICAgICAgICAgIGFwcFNldHRpbmdzLnNldFN0cmluZyhcImd1aWRlSWRcIiwgdGhpcy5ndWlkZS5pZCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBnZXRHdWlkZXMoKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgYXBwU2V0dGluZ3MgPSByZXF1aXJlKFwidG5zLWNvcmUtbW9kdWxlcy9hcHBsaWNhdGlvbi1zZXR0aW5nc1wiKTtcclxuICAgICAgICBjb25zdCBsb2NhdGlvbklkID0gU2V0dGluZ3MuZ2V0TG9jYXRpb24oKTtcclxuICAgICAgICBjb25zdCBkYXRlID0gU2V0dGluZ3MuZ2V0RGF0ZSgpO1xyXG5cclxuICAgICAgICB0aGlzLmlzQnVzeSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5oYXNHdWlkZXMgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmd1aWRlU2VydmljZS5nZXRBbGxHdWlkZXNGb3JXZWVrQW5kTG9jYXRpb25BY3Rpb24oZGF0ZSwgbG9jYXRpb25JZClcclxuICAgICAgICAgICAgLnN1YnNjcmliZShcclxuICAgICAgICAgICAgICAgIChyZXN1bHQ6IEFycmF5PEd1aWRlPikgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmd1aWRlcyA9IHJlc3VsdDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZ3VpZGVzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ndWlkZUl0ZW1zID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbXM6IHRoaXMuZ3VpZGVzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVuZ3RoOiB0aGlzLmd1aWRlcy5sZW5ndGgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBnZXRJdGVtOiAoaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBpdGVtID0gdGhpcy5ndWlkZXNbaW5kZXhdO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXRlbS5ndWlkZVNob3J0ICsgXCIgLSBcIiArIGl0ZW0uZ3VpZGVGaXJzdE5hbWUgKyBcIiAtIFwiICsgaXRlbS5ndWlkZUxhc3ROYW1lO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJmb3VuZCBtZSBzb21lIGd1aWRlc1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEluZGV4ID0gYXBwU2V0dGluZ3MuaGFzS2V5KFwiZ3VpZGVJbmRleFwiKSA/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcHBTZXR0aW5ncy5nZXROdW1iZXIoXCJndWlkZUluZGV4XCIpIDogMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ndWlkZSA9IHRoaXMuZ3VpZGVzW3RoaXMuc2VsZWN0ZWRJbmRleF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFwcFNldHRpbmdzLnNldFN0cmluZyhcImd1aWRlSWRcIiwgdGhpcy5ndWlkZS5pZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGFzR3VpZGVzID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc0J1c3kgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAoZXJyb3IpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmRpcihlcnJvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc0J1c3kgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAvKlRPRE86IGhhbmRsZSBlcnJvcnMqL1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIGdvQmFjaygpIHtcclxuICAgICAgICB0aGlzLnJvdXRlckV4dGVuc2lvbnMuYmFjayh7XHJcbiAgICAgICAgICAgIHJlbGF0aXZlVG86IHRoaXMuYWN0aXZlUm91dGVcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbn1cclxuIl19