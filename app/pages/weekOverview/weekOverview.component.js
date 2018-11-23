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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2Vla092ZXJ2aWV3LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIndlZWtPdmVydmlldy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBa0Q7QUFFbEQsa0RBQW9EO0FBQ3BELGlEQUFnRDtBQUNoRCxnREFBK0M7QUFHL0MsaUVBQStEO0FBQy9ELHVFQUFxRTtBQVFyRTtJQVVJLCtCQUFvQixlQUFnQyxFQUFVLFlBQTBCLEVBQ3BFLElBQVU7UUFEVixvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFBVSxpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUNwRSxTQUFJLEdBQUosSUFBSSxDQUFNO1FBUDlCLFdBQU0sR0FBa0IsRUFBRSxDQUFDO1FBRTNCLFNBQUksR0FBa0IsQ0FBQyxRQUFRLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUV2RyxjQUFTLEdBQW9CLEVBQUUsQ0FBQztRQUk1QixxREFBcUQ7SUFDekQsQ0FBQztJQUVELHdDQUFRLEdBQVI7UUFDSSxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUVELCtDQUFlLEdBQWY7UUFBQSxpQkE0QkM7UUEzQkcsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFFbkIsSUFBTSxJQUFJLEdBQUcsbUJBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNoQyxJQUFNLFFBQVEsR0FBRyxtQkFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBRXhDLElBQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1FBRXBELElBQUksT0FBTyxHQUFXLEdBQUcsQ0FBQztRQUMxQixJQUFJLFdBQVcsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLEVBQUU7WUFDL0IsT0FBTyxHQUFHLFdBQVcsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDOUM7UUFFRCxJQUFJLENBQUMsZUFBZSxDQUFDLHFDQUFxQyxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsUUFBUSxDQUFDO2FBQzlFLFNBQVMsQ0FDVixVQUFDLE1BQXVCO1lBRXBCLEtBQUksQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDO1lBRXhCLE9BQU8sQ0FBQyxHQUFHLENBQUMseUJBQXlCLENBQUMsQ0FBQztZQUN2QyxLQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUV4QixDQUFDLEVBQ0QsVUFBQyxLQUFLO1lBQ0YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNuQixLQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUN4QixDQUFDLENBQ0osQ0FBQztJQUNOLENBQUM7SUFFRCx5Q0FBUyxHQUFUO1FBQUEsaUJBd0JDO1FBdkJHLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ25CLElBQU0sVUFBVSxHQUFHLG1CQUFRLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDMUMsSUFBTSxJQUFJLEdBQUcsbUJBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNoQyxJQUFJLENBQUMsWUFBWSxDQUFDLG9DQUFvQyxDQUFDLElBQUksRUFBRSxVQUFVLENBQUM7YUFDbkUsU0FBUyxDQUNOLFVBQUMsTUFBb0I7WUFDakIsS0FBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFDLENBQUMsQ0FBQztZQUN2QyxLQUFJLENBQUMsTUFBTSxHQUFPLEtBQUksQ0FBQyxNQUFNLFFBQUssTUFBTSxDQUFDLEdBQUcsQ0FDeEMsVUFBQyxFQUFpRDtvQkFBL0MsVUFBRSxFQUFFLDBCQUFVLEVBQUUsa0NBQWMsRUFBRSxnQ0FBYTtnQkFBTyxPQUFBLENBQ25ELEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsVUFBVSxHQUFHLEtBQUssR0FBRyxjQUFjLEdBQUcsR0FBRyxHQUFHLGFBQWEsRUFBRSxDQUFDO1lBRDNCLENBQzJCLENBQUMsQ0FBQyxDQUFDO1lBRXpGLE9BQU8sQ0FBQyxHQUFHLENBQUMsdUJBQXVCLENBQUMsQ0FBQztZQUNyQyxLQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztZQUNwQixLQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7UUFFM0IsQ0FBQyxFQUNELFVBQUMsS0FBSztZQUNGLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDbkIsS0FBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7WUFDcEIsdUJBQXVCO1FBQzNCLENBQUMsQ0FDSixDQUFDO0lBRVYsQ0FBQztJQUVELDRDQUFZLEdBQVosVUFBYSxJQUFJO1FBQ2IsSUFBTSxPQUFPLEdBQUcsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFL0IsSUFBTSxHQUFHLEdBQUcsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBRTdCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUUxQixDQUFDO0lBRUQsaURBQWlCLEdBQWpCO1FBQ0ksSUFBTSxVQUFVLEdBQWtCLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNwRCxVQUFVLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDNUIsQ0FBQztJQXZGUSxxQkFBcUI7UUFOakMsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxjQUFjO1lBQ3hCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixTQUFTLEVBQUUsQ0FBQyw0QkFBWSxFQUFFLGtDQUFlLENBQUM7WUFDMUMsV0FBVyxFQUFFLCtCQUErQjtTQUMvQyxDQUFDO3lDQVd1QyxrQ0FBZSxFQUF3Qiw0QkFBWTtZQUM5RCxXQUFJO09BWHJCLHFCQUFxQixDQXlGakM7SUFBRCw0QkFBQztDQUFBLEFBekZELElBeUZDO0FBekZZLHNEQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgUmFkU2lkZURyYXdlciB9IGZyb20gXCJuYXRpdmVzY3JpcHQtdWktc2lkZWRyYXdlclwiO1xyXG5pbXBvcnQgKiBhcyBhcHAgZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvYXBwbGljYXRpb25cIjtcclxuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3BhZ2VcIjtcclxuaW1wb3J0IHsgU2V0dGluZ3MgfSBmcm9tIFwifi9zZXR0aW5ncy9zZXR0aW5nc1wiO1xyXG5pbXBvcnQgeyBHdWlkZSB9IGZyb20gXCJ+L3NoYXJlZC9tb2RlbHMvZ3VpZGUubW9kZWxcIjtcclxuaW1wb3J0IHsgUGxhbm5pbmcgfSBmcm9tIFwifi9zaGFyZWQvbW9kZWxzL3BsYW5uaW5nLm1vZGVsXCI7XHJcbmltcG9ydCB7IEd1aWRlU2VydmljZSB9IGZyb20gXCJ+L3NoYXJlZC9zZXJ2aWNlcy9ndWlkZS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IFBsYW5uaW5nU2VydmljZSB9IGZyb20gXCJ+L3NoYXJlZC9zZXJ2aWNlcy9wbGFubmluZy5zZXJ2aWNlXCI7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiBcIldlZWtPdmVydmlld1wiLFxyXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICAgIHByb3ZpZGVyczogW0d1aWRlU2VydmljZSwgUGxhbm5pbmdTZXJ2aWNlXSxcclxuICAgIHRlbXBsYXRlVXJsOiBcIi4vd2Vla092ZXJ2aWV3LmNvbXBvbmVudC5odG1sXCJcclxufSlcclxuZXhwb3J0IGNsYXNzIFdlZWtPdmVydmlld0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcblxyXG4gICAgaXNCdXN5OiBib29sZWFuO1xyXG5cclxuICAgIGd1aWRlczogQXJyYXk8b2JqZWN0PiA9IFtdO1xyXG5cclxuICAgIGRheXM6IEFycmF5PHN0cmluZz4gPSBbXCJab25kYWdcIiwgXCJNYWFuZGFnXCIsIFwiRGluc2RhZ1wiLCBcIldvZW5zZGFnXCIsIFwiRG9uZGVyZGFnXCIsIFwiVnJpamRhZ1wiLCBcIlphdGVyZGFnXCJdO1xyXG5cclxuICAgIHBsYW5uaW5nczogQXJyYXk8UGxhbm5pbmc+ID0gW107XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBwbGFubmluZ1NlcnZpY2U6IFBsYW5uaW5nU2VydmljZSwgcHJpdmF0ZSBndWlkZVNlcnZpY2U6IEd1aWRlU2VydmljZSxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgcGFnZTogUGFnZSkge1xyXG4gICAgICAgIC8vIFVzZSB0aGUgY29tcG9uZW50IGNvbnN0cnVjdG9yIHRvIGluamVjdCBwcm92aWRlcnMuXHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5nZXRHdWlkZXMoKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRXZWVrUGxhbm5pbmcoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5pc0J1c3kgPSB0cnVlO1xyXG5cclxuICAgICAgICBjb25zdCBkYXRlID0gU2V0dGluZ3MuZ2V0RGF0ZSgpO1xyXG4gICAgICAgIGNvbnN0IGxvY2F0aW9uID0gU2V0dGluZ3MuZ2V0TG9jYXRpb24oKTtcclxuXHJcbiAgICAgICAgY29uc3QgYXBwU2V0dGluZ3MgPSByZXF1aXJlKFwiYXBwbGljYXRpb24tc2V0dGluZ3NcIik7XHJcblxyXG4gICAgICAgIGxldCBndWlkZUlkOiBzdHJpbmcgPSBcIjNcIjtcclxuICAgICAgICBpZiAoYXBwU2V0dGluZ3MuaGFzS2V5KFwiZ3VpZGVJZFwiKSkge1xyXG4gICAgICAgICAgICBndWlkZUlkID0gYXBwU2V0dGluZ3MuZ2V0U3RyaW5nKFwiZ3VpZGVJZFwiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMucGxhbm5pbmdTZXJ2aWNlLmdldEFsbEJ5R3VpZGVBbmRXZWVrQW5kTG9jYXRpb25BY3Rpb24oZ3VpZGVJZCwgZGF0ZSwgbG9jYXRpb24pXHJcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAgIChyZXN1bHQ6IEFycmF5PFBsYW5uaW5nPikgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMucGxhbm5pbmdzID0gcmVzdWx0O1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRm91bmQgbWUgc29tZSBQbGFubmluZyFcIik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzQnVzeSA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgKGVycm9yKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmRpcihlcnJvcik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzQnVzeSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRHdWlkZXMoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5pc0J1c3kgPSB0cnVlO1xyXG4gICAgICAgIGNvbnN0IGxvY2F0aW9uSWQgPSBTZXR0aW5ncy5nZXRMb2NhdGlvbigpO1xyXG4gICAgICAgIGNvbnN0IGRhdGUgPSBTZXR0aW5ncy5nZXREYXRlKCk7XHJcbiAgICAgICAgdGhpcy5ndWlkZVNlcnZpY2UuZ2V0QWxsR3VpZGVzRm9yV2Vla0FuZExvY2F0aW9uQWN0aW9uKGRhdGUsIGxvY2F0aW9uSWQpXHJcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAgICAgICAocmVzdWx0OiBBcnJheTxHdWlkZT4pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmd1aWRlcyA9IFt7a2V5OiBcIjBcIiwgbGFiZWw6IFwiL1wifV07XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ndWlkZXMgPSBbLi4udGhpcy5ndWlkZXMsIC4uLnJlc3VsdC5tYXAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICh7IGlkLCBndWlkZVNob3J0LCBndWlkZUZpcnN0TmFtZSwgZ3VpZGVMYXN0TmFtZSB9KSA9PiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGtleTogaWQsIGxhYmVsOiBndWlkZVNob3J0ICsgXCIgLSBcIiArIGd1aWRlRmlyc3ROYW1lICsgXCIgXCIgKyBndWlkZUxhc3ROYW1lIH0pKV07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRm91bmQgbWUgc29tZSBHdWlkZXMhXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNCdXN5ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRXZWVrUGxhbm5pbmcoKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgKGVycm9yKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5kaXIoZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNCdXN5ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgLypUT0RPOiBoYW5kbGUgZXJyb3JzKi9cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0RGF5T2ZXZWVrKGRhdGUpOiBzdHJpbmcge1xyXG4gICAgICAgIGNvbnN0IGRhdGVPYmogPSBuZXcgRGF0ZShkYXRlKTtcclxuXHJcbiAgICAgICAgY29uc3QgZGF5ID0gZGF0ZU9iai5nZXREYXkoKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF5c1tkYXldO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBvbkRyYXdlckJ1dHRvblRhcCgpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBzaWRlRHJhd2VyID0gPFJhZFNpZGVEcmF3ZXI+YXBwLmdldFJvb3RWaWV3KCk7XHJcbiAgICAgICAgc2lkZURyYXdlci5zaG93RHJhd2VyKCk7XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==