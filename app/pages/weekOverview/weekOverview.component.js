"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var settings_1 = require("~/settings/settings");
var guide_service_1 = require("~/shared/services/guide.service");
var planning_service_1 = require("~/shared/services/planning.service");
var WeekOverviewComponent = /** @class */ (function () {
    function WeekOverviewComponent(planningService, guideService) {
        this.planningService = planningService;
        this.guideService = guideService;
        this.isBusy = true;
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
        var appSettings = require("application-settings");
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
            _this.getWeekPlanning();
        }, function (error) {
            console.dir(error);
            /*TODO: handle errors*/
        });
    };
    WeekOverviewComponent.prototype.getDayOfWeek = function (date) {
        var dateObj = new Date(date);
        var day = dateObj.getDay();
        return this.days[day];
    };
    WeekOverviewComponent = __decorate([
        core_1.Component({
            selector: "WeekOverview",
            moduleId: module.id,
            providers: [guide_service_1.GuideService, planning_service_1.PlanningService],
            templateUrl: "./weekOverview.component.html"
        }),
        __metadata("design:paramtypes", [planning_service_1.PlanningService, guide_service_1.GuideService])
    ], WeekOverviewComponent);
    return WeekOverviewComponent;
}());
exports.WeekOverviewComponent = WeekOverviewComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2Vla092ZXJ2aWV3LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIndlZWtPdmVydmlldy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBa0Q7QUFDbEQsZ0RBQStDO0FBRy9DLGlFQUErRDtBQUMvRCx1RUFBcUU7QUFRckU7SUFVSSwrQkFBb0IsZUFBZ0MsRUFBVSxZQUEwQjtRQUFwRSxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFBVSxpQkFBWSxHQUFaLFlBQVksQ0FBYztRQVJ4RixXQUFNLEdBQVksSUFBSSxDQUFDO1FBRXZCLFdBQU0sR0FBa0IsRUFBRSxDQUFDO1FBRTNCLFNBQUksR0FBa0IsQ0FBQyxRQUFRLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUV2RyxjQUFTLEdBQW9CLEVBQUUsQ0FBQztRQUc1QixxREFBcUQ7SUFDekQsQ0FBQztJQUVELHdDQUFRLEdBQVI7UUFDSSxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUVELCtDQUFlLEdBQWY7UUFBQSxpQkE0QkM7UUEzQkcsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFFbkIsSUFBTSxJQUFJLEdBQUcsbUJBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNoQyxJQUFNLFFBQVEsR0FBRyxtQkFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBRXhDLElBQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1FBRXBELElBQUksT0FBTyxHQUFXLEdBQUcsQ0FBQztRQUMxQixFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNoQyxPQUFPLEdBQUcsV0FBVyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUMvQyxDQUFDO1FBRUQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxxQ0FBcUMsQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLFFBQVEsQ0FBQzthQUM5RSxTQUFTLENBQ1YsVUFBQyxNQUF1QjtZQUVwQixLQUFJLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQztZQUV4QixPQUFPLENBQUMsR0FBRyxDQUFDLHlCQUF5QixDQUFDLENBQUM7WUFDdkMsS0FBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFFeEIsQ0FBQyxFQUNELFVBQUMsS0FBSztZQUNGLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDbkIsS0FBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDeEIsQ0FBQyxDQUNKLENBQUM7SUFDTixDQUFDO0lBRUQseUNBQVMsR0FBVDtRQUFBLGlCQXNCQztRQXJCRyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUNuQixJQUFNLFVBQVUsR0FBRyxtQkFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQzFDLElBQU0sSUFBSSxHQUFHLG1CQUFRLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDaEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxvQ0FBb0MsQ0FBQyxJQUFJLEVBQUUsVUFBVSxDQUFDO2FBQ25FLFNBQVMsQ0FDTixVQUFDLE1BQW9CO1lBQ2pCLEtBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBQyxDQUFDLENBQUM7WUFDdkMsS0FBSSxDQUFDLE1BQU0sR0FBTyxLQUFJLENBQUMsTUFBTSxRQUFLLE1BQU0sQ0FBQyxHQUFHLENBQ3hDLFVBQUMsRUFBaUQ7b0JBQS9DLFVBQUUsRUFBRSwwQkFBVSxFQUFFLGtDQUFjLEVBQUUsZ0NBQWE7Z0JBQU8sT0FBQSxDQUNuRCxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLFVBQVUsR0FBRyxLQUFLLEdBQUcsY0FBYyxHQUFHLEdBQUcsR0FBRyxhQUFhLEVBQUUsQ0FBQztZQUQzQixDQUMyQixDQUFDLENBQUMsQ0FBQztZQUV6RixPQUFPLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDLENBQUM7WUFDckMsS0FBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBRTNCLENBQUMsRUFDRCxVQUFDLEtBQUs7WUFDRixPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ25CLHVCQUF1QjtRQUMzQixDQUFDLENBQ0osQ0FBQztJQUVWLENBQUM7SUFFRCw0Q0FBWSxHQUFaLFVBQWEsSUFBSTtRQUNiLElBQU0sT0FBTyxHQUFHLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRS9CLElBQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUU3QixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUUxQixDQUFDO0lBL0VRLHFCQUFxQjtRQU5qQyxnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLGNBQWM7WUFDeEIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFNBQVMsRUFBRSxDQUFDLDRCQUFZLEVBQUUsa0NBQWUsQ0FBQztZQUMxQyxXQUFXLEVBQUUsK0JBQStCO1NBQy9DLENBQUM7eUNBV3VDLGtDQUFlLEVBQXdCLDRCQUFZO09BVi9FLHFCQUFxQixDQWlGakM7SUFBRCw0QkFBQztDQUFBLEFBakZELElBaUZDO0FBakZZLHNEQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgU2V0dGluZ3MgfSBmcm9tIFwifi9zZXR0aW5ncy9zZXR0aW5nc1wiO1xyXG5pbXBvcnQgeyBHdWlkZSB9IGZyb20gXCJ+L3NoYXJlZC9tb2RlbHMvZ3VpZGUubW9kZWxcIjtcclxuaW1wb3J0IHsgUGxhbm5pbmcgfSBmcm9tIFwifi9zaGFyZWQvbW9kZWxzL3BsYW5uaW5nLm1vZGVsXCI7XHJcbmltcG9ydCB7IEd1aWRlU2VydmljZSB9IGZyb20gXCJ+L3NoYXJlZC9zZXJ2aWNlcy9ndWlkZS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IFBsYW5uaW5nU2VydmljZSB9IGZyb20gXCJ+L3NoYXJlZC9zZXJ2aWNlcy9wbGFubmluZy5zZXJ2aWNlXCI7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiBcIldlZWtPdmVydmlld1wiLFxyXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICAgIHByb3ZpZGVyczogW0d1aWRlU2VydmljZSwgUGxhbm5pbmdTZXJ2aWNlXSxcclxuICAgIHRlbXBsYXRlVXJsOiBcIi4vd2Vla092ZXJ2aWV3LmNvbXBvbmVudC5odG1sXCJcclxufSlcclxuZXhwb3J0IGNsYXNzIFdlZWtPdmVydmlld0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcblxyXG4gICAgaXNCdXN5OiBib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgICBndWlkZXM6IEFycmF5PG9iamVjdD4gPSBbXTtcclxuXHJcbiAgICBkYXlzOiBBcnJheTxzdHJpbmc+ID0gW1wiWm9uZGFnXCIsIFwiTWFhbmRhZ1wiLCBcIkRpbnNkYWdcIiwgXCJXb2Vuc2RhZ1wiLCBcIkRvbmRlcmRhZ1wiLCBcIlZyaWpkYWdcIiwgXCJaYXRlcmRhZ1wiXTtcclxuXHJcbiAgICBwbGFubmluZ3M6IEFycmF5PFBsYW5uaW5nPiA9IFtdO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcGxhbm5pbmdTZXJ2aWNlOiBQbGFubmluZ1NlcnZpY2UsIHByaXZhdGUgZ3VpZGVTZXJ2aWNlOiBHdWlkZVNlcnZpY2UpIHtcclxuICAgICAgICAvLyBVc2UgdGhlIGNvbXBvbmVudCBjb25zdHJ1Y3RvciB0byBpbmplY3QgcHJvdmlkZXJzLlxyXG4gICAgfVxyXG5cclxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuZ2V0R3VpZGVzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0V2Vla1BsYW5uaW5nKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuaXNCdXN5ID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgY29uc3QgZGF0ZSA9IFNldHRpbmdzLmdldERhdGUoKTtcclxuICAgICAgICBjb25zdCBsb2NhdGlvbiA9IFNldHRpbmdzLmdldExvY2F0aW9uKCk7XHJcblxyXG4gICAgICAgIGNvbnN0IGFwcFNldHRpbmdzID0gcmVxdWlyZShcImFwcGxpY2F0aW9uLXNldHRpbmdzXCIpO1xyXG5cclxuICAgICAgICBsZXQgZ3VpZGVJZDogc3RyaW5nID0gXCIzXCI7XHJcbiAgICAgICAgaWYgKGFwcFNldHRpbmdzLmhhc0tleShcImd1aWRlSWRcIikpIHtcclxuICAgICAgICAgICAgZ3VpZGVJZCA9IGFwcFNldHRpbmdzLmdldFN0cmluZyhcImd1aWRlSWRcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnBsYW5uaW5nU2VydmljZS5nZXRBbGxCeUd1aWRlQW5kV2Vla0FuZExvY2F0aW9uQWN0aW9uKGd1aWRlSWQsIGRhdGUsIGxvY2F0aW9uKVxyXG4gICAgICAgICAgICAuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgICAocmVzdWx0OiBBcnJheTxQbGFubmluZz4pID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLnBsYW5uaW5ncyA9IHJlc3VsdDtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkZvdW5kIG1lIHNvbWUgUGxhbm5pbmchXCIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pc0J1c3kgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5kaXIoZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pc0J1c3kgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0R3VpZGVzKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuaXNCdXN5ID0gdHJ1ZTtcclxuICAgICAgICBjb25zdCBsb2NhdGlvbklkID0gU2V0dGluZ3MuZ2V0TG9jYXRpb24oKTtcclxuICAgICAgICBjb25zdCBkYXRlID0gU2V0dGluZ3MuZ2V0RGF0ZSgpO1xyXG4gICAgICAgIHRoaXMuZ3VpZGVTZXJ2aWNlLmdldEFsbEd1aWRlc0ZvcldlZWtBbmRMb2NhdGlvbkFjdGlvbihkYXRlLCBsb2NhdGlvbklkKVxyXG4gICAgICAgICAgICAuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgICAgICAgKHJlc3VsdDogQXJyYXk8R3VpZGU+KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ndWlkZXMgPSBbe2tleTogXCIwXCIsIGxhYmVsOiBcIi9cIn1dO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ3VpZGVzID0gWy4uLnRoaXMuZ3VpZGVzLCAuLi5yZXN1bHQubWFwKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAoeyBpZCwgZ3VpZGVTaG9ydCwgZ3VpZGVGaXJzdE5hbWUsIGd1aWRlTGFzdE5hbWUgfSkgPT4gKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBrZXk6IGlkLCBsYWJlbDogZ3VpZGVTaG9ydCArIFwiIC0gXCIgKyBndWlkZUZpcnN0TmFtZSArIFwiIFwiICsgZ3VpZGVMYXN0TmFtZSB9KSldO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkZvdW5kIG1lIHNvbWUgR3VpZGVzIVwiKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdldFdlZWtQbGFubmluZygpO1xyXG5cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAoZXJyb3IpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmRpcihlcnJvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgLypUT0RPOiBoYW5kbGUgZXJyb3JzKi9cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0RGF5T2ZXZWVrKGRhdGUpOiBzdHJpbmcge1xyXG4gICAgICAgIGNvbnN0IGRhdGVPYmogPSBuZXcgRGF0ZShkYXRlKTtcclxuXHJcbiAgICAgICAgY29uc3QgZGF5ID0gZGF0ZU9iai5nZXREYXkoKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF5c1tkYXldO1xyXG5cclxuICAgIH1cclxuXHJcbn1cclxuIl19