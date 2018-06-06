"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var app = require("tns-core-modules/application");
var page_1 = require("tns-core-modules/ui/page");
var customer_service_1 = require("~/shared/services/customer.service");
var groep_service_1 = require("~/shared/services/groep.service");
var option_service_1 = require("~/shared/services/option.service");
/* ***********************************************************
* Before you can navigate to this page from your app, you need to reference this page's module in the
* global app router module. Add the following object to the global array of routes:
* { path: "planning", loadChildren: "./planning/planning.module#PlanningModule" }
* Note that this simply points the path to the page module file. If you move the page, you need to update the route too.
*************************************************************/
var OptionsComponent = /** @class */ (function () {
    function OptionsComponent(groepService, customerService, page, optionService) {
        this.groepService = groepService;
        this.customerService = customerService;
        this.page = page;
        this.optionService = optionService;
        this.groeps = [];
        this.groepItems = {};
        this.hasGroeps = false;
        this.activities = [];
        this.optionCategories = [];
        this.optionCategoryItems = {};
        this.hasRaftingGroeps = false;
        this.selectedGroepIndex = 0;
        this.selectedOptionCategoryIndex = 0;
        this.raftingCustomers = [];
    }
    OptionsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.getActivities();
        this.getOptionCategories();
        this.page.on(page_1.Page.navigatingToEvent, function () {
            _this.getGroeps();
        });
    };
    OptionsComponent.prototype.selectedGroepIndexChanged = function (args) {
        var picker = args.object;
        var appSettings = require("application-settings");
        if (this.groeps.length > 0) {
            appSettings.setNumber("groepIndex", picker.selectedIndex);
            this.groep = this.groeps[picker.selectedIndex];
            appSettings.setString("groepId", this.groep.id);
            this.getCustomers();
        }
    };
    OptionsComponent.prototype.selectedOptionCategoryIndexChanged = function (args) {
        var picker = args.object;
        var appSettings = require("application-settings");
        if (this.optionCategories.length > 0) {
            appSettings.setNumber("optionCategoryIndex", picker.selectedIndex);
            this.optionCategory = this.optionCategories[picker.selectedIndex];
            appSettings.setString("optionCategoryId", this.optionCategory.id);
            this.getActivities();
            this.getCustomers();
        }
    };
    OptionsComponent.prototype.getCustomers = function () {
        /*TODO: write logic*/
    };
    OptionsComponent.prototype.getGroeps = function () {
        var _this = this;
        var appSettings = require("application-settings");
        var locationId = "1";
        if (appSettings.hasKey("locationId")) {
            locationId = appSettings.getString("locationId");
        }
        /*TODO: move to settings*/
        var now = new Date();
        var date = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate();
        if (appSettings.hasKey("materialDate")) {
            date = appSettings.getString("materialDate");
        }
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
                console.log("found me some groeps");
            }
            _this.selectedGroepIndex = appSettings.hasKey("groepIndex") ?
                appSettings.getNumber("groepIndex") : 0;
            /* TODO: get The data
            this.getCustomers();*/
        }, function (error) {
            console.dir(error);
            _this.hasGroeps = false;
            /*TODO: handle errors*/
        });
    };
    OptionsComponent.prototype.getOptionCategories = function () {
        var _this = this;
        var appSettings = require("application-settings");
        this.optionService.getAllCategoriesAction()
            .subscribe(function (result) {
            _this.optionCategories = result;
            if (_this.optionCategories.length > 0) {
                _this.optionCategoryItems = {
                    items: _this.optionCategories,
                    length: _this.optionCategories.length,
                    getItem: function (index) {
                        var item = _this.optionCategories[index];
                        return item.name;
                    }
                };
                console.log("found me some optionCategories");
            }
            _this.selectedOptionCategoryIndex = appSettings.hasKey("optionCategoryIndex") ?
                appSettings.getNumber("optionCategoryIndex") : 0;
            /* TODO: get The data
            this.getCustomers();*/
        }, function (error) {
            console.dir(error);
            /*TODO: handle errors*/
        });
    };
    OptionsComponent.prototype.getRaftingCustomers = function () {
        var _this = this;
        var appSettings = require("application-settings");
        if (appSettings.hasKey("groepId")) {
            var groepId = appSettings.getString("groepId");
            this.customerService.getAllByGroepWithRaftingOptionAction(groepId)
                .subscribe(function (result) {
                _this.raftingCustomers = result;
                _this.hasRaftingGroeps = true;
                console.log("found me some customers");
            }, function (error) {
                console.dir(error);
                _this.hasRaftingGroeps = false;
                /*TODO: handle errors*/
            });
        }
    };
    OptionsComponent.prototype.getActivities = function () {
        var _this = this;
        var appSettings = require("application-settings");
        if (appSettings.hasKey("optionCategoryId")) {
            var categoryId = appSettings.getString("optionCategoryId");
            this.optionService.getAllActivitiesByCategoryAction(categoryId)
                .subscribe(function (result) {
                _this.activities = result.map(function (_a) {
                    var id = _a.id, name = _a.name;
                    return ({ key: id, label: name });
                });
                console.log("got me some activities");
            }, function (error) {
                console.dir(error);
                /*TODO: handle errors*/
            });
        }
    };
    OptionsComponent.prototype.dfPropertyCommittedRafting = function (raftingCustomer) {
        console.dir(raftingCustomer);
        /*this.customerService.putCustomerSizeAction(raftingCustomer)
            .subscribe(
                () => {
                    console.log("Updated customer");
                },
                (error) => {
                    console.dir(error);
                }
            );*/
    };
    OptionsComponent.prototype.onDrawerButtonTap = function () {
        var sideDrawer = app.getRootView();
        sideDrawer.showDrawer();
    };
    OptionsComponent = __decorate([
        core_1.Component({
            selector: "Options",
            moduleId: module.id,
            providers: [groep_service_1.GroepService, customer_service_1.CustomerService, option_service_1.OptionService],
            templateUrl: "./options.component.html"
        }),
        __metadata("design:paramtypes", [groep_service_1.GroepService, customer_service_1.CustomerService,
            page_1.Page, option_service_1.OptionService])
    ], OptionsComponent);
    return OptionsComponent;
}());
exports.OptionsComponent = OptionsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3B0aW9ucy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJvcHRpb25zLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFrRDtBQUVsRCxrREFBb0Q7QUFFcEQsaURBQWdEO0FBS2hELHVFQUFxRTtBQUNyRSxpRUFBK0Q7QUFDL0QsbUVBQWlFO0FBRWpFOzs7Ozs4REFLOEQ7QUFROUQ7SUFpQkksMEJBQW9CLFlBQTBCLEVBQVUsZUFBZ0MsRUFDcEUsSUFBVSxFQUFVLGFBQTRCO1FBRGhELGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQVUsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQ3BFLFNBQUksR0FBSixJQUFJLENBQU07UUFBVSxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQWpCcEUsV0FBTSxHQUFpQixFQUFFLENBQUM7UUFDMUIsZUFBVSxHQUFXLEVBQUUsQ0FBQztRQUV4QixjQUFTLEdBQVksS0FBSyxDQUFDO1FBRTNCLGVBQVUsR0FBa0IsRUFBRSxDQUFDO1FBRS9CLHFCQUFnQixHQUEwQixFQUFFLENBQUM7UUFDN0Msd0JBQW1CLEdBQVcsRUFBRSxDQUFDO1FBR2pDLHFCQUFnQixHQUFZLEtBQUssQ0FBQztRQUNsQyx1QkFBa0IsR0FBVyxDQUFDLENBQUM7UUFDL0IsZ0NBQTJCLEdBQVcsQ0FBQyxDQUFDO1FBQ3hDLHFCQUFnQixHQUEyQixFQUFFLENBQUM7SUFJOUMsQ0FBQztJQUVELG1DQUFRLEdBQVI7UUFBQSxpQkFNQztRQUxHLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUNyQixJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztRQUMzQixJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxXQUFJLENBQUMsaUJBQWlCLEVBQUU7WUFDakMsS0FBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ3JCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELG9EQUF5QixHQUF6QixVQUEwQixJ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N01RLGdCQUFnQjtRQU41QixnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLFNBQVM7WUFDbkIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFNBQVMsRUFBRSxDQUFDLDRCQUFZLEVBQUUsa0NBQWUsRUFBRSw4QkFBYSxDQUFDO1lBQ3pELFdBQVcsRUFBRSwwQkFBMEI7U0FDMUMsQ0FBQzt5Q0FrQm9DLDRCQUFZLEVBQTJCLGtDQUFlO1lBQzlELFdBQUksRUFBeUIsOEJBQWE7T0FsQjNELGdCQUFnQixDQThNNUI7SUFBRCx1QkFBQztDQUFBLEFBOU1ELElBOE1DO0FBOU1ZLDRDQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IFJhZFNpZGVEcmF3ZXIgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXVpLXNpZGVkcmF3ZXJcIjtcbmltcG9ydCAqIGFzIGFwcCBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9hcHBsaWNhdGlvblwiO1xuaW1wb3J0IHsgTGlzdFBpY2tlciB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2xpc3QtcGlja2VyXCI7XG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvcGFnZVwiO1xuaW1wb3J0IHsgQWN0aXZpdHkgfSBmcm9tIFwifi9zaGFyZWQvbW9kZWxzL2FjdGl2aXR5Lm1vZGVsXCI7XG5pbXBvcnQgeyBHcm9lcCB9IGZyb20gXCJ+L3NoYXJlZC9tb2RlbHMvZ3JvZXAubW9kZWxcIjtcbmltcG9ydCB7IE9wdGlvbkNhdGVnb3J5IH0gZnJvbSBcIn4vc2hhcmVkL21vZGVscy9vcHRpb25DYXRlZ29yeS5tb2RlbFwiO1xuaW1wb3J0IHsgUmFmdGluZ0N1c3RvbWVyIH0gZnJvbSBcIn4vc2hhcmVkL21vZGVscy9yYWZ0aW5nQ3VzdG9tZXIubW9kZWxcIjtcbmltcG9ydCB7IEN1c3RvbWVyU2VydmljZSB9IGZyb20gXCJ+L3NoYXJlZC9zZXJ2aWNlcy9jdXN0b21lci5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBHcm9lcFNlcnZpY2UgfSBmcm9tIFwifi9zaGFyZWQvc2VydmljZXMvZ3JvZXAuc2VydmljZVwiO1xuaW1wb3J0IHsgT3B0aW9uU2VydmljZSB9IGZyb20gXCJ+L3NoYXJlZC9zZXJ2aWNlcy9vcHRpb24uc2VydmljZVwiO1xuXG4vKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuKiBCZWZvcmUgeW91IGNhbiBuYXZpZ2F0ZSB0byB0aGlzIHBhZ2UgZnJvbSB5b3VyIGFwcCwgeW91IG5lZWQgdG8gcmVmZXJlbmNlIHRoaXMgcGFnZSdzIG1vZHVsZSBpbiB0aGVcbiogZ2xvYmFsIGFwcCByb3V0ZXIgbW9kdWxlLiBBZGQgdGhlIGZvbGxvd2luZyBvYmplY3QgdG8gdGhlIGdsb2JhbCBhcnJheSBvZiByb3V0ZXM6XG4qIHsgcGF0aDogXCJwbGFubmluZ1wiLCBsb2FkQ2hpbGRyZW46IFwiLi9wbGFubmluZy9wbGFubmluZy5tb2R1bGUjUGxhbm5pbmdNb2R1bGVcIiB9XG4qIE5vdGUgdGhhdCB0aGlzIHNpbXBseSBwb2ludHMgdGhlIHBhdGggdG8gdGhlIHBhZ2UgbW9kdWxlIGZpbGUuIElmIHlvdSBtb3ZlIHRoZSBwYWdlLCB5b3UgbmVlZCB0byB1cGRhdGUgdGhlIHJvdXRlIHRvby5cbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcIk9wdGlvbnNcIixcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHByb3ZpZGVyczogW0dyb2VwU2VydmljZSwgQ3VzdG9tZXJTZXJ2aWNlLCBPcHRpb25TZXJ2aWNlXSxcbiAgICB0ZW1wbGF0ZVVybDogXCIuL29wdGlvbnMuY29tcG9uZW50Lmh0bWxcIlxufSlcbmV4cG9ydCBjbGFzcyBPcHRpb25zQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBncm9lcHM6IEFycmF5PEdyb2VwPiA9IFtdO1xuICAgIGdyb2VwSXRlbXM6IG9iamVjdCA9IHt9O1xuICAgIGdyb2VwOiBHcm9lcDtcbiAgICBoYXNHcm9lcHM6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIGFjdGl2aXRpZXM6IEFycmF5PG9iamVjdD4gPSBbXTtcblxuICAgIG9wdGlvbkNhdGVnb3JpZXM6IEFycmF5PE9wdGlvbkNhdGVnb3J5PiA9IFtdO1xuICAgIG9wdGlvbkNhdGVnb3J5SXRlbXM6IG9iamVjdCA9IHt9O1xuICAgIG9wdGlvbkNhdGVnb3J5OiBPcHRpb25DYXRlZ29yeTtcblxuICAgIGhhc1JhZnRpbmdHcm9lcHM6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBzZWxlY3RlZEdyb2VwSW5kZXg6IG51bWJlciA9IDA7XG4gICAgc2VsZWN0ZWRPcHRpb25DYXRlZ29yeUluZGV4OiBudW1iZXIgPSAwO1xuICAgIHJhZnRpbmdDdXN0b21lcnM6IEFycmF5PFJhZnRpbmdDdXN0b21lcj4gPSBbXTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZ3JvZXBTZXJ2aWNlOiBHcm9lcFNlcnZpY2UsIHByaXZhdGUgY3VzdG9tZXJTZXJ2aWNlOiBDdXN0b21lclNlcnZpY2UsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBwYWdlOiBQYWdlLCBwcml2YXRlIG9wdGlvblNlcnZpY2U6IE9wdGlvblNlcnZpY2UpIHtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5nZXRBY3Rpdml0aWVzKCk7XG4gICAgICAgIHRoaXMuZ2V0T3B0aW9uQ2F0ZWdvcmllcygpO1xuICAgICAgICB0aGlzLnBhZ2Uub24oUGFnZS5uYXZpZ2F0aW5nVG9FdmVudCwgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5nZXRHcm9lcHMoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc2VsZWN0ZWRHcm9lcEluZGV4Q2hhbmdlZChhcmdzKSB7XG4gICAgICAgIGNvbnN0IHBpY2tlciA9IDxMaXN0UGlja2VyPmFyZ3Mub2JqZWN0O1xuICAgICAgICBjb25zdCBhcHBTZXR0aW5ncyA9IHJlcXVpcmUoXCJhcHBsaWNhdGlvbi1zZXR0aW5nc1wiKTtcblxuICAgICAgICBpZiAodGhpcy5ncm9lcHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgYXBwU2V0dGluZ3Muc2V0TnVtYmVyKFwiZ3JvZXBJbmRleFwiLCBwaWNrZXIuc2VsZWN0ZWRJbmRleCk7XG4gICAgICAgICAgICB0aGlzLmdyb2VwID0gdGhpcy5ncm9lcHNbcGlja2VyLnNlbGVjdGVkSW5kZXhdO1xuICAgICAgICAgICAgYXBwU2V0dGluZ3Muc2V0U3RyaW5nKFwiZ3JvZXBJZFwiLCB0aGlzLmdyb2VwLmlkKTtcbiAgICAgICAgICAgIHRoaXMuZ2V0Q3VzdG9tZXJzKCk7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIHNlbGVjdGVkT3B0aW9uQ2F0ZWdvcnlJbmRleENoYW5nZWQoYXJncykge1xuICAgICAgICBjb25zdCBwaWNrZXIgPSA8TGlzdFBpY2tlcj5hcmdzLm9iamVjdDtcbiAgICAgICAgY29uc3QgYXBwU2V0dGluZ3MgPSByZXF1aXJlKFwiYXBwbGljYXRpb24tc2V0dGluZ3NcIik7XG5cbiAgICAgICAgaWYgKHRoaXMub3B0aW9uQ2F0ZWdvcmllcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBhcHBTZXR0aW5ncy5zZXROdW1iZXIoXCJvcHRpb25DYXRlZ29yeUluZGV4XCIsIHBpY2tlci5zZWxlY3RlZEluZGV4KTtcbiAgICAgICAgICAgIHRoaXMub3B0aW9uQ2F0ZWdvcnkgPSB0aGlzLm9wdGlvbkNhdGVnb3JpZXNbcGlja2VyLnNlbGVjdGVkSW5kZXhdO1xuICAgICAgICAgICAgYXBwU2V0dGluZ3Muc2V0U3RyaW5nKFwib3B0aW9uQ2F0ZWdvcnlJZFwiLCB0aGlzLm9wdGlvbkNhdGVnb3J5LmlkKTtcbiAgICAgICAgICAgIHRoaXMuZ2V0QWN0aXZpdGllcygpO1xuICAgICAgICAgICAgdGhpcy5nZXRDdXN0b21lcnMoKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgZ2V0Q3VzdG9tZXJzKCk6IHZvaWQge1xuICAgICAgICAvKlRPRE86IHdyaXRlIGxvZ2ljKi9cbiAgICB9XG5cbiAgICBnZXRHcm9lcHMoKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGFwcFNldHRpbmdzID0gcmVxdWlyZShcImFwcGxpY2F0aW9uLXNldHRpbmdzXCIpO1xuICAgICAgICBsZXQgbG9jYXRpb25JZDogc3RyaW5nID0gXCIxXCI7XG4gICAgICAgIGlmIChhcHBTZXR0aW5ncy5oYXNLZXkoXCJsb2NhdGlvbklkXCIpKSB7XG4gICAgICAgICAgICBsb2NhdGlvbklkID0gYXBwU2V0dGluZ3MuZ2V0U3RyaW5nKFwibG9jYXRpb25JZFwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qVE9ETzogbW92ZSB0byBzZXR0aW5ncyovXG4gICAgICAgIGNvbnN0IG5vdyA9IG5ldyBEYXRlKCk7XG4gICAgICAgIGxldCBkYXRlOiBzdHJpbmcgPSBub3cuZ2V0RnVsbFllYXIoKSArIFwiLVwiICsgKG5vdy5nZXRNb250aCgpICsgMSkgKyBcIi1cIiArIG5vdy5nZXREYXRlKCk7XG4gICAgICAgIGlmIChhcHBTZXR0aW5ncy5oYXNLZXkoXCJtYXRlcmlhbERhdGVcIikpIHtcbiAgICAgICAgICAgIGRhdGUgPSBhcHBTZXR0aW5ncy5nZXRTdHJpbmcoXCJtYXRlcmlhbERhdGVcIik7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmdyb2VwU2VydmljZS5nZXRBbGxHcm9lcHNGb3JXZWVrQW5kTG9jYXRpb25BY3Rpb24oZGF0ZSwgbG9jYXRpb25JZClcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgKHJlc3VsdDogQXJyYXk8R3JvZXA+KSA9PiB7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ncm9lcHMgPSByZXN1bHQ7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZ3JvZXBzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ3JvZXBJdGVtcyA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtczogdGhpcy5ncm9lcHMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVuZ3RoOiB0aGlzLmdyb2Vwcy5sZW5ndGgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2V0SXRlbTogKGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSB0aGlzLmdyb2Vwc1tpbmRleF07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW0ubmFtZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oYXNHcm9lcHMgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJmb3VuZCBtZSBzb21lIGdyb2Vwc1wiKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRHcm9lcEluZGV4ID0gYXBwU2V0dGluZ3MuaGFzS2V5KFwiZ3JvZXBJbmRleFwiKSA/XG4gICAgICAgICAgICAgICAgICAgICAgICBhcHBTZXR0aW5ncy5nZXROdW1iZXIoXCJncm9lcEluZGV4XCIpIDogMDtcblxuICAgICAgICAgICAgICAgICAgICAvKiBUT0RPOiBnZXQgVGhlIGRhdGFcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRDdXN0b21lcnMoKTsqL1xuXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5kaXIoZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhc0dyb2VwcyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAvKlRPRE86IGhhbmRsZSBlcnJvcnMqL1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7XG4gICAgfVxuXG4gICAgZ2V0T3B0aW9uQ2F0ZWdvcmllcygpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgYXBwU2V0dGluZ3MgPSByZXF1aXJlKFwiYXBwbGljYXRpb24tc2V0dGluZ3NcIik7XG5cbiAgICAgICAgdGhpcy5vcHRpb25TZXJ2aWNlLmdldEFsbENhdGVnb3JpZXNBY3Rpb24oKVxuICAgICAgICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICAocmVzdWx0OiBBcnJheTxPcHRpb25DYXRlZ29yeT4pID0+IHtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbkNhdGVnb3JpZXMgPSByZXN1bHQ7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9uQ2F0ZWdvcmllcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbkNhdGVnb3J5SXRlbXMgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbXM6IHRoaXMub3B0aW9uQ2F0ZWdvcmllcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZW5ndGg6IHRoaXMub3B0aW9uQ2F0ZWdvcmllcy5sZW5ndGgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2V0SXRlbTogKGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSB0aGlzLm9wdGlvbkNhdGVnb3JpZXNbaW5kZXhdO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpdGVtLm5hbWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZm91bmQgbWUgc29tZSBvcHRpb25DYXRlZ29yaWVzXCIpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZE9wdGlvbkNhdGVnb3J5SW5kZXggPSBhcHBTZXR0aW5ncy5oYXNLZXkoXCJvcHRpb25DYXRlZ29yeUluZGV4XCIpID9cbiAgICAgICAgICAgICAgICAgICAgICAgIGFwcFNldHRpbmdzLmdldE51bWJlcihcIm9wdGlvbkNhdGVnb3J5SW5kZXhcIikgOiAwO1xuXG4gICAgICAgICAgICAgICAgICAgIC8qIFRPRE86IGdldCBUaGUgZGF0YVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdldEN1c3RvbWVycygpOyovXG5cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmRpcihlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIC8qVE9ETzogaGFuZGxlIGVycm9ycyovXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcbiAgICB9XG5cbiAgICBnZXRSYWZ0aW5nQ3VzdG9tZXJzKCk6IHZvaWQge1xuICAgICAgICBjb25zdCBhcHBTZXR0aW5ncyA9IHJlcXVpcmUoXCJhcHBsaWNhdGlvbi1zZXR0aW5nc1wiKTtcbiAgICAgICAgaWYgKGFwcFNldHRpbmdzLmhhc0tleShcImdyb2VwSWRcIikpIHtcbiAgICAgICAgICAgIGNvbnN0IGdyb2VwSWQgPSBhcHBTZXR0aW5ncy5nZXRTdHJpbmcoXCJncm9lcElkXCIpO1xuXG4gICAgICAgICAgICB0aGlzLmN1c3RvbWVyU2VydmljZS5nZXRBbGxCeUdyb2VwV2l0aFJhZnRpbmdPcHRpb25BY3Rpb24oZ3JvZXBJZClcbiAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICAocmVzdWx0OiBBcnJheTxSYWZ0aW5nQ3VzdG9tZXI+KSA9PiB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmFmdGluZ0N1c3RvbWVycyA9IHJlc3VsdDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGFzUmFmdGluZ0dyb2VwcyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImZvdW5kIG1lIHNvbWUgY3VzdG9tZXJzXCIpO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZGlyKGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGFzUmFmdGluZ0dyb2VwcyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgLypUT0RPOiBoYW5kbGUgZXJyb3JzKi9cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIGdldEFjdGl2aXRpZXMoKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGFwcFNldHRpbmdzID0gcmVxdWlyZShcImFwcGxpY2F0aW9uLXNldHRpbmdzXCIpO1xuXG4gICAgICAgIGlmIChhcHBTZXR0aW5ncy5oYXNLZXkoXCJvcHRpb25DYXRlZ29yeUlkXCIpKSB7XG4gICAgICAgICAgICBjb25zdCBjYXRlZ29yeUlkID0gYXBwU2V0dGluZ3MuZ2V0U3RyaW5nKFwib3B0aW9uQ2F0ZWdvcnlJZFwiKTtcbiAgICAgICAgICAgIHRoaXMub3B0aW9uU2VydmljZS5nZXRBbGxBY3Rpdml0aWVzQnlDYXRlZ29yeUFjdGlvbihjYXRlZ29yeUlkKVxuICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgIChyZXN1bHQ6IEFycmF5PEFjdGl2aXR5PikgPT4ge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFjdGl2aXRpZXMgPSByZXN1bHQubWFwKCh7aWQsIG5hbWV9KSA9PiAoe2tleTogaWQsIGxhYmVsOiBuYW1lfSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJnb3QgbWUgc29tZSBhY3Rpdml0aWVzXCIpO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZGlyKGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8qVE9ETzogaGFuZGxlIGVycm9ycyovXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBkZlByb3BlcnR5Q29tbWl0dGVkUmFmdGluZyhyYWZ0aW5nQ3VzdG9tZXI6IFJhZnRpbmdDdXN0b21lcikge1xuICAgICAgICBjb25zb2xlLmRpcihyYWZ0aW5nQ3VzdG9tZXIpO1xuICAgICAgICAvKnRoaXMuY3VzdG9tZXJTZXJ2aWNlLnB1dEN1c3RvbWVyU2l6ZUFjdGlvbihyYWZ0aW5nQ3VzdG9tZXIpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJVcGRhdGVkIGN1c3RvbWVyXCIpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZGlyKGVycm9yKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApOyovXG4gICAgfVxuXG4gICAgb25EcmF3ZXJCdXR0b25UYXAoKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHNpZGVEcmF3ZXIgPSA8UmFkU2lkZURyYXdlcj5hcHAuZ2V0Um9vdFZpZXcoKTtcbiAgICAgICAgc2lkZURyYXdlci5zaG93RHJhd2VyKCk7XG4gICAgfVxufVxuIl19