"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var nativescript_angular_1 = require("nativescript-angular");
var operators_1 = require("rxjs/operators");
var customer_service_1 = require("~/shared/services/customer.service");
var BillDetailComponent = /** @class */ (function () {
    function BillDetailComponent(customerService, routerExtensions, pageRoute, activeRoute) {
        var _this = this;
        this.customerService = customerService;
        this.routerExtensions = routerExtensions;
        this.pageRoute = pageRoute;
        this.activeRoute = activeRoute;
        this.customerBillDetail = {
            id: "",
            customer: "",
            booker: {
                id: "",
                customer: "",
                total: "",
                payed: false
            },
            totals: [],
            options: []
        };
        this.isBusy = true;
        this.pageRoute.activatedRoute.pipe(operators_1.switchMap(function (activatedRoute) { return activatedRoute.params; })).forEach(function (params) { _this.customerId = params.customer_id; });
    }
    BillDetailComponent.prototype.ngOnInit = function () {
        this.getCustomerDetail();
    };
    BillDetailComponent.prototype.getCustomerDetail = function () {
        var _this = this;
        this.isBusy = true;
        this.customerService.getBillByCustomerId(this.customerId)
            .subscribe(function (result) {
            _this.customerBillDetail = result;
            console.log("found me some customer bill detail");
            _this.isBusy = false;
        }, function (error) {
            console.dir(error);
            /*TODO: handle errors*/
        });
    };
    BillDetailComponent.prototype.dfPropertyPayedCommitted = function (args) {
        var _this = this;
        var dataForm = args.object;
        var customer = JSON.parse(dataForm.editedObject);
        this.isBusy = true;
        this.customerService.putBillPayedAction(customer).subscribe(function (res) {
            console.log("Updated customer");
            _this.getCustomerDetail();
            _this.isBusy = false;
        }, function (error) {
            console.dir(error);
            /*TODO: handle errors*/
        });
    };
    BillDetailComponent.prototype.goBack = function () {
        this.routerExtensions.back();
    };
    BillDetailComponent = __decorate([
        core_1.Component({
            selector: "BillDetail",
            moduleId: module.id,
            providers: [customer_service_1.CustomerService],
            templateUrl: "./billDetail.component.html"
        }),
        __metadata("design:paramtypes", [customer_service_1.CustomerService,
            nativescript_angular_1.RouterExtensions, nativescript_angular_1.PageRoute,
            router_1.ActivatedRoute])
    ], BillDetailComponent);
    return BillDetailComponent;
}());
exports.BillDetailComponent = BillDetailComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmlsbERldGFpbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJiaWxsRGV0YWlsLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFrRDtBQUNsRCwwQ0FBaUQ7QUFDakQsNkRBQW1FO0FBRW5FLDRDQUEyQztBQUczQyx1RUFBcUU7QUFRckU7SUFpQkksNkJBQW9CLGVBQWdDLEVBQ2hDLGdCQUFrQyxFQUFVLFNBQW9CLEVBQ2hFLFdBQTJCO1FBRi9DLGlCQU1DO1FBTm1CLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUNoQyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQVUsY0FBUyxHQUFULFNBQVMsQ0FBVztRQUNoRSxnQkFBVyxHQUFYLFdBQVcsQ0FBZ0I7UUFqQi9DLHVCQUFrQixHQUF1QjtZQUNyQyxFQUFFLEVBQUUsRUFBRTtZQUNOLFFBQVEsRUFBRSxFQUFFO1lBQ1osTUFBTSxFQUFFO2dCQUNKLEVBQUUsRUFBRSxFQUFFO2dCQUNOLFFBQVEsRUFBRSxFQUFFO2dCQUNaLEtBQUssRUFBRSxFQUFFO2dCQUNULEtBQUssRUFBRSxLQUFLO2FBQ2Y7WUFDRCxNQUFNLEVBQUUsRUFBRTtZQUNWLE9BQU8sRUFBRSxFQUFFO1NBQ2QsQ0FBQztRQUVGLFdBQU0sR0FBWSxJQUFJLENBQUM7UUFLbkIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUM5QixxQkFBUyxDQUFDLFVBQUMsY0FBYyxJQUFLLE9BQUEsY0FBYyxDQUFDLE1BQU0sRUFBckIsQ0FBcUIsQ0FBQyxDQUN2RCxDQUFDLE9BQU8sQ0FBQyxVQUFDLE1BQU0sSUFBTyxLQUFJLENBQUMsVUFBVSxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNyRSxDQUFDO0lBRUQsc0NBQVEsR0FBUjtRQUNJLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFFRCwrQ0FBaUIsR0FBakI7UUFBQSxpQkFjQztRQWJHLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ25CLElBQUksQ0FBQyxlQUFlLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQzthQUNwRCxTQUFTLENBQ04sVUFBQyxNQUEwQjtZQUN2QixLQUFJLENBQUMsa0JBQWtCLEdBQUcsTUFBTSxDQUFDO1lBQ2pDLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0NBQW9DLENBQUMsQ0FBQztZQUNsRCxLQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUN4QixDQUFDLEVBQ0QsVUFBQyxLQUFLO1lBQ0YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNuQix1QkFBdUI7UUFDM0IsQ0FBQyxDQUNKLENBQUM7SUFDVixDQUFDO0lBRUQsc0RBQXdCLEdBQXhCLFVBQXlCLElBQUk7UUFBN0IsaUJBa0JDO1FBakJHLElBQU0sUUFBUSxHQUFnQixJQUFJLENBQUMsTUFBTSxDQUFDO1FBQzFDLElBQU0sUUFBUSxHQUEwQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUUxRixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUVuQixJQUFJLENBQUMsZUFBZSxDQUFDLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxDQUFDLFNBQVMsQ0FDdkQsVUFBQyxHQUFHO1lBQ0EsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1lBQ2hDLEtBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1lBQ3pCLEtBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3hCLENBQUMsRUFDRCxVQUFDLEtBQUs7WUFDRixPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ25CLHVCQUF1QjtRQUMzQixDQUFDLENBQ0osQ0FBQztJQUVOLENBQUM7SUFFRCxvQ0FBTSxHQUFOO1FBQ0ksSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2pDLENBQUM7SUFuRVEsbUJBQW1CO1FBTi9CLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsWUFBWTtZQUN0QixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsU0FBUyxFQUFFLENBQUMsa0NBQWUsQ0FBQztZQUM1QixXQUFXLEVBQUUsNkJBQTZCO1NBQzdDLENBQUM7eUNBa0J1QyxrQ0FBZTtZQUNkLHVDQUFnQixFQUFxQixnQ0FBUztZQUNuRCx1QkFBYztPQW5CdEMsbUJBQW1CLENBb0UvQjtJQUFELDBCQUFDO0NBQUEsQUFwRUQsSUFvRUM7QUFwRVksa0RBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBQYWdlUm91dGUsIFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXJcIjtcbmltcG9ydCB7IFJhZERhdGFGb3JtIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC11aS1kYXRhZm9ybVwiO1xuaW1wb3J0IHsgc3dpdGNoTWFwIH0gZnJvbSBcInJ4anMvb3BlcmF0b3JzXCI7XG5pbXBvcnQgeyBCaWxsQ3VzdG9tZXJEZXRhaWwgfSBmcm9tIFwifi9zaGFyZWQvbW9kZWxzL2JpbGxDdXN0b21lckRldGFpbC5tb2RlbFwiO1xuaW1wb3J0IHsgQmlsbEN1c3RvbWVyVG90YWwgfSBmcm9tIFwifi9zaGFyZWQvbW9kZWxzL2JpbGxDdXN0b21lclRvdGFsLm1vZGVsXCI7XG5pbXBvcnQgeyBDdXN0b21lclNlcnZpY2UgfSBmcm9tIFwifi9zaGFyZWQvc2VydmljZXMvY3VzdG9tZXIuc2VydmljZVwiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJCaWxsRGV0YWlsXCIsXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICBwcm92aWRlcnM6IFtDdXN0b21lclNlcnZpY2VdLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vYmlsbERldGFpbC5jb21wb25lbnQuaHRtbFwiXG59KVxuZXhwb3J0IGNsYXNzIEJpbGxEZXRhaWxDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIGN1c3RvbWVySWQ6IG51bWJlcjtcbiAgICBjdXN0b21lckJpbGxEZXRhaWw6IEJpbGxDdXN0b21lckRldGFpbCA9IHtcbiAgICAgICAgaWQ6IFwiXCIsXG4gICAgICAgIGN1c3RvbWVyOiBcIlwiLFxuICAgICAgICBib29rZXI6IHtcbiAgICAgICAgICAgIGlkOiBcIlwiLFxuICAgICAgICAgICAgY3VzdG9tZXI6IFwiXCIsXG4gICAgICAgICAgICB0b3RhbDogXCJcIixcbiAgICAgICAgICAgIHBheWVkOiBmYWxzZVxuICAgICAgICB9LFxuICAgICAgICB0b3RhbHM6IFtdLFxuICAgICAgICBvcHRpb25zOiBbXVxuICAgIH07XG5cbiAgICBpc0J1c3k6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBjdXN0b21lclNlcnZpY2U6IEN1c3RvbWVyU2VydmljZSxcbiAgICAgICAgICAgICAgICBwcml2YXRlIHJvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMsIHByaXZhdGUgcGFnZVJvdXRlOiBQYWdlUm91dGUsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBhY3RpdmVSb3V0ZTogQWN0aXZhdGVkUm91dGUpIHtcbiAgICAgICAgdGhpcy5wYWdlUm91dGUuYWN0aXZhdGVkUm91dGUucGlwZShcbiAgICAgICAgICAgIHN3aXRjaE1hcCgoYWN0aXZhdGVkUm91dGUpID0+IGFjdGl2YXRlZFJvdXRlLnBhcmFtcylcbiAgICAgICAgKS5mb3JFYWNoKChwYXJhbXMpID0+IHsgdGhpcy5jdXN0b21lcklkID0gcGFyYW1zLmN1c3RvbWVyX2lkOyB9KTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5nZXRDdXN0b21lckRldGFpbCgpO1xuICAgIH1cblxuICAgIGdldEN1c3RvbWVyRGV0YWlsKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmlzQnVzeSA9IHRydWU7XG4gICAgICAgIHRoaXMuY3VzdG9tZXJTZXJ2aWNlLmdldEJpbGxCeUN1c3RvbWVySWQodGhpcy5jdXN0b21lcklkKVxuICAgICAgICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICAocmVzdWx0OiBCaWxsQ3VzdG9tZXJEZXRhaWwpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXN0b21lckJpbGxEZXRhaWwgPSByZXN1bHQ7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZm91bmQgbWUgc29tZSBjdXN0b21lciBiaWxsIGRldGFpbFwiKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc0J1c3kgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmRpcihlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIC8qVE9ETzogaGFuZGxlIGVycm9ycyovXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcbiAgICB9XG5cbiAgICBkZlByb3BlcnR5UGF5ZWRDb21taXR0ZWQoYXJncyk6IHZvaWQge1xuICAgICAgICBjb25zdCBkYXRhRm9ybSA9IDxSYWREYXRhRm9ybT5hcmdzLm9iamVjdDtcbiAgICAgICAgY29uc3QgY3VzdG9tZXI6IEJpbGxDdXN0b21lclRvdGFsID0gPEJpbGxDdXN0b21lclRvdGFsPiBKU09OLnBhcnNlKGRhdGFGb3JtLmVkaXRlZE9iamVjdCk7XG5cbiAgICAgICAgdGhpcy5pc0J1c3kgPSB0cnVlO1xuXG4gICAgICAgIHRoaXMuY3VzdG9tZXJTZXJ2aWNlLnB1dEJpbGxQYXllZEFjdGlvbihjdXN0b21lcikuc3Vic2NyaWJlKFxuICAgICAgICAgICAgKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVXBkYXRlZCBjdXN0b21lclwiKTtcbiAgICAgICAgICAgICAgICB0aGlzLmdldEN1c3RvbWVyRGV0YWlsKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5pc0J1c3kgPSBmYWxzZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmRpcihlcnJvcik7XG4gICAgICAgICAgICAgICAgLypUT0RPOiBoYW5kbGUgZXJyb3JzKi9cbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcblxuICAgIH1cblxuICAgIGdvQmFjaygpIHtcbiAgICAgICAgdGhpcy5yb3V0ZXJFeHRlbnNpb25zLmJhY2soKTtcbiAgICB9XG59XG4iXX0=