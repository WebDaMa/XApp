"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var nativescript_angular_1 = require("nativescript-angular");
var settings_1 = require("~/settings/settings");
var customer_service_1 = require("~/shared/services/customer.service");
var VolpensionComponent = /** @class */ (function () {
    function VolpensionComponent(customerService, routerExtensions) {
        this.customerService = customerService;
        this.routerExtensions = routerExtensions;
        this.volpension = {
            total: "0",
            allInTypes: [],
            date: ""
        };
        this.isBusy = true;
    }
    VolpensionComponent.prototype.ngOnInit = function () {
        this.getCustomersVolpension();
    };
    VolpensionComponent.prototype.getCustomersVolpension = function () {
        var _this = this;
        var date = settings_1.Settings.getDate();
        var locationId = settings_1.Settings.getLocation();
        this.customerService.getAllByAllInTypeForLocationAndPeriodAction(locationId, date)
            .subscribe(function (result) {
            _this.volpension = result;
            console.log("got me some volpension customers");
            _this.isBusy = false;
        }, function (error) {
            console.dir(error);
            /*TODO: handle errors*/
            _this.isBusy = false;
        });
    };
    VolpensionComponent.prototype.goBack = function () {
        this.routerExtensions.backToPreviousPage();
    };
    VolpensionComponent = __decorate([
        core_1.Component({
            selector: "Volpension",
            moduleId: module.id,
            providers: [customer_service_1.CustomerService],
            templateUrl: "./volpension.component.html"
        }),
        __metadata("design:paramtypes", [customer_service_1.CustomerService, nativescript_angular_1.RouterExtensions])
    ], VolpensionComponent);
    return VolpensionComponent;
}());
exports.VolpensionComponent = VolpensionComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidm9scGVuc2lvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ2b2xwZW5zaW9uLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUE2RDtBQUM3RCw2REFBd0Q7QUFDeEQsZ0RBQStDO0FBRS9DLHVFQUFxRTtBQVFyRTtJQVNJLDZCQUFvQixlQUFnQyxFQUFVLGdCQUFrQztRQUE1RSxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFBVSxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBUmhHLGVBQVUsR0FBZTtZQUNyQixLQUFLLEVBQUUsR0FBRztZQUNWLFVBQVUsRUFBRSxFQUFFO1lBQ2QsSUFBSSxFQUFFLEVBQUU7U0FDWCxDQUFDO1FBRUYsV0FBTSxHQUFZLElBQUksQ0FBQztJQUd2QixDQUFDO0lBRUQsc0NBQVEsR0FBUjtRQUNJLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO0lBQ2xDLENBQUM7SUFFRCxvREFBc0IsR0FBdEI7UUFBQSxpQkFrQkM7UUFqQkcsSUFBTSxJQUFJLEdBQUcsbUJBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNoQyxJQUFNLFVBQVUsR0FBRyxtQkFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBRTFDLElBQUksQ0FBQyxlQUFlLENBQUMsMkNBQTJDLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQzthQUM3RSxTQUFTLENBQ04sVUFBQyxNQUFrQjtZQUNmLEtBQUksQ0FBQyxVQUFVLEdBQUcsTUFBTSxDQUFDO1lBQ3pCLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0NBQWtDLENBQUMsQ0FBQztZQUNoRCxLQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUN4QixDQUFDLEVBQ0QsVUFBQyxLQUFLO1lBQ0YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNuQix1QkFBdUI7WUFDdkIsS0FBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFFeEIsQ0FBQyxDQUNKLENBQUM7SUFDVixDQUFDO0lBRUQsb0NBQU0sR0FBTjtRQUNJLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO0lBQy9DLENBQUM7SUF0Q1EsbUJBQW1CO1FBTi9CLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsWUFBWTtZQUN0QixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsU0FBUyxFQUFFLENBQUMsa0NBQWUsQ0FBQztZQUM1QixXQUFXLEVBQUUsNkJBQTZCO1NBQzdDLENBQUM7eUNBVXVDLGtDQUFlLEVBQTRCLHVDQUFnQjtPQVR2RixtQkFBbUIsQ0F1Qy9CO0lBQUQsMEJBQUM7Q0FBQSxBQXZDRCxJQXVDQztBQXZDWSxrREFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgVmlld0NoaWxkIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXJcIjtcbmltcG9ydCB7IFNldHRpbmdzIH0gZnJvbSBcIn4vc2V0dGluZ3Mvc2V0dGluZ3NcIjtcbmltcG9ydCB7IFZvbHBlbnNpb24gfSBmcm9tIFwifi9zaGFyZWQvbW9kZWxzL3ZvbHBlbnNpb24ubW9kZWxcIjtcbmltcG9ydCB7IEN1c3RvbWVyU2VydmljZSB9IGZyb20gXCJ+L3NoYXJlZC9zZXJ2aWNlcy9jdXN0b21lci5zZXJ2aWNlXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcIlZvbHBlbnNpb25cIixcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHByb3ZpZGVyczogW0N1c3RvbWVyU2VydmljZV0sXG4gICAgdGVtcGxhdGVVcmw6IFwiLi92b2xwZW5zaW9uLmNvbXBvbmVudC5odG1sXCJcbn0pXG5leHBvcnQgY2xhc3MgVm9scGVuc2lvbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgdm9scGVuc2lvbjogVm9scGVuc2lvbiA9IHtcbiAgICAgICAgdG90YWw6IFwiMFwiLFxuICAgICAgICBhbGxJblR5cGVzOiBbXSxcbiAgICAgICAgZGF0ZTogXCJcIlxuICAgIH07XG5cbiAgICBpc0J1c3k6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBjdXN0b21lclNlcnZpY2U6IEN1c3RvbWVyU2VydmljZSwgcHJpdmF0ZSByb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zKSB7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZ2V0Q3VzdG9tZXJzVm9scGVuc2lvbigpO1xuICAgIH1cblxuICAgIGdldEN1c3RvbWVyc1ZvbHBlbnNpb24oKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGRhdGUgPSBTZXR0aW5ncy5nZXREYXRlKCk7XG4gICAgICAgIGNvbnN0IGxvY2F0aW9uSWQgPSBTZXR0aW5ncy5nZXRMb2NhdGlvbigpO1xuXG4gICAgICAgIHRoaXMuY3VzdG9tZXJTZXJ2aWNlLmdldEFsbEJ5QWxsSW5UeXBlRm9yTG9jYXRpb25BbmRQZXJpb2RBY3Rpb24obG9jYXRpb25JZCwgZGF0ZSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgKHJlc3VsdDogVm9scGVuc2lvbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnZvbHBlbnNpb24gPSByZXN1bHQ7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZ290IG1lIHNvbWUgdm9scGVuc2lvbiBjdXN0b21lcnNcIik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNCdXN5ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5kaXIoZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICAvKlRPRE86IGhhbmRsZSBlcnJvcnMqL1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzQnVzeSA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcbiAgICB9XG5cbiAgICBnb0JhY2soKSB7XG4gICAgICAgIHRoaXMucm91dGVyRXh0ZW5zaW9ucy5iYWNrVG9QcmV2aW91c1BhZ2UoKTtcbiAgICB9XG59XG4iXX0=