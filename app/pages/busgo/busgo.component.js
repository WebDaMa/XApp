"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var nativescript_angular_1 = require("nativescript-angular");
var settings_1 = require("~/settings/settings");
var customer_service_1 = require("~/shared/services/customer.service");
var BusgoComponent = /** @class */ (function () {
    function BusgoComponent(customerService, routerExtensions, activeRoute) {
        this.customerService = customerService;
        this.routerExtensions = routerExtensions;
        this.activeRoute = activeRoute;
        this.checkinBusGo = {
            total: "0",
            places: [],
            date: ""
        };
    }
    BusgoComponent.prototype.ngOnInit = function () {
        this.getCustomersBusGo();
    };
    BusgoComponent.prototype.getCustomersBusGo = function () {
        var _this = this;
        var date = settings_1.Settings.getDate();
        this.isBusy = true;
        this.customerService.getBusGoCustomersByWeek(date)
            .subscribe(function (result) {
            _this.checkinBusGo = result;
            console.log("got me some bus customers");
            _this.isBusy = false;
        }, function (error) {
            console.dir(error);
            _this.isBusy = false;
            /*TODO: handle errors*/
        });
    };
    BusgoComponent.prototype.dfPropertyGoCommitted = function (args) {
        var _this = this;
        var dataForm = args.object;
        var busCostumer = JSON.parse(dataForm.editedObject);
        this.isBusy = true;
        this.customerService.putBusGoCustomerAction(busCostumer)
            .subscribe(function (res) {
            console.log("Updated customer");
            _this.isBusy = false;
        }, function (error) {
            console.dir(error);
            _this.isBusy = false;
            /*TODO: handle errors*/
        });
    };
    BusgoComponent.prototype.goBack = function () {
        this.routerExtensions.navigate(["/tabs/default"], {
            transition: {
                name: "fade"
            }
        });
    };
    BusgoComponent = __decorate([
        core_1.Component({
            selector: "Busgo",
            moduleId: module.id,
            providers: [customer_service_1.CustomerService],
            templateUrl: "./busgo.component.html"
        }),
        __metadata("design:paramtypes", [customer_service_1.CustomerService, nativescript_angular_1.RouterExtensions,
            router_1.ActivatedRoute])
    ], BusgoComponent);
    return BusgoComponent;
}());
exports.BusgoComponent = BusgoComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVzZ28uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYnVzZ28uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBQ2xELDBDQUFpRDtBQUNqRCw2REFBd0Q7QUFFeEQsZ0RBQStDO0FBRy9DLHVFQUFxRTtBQVFyRTtJQVVJLHdCQUFvQixlQUFnQyxFQUFVLGdCQUFrQyxFQUM1RSxXQUEyQjtRQUQzQixvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFBVSxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQzVFLGdCQUFXLEdBQVgsV0FBVyxDQUFnQjtRQVQvQyxpQkFBWSxHQUFlO1lBQ3ZCLEtBQUssRUFBRSxHQUFHO1lBQ1YsTUFBTSxFQUFFLEVBQUU7WUFDVixJQUFJLEVBQUUsRUFBRTtTQUNYLENBQUM7SUFNRixDQUFDO0lBRUQsaUNBQVEsR0FBUjtRQUNJLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFFRCwwQ0FBaUIsR0FBakI7UUFBQSxpQkFpQkM7UUFoQkcsSUFBTSxJQUFJLEdBQUcsbUJBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNoQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUVuQixJQUFJLENBQUMsZUFBZSxDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FBQzthQUM3QyxTQUFTLENBQ04sVUFBQyxNQUFrQjtZQUNmLEtBQUksQ0FBQyxZQUFZLEdBQUcsTUFBTSxDQUFDO1lBQzNCLE9BQU8sQ0FBQyxHQUFHLENBQUMsMkJBQTJCLENBQUMsQ0FBQztZQUN6QyxLQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUN4QixDQUFDLEVBQ0QsVUFBQyxLQUFLO1lBQ0YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNuQixLQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztZQUNwQix1QkFBdUI7UUFDM0IsQ0FBQyxDQUNKLENBQUM7SUFDVixDQUFDO0lBRUQsOENBQXFCLEdBQXJCLFVBQXNCLElBQUk7UUFBMUIsaUJBa0JDO1FBakJHLElBQU0sUUFBUSxHQUFnQixJQUFJLENBQUMsTUFBTSxDQUFDO1FBQzFDLElBQU0sV0FBVyxHQUE4QixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUVqRixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUVuQixJQUFJLENBQUMsZUFBZSxDQUFDLHNCQUFzQixDQUFDLFdBQVcsQ0FBQzthQUNuRCxTQUFTLENBQ04sVUFBQyxHQUFHO1lBQ0EsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1lBQ2hDLEtBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3hCLENBQUMsRUFDRCxVQUFDLEtBQUs7WUFDRixPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ25CLEtBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1lBQ3BCLHVCQUF1QjtRQUMzQixDQUFDLENBQ0osQ0FBQztJQUNWLENBQUM7SUFFRCwrQkFBTSxHQUFOO1FBQ0ksSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxFQUFFO1lBQzlDLFVBQVUsRUFBRTtnQkFDUixJQUFJLEVBQUUsTUFBTTthQUNmO1NBQ0osQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQS9EUSxjQUFjO1FBTjFCLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsT0FBTztZQUNqQixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsU0FBUyxFQUFFLENBQUMsa0NBQWUsQ0FBQztZQUM1QixXQUFXLEVBQUUsd0JBQXdCO1NBQ3hDLENBQUM7eUNBV3VDLGtDQUFlLEVBQTRCLHVDQUFnQjtZQUMvRCx1QkFBYztPQVh0QyxjQUFjLENBZ0UxQjtJQUFELHFCQUFDO0NBQUEsQUFoRUQsSUFnRUM7QUFoRVksd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXJcIjtcbmltcG9ydCB7IFJhZERhdGFGb3JtIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC11aS1kYXRhZm9ybVwiO1xuaW1wb3J0IHsgU2V0dGluZ3MgfSBmcm9tIFwifi9zZXR0aW5ncy9zZXR0aW5nc1wiO1xuaW1wb3J0IHsgQnVzQ3VzdG9tZXIgfSBmcm9tIFwifi9zaGFyZWQvbW9kZWxzL2J1c0N1c3RvbWVyLm1vZGVsXCI7XG5pbXBvcnQgeyBDaGVja2luQnVzIH0gZnJvbSBcIn4vc2hhcmVkL21vZGVscy9jaGVja2luQnVzLm1vZGVsXCI7XG5pbXBvcnQgeyBDdXN0b21lclNlcnZpY2UgfSBmcm9tIFwifi9zaGFyZWQvc2VydmljZXMvY3VzdG9tZXIuc2VydmljZVwiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJCdXNnb1wiLFxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgcHJvdmlkZXJzOiBbQ3VzdG9tZXJTZXJ2aWNlXSxcbiAgICB0ZW1wbGF0ZVVybDogXCIuL2J1c2dvLmNvbXBvbmVudC5odG1sXCJcbn0pXG5leHBvcnQgY2xhc3MgQnVzZ29Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gICAgY2hlY2tpbkJ1c0dvOiBDaGVja2luQnVzID0ge1xuICAgICAgICB0b3RhbDogXCIwXCIsXG4gICAgICAgIHBsYWNlczogW10sXG4gICAgICAgIGRhdGU6IFwiXCJcbiAgICB9O1xuXG4gICAgaXNCdXN5OiBib29sZWFuO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBjdXN0b21lclNlcnZpY2U6IEN1c3RvbWVyU2VydmljZSwgcHJpdmF0ZSByb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgYWN0aXZlUm91dGU6IEFjdGl2YXRlZFJvdXRlKSB7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZ2V0Q3VzdG9tZXJzQnVzR28oKTtcbiAgICB9XG5cbiAgICBnZXRDdXN0b21lcnNCdXNHbygpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgZGF0ZSA9IFNldHRpbmdzLmdldERhdGUoKTtcbiAgICAgICAgdGhpcy5pc0J1c3kgPSB0cnVlO1xuXG4gICAgICAgIHRoaXMuY3VzdG9tZXJTZXJ2aWNlLmdldEJ1c0dvQ3VzdG9tZXJzQnlXZWVrKGRhdGUpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgIChyZXN1bHQ6IENoZWNraW5CdXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGVja2luQnVzR28gPSByZXN1bHQ7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZ290IG1lIHNvbWUgYnVzIGN1c3RvbWVyc1wiKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc0J1c3kgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmRpcihlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNCdXN5ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIC8qVE9ETzogaGFuZGxlIGVycm9ycyovXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcbiAgICB9XG5cbiAgICBkZlByb3BlcnR5R29Db21taXR0ZWQoYXJncykge1xuICAgICAgICBjb25zdCBkYXRhRm9ybSA9IDxSYWREYXRhRm9ybT5hcmdzLm9iamVjdDtcbiAgICAgICAgY29uc3QgYnVzQ29zdHVtZXI6IEJ1c0N1c3RvbWVyID0gPEJ1c0N1c3RvbWVyPiBKU09OLnBhcnNlKGRhdGFGb3JtLmVkaXRlZE9iamVjdCk7XG5cbiAgICAgICAgdGhpcy5pc0J1c3kgPSB0cnVlO1xuXG4gICAgICAgIHRoaXMuY3VzdG9tZXJTZXJ2aWNlLnB1dEJ1c0dvQ3VzdG9tZXJBY3Rpb24oYnVzQ29zdHVtZXIpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgIChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJVcGRhdGVkIGN1c3RvbWVyXCIpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzQnVzeSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZGlyKGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc0J1c3kgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgLypUT0RPOiBoYW5kbGUgZXJyb3JzKi9cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuICAgIH1cblxuICAgIGdvQmFjaygpIHtcbiAgICAgICAgdGhpcy5yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFtcIi90YWJzL2RlZmF1bHRcIl0sIHtcbiAgICAgICAgICAgIHRyYW5zaXRpb246IHtcbiAgICAgICAgICAgICAgICBuYW1lOiBcImZhZGVcIlxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG59XG4iXX0=