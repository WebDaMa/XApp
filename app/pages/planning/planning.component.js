"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var nativescript_angular_1 = require("nativescript-angular");
var page_1 = require("tns-core-modules/ui/page");
var settings_1 = require("~/settings/settings");
var customer_service_1 = require("~/shared/services/customer.service");
var guide_service_1 = require("~/shared/services/guide.service");
var planning_service_1 = require("~/shared/services/planning.service");
var PlanningComponent = /** @class */ (function () {
    function PlanningComponent(customerService, routerExtensions, planningService, guideService, page, activeRoute) {
        this.customerService = customerService;
        this.routerExtensions = routerExtensions;
        this.planningService = planningService;
        this.guideService = guideService;
        this.page = page;
        this.activeRoute = activeRoute;
        this.guides = [];
        this.date = "";
        this.locationId = "";
        this.isBusy = false;
    }
    PlanningComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.date = settings_1.Settings.getDate();
        this.locationId = settings_1.Settings.getLocation();
        this.getGuides();
        this.page.backgroundSpanUnderStatusBar = true;
        this.page.on("loaded", function (args) {
            if (_this.page.android) {
                _this.page.android.setFitsSystemWindows(true);
            }
        });
    };
    PlanningComponent.prototype.getPlannings = function () {
        var _this = this;
        this.isBusy = true;
        this.planningService.getAllByDayAndLocationAction(this.date, this.locationId)
            .subscribe(function (result) {
            _this.plannings = result;
            console.log("found me some plannings");
            _this.isBusy = false;
        }, function (error) {
            console.dir(error);
            /*TODO: handle errors*/
        });
    };
    PlanningComponent.prototype.getGuides = function () {
        var _this = this;
        this.isBusy = true;
        this.guideService.getAllGuidesForWeekAndLocationAction(this.date, this.locationId)
            .subscribe(function (result) {
            _this.guides = [{ key: "0", label: "Kies een Gids" }];
            _this.guides = _this.guides.concat(result.map(function (_a) {
                var id = _a.id, guideShort = _a.guideShort, guideFirstName = _a.guideFirstName, guideLastName = _a.guideLastName;
                return ({ key: id, label: guideShort + " - " + guideFirstName + " " + guideLastName });
            }));
            _this.getPlannings();
        }, function (error) {
            console.dir(error);
            /*TODO: handle errors*/
        });
    };
    PlanningComponent.prototype.dfPropertyCommitted = function (args) {
        var _this = this;
        var dataForm = args.object;
        var planning = JSON.parse(dataForm.editedObject);
        if (planning.guideId !== "0") {
            this.isBusy = true;
            this.planningService.putPlanningUpdateAction(planning)
                .subscribe(function (res) {
                console.log("Updated planning");
                _this.isBusy = false;
            }, function (error) {
                console.dir(error);
                /*TODO: handle errors*/
            });
        }
    };
    PlanningComponent.prototype.goBack = function () {
        this.routerExtensions.back({ relativeTo: this.activeRoute });
    };
    PlanningComponent = __decorate([
        core_1.Component({
            selector: "Planning",
            moduleId: module.id,
            providers: [customer_service_1.CustomerService, planning_service_1.PlanningService, guide_service_1.GuideService],
            templateUrl: "./planning.component.html"
        }),
        __metadata("design:paramtypes", [customer_service_1.CustomerService,
            nativescript_angular_1.RouterExtensions, planning_service_1.PlanningService,
            guide_service_1.GuideService, page_1.Page, router_1.ActivatedRoute])
    ], PlanningComponent);
    return PlanningComponent;
}());
exports.PlanningComponent = PlanningComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxhbm5pbmcuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicGxhbm5pbmcuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBQ2xELDBDQUFpRDtBQUNqRCw2REFBd0Q7QUFFeEQsaURBQWdEO0FBQ2hELGdEQUErQztBQUcvQyx1RUFBcUU7QUFDckUsaUVBQStEO0FBQy9ELHVFQUFxRTtBQVFyRTtJQVNJLDJCQUFvQixlQUFnQyxFQUNoQyxnQkFBa0MsRUFBVSxlQUFnQyxFQUM1RSxZQUEwQixFQUFVLElBQVUsRUFBVSxXQUEyQjtRQUZuRixvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDaEMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUFVLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUM1RSxpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUFVLFNBQUksR0FBSixJQUFJLENBQU07UUFBVSxnQkFBVyxHQUFYLFdBQVcsQ0FBZ0I7UUFWdkcsV0FBTSxHQUFrQixFQUFFLENBQUM7UUFHM0IsU0FBSSxHQUFXLEVBQUUsQ0FBQztRQUNsQixlQUFVLEdBQVcsRUFBRSxDQUFDO1FBRXhCLFdBQU0sR0FBWSxLQUFLLENBQUM7SUFNeEIsQ0FBQztJQUVELG9DQUFRLEdBQVI7UUFBQSxpQkFZQztRQVhHLElBQUksQ0FBQyxJQUFJLEdBQUcsbUJBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUMvQixJQUFJLENBQUMsVUFBVSxHQUFHLG1CQUFRLENBQUMsV0FBVyxFQUFFLENBQUM7UUFFekMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBRWpCLElBQUksQ0FBQyxJQUFJLENBQUMsNEJBQTRCLEdBQUcsSUFBSSxDQUFDO1FBQzlDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxVQUFDLElBQUk7WUFDeEIsSUFBSSxLQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRTtnQkFDbkIs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cEIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFNBQVMsRUFBRSxDQUFDLGtDQUFlLEVBQUUsa0NBQWUsRUFBRSw0QkFBWSxDQUFDO1lBQzNELFdBQVcsRUFBRSwyQkFBMkI7U0FDM0MsQ0FBQzt5Q0FVdUMsa0NBQWU7WUFDZCx1Q0FBZ0IsRUFBMkIsa0NBQWU7WUFDOUQsNEJBQVksRUFBZ0IsV0FBSSxFQUF1Qix1QkFBYztPQVg5RixpQkFBaUIsQ0F5RjdCO0lBQUQsd0JBQUM7Q0FBQSxBQXpGRCxJQXlGQztBQXpGWSw4Q0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXJcIjtcbmltcG9ydCB7IFJhZERhdGFGb3JtIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC11aS1kYXRhZm9ybVwiO1xuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3BhZ2VcIjtcbmltcG9ydCB7IFNldHRpbmdzIH0gZnJvbSBcIn4vc2V0dGluZ3Mvc2V0dGluZ3NcIjtcbmltcG9ydCB7IEd1aWRlIH0gZnJvbSBcIn4vc2hhcmVkL21vZGVscy9ndWlkZS5tb2RlbFwiO1xuaW1wb3J0IHsgUGxhbm5pbmcgfSBmcm9tIFwifi9zaGFyZWQvbW9kZWxzL3BsYW5uaW5nLm1vZGVsXCI7XG5pbXBvcnQgeyBDdXN0b21lclNlcnZpY2UgfSBmcm9tIFwifi9zaGFyZWQvc2VydmljZXMvY3VzdG9tZXIuc2VydmljZVwiO1xuaW1wb3J0IHsgR3VpZGVTZXJ2aWNlIH0gZnJvbSBcIn4vc2hhcmVkL3NlcnZpY2VzL2d1aWRlLnNlcnZpY2VcIjtcbmltcG9ydCB7IFBsYW5uaW5nU2VydmljZSB9IGZyb20gXCJ+L3NoYXJlZC9zZXJ2aWNlcy9wbGFubmluZy5zZXJ2aWNlXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcIlBsYW5uaW5nXCIsXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICBwcm92aWRlcnM6IFtDdXN0b21lclNlcnZpY2UsIFBsYW5uaW5nU2VydmljZSwgR3VpZGVTZXJ2aWNlXSxcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3BsYW5uaW5nLmNvbXBvbmVudC5odG1sXCJcbn0pXG5leHBvcnQgY2xhc3MgUGxhbm5pbmdDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIGd1aWRlczogQXJyYXk8b2JqZWN0PiA9IFtdO1xuICAgIHBsYW5uaW5nczogQXJyYXk8UGxhbm5pbmc+O1xuXG4gICAgZGF0ZTogc3RyaW5nID0gXCJcIjtcbiAgICBsb2NhdGlvbklkOiBzdHJpbmcgPSBcIlwiO1xuXG4gICAgaXNCdXN5OiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGN1c3RvbWVyU2VydmljZTogQ3VzdG9tZXJTZXJ2aWNlLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgcm91dGVyRXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9ucywgcHJpdmF0ZSBwbGFubmluZ1NlcnZpY2U6IFBsYW5uaW5nU2VydmljZSxcbiAgICAgICAgICAgICAgICBwcml2YXRlIGd1aWRlU2VydmljZTogR3VpZGVTZXJ2aWNlLCBwcml2YXRlIHBhZ2U6IFBhZ2UsIHByaXZhdGUgYWN0aXZlUm91dGU6IEFjdGl2YXRlZFJvdXRlKSB7XG5cbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kYXRlID0gU2V0dGluZ3MuZ2V0RGF0ZSgpO1xuICAgICAgICB0aGlzLmxvY2F0aW9uSWQgPSBTZXR0aW5ncy5nZXRMb2NhdGlvbigpO1xuXG4gICAgICAgIHRoaXMuZ2V0R3VpZGVzKCk7XG5cbiAgICAgICAgdGhpcy5wYWdlLmJhY2tncm91bmRTcGFuVW5kZXJTdGF0dXNCYXIgPSB0cnVlO1xuICAgICAgICB0aGlzLnBhZ2Uub24oXCJsb2FkZWRcIiwgKGFyZ3MpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLnBhZ2UuYW5kcm9pZCkge1xuICAgICAgICAgICAgICAgIHRoaXMucGFnZS5hbmRyb2lkLnNldEZpdHNTeXN0ZW1XaW5kb3dzKHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBnZXRQbGFubmluZ3MoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuaXNCdXN5ID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5wbGFubmluZ1NlcnZpY2UuZ2V0QWxsQnlEYXlBbmRMb2NhdGlvbkFjdGlvbih0aGlzLmRhdGUsIHRoaXMubG9jYXRpb25JZClcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgKHJlc3VsdDogQXJyYXk8UGxhbm5pbmc+KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGxhbm5pbmdzID0gcmVzdWx0O1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImZvdW5kIG1lIHNvbWUgcGxhbm5pbmdzXCIpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzQnVzeSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZGlyKGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgLypUT0RPOiBoYW5kbGUgZXJyb3JzKi9cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuICAgIH1cblxuICAgIGdldEd1aWRlcygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5pc0J1c3kgPSB0cnVlO1xuICAgICAgICB0aGlzLmd1aWRlU2VydmljZS5nZXRBbGxHdWlkZXNGb3JXZWVrQW5kTG9jYXRpb25BY3Rpb24odGhpcy5kYXRlLCB0aGlzLmxvY2F0aW9uSWQpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgIChyZXN1bHQ6IEFycmF5PEd1aWRlPikgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmd1aWRlcyA9IFt7a2V5OiBcIjBcIiwgbGFiZWw6IFwiS2llcyBlZW4gR2lkc1wifV07XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ3VpZGVzID0gWy4uLnRoaXMuZ3VpZGVzLCAuLi5yZXN1bHQubWFwKFxuICAgICAgICAgICAgICAgICAgICAgICAgKHsgaWQsIGd1aWRlU2hvcnQsIGd1aWRlRmlyc3ROYW1lLCBndWlkZUxhc3ROYW1lIH0pID0+IChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGtleTogaWQsIGxhYmVsOiBndWlkZVNob3J0ICsgXCIgLSBcIiArIGd1aWRlRmlyc3ROYW1lICsgXCIgXCIgKyBndWlkZUxhc3ROYW1lIH0pKV07XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0UGxhbm5pbmdzKCk7XG5cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmRpcihlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIC8qVE9ETzogaGFuZGxlIGVycm9ycyovXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcblxuICAgIH1cblxuICAgIGRmUHJvcGVydHlDb21taXR0ZWQoYXJncykge1xuICAgICAgICBjb25zdCBkYXRhRm9ybSA9IDxSYWREYXRhRm9ybT5hcmdzLm9iamVjdDtcbiAgICAgICAgY29uc3QgcGxhbm5pbmc6IFBsYW5uaW5nID0gPFBsYW5uaW5nPiBKU09OLnBhcnNlKGRhdGFGb3JtLmVkaXRlZE9iamVjdCk7XG5cbiAgICAgICAgaWYgKHBsYW5uaW5nLmd1aWRlSWQgIT09IFwiMFwiKSB7XG4gICAgICAgICAgICB0aGlzLmlzQnVzeSA9IHRydWU7XG5cbiAgICAgICAgICAgIHRoaXMucGxhbm5pbmdTZXJ2aWNlLnB1dFBsYW5uaW5nVXBkYXRlQWN0aW9uKHBsYW5uaW5nKVxuICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgIChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVXBkYXRlZCBwbGFubmluZ1wiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaXNCdXN5ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5kaXIoZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLypUT0RPOiBoYW5kbGUgZXJyb3JzKi9cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnb0JhY2soKSB7XG4gICAgICAgIHRoaXMucm91dGVyRXh0ZW5zaW9ucy5iYWNrKHsgcmVsYXRpdmVUbzogdGhpcy5hY3RpdmVSb3V0ZSB9KTtcbiAgICB9XG59XG4iXX0=