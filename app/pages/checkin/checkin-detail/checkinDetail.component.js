"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var nativescript_angular_1 = require("nativescript-angular");
var operators_1 = require("rxjs/operators");
var page_1 = require("tns-core-modules/ui/page");
var customer_service_1 = require("~/shared/services/customer.service");
var CheckinDetailComponent = /** @class */ (function () {
    function CheckinDetailComponent(customerService, routerExtensions, pageRoute, page) {
        var _this = this;
        this.customerService = customerService;
        this.routerExtensions = routerExtensions;
        this.pageRoute = pageRoute;
        this.page = page;
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
        this.routerExtensions.back({ relativeTo: this.activeRoute });
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
            page_1.Page])
    ], CheckinDetailComponent);
    return CheckinDetailComponent;
}());
exports.CheckinDetailComponent = CheckinDetailComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tpbkRldGFpbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjaGVja2luRGV0YWlsLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFrRDtBQUNsRCw2REFBbUU7QUFFbkUsNENBQTJDO0FBQzNDLGlEQUFnRDtBQUVoRCx1RUFBcUU7QUFRckU7SUFpQkksZ0NBQW9CLGVBQWdDLEVBQ2hDLGdCQUFrQyxFQUFVLFNBQW9CLEVBQ2hFLElBQVU7UUFGOUIsaUJBTUM7UUFObUIsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQ2hDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFBVSxjQUFTLEdBQVQsU0FBUyxDQUFXO1FBQ2hFLFNBQUksR0FBSixJQUFJLENBQU07UUFqQjlCLDBCQUFxQixHQUEwQjtZQUMzQyxFQUFFLEVBQUUsRUFBRTtZQUNOLFNBQVMsRUFBRSxFQUFFO1lBQ2IsUUFBUSxFQUFFLEVBQUU7WUFDWixZQUFZLEVBQUUsRUFBRTtZQUNoQixVQUFVLEVBQUUsRUFBRTtZQUNkLHNCQUFzQixFQUFFLEVBQUU7WUFDMUIsR0FBRyxFQUFFLEVBQUU7WUFDUCxlQUFlLEVBQUUsRUFBRTtZQUNuQixLQUFLLEVBQUUsRUFBRTtZQUNULFNBQVMsRUFBRSxFQUFFO1NBQ2hCLENBQUM7UUFFRixXQUFNLEdBQVksSUFBSSxDQUFDO1FBS25CLElBQUksQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLElBQUksQ0FDOUIscUJBQVMsQ0FBQyxVQUFDLGNBQWMsSUFBSyxPQUFBLGNBQWMsQ0FBQyxNQUFNLEVBQXJCLENBQXFCLENBQUMsQ0FDdkQsQ0FBQyxPQUFPLENBQUMsVUFBQyxNQUFNLElBQU8sS0FBSSxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDckUsQ0FBQztJQUVELHlDQUFRLEdBQVI7UUFBQSxpQkFRQztRQVBHLElBQUksQ0FBQyxJQUFJLENBQUMsNEJBQTRCLEdBQUcsSUFBSSxDQUFDO1FBQzlDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxVQUFDLElBQUk7WUFDeEIsSUFBSSxLQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRTtnQkFDbkIsS0FBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDaEQ7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFFRCxrREFBaUIsR0FBakI7UUFBQSxpQkFjQztRQWJHLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ25CLElBQUksQ0FBQyxlQUFlLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQzthQUN2RCxTQUFTLENBQ04sVUFBQyxNQUE2QjtZQUMxQixLQUFJLENBQUMscUJBQXFCLEdBQUcsTUFBTSxDQUFDO1lBQ3BDLE9BQU8sQ0FBQyxHQUFHLENBQUMsdUNBQXVDLENBQUMsQ0FBQztZQUNyRCxLQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUN4QixDQUFDLEVBQ0QsVUFBQyxLQUFLO1lBQ0YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNuQix1QkFBdUI7UUFDM0IsQ0FBQyxDQUNKLENBQUM7SUFDVixDQUFDO0lBRUQsb0RBQW1CLEdBQW5CLFVBQW9CLElBQUk7UUFBeEIsaUJBdUJDO1FBdEJHLElBQU0sUUFBUSxHQUFnQixJQUFJLENBQUMsTUFBTSxDQUFDO1FBQzFDLElBQU0sUUFBUSxHQUFrRCxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUVsRyxJQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxDQUFDLE1BQU0sQ0FBQztRQUVwRCxJQUFJLFFBQVEsQ0FBQyxTQUFTLEtBQUssSUFBSSxJQUFJLE1BQU0sR0FBRyxFQUFFLEVBQUU7WUFDNUMsdUJBQXVCO1lBQ3ZCLFFBQVEsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxRQUFRLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztTQUN6RDtRQUNELElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBRW5CLElBQUksQ0FBQyxlQUFlLENBQUMsOEJBQThCLENBQUMsUUFBUSxDQUFDLENBQUMsU0FBUyxDQUNuRSxVQUFDLEdBQUc7WUFDQSxPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLENBQUM7WUFDaEMsS0FBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDeEIsQ0FBQyxFQUNELFVBQUMsS0FBSztZQUNGLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDbkIsdUJBQXVCO1FBQzNCLENBQUMsQ0FDQSxDQUFDO0lBRVYsQ0FBQztJQUVELHVDQUFNLEdBQU47UUFDSSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztJQUMvQyxDQUFDO0lBOUVRLHNCQUFzQjtRQU5sQyxnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLGVBQWU7WUFDekIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFNBQVMsRUFBRSxDQUFDLGtDQUFlLENBQUM7WUFDNUIsV0FBVyxFQUFFLGdDQUFnQztTQUNoRCxDQUFDO3lDQWtCdUMsa0NBQWU7WUFDZCx1Q0FBZ0IsRUFBcUIsZ0NBQVM7WUFDMUQsV0FBSTtPQW5CckIsc0JBQXNCLENBK0VsQztJQUFELDZCQUFDO0NBQUEsQUEvRUQsSUErRUM7QUEvRVksd0RBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgUGFnZVJvdXRlLCBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyXCI7XG5pbXBvcnQgeyBSYWREYXRhRm9ybSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtdWktZGF0YWZvcm1cIjtcbmltcG9ydCB7IHN3aXRjaE1hcCB9IGZyb20gXCJyeGpzL29wZXJhdG9yc1wiO1xuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3BhZ2VcIjtcbmltcG9ydCB7IENoZWNraW5DdXN0b21lckRldGFpbCB9IGZyb20gXCJ+L3NoYXJlZC9tb2RlbHMvY2hlY2tpbkN1c3RvbWVyRGV0YWlsLm1vZGVsXCI7XG5pbXBvcnQgeyBDdXN0b21lclNlcnZpY2UgfSBmcm9tIFwifi9zaGFyZWQvc2VydmljZXMvY3VzdG9tZXIuc2VydmljZVwiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJDaGVja2luRGV0YWlsXCIsXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICBwcm92aWRlcnM6IFtDdXN0b21lclNlcnZpY2VdLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vY2hlY2tpbkRldGFpbC5jb21wb25lbnQuaHRtbFwiXG59KVxuZXhwb3J0IGNsYXNzIENoZWNraW5EZXRhaWxDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIGN1c3RvbWVySWQ6IG51bWJlcjtcbiAgICBjdXN0b21lckNoZWNraW5EZXRhaWw6IENoZWNraW5DdXN0b21lckRldGFpbCA9IHtcbiAgICAgICAgaWQ6IFwiXCIsXG4gICAgICAgIGZpcnN0TmFtZTogXCJcIixcbiAgICAgICAgbGFzdE5hbWU6IFwiXCIsXG4gICAgICAgIGxpY2Vuc2VQbGF0ZTogXCJcIixcbiAgICAgICAgZXhwaXJlRGF0ZTogXCJcIixcbiAgICAgICAgbmF0aW9uYWxSZWdpc3Rlck51bWJlcjogXCJcIixcbiAgICAgICAgZ3NtOiBcIlwiLFxuICAgICAgICBlbWVyZ2VuY3lOdW1iZXI6IFwiXCIsXG4gICAgICAgIGVtYWlsOiBcIlwiLFxuICAgICAgICBiaXJ0aGRhdGU6IFwiXCJcbiAgICB9O1xuXG4gICAgaXNCdXN5OiBib29sZWFuID0gdHJ1ZTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgY3VzdG9tZXJTZXJ2aWNlOiBDdXN0b21lclNlcnZpY2UsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSByb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zLCBwcml2YXRlIHBhZ2VSb3V0ZTogUGFnZVJvdXRlLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgcGFnZTogUGFnZSkge1xuICAgICAgICB0aGlzLnBhZ2VSb3V0ZS5hY3RpdmF0ZWRSb3V0ZS5waXBlKFxuICAgICAgICAgICAgc3dpdGNoTWFwKChhY3RpdmF0ZWRSb3V0ZSkgPT4gYWN0aXZhdGVkUm91dGUucGFyYW1zKVxuICAgICAgICApLmZvckVhY2goKHBhcmFtcykgPT4geyB0aGlzLmN1c3RvbWVySWQgPSBwYXJhbXMuY3VzdG9tZXJfaWQ7IH0pO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnBhZ2UuYmFja2dyb3VuZFNwYW5VbmRlclN0YXR1c0JhciA9IHRydWU7XG4gICAgICAgIHRoaXMucGFnZS5vbihcImxvYWRlZFwiLCAoYXJncykgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMucGFnZS5hbmRyb2lkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wYWdlLmFuZHJvaWQuc2V0Rml0c1N5c3RlbVdpbmRvd3ModHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmdldEN1c3RvbWVyRGV0YWlsKCk7XG4gICAgfVxuXG4gICAgZ2V0Q3VzdG9tZXJEZXRhaWwoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuaXNCdXN5ID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5jdXN0b21lclNlcnZpY2UuZ2V0Q2hlY2tpbkJ5Q3VzdG9tZXJJZCh0aGlzLmN1c3RvbWVySWQpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgIChyZXN1bHQ6IENoZWNraW5DdXN0b21lckRldGFpbCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmN1c3RvbWVyQ2hlY2tpbkRldGFpbCA9IHJlc3VsdDtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJmb3VuZCBtZSBzb21lIGN1c3RvbWVyIGNoZWNraW4gZGV0YWlsXCIpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzQnVzeSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZGlyKGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgLypUT0RPOiBoYW5kbGUgZXJyb3JzKi9cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuICAgIH1cblxuICAgIGRmUHJvcGVydHlDb21taXR0ZWQoYXJncyk6IHZvaWQge1xuICAgICAgICBjb25zdCBkYXRhRm9ybSA9IDxSYWREYXRhRm9ybT5hcmdzLm9iamVjdDtcbiAgICAgICAgY29uc3QgY3VzdG9tZXI6IENoZWNraW5DdXN0b21lckRldGFpbCA9IDxDaGVja2luQ3VzdG9tZXJEZXRhaWw+IEpTT04ucGFyc2UoZGF0YUZvcm0uZWRpdGVkT2JqZWN0KTtcblxuICAgICAgICBjb25zdCBsZW5naHQgPSBjdXN0b21lci5iaXJ0aGRhdGUudG9TdHJpbmcoKS5sZW5ndGg7XG5cbiAgICAgICAgaWYgKGN1c3RvbWVyLmJpcnRoZGF0ZSAhPT0gbnVsbCAmJiBsZW5naHQgPiAxMSkge1xuICAgICAgICAgICAgLypSZW1vdmUgbWlsaSBzZWNvbmRzKi9cbiAgICAgICAgICAgIGN1c3RvbWVyLmJpcnRoZGF0ZSA9IChjdXN0b21lci5iaXJ0aGRhdGUgLyAxMDAwKSArIFwiXCI7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5pc0J1c3kgPSB0cnVlO1xuXG4gICAgICAgIHRoaXMuY3VzdG9tZXJTZXJ2aWNlLnB1dENoZWNraW5DdXN0b21lckRldGFpbEFjdGlvbihjdXN0b21lcikuc3Vic2NyaWJlKFxuICAgICAgICAgICAgKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVXBkYXRlZCBjdXN0b21lclwiKTtcbiAgICAgICAgICAgICAgICB0aGlzLmlzQnVzeSA9IGZhbHNlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZGlyKGVycm9yKTtcbiAgICAgICAgICAgICAgICAvKlRPRE86IGhhbmRsZSBlcnJvcnMqL1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcblxuICAgIH1cblxuICAgIGdvQmFjaygpIHtcbiAgICAgICAgdGhpcy5yb3V0ZXJFeHRlbnNpb25zLmJhY2tUb1ByZXZpb3VzUGFnZSgpO1xuICAgIH1cbn1cbiJdfQ==