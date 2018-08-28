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
        this.routerExtensions.backToPreviousPage();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF5bWVudHNBZGQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicGF5bWVudHNBZGQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBQ2xELDZEQUFtRTtBQUNuRSw0Q0FBMkM7QUFDM0MsaURBQWdEO0FBRWhELHVFQUFxRTtBQUNyRSxpRUFBK0Q7QUFRL0Q7SUFTSSw4QkFBb0IsWUFBMEIsRUFBVSxlQUFnQyxFQUNwRSxnQkFBa0MsRUFBVSxJQUFVLEVBQVUsU0FBb0I7UUFEeEcsaUJBTUM7UUFObUIsaUJBQVksR0FBWixZQUFZLENBQWM7UUFBVSxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDcEUscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUFVLFNBQUksR0FBSixJQUFJLENBQU07UUFBVSxjQUFTLEdBQVQsU0FBUyxDQUFXO1FBVHhHLFdBQU0sR0FBWSxLQUFLLENBQUM7UUFFeEIsWUFBTyxHQUFZO1lBQ2YsVUFBVSxFQUFFLENBQUM7WUFDYixXQUFXLEVBQUUsRUFBRTtZQUNmLEtBQUssRUFBRSxDQUFDO1NBQ1gsQ0FBQztRQUlFLElBQUksQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLElBQUksQ0FDOUIscUJBQVMsQ0FBQyxVQUFDLGNBQWMsSUFBSyxPQUFBLGNBQWMsQ0FBQyxNQUFNLEVBQXJCLENBQXFCLENBQUMsQ0FDdkQsQ0FBQyxPQUFPLENBQUMsVUFBQyxNQUFNLElBQU8sS0FBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRTdFLENBQUM7SUFFRCx1Q0FBUSxHQUFSO0lBRUEsQ0FBQztJQUVELHlDQUFVLEdBQVY7UUFBQSxpQkFhQztRQVpHLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ25CLElBQUksQ0FBQyxlQUFlLENBQUMsMEJBQTBCLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFNBQVMsQ0FDbkUsVUFBQyxHQUFHO1lBQ0EsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUM3QixLQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztZQUNwQixLQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDbEIsQ0FBQyxFQUNELFVBQUMsS0FBSztZQUNGLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDbkIsdUJBQXVCO1FBQzNCLENBQUMsQ0FDSixDQUFDO0lBQ04sQ0FBQztJQUVELHFDQUFNLEdBQU47UUFDSSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztJQUMvQyxDQUFDO0lBdENRLG9CQUFvQjtRQU5oQyxnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLGFBQWE7WUFDdkIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFNBQVMsRUFBRSxDQUFDLDRCQUFZLEVBQUUsa0NBQWUsQ0FBQztZQUMxQyxXQUFXLEVBQUUsOEJBQThCO1NBQzlDLENBQUM7eUNBVW9DLDRCQUFZLEVBQTJCLGtDQUFlO1lBQ2xELHVDQUFnQixFQUFnQixXQUFJLEVBQXFCLGdDQUFTO09BVi9GLG9CQUFvQixDQXVDaEM7SUFBRCwyQkFBQztDQUFBLEFBdkNELElBdUNDO0FBdkNZLG9EQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IFBhZ2VSb3V0ZSwgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhclwiO1xuaW1wb3J0IHsgc3dpdGNoTWFwIH0gZnJvbSBcInJ4anMvb3BlcmF0b3JzXCI7XG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvcGFnZVwiO1xuaW1wb3J0IHsgUGF5bWVudCB9IGZyb20gXCJ+L3NoYXJlZC9tb2RlbHMvcGF5bWVudC5tb2RlbFwiO1xuaW1wb3J0IHsgQ3VzdG9tZXJTZXJ2aWNlIH0gZnJvbSBcIn4vc2hhcmVkL3NlcnZpY2VzL2N1c3RvbWVyLnNlcnZpY2VcIjtcbmltcG9ydCB7IEdyb2VwU2VydmljZSB9IGZyb20gXCJ+L3NoYXJlZC9zZXJ2aWNlcy9ncm9lcC5zZXJ2aWNlXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcIlBheW1lbnRzQWRkXCIsXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICBwcm92aWRlcnM6IFtHcm9lcFNlcnZpY2UsIEN1c3RvbWVyU2VydmljZV0sXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9wYXltZW50c0FkZC5jb21wb25lbnQuaHRtbFwiXG59KVxuZXhwb3J0IGNsYXNzIFBheW1lbnRzQWRkQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBpc0J1c3k6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIHBheW1lbnQ6IFBheW1lbnQgPSB7XG4gICAgICAgIGN1c3RvbWVySWQ6IDAsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBcIlwiLFxuICAgICAgICBwcmljZTogMFxuICAgIH07XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGdyb2VwU2VydmljZTogR3JvZXBTZXJ2aWNlLCBwcml2YXRlIGN1c3RvbWVyU2VydmljZTogQ3VzdG9tZXJTZXJ2aWNlLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgcm91dGVyRXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9ucywgcHJpdmF0ZSBwYWdlOiBQYWdlLCBwcml2YXRlIHBhZ2VSb3V0ZTogUGFnZVJvdXRlKSB7XG4gICAgICAgIHRoaXMucGFnZVJvdXRlLmFjdGl2YXRlZFJvdXRlLnBpcGUoXG4gICAgICAgICAgICBzd2l0Y2hNYXAoKGFjdGl2YXRlZFJvdXRlKSA9PiBhY3RpdmF0ZWRSb3V0ZS5wYXJhbXMpXG4gICAgICAgICkuZm9yRWFjaCgocGFyYW1zKSA9PiB7IHRoaXMucGF5bWVudC5jdXN0b21lcklkID0gcGFyYW1zLmN1c3RvbWVyX2lkOyB9KTtcblxuICAgIH1cblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuXG4gICAgfVxuXG4gICAgYWRkUGF5bWVudCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5pc0J1c3kgPSB0cnVlO1xuICAgICAgICB0aGlzLmN1c3RvbWVyU2VydmljZS5wdXRQYXltZW50VG9DdXN0b21lckFjdGlvbih0aGlzLnBheW1lbnQpLnN1YnNjcmliZShcbiAgICAgICAgICAgIChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkFkZGVkIHBheW1lbnRcIik7XG4gICAgICAgICAgICAgICAgdGhpcy5pc0J1c3kgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLmdvQmFjaygpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZGlyKGVycm9yKTtcbiAgICAgICAgICAgICAgICAvKlRPRE86IGhhbmRsZSBlcnJvcnMqL1xuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgIH1cblxuICAgIGdvQmFjaygpIHtcbiAgICAgICAgdGhpcy5yb3V0ZXJFeHRlbnNpb25zLmJhY2tUb1ByZXZpb3VzUGFnZSgpO1xuICAgIH1cbn1cbiJdfQ==