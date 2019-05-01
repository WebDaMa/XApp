"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var nativescript_angular_1 = require("nativescript-angular");
var page_1 = require("tns-core-modules/ui/page");
var settings_1 = require("~/settings/settings");
var customer_service_1 = require("~/shared/services/customer.service");
var groep_service_1 = require("~/shared/services/groep.service");
var CheckinComponent = /** @class */ (function () {
    function CheckinComponent(groepService, customerService, routerExtensions, page, activeRoute) {
        var _this = this;
        this.groepService = groepService;
        this.customerService = customerService;
        this.routerExtensions = routerExtensions;
        this.page = page;
        this.activeRoute = activeRoute;
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
    CheckinComponent.prototype.ngOnInit = function () {
        this.getGroeps();
    };
    CheckinComponent.prototype.selectedIndexChanged = function (args) {
        var picker = args.object;
        if (this.groeps.length > 0) {
            this.groep = this.groeps[picker.selectedIndex];
            this.getCustomers();
        }
    };
    CheckinComponent.prototype.getGroeps = function () {
        var _this = this;
        var locationId = settings_1.Settings.getLocation();
        var date = settings_1.Settings.getDate();
        this.isBusy = true;
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
                console.log("found me some checkin groeps");
                _this.groep = _this.groeps[0];
            }
            _this.getCustomers();
            _this.isBusy = false;
        }, function (error) {
            console.dir(error);
            _this.isBusy = false;
            /*TODO: handle errors*/
        });
    };
    CheckinComponent.prototype.getCustomers = function () {
        var _this = this;
        if ((typeof this.groep !== "undefined" &&
            this.groep !== null ? this.groep.id : void 0) != null) {
            this.isBusy = true;
            this.customerService.getAllByGroepForCheckinAction(this.groep.id)
                .subscribe(function (result) {
                for (var _i = 0, result_1 = result; _i < result_1.length; _i++) {
                    var customer = result_1[_i];
                    customer.isComplete = _this.isInfoComplete(customer);
                }
                _this.customers = result;
                console.log("found me some checkin customers");
                _this.isBusy = false;
            }, function (error) {
                console.dir(error);
                _this.hasGroeps = false;
                _this.isBusy = false;
                /*TODO: handle errors*/
            });
        }
    };
    CheckinComponent.prototype.isInfoComplete = function (customer) {
        return (customer.email !== "" && customer.email !== null && customer.birthdate !== "" &&
            customer.birthdate !== null
            && customer.expireDate !== "" && customer.expireDate !== null &&
            customer.nationalRegisterNumber !== "" && customer.nationalRegisterNumber !== null);
    };
    CheckinComponent.prototype.checkinCustomer = function (args, customer) {
        var _this = this;
        var checkinSwitch = args.object;
        customer.checkedin = checkinSwitch.checked;
        this.isBusy = true;
        this.customerService.putCheckinCustomerAction(customer).subscribe(function (res) {
            console.log("Updated customer");
            _this.isBusy = false;
        }, function (error) {
            console.dir(error);
            _this.isBusy = false;
            /*TODO: handle errors*/
        });
    };
    CheckinComponent.prototype.goBack = function () {
        this.routerExtensions.navigate(["/tabs/default"], {
            transition: {
                name: "fade"
            }
        });
    };
    CheckinComponent = __decorate([
        core_1.Component({
            selector: "Checkin",
            moduleId: module.id,
            providers: [groep_service_1.GroepService, customer_service_1.CustomerService],
            templateUrl: "./checkin.component.html"
        }),
        __metadata("design:paramtypes", [groep_service_1.GroepService, customer_service_1.CustomerService,
            nativescript_angular_1.RouterExtensions, page_1.Page,
            router_1.ActivatedRoute])
    ], CheckinComponent);
    return CheckinComponent;
}());
exports.CheckinComponent = CheckinComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tpbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjaGVja2luLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUE2RDtBQUM3RCwwQ0FBaUQ7QUFDakQsNkRBQXdEO0FBRXhELGlEQUFnRDtBQUVoRCxnREFBK0M7QUFHL0MsdUVBQXFFO0FBQ3JFLGlFQUErRDtBQVEvRDtJQVlJLDBCQUFvQixZQUEwQixFQUFVLGVBQWdDLEVBQ3BFLGdCQUFrQyxFQUFVLElBQVUsRUFDdEQsV0FBMkI7UUFGL0MsaUJBTUM7UUFObUIsaUJBQVksR0FBWixZQUFZLENBQWM7UUFBVSxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDcEUscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUFVLFNBQUksR0FBSixJQUFJLENBQU07UUFDdEQsZ0JBQVcsR0FBWCxXQUFXLENBQWdCO1FBYi9DLFdBQU0sR0FBaUIsRUFBRSxDQUFDO1FBQzFCLGVBQVUsR0FBVyxFQUFFLENBQUM7UUFFeEIsY0FBUyxHQUFZLEtBQUssQ0FBQztRQUUzQixrQkFBYSxHQUFXLENBQUMsQ0FBQztRQUUxQixjQUFTLEdBQTJCLEVBQUUsQ0FBQztRQUV2QyxXQUFNLEdBQVksSUFBSSxDQUFDO1FBS25CLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFdBQUksQ0FBQyxpQkFBaUIsRUFBRTtZQUNqQyxLQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDeEIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsbUNBQVEsR0FBUjtRQUNJLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBRUQsK0NBQW9CLEdBQXBCLFVBQXFCLElBQUk7UUFDckIsSUFBTSxNQUFNLEdBQWUsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUV2QyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUN4QixJQUFJLENB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O1NBQ0osQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQXJJUSxnQkFBZ0I7UUFONUIsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxTQUFTO1lBQ25CLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixTQUFTLEVBQUUsQ0FBQyw0QkFBWSxFQUFFLGtDQUFlLENBQUM7WUFDMUMsV0FBVyxFQUFFLDBCQUEwQjtTQUMxQyxDQUFDO3lDQWFvQyw0QkFBWSxFQUEyQixrQ0FBZTtZQUNsRCx1Q0FBZ0IsRUFBZ0IsV0FBSTtZQUN6Qyx1QkFBYztPQWR0QyxnQkFBZ0IsQ0FzSTVCO0lBQUQsdUJBQUM7Q0FBQSxBQXRJRCxJQXNJQztBQXRJWSw0Q0FBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgVmlld0NoaWxkIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhclwiO1xuaW1wb3J0IHsgTGlzdFBpY2tlciB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2xpc3QtcGlja2VyXCI7XG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvcGFnZVwiO1xuaW1wb3J0IHsgU3dpdGNoIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvc3dpdGNoXCI7XG5pbXBvcnQgeyBTZXR0aW5ncyB9IGZyb20gXCJ+L3NldHRpbmdzL3NldHRpbmdzXCI7XG5pbXBvcnQgeyBDaGVja2luQ3VzdG9tZXIgfSBmcm9tIFwifi9zaGFyZWQvbW9kZWxzL2NoZWNraW5DdXN0b21lci5tb2RlbFwiO1xuaW1wb3J0IHsgR3JvZXAgfSBmcm9tIFwifi9zaGFyZWQvbW9kZWxzL2dyb2VwLm1vZGVsXCI7XG5pbXBvcnQgeyBDdXN0b21lclNlcnZpY2UgfSBmcm9tIFwifi9zaGFyZWQvc2VydmljZXMvY3VzdG9tZXIuc2VydmljZVwiO1xuaW1wb3J0IHsgR3JvZXBTZXJ2aWNlIH0gZnJvbSBcIn4vc2hhcmVkL3NlcnZpY2VzL2dyb2VwLnNlcnZpY2VcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwiQ2hlY2tpblwiLFxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgcHJvdmlkZXJzOiBbR3JvZXBTZXJ2aWNlLCBDdXN0b21lclNlcnZpY2VdLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vY2hlY2tpbi5jb21wb25lbnQuaHRtbFwiXG59KVxuZXhwb3J0IGNsYXNzIENoZWNraW5Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIGdyb2VwczogQXJyYXk8R3JvZXA+ID0gW107XG4gICAgZ3JvZXBJdGVtczogb2JqZWN0ID0ge307XG4gICAgZ3JvZXA6IEdyb2VwO1xuICAgIGhhc0dyb2VwczogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgc2VsZWN0ZWRJbmRleDogbnVtYmVyID0gMDtcblxuICAgIGN1c3RvbWVyczogQXJyYXk8Q2hlY2tpbkN1c3RvbWVyPiA9IFtdO1xuXG4gICAgaXNCdXN5OiBib29sZWFuID0gdHJ1ZTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZ3JvZXBTZXJ2aWNlOiBHcm9lcFNlcnZpY2UsIHByaXZhdGUgY3VzdG9tZXJTZXJ2aWNlOiBDdXN0b21lclNlcnZpY2UsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSByb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zLCBwcml2YXRlIHBhZ2U6IFBhZ2UsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBhY3RpdmVSb3V0ZTogQWN0aXZhdGVkUm91dGUpIHtcbiAgICAgICAgdGhpcy5wYWdlLm9uKFBhZ2UubmF2aWdhdGluZ1RvRXZlbnQsICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZ2V0Q3VzdG9tZXJzKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmdldEdyb2VwcygpO1xuICAgIH1cblxuICAgIHNlbGVjdGVkSW5kZXhDaGFuZ2VkKGFyZ3MpIHtcbiAgICAgICAgY29uc3QgcGlja2VyID0gPExpc3RQaWNrZXI+YXJncy5vYmplY3Q7XG5cbiAgICAgICAgaWYgKHRoaXMuZ3JvZXBzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHRoaXMuZ3JvZXAgPSB0aGlzLmdyb2Vwc1twaWNrZXIuc2VsZWN0ZWRJbmRleF07XG4gICAgICAgICAgICB0aGlzLmdldEN1c3RvbWVycygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0R3JvZXBzKCk6IHZvaWQge1xuICAgICAgICBjb25zdCBsb2NhdGlvbklkID0gU2V0dGluZ3MuZ2V0TG9jYXRpb24oKTtcbiAgICAgICAgY29uc3QgZGF0ZSA9IFNldHRpbmdzLmdldERhdGUoKTtcblxuICAgICAgICB0aGlzLmlzQnVzeSA9IHRydWU7XG5cbiAgICAgICAgdGhpcy5ncm9lcFNlcnZpY2UuZ2V0QWxsR3JvZXBzRm9yV2Vla0FuZExvY2F0aW9uQWN0aW9uKGRhdGUsIGxvY2F0aW9uSWQpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgIChyZXN1bHQ6IEFycmF5PEdyb2VwPikgPT4ge1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ3JvZXBzID0gcmVzdWx0O1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmdyb2Vwcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdyb2VwSXRlbXMgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbXM6IHRoaXMuZ3JvZXBzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlbmd0aDogdGhpcy5ncm9lcHMubGVuZ3RoLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdldEl0ZW06IChpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBpdGVtID0gdGhpcy5ncm9lcHNbaW5kZXhdO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpdGVtLm5hbWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oYXNHcm9lcHMgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJmb3VuZCBtZSBzb21lIGNoZWNraW4gZ3JvZXBzXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ncm9lcCA9IHRoaXMuZ3JvZXBzWzBdO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRDdXN0b21lcnMoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc0J1c3kgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZGlyKGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc0J1c3kgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgLypUT0RPOiBoYW5kbGUgZXJyb3JzKi9cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuICAgIH1cblxuICAgIGdldEN1c3RvbWVycygpOiB2b2lkIHtcbiAgICAgICAgaWYgKCh0eXBlb2YgdGhpcy5ncm9lcCAhPT0gXCJ1bmRlZmluZWRcIiAmJlxuICAgICAgICB0aGlzLmdyb2VwICE9PSBudWxsID8gdGhpcy5ncm9lcC5pZCA6IHZvaWQgMCkgIT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5pc0J1c3kgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5jdXN0b21lclNlcnZpY2UuZ2V0QWxsQnlHcm9lcEZvckNoZWNraW5BY3Rpb24odGhpcy5ncm9lcC5pZClcbiAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICAocmVzdWx0OiBBcnJheTxDaGVja2luQ3VzdG9tZXI+KSA9PiB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgY3VzdG9tZXIgb2YgcmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VzdG9tZXIuaXNDb21wbGV0ZSA9IHRoaXMuaXNJbmZvQ29tcGxldGUoY3VzdG9tZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmN1c3RvbWVycyA9IHJlc3VsdDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZm91bmQgbWUgc29tZSBjaGVja2luIGN1c3RvbWVyc1wiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaXNCdXN5ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5kaXIoZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oYXNHcm9lcHMgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaXNCdXN5ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAvKlRPRE86IGhhbmRsZSBlcnJvcnMqL1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgaXNJbmZvQ29tcGxldGUoY3VzdG9tZXI6IENoZWNraW5DdXN0b21lcik6IGJvb2xlYW4ge1xuXG4gICAgICAgIHJldHVybiAoY3VzdG9tZXIuZW1haWwgIT09IFwiXCIgJiYgY3VzdG9tZXIuZW1haWwgIT09IG51bGwgJiYgY3VzdG9tZXIuYmlydGhkYXRlICE9PSBcIlwiICYmXG4gICAgICAgICAgICBjdXN0b21lci5iaXJ0aGRhdGUgIT09IG51bGxcbiAgICAgICAgICAgICYmIGN1c3RvbWVyLmV4cGlyZURhdGUgIT09IFwiXCIgJiYgY3VzdG9tZXIuZXhwaXJlRGF0ZSAhPT0gbnVsbCAmJlxuICAgICAgICAgICAgY3VzdG9tZXIubmF0aW9uYWxSZWdpc3Rlck51bWJlciAhPT0gXCJcIiAmJiBjdXN0b21lci5uYXRpb25hbFJlZ2lzdGVyTnVtYmVyICE9PSBudWxsKTtcbiAgICB9XG5cbiAgICBjaGVja2luQ3VzdG9tZXIoYXJncywgY3VzdG9tZXI6IENoZWNraW5DdXN0b21lcikge1xuICAgICAgICBjb25zdCBjaGVja2luU3dpdGNoID0gPFN3aXRjaD5hcmdzLm9iamVjdDtcbiAgICAgICAgY3VzdG9tZXIuY2hlY2tlZGluID0gY2hlY2tpblN3aXRjaC5jaGVja2VkO1xuXG4gICAgICAgIHRoaXMuaXNCdXN5ID0gdHJ1ZTtcblxuICAgICAgICB0aGlzLmN1c3RvbWVyU2VydmljZS5wdXRDaGVja2luQ3VzdG9tZXJBY3Rpb24oY3VzdG9tZXIpLnN1YnNjcmliZShcbiAgICAgICAgICAgIChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlVwZGF0ZWQgY3VzdG9tZXJcIik7XG4gICAgICAgICAgICAgICAgdGhpcy5pc0J1c3kgPSBmYWxzZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmRpcihlcnJvcik7XG4gICAgICAgICAgICAgICAgdGhpcy5pc0J1c3kgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAvKlRPRE86IGhhbmRsZSBlcnJvcnMqL1xuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgIH1cblxuICAgIGdvQmFjaygpIHtcbiAgICAgICAgdGhpcy5yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFtcIi90YWJzL2RlZmF1bHRcIl0sIHtcbiAgICAgICAgICAgIHRyYW5zaXRpb246IHtcbiAgICAgICAgICAgICAgICBuYW1lOiBcImZhZGVcIlxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG59XG4iXX0=