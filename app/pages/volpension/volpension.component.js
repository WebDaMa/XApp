"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var nativescript_angular_1 = require("nativescript-angular");
var page_1 = require("tns-core-modules/ui/page");
var settings_1 = require("~/settings/settings");
var customer_service_1 = require("~/shared/services/customer.service");
var VolpensionComponent = /** @class */ (function () {
    function VolpensionComponent(customerService, routerExtensions, page, activeRoute) {
        this.customerService = customerService;
        this.routerExtensions = routerExtensions;
        this.page = page;
        this.activeRoute = activeRoute;
        this.volpension = {
            total: "0",
            allInTypes: [],
            date: ""
        };
        this.isBusy = true;
    }
    VolpensionComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.getCustomersVolpension();
        this.page.backgroundColor = "#000000";
        this.page.backgroundSpanUnderStatusBar = true;
        this.page.on("loaded", function (args) {
            if (_this.page.android) {
                _this.page.android.setFitsSystemWindows(true);
            }
        });
    };
    VolpensionComponent.prototype.getCustomersVolpension = function () {
        var _this = this;
        var date = settings_1.Settings.getDate();
        var locationId = settings_1.Settings.getLocation();
        this.customerService.getAllByAllInTypeForLocationAndPeriodAction(locationId, date)
            .subscribe(function (result) {
            _this.volpension = result;
            console.log("got me some volpension customers");
            _this.isBusy = false;
        }, function (error) {
            console.dir(error);
            /*TODO: handle errors*/
            _this.isBusy = false;
        });
    };
    VolpensionComponent.prototype.goBack = function () {
        this.routerExtensions.navigate(["/tabs/default"], {
            transition: {
                name: "fade"
            }
        });
    };
    VolpensionComponent = __decorate([
        core_1.Component({
            selector: "Volpension",
            moduleId: module.id,
            providers: [customer_service_1.CustomerService],
            templateUrl: "./volpension.component.html"
        }),
        __metadata("design:paramtypes", [customer_service_1.CustomerService, nativescript_angular_1.RouterExtensions,
            page_1.Page, router_1.ActivatedRoute])
    ], VolpensionComponent);
    return VolpensionComponent;
}());
exports.VolpensionComponent = VolpensionComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidm9scGVuc2lvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ2b2xwZW5zaW9uLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUE2RDtBQUM3RCwwQ0FBaUQ7QUFDakQsNkRBQXdEO0FBQ3hELGlEQUFnRDtBQUNoRCxnREFBK0M7QUFFL0MsdUVBQXFFO0FBUXJFO0lBU0ksNkJBQW9CLGVBQWdDLEVBQVUsZ0JBQWtDLEVBQzVFLElBQVUsRUFBVSxXQUEyQjtRQUQvQyxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFBVSxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQzVFLFNBQUksR0FBSixJQUFJLENBQU07UUFBVSxnQkFBVyxHQUFYLFdBQVcsQ0FBZ0I7UUFUbkUsZUFBVSxHQUFlO1lBQ3JCLEtBQUssRUFBRSxHQUFHO1lBQ1YsVUFBVSxFQUFFLEVBQUU7WUFDZCxJQUFJLEVBQUUsRUFBRTtTQUNYLENBQUM7UUFFRixXQUFNLEdBQVksSUFBSSxDQUFDO0lBSXZCLENBQUM7SUFFRCxzQ0FBUSxHQUFSO1FBQUEsaUJBVUM7UUFURyxJQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztRQUU5QixJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsR0FBRyxTQUFTLENBQUM7UUFDdEMsSUFBSSxDQUFDLElBQUksQ0FBQyw0QkFBNEIsR0FBRyxJQUFJLENBQUM7UUFDOUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLFVBQUMsSUFBSTtZQUN4QixJQUFJLEtBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFO2dCQUNuQixLQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUNoRDtRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELG9EQUFzQixHQUF0QjtRQUFBLGlCQWtCQztRQWpCRyxJQUFNLElBQUksR0FBRyxtQkFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ2hDLElBQU0sVUFBVSxHQUFHLG1CQUFRLENBQUMsV0FBVyxFQUFFLENBQUM7UUFFMUMsSUFBSSxDQUFDLGVBQWUsQ0FBQywyQ0FBMkMsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDO2FBQzdFLFNBQVMsQ0FDTixVQUFDLE1BQWtCO1lBQ2YsS0FBSSxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUM7WUFDekIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDO1lBQ2hELEtBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3hCLENBQUMsRUFDRCxVQUFDLEtBQUs7WUFDRixPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ25CLHVCQUF1QjtZQUN2QixLQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUV4QixDQUFDLENBQ0osQ0FBQztJQUNWLENBQUM7SUFFRCxvQ0FBTSxHQUFOO1FBQ0ksSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxFQUFFO1lBQzlDLFVBQVUsRUFBRTtnQkFDUixJQUFJLEVBQUUsTUFBTTthQUNmO1NBQ0osQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQW5EUSxtQkFBbUI7UUFOL0IsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxZQUFZO1lBQ3RCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixTQUFTLEVBQUUsQ0FBQyxrQ0FBZSxDQUFDO1lBQzVCLFdBQVcsRUFBRSw2QkFBNkI7U0FDN0MsQ0FBQzt5Q0FVdUMsa0NBQWUsRUFBNEIsdUNBQWdCO1lBQ3RFLFdBQUksRUFBdUIsdUJBQWM7T0FWMUQsbUJBQW1CLENBb0QvQjtJQUFELDBCQUFDO0NBQUEsQUFwREQsSUFvREM7QUFwRFksa0RBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIFZpZXdDaGlsZCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXJcIjtcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9wYWdlXCI7XG5pbXBvcnQgeyBTZXR0aW5ncyB9IGZyb20gXCJ+L3NldHRpbmdzL3NldHRpbmdzXCI7XG5pbXBvcnQgeyBWb2xwZW5zaW9uIH0gZnJvbSBcIn4vc2hhcmVkL21vZGVscy92b2xwZW5zaW9uLm1vZGVsXCI7XG5pbXBvcnQgeyBDdXN0b21lclNlcnZpY2UgfSBmcm9tIFwifi9zaGFyZWQvc2VydmljZXMvY3VzdG9tZXIuc2VydmljZVwiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJWb2xwZW5zaW9uXCIsXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICBwcm92aWRlcnM6IFtDdXN0b21lclNlcnZpY2VdLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vdm9scGVuc2lvbi5jb21wb25lbnQuaHRtbFwiXG59KVxuZXhwb3J0IGNsYXNzIFZvbHBlbnNpb25Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIHZvbHBlbnNpb246IFZvbHBlbnNpb24gPSB7XG4gICAgICAgIHRvdGFsOiBcIjBcIixcbiAgICAgICAgYWxsSW5UeXBlczogW10sXG4gICAgICAgIGRhdGU6IFwiXCJcbiAgICB9O1xuXG4gICAgaXNCdXN5OiBib29sZWFuID0gdHJ1ZTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgY3VzdG9tZXJTZXJ2aWNlOiBDdXN0b21lclNlcnZpY2UsIHByaXZhdGUgcm91dGVyRXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9ucyxcbiAgICAgICAgICAgICAgICBwcml2YXRlIHBhZ2U6IFBhZ2UsIHByaXZhdGUgYWN0aXZlUm91dGU6IEFjdGl2YXRlZFJvdXRlKSB7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZ2V0Q3VzdG9tZXJzVm9scGVuc2lvbigpO1xuXG4gICAgICAgIHRoaXMucGFnZS5iYWNrZ3JvdW5kQ29sb3IgPSBcIiMwMDAwMDBcIjtcbiAgICAgICAgdGhpcy5wYWdlLmJhY2tncm91bmRTcGFuVW5kZXJTdGF0dXNCYXIgPSB0cnVlO1xuICAgICAgICB0aGlzLnBhZ2Uub24oXCJsb2FkZWRcIiwgKGFyZ3MpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLnBhZ2UuYW5kcm9pZCkge1xuICAgICAgICAgICAgICAgIHRoaXMucGFnZS5hbmRyb2lkLnNldEZpdHNTeXN0ZW1XaW5kb3dzKHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBnZXRDdXN0b21lcnNWb2xwZW5zaW9uKCk6IHZvaWQge1xuICAgICAgICBjb25zdCBkYXRlID0gU2V0dGluZ3MuZ2V0RGF0ZSgpO1xuICAgICAgICBjb25zdCBsb2NhdGlvbklkID0gU2V0dGluZ3MuZ2V0TG9jYXRpb24oKTtcblxuICAgICAgICB0aGlzLmN1c3RvbWVyU2VydmljZS5nZXRBbGxCeUFsbEluVHlwZUZvckxvY2F0aW9uQW5kUGVyaW9kQWN0aW9uKGxvY2F0aW9uSWQsIGRhdGUpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgIChyZXN1bHQ6IFZvbHBlbnNpb24pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52b2xwZW5zaW9uID0gcmVzdWx0O1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImdvdCBtZSBzb21lIHZvbHBlbnNpb24gY3VzdG9tZXJzXCIpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzQnVzeSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZGlyKGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgLypUT0RPOiBoYW5kbGUgZXJyb3JzKi9cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc0J1c3kgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7XG4gICAgfVxuXG4gICAgZ29CYWNrKCkge1xuICAgICAgICB0aGlzLnJvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL3RhYnMvZGVmYXVsdFwiXSwge1xuICAgICAgICAgICAgdHJhbnNpdGlvbjoge1xuICAgICAgICAgICAgICAgIG5hbWU6IFwiZmFkZVwiXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiJdfQ==