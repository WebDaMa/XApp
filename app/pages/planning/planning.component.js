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
        this.routerExtensions.navigate(["/tabs/default"], {
            transition: {
                name: "fade"
            }
        });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxhbm5pbmcuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicGxhbm5pbmcuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBQ2xELDBDQUFpRDtBQUNqRCw2REFBd0Q7QUFFeEQsaURBQWdEO0FBQ2hELGdEQUErQztBQUcvQyx1RUFBcUU7QUFDckUsaUVBQStEO0FBQy9ELHVFQUFxRTtBQVFyRTtJQVNJLDJCQUFvQixlQUFnQyxFQUNoQyxnQkFBa0MsRUFBVSxlQUFnQyxFQUM1RSxZQUEwQixFQUFVLElBQVUsRUFBVSxXQUEyQjtRQUZuRixvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDaEMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUFVLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUM1RSxpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUFVLFNBQUksR0FBSixJQUFJLENBQU07UUFBVSxnQkFBVyxHQUFYLFdBQVcsQ0FBZ0I7UUFWdkcsV0FBTSxHQUFrQixFQUFFLENBQUM7UUFHM0IsU0FBSSxHQUFXLEVBQUUsQ0FBQztRQUNsQixlQUFVLEdBQVcsRUFBRSxDQUFDO1FBRXhCLFdBQU0sR0FBWSxLQUFLLENBQUM7SUFNeEIsQ0FBQztJQUVELG9DQUFRLEdBQVI7UUFBQSxpQkFZQztRQVhHLElBQUksQ0FBQyxJQUFJLEdBQUcsbUJBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUMvQixJQUFJLENBQUMsVUFBVSxHQUFHLG1CQUFRLENBQUMsV0FBVyxFQUFFLENBQUM7UUFFekMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBRWpCLElBQUksQ0FBQyxJQUFJLENBQUMsNEJBQTRCLEdBQUcsSUFBSSxDQUFDO1FBQzlDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxVQUFDLElBQUk7WUFDeEIsSUFBSSxLQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRTtnQkFDbkIs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QVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxVQUFVO1lBQ3BCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixTQUFTLEVBQUUsQ0FBQyxrQ0FBZSxFQUFFLGtDQUFlLEVBQUUsNEJBQVksQ0FBQztZQUMzRCxXQUFXLEVBQUUsMkJBQTJCO1NBQzNDLENBQUM7eUNBVXVDLGtDQUFlO1lBQ2QsdUNBQWdCLEVBQTJCLGtDQUFlO1lBQzlELDRCQUFZLEVBQWdCLFdBQUksRUFBdUIsdUJBQWM7T0FYOUYsaUJBQWlCLENBNkY3QjtJQUFELHdCQUFDO0NBQUEsQUE3RkQsSUE2RkM7QUE3RlksOENBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyXCI7XG5pbXBvcnQgeyBSYWREYXRhRm9ybSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtdWktZGF0YWZvcm1cIjtcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9wYWdlXCI7XG5pbXBvcnQgeyBTZXR0aW5ncyB9IGZyb20gXCJ+L3NldHRpbmdzL3NldHRpbmdzXCI7XG5pbXBvcnQgeyBHdWlkZSB9IGZyb20gXCJ+L3NoYXJlZC9tb2RlbHMvZ3VpZGUubW9kZWxcIjtcbmltcG9ydCB7IFBsYW5uaW5nIH0gZnJvbSBcIn4vc2hhcmVkL21vZGVscy9wbGFubmluZy5tb2RlbFwiO1xuaW1wb3J0IHsgQ3VzdG9tZXJTZXJ2aWNlIH0gZnJvbSBcIn4vc2hhcmVkL3NlcnZpY2VzL2N1c3RvbWVyLnNlcnZpY2VcIjtcbmltcG9ydCB7IEd1aWRlU2VydmljZSB9IGZyb20gXCJ+L3NoYXJlZC9zZXJ2aWNlcy9ndWlkZS5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBQbGFubmluZ1NlcnZpY2UgfSBmcm9tIFwifi9zaGFyZWQvc2VydmljZXMvcGxhbm5pbmcuc2VydmljZVwiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJQbGFubmluZ1wiLFxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgcHJvdmlkZXJzOiBbQ3VzdG9tZXJTZXJ2aWNlLCBQbGFubmluZ1NlcnZpY2UsIEd1aWRlU2VydmljZV0sXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9wbGFubmluZy5jb21wb25lbnQuaHRtbFwiXG59KVxuZXhwb3J0IGNsYXNzIFBsYW5uaW5nQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBndWlkZXM6IEFycmF5PG9iamVjdD4gPSBbXTtcbiAgICBwbGFubmluZ3M6IEFycmF5PFBsYW5uaW5nPjtcblxuICAgIGRhdGU6IHN0cmluZyA9IFwiXCI7XG4gICAgbG9jYXRpb25JZDogc3RyaW5nID0gXCJcIjtcblxuICAgIGlzQnVzeTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBjdXN0b21lclNlcnZpY2U6IEN1c3RvbWVyU2VydmljZSxcbiAgICAgICAgICAgICAgICBwcml2YXRlIHJvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMsIHByaXZhdGUgcGxhbm5pbmdTZXJ2aWNlOiBQbGFubmluZ1NlcnZpY2UsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBndWlkZVNlcnZpY2U6IEd1aWRlU2VydmljZSwgcHJpdmF0ZSBwYWdlOiBQYWdlLCBwcml2YXRlIGFjdGl2ZVJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSkge1xuXG4gICAgfVxuXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZGF0ZSA9IFNldHRpbmdzLmdldERhdGUoKTtcbiAgICAgICAgdGhpcy5sb2NhdGlvbklkID0gU2V0dGluZ3MuZ2V0TG9jYXRpb24oKTtcblxuICAgICAgICB0aGlzLmdldEd1aWRlcygpO1xuXG4gICAgICAgIHRoaXMucGFnZS5iYWNrZ3JvdW5kU3BhblVuZGVyU3RhdHVzQmFyID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5wYWdlLm9uKFwibG9hZGVkXCIsIChhcmdzKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5wYWdlLmFuZHJvaWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBhZ2UuYW5kcm9pZC5zZXRGaXRzU3lzdGVtV2luZG93cyh0cnVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZ2V0UGxhbm5pbmdzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmlzQnVzeSA9IHRydWU7XG4gICAgICAgIHRoaXMucGxhbm5pbmdTZXJ2aWNlLmdldEFsbEJ5RGF5QW5kTG9jYXRpb25BY3Rpb24odGhpcy5kYXRlLCB0aGlzLmxvY2F0aW9uSWQpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgIChyZXN1bHQ6IEFycmF5PFBsYW5uaW5nPikgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYW5uaW5ncyA9IHJlc3VsdDtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJmb3VuZCBtZSBzb21lIHBsYW5uaW5nc1wiKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc0J1c3kgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmRpcihlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIC8qVE9ETzogaGFuZGxlIGVycm9ycyovXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcbiAgICB9XG5cbiAgICBnZXRHdWlkZXMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuaXNCdXN5ID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5ndWlkZVNlcnZpY2UuZ2V0QWxsR3VpZGVzRm9yV2Vla0FuZExvY2F0aW9uQWN0aW9uKHRoaXMuZGF0ZSwgdGhpcy5sb2NhdGlvbklkKVxuICAgICAgICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICAocmVzdWx0OiBBcnJheTxHdWlkZT4pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ndWlkZXMgPSBbe2tleTogXCIwXCIsIGxhYmVsOiBcIktpZXMgZWVuIEdpZHNcIn1dO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmd1aWRlcyA9IFsuLi50aGlzLmd1aWRlcywgLi4ucmVzdWx0Lm1hcChcbiAgICAgICAgICAgICAgICAgICAgICAgICh7IGlkLCBndWlkZVNob3J0LCBndWlkZUZpcnN0TmFtZSwgZ3VpZGVMYXN0TmFtZSB9KSA9PiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBrZXk6IGlkLCBsYWJlbDogZ3VpZGVTaG9ydCArIFwiIC0gXCIgKyBndWlkZUZpcnN0TmFtZSArIFwiIFwiICsgZ3VpZGVMYXN0TmFtZSB9KSldO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmdldFBsYW5uaW5ncygpO1xuXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5kaXIoZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICAvKlRPRE86IGhhbmRsZSBlcnJvcnMqL1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7XG5cbiAgICB9XG5cbiAgICBkZlByb3BlcnR5Q29tbWl0dGVkKGFyZ3MpIHtcbiAgICAgICAgY29uc3QgZGF0YUZvcm0gPSA8UmFkRGF0YUZvcm0+YXJncy5vYmplY3Q7XG4gICAgICAgIGNvbnN0IHBsYW5uaW5nOiBQbGFubmluZyA9IDxQbGFubmluZz4gSlNPTi5wYXJzZShkYXRhRm9ybS5lZGl0ZWRPYmplY3QpO1xuXG4gICAgICAgIGlmIChwbGFubmluZy5ndWlkZUlkICE9PSBcIjBcIikge1xuICAgICAgICAgICAgdGhpcy5pc0J1c3kgPSB0cnVlO1xuXG4gICAgICAgICAgICB0aGlzLnBsYW5uaW5nU2VydmljZS5wdXRQbGFubmluZ1VwZGF0ZUFjdGlvbihwbGFubmluZylcbiAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICAocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlVwZGF0ZWQgcGxhbm5pbmdcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmlzQnVzeSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZGlyKGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8qVE9ETzogaGFuZGxlIGVycm9ycyovXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ29CYWNrKCkge1xuICAgICAgICB0aGlzLnJvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL3RhYnMvZGVmYXVsdFwiXSwge1xuICAgICAgICAgICAgdHJhbnNpdGlvbjoge1xuICAgICAgICAgICAgICAgIG5hbWU6IFwiZmFkZVwiXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiJdfQ==