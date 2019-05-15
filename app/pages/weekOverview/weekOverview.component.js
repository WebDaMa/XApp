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
        var appSettings = require("tns-core-modules/application-settings");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2Vla092ZXJ2aWV3LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIndlZWtPdmVydmlldy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBa0Q7QUFFbEQsa0RBQW9EO0FBQ3BELGlEQUFnRDtBQUNoRCxnREFBK0M7QUFHL0MsaUVBQStEO0FBQy9ELHVFQUFxRTtBQVFyRTtJQVVJLCtCQUFvQixlQUFnQyxFQUFVLFlBQTBCLEVBQ3BFLElBQVU7UUFEVixvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFBVSxpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUNwRSxTQUFJLEdBQUosSUFBSSxDQUFNO1FBUDlCLFdBQU0sR0FBa0IsRUFBRSxDQUFDO1FBRTNCLFNBQUksR0FBa0IsQ0FBQyxRQUFRLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUV2RyxjQUFTLEdBQW9CLEVBQUUsQ0FBQztRQUk1QixxREFBcUQ7SUFDekQsQ0FBQztJQUVELHdDQUFRLEdBQVI7UUFDSSxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUVELCtDQUFlLEdBQWY7UUFBQSxpQkE0QkM7UUEzQkcsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFFbkIsSUFBTSxJQUFJLEdBQUcsbUJBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNoQyxJQUFNLFFBQVEsR0FBRyxtQkFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBRXhDLElBQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQyx1Q0FBdUMsQ0FBQyxDQUFDO1FBRXJFLElBQUksT0FBTyxHQUFXLEdBQUcsQ0FBQztRQUMxQixJQUFJLFdBQVcsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLEVBQUU7WUFDL0IsT0FBTyxHQUFHLFdBQVcsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDOUM7UUFFRCxJQUFJLENBQUMsZUFBZSxDQUFDLHFDQUFxQyxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsUUFBUSxDQUFDO2FBQzlFLFNBQVMsQ0FDVixVQUFDLE1BQXVCO1lBRXBCLEtBQUksQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDO1lBRXhCLE9BQU8sQ0FBQyxHQUFHLENBQUMseUJBQXlCLENBQUMsQ0FBQztZQUN2QyxLQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUV4QixDQUFDLEVBQ0QsVUFBQyxLQUFLO1lBQ0YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNuQixLQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUN4QixDQUFDLENBQ0osQ0FBQztJQUNOLENBQUM7SUFFRCx5Q0FBUyxHQUFUO1FBQUEsaUJBd0JDO1FBdkJHLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ25CLElBQU0sVUFBVSxHQUFHLG1CQUFRLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDMUMsSUFBTSxJQUFJLEdBQUcsbUJBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNoQyxJQUFJLENBQUMsWUFBWSxDQUFDLG9DQUFvQyxDQUFDLElBQUksRUFBRSxVQUFVLENBQUM7YUFDbkUsU0FBUyxDQUNOLFVBQUMsTUFBb0I7WUFDakIsS0FBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFDLENBQUMsQ0FBQztZQUN2QyxLQUFJLENBQUMsTUFBTSxHQUFPLEtBQUksQ0FBQyxNQUFNLFFBQUssTUFBTSxDQUFDLEdBQUcsQ0FDeEMsVUFBQyxFQUFpRDtvQkFBL0MsVUFBRSxFQUFFLDBCQUFVLEVBQUUsa0NBQWMsRUFBRSxnQ0FBYTtnQkFBTyxPQUFBLENBQ25ELEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsVUFBVSxHQUFHLEtBQUssR0FBRyxjQUFjLEdBQUcsR0FBRyxHQUFHLGFBQWEsRUFBRSxDQUFDO1lBRDNCLENBQzJCLENBQUMsQ0FBQyxDQUFDO1lBRXpGLE9BQU8sQ0FBQyxHQUFHLENBQUMsdUJBQXVCLENBQUMsQ0FBQztZQUNyQyxLQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztZQUNwQixLQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7UUFFM0IsQ0FBQyxFQUNELFVBQUMsS0FBSztZQUNGLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDbkIsS0FBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7WUFDcEIsdUJBQXVCO1FBQzNCLENBQUMsQ0FDSixDQUFDO0lBRVYsQ0FBQztJQUVELDRDQUFZLEdBQVosVUFBYSxJQUFJO1FBQ2IsSUFBTSxPQUFPLEdBQUcsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFL0IsSUFBTSxHQUFHLEdBQUcsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBRTdCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUUxQixDQUFDO0lBRUQsaURBQWlCLEdBQWpCO1FBQ0ksSUFBTSxVQUFVLEdBQWtCLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNwRCxVQUFVLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDNUIsQ0FBQztJQXZGUSxxQkFBcUI7UUFOakMsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxjQUFjO1lBQ3hCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixTQUFTLEVBQUUsQ0FBQyw0QkFBWSxFQUFFLGtDQUFlLENBQUM7WUFDMUMsV0FBVyxFQUFFLCtCQUErQjtTQUMvQyxDQUFDO3lDQVd1QyxrQ0FBZSxFQUF3Qiw0QkFBWTtZQUM5RCxXQUFJO09BWHJCLHFCQUFxQixDQXlGakM7SUFBRCw0QkFBQztDQUFBLEFBekZELElBeUZDO0FBekZZLHNEQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgUmFkU2lkZURyYXdlciB9IGZyb20gXCJuYXRpdmVzY3JpcHQtdWktc2lkZWRyYXdlclwiO1xyXG5pbXBvcnQgKiBhcyBhcHAgZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvYXBwbGljYXRpb25cIjtcclxuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3BhZ2VcIjtcclxuaW1wb3J0IHsgU2V0dGluZ3MgfSBmcm9tIFwifi9zZXR0aW5ncy9zZXR0aW5nc1wiO1xyXG5pbXBvcnQgeyBHdWlkZSB9IGZyb20gXCJ+L3NoYXJlZC9tb2RlbHMvZ3VpZGUubW9kZWxcIjtcclxuaW1wb3J0IHsgUGxhbm5pbmcgfSBmcm9tIFwifi9zaGFyZWQvbW9kZWxzL3BsYW5uaW5nLm1vZGVsXCI7XHJcbmltcG9ydCB7IEd1aWRlU2VydmljZSB9IGZyb20gXCJ+L3NoYXJlZC9zZXJ2aWNlcy9ndWlkZS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IFBsYW5uaW5nU2VydmljZSB9IGZyb20gXCJ+L3NoYXJlZC9zZXJ2aWNlcy9wbGFubmluZy5zZXJ2aWNlXCI7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiBcIldlZWtPdmVydmlld1wiLFxyXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICAgIHByb3ZpZGVyczogW0d1aWRlU2VydmljZSwgUGxhbm5pbmdTZXJ2aWNlXSxcclxuICAgIHRlbXBsYXRlVXJsOiBcIi4vd2Vla092ZXJ2aWV3LmNvbXBvbmVudC5odG1sXCJcclxufSlcclxuZXhwb3J0IGNsYXNzIFdlZWtPdmVydmlld0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcblxyXG4gICAgaXNCdXN5OiBib29sZWFuO1xyXG5cclxuICAgIGd1aWRlczogQXJyYXk8b2JqZWN0PiA9IFtdO1xyXG5cclxuICAgIGRheXM6IEFycmF5PHN0cmluZz4gPSBbXCJab25kYWdcIiwgXCJNYWFuZGFnXCIsIFwiRGluc2RhZ1wiLCBcIldvZW5zZGFnXCIsIFwiRG9uZGVyZGFnXCIsIFwiVnJpamRhZ1wiLCBcIlphdGVyZGFnXCJdO1xyXG5cclxuICAgIHBsYW5uaW5nczogQXJyYXk8UGxhbm5pbmc+ID0gW107XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBwbGFubmluZ1NlcnZpY2U6IFBsYW5uaW5nU2VydmljZSwgcHJpdmF0ZSBndWlkZVNlcnZpY2U6IEd1aWRlU2VydmljZSxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgcGFnZTogUGFnZSkge1xyXG4gICAgICAgIC8vIFVzZSB0aGUgY29tcG9uZW50IGNvbnN0cnVjdG9yIHRvIGluamVjdCBwcm92aWRlcnMuXHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5nZXRHdWlkZXMoKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRXZWVrUGxhbm5pbmcoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5pc0J1c3kgPSB0cnVlO1xyXG5cclxuICAgICAgICBjb25zdCBkYXRlID0gU2V0dGluZ3MuZ2V0RGF0ZSgpO1xyXG4gICAgICAgIGNvbnN0IGxvY2F0aW9uID0gU2V0dGluZ3MuZ2V0TG9jYXRpb24oKTtcclxuXHJcbiAgICAgICAgY29uc3QgYXBwU2V0dGluZ3MgPSByZXF1aXJlKFwidG5zLWNvcmUtbW9kdWxlcy9hcHBsaWNhdGlvbi1zZXR0aW5nc1wiKTtcclxuXHJcbiAgICAgICAgbGV0IGd1aWRlSWQ6IHN0cmluZyA9IFwiM1wiO1xyXG4gICAgICAgIGlmIChhcHBTZXR0aW5ncy5oYXNLZXkoXCJndWlkZUlkXCIpKSB7XHJcbiAgICAgICAgICAgIGd1aWRlSWQgPSBhcHBTZXR0aW5ncy5nZXRTdHJpbmcoXCJndWlkZUlkXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5wbGFubmluZ1NlcnZpY2UuZ2V0QWxsQnlHdWlkZUFuZFdlZWtBbmRMb2NhdGlvbkFjdGlvbihndWlkZUlkLCBkYXRlLCBsb2NhdGlvbilcclxuICAgICAgICAgICAgLnN1YnNjcmliZShcclxuICAgICAgICAgICAgKHJlc3VsdDogQXJyYXk8UGxhbm5pbmc+KSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5wbGFubmluZ3MgPSByZXN1bHQ7XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJGb3VuZCBtZSBzb21lIFBsYW5uaW5nIVwiKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuaXNCdXN5ID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAoZXJyb3IpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZGlyKGVycm9yKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuaXNCdXN5ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEd1aWRlcygpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmlzQnVzeSA9IHRydWU7XHJcbiAgICAgICAgY29uc3QgbG9jYXRpb25JZCA9IFNldHRpbmdzLmdldExvY2F0aW9uKCk7XHJcbiAgICAgICAgY29uc3QgZGF0ZSA9IFNldHRpbmdzLmdldERhdGUoKTtcclxuICAgICAgICB0aGlzLmd1aWRlU2VydmljZS5nZXRBbGxHdWlkZXNGb3JXZWVrQW5kTG9jYXRpb25BY3Rpb24oZGF0ZSwgbG9jYXRpb25JZClcclxuICAgICAgICAgICAgLnN1YnNjcmliZShcclxuICAgICAgICAgICAgICAgIChyZXN1bHQ6IEFycmF5PEd1aWRlPikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ3VpZGVzID0gW3trZXk6IFwiMFwiLCBsYWJlbDogXCIvXCJ9XTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmd1aWRlcyA9IFsuLi50aGlzLmd1aWRlcywgLi4ucmVzdWx0Lm1hcChcclxuICAgICAgICAgICAgICAgICAgICAgICAgKHsgaWQsIGd1aWRlU2hvcnQsIGd1aWRlRmlyc3ROYW1lLCBndWlkZUxhc3ROYW1lIH0pID0+IChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsga2V5OiBpZCwgbGFiZWw6IGd1aWRlU2hvcnQgKyBcIiAtIFwiICsgZ3VpZGVGaXJzdE5hbWUgKyBcIiBcIiArIGd1aWRlTGFzdE5hbWUgfSkpXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJGb3VuZCBtZSBzb21lIEd1aWRlcyFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc0J1c3kgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdldFdlZWtQbGFubmluZygpO1xyXG5cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAoZXJyb3IpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmRpcihlcnJvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc0J1c3kgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAvKlRPRE86IGhhbmRsZSBlcnJvcnMqL1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBnZXREYXlPZldlZWsoZGF0ZSk6IHN0cmluZyB7XHJcbiAgICAgICAgY29uc3QgZGF0ZU9iaiA9IG5ldyBEYXRlKGRhdGUpO1xyXG5cclxuICAgICAgICBjb25zdCBkYXkgPSBkYXRlT2JqLmdldERheSgpO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5kYXlzW2RheV07XHJcblxyXG4gICAgfVxyXG5cclxuICAgIG9uRHJhd2VyQnV0dG9uVGFwKCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IHNpZGVEcmF3ZXIgPSA8UmFkU2lkZURyYXdlcj5hcHAuZ2V0Um9vdFZpZXcoKTtcclxuICAgICAgICBzaWRlRHJhd2VyLnNob3dEcmF3ZXIoKTtcclxuICAgIH1cclxuXHJcbn1cclxuIl19