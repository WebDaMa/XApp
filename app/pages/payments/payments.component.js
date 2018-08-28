"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var nativescript_angular_1 = require("nativescript-angular");
var page_1 = require("tns-core-modules/ui/page");
var settings_1 = require("~/settings/settings");
var customer_service_1 = require("~/shared/services/customer.service");
var groep_service_1 = require("~/shared/services/groep.service");
var PaymentsComponent = /** @class */ (function () {
    function PaymentsComponent(groepService, customerService, routerExtensions, page) {
        var _this = this;
        this.groepService = groepService;
        this.customerService = customerService;
        this.routerExtensions = routerExtensions;
        this.page = page;
        this.groeps = [];
        this.groepItems = {};
        this.hasGroeps = false;
        this.selectedIndex = 0;
        this.customers = [];
        this.isBusy = true;
        this.page.on(page_1.Page.navigatingToEvent, function () {
            _this.getCustomers();
        });
    }
    PaymentsComponent.prototype.ngOnInit = function () {
        this.getGroeps();
    };
    PaymentsComponent.prototype.selectedIndexChanged = function (args) {
        var picker = args.object;
        if (this.groeps.length > 0) {
            this.groep = this.groeps[picker.selectedIndex];
            this.getCustomers();
        }
    };
    PaymentsComponent.prototype.getGroeps = function () {
        var _this = this;
        var locationId = settings_1.Settings.getLocation();
        var date = settings_1.Settings.getDate();
        this.groepService.getAllGroepsForWeekAndLocationAction(date, locationId)
            .subscribe(function (result) {
            _this.groeps = result;
            if (_this.groeps.length > 0) {
                _this.groepItems = {
                    items: _this.groeps,
                    length: _this.groeps.length,
                    getItem: function (index) {
                        var item = _this.groeps[index];
                        return item.name;
                    }
                };
                _this.hasGroeps = true;
                console.log("found me some size groeps");
                _this.groep = _this.groeps[0];
            }
            _this.getCustomers();
        }, function (error) {
            console.dir(error);
            _this.hasGroeps = false;
            /*TODO: handle errors*/
        });
    };
    PaymentsComponent.prototype.getCustomers = function () {
        var _this = this;
        if ((typeof this.groep !== "undefined" &&
            this.groep !== null ? this.groep.id : void 0) != null) {
            this.isBusy = true;
            this.customerService.getAllByGroepForPaymentsAction(this.groep.id)
                .subscribe(function (result) {
                _this.customers = result;
                console.log("found me some costs customers");
                _this.isBusy = false;
            }, function (error) {
                console.dir(error);
                /*TODO: handle errors*/
            });
        }
    };
    PaymentsComponent.prototype.goBack = function () {
        this.routerExtensions.backToPreviousPage();
    };
    PaymentsComponent = __decorate([
        core_1.Component({
            selector: "Payments",
            moduleId: module.id,
            providers: [groep_service_1.GroepService, customer_service_1.CustomerService],
            templateUrl: "./payments.component.html"
        }),
        __metadata("design:paramtypes", [groep_service_1.GroepService, customer_service_1.CustomerService,
            nativescript_angular_1.RouterExtensions, page_1.Page])
    ], PaymentsComponent);
    return PaymentsComponent;
}());
exports.PaymentsComponent = PaymentsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF5bWVudHMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicGF5bWVudHMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBQ2xELDZEQUF3RDtBQUV4RCxpREFBZ0Q7QUFDaEQsZ0RBQStDO0FBRy9DLHVFQUFxRTtBQUNyRSxpRUFBK0Q7QUFRL0Q7SUFZSSwyQkFBb0IsWUFBMEIsRUFBVSxlQUFnQyxFQUNwRSxnQkFBa0MsRUFBVSxJQUFVO1FBRDFFLGlCQUtDO1FBTG1CLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQVUsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQ3BFLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFBVSxTQUFJLEdBQUosSUFBSSxDQUFNO1FBWjFFLFdBQU0sR0FBaUIsRUFBRSxDQUFDO1FBQzFCLGVBQVUsR0FBVyxFQUFFLENBQUM7UUFFeEIsY0FBUyxHQUFZLEtBQUssQ0FBQztRQUUzQixrQkFBYSxHQUFXLENBQUMsQ0FBQztRQUUxQixjQUFTLEdBQTJCLEVBQUUsQ0FBQztRQUV2QyxXQUFNLEdBQVksSUFBSSxDQUFDO1FBSW5CLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFdBQUksQ0FBQyxpQkFBaUIsRUFBRTtZQUNqQyxLQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDeEIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsb0NBQVEsR0FBUjtRQUNJLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBRUQsZ0RBQW9CLEdBQXBCLFVBQXFCLElBQUk7UUFDckIsSUFBTSxNQUFNLEdBQWUsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUV2QyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3pCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FB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O1lBQ2xELHVDQUFnQixFQUFnQixXQUFJO09BYmpFLGlCQUFpQixDQTZGN0I7SUFBRCx3QkFBQztDQUFBLEFBN0ZELElBNkZDO0FBN0ZZLDhDQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXJcIjtcbmltcG9ydCB7IExpc3RQaWNrZXIgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9saXN0LXBpY2tlclwiO1xuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3BhZ2VcIjtcbmltcG9ydCB7IFNldHRpbmdzIH0gZnJvbSBcIn4vc2V0dGluZ3Mvc2V0dGluZ3NcIjtcbmltcG9ydCB7IFBheW1lbnRDdXN0b21lciB9IGZyb20gXCJ+L3NoYXJlZC9tb2RlbHMvcGF5bWVudEN1c3RvbWVyLm1vZGVsXCI7XG5pbXBvcnQgeyBHcm9lcCB9IGZyb20gXCJ+L3NoYXJlZC9tb2RlbHMvZ3JvZXAubW9kZWxcIjtcbmltcG9ydCB7IEN1c3RvbWVyU2VydmljZSB9IGZyb20gXCJ+L3NoYXJlZC9zZXJ2aWNlcy9jdXN0b21lci5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBHcm9lcFNlcnZpY2UgfSBmcm9tIFwifi9zaGFyZWQvc2VydmljZXMvZ3JvZXAuc2VydmljZVwiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJQYXltZW50c1wiLFxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgcHJvdmlkZXJzOiBbR3JvZXBTZXJ2aWNlLCBDdXN0b21lclNlcnZpY2VdLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vcGF5bWVudHMuY29tcG9uZW50Lmh0bWxcIlxufSlcbmV4cG9ydCBjbGFzcyBQYXltZW50c0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgZ3JvZXBzOiBBcnJheTxHcm9lcD4gPSBbXTtcbiAgICBncm9lcEl0ZW1zOiBvYmplY3QgPSB7fTtcbiAgICBncm9lcDogR3JvZXA7XG4gICAgaGFzR3JvZXBzOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBzZWxlY3RlZEluZGV4OiBudW1iZXIgPSAwO1xuXG4gICAgY3VzdG9tZXJzOiBBcnJheTxQYXltZW50Q3VzdG9tZXI+ID0gW107XG5cbiAgICBpc0J1c3k6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBncm9lcFNlcnZpY2U6IEdyb2VwU2VydmljZSwgcHJpdmF0ZSBjdXN0b21lclNlcnZpY2U6IEN1c3RvbWVyU2VydmljZSxcbiAgICAgICAgICAgICAgICBwcml2YXRlIHJvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMsIHByaXZhdGUgcGFnZTogUGFnZSkge1xuICAgICAgICB0aGlzLnBhZ2Uub24oUGFnZS5uYXZpZ2F0aW5nVG9FdmVudCwgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5nZXRDdXN0b21lcnMoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZ2V0R3JvZXBzKCk7XG4gICAgfVxuXG4gICAgc2VsZWN0ZWRJbmRleENoYW5nZWQoYXJncykge1xuICAgICAgICBjb25zdCBwaWNrZXIgPSA8TGlzdFBpY2tlcj5hcmdzLm9iamVjdDtcblxuICAgICAgICBpZiAodGhpcy5ncm9lcHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdGhpcy5ncm9lcCA9IHRoaXMuZ3JvZXBzW3BpY2tlci5zZWxlY3RlZEluZGV4XTtcbiAgICAgICAgICAgIHRoaXMuZ2V0Q3VzdG9tZXJzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRHcm9lcHMoKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGxvY2F0aW9uSWQgPSBTZXR0aW5ncy5nZXRMb2NhdGlvbigpO1xuICAgICAgICBjb25zdCBkYXRlID0gU2V0dGluZ3MuZ2V0RGF0ZSgpO1xuXG4gICAgICAgIHRoaXMuZ3JvZXBTZXJ2aWNlLmdldEFsbEdyb2Vwc0ZvcldlZWtBbmRMb2NhdGlvbkFjdGlvbihkYXRlLCBsb2NhdGlvbklkKVxuICAgICAgICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICAocmVzdWx0OiBBcnJheTxHcm9lcD4pID0+IHtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdyb2VwcyA9IHJlc3VsdDtcblxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5ncm9lcHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ncm9lcEl0ZW1zID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1zOiB0aGlzLmdyb2VwcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZW5ndGg6IHRoaXMuZ3JvZXBzLmxlbmd0aCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBnZXRJdGVtOiAoaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaXRlbSA9IHRoaXMuZ3JvZXBzW2luZGV4XTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXRlbS5uYW1lO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGFzR3JvZXBzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZm91bmQgbWUgc29tZSBzaXplIGdyb2Vwc1wiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ3JvZXAgPSB0aGlzLmdyb2Vwc1swXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0Q3VzdG9tZXJzKCk7XG5cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmRpcihlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGFzR3JvZXBzID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIC8qVE9ETzogaGFuZGxlIGVycm9ycyovXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcbiAgICB9XG5cbiAgICBnZXRDdXN0b21lcnMoKTogdm9pZCB7XG4gICAgICAgIGlmICgodHlwZW9mIHRoaXMuZ3JvZXAgIT09IFwidW5kZWZpbmVkXCIgJiZcbiAgICAgICAgdGhpcy5ncm9lcCAhPT0gbnVsbCA/IHRoaXMuZ3JvZXAuaWQgOiB2b2lkIDApICE9IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuaXNCdXN5ID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuY3VzdG9tZXJTZXJ2aWNlLmdldEFsbEJ5R3JvZXBGb3JQYXltZW50c0FjdGlvbih0aGlzLmdyb2VwLmlkKVxuICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgIChyZXN1bHQ6IEFycmF5PFBheW1lbnRDdXN0b21lcj4pID0+IHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXN0b21lcnMgPSByZXN1bHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImZvdW5kIG1lIHNvbWUgY29zdHMgY3VzdG9tZXJzXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pc0J1c3kgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmRpcihlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgICAgICAvKlRPRE86IGhhbmRsZSBlcnJvcnMqL1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgZ29CYWNrKCkge1xuICAgICAgICB0aGlzLnJvdXRlckV4dGVuc2lvbnMuYmFja1RvUHJldmlvdXNQYWdlKCk7XG4gICAgfVxufVxuIl19