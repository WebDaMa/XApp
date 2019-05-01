"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var nativescript_angular_1 = require("nativescript-angular");
var page_1 = require("tns-core-modules/ui/page");
var settings_1 = require("~/settings/settings");
var customer_service_1 = require("~/shared/services/customer.service");
var groep_service_1 = require("~/shared/services/groep.service");
var GroepComponent = /** @class */ (function () {
    function GroepComponent(groepService, customerService, routerExtensions, page, activeRoute) {
        this.groepService = groepService;
        this.customerService = customerService;
        this.routerExtensions = routerExtensions;
        this.page = page;
        this.activeRoute = activeRoute;
        this.groeps = [];
        this.customers = [];
        this.isBusy = true;
    }
    GroepComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.getGroeps();
        this.page.backgroundSpanUnderStatusBar = true;
        this.page.on("loaded", function (args) {
            if (_this.page.android) {
                _this.page.android.setFitsSystemWindows(true);
            }
        });
    };
    GroepComponent.prototype.getGroeps = function () {
        var _this = this;
        var locationId = settings_1.Settings.getLocation();
        var date = settings_1.Settings.getDate();
        this.isBusy = true;
        this.groepService.getAllGroepsForWeekAndLocationAction(date, locationId)
            .subscribe(function (result) {
            _this.groeps = [{ key: "0", label: "Kies een Groep" }];
            _this.groeps = _this.groeps.concat(result.map(function (_a) {
                var id = _a.id, name = _a.name;
                return ({ key: id, label: name });
            }));
            _this.isBusy = false;
            _this.getCustomers();
        }, function (error) {
            console.dir(error);
            _this.isBusy = false;
            /*TODO: handle errors*/
        });
    };
    GroepComponent.prototype.getCustomers = function () {
        var _this = this;
        this.isBusy = true;
        var locationId = settings_1.Settings.getLocation();
        var date = settings_1.Settings.getDate();
        this.customerService.getAllByPeriodIdAndLocationIdForGroupLayoutAction(date, locationId)
            .subscribe(function (result) {
            _this.customers = result;
            console.log("found me some groep customers");
            _this.isBusy = false;
        }, function (error) {
            console.dir(error);
            /*TODO: handle errors*/
            _this.isBusy = false;
        });
    };
    GroepComponent.prototype.dfPropertyCommitted = function (args) {
        var _this = this;
        var dataForm = args.object;
        var groepCustomer = JSON.parse(dataForm.editedObject);
        if (groepCustomer.groupLayoutId !== "0") {
            this.isBusy = true;
            this.customerService.putGroepCustomerAction(groepCustomer)
                .subscribe(function (res) {
                console.log("Updated customer");
                _this.isBusy = false;
            }, function (error) {
                console.dir(error);
                /*TODO: handle errors*/
                _this.isBusy = false;
            });
        }
    };
    GroepComponent.prototype.goBack = function () {
        this.routerExtensions.navigate(["/tabs/default"], {
            transition: {
                name: "fade"
            }
        });
    };
    GroepComponent = __decorate([
        core_1.Component({
            selector: "Groep",
            moduleId: module.id,
            providers: [groep_service_1.GroepService, customer_service_1.CustomerService],
            templateUrl: "./groep.component.html"
        }),
        __metadata("design:paramtypes", [groep_service_1.GroepService, customer_service_1.CustomerService,
            nativescript_angular_1.RouterExtensions, page_1.Page,
            router_1.ActivatedRoute])
    ], GroepComponent);
    return GroepComponent;
}());
exports.GroepComponent = GroepComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JvZXAuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZ3JvZXAuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTZEO0FBQzdELDBDQUFpRDtBQUNqRCw2REFBd0Q7QUFFeEQsaURBQWdEO0FBRWhELGdEQUErQztBQUkvQyx1RUFBcUU7QUFDckUsaUVBQStEO0FBUS9EO0lBT0ksd0JBQW9CLFlBQTBCLEVBQVUsZUFBZ0MsRUFDcEUsZ0JBQWtDLEVBQVUsSUFBVSxFQUN0RCxXQUEyQjtRQUYzQixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUFVLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUNwRSxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQVUsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUN0RCxnQkFBVyxHQUFYLFdBQVcsQ0FBZ0I7UUFSL0MsV0FBTSxHQUFrQixFQUFFLENBQUM7UUFFM0IsY0FBUyxHQUF5QixFQUFFLENBQUM7UUFFckMsV0FBTSxHQUFZLElBQUksQ0FBQztJQUt2QixDQUFDO0lBRUQsaUNBQVEsR0FBUjtRQUFBLGlCQVFDO1FBUEcsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxJQUFJLENBQUMsNEJBQTRCLEdBQUcsSUFBSSxDQUFDO1FBQzlDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxVQUFDLElBQUk7WUFDeEIsSUFBSSxLQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRTtnQkFDbkIsS0FBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDaEQ7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxrQ0FBUyxHQUFUO1FBQUEsaUJBc0JDO1FBckJHLElBQU0sVUFBVSxHQUFHLG1CQUFRLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDMUMsSUFBTSxJQUFJLEdB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SixDQUFDLENBQUM7SUFDUCxDQUFDO0lBaEdRLGNBQWM7UUFOMUIsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxPQUFPO1lBQ2pCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixTQUFTLEVBQUUsQ0FBQyw0QkFBWSxFQUFFLGtDQUFlLENBQUM7WUFDMUMsV0FBVyxFQUFFLHdCQUF3QjtTQUN4QyxDQUFDO3lDQVFvQyw0QkFBWSxFQUEyQixrQ0FBZTtZQUNsRCx1Q0FBZ0IsRUFBZ0IsV0FBSTtZQUN6Qyx1QkFBYztPQVR0QyxjQUFjLENBaUcxQjtJQUFELHFCQUFDO0NBQUEsQUFqR0QsSUFpR0M7QUFqR1ksd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgVmlld0NoaWxkIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhclwiO1xuaW1wb3J0IHsgUmFkRGF0YUZvcm0gfSBmcm9tIFwibmF0aXZlc2NyaXB0LXVpLWRhdGFmb3JtXCI7XG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvcGFnZVwiO1xuaW1wb3J0IHsgU3dpdGNoIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvc3dpdGNoXCI7XG5pbXBvcnQgeyBTZXR0aW5ncyB9IGZyb20gXCJ+L3NldHRpbmdzL3NldHRpbmdzXCI7XG5pbXBvcnQgeyBDaGVja2luQ3VzdG9tZXIgfSBmcm9tIFwifi9zaGFyZWQvbW9kZWxzL2NoZWNraW5DdXN0b21lci5tb2RlbFwiO1xuaW1wb3J0IHsgR3JvZXAgfSBmcm9tIFwifi9zaGFyZWQvbW9kZWxzL2dyb2VwLm1vZGVsXCI7XG5pbXBvcnQgeyBHcm9lcEN1c3RvbWVyIH0gZnJvbSBcIn4vc2hhcmVkL21vZGVscy9ncm9lcEN1c3RvbWVyLm1vZGVsXCI7XG5pbXBvcnQgeyBDdXN0b21lclNlcnZpY2UgfSBmcm9tIFwifi9zaGFyZWQvc2VydmljZXMvY3VzdG9tZXIuc2VydmljZVwiO1xuaW1wb3J0IHsgR3JvZXBTZXJ2aWNlIH0gZnJvbSBcIn4vc2hhcmVkL3NlcnZpY2VzL2dyb2VwLnNlcnZpY2VcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwiR3JvZXBcIixcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHByb3ZpZGVyczogW0dyb2VwU2VydmljZSwgQ3VzdG9tZXJTZXJ2aWNlXSxcbiAgICB0ZW1wbGF0ZVVybDogXCIuL2dyb2VwLmNvbXBvbmVudC5odG1sXCJcbn0pXG5leHBvcnQgY2xhc3MgR3JvZXBDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIGdyb2VwczogQXJyYXk8b2JqZWN0PiA9IFtdO1xuXG4gICAgY3VzdG9tZXJzOiBBcnJheTxHcm9lcEN1c3RvbWVyPiA9IFtdO1xuXG4gICAgaXNCdXN5OiBib29sZWFuID0gdHJ1ZTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZ3JvZXBTZXJ2aWNlOiBHcm9lcFNlcnZpY2UsIHByaXZhdGUgY3VzdG9tZXJTZXJ2aWNlOiBDdXN0b21lclNlcnZpY2UsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSByb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zLCBwcml2YXRlIHBhZ2U6IFBhZ2UsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBhY3RpdmVSb3V0ZTogQWN0aXZhdGVkUm91dGUpIHtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5nZXRHcm9lcHMoKTtcbiAgICAgICAgdGhpcy5wYWdlLmJhY2tncm91bmRTcGFuVW5kZXJTdGF0dXNCYXIgPSB0cnVlO1xuICAgICAgICB0aGlzLnBhZ2Uub24oXCJsb2FkZWRcIiwgKGFyZ3MpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLnBhZ2UuYW5kcm9pZCkge1xuICAgICAgICAgICAgICAgIHRoaXMucGFnZS5hbmRyb2lkLnNldEZpdHNTeXN0ZW1XaW5kb3dzKHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBnZXRHcm9lcHMoKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGxvY2F0aW9uSWQgPSBTZXR0aW5ncy5nZXRMb2NhdGlvbigpO1xuICAgICAgICBjb25zdCBkYXRlID0gU2V0dGluZ3MuZ2V0RGF0ZSgpO1xuICAgICAgICB0aGlzLmlzQnVzeSA9IHRydWU7XG5cbiAgICAgICAgdGhpcy5ncm9lcFNlcnZpY2UuZ2V0QWxsR3JvZXBzRm9yV2Vla0FuZExvY2F0aW9uQWN0aW9uKGRhdGUsIGxvY2F0aW9uSWQpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgIChyZXN1bHQ6IEFycmF5PEdyb2VwPikgPT4ge1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ3JvZXBzID0gW3trZXk6IFwiMFwiLCBsYWJlbDogXCJLaWVzIGVlbiBHcm9lcFwifV07XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ3JvZXBzID0gWy4uLnRoaXMuZ3JvZXBzLCAuLi5yZXN1bHQubWFwKCh7IGlkLCBuYW1lIH0pID0+ICh7IGtleTogaWQsIGxhYmVsOiBuYW1lIH0pKV07XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc0J1c3kgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRDdXN0b21lcnMoKTtcblxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZGlyKGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc0J1c3kgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgLypUT0RPOiBoYW5kbGUgZXJyb3JzKi9cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuICAgIH1cblxuICAgIGdldEN1c3RvbWVycygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5pc0J1c3kgPSB0cnVlO1xuICAgICAgICBjb25zdCBsb2NhdGlvbklkID0gU2V0dGluZ3MuZ2V0TG9jYXRpb24oKTtcbiAgICAgICAgY29uc3QgZGF0ZSA9IFNldHRpbmdzLmdldERhdGUoKTtcblxuICAgICAgICB0aGlzLmN1c3RvbWVyU2VydmljZS5nZXRBbGxCeVBlcmlvZElkQW5kTG9jYXRpb25JZEZvckdyb3VwTGF5b3V0QWN0aW9uKGRhdGUsIGxvY2F0aW9uSWQpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgIChyZXN1bHQ6IEFycmF5PEdyb2VwQ3VzdG9tZXI+KSA9PiB7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXN0b21lcnMgPSByZXN1bHQ7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZm91bmQgbWUgc29tZSBncm9lcCBjdXN0b21lcnNcIik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNCdXN5ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5kaXIoZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICAvKlRPRE86IGhhbmRsZSBlcnJvcnMqL1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzQnVzeSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7XG5cbiAgICB9XG5cbiAgICBkZlByb3BlcnR5Q29tbWl0dGVkKGFyZ3MpIHtcbiAgICAgICAgY29uc3QgZGF0YUZvcm0gPSA8UmFkRGF0YUZvcm0+YXJncy5vYmplY3Q7XG4gICAgICAgIGNvbnN0IGdyb2VwQ3VzdG9tZXI6IEdyb2VwQ3VzdG9tZXIgPSA8R3JvZXBDdXN0b21lcj4gSlNPTi5wYXJzZShkYXRhRm9ybS5lZGl0ZWRPYmplY3QpO1xuXG4gICAgICAgIGlmIChncm9lcEN1c3RvbWVyLmdyb3VwTGF5b3V0SWQgIT09IFwiMFwiKSB7XG4gICAgICAgICAgICB0aGlzLmlzQnVzeSA9IHRydWU7XG5cbiAgICAgICAgICAgIHRoaXMuY3VzdG9tZXJTZXJ2aWNlLnB1dEdyb2VwQ3VzdG9tZXJBY3Rpb24oZ3JvZXBDdXN0b21lcilcbiAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICAocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlVwZGF0ZWQgY3VzdG9tZXJcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmlzQnVzeSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZGlyKGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8qVE9ETzogaGFuZGxlIGVycm9ycyovXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmlzQnVzeSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdvQmFjaygpIHtcbiAgICAgICAgdGhpcy5yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFtcIi90YWJzL2RlZmF1bHRcIl0sIHtcbiAgICAgICAgICAgIHRyYW5zaXRpb246IHtcbiAgICAgICAgICAgICAgICBuYW1lOiBcImZhZGVcIlxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG59XG4iXX0=