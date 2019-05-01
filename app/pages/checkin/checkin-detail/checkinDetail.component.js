"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var nativescript_angular_1 = require("nativescript-angular");
var operators_1 = require("rxjs/operators");
var page_1 = require("tns-core-modules/ui/page");
var customer_service_1 = require("~/shared/services/customer.service");
var CheckinDetailComponent = /** @class */ (function () {
    function CheckinDetailComponent(customerService, routerExtensions, pageRoute, page, activeRoute) {
        var _this = this;
        this.customerService = customerService;
        this.routerExtensions = routerExtensions;
        this.pageRoute = pageRoute;
        this.page = page;
        this.activeRoute = activeRoute;
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
        var _this = this;
        this.page.backgroundSpanUnderStatusBar = true;
        this.page.on("loaded", function (args) {
            if (_this.page.android) {
                _this.page.android.setFitsSystemWindows(true);
            }
        });
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
        var lenght = customer.birthdate.toString().length;
        if (customer.birthdate !== null && lenght > 11) {
            /*Remove mili seconds*/
            customer.birthdate = (customer.birthdate / 1000) + "";
        }
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
        this.routerExtensions.back();
    };
    CheckinDetailComponent = __decorate([
        core_1.Component({
            selector: "CheckinDetail",
            moduleId: module.id,
            providers: [customer_service_1.CustomerService],
            templateUrl: "./checkinDetail.component.html"
        }),
        __metadata("design:paramtypes", [customer_service_1.CustomerService,
            nativescript_angular_1.RouterExtensions, nativescript_angular_1.PageRoute,
            page_1.Page, router_1.ActivatedRoute])
    ], CheckinDetailComponent);
    return CheckinDetailComponent;
}());
exports.CheckinDetailComponent = CheckinDetailComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tpbkRldGFpbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjaGVja2luRGV0YWlsLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFrRDtBQUNsRCwwQ0FBaUQ7QUFDakQsNkRBQW1FO0FBRW5FLDRDQUEyQztBQUMzQyxpREFBZ0Q7QUFFaEQsdUVBQXFFO0FBUXJFO0lBaUJJLGdDQUFvQixlQUFnQyxFQUNoQyxnQkFBa0MsRUFBVSxTQUFvQixFQUNoRSxJQUFVLEVBQVUsV0FBMkI7UUFGbkUsaUJBTUM7UUFObUIsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQ2hDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFBVSxjQUFTLEdBQVQsU0FBUyxDQUFXO1FBQ2hFLFNBQUksR0FBSixJQUFJLENBQU07UUFBVSxnQkFBVyxHQUFYLFdBQVcsQ0FBZ0I7UUFqQm5FLDBCQUFxQixHQUEwQjtZQUMzQyxFQUFFLEVBQUUsRUFBRTtZQUNOLFNBQVMsRUFBRSxFQUFFO1lBQ2IsUUFBUSxFQUFFLEVBQUU7WUFDWixZQUFZLEVBQUUsRUFBRTtZQUNoQixVQUFVLEVBQUUsRUFBRTtZQUNkLHNCQUFzQixFQUFFLEVBQUU7WUFDMUIsR0FBRyxFQUFFLEVBQUU7WUFDUCxlQUFlLEVBQUUsRUFBRTtZQUNuQixLQUFLLEVBQUUsRUFBRTtZQUNULFNBQVMsRUFBRSxFQUFFO1NBQ2hCLENBQUM7UUFFRixXQUFNLEdBQVksSUFBSSxDQUFDO1FBS25CLElBQUksQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLElBQUksQ0FDOUIscUJBQVMsQ0FBQyxVQUFDLGNBQWMsSUFBSyxPQUFBLGNBQWMsQ0FBQyxNQUFNLEVBQXJCLENBQXFCLENBQUMsQ0FDdkQsQ0FBQyxPQUFPLENBQUMsVUFBQyxNQUFNLElBQU8sS0FBSSxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDckUsQ0FBQztJQUVELHlDQUFRLEdBQVI7UUFBQSxpQkFRQztRQVBHLElBQUksQ0FBQyxJQUFJLENBQUMsNEJBQTRCLEdBQUcsSUFBSSxDQUFDO1FBQzlDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxVQUFDLElBQUk7WUFDeEIsSUFBSSxLQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRTtnQkFDbkIsS0FBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDaEQ7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFFRCxrREFBaUIsR0FBakI7UUFBQSxpQkFjQztRQWJHLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ25CLElBQUksQ0FBQyxlQUFlLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQzthQUN2RCxTQUFTLENBQ04sVUFBQyxNQUE2QjtZQUMxQixLQUFJLENBQUMscUJBQXFCLEdBQUcsTUFBTSxDQUFDO1lBQ3BDLE9BQU8sQ0FBQyxHQUFHLENBQUMsdUNBQXVDLENBQUMsQ0FBQztZQUNyRCxLQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUN4QixDQUFDLEVBQ0QsVUFBQyxLQUFLO1lBQ0YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNuQix1QkFBdUI7UUFDM0IsQ0FBQyxDQUNKLENBQUM7SUFDVixDQUFDO0lBRUQsb0RBQW1CLEdBQW5CLFVBQW9CLElBQUk7UUFBeEIsaUJBdUJDO1FBdEJHLElBQU0sUUFBUSxHQUFnQixJQUFJLENBQUMsTUFBTSxDQUFDO1FBQzFDLElBQU0sUUFBUSxHQUFrRCxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUVsRyxJQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxDQUFDLE1BQU0sQ0FBQztRQUVwRCxJQUFJLFFBQVEsQ0FBQyxTQUFTLEtBQUssSUFBSSxJQUFJLE1BQU0sR0FBRyxFQUFFLEVBQUU7WUFDNUMsdUJBQXVCO1lBQ3ZCLFFBQVEsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxRQUFRLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztTQUN6RDtRQUNELElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBRW5CLElBQUksQ0FBQyxlQUFlLENBQUMsOEJBQThCLENBQUMsUUFBUSxDQUFDLENBQUMsU0FBUyxDQUNuRSxVQUFDLEdBQUc7WUFDQSxPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLENBQUM7WUFDaEMsS0FBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDeEIsQ0FBQyxFQUNELFVBQUMsS0FBSztZQUNGLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDbkIsdUJBQXVCO1FBQzNCLENBQUMsQ0FDQSxDQUFDO0lBRVYsQ0FBQztJQUVELHVDQUFNLEdBQU47UUFDSSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDakMsQ0FBQztJQTlFUSxzQkFBc0I7UUFObEMsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxlQUFlO1lBQ3pCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixTQUFTLEVBQUUsQ0FBQyxrQ0FBZSxDQUFDO1lBQzVCLFdBQVcsRUFBRSxnQ0FBZ0M7U0FDaEQsQ0FBQzt5Q0FrQnVDLGtDQUFlO1lBQ2QsdUNBQWdCLEVBQXFCLGdDQUFTO1lBQzFELFdBQUksRUFBdUIsdUJBQWM7T0FuQjFELHNCQUFzQixDQStFbEM7SUFBRCw2QkFBQztDQUFBLEFBL0VELElBK0VDO0FBL0VZLHdEQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHsgUGFnZVJvdXRlLCBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyXCI7XG5pbXBvcnQgeyBSYWREYXRhRm9ybSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtdWktZGF0YWZvcm1cIjtcbmltcG9ydCB7IHN3aXRjaE1hcCB9IGZyb20gXCJyeGpzL29wZXJhdG9yc1wiO1xuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3BhZ2VcIjtcbmltcG9ydCB7IENoZWNraW5DdXN0b21lckRldGFpbCB9IGZyb20gXCJ+L3NoYXJlZC9tb2RlbHMvY2hlY2tpbkN1c3RvbWVyRGV0YWlsLm1vZGVsXCI7XG5pbXBvcnQgeyBDdXN0b21lclNlcnZpY2UgfSBmcm9tIFwifi9zaGFyZWQvc2VydmljZXMvY3VzdG9tZXIuc2VydmljZVwiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJDaGVja2luRGV0YWlsXCIsXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICBwcm92aWRlcnM6IFtDdXN0b21lclNlcnZpY2VdLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vY2hlY2tpbkRldGFpbC5jb21wb25lbnQuaHRtbFwiXG59KVxuZXhwb3J0IGNsYXNzIENoZWNraW5EZXRhaWxDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIGN1c3RvbWVySWQ6IG51bWJlcjtcbiAgICBjdXN0b21lckNoZWNraW5EZXRhaWw6IENoZWNraW5DdXN0b21lckRldGFpbCA9IHtcbiAgICAgICAgaWQ6IFwiXCIsXG4gICAgICAgIGZpcnN0TmFtZTogXCJcIixcbiAgICAgICAgbGFzdE5hbWU6IFwiXCIsXG4gICAgICAgIGxpY2Vuc2VQbGF0ZTogXCJcIixcbiAgICAgICAgZXhwaXJlRGF0ZTogXCJcIixcbiAgICAgICAgbmF0aW9uYWxSZWdpc3Rlck51bWJlcjogXCJcIixcbiAgICAgICAgZ3NtOiBcIlwiLFxuICAgICAgICBlbWVyZ2VuY3lOdW1iZXI6IFwiXCIsXG4gICAgICAgIGVtYWlsOiBcIlwiLFxuICAgICAgICBiaXJ0aGRhdGU6IFwiXCJcbiAgICB9O1xuXG4gICAgaXNCdXN5OiBib29sZWFuID0gdHJ1ZTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgY3VzdG9tZXJTZXJ2aWNlOiBDdXN0b21lclNlcnZpY2UsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSByb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zLCBwcml2YXRlIHBhZ2VSb3V0ZTogUGFnZVJvdXRlLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgcGFnZTogUGFnZSwgcHJpdmF0ZSBhY3RpdmVSb3V0ZTogQWN0aXZhdGVkUm91dGUpIHtcbiAgICAgICAgdGhpcy5wYWdlUm91dGUuYWN0aXZhdGVkUm91dGUucGlwZShcbiAgICAgICAgICAgIHN3aXRjaE1hcCgoYWN0aXZhdGVkUm91dGUpID0+IGFjdGl2YXRlZFJvdXRlLnBhcmFtcylcbiAgICAgICAgKS5mb3JFYWNoKChwYXJhbXMpID0+IHsgdGhpcy5jdXN0b21lcklkID0gcGFyYW1zLmN1c3RvbWVyX2lkOyB9KTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5wYWdlLmJhY2tncm91bmRTcGFuVW5kZXJTdGF0dXNCYXIgPSB0cnVlO1xuICAgICAgICB0aGlzLnBhZ2Uub24oXCJsb2FkZWRcIiwgKGFyZ3MpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLnBhZ2UuYW5kcm9pZCkge1xuICAgICAgICAgICAgICAgIHRoaXMucGFnZS5hbmRyb2lkLnNldEZpdHNTeXN0ZW1XaW5kb3dzKHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5nZXRDdXN0b21lckRldGFpbCgpO1xuICAgIH1cblxuICAgIGdldEN1c3RvbWVyRGV0YWlsKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmlzQnVzeSA9IHRydWU7XG4gICAgICAgIHRoaXMuY3VzdG9tZXJTZXJ2aWNlLmdldENoZWNraW5CeUN1c3RvbWVySWQodGhpcy5jdXN0b21lcklkKVxuICAgICAgICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICAocmVzdWx0OiBDaGVja2luQ3VzdG9tZXJEZXRhaWwpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXN0b21lckNoZWNraW5EZXRhaWwgPSByZXN1bHQ7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZm91bmQgbWUgc29tZSBjdXN0b21lciBjaGVja2luIGRldGFpbFwiKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc0J1c3kgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmRpcihlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIC8qVE9ETzogaGFuZGxlIGVycm9ycyovXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcbiAgICB9XG5cbiAgICBkZlByb3BlcnR5Q29tbWl0dGVkKGFyZ3MpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgZGF0YUZvcm0gPSA8UmFkRGF0YUZvcm0+YXJncy5vYmplY3Q7XG4gICAgICAgIGNvbnN0IGN1c3RvbWVyOiBDaGVja2luQ3VzdG9tZXJEZXRhaWwgPSA8Q2hlY2tpbkN1c3RvbWVyRGV0YWlsPiBKU09OLnBhcnNlKGRhdGFGb3JtLmVkaXRlZE9iamVjdCk7XG5cbiAgICAgICAgY29uc3QgbGVuZ2h0ID0gY3VzdG9tZXIuYmlydGhkYXRlLnRvU3RyaW5nKCkubGVuZ3RoO1xuXG4gICAgICAgIGlmIChjdXN0b21lci5iaXJ0aGRhdGUgIT09IG51bGwgJiYgbGVuZ2h0ID4gMTEpIHtcbiAgICAgICAgICAgIC8qUmVtb3ZlIG1pbGkgc2Vjb25kcyovXG4gICAgICAgICAgICBjdXN0b21lci5iaXJ0aGRhdGUgPSAoY3VzdG9tZXIuYmlydGhkYXRlIC8gMTAwMCkgKyBcIlwiO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaXNCdXN5ID0gdHJ1ZTtcblxuICAgICAgICB0aGlzLmN1c3RvbWVyU2VydmljZS5wdXRDaGVja2luQ3VzdG9tZXJEZXRhaWxBY3Rpb24oY3VzdG9tZXIpLnN1YnNjcmliZShcbiAgICAgICAgICAgIChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlVwZGF0ZWQgY3VzdG9tZXJcIik7XG4gICAgICAgICAgICAgICAgdGhpcy5pc0J1c3kgPSBmYWxzZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmRpcihlcnJvcik7XG4gICAgICAgICAgICAgICAgLypUT0RPOiBoYW5kbGUgZXJyb3JzKi9cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7XG5cbiAgICB9XG5cbiAgICBnb0JhY2soKSB7XG4gICAgICAgIHRoaXMucm91dGVyRXh0ZW5zaW9ucy5iYWNrKCk7XG4gICAgfVxufVxuIl19