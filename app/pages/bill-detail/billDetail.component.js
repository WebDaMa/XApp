"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var nativescript_angular_1 = require("nativescript-angular");
var operators_1 = require("rxjs/operators");
var customer_service_1 = require("~/shared/services/customer.service");
var groep_service_1 = require("~/shared/services/groep.service");
var BillDetailComponent = /** @class */ (function () {
    function BillDetailComponent(groepService, customerService, routerExtensions, pageRoute) {
        var _this = this;
        this.groepService = groepService;
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
            console.log("found me some size customer bill detail");
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
            providers: [groep_service_1.GroepService, customer_service_1.CustomerService],
            templateUrl: "./billDetail.component.html"
        }),
        __metadata("design:paramtypes", [groep_service_1.GroepService, customer_service_1.CustomerService,
            nativescript_angular_1.RouterExtensions, nativescript_angular_1.PageRoute])
    ], BillDetailComponent);
    return BillDetailComponent;
}());
exports.BillDetailComponent = BillDetailComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmlsbERldGFpbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJiaWxsRGV0YWlsLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFrRDtBQUNsRCw2REFBbUU7QUFFbkUsNENBQTJDO0FBSzNDLHVFQUFxRTtBQUNyRSxpRUFBK0Q7QUFRL0Q7SUFpQkksNkJBQW9CLFlBQTBCLEVBQVUsZUFBZ0MsRUFDcEUsZ0JBQWtDLEVBQVUsU0FBb0I7UUFEcEYsaUJBS0M7UUFMbUIsaUJBQVksR0FBWixZQUFZLENBQWM7UUFBVSxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDcEUscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUFVLGNBQVMsR0FBVCxTQUFTLENBQVc7UUFoQnBGLHVCQUFrQixHQUF1QjtZQUNyQyxFQUFFLEVBQUUsRUFBRTtZQUNOLFFBQVEsRUFBRSxFQUFFO1lBQ1osTUFBTSxFQUFFO2dCQUNKLEVBQUUsRUFBRSxFQUFFO2dCQUNOLFFBQVEsRUFBRSxFQUFFO2dCQUNaLEtBQUssRUFBRSxFQUFFO2dCQUNULEtBQUssRUFBRSxLQUFLO2FBQ2Y7WUFDRCxNQUFNLEVBQUUsRUFBRTtZQUNWLE9BQU8sRUFBRSxFQUFFO1NBQ2QsQ0FBQztRQUVGLFdBQU0sR0FBWSxJQUFJLENBQUM7UUFJbkIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUM5QixxQkFBUyxDQUFDLFVBQUMsY0FBYyxJQUFLLE9BQUEsY0FBYyxDQUFDLE1BQU0sRUFBckIsQ0FBcUIsQ0FBQyxDQUN2RCxDQUFDLE9BQU8sQ0FBQyxVQUFDLE1BQU0sSUFBTyxLQUFJLENBQUMsVUFBVSxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNyRSxDQUFDO0lBRUQsc0NBQVEsR0FBUjtRQUNJLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFFRCwrQ0FBaUIsR0FBakI7UUFBQSxpQkFjQztRQWJHLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ25CLElBQUksQ0FBQyxlQUFlLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQzthQUNwRCxTQUFTLENBQ04sVUFBQyxNQUEwQjtZQUN2QixLQUFJLENBQUMsa0JBQWtCLEdBQUcsTUFBTSxDQUFDO1lBQ2pDLE9BQU8sQ0FBQyxHQUFHLENBQUMseUNBQXlDLENBQUMsQ0FBQztZQUN2RCxLQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUN4QixDQUFDLEVBQ0QsVUFBQyxLQUFLO1lBQ0YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNuQix1QkFBdUI7UUFDM0IsQ0FBQyxDQUNKLENBQUM7SUFDVixDQUFDO0lBRUQsc0RBQXdCLEdBQXhCLFVBQXlCLElBQUk7UUFBN0IsaUJBa0JDO1FBakJHLElBQU0sUUFBUSxHQUFnQixJQUFJLENBQUMsTUFBTSxDQUFDO1FBQzFDLElBQU0sUUFBUSxHQUEwQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUUxRixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUVuQixJQUFJLENBQUMsZUFBZSxDQUFDLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxDQUFDLFNBQVMsQ0FDdkQsVUFBQyxHQUFHO1lBQ0EsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1lBQ2hDLEtBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1lBQ3pCLEtBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3hCLENBQUMsRUFDRCxVQUFDLEtBQUs7WUFDRixPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ25CLHVCQUF1QjtRQUMzQixDQUFDLENBQ0osQ0FBQztJQUVOLENBQUM7SUFFRCxvQ0FBTSxHQUFOO1FBQ0ksSUFBSSxDQUFDLGdCQUFnQixDQUFDLGtCQUFrQixFQUFFLENBQUM7SUFDL0MsQ0FBQztJQWxFUSxtQkFBbUI7UUFOL0IsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxZQUFZO1lBQ3RCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixTQUFTLEVBQUUsQ0FBQyw0QkFBWSxFQUFFLGtDQUFlLENBQUM7WUFDMUMsV0FBVyxFQUFFLDZCQUE2QjtTQUM3QyxDQUFDO3lDQWtCb0MsNEJBQVksRUFBMkIsa0NBQWU7WUFDbEQsdUNBQWdCLEVBQXFCLGdDQUFTO09BbEIzRSxtQkFBbUIsQ0FtRS9CO0lBQUQsMEJBQUM7Q0FBQSxBQW5FRCxJQW1FQztBQW5FWSxrREFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBQYWdlUm91dGUsIFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXJcIjtcbmltcG9ydCB7IFJhZERhdGFGb3JtIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC11aS1kYXRhZm9ybVwiO1xuaW1wb3J0IHsgc3dpdGNoTWFwIH0gZnJvbSBcInJ4anMvb3BlcmF0b3JzXCI7XG5pbXBvcnQgeyBTd2l0Y2ggfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9zd2l0Y2hcIjtcbmltcG9ydCB7IEJpbGxDdXN0b21lckRldGFpbCB9IGZyb20gXCJ+L3NoYXJlZC9tb2RlbHMvYmlsbEN1c3RvbWVyRGV0YWlsLm1vZGVsXCI7XG5pbXBvcnQgeyBCaWxsQ3VzdG9tZXJUb3RhbCB9IGZyb20gXCJ+L3NoYXJlZC9tb2RlbHMvYmlsbEN1c3RvbWVyVG90YWwubW9kZWxcIjtcbmltcG9ydCB7IEJ1c0N1c3RvbWVyIH0gZnJvbSBcIn4vc2hhcmVkL21vZGVscy9idXNDdXN0b21lci5tb2RlbFwiO1xuaW1wb3J0IHsgQ3VzdG9tZXJTZXJ2aWNlIH0gZnJvbSBcIn4vc2hhcmVkL3NlcnZpY2VzL2N1c3RvbWVyLnNlcnZpY2VcIjtcbmltcG9ydCB7IEdyb2VwU2VydmljZSB9IGZyb20gXCJ+L3NoYXJlZC9zZXJ2aWNlcy9ncm9lcC5zZXJ2aWNlXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcIkJpbGxEZXRhaWxcIixcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHByb3ZpZGVyczogW0dyb2VwU2VydmljZSwgQ3VzdG9tZXJTZXJ2aWNlXSxcbiAgICB0ZW1wbGF0ZVVybDogXCIuL2JpbGxEZXRhaWwuY29tcG9uZW50Lmh0bWxcIlxufSlcbmV4cG9ydCBjbGFzcyBCaWxsRGV0YWlsQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBjdXN0b21lcklkOiBudW1iZXI7XG4gICAgY3VzdG9tZXJCaWxsRGV0YWlsOiBCaWxsQ3VzdG9tZXJEZXRhaWwgPSB7XG4gICAgICAgIGlkOiBcIlwiLFxuICAgICAgICBjdXN0b21lcjogXCJcIixcbiAgICAgICAgYm9va2VyOiB7XG4gICAgICAgICAgICBpZDogXCJcIixcbiAgICAgICAgICAgIGN1c3RvbWVyOiBcIlwiLFxuICAgICAgICAgICAgdG90YWw6IFwiXCIsXG4gICAgICAgICAgICBwYXllZDogZmFsc2VcbiAgICAgICAgfSxcbiAgICAgICAgdG90YWxzOiBbXSxcbiAgICAgICAgb3B0aW9uczogW11cbiAgICB9O1xuXG4gICAgaXNCdXN5OiBib29sZWFuID0gdHJ1ZTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZ3JvZXBTZXJ2aWNlOiBHcm9lcFNlcnZpY2UsIHByaXZhdGUgY3VzdG9tZXJTZXJ2aWNlOiBDdXN0b21lclNlcnZpY2UsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSByb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zLCBwcml2YXRlIHBhZ2VSb3V0ZTogUGFnZVJvdXRlKSB7XG4gICAgICAgIHRoaXMucGFnZVJvdXRlLmFjdGl2YXRlZFJvdXRlLnBpcGUoXG4gICAgICAgICAgICBzd2l0Y2hNYXAoKGFjdGl2YXRlZFJvdXRlKSA9PiBhY3RpdmF0ZWRSb3V0ZS5wYXJhbXMpXG4gICAgICAgICkuZm9yRWFjaCgocGFyYW1zKSA9PiB7IHRoaXMuY3VzdG9tZXJJZCA9IHBhcmFtcy5jdXN0b21lcl9pZDsgfSk7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZ2V0Q3VzdG9tZXJEZXRhaWwoKTtcbiAgICB9XG5cbiAgICBnZXRDdXN0b21lckRldGFpbCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5pc0J1c3kgPSB0cnVlO1xuICAgICAgICB0aGlzLmN1c3RvbWVyU2VydmljZS5nZXRCaWxsQnlDdXN0b21lcklkKHRoaXMuY3VzdG9tZXJJZClcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgKHJlc3VsdDogQmlsbEN1c3RvbWVyRGV0YWlsKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3VzdG9tZXJCaWxsRGV0YWlsID0gcmVzdWx0O1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImZvdW5kIG1lIHNvbWUgc2l6ZSBjdXN0b21lciBiaWxsIGRldGFpbFwiKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc0J1c3kgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmRpcihlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIC8qVE9ETzogaGFuZGxlIGVycm9ycyovXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcbiAgICB9XG5cbiAgICBkZlByb3BlcnR5UGF5ZWRDb21taXR0ZWQoYXJncyk6IHZvaWQge1xuICAgICAgICBjb25zdCBkYXRhRm9ybSA9IDxSYWREYXRhRm9ybT5hcmdzLm9iamVjdDtcbiAgICAgICAgY29uc3QgY3VzdG9tZXI6IEJpbGxDdXN0b21lclRvdGFsID0gPEJpbGxDdXN0b21lclRvdGFsPiBKU09OLnBhcnNlKGRhdGFGb3JtLmVkaXRlZE9iamVjdCk7XG5cbiAgICAgICAgdGhpcy5pc0J1c3kgPSB0cnVlO1xuXG4gICAgICAgIHRoaXMuY3VzdG9tZXJTZXJ2aWNlLnB1dEJpbGxQYXllZEFjdGlvbihjdXN0b21lcikuc3Vic2NyaWJlKFxuICAgICAgICAgICAgKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVXBkYXRlZCBjdXN0b21lclwiKTtcbiAgICAgICAgICAgICAgICB0aGlzLmdldEN1c3RvbWVyRGV0YWlsKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5pc0J1c3kgPSBmYWxzZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmRpcihlcnJvcik7XG4gICAgICAgICAgICAgICAgLypUT0RPOiBoYW5kbGUgZXJyb3JzKi9cbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcblxuICAgIH1cblxuICAgIGdvQmFjaygpIHtcbiAgICAgICAgdGhpcy5yb3V0ZXJFeHRlbnNpb25zLmJhY2tUb1ByZXZpb3VzUGFnZSgpO1xuICAgIH1cbn1cbiJdfQ==