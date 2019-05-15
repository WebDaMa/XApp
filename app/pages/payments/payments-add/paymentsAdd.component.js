"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var nativescript_angular_1 = require("nativescript-angular");
var operators_1 = require("rxjs/operators");
var page_1 = require("tns-core-modules/ui/page");
var customer_service_1 = require("~/shared/services/customer.service");
var groep_service_1 = require("~/shared/services/groep.service");
var PaymentsAddComponent = /** @class */ (function () {
    function PaymentsAddComponent(groepService, customerService, routerExtensions, page, pageRoute, activeRoute) {
        var _this = this;
        this.groepService = groepService;
        this.customerService = customerService;
        this.routerExtensions = routerExtensions;
        this.page = page;
        this.pageRoute = pageRoute;
        this.activeRoute = activeRoute;
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
        this.routerExtensions.back();
    };
    PaymentsAddComponent = __decorate([
        core_1.Component({
            selector: "PaymentsAdd",
            moduleId: module.id,
            providers: [groep_service_1.GroepService, customer_service_1.CustomerService],
            templateUrl: "./paymentsAdd.component.html"
        }),
        __metadata("design:paramtypes", [groep_service_1.GroepService, customer_service_1.CustomerService,
            nativescript_angular_1.RouterExtensions, page_1.Page, nativescript_angular_1.PageRoute,
            router_1.ActivatedRoute])
    ], PaymentsAddComponent);
    return PaymentsAddComponent;
}());
exports.PaymentsAddComponent = PaymentsAddComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF5bWVudHNBZGQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicGF5bWVudHNBZGQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBQ2xELDBDQUFpRDtBQUNqRCw2REFBbUU7QUFDbkUsNENBQTJDO0FBQzNDLGlEQUFnRDtBQUVoRCx1RUFBcUU7QUFDckUsaUVBQStEO0FBUS9EO0lBU0ksOEJBQW9CLFlBQTBCLEVBQVUsZUFBZ0MsRUFDcEUsZ0JBQWtDLEVBQVUsSUFBVSxFQUFVLFNBQW9CLEVBQ3BGLFdBQTJCO1FBRi9DLGlCQU9DO1FBUG1CLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQVUsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQ3BFLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFBVSxTQUFJLEdBQUosSUFBSSxDQUFNO1FBQVUsY0FBUyxHQUFULFNBQVMsQ0FBVztRQUNwRixnQkFBVyxHQUFYLFdBQVcsQ0FBZ0I7UUFWL0MsV0FBTSxHQUFZLEtBQUssQ0FBQztRQUV4QixZQUFPLEdBQVk7WUFDZixVQUFVLEVBQUUsQ0FBQztZQUNiLFdBQVcsRUFBRSxFQUFFO1lBQ2YsS0FBSyxFQUFFLENBQUM7U0FDWCxDQUFDO1FBS0UsSUFBSSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUM5QixxQkFBUyxDQUFDLFVBQUMsY0FBYyxJQUFLLE9BQUEsY0FBYyxDQUFDLE1BQU0sRUFBckIsQ0FBcUIsQ0FBQyxDQUN2RCxDQUFDLE9BQU8sQ0FBQyxVQUFDLE1BQU0sSUFBTyxLQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFN0UsQ0FBQztJQUVELHVDQUFRLEdBQVI7UUFBQSxpQkFPQztRQU5HLElBQUksQ0FBQyxJQUFJLENBQUMsNEJBQTRCLEdBQUcsSUFBSSxDQUFDO1FBQzlDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxVQUFDLElBQUk7WUFDeEIsSUFBSSxLQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRTtnQkFDbkIsS0FBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDaEQ7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCx5Q0FBVSxHQUFWO1FBQUEsaUJBYUM7UUFaRyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUNuQixJQUFJLENBQUMsZUFBZSxDQUFDLDBCQUEwQixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFTLENBQ25FLFVBQUMsR0FBRztZQUNBLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUM7WUFDN0IsS0FBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7WUFDcEIsS0FBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2xCLENBQUMsRUFDRCxVQUFDLEtBQUs7WUFDRixPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ25CLHVCQUF1QjtRQUMzQixDQUFDLENBQ0osQ0FBQztJQUNOLENBQUM7SUFFRCxxQ0FBTSxHQUFOO1FBQ0ksSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2pDLENBQUM7SUE1Q1Esb0JBQW9CO1FBTmhDLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsYUFBYTtZQUN2QixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsU0FBUyxFQUFFLENBQUMsNEJBQVksRUFBRSxrQ0FBZSxDQUFDO1lBQzFDLFdBQVcsRUFBRSw4QkFBOEI7U0FDOUMsQ0FBQzt5Q0FVb0MsNEJBQVksRUFBMkIsa0NBQWU7WUFDbEQsdUNBQWdCLEVBQWdCLFdBQUksRUFBcUIsZ0NBQVM7WUFDdkUsdUJBQWM7T0FYdEMsb0JBQW9CLENBNkNoQztJQUFELDJCQUFDO0NBQUEsQUE3Q0QsSUE2Q0M7QUE3Q1ksb0RBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBQYWdlUm91dGUsIFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXJcIjtcbmltcG9ydCB7IHN3aXRjaE1hcCB9IGZyb20gXCJyeGpzL29wZXJhdG9yc1wiO1xuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3BhZ2VcIjtcbmltcG9ydCB7IFBheW1lbnQgfSBmcm9tIFwifi9zaGFyZWQvbW9kZWxzL3BheW1lbnQubW9kZWxcIjtcbmltcG9ydCB7IEN1c3RvbWVyU2VydmljZSB9IGZyb20gXCJ+L3NoYXJlZC9zZXJ2aWNlcy9jdXN0b21lci5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBHcm9lcFNlcnZpY2UgfSBmcm9tIFwifi9zaGFyZWQvc2VydmljZXMvZ3JvZXAuc2VydmljZVwiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJQYXltZW50c0FkZFwiLFxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgcHJvdmlkZXJzOiBbR3JvZXBTZXJ2aWNlLCBDdXN0b21lclNlcnZpY2VdLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vcGF5bWVudHNBZGQuY29tcG9uZW50Lmh0bWxcIlxufSlcbmV4cG9ydCBjbGFzcyBQYXltZW50c0FkZENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgaXNCdXN5OiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBwYXltZW50OiBQYXltZW50ID0ge1xuICAgICAgICBjdXN0b21lcklkOiAwLFxuICAgICAgICBkZXNjcmlwdGlvbjogXCJcIixcbiAgICAgICAgcHJpY2U6IDBcbiAgICB9O1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBncm9lcFNlcnZpY2U6IEdyb2VwU2VydmljZSwgcHJpdmF0ZSBjdXN0b21lclNlcnZpY2U6IEN1c3RvbWVyU2VydmljZSxcbiAgICAgICAgICAgICAgICBwcml2YXRlIHJvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMsIHByaXZhdGUgcGFnZTogUGFnZSwgcHJpdmF0ZSBwYWdlUm91dGU6IFBhZ2VSb3V0ZSxcbiAgICAgICAgICAgICAgICBwcml2YXRlIGFjdGl2ZVJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSkge1xuICAgICAgICB0aGlzLnBhZ2VSb3V0ZS5hY3RpdmF0ZWRSb3V0ZS5waXBlKFxuICAgICAgICAgICAgc3dpdGNoTWFwKChhY3RpdmF0ZWRSb3V0ZSkgPT4gYWN0aXZhdGVkUm91dGUucGFyYW1zKVxuICAgICAgICApLmZvckVhY2goKHBhcmFtcykgPT4geyB0aGlzLnBheW1lbnQuY3VzdG9tZXJJZCA9IHBhcmFtcy5jdXN0b21lcl9pZDsgfSk7XG5cbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5wYWdlLmJhY2tncm91bmRTcGFuVW5kZXJTdGF0dXNCYXIgPSB0cnVlO1xuICAgICAgICB0aGlzLnBhZ2Uub24oXCJsb2FkZWRcIiwgKGFyZ3MpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLnBhZ2UuYW5kcm9pZCkge1xuICAgICAgICAgICAgICAgIHRoaXMucGFnZS5hbmRyb2lkLnNldEZpdHNTeXN0ZW1XaW5kb3dzKHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBhZGRQYXltZW50KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmlzQnVzeSA9IHRydWU7XG4gICAgICAgIHRoaXMuY3VzdG9tZXJTZXJ2aWNlLnB1dFBheW1lbnRUb0N1c3RvbWVyQWN0aW9uKHRoaXMucGF5bWVudCkuc3Vic2NyaWJlKFxuICAgICAgICAgICAgKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQWRkZWQgcGF5bWVudFwiKTtcbiAgICAgICAgICAgICAgICB0aGlzLmlzQnVzeSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMuZ29CYWNrKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5kaXIoZXJyb3IpO1xuICAgICAgICAgICAgICAgIC8qVE9ETzogaGFuZGxlIGVycm9ycyovXG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgZ29CYWNrKCkge1xuICAgICAgICB0aGlzLnJvdXRlckV4dGVuc2lvbnMuYmFjaygpO1xuICAgIH1cbn1cbiJdfQ==