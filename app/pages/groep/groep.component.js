"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var nativescript_angular_1 = require("nativescript-angular");
var settings_1 = require("~/settings/settings");
var customer_service_1 = require("~/shared/services/customer.service");
var groep_service_1 = require("~/shared/services/groep.service");
var GroepComponent = /** @class */ (function () {
    function GroepComponent(groepService, customerService, routerExtensions) {
        this.groepService = groepService;
        this.customerService = customerService;
        this.routerExtensions = routerExtensions;
        this.groeps = [];
        this.customers = [];
        this.isBusy = true;
    }
    GroepComponent.prototype.ngOnInit = function () {
        this.getGroeps();
    };
    GroepComponent.prototype.getGroeps = function () {
        var _this = this;
        var locationId = settings_1.Settings.getLocation();
        var date = settings_1.Settings.getDate();
        this.groepService.getAllGroepsForWeekAndLocationAction(date, locationId)
            .subscribe(function (result) {
            _this.groeps = [{ key: "0", label: "Kies een Groep" }];
            _this.groeps = _this.groeps.concat(result.map(function (_a) {
                var id = _a.id, name = _a.name;
                return ({ key: id, label: name });
            }));
            _this.getCustomers();
        }, function (error) {
            console.dir(error);
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
            });
        }
    };
    GroepComponent.prototype.goBack = function () {
        this.routerExtensions.backToPreviousPage();
    };
    GroepComponent = __decorate([
        core_1.Component({
            selector: "Groep",
            moduleId: module.id,
            providers: [groep_service_1.GroepService, customer_service_1.CustomerService],
            templateUrl: "./groep.component.html"
        }),
        __metadata("design:paramtypes", [groep_service_1.GroepService, customer_service_1.CustomerService,
            nativescript_angular_1.RouterExtensions])
    ], GroepComponent);
    return GroepComponent;
}());
exports.GroepComponent = GroepComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JvZXAuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZ3JvZXAuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTZEO0FBQzdELDZEQUF3RDtBQUd4RCxnREFBK0M7QUFJL0MsdUVBQXFFO0FBQ3JFLGlFQUErRDtBQVEvRDtJQU9JLHdCQUFvQixZQUEwQixFQUFVLGVBQWdDLEVBQ3BFLGdCQUFrQztRQURsQyxpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUFVLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUNwRSxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBUHRELFdBQU0sR0FBa0IsRUFBRSxDQUFDO1FBRTNCLGNBQVMsR0FBeUIsRUFBRSxDQUFDO1FBRXJDLFdBQU0sR0FBWSxJQUFJLENBQUM7SUFJdkIsQ0FBQztJQUVELGlDQUFRLEdBQVI7UUFDSSxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUVELGtDQUFTLEdBQVQ7UUFBQSxpQkFtQkM7UUFsQkcsSUFBTSxVQUFVLEdBQUcsbUJBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUMxQyxJQUFNLElBQUksR0FBRyxtQkFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBRWhDLElBQUksQ0FBQyxZQUFZLENBQUMsb0NBQW9DLENBQUMsSUFBSSxFQUFFLFVBQVUsQ0FBQzthQUNuRSxTQUFTLENBQ04sVUFBQyxNQUFvQjtZQUVqQixLQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxnQkFBZ0IsRUFBQyxDQUFDLENBQUM7WUFDcEQsS0FBSSxDQUFDLE1BQU0sR0FBTyxLQUFJLENBQUMsTUFBTSxRQUFLLE1BQU0sQ0FBQyxHQUFHLENBQUMsVUFBQyxFQUFZO29CQUFWLFVBQUUsRUFBRSxjQUFJO2dCQUFPLE9BQUEsQ0FBQyxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDO1lBQTFCLENBQTBCLENBQUMsQ0FBQyxDQUFDO1lBRTVGLEtBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUV4QixDQUFDLEVBQ0QsVUFBQyxLQUFLO1lBQ0YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNuQix1QkFBdUI7UUFDM0IsQ0FBQyxDQUNKLENBQUM7SUFDVixDQUFDO0lBRUQscUNBQVksR0FBWjtRQUFBLGlCQW1CQztRQWxCRyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUNuQixJQUFNLFVBQVUsR0FBRyxtQkFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQzFDLElBQU0sSUFBSSxHQUFHLG1CQUFRLENBQUMsT0FBTyxFQUFFLENBQUM7UUFFaEMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxpREFBaUQsQ0FBQyxJQUFJLEVBQUUsVUFBVSxDQUFDO2FBQ25GLFNBQVMsQ0FDTixVQUFDLE1BQTRCO1lBRXpCLEtBQUksQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDO1lBQ3hCLE9BQU8sQ0FBQyxHQUFHLENBQUMsK0JBQStCLENBQUMsQ0FBQztZQUM3QyxLQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUN4QixDQUFDLEVBQ0QsVUFBQyxLQUFLO1lBQ0YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNuQix1QkFBdUI7UUFDM0IsQ0FBQyxDQUNKLENBQUM7SUFFVixDQUFDO0lBRUQsNENBQW1CLEdBQW5CLFVBQW9CLElBQUk7UUFBeEIsaUJBbUJDO1FBbEJHLElBQU0sUUFBUSxHQUFnQixJQUFJLENBQUMsTUFBTSxDQUFDO1FBQzFDLElBQU0sYUFBYSxHQUFrQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUV2RixFQUFFLENBQUMsQ0FBQyxhQUFhLENBQUMsYUFBYSxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDdEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7WUFFbkIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxzQkFBc0IsQ0FBQyxhQUFhLENBQUM7aUJBQ3JELFNBQVMsQ0FDTixVQUFDLEdBQUc7Z0JBQ0EsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO2dCQUNoQyxLQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztZQUN4QixDQUFDLEVBQ0QsVUFBQyxLQUFLO2dCQUNGLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ25CLHVCQUF1QjtZQUMzQixDQUFDLENBQ0osQ0FBQztRQUNWLENBQUM7SUFDTCxDQUFDO0lBRUQsK0JBQU0sR0FBTjtRQUNJLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO0lBQy9DLENBQUM7SUFoRlEsY0FBYztRQU4xQixnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLE9BQU87WUFDakIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFNBQVMsRUFBRSxDQUFDLDRCQUFZLEVBQUUsa0NBQWUsQ0FBQztZQUMxQyxXQUFXLEVBQUUsd0JBQXdCO1NBQ3hDLENBQUM7eUNBUW9DLDRCQUFZLEVBQTJCLGtDQUFlO1lBQ2xELHVDQUFnQjtPQVI3QyxjQUFjLENBaUYxQjtJQUFELHFCQUFDO0NBQUEsQUFqRkQsSUFpRkM7QUFqRlksd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgVmlld0NoaWxkIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXJcIjtcbmltcG9ydCB7IFJhZERhdGFGb3JtIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC11aS1kYXRhZm9ybVwiO1xuaW1wb3J0IHsgU3dpdGNoIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvc3dpdGNoXCI7XG5pbXBvcnQgeyBTZXR0aW5ncyB9IGZyb20gXCJ+L3NldHRpbmdzL3NldHRpbmdzXCI7XG5pbXBvcnQgeyBDaGVja2luQ3VzdG9tZXIgfSBmcm9tIFwifi9zaGFyZWQvbW9kZWxzL2NoZWNraW5DdXN0b21lci5tb2RlbFwiO1xuaW1wb3J0IHsgR3JvZXAgfSBmcm9tIFwifi9zaGFyZWQvbW9kZWxzL2dyb2VwLm1vZGVsXCI7XG5pbXBvcnQgeyBHcm9lcEN1c3RvbWVyIH0gZnJvbSBcIn4vc2hhcmVkL21vZGVscy9ncm9lcEN1c3RvbWVyLm1vZGVsXCI7XG5pbXBvcnQgeyBDdXN0b21lclNlcnZpY2UgfSBmcm9tIFwifi9zaGFyZWQvc2VydmljZXMvY3VzdG9tZXIuc2VydmljZVwiO1xuaW1wb3J0IHsgR3JvZXBTZXJ2aWNlIH0gZnJvbSBcIn4vc2hhcmVkL3NlcnZpY2VzL2dyb2VwLnNlcnZpY2VcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwiR3JvZXBcIixcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHByb3ZpZGVyczogW0dyb2VwU2VydmljZSwgQ3VzdG9tZXJTZXJ2aWNlXSxcbiAgICB0ZW1wbGF0ZVVybDogXCIuL2dyb2VwLmNvbXBvbmVudC5odG1sXCJcbn0pXG5leHBvcnQgY2xhc3MgR3JvZXBDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIGdyb2VwczogQXJyYXk8b2JqZWN0PiA9IFtdO1xuXG4gICAgY3VzdG9tZXJzOiBBcnJheTxHcm9lcEN1c3RvbWVyPiA9IFtdO1xuXG4gICAgaXNCdXN5OiBib29sZWFuID0gdHJ1ZTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZ3JvZXBTZXJ2aWNlOiBHcm9lcFNlcnZpY2UsIHByaXZhdGUgY3VzdG9tZXJTZXJ2aWNlOiBDdXN0b21lclNlcnZpY2UsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSByb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zKSB7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZ2V0R3JvZXBzKCk7XG4gICAgfVxuXG4gICAgZ2V0R3JvZXBzKCk6IHZvaWQge1xuICAgICAgICBjb25zdCBsb2NhdGlvbklkID0gU2V0dGluZ3MuZ2V0TG9jYXRpb24oKTtcbiAgICAgICAgY29uc3QgZGF0ZSA9IFNldHRpbmdzLmdldERhdGUoKTtcblxuICAgICAgICB0aGlzLmdyb2VwU2VydmljZS5nZXRBbGxHcm9lcHNGb3JXZWVrQW5kTG9jYXRpb25BY3Rpb24oZGF0ZSwgbG9jYXRpb25JZClcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgKHJlc3VsdDogQXJyYXk8R3JvZXA+KSA9PiB7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ncm9lcHMgPSBbe2tleTogXCIwXCIsIGxhYmVsOiBcIktpZXMgZWVuIEdyb2VwXCJ9XTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ncm9lcHMgPSBbLi4udGhpcy5ncm9lcHMsIC4uLnJlc3VsdC5tYXAoKHsgaWQsIG5hbWUgfSkgPT4gKHsga2V5OiBpZCwgbGFiZWw6IG5hbWUgfSkpXTtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdldEN1c3RvbWVycygpO1xuXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5kaXIoZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICAvKlRPRE86IGhhbmRsZSBlcnJvcnMqL1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7XG4gICAgfVxuXG4gICAgZ2V0Q3VzdG9tZXJzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmlzQnVzeSA9IHRydWU7XG4gICAgICAgIGNvbnN0IGxvY2F0aW9uSWQgPSBTZXR0aW5ncy5nZXRMb2NhdGlvbigpO1xuICAgICAgICBjb25zdCBkYXRlID0gU2V0dGluZ3MuZ2V0RGF0ZSgpO1xuXG4gICAgICAgIHRoaXMuY3VzdG9tZXJTZXJ2aWNlLmdldEFsbEJ5UGVyaW9kSWRBbmRMb2NhdGlvbklkRm9yR3JvdXBMYXlvdXRBY3Rpb24oZGF0ZSwgbG9jYXRpb25JZClcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgKHJlc3VsdDogQXJyYXk8R3JvZXBDdXN0b21lcj4pID0+IHtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN1c3RvbWVycyA9IHJlc3VsdDtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJmb3VuZCBtZSBzb21lIGdyb2VwIGN1c3RvbWVyc1wiKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc0J1c3kgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmRpcihlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIC8qVE9ETzogaGFuZGxlIGVycm9ycyovXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcblxuICAgIH1cblxuICAgIGRmUHJvcGVydHlDb21taXR0ZWQoYXJncykge1xuICAgICAgICBjb25zdCBkYXRhRm9ybSA9IDxSYWREYXRhRm9ybT5hcmdzLm9iamVjdDtcbiAgICAgICAgY29uc3QgZ3JvZXBDdXN0b21lcjogR3JvZXBDdXN0b21lciA9IDxHcm9lcEN1c3RvbWVyPiBKU09OLnBhcnNlKGRhdGFGb3JtLmVkaXRlZE9iamVjdCk7XG5cbiAgICAgICAgaWYgKGdyb2VwQ3VzdG9tZXIuZ3JvdXBMYXlvdXRJZCAhPT0gXCIwXCIpIHtcbiAgICAgICAgICAgIHRoaXMuaXNCdXN5ID0gdHJ1ZTtcblxuICAgICAgICAgICAgdGhpcy5jdXN0b21lclNlcnZpY2UucHV0R3JvZXBDdXN0b21lckFjdGlvbihncm9lcEN1c3RvbWVyKVxuICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgIChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVXBkYXRlZCBjdXN0b21lclwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaXNCdXN5ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5kaXIoZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLypUT0RPOiBoYW5kbGUgZXJyb3JzKi9cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnb0JhY2soKSB7XG4gICAgICAgIHRoaXMucm91dGVyRXh0ZW5zaW9ucy5iYWNrVG9QcmV2aW91c1BhZ2UoKTtcbiAgICB9XG59XG4iXX0=