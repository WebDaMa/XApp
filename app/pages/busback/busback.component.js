"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var nativescript_angular_1 = require("nativescript-angular");
var settings_1 = require("~/settings/settings");
var customer_service_1 = require("~/shared/services/customer.service");
var BusbackComponent = /** @class */ (function () {
    function BusbackComponent(customerService, routerExtensions, activeRoute) {
        this.customerService = customerService;
        this.routerExtensions = routerExtensions;
        this.activeRoute = activeRoute;
        this.checkinBusBack = {
            total: "0",
            places: [],
            date: ""
        };
    }
    BusbackComponent.prototype.ngOnInit = function () {
        this.getCustomersBusBack();
    };
    BusbackComponent.prototype.getCustomersBusBack = function () {
        var _this = this;
        var date = settings_1.Settings.getDate();
        this.isBusy = true;
        this.customerService.getBusBackCustomersByWeek(date)
            .subscribe(function (result) {
            _this.checkinBusBack = result;
            _this.isBusy = false;
        }, function (error) {
            console.dir(error);
            _this.isBusy = false;
            /*TODO: handle errors*/
        });
    };
    BusbackComponent.prototype.dfPropertyBackCommitted = function (args) {
        var _this = this;
        var dataForm = args.object;
        var busCostumer = JSON.parse(dataForm.editedObject);
        this.isBusy = true;
        this.customerService.putBusBackCustomerAction(busCostumer)
            .subscribe(function () {
            _this.isBusy = false;
            console.log("Updated customer");
        }, function (error) {
            console.dir(error);
            _this.isBusy = false;
            /*TODO: handle errors*/
        });
    };
    BusbackComponent.prototype.goBack = function () {
        this.routerExtensions.navigate(["/tabs/default"], {
            transition: {
                name: "fade"
            }
        });
    };
    BusbackComponent = __decorate([
        core_1.Component({
            selector: "Busback",
            moduleId: module.id,
            providers: [customer_service_1.CustomerService],
            templateUrl: "./busback.component.html"
        }),
        __metadata("design:paramtypes", [customer_service_1.CustomerService, nativescript_angular_1.RouterExtensions,
            router_1.ActivatedRoute])
    ], BusbackComponent);
    return BusbackComponent;
}());
exports.BusbackComponent = BusbackComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVzYmFjay5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJidXNiYWNrLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUE2RDtBQUM3RCwwQ0FBaUQ7QUFDakQsNkRBQXdEO0FBRXhELGdEQUErQztBQUcvQyx1RUFBcUU7QUFRckU7SUFTSSwwQkFBb0IsZUFBZ0MsRUFBVSxnQkFBa0MsRUFDNUUsV0FBMkI7UUFEM0Isb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQVUscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUM1RSxnQkFBVyxHQUFYLFdBQVcsQ0FBZ0I7UUFQL0MsbUJBQWMsR0FBZTtZQUN6QixLQUFLLEVBQUUsR0FBRztZQUNWLE1BQU0sRUFBRSxFQUFFO1lBQ1YsSUFBSSxFQUFFLEVBQUU7U0FDWCxDQUFDO0lBSUYsQ0FBQztJQUVELG1DQUFRLEdBQVI7UUFDSSxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztJQUMvQixDQUFDO0lBRUQsOENBQW1CLEdBQW5CO1FBQUEsaUJBZ0JDO1FBZkcsSUFBTSxJQUFJLEdBQUcsbUJBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNoQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUVuQixJQUFJLENBQUMsZUFBZSxDQUFDLHlCQUF5QixDQUFDLElBQUksQ0FBQzthQUMvQyxTQUFTLENBQ04sVUFBQyxNQUFrQjtZQUNmLEtBQUksQ0FBQyxjQUFjLEdBQUcsTUFBTSxDQUFDO1lBQzdCLEtBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3hCLENBQUMsRUFDRCxVQUFDLEtBQUs7WUFDRixPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ25CLEtBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1lBQ3BCLHVCQUF1QjtRQUMzQixDQUFDLENBQ0osQ0FBQztJQUNWLENBQUM7SUFFRCxrREFBdUIsR0FBdkIsVUFBd0IsSUFBSTtRQUE1QixpQkFrQkM7UUFqQkcsSUFBTSxRQUFRLEdBQWdCLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDMUMsSUFBTSxXQUFXLEdBQThCLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBRWpGLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBRW5CLElBQUksQ0FBQyxlQUFlLENBQUMsd0JBQXdCLENBQUMsV0FBVyxDQUFDO2FBQ3JELFNBQVMsQ0FDTjtZQUNJLEtBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1lBQ3BCLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUNwQyxDQUFDLEVBQ0QsVUFBQyxLQUFLO1lBQ0YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNuQixLQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztZQUNwQix1QkFBdUI7UUFDM0IsQ0FBQyxDQUNKLENBQUM7SUFDVixDQUFDO0lBRUQsaUNBQU0sR0FBTjtRQUNJLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxlQUFlLENBQUMsRUFBRTtZQUM5QyxVQUFVLEVBQUU7Z0JBQ1IsSUFBSSxFQUFFLE1BQU07YUFDZjtTQUNKLENBQUMsQ0FBQztJQUNQLENBQUM7SUE3RFEsZ0JBQWdCO1FBTjVCLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsU0FBUztZQUNuQixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsU0FBUyxFQUFFLENBQUMsa0NBQWUsQ0FBQztZQUM1QixXQUFXLEVBQUUsMEJBQTBCO1NBQzFDLENBQUM7eUNBVXVDLGtDQUFlLEVBQTRCLHVDQUFnQjtZQUMvRCx1QkFBYztPQVZ0QyxnQkFBZ0IsQ0E4RDVCO0lBQUQsdUJBQUM7Q0FBQSxBQTlERCxJQThEQztBQTlEWSw0Q0FBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgVmlld0NoaWxkIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhclwiO1xuaW1wb3J0IHsgUmFkRGF0YUZvcm0gfSBmcm9tIFwibmF0aXZlc2NyaXB0LXVpLWRhdGFmb3JtXCI7XG5pbXBvcnQgeyBTZXR0aW5ncyB9IGZyb20gXCJ+L3NldHRpbmdzL3NldHRpbmdzXCI7XG5pbXBvcnQgeyBCdXNDdXN0b21lciB9IGZyb20gXCJ+L3NoYXJlZC9tb2RlbHMvYnVzQ3VzdG9tZXIubW9kZWxcIjtcbmltcG9ydCB7IENoZWNraW5CdXMgfSBmcm9tIFwifi9zaGFyZWQvbW9kZWxzL2NoZWNraW5CdXMubW9kZWxcIjtcbmltcG9ydCB7IEN1c3RvbWVyU2VydmljZSB9IGZyb20gXCJ+L3NoYXJlZC9zZXJ2aWNlcy9jdXN0b21lci5zZXJ2aWNlXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcIkJ1c2JhY2tcIixcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHByb3ZpZGVyczogW0N1c3RvbWVyU2VydmljZV0sXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9idXNiYWNrLmNvbXBvbmVudC5odG1sXCJcbn0pXG5leHBvcnQgY2xhc3MgQnVzYmFja0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgaXNCdXN5OiBib29sZWFuO1xuXG4gICAgY2hlY2tpbkJ1c0JhY2s6IENoZWNraW5CdXMgPSB7XG4gICAgICAgIHRvdGFsOiBcIjBcIixcbiAgICAgICAgcGxhY2VzOiBbXSxcbiAgICAgICAgZGF0ZTogXCJcIlxuICAgIH07XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGN1c3RvbWVyU2VydmljZTogQ3VzdG9tZXJTZXJ2aWNlLCBwcml2YXRlIHJvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBhY3RpdmVSb3V0ZTogQWN0aXZhdGVkUm91dGUpIHtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5nZXRDdXN0b21lcnNCdXNCYWNrKCk7XG4gICAgfVxuXG4gICAgZ2V0Q3VzdG9tZXJzQnVzQmFjaygpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgZGF0ZSA9IFNldHRpbmdzLmdldERhdGUoKTtcbiAgICAgICAgdGhpcy5pc0J1c3kgPSB0cnVlO1xuXG4gICAgICAgIHRoaXMuY3VzdG9tZXJTZXJ2aWNlLmdldEJ1c0JhY2tDdXN0b21lcnNCeVdlZWsoZGF0ZSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgKHJlc3VsdDogQ2hlY2tpbkJ1cykgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNoZWNraW5CdXNCYWNrID0gcmVzdWx0O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzQnVzeSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZGlyKGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc0J1c3kgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgLypUT0RPOiBoYW5kbGUgZXJyb3JzKi9cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuICAgIH1cblxuICAgIGRmUHJvcGVydHlCYWNrQ29tbWl0dGVkKGFyZ3MpIHtcbiAgICAgICAgY29uc3QgZGF0YUZvcm0gPSA8UmFkRGF0YUZvcm0+YXJncy5vYmplY3Q7XG4gICAgICAgIGNvbnN0IGJ1c0Nvc3R1bWVyOiBCdXNDdXN0b21lciA9IDxCdXNDdXN0b21lcj4gSlNPTi5wYXJzZShkYXRhRm9ybS5lZGl0ZWRPYmplY3QpO1xuXG4gICAgICAgIHRoaXMuaXNCdXN5ID0gdHJ1ZTtcblxuICAgICAgICB0aGlzLmN1c3RvbWVyU2VydmljZS5wdXRCdXNCYWNrQ3VzdG9tZXJBY3Rpb24oYnVzQ29zdHVtZXIpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc0J1c3kgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJVcGRhdGVkIGN1c3RvbWVyXCIpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZGlyKGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc0J1c3kgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgLypUT0RPOiBoYW5kbGUgZXJyb3JzKi9cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuICAgIH1cblxuICAgIGdvQmFjaygpIHtcbiAgICAgICAgdGhpcy5yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFtcIi90YWJzL2RlZmF1bHRcIl0sIHtcbiAgICAgICAgICAgIHRyYW5zaXRpb246IHtcbiAgICAgICAgICAgICAgICBuYW1lOiBcImZhZGVcIlxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG59XG4iXX0=