"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var app = require("tns-core-modules/application");
var page_1 = require("tns-core-modules/ui/page");
var segmented_bar_1 = require("tns-core-modules/ui/segmented-bar");
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
        this.optionCategoryItems = [];
        this.optionCategory = {
            id: "1",
            name: ""
        };
        this.hasRaftingGroeps = false;
        this.selectedGroepIndex = 0;
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
        var segmentedBar = args.object;
        var selectedIndex = segmentedBar.selectedIndex;
        var appSettings = require("application-settings");
        if (this.optionCategories.length > 0) {
            this.optionCategory = this.optionCategories[selectedIndex];
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
            console.log("found me some optionCategories");
            _this.optionCategoryItems = [];
            for (var _i = 0, _a = _this.optionCategories; _i < _a.length; _i++) {
                var optionCategory = _a[_i];
                var segmentedBarItem = new segmented_bar_1.SegmentedBarItem();
                segmentedBarItem.title = optionCategory.name;
                _this.optionCategoryItems.push(segmentedBarItem);
            }
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
        var categoryId = this.optionCategory.id;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3B0aW9ucy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJvcHRpb25zLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFrRDtBQUVsRCxrREFBb0Q7QUFFcEQsaURBQWdEO0FBQ2hELG1FQUFpRjtBQUtqRix1RUFBcUU7QUFDckUsaUVBQStEO0FBQy9ELG1FQUFpRTtBQUVqRTs7Ozs7OERBSzhEO0FBUTlEO0lBbUJJLDBCQUFvQixZQUEwQixFQUFVLGVBQWdDLEVBQ3BFLElBQVUsRUFBVSxhQUE0QjtRQURoRCxpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUFVLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUNwRSxTQUFJLEdBQUosSUFBSSxDQUFNO1FBQVUsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFuQnBFLFdBQU0sR0FBaUIsRUFBRSxDQUFDO1FBQzFCLGVBQVUsR0FBVyxFQUFFLENBQUM7UUFFeEIsY0FBUyxHQUFZLEtBQUssQ0FBQztRQUUzQixlQUFVLEdBQWtCLEVBQUUsQ0FBQztRQUUvQixxQkFBZ0IsR0FBMEIsRUFBRSxDQUFDO1FBQzdDLHdCQUFtQixHQUE0QixFQUFFLENBQUM7UUFDbEQsbUJBQWMsR0FBbUI7WUFDN0IsRUFBRSxFQUFFLEdBQUc7WUFDUCxJQUFJLEVBQUUsRUFBRTtTQUNYLENBQUM7UUFFRixxQkFBZ0IsR0FBWSxLQUFLLENBQUM7UUFDbEMsdUJBQWtCLEdBQVcsQ0FBQyxDQUFDO1FBQy9CLHFCQUFnQixHQUEyQixFQUFFLENBQUM7SUFJOUMsQ0FBQztJQUVELG1DQUFRLEdBQVI7UUFBQSxpQkFPQztRQU5HLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUNyQixJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztRQUMzQixJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxXQUFJLENBQUMsaUJBQWlCLEVBQUU7WUFDakMsS0FBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FB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ZW50LCBPbkluaXQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgUmFkU2lkZURyYXdlciB9IGZyb20gXCJuYXRpdmVzY3JpcHQtdWktc2lkZWRyYXdlclwiO1xuaW1wb3J0ICogYXMgYXBwIGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2FwcGxpY2F0aW9uXCI7XG5pbXBvcnQgeyBMaXN0UGlja2VyIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvbGlzdC1waWNrZXJcIjtcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9wYWdlXCI7XG5pbXBvcnQge1NlZ21lbnRlZEJhciwgU2VnbWVudGVkQmFySXRlbX0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvc2VnbWVudGVkLWJhclwiO1xuaW1wb3J0IHsgQWN0aXZpdHkgfSBmcm9tIFwifi9zaGFyZWQvbW9kZWxzL2FjdGl2aXR5Lm1vZGVsXCI7XG5pbXBvcnQgeyBHcm9lcCB9IGZyb20gXCJ+L3NoYXJlZC9tb2RlbHMvZ3JvZXAubW9kZWxcIjtcbmltcG9ydCB7IE9wdGlvbkNhdGVnb3J5IH0gZnJvbSBcIn4vc2hhcmVkL21vZGVscy9vcHRpb25DYXRlZ29yeS5tb2RlbFwiO1xuaW1wb3J0IHsgUmFmdGluZ0N1c3RvbWVyIH0gZnJvbSBcIn4vc2hhcmVkL21vZGVscy9yYWZ0aW5nQ3VzdG9tZXIubW9kZWxcIjtcbmltcG9ydCB7IEN1c3RvbWVyU2VydmljZSB9IGZyb20gXCJ+L3NoYXJlZC9zZXJ2aWNlcy9jdXN0b21lci5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBHcm9lcFNlcnZpY2UgfSBmcm9tIFwifi9zaGFyZWQvc2VydmljZXMvZ3JvZXAuc2VydmljZVwiO1xuaW1wb3J0IHsgT3B0aW9uU2VydmljZSB9IGZyb20gXCJ+L3NoYXJlZC9zZXJ2aWNlcy9vcHRpb24uc2VydmljZVwiO1xuXG4vKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuKiBCZWZvcmUgeW91IGNhbiBuYXZpZ2F0ZSB0byB0aGlzIHBhZ2UgZnJvbSB5b3VyIGFwcCwgeW91IG5lZWQgdG8gcmVmZXJlbmNlIHRoaXMgcGFnZSdzIG1vZHVsZSBpbiB0aGVcbiogZ2xvYmFsIGFwcCByb3V0ZXIgbW9kdWxlLiBBZGQgdGhlIGZvbGxvd2luZyBvYmplY3QgdG8gdGhlIGdsb2JhbCBhcnJheSBvZiByb3V0ZXM6XG4qIHsgcGF0aDogXCJwbGFubmluZ1wiLCBsb2FkQ2hpbGRyZW46IFwiLi9wbGFubmluZy9wbGFubmluZy5tb2R1bGUjUGxhbm5pbmdNb2R1bGVcIiB9XG4qIE5vdGUgdGhhdCB0aGlzIHNpbXBseSBwb2ludHMgdGhlIHBhdGggdG8gdGhlIHBhZ2UgbW9kdWxlIGZpbGUuIElmIHlvdSBtb3ZlIHRoZSBwYWdlLCB5b3UgbmVlZCB0byB1cGRhdGUgdGhlIHJvdXRlIHRvby5cbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcIk9wdGlvbnNcIixcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHByb3ZpZGVyczogW0dyb2VwU2VydmljZSwgQ3VzdG9tZXJTZXJ2aWNlLCBPcHRpb25TZXJ2aWNlXSxcbiAgICB0ZW1wbGF0ZVVybDogXCIuL29wdGlvbnMuY29tcG9uZW50Lmh0bWxcIlxufSlcbmV4cG9ydCBjbGFzcyBPcHRpb25zQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBncm9lcHM6IEFycmF5PEdyb2VwPiA9IFtdO1xuICAgIGdyb2VwSXRlbXM6IG9iamVjdCA9IHt9O1xuICAgIGdyb2VwOiBHcm9lcDtcbiAgICBoYXNHcm9lcHM6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIGFjdGl2aXRpZXM6IEFycmF5PG9iamVjdD4gPSBbXTtcblxuICAgIG9wdGlvbkNhdGVnb3JpZXM6IEFycmF5PE9wdGlvbkNhdGVnb3J5PiA9IFtdO1xuICAgIG9wdGlvbkNhdGVnb3J5SXRlbXM6IEFycmF5PFNlZ21lbnRlZEJhckl0ZW0+ID0gW107XG4gICAgb3B0aW9uQ2F0ZWdvcnk6IE9wdGlvbkNhdGVnb3J5ID0ge1xuICAgICAgICBpZDogXCIxXCIsXG4gICAgICAgIG5hbWU6IFwiXCJcbiAgICB9O1xuXG4gICAgaGFzUmFmdGluZ0dyb2VwczogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHNlbGVjdGVkR3JvZXBJbmRleDogbnVtYmVyID0gMDtcbiAgICByYWZ0aW5nQ3VzdG9tZXJzOiBBcnJheTxSYWZ0aW5nQ3VzdG9tZXI+ID0gW107XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGdyb2VwU2VydmljZTogR3JvZXBTZXJ2aWNlLCBwcml2YXRlIGN1c3RvbWVyU2VydmljZTogQ3VzdG9tZXJTZXJ2aWNlLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgcGFnZTogUGFnZSwgcHJpdmF0ZSBvcHRpb25TZXJ2aWNlOiBPcHRpb25TZXJ2aWNlKSB7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZ2V0QWN0aXZpdGllcygpO1xuICAgICAgICB0aGlzLmdldE9wdGlvbkNhdGVnb3JpZXMoKTtcbiAgICAgICAgdGhpcy5wYWdlLm9uKFBhZ2UubmF2aWdhdGluZ1RvRXZlbnQsICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZ2V0R3JvZXBzKCk7XG4gICAgICAgIH0pO1xuXG4gICAgfVxuXG4gICAgc2VsZWN0ZWRHcm9lcEluZGV4Q2hhbmdlZChhcmdzKSB7XG4gICAgICAgIGNvbnN0IHBpY2tlciA9IDxMaXN0UGlja2VyPmFyZ3Mub2JqZWN0O1xuICAgICAgICBjb25zdCBhcHBTZXR0aW5ncyA9IHJlcXVpcmUoXCJhcHBsaWNhdGlvbi1zZXR0aW5nc1wiKTtcblxuICAgICAgICBpZiAodGhpcy5ncm9lcHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgYXBwU2V0dGluZ3Muc2V0TnVtYmVyKFwiZ3JvZXBJbmRleFwiLCBwaWNrZXIuc2VsZWN0ZWRJbmRleCk7XG4gICAgICAgICAgICB0aGlzLmdyb2VwID0gdGhpcy5ncm9lcHNbcGlja2VyLnNlbGVjdGVkSW5kZXhdO1xuICAgICAgICAgICAgYXBwU2V0dGluZ3Muc2V0U3RyaW5nKFwiZ3JvZXBJZFwiLCB0aGlzLmdyb2VwLmlkKTtcbiAgICAgICAgICAgIHRoaXMuZ2V0Q3VzdG9tZXJzKCk7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIHNlbGVjdGVkT3B0aW9uQ2F0ZWdvcnlJbmRleENoYW5nZWQoYXJncykge1xuICAgICAgICBjb25zdCBzZWdtZW50ZWRCYXIgPSA8U2VnbWVudGVkQmFyPmFyZ3Mub2JqZWN0O1xuICAgICAgICBjb25zdCBzZWxlY3RlZEluZGV4ID0gc2VnbWVudGVkQmFyLnNlbGVjdGVkSW5kZXg7XG4gICAgICAgIGNvbnN0IGFwcFNldHRpbmdzID0gcmVxdWlyZShcImFwcGxpY2F0aW9uLXNldHRpbmdzXCIpO1xuXG4gICAgICAgIGlmICh0aGlzLm9wdGlvbkNhdGVnb3JpZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdGhpcy5vcHRpb25DYXRlZ29yeSA9IHRoaXMub3B0aW9uQ2F0ZWdvcmllc1tzZWxlY3RlZEluZGV4XTtcbiAgICAgICAgICAgIHRoaXMuZ2V0QWN0aXZpdGllcygpO1xuICAgICAgICAgICAgdGhpcy5nZXRDdXN0b21lcnMoKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgZ2V0Q3VzdG9tZXJzKCk6IHZvaWQge1xuICAgICAgICAvKlRPRE86IHdyaXRlIGxvZ2ljKi9cbiAgICB9XG5cbiAgICBnZXRHcm9lcHMoKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGFwcFNldHRpbmdzID0gcmVxdWlyZShcImFwcGxpY2F0aW9uLXNldHRpbmdzXCIpO1xuICAgICAgICBsZXQgbG9jYXRpb25JZDogc3RyaW5nID0gXCIxXCI7XG4gICAgICAgIGlmIChhcHBTZXR0aW5ncy5oYXNLZXkoXCJsb2NhdGlvbklkXCIpKSB7XG4gICAgICAgICAgICBsb2NhdGlvbklkID0gYXBwU2V0dGluZ3MuZ2V0U3RyaW5nKFwibG9jYXRpb25JZFwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qVE9ETzogbW92ZSB0byBzZXR0aW5ncyovXG4gICAgICAgIGNvbnN0IG5vdyA9IG5ldyBEYXRlKCk7XG4gICAgICAgIGxldCBkYXRlOiBzdHJpbmcgPSBub3cuZ2V0RnVsbFllYXIoKSArIFwiLVwiICsgKG5vdy5nZXRNb250aCgpICsgMSkgKyBcIi1cIiArIG5vdy5nZXREYXRlKCk7XG4gICAgICAgIGlmIChhcHBTZXR0aW5ncy5oYXNLZXkoXCJtYXRlcmlhbERhdGVcIikpIHtcbiAgICAgICAgICAgIGRhdGUgPSBhcHBTZXR0aW5ncy5nZXRTdHJpbmcoXCJtYXRlcmlhbERhdGVcIik7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmdyb2VwU2VydmljZS5nZXRBbGxHcm9lcHNGb3JXZWVrQW5kTG9jYXRpb25BY3Rpb24oZGF0ZSwgbG9jYXRpb25JZClcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgKHJlc3VsdDogQXJyYXk8R3JvZXA+KSA9PiB7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ncm9lcHMgPSByZXN1bHQ7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZ3JvZXBzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ3JvZXBJdGVtcyA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtczogdGhpcy5ncm9lcHMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVuZ3RoOiB0aGlzLmdyb2Vwcy5sZW5ndGgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2V0SXRlbTogKGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSB0aGlzLmdyb2Vwc1tpbmRleF07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW0ubmFtZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oYXNHcm9lcHMgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJmb3VuZCBtZSBzb21lIGdyb2Vwc1wiKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRHcm9lcEluZGV4ID0gYXBwU2V0dGluZ3MuaGFzS2V5KFwiZ3JvZXBJbmRleFwiKSA/XG4gICAgICAgICAgICAgICAgICAgICAgICBhcHBTZXR0aW5ncy5nZXROdW1iZXIoXCJncm9lcEluZGV4XCIpIDogMDtcblxuICAgICAgICAgICAgICAgICAgICAvKiBUT0RPOiBnZXQgVGhlIGRhdGFcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRDdXN0b21lcnMoKTsqL1xuXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5kaXIoZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhc0dyb2VwcyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAvKlRPRE86IGhhbmRsZSBlcnJvcnMqL1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7XG4gICAgfVxuXG4gICAgZ2V0T3B0aW9uQ2F0ZWdvcmllcygpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgYXBwU2V0dGluZ3MgPSByZXF1aXJlKFwiYXBwbGljYXRpb24tc2V0dGluZ3NcIik7XG5cbiAgICAgICAgdGhpcy5vcHRpb25TZXJ2aWNlLmdldEFsbENhdGVnb3JpZXNBY3Rpb24oKVxuICAgICAgICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICAocmVzdWx0OiBBcnJheTxPcHRpb25DYXRlZ29yeT4pID0+IHtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbkNhdGVnb3JpZXMgPSByZXN1bHQ7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZm91bmQgbWUgc29tZSBvcHRpb25DYXRlZ29yaWVzXCIpO1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3B0aW9uQ2F0ZWdvcnlJdGVtcyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IG9wdGlvbkNhdGVnb3J5IG9mIHRoaXMub3B0aW9uQ2F0ZWdvcmllcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2VnbWVudGVkQmFySXRlbSA9IDxTZWdtZW50ZWRCYXJJdGVtPm5ldyBTZWdtZW50ZWRCYXJJdGVtKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWdtZW50ZWRCYXJJdGVtLnRpdGxlID0gb3B0aW9uQ2F0ZWdvcnkubmFtZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3B0aW9uQ2F0ZWdvcnlJdGVtcy5wdXNoKHNlZ21lbnRlZEJhckl0ZW0pO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgLyogVE9ETzogZ2V0IFRoZSBkYXRhXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0Q3VzdG9tZXJzKCk7Ki9cblxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZGlyKGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgLypUT0RPOiBoYW5kbGUgZXJyb3JzKi9cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuICAgIH1cblxuICAgIGdldFJhZnRpbmdDdXN0b21lcnMoKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGFwcFNldHRpbmdzID0gcmVxdWlyZShcImFwcGxpY2F0aW9uLXNldHRpbmdzXCIpO1xuICAgICAgICBpZiAoYXBwU2V0dGluZ3MuaGFzS2V5KFwiZ3JvZXBJZFwiKSkge1xuICAgICAgICAgICAgY29uc3QgZ3JvZXBJZCA9IGFwcFNldHRpbmdzLmdldFN0cmluZyhcImdyb2VwSWRcIik7XG5cbiAgICAgICAgICAgIHRoaXMuY3VzdG9tZXJTZXJ2aWNlLmdldEFsbEJ5R3JvZXBXaXRoUmFmdGluZ09wdGlvbkFjdGlvbihncm9lcElkKVxuICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgIChyZXN1bHQ6IEFycmF5PFJhZnRpbmdDdXN0b21lcj4pID0+IHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yYWZ0aW5nQ3VzdG9tZXJzID0gcmVzdWx0O1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oYXNSYWZ0aW5nR3JvZXBzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZm91bmQgbWUgc29tZSBjdXN0b21lcnNcIik7XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5kaXIoZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oYXNSYWZ0aW5nR3JvZXBzID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAvKlRPRE86IGhhbmRsZSBlcnJvcnMqL1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgZ2V0QWN0aXZpdGllcygpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgYXBwU2V0dGluZ3MgPSByZXF1aXJlKFwiYXBwbGljYXRpb24tc2V0dGluZ3NcIik7XG5cbiAgICAgICAgY29uc3QgY2F0ZWdvcnlJZCA9IHRoaXMub3B0aW9uQ2F0ZWdvcnkuaWQ7XG4gICAgICAgIHRoaXMub3B0aW9uU2VydmljZS5nZXRBbGxBY3Rpdml0aWVzQnlDYXRlZ29yeUFjdGlvbihjYXRlZ29yeUlkKVxuICAgICAgICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICAocmVzdWx0OiBBcnJheTxBY3Rpdml0eT4pID0+IHtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFjdGl2aXRpZXMgPSByZXN1bHQubWFwKCh7aWQsIG5hbWV9KSA9PiAoe2tleTogaWQsIGxhYmVsOiBuYW1lfSkpO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImdvdCBtZSBzb21lIGFjdGl2aXRpZXNcIik7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5kaXIoZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICAvKlRPRE86IGhhbmRsZSBlcnJvcnMqL1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7XG5cbiAgICB9XG5cbiAgICBkZlByb3BlcnR5Q29tbWl0dGVkUmFmdGluZyhyYWZ0aW5nQ3VzdG9tZXI6IFJhZnRpbmdDdXN0b21lcikge1xuICAgICAgICBjb25zb2xlLmRpcihyYWZ0aW5nQ3VzdG9tZXIpO1xuICAgICAgICAvKnRoaXMuY3VzdG9tZXJTZXJ2aWNlLnB1dEN1c3RvbWVyU2l6ZUFjdGlvbihyYWZ0aW5nQ3VzdG9tZXIpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJVcGRhdGVkIGN1c3RvbWVyXCIpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZGlyKGVycm9yKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApOyovXG4gICAgfVxuXG4gICAgb25EcmF3ZXJCdXR0b25UYXAoKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHNpZGVEcmF3ZXIgPSA8UmFkU2lkZURyYXdlcj5hcHAuZ2V0Um9vdFZpZXcoKTtcbiAgICAgICAgc2lkZURyYXdlci5zaG93RHJhd2VyKCk7XG4gICAgfVxufVxuIl19