"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var nativescript_angular_1 = require("nativescript-angular");
var operators_1 = require("rxjs/operators");
var customer_service_1 = require("~/shared/services/customer.service");
var BillDetailComponent = /** @class */ (function () {
    function BillDetailComponent(customerService, routerExtensions, pageRoute) {
        var _this = this;
        this.customerService = customerService;
        this.routerExtensions = routerExtensions;
        this.pageRoute = pageRoute;
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
        this.routerExtensions.backToPreviousPage();
    };
    BillDetailComponent = __decorate([
        core_1.Component({
            selector: "BillDetail",
            moduleId: module.id,
            providers: [customer_service_1.CustomerService],
            templateUrl: "./billDetail.component.html"
        }),
        __metadata("design:paramtypes", [customer_service_1.CustomerService,
            nativescript_angular_1.RouterExtensions, nativescript_angular_1.PageRoute])
    ], BillDetailComponent);
    return BillDetailComponent;
}());
exports.BillDetailComponent = BillDetailComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmlsbERldGFpbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJiaWxsRGV0YWlsLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFrRDtBQUNsRCw2REFBbUU7QUFFbkUsNENBQTJDO0FBRzNDLHVFQUFxRTtBQVFyRTtJQWlCSSw2QkFBb0IsZUFBZ0MsRUFDaEMsZ0JBQWtDLEVBQVUsU0FBb0I7UUFEcEYsaUJBS0M7UUFMbUIsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQ2hDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFBVSxjQUFTLEdBQVQsU0FBUyxDQUFXO1FBaEJwRix1QkFBa0IsR0FBdUI7WUFDckMsRUFBRSxFQUFFLEVBQUU7WUFDTixRQUFRLEVBQUUsRUFBRTtZQUNaLE1BQU0sRUFBRTtnQkFDSixFQUFFLEVBQUUsRUFBRTtnQkFDTixRQUFRLEVBQUUsRUFBRTtnQkFDWixLQUFLLEVBQUUsRUFBRTtnQkFDVCxLQUFLLEVBQUUsS0FBSzthQUNmO1lBQ0QsTUFBTSxFQUFFLEVBQUU7WUFDVixPQUFPLEVBQUUsRUFBRTtTQUNkLENBQUM7UUFFRixXQUFNLEdBQVksSUFBSSxDQUFDO1FBSW5CLElBQUksQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLElBQUksQ0FDOUIscUJBQVMsQ0FBQyxVQUFDLGNBQWMsSUFBSyxPQUFBLGNBQWMsQ0FBQyxNQUFNLEVBQXJCLENBQXFCLENBQUMsQ0FDdkQsQ0FBQyxPQUFPLENBQUMsVUFBQyxNQUFNLElBQU8sS0FBSSxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDckUsQ0FBQztJQUVELHNDQUFRLEdBQVI7UUFDSSxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztJQUM3QixDQUFDO0lBRUQsK0NBQWlCLEdBQWpCO1FBQUEsaUJBY0M7UUFiRyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUNuQixJQUFJLENBQUMsZUFBZSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7YUFDcEQsU0FBUyxDQUNOLFVBQUMsTUFBMEI7WUFDdkIsS0FBSSxDQUFDLGtCQUFrQixHQUFHLE1BQU0sQ0FBQztZQUNqQyxPQUFPLENBQUMsR0FBRyxDQUFDLG9DQUFvQyxDQUFDLENBQUM7WUFDbEQsS0FBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDeEIsQ0FBQyxFQUNELFVBQUMsS0FBSztZQUNGLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDbkIsdUJBQXVCO1FBQzNCLENBQUMsQ0FDSixDQUFDO0lBQ1YsQ0FBQztJQUVELHNEQUF3QixHQUF4QixVQUF5QixJQUFJO1FBQTdCLGlCQWtCQztRQWpCRyxJQUFNLFFBQVEsR0FBZ0IsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUMxQyxJQUFNLFFBQVEsR0FBMEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLENBQUM7UUFFMUYsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFFbkIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxTQUFTLENBQ3ZELFVBQUMsR0FBRztZQUNBLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUMsQ0FBQztZQUNoQyxLQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztZQUN6QixLQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUN4QixDQUFDLEVBQ0QsVUFBQyxLQUFLO1lBQ0YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNuQix1QkFBdUI7UUFDM0IsQ0FBQyxDQUNKLENBQUM7SUFFTixDQUFDO0lBRUQsb0NBQU0sR0FBTjtRQUNJLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO0lBQy9DLENBQUM7SUFsRVEsbUJBQW1CO1FBTi9CLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsWUFBWTtZQUN0QixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsU0FBUyxFQUFFLENBQUMsa0NBQWUsQ0FBQztZQUM1QixXQUFXLEVBQUUsNkJBQTZCO1NBQzdDLENBQUM7eUNBa0J1QyxrQ0FBZTtZQUNkLHVDQUFnQixFQUFxQixnQ0FBUztPQWxCM0UsbUJBQW1CLENBbUUvQjtJQUFELDBCQUFDO0NBQUEsQUFuRUQsSUFtRUM7QUFuRVksa0RBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgUGFnZVJvdXRlLCBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyXCI7XG5pbXBvcnQgeyBSYWREYXRhRm9ybSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtdWktZGF0YWZvcm1cIjtcbmltcG9ydCB7IHN3aXRjaE1hcCB9IGZyb20gXCJyeGpzL29wZXJhdG9yc1wiO1xuaW1wb3J0IHsgQmlsbEN1c3RvbWVyRGV0YWlsIH0gZnJvbSBcIn4vc2hhcmVkL21vZGVscy9iaWxsQ3VzdG9tZXJEZXRhaWwubW9kZWxcIjtcbmltcG9ydCB7IEJpbGxDdXN0b21lclRvdGFsIH0gZnJvbSBcIn4vc2hhcmVkL21vZGVscy9iaWxsQ3VzdG9tZXJUb3RhbC5tb2RlbFwiO1xuaW1wb3J0IHsgQ3VzdG9tZXJTZXJ2aWNlIH0gZnJvbSBcIn4vc2hhcmVkL3NlcnZpY2VzL2N1c3RvbWVyLnNlcnZpY2VcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwiQmlsbERldGFpbFwiLFxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgcHJvdmlkZXJzOiBbQ3VzdG9tZXJTZXJ2aWNlXSxcbiAgICB0ZW1wbGF0ZVVybDogXCIuL2JpbGxEZXRhaWwuY29tcG9uZW50Lmh0bWxcIlxufSlcbmV4cG9ydCBjbGFzcyBCaWxsRGV0YWlsQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBjdXN0b21lcklkOiBudW1iZXI7XG4gICAgY3VzdG9tZXJCaWxsRGV0YWlsOiBCaWxsQ3VzdG9tZXJEZXRhaWwgPSB7XG4gICAgICAgIGlkOiBcIlwiLFxuICAgICAgICBjdXN0b21lcjogXCJcIixcbiAgICAgICAgYm9va2VyOiB7XG4gICAgICAgICAgICBpZDogXCJcIixcbiAgICAgICAgICAgIGN1c3RvbWVyOiBcIlwiLFxuICAgICAgICAgICAgdG90YWw6IFwiXCIsXG4gICAgICAgICAgICBwYXllZDogZmFsc2VcbiAgICAgICAgfSxcbiAgICAgICAgdG90YWxzOiBbXSxcbiAgICAgICAgb3B0aW9uczogW11cbiAgICB9O1xuXG4gICAgaXNCdXN5OiBib29sZWFuID0gdHJ1ZTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgY3VzdG9tZXJTZXJ2aWNlOiBDdXN0b21lclNlcnZpY2UsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSByb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zLCBwcml2YXRlIHBhZ2VSb3V0ZTogUGFnZVJvdXRlKSB7XG4gICAgICAgIHRoaXMucGFnZVJvdXRlLmFjdGl2YXRlZFJvdXRlLnBpcGUoXG4gICAgICAgICAgICBzd2l0Y2hNYXAoKGFjdGl2YXRlZFJvdXRlKSA9PiBhY3RpdmF0ZWRSb3V0ZS5wYXJhbXMpXG4gICAgICAgICkuZm9yRWFjaCgocGFyYW1zKSA9PiB7IHRoaXMuY3VzdG9tZXJJZCA9IHBhcmFtcy5jdXN0b21lcl9pZDsgfSk7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZ2V0Q3VzdG9tZXJEZXRhaWwoKTtcbiAgICB9XG5cbiAgICBnZXRDdXN0b21lckRldGFpbCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5pc0J1c3kgPSB0cnVlO1xuICAgICAgICB0aGlzLmN1c3RvbWVyU2VydmljZS5nZXRCaWxsQnlDdXN0b21lcklkKHRoaXMuY3VzdG9tZXJJZClcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgKHJlc3VsdDogQmlsbEN1c3RvbWVyRGV0YWlsKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3VzdG9tZXJCaWxsRGV0YWlsID0gcmVzdWx0O1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImZvdW5kIG1lIHNvbWUgY3VzdG9tZXIgYmlsbCBkZXRhaWxcIik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNCdXN5ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5kaXIoZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICAvKlRPRE86IGhhbmRsZSBlcnJvcnMqL1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7XG4gICAgfVxuXG4gICAgZGZQcm9wZXJ0eVBheWVkQ29tbWl0dGVkKGFyZ3MpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgZGF0YUZvcm0gPSA8UmFkRGF0YUZvcm0+YXJncy5vYmplY3Q7XG4gICAgICAgIGNvbnN0IGN1c3RvbWVyOiBCaWxsQ3VzdG9tZXJUb3RhbCA9IDxCaWxsQ3VzdG9tZXJUb3RhbD4gSlNPTi5wYXJzZShkYXRhRm9ybS5lZGl0ZWRPYmplY3QpO1xuXG4gICAgICAgIHRoaXMuaXNCdXN5ID0gdHJ1ZTtcblxuICAgICAgICB0aGlzLmN1c3RvbWVyU2VydmljZS5wdXRCaWxsUGF5ZWRBY3Rpb24oY3VzdG9tZXIpLnN1YnNjcmliZShcbiAgICAgICAgICAgIChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlVwZGF0ZWQgY3VzdG9tZXJcIik7XG4gICAgICAgICAgICAgICAgdGhpcy5nZXRDdXN0b21lckRldGFpbCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuaXNCdXN5ID0gZmFsc2U7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5kaXIoZXJyb3IpO1xuICAgICAgICAgICAgICAgIC8qVE9ETzogaGFuZGxlIGVycm9ycyovXG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG5cbiAgICB9XG5cbiAgICBnb0JhY2soKSB7XG4gICAgICAgIHRoaXMucm91dGVyRXh0ZW5zaW9ucy5iYWNrVG9QcmV2aW91c1BhZ2UoKTtcbiAgICB9XG59XG4iXX0=