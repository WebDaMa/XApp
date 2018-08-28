"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var nativescript_angular_1 = require("nativescript-angular");
var settings_1 = require("~/settings/settings");
var customer_service_1 = require("~/shared/services/customer.service");
var guide_service_1 = require("~/shared/services/guide.service");
var planning_service_1 = require("~/shared/services/planning.service");
var PlanningComponent = /** @class */ (function () {
    function PlanningComponent(customerService, routerExtensions, planningService, guideService) {
        this.customerService = customerService;
        this.routerExtensions = routerExtensions;
        this.planningService = planningService;
        this.guideService = guideService;
        this.guides = [];
        this.isBusy = false;
    }
    PlanningComponent.prototype.ngOnInit = function () {
        this.getGuides();
        this.getPlannings();
    };
    PlanningComponent.prototype.getPlannings = function () {
        var _this = this;
        this.isBusy = true;
        var locationId = settings_1.Settings.getLocation();
        var date = settings_1.Settings.getDate();
        this.planningService.getAllByDayAndLocationAction(date, locationId)
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
        var locationId = settings_1.Settings.getLocation();
        var date = settings_1.Settings.getDate();
        this.guideService.getAllGuidesForWeekAndLocationAction(date, locationId)
            .subscribe(function (result) {
            _this.guides = [{ key: "0", label: "Kies een Gids" }];
            _this.guides = _this.guides.concat(result.map(function (_a) {
                var id = _a.id, guideShort = _a.guideShort, guideFirstName = _a.guideFirstName, guideLastName = _a.guideLastName;
                return ({ key: id, label: guideShort + " - " + guideFirstName + " " + guideLastName });
            }));
        }, function (error) {
            console.dir(error);
            /*TODO: handle errors*/
        });
    };
    PlanningComponent.prototype.dfPropertyCommitted = function (args) {
        var _this = this;
        var dataForm = args.object;
        var planning = JSON.parse(dataForm.editedObject);
        this.isBusy = true;
        if (planning.guideId !== "0") {
            this.planningService.putPlanningUpdateAction(planning)
                .subscribe(function () {
                console.log("Updated planning");
                _this.isBusy = false;
            }, function (error) {
                console.dir(error);
                /*TODO: handle errors*/
            });
        }
    };
    PlanningComponent.prototype.goBack = function () {
        this.routerExtensions.backToPreviousPage();
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
            guide_service_1.GuideService])
    ], PlanningComponent);
    return PlanningComponent;
}());
exports.PlanningComponent = PlanningComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxhbm5pbmcuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicGxhbm5pbmcuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBQ2xELDZEQUF3RDtBQUV4RCxnREFBK0M7QUFFL0MsdUVBQXFFO0FBQ3JFLGlFQUErRDtBQUMvRCx1RUFBcUU7QUFTckU7SUFNSSwyQkFBb0IsZUFBZ0MsRUFDaEMsZ0JBQWtDLEVBQVUsZUFBZ0MsRUFDNUUsWUFBMEI7UUFGMUIsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQ2hDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFBVSxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDNUUsaUJBQVksR0FBWixZQUFZLENBQWM7UUFQOUMsV0FBTSxHQUFrQixFQUFFLENBQUM7UUFHM0IsV0FBTSxHQUFZLEtBQUssQ0FBQztJQU14QixDQUFDO0lBRUQsb0NBQVEsR0FBUjtRQUNJLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNqQixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQUVELHdDQUFZLEdBQVo7UUFBQSxpQkFnQkM7UUFmRyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUNuQixJQUFNLFVBQVUsR0FBRyxtQkFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQzFDLElBQU0sSUFBSSxHQUFHLG1CQUFRLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDaEMsSUFBSSxDQUFDLGVBQWUsQ0FBQyw0QkFBNEIsQ0FBQyxJQUFJLEVBQUUsVUFBVSxDQUFDO2FBQzlELFNBQVMsQ0FDTixVQUFDLE1BQXVCO1lBQ3BCLEtBQUksQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDO1lBQ3hCLE9BQU8sQ0FBQyxHQUFHLENBQUMseUJBQXlCLENBQUMsQ0FBQztZQUN2QyxLQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUN4QixDQUFDLEVBQ0QsVUFBQyxLQUFLO1lBQ0YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNuQix1QkFBdUI7UUFDM0IsQ0FBQyxDQUNKLENBQUM7SUFDVixDQUFDO0lBRUQscUNBQVMsR0FBVDtRQUFBLGlCQWtCQztRQWpCRyxJQUFNLFVBQVUsR0FBRyxtQkFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQzFDLElBQU0sSUFBSSxHQUFHLG1CQUFRLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDaEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxvQ0FBb0MsQ0FBQyxJQUFJLEVBQUUsVUFBVSxDQUFDO2FBQ25FLFNBQVMsQ0FDTixVQUFDLE1BQW9CO1lBQ2pCLEtBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLGVBQWUsRUFBQyxDQUFDLENBQUM7WUFDbkQsS0FBSSxDQUFDLE1BQU0sR0FBTyxLQUFJLENBQUMsTUFBTSxRQUFLLE1BQU0sQ0FBQyxHQUFHLENBQ3hDLFVBQUMsRUFBaUQ7b0JBQS9DLFVBQUUsRUFBRSwwQkFBVSxFQUFFLGtDQUFjLEVBQUUsZ0NBQWE7Z0JBQU8sT0FBQSxDQUNuRCxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLFVBQVUsR0FBRyxLQUFLLEdBQUcsY0FBYyxHQUFHLEdBQUcsR0FBRyxhQUFhLEVBQUUsQ0FBQztZQUQzQixDQUMyQixDQUFDLENBQUMsQ0FBQztRQUU3RixDQUFDLEVBQ0QsVUFBQyxLQUFLO1lBQ0YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNuQix1QkFBdUI7UUFDM0IsQ0FBQyxDQUNKLENBQUM7SUFFVixDQUFDO0lBRUQsK0NBQW1CLEdBQW5CLFVBQW9CLElBQUk7UUFBeEIsaUJBa0JDO1FBakJHLElBQU0sUUFBUSxHQUFnQixJQUFJLENBQUMsTUFBTSxDQUFDO1FBQzFDLElBQU0sUUFBUSxHQUF3QixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUN4RSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUVuQixFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsT0FBTyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDM0IsSUFBSSxDQUFDLGVBQWUsQ0FBQyx1QkFBdUIsQ0FBQyxRQUFRLENBQUM7aUJBQ2pELFNBQVMsQ0FDTjtnQkFDSSxPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLENBQUM7Z0JBQ2hDLEtBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1lBQ3hCLENBQUMsRUFDRCxVQUFDLEtBQUs7Z0JBQ0YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDbkIsdUJBQXVCO1lBQzNCLENBQUMsQ0FDSixDQUFDO1FBQ1YsQ0FBQztJQUNMLENBQUM7SUFFRCxrQ0FBTSxHQUFOO1FBQ0ksSUFBSSxDQUFDLGdCQUFnQixDQUFDLGtCQUFrQixFQUFFLENBQUM7SUFDL0MsQ0FBQztJQTdFUSxpQkFBaUI7UUFON0IsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxVQUFVO1lBQ3BCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixTQUFTLEVBQUUsQ0FBQyxrQ0FBZSxFQUFFLGtDQUFlLEVBQUUsNEJBQVksQ0FBQztZQUMzRCxXQUFXLEVBQUUsMkJBQTJCO1NBQzNDLENBQUM7eUNBT3VDLGtDQUFlO1lBQ2QsdUNBQWdCLEVBQTJCLGtDQUFlO1lBQzlELDRCQUFZO09BUnJDLGlCQUFpQixDQThFN0I7SUFBRCx3QkFBQztDQUFBLEFBOUVELElBOEVDO0FBOUVZLDhDQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXJcIjtcbmltcG9ydCB7IFJhZERhdGFGb3JtIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC11aS1kYXRhZm9ybVwiO1xuaW1wb3J0IHsgU2V0dGluZ3MgfSBmcm9tIFwifi9zZXR0aW5ncy9zZXR0aW5nc1wiO1xuaW1wb3J0IHsgR3VpZGUgfSBmcm9tIFwifi9zaGFyZWQvbW9kZWxzL2d1aWRlLm1vZGVsXCI7XG5pbXBvcnQgeyBDdXN0b21lclNlcnZpY2UgfSBmcm9tIFwifi9zaGFyZWQvc2VydmljZXMvY3VzdG9tZXIuc2VydmljZVwiO1xuaW1wb3J0IHsgR3VpZGVTZXJ2aWNlIH0gZnJvbSBcIn4vc2hhcmVkL3NlcnZpY2VzL2d1aWRlLnNlcnZpY2VcIjtcbmltcG9ydCB7IFBsYW5uaW5nU2VydmljZSB9IGZyb20gXCJ+L3NoYXJlZC9zZXJ2aWNlcy9wbGFubmluZy5zZXJ2aWNlXCI7XG5pbXBvcnQge1BsYW5uaW5nfSBmcm9tIFwifi9zaGFyZWQvbW9kZWxzL3BsYW5uaW5nLm1vZGVsXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcIlBsYW5uaW5nXCIsXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICBwcm92aWRlcnM6IFtDdXN0b21lclNlcnZpY2UsIFBsYW5uaW5nU2VydmljZSwgR3VpZGVTZXJ2aWNlXSxcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3BsYW5uaW5nLmNvbXBvbmVudC5odG1sXCJcbn0pXG5leHBvcnQgY2xhc3MgUGxhbm5pbmdDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIGd1aWRlczogQXJyYXk8b2JqZWN0PiA9IFtdO1xuICAgIHBsYW5uaW5nczogQXJyYXk8UGxhbm5pbmc+O1xuXG4gICAgaXNCdXN5OiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGN1c3RvbWVyU2VydmljZTogQ3VzdG9tZXJTZXJ2aWNlLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgcm91dGVyRXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9ucywgcHJpdmF0ZSBwbGFubmluZ1NlcnZpY2U6IFBsYW5uaW5nU2VydmljZSxcbiAgICAgICAgICAgICAgICBwcml2YXRlIGd1aWRlU2VydmljZTogR3VpZGVTZXJ2aWNlKSB7XG5cbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5nZXRHdWlkZXMoKTtcbiAgICAgICAgdGhpcy5nZXRQbGFubmluZ3MoKTtcbiAgICB9XG5cbiAgICBnZXRQbGFubmluZ3MoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuaXNCdXN5ID0gdHJ1ZTtcbiAgICAgICAgY29uc3QgbG9jYXRpb25JZCA9IFNldHRpbmdzLmdldExvY2F0aW9uKCk7XG4gICAgICAgIGNvbnN0IGRhdGUgPSBTZXR0aW5ncy5nZXREYXRlKCk7XG4gICAgICAgIHRoaXMucGxhbm5pbmdTZXJ2aWNlLmdldEFsbEJ5RGF5QW5kTG9jYXRpb25BY3Rpb24oZGF0ZSwgbG9jYXRpb25JZClcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgKHJlc3VsdDogQXJyYXk8UGxhbm5pbmc+KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGxhbm5pbmdzID0gcmVzdWx0O1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImZvdW5kIG1lIHNvbWUgcGxhbm5pbmdzXCIpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzQnVzeSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZGlyKGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgLypUT0RPOiBoYW5kbGUgZXJyb3JzKi9cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuICAgIH1cblxuICAgIGdldEd1aWRlcygpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgbG9jYXRpb25JZCA9IFNldHRpbmdzLmdldExvY2F0aW9uKCk7XG4gICAgICAgIGNvbnN0IGRhdGUgPSBTZXR0aW5ncy5nZXREYXRlKCk7XG4gICAgICAgIHRoaXMuZ3VpZGVTZXJ2aWNlLmdldEFsbEd1aWRlc0ZvcldlZWtBbmRMb2NhdGlvbkFjdGlvbihkYXRlLCBsb2NhdGlvbklkKVxuICAgICAgICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICAocmVzdWx0OiBBcnJheTxHdWlkZT4pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ndWlkZXMgPSBbe2tleTogXCIwXCIsIGxhYmVsOiBcIktpZXMgZWVuIEdpZHNcIn1dO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmd1aWRlcyA9IFsuLi50aGlzLmd1aWRlcywgLi4ucmVzdWx0Lm1hcChcbiAgICAgICAgICAgICAgICAgICAgICAgICh7IGlkLCBndWlkZVNob3J0LCBndWlkZUZpcnN0TmFtZSwgZ3VpZGVMYXN0TmFtZSB9KSA9PiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBrZXk6IGlkLCBsYWJlbDogZ3VpZGVTaG9ydCArIFwiIC0gXCIgKyBndWlkZUZpcnN0TmFtZSArIFwiIFwiICsgZ3VpZGVMYXN0TmFtZSB9KSldO1xuXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5kaXIoZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICAvKlRPRE86IGhhbmRsZSBlcnJvcnMqL1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7XG5cbiAgICB9XG5cbiAgICBkZlByb3BlcnR5Q29tbWl0dGVkKGFyZ3MpIHtcbiAgICAgICAgY29uc3QgZGF0YUZvcm0gPSA8UmFkRGF0YUZvcm0+YXJncy5vYmplY3Q7XG4gICAgICAgIGNvbnN0IHBsYW5uaW5nOiBQbGFubmluZyA9IDxQbGFubmluZz4gSlNPTi5wYXJzZShkYXRhRm9ybS5lZGl0ZWRPYmplY3QpO1xuICAgICAgICB0aGlzLmlzQnVzeSA9IHRydWU7XG5cbiAgICAgICAgaWYgKHBsYW5uaW5nLmd1aWRlSWQgIT09IFwiMFwiKSB7XG4gICAgICAgICAgICB0aGlzLnBsYW5uaW5nU2VydmljZS5wdXRQbGFubmluZ1VwZGF0ZUFjdGlvbihwbGFubmluZylcbiAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlVwZGF0ZWQgcGxhbm5pbmdcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmlzQnVzeSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZGlyKGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8qVE9ETzogaGFuZGxlIGVycm9ycyovXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ29CYWNrKCkge1xuICAgICAgICB0aGlzLnJvdXRlckV4dGVuc2lvbnMuYmFja1RvUHJldmlvdXNQYWdlKCk7XG4gICAgfVxufVxuIl19