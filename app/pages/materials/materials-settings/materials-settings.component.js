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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0ZXJpYWxzLXNldHRpbmdzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1hdGVyaWFscy1zZXR0aW5ncy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBa0Q7QUFDbEQsNkRBQXdEO0FBRXhELGlEQUFnRDtBQUNoRCxnREFBK0M7QUFFL0MsaUVBQStEO0FBQy9ELDBDQUErQztBQVEvQztJQVFJLG9DQUFvQixZQUEwQixFQUFVLElBQVUsRUFBVSxnQkFBa0MsRUFDMUYsV0FBMkI7UUFEM0IsaUJBQVksR0FBWixZQUFZLENBQWM7UUFBVSxTQUFJLEdBQUosSUFBSSxDQUFNO1FBQVUscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUMxRixnQkFBVyxHQUFYLFdBQVcsQ0FBZ0I7UUFSL0MsV0FBTSxHQUFpQixFQUFFLENBQUM7UUFDMUIsZUFBVSxHQUFXLEVBQUUsQ0FBQztRQUd4QixrQkFBYSxHQUFXLENBQUMsQ0FBQztJQUsxQixDQUFDO0lBRUQsNkNBQVEsR0FBUjtRQUNJLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBRUQseURBQW9CLEdBQXBCLFVBQXFCLElBQUk7UUFDckIsSUFBTSxNQUFNLEdBQWUsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUN2QyxJQUFNLFdBQVcsR0FBRyxPQUFPLENBQUMsc0JBQXNCLENBQUMsQ0FBQztRQUVwRCxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUN4QixXQUFXLENBQUMsU0FBUyxDQUFDLFlBQVksRUFBRSxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUM7WUFDMUQsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUMvQyxXQUFXLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQ25EO0lBRUwsQ0FBQztJQUVELDhDQUFTLEdBQVQ7UUFBQSxpQkF1Q0M7UUF0Q0csSUFBTSxXQUFXLEdBQUcsT0FBTyxDQUFDLHNCQUFzQixDQUFDLENBQUM7UUFDcEQsSUFBTSxVQUFVLEdBQUcsbUJBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUMxQyxJQUFNLElBQUksR0FBRyxtQkFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBRWhDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ25CLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxZQUFZLENBQUMsb0NBQW9DLENBQUMsSUFBSSxFQUFFLFVBQVUsQ0FBQzthQUNuRSxTQUFTLENBQ04sVUFBQyxNQUFvQjtZQUVqQixLQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztZQUVyQixJQUFJLEtBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtnQkFDeEIsS0FBSSxDQUFDLFVBQVUsR0FBRztvQkFDZCxLQUFLLEVBQUUsS0FBSSxDQUFDLE1BQU07b0JBQ2xCLE1BQU0sRUFBRSxLQUFJLENBQUMsTUFBTSxDQUFDLE1BQU07b0JBQzFCLE9BQU8sRUFBRSxVQUFDLEtBQUs7d0JBQ1gsSUFBTSxJQUFJLEdBQUcsS0FBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQzt3QkFFaEMsT0FBTyxJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssR0FBRyxJQUFJLENBQUMsY0FBYyxHQUFHLEtBQUssR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDO29CQUV0RixDQUFDO2lCQUNKLENBQUM7Z0JBQ0YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO2dCQUNwQyxLQUFJLENBQUMsYUFBYSxHQUFHLFdBQVcsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztvQkFDbkQsV0FBVyxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM1QyxLQUFJLENBQUMsS0FBSyxHQUFHLEtBQUksQ0FBQyxNQUFNLENBQUMsS0FBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO2dCQUM3QyxXQUFXLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRSxLQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUNoRCxLQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQzthQUN6QjtZQUNELEtBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3hCLENBQUMsRUFDRCxVQUFDLEtBQUs7WUFDRixPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ25CLEtBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1lBQ3BCLHVCQUF1QjtRQUMzQixDQUFDLENBQ0osQ0FBQztJQUNWLENBQUM7SUFFRCwyQ0FBTSxHQUFOO1FBQ0ksSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQztZQUN2QixVQUFVLEVBQUUsSUFBSSxDQUFDLFdBQVc7U0FDL0IsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQXpFUSwwQkFBMEI7UUFOdEMsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxtQkFBbUI7WUFDN0IsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFNBQVMsRUFBRSxDQUFDLDRCQUFZLENBQUM7WUFDekIsV0FBVyxFQUFFLHFDQUFxQztTQUNyRCxDQUFDO3lDQVNvQyw0QkFBWSxFQUFnQixXQUFJLEVBQTRCLHVDQUFnQjtZQUM3RSx1QkFBYztPQVR0QywwQkFBMEIsQ0EyRXRDO0lBQUQsaUNBQUM7Q0FBQSxBQTNFRCxJQTJFQztBQTNFWSxnRUFBMEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXJcIjtcclxuaW1wb3J0IHsgTGlzdFBpY2tlciB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2xpc3QtcGlja2VyXCI7XHJcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9wYWdlXCI7XHJcbmltcG9ydCB7IFNldHRpbmdzIH0gZnJvbSBcIn4vc2V0dGluZ3Mvc2V0dGluZ3NcIjtcclxuaW1wb3J0IHsgR3VpZGUgfSBmcm9tIFwifi9zaGFyZWQvbW9kZWxzL2d1aWRlLm1vZGVsXCI7XHJcbmltcG9ydCB7IEd1aWRlU2VydmljZSB9IGZyb20gXCJ+L3NoYXJlZC9zZXJ2aWNlcy9ndWlkZS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7QWN0aXZhdGVkUm91dGV9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6IFwiTWF0ZXJpYWxzU2V0dGluZ3NcIixcclxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcbiAgICBwcm92aWRlcnM6IFtHdWlkZVNlcnZpY2VdLFxyXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9tYXRlcmlhbHMtc2V0dGluZ3MuY29tcG9uZW50Lmh0bWxcIlxyXG59KVxyXG5leHBvcnQgY2xhc3MgTWF0ZXJpYWxzU2V0dGluZ3NDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gICAgZ3VpZGVzOiBBcnJheTxHdWlkZT4gPSBbXTtcclxuICAgIGd1aWRlSXRlbXM6IG9iamVjdCA9IHt9O1xyXG4gICAgZ3VpZGU6IEd1aWRlO1xyXG4gICAgaGFzR3VpZGVzOiBib29sZWFuO1xyXG4gICAgc2VsZWN0ZWRJbmRleDogbnVtYmVyID0gMDtcclxuICAgIGlzQnVzeTogYm9vbGVhbjtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGd1aWRlU2VydmljZTogR3VpZGVTZXJ2aWNlLCBwcml2YXRlIHBhZ2U6IFBhZ2UsIHByaXZhdGUgcm91dGVyRXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9ucyxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgYWN0aXZlUm91dGU6IEFjdGl2YXRlZFJvdXRlKSB7XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5nZXRHdWlkZXMoKTtcclxuICAgIH1cclxuXHJcbiAgICBzZWxlY3RlZEluZGV4Q2hhbmdlZChhcmdzKSB7XHJcbiAgICAgICAgY29uc3QgcGlja2VyID0gPExpc3RQaWNrZXI+YXJncy5vYmplY3Q7XHJcbiAgICAgICAgY29uc3QgYXBwU2V0dGluZ3MgPSByZXF1aXJlKFwiYXBwbGljYXRpb24tc2V0dGluZ3NcIik7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmd1aWRlcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGFwcFNldHRpbmdzLnNldE51bWJlcihcImd1aWRlSW5kZXhcIiwgcGlja2VyLnNlbGVjdGVkSW5kZXgpO1xyXG4gICAgICAgICAgICB0aGlzLmd1aWRlID0gdGhpcy5ndWlkZXNbcGlja2VyLnNlbGVjdGVkSW5kZXhdO1xyXG4gICAgICAgICAgICBhcHBTZXR0aW5ncy5zZXRTdHJpbmcoXCJndWlkZUlkXCIsIHRoaXMuZ3VpZGUuaWQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0R3VpZGVzKCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IGFwcFNldHRpbmdzID0gcmVxdWlyZShcImFwcGxpY2F0aW9uLXNldHRpbmdzXCIpO1xyXG4gICAgICAgIGNvbnN0IGxvY2F0aW9uSWQgPSBTZXR0aW5ncy5nZXRMb2NhdGlvbigpO1xyXG4gICAgICAgIGNvbnN0IGRhdGUgPSBTZXR0aW5ncy5nZXREYXRlKCk7XHJcblxyXG4gICAgICAgIHRoaXMuaXNCdXN5ID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmhhc0d1aWRlcyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuZ3VpZGVTZXJ2aWNlLmdldEFsbEd1aWRlc0ZvcldlZWtBbmRMb2NhdGlvbkFjdGlvbihkYXRlLCBsb2NhdGlvbklkKVxyXG4gICAgICAgICAgICAuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgICAgICAgKHJlc3VsdDogQXJyYXk8R3VpZGU+KSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ3VpZGVzID0gcmVzdWx0O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5ndWlkZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmd1aWRlSXRlbXMgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtczogdGhpcy5ndWlkZXMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZW5ndGg6IHRoaXMuZ3VpZGVzLmxlbmd0aCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdldEl0ZW06IChpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSB0aGlzLmd1aWRlc1tpbmRleF07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpdGVtLmd1aWRlU2hvcnQgKyBcIiAtIFwiICsgaXRlbS5ndWlkZUZpcnN0TmFtZSArIFwiIC0gXCIgKyBpdGVtLmd1aWRlTGFzdE5hbWU7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImZvdW5kIG1lIHNvbWUgZ3VpZGVzXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkSW5kZXggPSBhcHBTZXR0aW5ncy5oYXNLZXkoXCJndWlkZUluZGV4XCIpID9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFwcFNldHRpbmdzLmdldE51bWJlcihcImd1aWRlSW5kZXhcIikgOiAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmd1aWRlID0gdGhpcy5ndWlkZXNbdGhpcy5zZWxlY3RlZEluZGV4XTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXBwU2V0dGluZ3Muc2V0U3RyaW5nKFwiZ3VpZGVJZFwiLCB0aGlzLmd1aWRlLmlkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oYXNHdWlkZXMgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzQnVzeSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZGlyKGVycm9yKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzQnVzeSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIC8qVE9ETzogaGFuZGxlIGVycm9ycyovXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgZ29CYWNrKCkge1xyXG4gICAgICAgIHRoaXMucm91dGVyRXh0ZW5zaW9ucy5iYWNrKHtcclxuICAgICAgICAgICAgcmVsYXRpdmVUbzogdGhpcy5hY3RpdmVSb3V0ZVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=