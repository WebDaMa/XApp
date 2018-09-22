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
        this.isBusy = true;
        var locationId = settings_1.Settings.getLocation();
        var date = settings_1.Settings.getDate();
        this.guideService.getAllGuidesForWeekAndLocationAction(date, locationId)
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxhbm5pbmcuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicGxhbm5pbmcuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBQ2xELDZEQUF3RDtBQUV4RCxnREFBK0M7QUFHL0MsdUVBQXFFO0FBQ3JFLGlFQUErRDtBQUMvRCx1RUFBcUU7QUFRckU7SUFNSSwyQkFBb0IsZUFBZ0MsRUFDaEMsZ0JBQWtDLEVBQVUsZUFBZ0MsRUFDNUUsWUFBMEI7UUFGMUIsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQ2hDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFBVSxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDNUUsaUJBQVksR0FBWixZQUFZLENBQWM7UUFQOUMsV0FBTSxHQUFrQixFQUFFLENBQUM7UUFHM0IsV0FBTSxHQUFZLEtBQUssQ0FBQztJQU14QixDQUFDO0lBRUQsb0NBQVEsR0FBUjtRQUNJLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBRUQsd0NBQVksR0FBWjtRQUFBLGlCQWdCQztRQWZHLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ25CLElBQU0sVUFBVSxHQUFHLG1CQUFRLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDMUMsSUFBTSxJQUFJLEdBQUcsbUJBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNoQyxJQUFJLENBQUMsZUFBZSxDQUFDLDRCQUE0QixDQUFDLElBQUksRUFBRSxVQUFVLENBQUM7YUFDOUQsU0FBUyxDQUNOLFVBQUMsTUFBdUI7WUFDcEIsS0FBSSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUM7WUFDeEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO1lBQ3ZDLEtBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3hCLENBQUMsRUFDRCxVQUFDLEtBQUs7WUFDRixPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ25CLHVCQUF1QjtRQUMzQixDQUFDLENBQ0osQ0FBQztJQUNWLENBQUM7SUFFRCxxQ0FBUyxHQUFUO1FBQUEsaUJBb0JDO1FBbkJHLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ25CLElBQU0sVUFBVSxHQUFHLG1CQUFRLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDMUMsSUFBTSxJQUFJLEdBQUcsbUJBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNoQyxJQUFJLENBQUMsWUFBWSxDQUFDLG9DQUFvQyxDQUFDLElBQUksRUFBRSxVQUFVLENBQUM7YUFDbkUsU0FBUyxDQUNOLFVBQUMsTUFBb0I7WUFDakIsS0FBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsZUFBZSxFQUFDLENBQUMsQ0FBQztZQUNuRCxLQUFJLENBQUMsTUFBTSxHQUFPLEtBQUksQ0FBQyxNQUFNLFFBQUssTUFBTSxDQUFDLEdBQUcsQ0FDeEMsVUFBQyxFQUFpRDtvQkFBL0MsVUFBRSxFQUFFLDBCQUFVLEVBQUUsa0NBQWMsRUFBRSxnQ0FBYTtnQkFBTyxPQUFBLENBQ25ELEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsVUFBVSxHQUFHLEtBQUssR0FBRyxjQUFjLEdBQUcsR0FBRyxHQUFHLGFBQWEsRUFBRSxDQUFDO1lBRDNCLENBQzJCLENBQUMsQ0FBQyxDQUFDO1lBQ3pGLEtBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUV4QixDQUFDLEVBQ0QsVUFBQyxLQUFLO1lBQ0YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNuQix1QkFBdUI7UUFDM0IsQ0FBQyxDQUNKLENBQUM7SUFFVixDQUFDO0lBRUQsK0NBQW1CLEdBQW5CLFVBQW9CLElBQUk7UUFBeEIsaUJBbUJDO1FBbEJHLElBQU0sUUFBUSxHQUFnQixJQUFJLENBQUMsTUFBTSxDQUFDO1FBQzFDLElBQU0sUUFBUSxHQUF3QixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUV4RSxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsT0FBTyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDM0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7WUFFbkIsSUFBSSxDQUFDLGVBQWUsQ0FBQyx1QkFBdUIsQ0FBQyxRQUFRLENBQUM7aUJBQ2pELFNBQVMsQ0FDTixVQUFDLEdBQUc7Z0JBQ0EsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO2dCQUNoQyxLQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztZQUN4QixDQUFDLEVBQ0QsVUFBQyxLQUFLO2dCQUNGLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ25CLHVCQUF1QjtZQUMzQixDQUFDLENBQ0osQ0FBQztRQUNWLENBQUM7SUFDTCxDQUFDO0lBRUQsa0NBQU0sR0FBTjtRQUNJLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO0lBQy9DLENBQUM7SUEvRVEsaUJBQWlCO1FBTjdCLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsVUFBVTtZQUNwQixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsU0FBUyxFQUFFLENBQUMsa0NBQWUsRUFBRSxrQ0FBZSxFQUFFLDRCQUFZLENBQUM7WUFDM0QsV0FBVyxFQUFFLDJCQUEyQjtTQUMzQyxDQUFDO3lDQU91QyxrQ0FBZTtZQUNkLHVDQUFnQixFQUEyQixrQ0FBZTtZQUM5RCw0QkFBWTtPQVJyQyxpQkFBaUIsQ0FnRjdCO0lBQUQsd0JBQUM7Q0FBQSxBQWhGRCxJQWdGQztBQWhGWSw4Q0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyXCI7XG5pbXBvcnQgeyBSYWREYXRhRm9ybSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtdWktZGF0YWZvcm1cIjtcbmltcG9ydCB7IFNldHRpbmdzIH0gZnJvbSBcIn4vc2V0dGluZ3Mvc2V0dGluZ3NcIjtcbmltcG9ydCB7IEd1aWRlIH0gZnJvbSBcIn4vc2hhcmVkL21vZGVscy9ndWlkZS5tb2RlbFwiO1xuaW1wb3J0IHsgUGxhbm5pbmcgfSBmcm9tIFwifi9zaGFyZWQvbW9kZWxzL3BsYW5uaW5nLm1vZGVsXCI7XG5pbXBvcnQgeyBDdXN0b21lclNlcnZpY2UgfSBmcm9tIFwifi9zaGFyZWQvc2VydmljZXMvY3VzdG9tZXIuc2VydmljZVwiO1xuaW1wb3J0IHsgR3VpZGVTZXJ2aWNlIH0gZnJvbSBcIn4vc2hhcmVkL3NlcnZpY2VzL2d1aWRlLnNlcnZpY2VcIjtcbmltcG9ydCB7IFBsYW5uaW5nU2VydmljZSB9IGZyb20gXCJ+L3NoYXJlZC9zZXJ2aWNlcy9wbGFubmluZy5zZXJ2aWNlXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcIlBsYW5uaW5nXCIsXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICBwcm92aWRlcnM6IFtDdXN0b21lclNlcnZpY2UsIFBsYW5uaW5nU2VydmljZSwgR3VpZGVTZXJ2aWNlXSxcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3BsYW5uaW5nLmNvbXBvbmVudC5odG1sXCJcbn0pXG5leHBvcnQgY2xhc3MgUGxhbm5pbmdDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIGd1aWRlczogQXJyYXk8b2JqZWN0PiA9IFtdO1xuICAgIHBsYW5uaW5nczogQXJyYXk8UGxhbm5pbmc+O1xuXG4gICAgaXNCdXN5OiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGN1c3RvbWVyU2VydmljZTogQ3VzdG9tZXJTZXJ2aWNlLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgcm91dGVyRXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9ucywgcHJpdmF0ZSBwbGFubmluZ1NlcnZpY2U6IFBsYW5uaW5nU2VydmljZSxcbiAgICAgICAgICAgICAgICBwcml2YXRlIGd1aWRlU2VydmljZTogR3VpZGVTZXJ2aWNlKSB7XG5cbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5nZXRHdWlkZXMoKTtcbiAgICB9XG5cbiAgICBnZXRQbGFubmluZ3MoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuaXNCdXN5ID0gdHJ1ZTtcbiAgICAgICAgY29uc3QgbG9jYXRpb25JZCA9IFNldHRpbmdzLmdldExvY2F0aW9uKCk7XG4gICAgICAgIGNvbnN0IGRhdGUgPSBTZXR0aW5ncy5nZXREYXRlKCk7XG4gICAgICAgIHRoaXMucGxhbm5pbmdTZXJ2aWNlLmdldEFsbEJ5RGF5QW5kTG9jYXRpb25BY3Rpb24oZGF0ZSwgbG9jYXRpb25JZClcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgKHJlc3VsdDogQXJyYXk8UGxhbm5pbmc+KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGxhbm5pbmdzID0gcmVzdWx0O1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImZvdW5kIG1lIHNvbWUgcGxhbm5pbmdzXCIpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzQnVzeSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZGlyKGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgLypUT0RPOiBoYW5kbGUgZXJyb3JzKi9cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuICAgIH1cblxuICAgIGdldEd1aWRlcygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5pc0J1c3kgPSB0cnVlO1xuICAgICAgICBjb25zdCBsb2NhdGlvbklkID0gU2V0dGluZ3MuZ2V0TG9jYXRpb24oKTtcbiAgICAgICAgY29uc3QgZGF0ZSA9IFNldHRpbmdzLmdldERhdGUoKTtcbiAgICAgICAgdGhpcy5ndWlkZVNlcnZpY2UuZ2V0QWxsR3VpZGVzRm9yV2Vla0FuZExvY2F0aW9uQWN0aW9uKGRhdGUsIGxvY2F0aW9uSWQpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgIChyZXN1bHQ6IEFycmF5PEd1aWRlPikgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmd1aWRlcyA9IFt7a2V5OiBcIjBcIiwgbGFiZWw6IFwiS2llcyBlZW4gR2lkc1wifV07XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ3VpZGVzID0gWy4uLnRoaXMuZ3VpZGVzLCAuLi5yZXN1bHQubWFwKFxuICAgICAgICAgICAgICAgICAgICAgICAgKHsgaWQsIGd1aWRlU2hvcnQsIGd1aWRlRmlyc3ROYW1lLCBndWlkZUxhc3ROYW1lIH0pID0+IChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGtleTogaWQsIGxhYmVsOiBndWlkZVNob3J0ICsgXCIgLSBcIiArIGd1aWRlRmlyc3ROYW1lICsgXCIgXCIgKyBndWlkZUxhc3ROYW1lIH0pKV07XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0UGxhbm5pbmdzKCk7XG5cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmRpcihlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIC8qVE9ETzogaGFuZGxlIGVycm9ycyovXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcblxuICAgIH1cblxuICAgIGRmUHJvcGVydHlDb21taXR0ZWQoYXJncykge1xuICAgICAgICBjb25zdCBkYXRhRm9ybSA9IDxSYWREYXRhRm9ybT5hcmdzLm9iamVjdDtcbiAgICAgICAgY29uc3QgcGxhbm5pbmc6IFBsYW5uaW5nID0gPFBsYW5uaW5nPiBKU09OLnBhcnNlKGRhdGFGb3JtLmVkaXRlZE9iamVjdCk7XG5cbiAgICAgICAgaWYgKHBsYW5uaW5nLmd1aWRlSWQgIT09IFwiMFwiKSB7XG4gICAgICAgICAgICB0aGlzLmlzQnVzeSA9IHRydWU7XG5cbiAgICAgICAgICAgIHRoaXMucGxhbm5pbmdTZXJ2aWNlLnB1dFBsYW5uaW5nVXBkYXRlQWN0aW9uKHBsYW5uaW5nKVxuICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgIChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVXBkYXRlZCBwbGFubmluZ1wiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaXNCdXN5ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5kaXIoZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLypUT0RPOiBoYW5kbGUgZXJyb3JzKi9cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnb0JhY2soKSB7XG4gICAgICAgIHRoaXMucm91dGVyRXh0ZW5zaW9ucy5iYWNrVG9QcmV2aW91c1BhZ2UoKTtcbiAgICB9XG59XG4iXX0=