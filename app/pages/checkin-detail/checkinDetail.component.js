"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var nativescript_angular_1 = require("nativescript-angular");
var operators_1 = require("rxjs/operators");
var customer_service_1 = require("~/shared/services/customer.service");
var CheckinDetailComponent = /** @class */ (function () {
    function CheckinDetailComponent(customerService, routerExtensions, pageRoute) {
        var _this = this;
        this.customerService = customerService;
        this.routerExtensions = routerExtensions;
        this.pageRoute = pageRoute;
        this.customerCheckinDetail = {
            id: "",
            firstName: "",
            lastName: "",
            licensePlate: "",
            expireDate: "",
            nationalRegisterNumber: "",
            gsm: "",
            emergencyNumber: "",
            email: "",
            birthdate: ""
        };
        this.isBusy = true;
        this.pageRoute.activatedRoute.pipe(operators_1.switchMap(function (activatedRoute) { return activatedRoute.params; })).forEach(function (params) { _this.customerId = params.customer_id; });
    }
    CheckinDetailComponent.prototype.ngOnInit = function () {
        this.getCustomerDetail();
    };
    CheckinDetailComponent.prototype.getCustomerDetail = function () {
        var _this = this;
        this.isBusy = true;
        this.customerService.getCheckinByCustomerId(this.customerId)
            .subscribe(function (result) {
            _this.customerCheckinDetail = result;
            console.log("found me some customer checkin detail");
            _this.isBusy = false;
        }, function (error) {
            console.dir(error);
            /*TODO: handle errors*/
        });
    };
    CheckinDetailComponent.prototype.dfPropertyCommitted = function (args) {
        var _this = this;
        var dataForm = args.object;
        var customer = JSON.parse(dataForm.editedObject);
        this.isBusy = true;
        this.customerService.putCheckinCustomerDetailAction(customer).subscribe(function (res) {
            console.log("Updated customer");
            _this.isBusy = false;
        }, function (error) {
            console.dir(error);
            /*TODO: handle errors*/
        });
    };
    CheckinDetailComponent.prototype.goBack = function () {
        this.routerExtensions.backToPreviousPage();
    };
    CheckinDetailComponent = __decorate([
        core_1.Component({
            selector: "CheckinDetail",
            moduleId: module.id,
            providers: [customer_service_1.CustomerService],
            templateUrl: "./checkinDetail.component.html"
        }),
        __metadata("design:paramtypes", [customer_service_1.CustomerService,
            nativescript_angular_1.RouterExtensions, nativescript_angular_1.PageRoute])
    ], CheckinDetailComponent);
    return CheckinDetailComponent;
}());
exports.CheckinDetailComponent = CheckinDetailComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tpbkRldGFpbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjaGVja2luRGV0YWlsLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFrRDtBQUNsRCw2REFBbUU7QUFFbkUsNENBQTJDO0FBRTNDLHVFQUFxRTtBQVFyRTtJQWlCSSxnQ0FBb0IsZUFBZ0MsRUFDaEMsZ0JBQWtDLEVBQVUsU0FBb0I7UUFEcEYsaUJBS0M7UUFMbUIsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQ2hDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFBVSxjQUFTLEdBQVQsU0FBUyxDQUFXO1FBaEJwRiwwQkFBcUIsR0FBMEI7WUFDM0MsRUFBRSxFQUFFLEVBQUU7WUFDTixTQUFTLEVBQUUsRUFBRTtZQUNiLFFBQVEsRUFBRSxFQUFFO1lBQ1osWUFBWSxFQUFFLEVBQUU7WUFDaEIsVUFBVSxFQUFFLEVBQUU7WUFDZCxzQkFBc0IsRUFBRSxFQUFFO1lBQzFCLEdBQUcsRUFBRSxFQUFFO1lBQ1AsZUFBZSxFQUFFLEVBQUU7WUFDbkIsS0FBSyxFQUFFLEVBQUU7WUFDVCxTQUFTLEVBQUUsRUFBRTtTQUNoQixDQUFDO1FBRUYsV0FBTSxHQUFZLElBQUksQ0FBQztRQUluQixJQUFJLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQzlCLHFCQUFTLENBQUMsVUFBQyxjQUFjLElBQUssT0FBQSxjQUFjLENBQUMsTUFBTSxFQUFyQixDQUFxQixDQUFDLENBQ3ZELENBQUMsT0FBTyxDQUFDLFVBQUMsTUFBTSxJQUFPLEtBQUksQ0FBQyxVQUFVLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3JFLENBQUM7SUFFRCx5Q0FBUSxHQUFSO1FBQ0ksSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7SUFDN0IsQ0FBQztJQUVELGtEQUFpQixHQUFqQjtRQUFBLGlCQWNDO1FBYkcsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDbkIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO2FBQ3ZELFNBQVMsQ0FDTixVQUFDLE1BQTZCO1lBQzFCLEtBQUksQ0FBQyxxQkFBcUIsR0FBRyxNQUFNLENBQUM7WUFDcEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyx1Q0FBdUMsQ0FBQyxDQUFDO1lBQ3JELEtBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3hCLENBQUMsRUFDRCxVQUFDLEtBQUs7WUFDRixPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ25CLHVCQUF1QjtRQUMzQixDQUFDLENBQ0osQ0FBQztJQUNWLENBQUM7SUFFRCxvREFBbUIsR0FBbkIsVUFBb0IsSUFBSTtRQUF4QixpQkFnQkM7UUFmRyxJQUFNLFFBQVEsR0FBZ0IsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUMxQyxJQUFNLFFBQVEsR0FBa0QsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLENBQUM7UUFFbEcsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFFbkIsSUFBSSxDQUFDLGVBQWUsQ0FBQyw4QkFBOEIsQ0FBQyxRQUFRLENBQUMsQ0FBQyxTQUFTLENBQ25FLFVBQUMsR0FBRztZQUNBLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUMsQ0FBQztZQUNoQyxLQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUN4QixDQUFDLEVBQ0QsVUFBQyxLQUFLO1lBQ0YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNuQix1QkFBdUI7UUFDM0IsQ0FBQyxDQUNKLENBQUM7SUFDTixDQUFDO0lBRUQsdUNBQU0sR0FBTjtRQUNJLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO0lBQy9DLENBQUM7SUFoRVEsc0JBQXNCO1FBTmxDLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsZUFBZTtZQUN6QixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsU0FBUyxFQUFFLENBQUMsa0NBQWUsQ0FBQztZQUM1QixXQUFXLEVBQUUsZ0NBQWdDO1NBQ2hELENBQUM7eUNBa0J1QyxrQ0FBZTtZQUNkLHVDQUFnQixFQUFxQixnQ0FBUztPQWxCM0Usc0JBQXNCLENBaUVsQztJQUFELDZCQUFDO0NBQUEsQUFqRUQsSUFpRUM7QUFqRVksd0RBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgUGFnZVJvdXRlLCBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyXCI7XG5pbXBvcnQgeyBSYWREYXRhRm9ybSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtdWktZGF0YWZvcm1cIjtcbmltcG9ydCB7IHN3aXRjaE1hcCB9IGZyb20gXCJyeGpzL29wZXJhdG9yc1wiO1xuaW1wb3J0IHsgQ2hlY2tpbkN1c3RvbWVyRGV0YWlsIH0gZnJvbSBcIn4vc2hhcmVkL21vZGVscy9jaGVja2luQ3VzdG9tZXJEZXRhaWwubW9kZWxcIjtcbmltcG9ydCB7IEN1c3RvbWVyU2VydmljZSB9IGZyb20gXCJ+L3NoYXJlZC9zZXJ2aWNlcy9jdXN0b21lci5zZXJ2aWNlXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcIkNoZWNraW5EZXRhaWxcIixcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHByb3ZpZGVyczogW0N1c3RvbWVyU2VydmljZV0sXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9jaGVja2luRGV0YWlsLmNvbXBvbmVudC5odG1sXCJcbn0pXG5leHBvcnQgY2xhc3MgQ2hlY2tpbkRldGFpbENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgY3VzdG9tZXJJZDogbnVtYmVyO1xuICAgIGN1c3RvbWVyQ2hlY2tpbkRldGFpbDogQ2hlY2tpbkN1c3RvbWVyRGV0YWlsID0ge1xuICAgICAgICBpZDogXCJcIixcbiAgICAgICAgZmlyc3ROYW1lOiBcIlwiLFxuICAgICAgICBsYXN0TmFtZTogXCJcIixcbiAgICAgICAgbGljZW5zZVBsYXRlOiBcIlwiLFxuICAgICAgICBleHBpcmVEYXRlOiBcIlwiLFxuICAgICAgICBuYXRpb25hbFJlZ2lzdGVyTnVtYmVyOiBcIlwiLFxuICAgICAgICBnc206IFwiXCIsXG4gICAgICAgIGVtZXJnZW5jeU51bWJlcjogXCJcIixcbiAgICAgICAgZW1haWw6IFwiXCIsXG4gICAgICAgIGJpcnRoZGF0ZTogXCJcIlxuICAgIH07XG5cbiAgICBpc0J1c3k6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBjdXN0b21lclNlcnZpY2U6IEN1c3RvbWVyU2VydmljZSxcbiAgICAgICAgICAgICAgICBwcml2YXRlIHJvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMsIHByaXZhdGUgcGFnZVJvdXRlOiBQYWdlUm91dGUpIHtcbiAgICAgICAgdGhpcy5wYWdlUm91dGUuYWN0aXZhdGVkUm91dGUucGlwZShcbiAgICAgICAgICAgIHN3aXRjaE1hcCgoYWN0aXZhdGVkUm91dGUpID0+IGFjdGl2YXRlZFJvdXRlLnBhcmFtcylcbiAgICAgICAgKS5mb3JFYWNoKChwYXJhbXMpID0+IHsgdGhpcy5jdXN0b21lcklkID0gcGFyYW1zLmN1c3RvbWVyX2lkOyB9KTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5nZXRDdXN0b21lckRldGFpbCgpO1xuICAgIH1cblxuICAgIGdldEN1c3RvbWVyRGV0YWlsKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmlzQnVzeSA9IHRydWU7XG4gICAgICAgIHRoaXMuY3VzdG9tZXJTZXJ2aWNlLmdldENoZWNraW5CeUN1c3RvbWVySWQodGhpcy5jdXN0b21lcklkKVxuICAgICAgICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICAocmVzdWx0OiBDaGVja2luQ3VzdG9tZXJEZXRhaWwpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXN0b21lckNoZWNraW5EZXRhaWwgPSByZXN1bHQ7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZm91bmQgbWUgc29tZSBjdXN0b21lciBjaGVja2luIGRldGFpbFwiKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc0J1c3kgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmRpcihlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIC8qVE9ETzogaGFuZGxlIGVycm9ycyovXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcbiAgICB9XG5cbiAgICBkZlByb3BlcnR5Q29tbWl0dGVkKGFyZ3MpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgZGF0YUZvcm0gPSA8UmFkRGF0YUZvcm0+YXJncy5vYmplY3Q7XG4gICAgICAgIGNvbnN0IGN1c3RvbWVyOiBDaGVja2luQ3VzdG9tZXJEZXRhaWwgPSA8Q2hlY2tpbkN1c3RvbWVyRGV0YWlsPiBKU09OLnBhcnNlKGRhdGFGb3JtLmVkaXRlZE9iamVjdCk7XG5cbiAgICAgICAgdGhpcy5pc0J1c3kgPSB0cnVlO1xuXG4gICAgICAgIHRoaXMuY3VzdG9tZXJTZXJ2aWNlLnB1dENoZWNraW5DdXN0b21lckRldGFpbEFjdGlvbihjdXN0b21lcikuc3Vic2NyaWJlKFxuICAgICAgICAgICAgKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVXBkYXRlZCBjdXN0b21lclwiKTtcbiAgICAgICAgICAgICAgICB0aGlzLmlzQnVzeSA9IGZhbHNlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZGlyKGVycm9yKTtcbiAgICAgICAgICAgICAgICAvKlRPRE86IGhhbmRsZSBlcnJvcnMqL1xuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgIH1cblxuICAgIGdvQmFjaygpIHtcbiAgICAgICAgdGhpcy5yb3V0ZXJFeHRlbnNpb25zLmJhY2tUb1ByZXZpb3VzUGFnZSgpO1xuICAgIH1cbn1cbiJdfQ==