"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var nativescript_angular_1 = require("nativescript-angular");
var operators_1 = require("rxjs/operators");
var page_1 = require("tns-core-modules/ui/page");
var customer_service_1 = require("~/shared/services/customer.service");
var groep_service_1 = require("~/shared/services/groep.service");
var PaymentsAddComponent = /** @class */ (function () {
    function PaymentsAddComponent(groepService, customerService, routerExtensions, page, pageRoute) {
        var _this = this;
        this.groepService = groepService;
        this.customerService = customerService;
        this.routerExtensions = routerExtensions;
        this.page = page;
        this.pageRoute = pageRoute;
        this.isBusy = false;
        this.payment = {
            customerId: 0,
            description: "",
            price: 0
        };
        this.pageRoute.activatedRoute.pipe(operators_1.switchMap(function (activatedRoute) { return activatedRoute.params; })).forEach(function (params) { _this.payment.customerId = params.customer_id; });
    }
    PaymentsAddComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.page.backgroundSpanUnderStatusBar = true;
        this.page.on("loaded", function (args) {
            if (_this.page.android) {
                _this.page.android.setFitsSystemWindows(true);
            }
        });
    };
    PaymentsAddComponent.prototype.addPayment = function () {
        var _this = this;
        this.isBusy = true;
        this.customerService.putPaymentToCustomerAction(this.payment).subscribe(function (res) {
            console.log("Added payment");
            _this.isBusy = false;
            _this.goBack();
        }, function (error) {
            console.dir(error);
            /*TODO: handle errors*/
        });
    };
    PaymentsAddComponent.prototype.goBack = function () {
        this.routerExtensions.back({ relativeTo: this.activeRoute });
    };
    PaymentsAddComponent = __decorate([
        core_1.Component({
            selector: "PaymentsAdd",
            moduleId: module.id,
            providers: [groep_service_1.GroepService, customer_service_1.CustomerService],
            templateUrl: "./paymentsAdd.component.html"
        }),
        __metadata("design:paramtypes", [groep_service_1.GroepService, customer_service_1.CustomerService,
            nativescript_angular_1.RouterExtensions, page_1.Page, nativescript_angular_1.PageRoute])
    ], PaymentsAddComponent);
    return PaymentsAddComponent;
}());
exports.PaymentsAddComponent = PaymentsAddComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF5bWVudHNBZGQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicGF5bWVudHNBZGQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBQ2xELDZEQUFtRTtBQUNuRSw0Q0FBMkM7QUFDM0MsaURBQWdEO0FBRWhELHVFQUFxRTtBQUNyRSxpRUFBK0Q7QUFRL0Q7SUFTSSw4QkFBb0IsWUFBMEIsRUFBVSxlQUFnQyxFQUNwRSxnQkFBa0MsRUFBVSxJQUFVLEVBQVUsU0FBb0I7UUFEeEcsaUJBTUM7UUFObUIsaUJBQVksR0FBWixZQUFZLENBQWM7UUFBVSxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDcEUscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUFVLFNBQUksR0FBSixJQUFJLENBQU07UUFBVSxjQUFTLEdBQVQsU0FBUyxDQUFXO1FBVHhHLFdBQU0sR0FBWSxLQUFLLENBQUM7UUFFeEIsWUFBTyxHQUFZO1lBQ2YsVUFBVSxFQUFFLENBQUM7WUFDYixXQUFXLEVBQUUsRUFBRTtZQUNmLEtBQUssRUFBRSxDQUFDO1NBQ1gsQ0FBQztRQUlFLElBQUksQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLElBQUksQ0FDOUIscUJBQVMsQ0FBQyxVQUFDLGNBQWMsSUFBSyxPQUFBLGNBQWMsQ0FBQyxNQUFNLEVBQXJCLENBQXFCLENBQUMsQ0FDdkQsQ0FBQyxPQUFPLENBQUMsVUFBQyxNQUFNLElBQU8sS0FBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRTdFLENBQUM7SUFFRCx1Q0FBUSxHQUFSO1FBQUEsaUJBT0M7UUFORyxJQUFJLENBQUMsSUFBSSxDQUFDLDRCQUE0QixHQUFHLElBQUksQ0FBQztRQUM5QyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsVUFBQyxJQUFJO1lBQ3hCLElBQUksS0FBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUU7Z0JBQ25CLEtBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ2hEO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQseUNBQVUsR0FBVjtRQUFBLGlCQWFDO1FBWkcsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDbkIsSUFBSSxDQUFDLGVBQWUsQ0FBQywwQkFBMEIsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsU0FBUyxDQUNuRSxVQUFDLEdBQUc7WUFDQSxPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBQzdCLEtBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1lBQ3BCLEtBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNsQixDQUFDLEVBQ0QsVUFBQyxLQUFLO1lBQ0YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNuQix1QkFBdUI7UUFDM0IsQ0FBQyxDQUNKLENBQUM7SUFDTixDQUFDO0lBRUQscUNBQU0sR0FBTjtRQUNJLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO0lBQy9DLENBQUM7SUEzQ1Esb0JBQW9CO1FBTmhDLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsYUFBYTtZQUN2QixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsU0FBUyxFQUFFLENBQUMsNEJBQVksRUFBRSxrQ0FBZSxDQUFDO1lBQzFDLFdBQVcsRUFBRSw4QkFBOEI7U0FDOUMsQ0FBQzt5Q0FVb0MsNEJBQVksRUFBMkIsa0NBQWU7WUFDbEQsdUNBQWdCLEVBQWdCLFdBQUksRUFBcUIsZ0NBQVM7T0FWL0Ysb0JBQW9CLENBNENoQztJQUFELDJCQUFDO0NBQUEsQUE1Q0QsSUE0Q0M7QUE1Q1ksb0RBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgUGFnZVJvdXRlLCBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyXCI7XG5pbXBvcnQgeyBzd2l0Y2hNYXAgfSBmcm9tIFwicnhqcy9vcGVyYXRvcnNcIjtcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9wYWdlXCI7XG5pbXBvcnQgeyBQYXltZW50IH0gZnJvbSBcIn4vc2hhcmVkL21vZGVscy9wYXltZW50Lm1vZGVsXCI7XG5pbXBvcnQgeyBDdXN0b21lclNlcnZpY2UgfSBmcm9tIFwifi9zaGFyZWQvc2VydmljZXMvY3VzdG9tZXIuc2VydmljZVwiO1xuaW1wb3J0IHsgR3JvZXBTZXJ2aWNlIH0gZnJvbSBcIn4vc2hhcmVkL3NlcnZpY2VzL2dyb2VwLnNlcnZpY2VcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwiUGF5bWVudHNBZGRcIixcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHByb3ZpZGVyczogW0dyb2VwU2VydmljZSwgQ3VzdG9tZXJTZXJ2aWNlXSxcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3BheW1lbnRzQWRkLmNvbXBvbmVudC5odG1sXCJcbn0pXG5leHBvcnQgY2xhc3MgUGF5bWVudHNBZGRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIGlzQnVzeTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgcGF5bWVudDogUGF5bWVudCA9IHtcbiAgICAgICAgY3VzdG9tZXJJZDogMCxcbiAgICAgICAgZGVzY3JpcHRpb246IFwiXCIsXG4gICAgICAgIHByaWNlOiAwXG4gICAgfTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZ3JvZXBTZXJ2aWNlOiBHcm9lcFNlcnZpY2UsIHByaXZhdGUgY3VzdG9tZXJTZXJ2aWNlOiBDdXN0b21lclNlcnZpY2UsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSByb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zLCBwcml2YXRlIHBhZ2U6IFBhZ2UsIHByaXZhdGUgcGFnZVJvdXRlOiBQYWdlUm91dGUpIHtcbiAgICAgICAgdGhpcy5wYWdlUm91dGUuYWN0aXZhdGVkUm91dGUucGlwZShcbiAgICAgICAgICAgIHN3aXRjaE1hcCgoYWN0aXZhdGVkUm91dGUpID0+IGFjdGl2YXRlZFJvdXRlLnBhcmFtcylcbiAgICAgICAgKS5mb3JFYWNoKChwYXJhbXMpID0+IHsgdGhpcy5wYXltZW50LmN1c3RvbWVySWQgPSBwYXJhbXMuY3VzdG9tZXJfaWQ7IH0pO1xuXG4gICAgfVxuXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMucGFnZS5iYWNrZ3JvdW5kU3BhblVuZGVyU3RhdHVzQmFyID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5wYWdlLm9uKFwibG9hZGVkXCIsIChhcmdzKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5wYWdlLmFuZHJvaWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBhZ2UuYW5kcm9pZC5zZXRGaXRzU3lzdGVtV2luZG93cyh0cnVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYWRkUGF5bWVudCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5pc0J1c3kgPSB0cnVlO1xuICAgICAgICB0aGlzLmN1c3RvbWVyU2VydmljZS5wdXRQYXltZW50VG9DdXN0b21lckFjdGlvbih0aGlzLnBheW1lbnQpLnN1YnNjcmliZShcbiAgICAgICAgICAgIChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkFkZGVkIHBheW1lbnRcIik7XG4gICAgICAgICAgICAgICAgdGhpcy5pc0J1c3kgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLmdvQmFjaygpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZGlyKGVycm9yKTtcbiAgICAgICAgICAgICAgICAvKlRPRE86IGhhbmRsZSBlcnJvcnMqL1xuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgIH1cblxuICAgIGdvQmFjaygpIHtcbiAgICAgICAgdGhpcy5yb3V0ZXJFeHRlbnNpb25zLmJhY2tUb1ByZXZpb3VzUGFnZSgpO1xuICAgIH1cbn1cbiJdfQ==