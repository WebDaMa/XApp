"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var nativescript_angular_1 = require("nativescript-angular");
var page_1 = require("tns-core-modules/ui/page");
var settings_1 = require("~/settings/settings");
var customer_service_1 = require("~/shared/services/customer.service");
var groep_service_1 = require("~/shared/services/groep.service");
var CheckinComponent = /** @class */ (function () {
    function CheckinComponent(groepService, customerService, routerExtensions, page) {
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
        }, function (error) {
            console.dir(error);
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
                _this.customers = result;
                console.log("found me some checkin customers");
                _this.isBusy = false;
            }, function (error) {
                console.dir(error);
                _this.hasGroeps = false;
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
        var checkin = checkinSwitch.checked;
        customer.checkedin = checkin;
        this.customerService.putCheckinCustomerAction(customer).subscribe(function (res) {
            console.log("Updated customer");
            _this.isBusy = false;
        }, function (error) {
            console.dir(error);
            /*TODO: handle errors*/
        });
    };
    CheckinComponent.prototype.goBack = function () {
        this.routerExtensions.backToPreviousPage();
    };
    CheckinComponent = __decorate([
        core_1.Component({
            selector: "Checkin",
            moduleId: module.id,
            providers: [groep_service_1.GroepService, customer_service_1.CustomerService],
            templateUrl: "./checkin.component.html"
        }),
        __metadata("design:paramtypes", [groep_service_1.GroepService, customer_service_1.CustomerService,
            nativescript_angular_1.RouterExtensions, page_1.Page])
    ], CheckinComponent);
    return CheckinComponent;
}());
exports.CheckinComponent = CheckinComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tpbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjaGVja2luLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUE2RDtBQUM3RCw2REFBd0Q7QUFFeEQsaURBQWdEO0FBRWhELGdEQUErQztBQUkvQyx1RUFBcUU7QUFDckUsaUVBQStEO0FBUS9EO0lBWUksMEJBQW9CLFlBQTBCLEVBQVUsZUFBZ0MsRUFDcEUsZ0JBQWtDLEVBQVUsSUFBVTtRQUQxRSxpQkFLQztRQUxtQixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUFVLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUNwRSxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQVUsU0FBSSxHQUFKLElBQUksQ0FBTTtRQVoxRSxXQUFNLEdBQWlCLEVBQUUsQ0FBQztRQUMxQixlQUFVLEdBQVcsRUFBRSxDQUFDO1FBRXhCLGNBQVMsR0FBWSxLQUFLLENBQUM7UUFFM0Isa0JBQWEsR0FBVyxDQUFDLENBQUM7UUFFMUIsY0FBUyxHQUEyQixFQUFFLENBQUM7UUFFdkMsV0FBTSxHQUFZLElBQUksQ0FBQztRQUluQixJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxXQUFJLENBQUMsaUJBQWlCLEVBQUU7WUFDakMsS0FBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3hCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELG1DQUFRLEdBQVI7UUFDSSxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUVELCtDQUFvQixHQUFwQixVQUFxQixJQUFJO1FBQ3JCLElBQU0sTUFBTSxHQUFlLElBQUksQ0FBQyxNQUFNLENBQUM7UUFFdkMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN6QixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMs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QUFFLElBQUksUUFBUSxDQUFDLHNCQUFzQixLQUFLLElBQUksQ0FBQyxDQUFDO0lBQzVGLENBQUM7SUFFRCwwQ0FBZSxHQUFmLFVBQWdCLElBQUksRUFBRSxRQUF5QjtRQUEvQyxpQkFnQkM7UUFmRyxJQUFNLGFBQWEsR0FBVyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQzFDLElBQU0sT0FBTyxHQUFHLGFBQWEsQ0FBQyxPQUFPLENBQUM7UUFFdEMsUUFBUSxDQUFDLFNBQVMsR0FBRyxPQUFPLENBQUM7UUFFN0IsSUFBSSxDQUFDLGVBQWUsQ0FBQyx3QkFBd0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxTQUFTLENBQzdELFVBQUMsR0FBRztZQUNBLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUMsQ0FBQztZQUNoQyxLQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUN4QixDQUFDLEVBQ0QsVUFBQyxLQUFLO1lBQ0YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNuQix1QkFBdUI7UUFDM0IsQ0FBQyxDQUNKLENBQUM7SUFDTixDQUFDO0lBRUQsaUNBQU0sR0FBTjtRQUNJLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO0lBQy9DLENBQUM7SUF0SFEsZ0JBQWdCO1FBTjVCLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsU0FBUztZQUNuQixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsU0FBUyxFQUFFLENBQUMsNEJBQVksRUFBRSxrQ0FBZSxDQUFDO1lBQzFDLFdBQVcsRUFBRSwwQkFBMEI7U0FDMUMsQ0FBQzt5Q0Fhb0MsNEJBQVksRUFBMkIsa0NBQWU7WUFDbEQsdUNBQWdCLEVBQWdCLFdBQUk7T0FiakUsZ0JBQWdCLENBdUg1QjtJQUFELHVCQUFDO0NBQUEsQUF2SEQsSUF1SEM7QUF2SFksNENBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIFZpZXdDaGlsZCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyXCI7XG5pbXBvcnQgeyBMaXN0UGlja2VyIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvbGlzdC1waWNrZXJcIjtcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9wYWdlXCI7XG5pbXBvcnQgeyBTd2l0Y2ggfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9zd2l0Y2hcIjtcbmltcG9ydCB7IFNldHRpbmdzIH0gZnJvbSBcIn4vc2V0dGluZ3Mvc2V0dGluZ3NcIjtcbmltcG9ydCB7IEJpbGxDdXN0b21lciB9IGZyb20gXCJ+L3NoYXJlZC9tb2RlbHMvYmlsbEN1c3RvbWVyLm1vZGVsXCI7XG5pbXBvcnQgeyBDaGVja2luQ3VzdG9tZXIgfSBmcm9tIFwifi9zaGFyZWQvbW9kZWxzL2NoZWNraW5DdXN0b21lci5tb2RlbFwiO1xuaW1wb3J0IHsgR3JvZXAgfSBmcm9tIFwifi9zaGFyZWQvbW9kZWxzL2dyb2VwLm1vZGVsXCI7XG5pbXBvcnQgeyBDdXN0b21lclNlcnZpY2UgfSBmcm9tIFwifi9zaGFyZWQvc2VydmljZXMvY3VzdG9tZXIuc2VydmljZVwiO1xuaW1wb3J0IHsgR3JvZXBTZXJ2aWNlIH0gZnJvbSBcIn4vc2hhcmVkL3NlcnZpY2VzL2dyb2VwLnNlcnZpY2VcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwiQ2hlY2tpblwiLFxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgcHJvdmlkZXJzOiBbR3JvZXBTZXJ2aWNlLCBDdXN0b21lclNlcnZpY2VdLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vY2hlY2tpbi5jb21wb25lbnQuaHRtbFwiXG59KVxuZXhwb3J0IGNsYXNzIENoZWNraW5Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIGdyb2VwczogQXJyYXk8R3JvZXA+ID0gW107XG4gICAgZ3JvZXBJdGVtczogb2JqZWN0ID0ge307XG4gICAgZ3JvZXA6IEdyb2VwO1xuICAgIGhhc0dyb2VwczogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgc2VsZWN0ZWRJbmRleDogbnVtYmVyID0gMDtcblxuICAgIGN1c3RvbWVyczogQXJyYXk8Q2hlY2tpbkN1c3RvbWVyPiA9IFtdO1xuXG4gICAgaXNCdXN5OiBib29sZWFuID0gdHJ1ZTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZ3JvZXBTZXJ2aWNlOiBHcm9lcFNlcnZpY2UsIHByaXZhdGUgY3VzdG9tZXJTZXJ2aWNlOiBDdXN0b21lclNlcnZpY2UsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSByb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zLCBwcml2YXRlIHBhZ2U6IFBhZ2UpIHtcbiAgICAgICAgdGhpcy5wYWdlLm9uKFBhZ2UubmF2aWdhdGluZ1RvRXZlbnQsICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZ2V0Q3VzdG9tZXJzKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmdldEdyb2VwcygpO1xuICAgIH1cblxuICAgIHNlbGVjdGVkSW5kZXhDaGFuZ2VkKGFyZ3MpIHtcbiAgICAgICAgY29uc3QgcGlja2VyID0gPExpc3RQaWNrZXI+YXJncy5vYmplY3Q7XG5cbiAgICAgICAgaWYgKHRoaXMuZ3JvZXBzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHRoaXMuZ3JvZXAgPSB0aGlzLmdyb2Vwc1twaWNrZXIuc2VsZWN0ZWRJbmRleF07XG4gICAgICAgICAgICB0aGlzLmdldEN1c3RvbWVycygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0R3JvZXBzKCk6IHZvaWQge1xuICAgICAgICBjb25zdCBsb2NhdGlvbklkID0gU2V0dGluZ3MuZ2V0TG9jYXRpb24oKTtcbiAgICAgICAgY29uc3QgZGF0ZSA9IFNldHRpbmdzLmdldERhdGUoKTtcblxuICAgICAgICB0aGlzLmdyb2VwU2VydmljZS5nZXRBbGxHcm9lcHNGb3JXZWVrQW5kTG9jYXRpb25BY3Rpb24oZGF0ZSwgbG9jYXRpb25JZClcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgKHJlc3VsdDogQXJyYXk8R3JvZXA+KSA9PiB7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ncm9lcHMgPSByZXN1bHQ7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZ3JvZXBzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ3JvZXBJdGVtcyA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtczogdGhpcy5ncm9lcHMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVuZ3RoOiB0aGlzLmdyb2Vwcy5sZW5ndGgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2V0SXRlbTogKGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSB0aGlzLmdyb2Vwc1tpbmRleF07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW0ubmFtZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhhc0dyb2VwcyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImZvdW5kIG1lIHNvbWUgY2hlY2tpbiBncm9lcHNcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdyb2VwID0gdGhpcy5ncm9lcHNbMF07XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdldEN1c3RvbWVycygpO1xuXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5kaXIoZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICAvKlRPRE86IGhhbmRsZSBlcnJvcnMqL1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7XG4gICAgfVxuXG4gICAgZ2V0Q3VzdG9tZXJzKCk6IHZvaWQge1xuICAgICAgICBpZiAoKHR5cGVvZiB0aGlzLmdyb2VwICE9PSBcInVuZGVmaW5lZFwiICYmXG4gICAgICAgIHRoaXMuZ3JvZXAgIT09IG51bGwgPyB0aGlzLmdyb2VwLmlkIDogdm9pZCAwKSAhPSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLmlzQnVzeSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmN1c3RvbWVyU2VydmljZS5nZXRBbGxCeUdyb2VwRm9yQ2hlY2tpbkFjdGlvbih0aGlzLmdyb2VwLmlkKVxuICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgIChyZXN1bHQ6IEFycmF5PENoZWNraW5DdXN0b21lcj4pID0+IHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXN0b21lcnMgPSByZXN1bHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImZvdW5kIG1lIHNvbWUgY2hlY2tpbiBjdXN0b21lcnNcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmlzQnVzeSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZGlyKGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGFzR3JvZXBzID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAvKlRPRE86IGhhbmRsZSBlcnJvcnMqL1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgaXNJbmZvQ29tcGxldGUoY3VzdG9tZXI6IENoZWNraW5DdXN0b21lcik6IGJvb2xlYW4ge1xuXG4gICAgICAgIHJldHVybiAoY3VzdG9tZXIuZW1haWwgIT09IFwiXCIgJiYgY3VzdG9tZXIuZW1haWwgIT09IG51bGwgJiYgY3VzdG9tZXIuYmlydGhkYXRlICE9PSBcIlwiICYmXG4gICAgICAgICAgICBjdXN0b21lci5iaXJ0aGRhdGUgIT09IG51bGxcbiAgICAgICAgICAgICYmIGN1c3RvbWVyLmV4cGlyZURhdGUgIT09IFwiXCIgJiYgY3VzdG9tZXIuZXhwaXJlRGF0ZSAhPT0gbnVsbCAmJlxuICAgICAgICAgICAgY3VzdG9tZXIubmF0aW9uYWxSZWdpc3Rlck51bWJlciAhPT0gXCJcIiAmJiBjdXN0b21lci5uYXRpb25hbFJlZ2lzdGVyTnVtYmVyICE9PSBudWxsKTtcbiAgICB9XG5cbiAgICBjaGVja2luQ3VzdG9tZXIoYXJncywgY3VzdG9tZXI6IENoZWNraW5DdXN0b21lcikge1xuICAgICAgICBjb25zdCBjaGVja2luU3dpdGNoID0gPFN3aXRjaD5hcmdzLm9iamVjdDtcbiAgICAgICAgY29uc3QgY2hlY2tpbiA9IGNoZWNraW5Td2l0Y2guY2hlY2tlZDtcblxuICAgICAgICBjdXN0b21lci5jaGVja2VkaW4gPSBjaGVja2luO1xuXG4gICAgICAgIHRoaXMuY3VzdG9tZXJTZXJ2aWNlLnB1dENoZWNraW5DdXN0b21lckFjdGlvbihjdXN0b21lcikuc3Vic2NyaWJlKFxuICAgICAgICAgICAgKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVXBkYXRlZCBjdXN0b21lclwiKTtcbiAgICAgICAgICAgICAgICB0aGlzLmlzQnVzeSA9IGZhbHNlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZGlyKGVycm9yKTtcbiAgICAgICAgICAgICAgICAvKlRPRE86IGhhbmRsZSBlcnJvcnMqL1xuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgIH1cblxuICAgIGdvQmFjaygpIHtcbiAgICAgICAgdGhpcy5yb3V0ZXJFeHRlbnNpb25zLmJhY2tUb1ByZXZpb3VzUGFnZSgpO1xuICAgIH1cbn1cbiJdfQ==