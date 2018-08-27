"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var nativescript_angular_1 = require("nativescript-angular");
var settings_1 = require("~/settings/settings");
var customer_service_1 = require("~/shared/services/customer.service");
var BusbackComponent = /** @class */ (function () {
    function BusbackComponent(customerService, routerExtensions) {
        this.customerService = customerService;
        this.routerExtensions = routerExtensions;
        this.isBusy = true;
        this.checkinBusBack = {
            total: "0",
            places: [],
            date: ""
        };
    }
    BusbackComponent.prototype.ngOnInit = function () {
        this.getCustomersBusBack();
    };
    BusbackComponent.prototype.getCustomersBusBack = function () {
        var _this = this;
        var date = settings_1.Settings.getDate();
        this.customerService.getBusBackCustomersByWeek(date)
            .subscribe(function (result) {
            _this.checkinBusBack = result;
            _this.isBusy = false;
        }, function (error) {
            console.dir(error);
            /*TODO: handle errors*/
        });
    };
    BusbackComponent.prototype.dfPropertyBackCommitted = function (args) {
        var dataForm = args.object;
        var busCostumer = JSON.parse(dataForm.editedObject);
        this.customerService.putBusBackCustomerAction(busCostumer)
            .subscribe(function () {
            console.log("Updated customer");
        }, function (error) {
            console.dir(error);
            /*TODO: handle errors*/
        });
    };
    BusbackComponent.prototype.goBack = function () {
        this.routerExtensions.backToPreviousPage();
    };
    BusbackComponent = __decorate([
        core_1.Component({
            selector: "Busback",
            moduleId: module.id,
            providers: [customer_service_1.CustomerService],
            templateUrl: "./busback.component.html"
        }),
        __metadata("design:paramtypes", [customer_service_1.CustomerService, nativescript_angular_1.RouterExtensions])
    ], BusbackComponent);
    return BusbackComponent;
}());
exports.BusbackComponent = BusbackComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVzYmFjay5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJidXNiYWNrLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUE2RDtBQUM3RCw2REFBd0Q7QUFFeEQsZ0RBQStDO0FBRy9DLHVFQUFxRTtBQVFyRTtJQVNJLDBCQUFvQixlQUFnQyxFQUFVLGdCQUFrQztRQUE1RSxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFBVSxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBUmhHLFdBQU0sR0FBWSxJQUFJLENBQUM7UUFFdkIsbUJBQWMsR0FBZTtZQUN6QixLQUFLLEVBQUUsR0FBRztZQUNWLE1BQU0sRUFBRSxFQUFFO1lBQ1YsSUFBSSxFQUFFLEVBQUU7U0FDWCxDQUFDO0lBR0YsQ0FBQztJQUVELG1DQUFRLEdBQVI7UUFDSSxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztJQUMvQixDQUFDO0lBRUQsOENBQW1CLEdBQW5CO1FBQUEsaUJBY0M7UUFiRyxJQUFNLElBQUksR0FBRyxtQkFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBRWhDLElBQUksQ0FBQyxlQUFlLENBQUMseUJBQXlCLENBQUMsSUFBSSxDQUFDO2FBQy9DLFNBQVMsQ0FDTixVQUFDLE1BQWtCO1lBQ2YsS0FBSSxDQUFDLGNBQWMsR0FBRyxNQUFNLENBQUM7WUFDN0IsS0FBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDeEIsQ0FBQyxFQUNELFVBQUMsS0FBSztZQUNGLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDbkIsdUJBQXVCO1FBQzNCLENBQUMsQ0FDSixDQUFDO0lBQ1YsQ0FBQztJQUVELGtEQUF1QixHQUF2QixVQUF3QixJQUFJO1FBQ3hCLElBQU0sUUFBUSxHQUFnQixJQUFJLENBQUMsTUFBTSxDQUFDO1FBQzFDLElBQU0sV0FBVyxHQUE4QixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUVqRixJQUFJLENBQUMsZUFBZSxDQUFDLHdCQUF3QixDQUFDLFdBQVcsQ0FBQzthQUNyRCxTQUFTLENBQ047WUFDSSxPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFDcEMsQ0FBQyxFQUNELFVBQUMsS0FBSztZQUNGLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDbkIsdUJBQXVCO1FBQzNCLENBQUMsQ0FDSixDQUFDO0lBQ1YsQ0FBQztJQUVELGlDQUFNLEdBQU47UUFDSSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztJQUMvQyxDQUFDO0lBbERRLGdCQUFnQjtRQU41QixnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLFNBQVM7WUFDbkIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFNBQVMsRUFBRSxDQUFDLGtDQUFlLENBQUM7WUFDNUIsV0FBVyxFQUFFLDBCQUEwQjtTQUMxQyxDQUFDO3lDQVV1QyxrQ0FBZSxFQUE0Qix1Q0FBZ0I7T0FUdkYsZ0JBQWdCLENBbUQ1QjtJQUFELHVCQUFDO0NBQUEsQUFuREQsSUFtREM7QUFuRFksNENBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIFZpZXdDaGlsZCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyXCI7XG5pbXBvcnQgeyBSYWREYXRhRm9ybSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtdWktZGF0YWZvcm1cIjtcbmltcG9ydCB7IFNldHRpbmdzIH0gZnJvbSBcIn4vc2V0dGluZ3Mvc2V0dGluZ3NcIjtcbmltcG9ydCB7IEJ1c0N1c3RvbWVyIH0gZnJvbSBcIn4vc2hhcmVkL21vZGVscy9idXNDdXN0b21lci5tb2RlbFwiO1xuaW1wb3J0IHsgQ2hlY2tpbkJ1cyB9IGZyb20gXCJ+L3NoYXJlZC9tb2RlbHMvY2hlY2tpbkJ1cy5tb2RlbFwiO1xuaW1wb3J0IHsgQ3VzdG9tZXJTZXJ2aWNlIH0gZnJvbSBcIn4vc2hhcmVkL3NlcnZpY2VzL2N1c3RvbWVyLnNlcnZpY2VcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwiQnVzYmFja1wiLFxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgcHJvdmlkZXJzOiBbQ3VzdG9tZXJTZXJ2aWNlXSxcbiAgICB0ZW1wbGF0ZVVybDogXCIuL2J1c2JhY2suY29tcG9uZW50Lmh0bWxcIlxufSlcbmV4cG9ydCBjbGFzcyBCdXNiYWNrQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBpc0J1c3k6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgY2hlY2tpbkJ1c0JhY2s6IENoZWNraW5CdXMgPSB7XG4gICAgICAgIHRvdGFsOiBcIjBcIixcbiAgICAgICAgcGxhY2VzOiBbXSxcbiAgICAgICAgZGF0ZTogXCJcIlxuICAgIH07XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGN1c3RvbWVyU2VydmljZTogQ3VzdG9tZXJTZXJ2aWNlLCBwcml2YXRlIHJvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMpIHtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5nZXRDdXN0b21lcnNCdXNCYWNrKCk7XG4gICAgfVxuXG4gICAgZ2V0Q3VzdG9tZXJzQnVzQmFjaygpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgZGF0ZSA9IFNldHRpbmdzLmdldERhdGUoKTtcblxuICAgICAgICB0aGlzLmN1c3RvbWVyU2VydmljZS5nZXRCdXNCYWNrQ3VzdG9tZXJzQnlXZWVrKGRhdGUpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgIChyZXN1bHQ6IENoZWNraW5CdXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGVja2luQnVzQmFjayA9IHJlc3VsdDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc0J1c3kgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmRpcihlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIC8qVE9ETzogaGFuZGxlIGVycm9ycyovXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcbiAgICB9XG5cbiAgICBkZlByb3BlcnR5QmFja0NvbW1pdHRlZChhcmdzKSB7XG4gICAgICAgIGNvbnN0IGRhdGFGb3JtID0gPFJhZERhdGFGb3JtPmFyZ3Mub2JqZWN0O1xuICAgICAgICBjb25zdCBidXNDb3N0dW1lcjogQnVzQ3VzdG9tZXIgPSA8QnVzQ3VzdG9tZXI+IEpTT04ucGFyc2UoZGF0YUZvcm0uZWRpdGVkT2JqZWN0KTtcblxuICAgICAgICB0aGlzLmN1c3RvbWVyU2VydmljZS5wdXRCdXNCYWNrQ3VzdG9tZXJBY3Rpb24oYnVzQ29zdHVtZXIpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJVcGRhdGVkIGN1c3RvbWVyXCIpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZGlyKGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgLypUT0RPOiBoYW5kbGUgZXJyb3JzKi9cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuICAgIH1cblxuICAgIGdvQmFjaygpIHtcbiAgICAgICAgdGhpcy5yb3V0ZXJFeHRlbnNpb25zLmJhY2tUb1ByZXZpb3VzUGFnZSgpO1xuICAgIH1cbn1cbiJdfQ==