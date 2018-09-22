"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var page_1 = require("tns-core-modules/ui/page");
var segmented_bar_1 = require("tns-core-modules/ui/segmented-bar");
var settings_1 = require("~/settings/settings");
var customer_service_1 = require("~/shared/services/customer.service");
var groep_service_1 = require("~/shared/services/groep.service");
var option_service_1 = require("~/shared/services/option.service");
var OptionsComponent = /** @class */ (function () {
    function OptionsComponent(groepService, customerService, page, optionService) {
        this.groepService = groepService;
        this.customerService = customerService;
        this.page = page;
        this.optionService = optionService;
        this.groeps = [];
        this.groepItems = {};
        this.hasGroeps = false;
        this.isBusy = true;
        this.activities = [];
        this.optionCategories = [];
        this.optionCategoryItems = [];
        this.optionCategory = {
            id: "1",
            name: ""
        };
        this.selectedGroepIndex = 0;
        this.hasRaftingCustomers = false;
        this.raftingCustomers = [];
        this.hasCanyoningCustomers = false;
        this.canyoningCustomers = [];
        this.hasSpecialCustomers = false;
        this.specialCustomers = [];
    }
    OptionsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.page.on(page_1.Page.navigatingToEvent, function () {
            _this.isBusy = true;
            _this.getGroeps();
        });
    };
    OptionsComponent.prototype.selectedGroepIndexChanged = function (args) {
        this.isBusy = true;
        var picker = args.object;
        if (this.groeps.length > 0) {
            this.groep = this.groeps[picker.selectedIndex];
            if ((typeof this.optionCategory !== "undefined" &&
                this.optionCategory !== null ? this.optionCategory.id : void 0) != null) {
                this.getOptionCategories();
            }
        }
    };
    OptionsComponent.prototype.selectedOptionCategoryIndexChanged = function (args) {
        this.isBusy = true;
        var segmentedBar = args.object;
        var selectedIndex = segmentedBar.selectedIndex;
        if (this.optionCategories.length > 0) {
            this.optionCategory = this.optionCategories[selectedIndex];
            this.getActivities();
        }
    };
    OptionsComponent.prototype.getCustomers = function () {
        if (settings_1.Settings.getCurrentTabViewIndex() === 3) {
            if ((typeof this.groep !== "undefined" &&
                this.groep !== null ? this.groep.id : void 0) != null) {
                switch (this.optionCategory.name) {
                    case "raft":
                        this.getRaftingCustomers();
                        break;
                    case "canyon":
                        this.getCanyoningCustomers();
                        break;
                    case "special":
                        this.getSpecialCustomers();
                        break;
                }
            }
        }
    };
    OptionsComponent.prototype.getGroeps = function () {
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
                console.log("found me some groeps");
                _this.groep = _this.groeps[0];
                _this.getOptionCategories();
            }
            _this.isBusy = false;
        }, function (error) {
            console.dir(error);
            _this.hasGroeps = false;
            _this.isBusy = false;
            /*TODO: handle errors*/
        });
    };
    OptionsComponent.prototype.getOptionCategories = function () {
        var _this = this;
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
            if (_this.optionCategories.length > 0) {
                _this.optionCategory = _this.optionCategories[0];
                _this.getActivities();
            }
            else {
                _this.isBusy = false;
            }
        }, function (error) {
            console.dir(error);
            _this.isBusy = false;
            /*TODO: handle errors*/
        });
    };
    OptionsComponent.prototype.getRaftingCustomers = function () {
        var _this = this;
        this.customerService.getAllByGroepWithRaftingOptionAction(this.groep.id)
            .subscribe(function (result) {
            _this.raftingCustomers = result;
            _this.hasRaftingCustomers = true;
            console.log("found me some rafting customers");
            _this.isBusy = false;
        }, function (error) {
            console.dir(error);
            _this.hasRaftingCustomers = false;
            _this.isBusy = false;
            /*TODO: handle errors*/
        });
    };
    OptionsComponent.prototype.getCanyoningCustomers = function () {
        var _this = this;
        this.customerService.getAllByGroepWithCanyoningOptionAction(this.groep.id)
            .subscribe(function (result) {
            var i = 0;
            for (var _i = 0, result_1 = result; _i < result_1.length; _i++) {
                var canyoningCustomer = result_1[_i];
                canyoningCustomer.possibleActivitiesFull =
                    _this.mapCustomerActivitiesFull(canyoningCustomer.possibleActivities);
                canyoningCustomer.possibleActivities =
                    _this.mapCustomerActivitiesName(canyoningCustomer.possibleActivities);
                result[i] = canyoningCustomer;
                i++;
            }
            _this.canyoningCustomers = result;
            _this.hasCanyoningCustomers = true;
            console.log("found me some customers");
            _this.isBusy = false;
        }, function (error) {
            console.dir(error);
            _this.hasCanyoningCustomers = false;
            _this.isBusy = false;
            /*TODO: handle errors*/
        });
    };
    OptionsComponent.prototype.getSpecialCustomers = function () {
        var _this = this;
        this.customerService.getAllByGroepWithSpecialOptionAction(this.groep.id)
            .subscribe(function (result) {
            var i = 0;
            for (var _i = 0, result_2 = result; _i < result_2.length; _i++) {
                var specialCustomer = result_2[_i];
                specialCustomer.possibleActivitiesFull =
                    _this.mapCustomerActivitiesFull(specialCustomer.possibleActivities);
                specialCustomer.possibleActivities =
                    _this.mapCustomerActivitiesName(specialCustomer.possibleActivities);
                result[i] = specialCustomer;
                i++;
            }
            _this.specialCustomers = result;
            _this.hasSpecialCustomers = true;
            console.log("found me some customers");
            _this.isBusy = false;
        }, function (error) {
            console.dir(error);
            _this.hasSpecialCustomers = false;
            _this.isBusy = false;
            /*TODO: handle errors*/
        });
    };
    OptionsComponent.prototype.getActivities = function () {
        var _this = this;
        if ((typeof this.optionCategory !== "undefined" &&
            this.optionCategory !== null ? this.optionCategory.id : void 0) != null &&
            this.optionCategory.name === "raft") {
            this.optionService.getAllActivitiesByCategoryAction(this.optionCategory.id)
                .subscribe(function (result) {
                _this.activities = [{ key: "0", label: "Kies een activiteit" }];
                _this.activities = _this.activities.concat(result.map(function (_a) {
                    var id = _a.id, name = _a.name;
                    return ({ key: id, label: name });
                }));
                console.log("got me some activities");
                _this.getCustomers();
            }, function (error) {
                console.dir(error);
                /*TODO: handle errors*/
            });
        }
        else {
            this.getCustomers();
        }
    };
    OptionsComponent.prototype.dfPropertyCommittedRafting = function (args) {
        var dataForm = args.object;
        var raftingCustomer = JSON.parse(dataForm.editedObject);
        this.customerService.putCustomerRaftingOptionAction(raftingCustomer)
            .subscribe(function () {
            console.log("Updated rafting customer");
        }, function (error) {
            console.dir(error);
            /*TODO: handle errors*/
        });
    };
    OptionsComponent.prototype.dfPropertyCommittedCanyoning = function (args) {
        var dataForm = args.object;
        var canyoningCustomer = JSON.parse(dataForm.editedObject);
        canyoningCustomer.activityIds = (typeof canyoningCustomer.activityIds === "string" &&
            canyoningCustomer.activityIds.length > 2)
            || (typeof canyoningCustomer.activityIds === "object" &&
                canyoningCustomer.activityIds.length !== 0) ? this.getActivityIds(canyoningCustomer.activityIds, canyoningCustomer.possibleActivitiesFull) : [];
        if (canyoningCustomer.activityIds) {
            canyoningCustomer.activityIds = JSON.stringify(canyoningCustomer.activityIds);
            this.customerService.putCustomerCanyoningOptionAction(canyoningCustomer)
                .subscribe(function () {
                console.log("Updated canyoning customer");
            }, function (error) {
                console.dir(error);
                /*TODO: handle errors*/
            });
        }
    };
    OptionsComponent.prototype.getActivityIds = function (activities, activitiesFull) {
        var activitiesIds = [];
        /*suddenly activities is a string*/
        if (typeof activities === "string") {
            var stringBuild = "";
            /*Remove [ ]*/
            var i = 1;
            var lengthString = activities.length;
            for (var _i = 0, activities_1 = activities; _i < activities_1.length; _i++) {
                var letter = activities_1[_i];
                if (i !== 1 && i < lengthString) {
                    stringBuild += letter;
                }
                i++;
            }
            stringBuild.replace(/\s/g, "");
            var textArr = stringBuild.split(",");
            var arrActivities = [];
            for (var _a = 0, textArr_1 = textArr; _a < textArr_1.length; _a++) {
                var text = textArr_1[_a];
                arrActivities.push(String(text));
            }
            activities = arrActivities;
        }
        var _loop_1 = function (activityName) {
            var activityId = activitiesFull
                .find(function (x) { return x.label === activityName.trim(); }).key;
            activitiesIds.push(activityId);
        };
        for (var _b = 0, activities_2 = activities; _b < activities_2.length; _b++) {
            var activityName = activities_2[_b];
            _loop_1(activityName);
        }
        return activitiesIds;
    };
    OptionsComponent.prototype.mapCustomerActivitiesName = function (activities) {
        return activities.map(function (_a) {
            var id = _a.id, name = _a.name;
            return (name);
        });
    };
    OptionsComponent.prototype.mapCustomerActivitiesFull = function (activities) {
        return activities.map(function (_a) {
            var id = _a.id, name = _a.name;
            return ({ key: id, label: name });
        });
    };
    OptionsComponent.prototype.dfPropertyCommittedSpecial = function (args) {
        var dataForm = args.object;
        var specialCustomer = JSON.parse(dataForm.editedObject);
        specialCustomer.activityIds = (typeof specialCustomer.activityIds === "string" &&
            specialCustomer.activityIds.length > 2)
            || (typeof specialCustomer.activityIds === "object" &&
                specialCustomer.activityIds.length !== 0) ? this.getActivityIds(specialCustomer.activityIds, specialCustomer.possibleActivitiesFull) : [];
        if (specialCustomer.activityIds) {
            specialCustomer.activityIds = JSON.stringify(specialCustomer.activityIds);
            this.customerService.putCustomerSpecialOptionAction(specialCustomer)
                .subscribe(function () {
                console.log("Updated special customer");
            }, function (error) {
                console.dir(error);
                /*TODO: handle errors*/
            });
        }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3B0aW9ucy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJvcHRpb25zLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFrRDtBQUdsRCxpREFBZ0Q7QUFDaEQsbUVBQW1GO0FBQ25GLGdEQUErQztBQU8vQyx1RUFBcUU7QUFDckUsaUVBQStEO0FBQy9ELG1FQUFpRTtBQVFqRTtJQTZCSSwwQkFBb0IsWUFBMEIsRUFBVSxlQUFnQyxFQUNwRSxJQUFVLEVBQVUsYUFBNEI7UUFEaEQsaUJBQVksR0FBWixZQUFZLENBQWM7UUFBVSxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDcEUsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUFVLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBNUJwRSxXQUFNLEdBQWlCLEVBQUUsQ0FBQztRQUMxQixlQUFVLEdBQVcsRUFBRSxDQUFDO1FBRXhCLGNBQVMsR0FBWSxLQUFLLENBQUM7UUFFM0IsV0FBTSxHQUFZLElBQUksQ0FBQztRQUV2QixlQUFVLEdBQWUsRUFBRSxDQUFDO1FBRTVCLHFCQUFnQixHQUEwQixFQUFFLENBQUM7UUFDN0Msd0JBQW1CLEdBQTRCLEVBQUUsQ0FBQztRQUNsRCxtQkFBYyxHQUFtQjtZQUM3QixFQUFFLEVBQUUsR0FBRztZQUNQLElBQUksRUFBRSxFQUFFO1NBQ1gsQ0FBQztRQUVGLHVCQUFrQixHQUFXLENBQUMsQ0FBQztRQUUvQix3QkFBbUIsR0FBWSxLQUFLLENBQUM7UUFDckMscUJBQWdCLEdBQTJCLEVBQUUsQ0FBQztRQUU5QywwQkFBcUIsR0FBWSxLQUFLLENBQUM7UUFDdkMsdUJBQWtCLEdBQTZCLEVBQUUsQ0FBQztRQUVsRCx3QkFBbUIsR0FBWSxLQUFLLENBQUM7UUFDckMscUJBQWdCLEdBQTJCLEVBQUUsQ0FBQztJQUk5QyxDQUFDO0lBRUQsbUNBQVEsR0FBUjtRQUFBLGlCQU1DO1FBTEcsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENB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Qzt5Q0E4Qm9DLDRCQUFZLEVBQTJCLGtDQUFlO1lBQzlELFdBQUksRUFBeUIsOEJBQWE7T0E5QjNELGdCQUFnQixDQXFYNUI7SUFBRCx1QkFBQztDQUFBLEFBclhELElBcVhDO0FBclhZLDRDQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IFJhZERhdGFGb3JtIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC11aS1kYXRhZm9ybVwiO1xuaW1wb3J0IHsgTGlzdFBpY2tlciB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2xpc3QtcGlja2VyXCI7XG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvcGFnZVwiO1xuaW1wb3J0IHsgU2VnbWVudGVkQmFyLCBTZWdtZW50ZWRCYXJJdGVtIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvc2VnbWVudGVkLWJhclwiO1xuaW1wb3J0IHsgU2V0dGluZ3MgfSBmcm9tIFwifi9zZXR0aW5ncy9zZXR0aW5nc1wiO1xuaW1wb3J0IHsgQWN0aXZpdHkgfSBmcm9tIFwifi9zaGFyZWQvbW9kZWxzL2FjdGl2aXR5Lm1vZGVsXCI7XG5pbXBvcnQgeyBDYW55b25pbmdDdXN0b21lciB9IGZyb20gXCJ+L3NoYXJlZC9tb2RlbHMvY2FueW9uaW5nQ3VzdG9tZXIubW9kZWxcIjtcbmltcG9ydCB7IEdyb2VwIH0gZnJvbSBcIn4vc2hhcmVkL21vZGVscy9ncm9lcC5tb2RlbFwiO1xuaW1wb3J0IHsgT3B0aW9uQ2F0ZWdvcnkgfSBmcm9tIFwifi9zaGFyZWQvbW9kZWxzL29wdGlvbkNhdGVnb3J5Lm1vZGVsXCI7XG5pbXBvcnQgeyBSYWZ0aW5nQ3VzdG9tZXIgfSBmcm9tIFwifi9zaGFyZWQvbW9kZWxzL3JhZnRpbmdDdXN0b21lci5tb2RlbFwiO1xuaW1wb3J0IHsgU3BlY2lhbEN1c3RvbWVyIH0gZnJvbSBcIn4vc2hhcmVkL21vZGVscy9zcGVjaWFsQ3VzdG9tZXIubW9kZWxcIjtcbmltcG9ydCB7IEN1c3RvbWVyU2VydmljZSB9IGZyb20gXCJ+L3NoYXJlZC9zZXJ2aWNlcy9jdXN0b21lci5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBHcm9lcFNlcnZpY2UgfSBmcm9tIFwifi9zaGFyZWQvc2VydmljZXMvZ3JvZXAuc2VydmljZVwiO1xuaW1wb3J0IHsgT3B0aW9uU2VydmljZSB9IGZyb20gXCJ+L3NoYXJlZC9zZXJ2aWNlcy9vcHRpb24uc2VydmljZVwiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJPcHRpb25zXCIsXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICBwcm92aWRlcnM6IFtHcm9lcFNlcnZpY2UsIEN1c3RvbWVyU2VydmljZSwgT3B0aW9uU2VydmljZV0sXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9vcHRpb25zLmNvbXBvbmVudC5odG1sXCJcbn0pXG5leHBvcnQgY2xhc3MgT3B0aW9uc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgICBncm9lcHM6IEFycmF5PEdyb2VwPiA9IFtdO1xuICAgIGdyb2VwSXRlbXM6IG9iamVjdCA9IHt9O1xuICAgIGdyb2VwOiBHcm9lcDtcbiAgICBoYXNHcm9lcHM6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIGlzQnVzeTogYm9vbGVhbiA9IHRydWU7XG5cbiAgICBhY3Rpdml0aWVzOiBBcnJheTxhbnk+ID0gW107XG5cbiAgICBvcHRpb25DYXRlZ29yaWVzOiBBcnJheTxPcHRpb25DYXRlZ29yeT4gPSBbXTtcbiAgICBvcHRpb25DYXRlZ29yeUl0ZW1zOiBBcnJheTxTZWdtZW50ZWRCYXJJdGVtPiA9IFtdO1xuICAgIG9wdGlvbkNhdGVnb3J5OiBPcHRpb25DYXRlZ29yeSA9IHtcbiAgICAgICAgaWQ6IFwiMVwiLFxuICAgICAgICBuYW1lOiBcIlwiXG4gICAgfTtcblxuICAgIHNlbGVjdGVkR3JvZXBJbmRleDogbnVtYmVyID0gMDtcblxuICAgIGhhc1JhZnRpbmdDdXN0b21lcnM6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICByYWZ0aW5nQ3VzdG9tZXJzOiBBcnJheTxSYWZ0aW5nQ3VzdG9tZXI+ID0gW107XG5cbiAgICBoYXNDYW55b25pbmdDdXN0b21lcnM6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBjYW55b25pbmdDdXN0b21lcnM6IEFycmF5PENhbnlvbmluZ0N1c3RvbWVyPiA9IFtdO1xuXG4gICAgaGFzU3BlY2lhbEN1c3RvbWVyczogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHNwZWNpYWxDdXN0b21lcnM6IEFycmF5PFNwZWNpYWxDdXN0b21lcj4gPSBbXTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZ3JvZXBTZXJ2aWNlOiBHcm9lcFNlcnZpY2UsIHByaXZhdGUgY3VzdG9tZXJTZXJ2aWNlOiBDdXN0b21lclNlcnZpY2UsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBwYWdlOiBQYWdlLCBwcml2YXRlIG9wdGlvblNlcnZpY2U6IE9wdGlvblNlcnZpY2UpIHtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5wYWdlLm9uKFBhZ2UubmF2aWdhdGluZ1RvRXZlbnQsICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuaXNCdXN5ID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuZ2V0R3JvZXBzKCk7XG4gICAgICAgIH0pO1xuXG4gICAgfVxuXG4gICAgc2VsZWN0ZWRHcm9lcEluZGV4Q2hhbmdlZChhcmdzKSB7XG4gICAgICAgIHRoaXMuaXNCdXN5ID0gdHJ1ZTtcbiAgICAgICAgY29uc3QgcGlja2VyID0gPExpc3RQaWNrZXI+YXJncy5vYmplY3Q7XG5cbiAgICAgICAgaWYgKHRoaXMuZ3JvZXBzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHRoaXMuZ3JvZXAgPSB0aGlzLmdyb2Vwc1twaWNrZXIuc2VsZWN0ZWRJbmRleF07XG5cbiAgICAgICAgICAgIGlmICgodHlwZW9mIHRoaXMub3B0aW9uQ2F0ZWdvcnkgIT09IFwidW5kZWZpbmVkXCIgJiZcbiAgICAgICAgICAgIHRoaXMub3B0aW9uQ2F0ZWdvcnkgIT09IG51bGwgPyB0aGlzLm9wdGlvbkNhdGVnb3J5LmlkIDogdm9pZCAwKSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5nZXRPcHRpb25DYXRlZ29yaWVzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIHNlbGVjdGVkT3B0aW9uQ2F0ZWdvcnlJbmRleENoYW5nZWQoYXJncykge1xuICAgICAgICB0aGlzLmlzQnVzeSA9IHRydWU7XG5cbiAgICAgICAgY29uc3Qgc2VnbWVudGVkQmFyID0gPFNlZ21lbnRlZEJhcj5hcmdzLm9iamVjdDtcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRJbmRleCA9IHNlZ21lbnRlZEJhci5zZWxlY3RlZEluZGV4O1xuXG4gICAgICAgIGlmICh0aGlzLm9wdGlvbkNhdGVnb3JpZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdGhpcy5vcHRpb25DYXRlZ29yeSA9IHRoaXMub3B0aW9uQ2F0ZWdvcmllc1tzZWxlY3RlZEluZGV4XTtcbiAgICAgICAgICAgIHRoaXMuZ2V0QWN0aXZpdGllcygpO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBnZXRDdXN0b21lcnMoKTogdm9pZCB7XG4gICAgICAgIGlmIChTZXR0aW5ncy5nZXRDdXJyZW50VGFiVmlld0luZGV4KCkgPT09IDMpIHtcblxuICAgICAgICAgICAgaWYgKCh0eXBlb2YgdGhpcy5ncm9lcCAhPT0gXCJ1bmRlZmluZWRcIiAmJlxuICAgICAgICAgICAgdGhpcy5ncm9lcCAhPT0gbnVsbCA/IHRoaXMuZ3JvZXAuaWQgOiB2b2lkIDApICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHRoaXMub3B0aW9uQ2F0ZWdvcnkubmFtZSkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIFwicmFmdFwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRSYWZ0aW5nQ3VzdG9tZXJzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiY2FueW9uXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdldENhbnlvbmluZ0N1c3RvbWVycygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcInNwZWNpYWxcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0U3BlY2lhbEN1c3RvbWVycygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0R3JvZXBzKCk6IHZvaWQge1xuICAgICAgICBjb25zdCBsb2NhdGlvbklkID0gU2V0dGluZ3MuZ2V0TG9jYXRpb24oKTtcbiAgICAgICAgY29uc3QgZGF0ZSA9IFNldHRpbmdzLmdldERhdGUoKTtcblxuICAgICAgICB0aGlzLmdyb2VwU2VydmljZS5nZXRBbGxHcm9lcHNGb3JXZWVrQW5kTG9jYXRpb25BY3Rpb24oZGF0ZSwgbG9jYXRpb25JZClcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgKHJlc3VsdDogQXJyYXk8R3JvZXA+KSA9PiB7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ncm9lcHMgPSByZXN1bHQ7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZ3JvZXBzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ3JvZXBJdGVtcyA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtczogdGhpcy5ncm9lcHMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVuZ3RoOiB0aGlzLmdyb2Vwcy5sZW5ndGgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2V0SXRlbTogKGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSB0aGlzLmdyb2Vwc1tpbmRleF07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW0ubmFtZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oYXNHcm9lcHMgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJmb3VuZCBtZSBzb21lIGdyb2Vwc1wiKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ncm9lcCA9IHRoaXMuZ3JvZXBzWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRPcHRpb25DYXRlZ29yaWVzKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc0J1c3kgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZGlyKGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYXNHcm9lcHMgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc0J1c3kgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgICAgICAvKlRPRE86IGhhbmRsZSBlcnJvcnMqL1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7XG4gICAgfVxuXG4gICAgZ2V0T3B0aW9uQ2F0ZWdvcmllcygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5vcHRpb25TZXJ2aWNlLmdldEFsbENhdGVnb3JpZXNBY3Rpb24oKVxuICAgICAgICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICAocmVzdWx0OiBBcnJheTxPcHRpb25DYXRlZ29yeT4pID0+IHtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbkNhdGVnb3JpZXMgPSByZXN1bHQ7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZm91bmQgbWUgc29tZSBvcHRpb25DYXRlZ29yaWVzXCIpO1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3B0aW9uQ2F0ZWdvcnlJdGVtcyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IG9wdGlvbkNhdGVnb3J5IG9mIHRoaXMub3B0aW9uQ2F0ZWdvcmllcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2VnbWVudGVkQmFySXRlbSA9IDxTZWdtZW50ZWRCYXJJdGVtPm5ldyBTZWdtZW50ZWRCYXJJdGVtKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWdtZW50ZWRCYXJJdGVtLnRpdGxlID0gb3B0aW9uQ2F0ZWdvcnkubmFtZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3B0aW9uQ2F0ZWdvcnlJdGVtcy5wdXNoKHNlZ21lbnRlZEJhckl0ZW0pO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9uQ2F0ZWdvcmllcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbkNhdGVnb3J5ID0gdGhpcy5vcHRpb25DYXRlZ29yaWVzWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRBY3Rpdml0aWVzKCk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmlzQnVzeSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmRpcihlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNCdXN5ID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICAgICAgLypUT0RPOiBoYW5kbGUgZXJyb3JzKi9cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuICAgIH1cblxuICAgIGdldFJhZnRpbmdDdXN0b21lcnMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuY3VzdG9tZXJTZXJ2aWNlLmdldEFsbEJ5R3JvZXBXaXRoUmFmdGluZ09wdGlvbkFjdGlvbih0aGlzLmdyb2VwLmlkKVxuICAgICAgICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICAocmVzdWx0OiBBcnJheTxSYWZ0aW5nQ3VzdG9tZXI+KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmFmdGluZ0N1c3RvbWVycyA9IHJlc3VsdDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYXNSYWZ0aW5nQ3VzdG9tZXJzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJmb3VuZCBtZSBzb21lIHJhZnRpbmcgY3VzdG9tZXJzXCIpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzQnVzeSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZGlyKGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYXNSYWZ0aW5nQ3VzdG9tZXJzID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNCdXN5ID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICAgICAgLypUT0RPOiBoYW5kbGUgZXJyb3JzKi9cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuXG4gICAgfVxuXG4gICAgZ2V0Q2FueW9uaW5nQ3VzdG9tZXJzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmN1c3RvbWVyU2VydmljZS5nZXRBbGxCeUdyb2VwV2l0aENhbnlvbmluZ09wdGlvbkFjdGlvbih0aGlzLmdyb2VwLmlkKVxuICAgICAgICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICAocmVzdWx0OiBBcnJheTxDYW55b25pbmdDdXN0b21lcj4pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGkgPSAwO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGNhbnlvbmluZ0N1c3RvbWVyIG9mIHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FueW9uaW5nQ3VzdG9tZXIucG9zc2libGVBY3Rpdml0aWVzRnVsbCA9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXBDdXN0b21lckFjdGl2aXRpZXNGdWxsKGNhbnlvbmluZ0N1c3RvbWVyLnBvc3NpYmxlQWN0aXZpdGllcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYW55b25pbmdDdXN0b21lci5wb3NzaWJsZUFjdGl2aXRpZXMgPVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWFwQ3VzdG9tZXJBY3Rpdml0aWVzTmFtZShjYW55b25pbmdDdXN0b21lci5wb3NzaWJsZUFjdGl2aXRpZXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0W2ldID0gY2FueW9uaW5nQ3VzdG9tZXI7XG4gICAgICAgICAgICAgICAgICAgICAgICBpKys7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jYW55b25pbmdDdXN0b21lcnMgPSByZXN1bHQ7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGFzQ2FueW9uaW5nQ3VzdG9tZXJzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJmb3VuZCBtZSBzb21lIGN1c3RvbWVyc1wiKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc0J1c3kgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZGlyKGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYXNDYW55b25pbmdDdXN0b21lcnMgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc0J1c3kgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgICAgICAvKlRPRE86IGhhbmRsZSBlcnJvcnMqL1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7XG5cbiAgICB9XG5cbiAgICBnZXRTcGVjaWFsQ3VzdG9tZXJzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmN1c3RvbWVyU2VydmljZS5nZXRBbGxCeUdyb2VwV2l0aFNwZWNpYWxPcHRpb25BY3Rpb24odGhpcy5ncm9lcC5pZClcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgKHJlc3VsdDogQXJyYXk8U3BlY2lhbEN1c3RvbWVyPikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBsZXQgaSA9IDA7XG4gICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3Qgc3BlY2lhbEN1c3RvbWVyIG9mIHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3BlY2lhbEN1c3RvbWVyLnBvc3NpYmxlQWN0aXZpdGllc0Z1bGwgPVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWFwQ3VzdG9tZXJBY3Rpdml0aWVzRnVsbChzcGVjaWFsQ3VzdG9tZXIucG9zc2libGVBY3Rpdml0aWVzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNwZWNpYWxDdXN0b21lci5wb3NzaWJsZUFjdGl2aXRpZXMgPVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWFwQ3VzdG9tZXJBY3Rpdml0aWVzTmFtZShzcGVjaWFsQ3VzdG9tZXIucG9zc2libGVBY3Rpdml0aWVzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdFtpXSA9IHNwZWNpYWxDdXN0b21lcjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGkrKztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNwZWNpYWxDdXN0b21lcnMgPSByZXN1bHQ7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGFzU3BlY2lhbEN1c3RvbWVycyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZm91bmQgbWUgc29tZSBjdXN0b21lcnNcIik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNCdXN5ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5kaXIoZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhc1NwZWNpYWxDdXN0b21lcnMgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc0J1c3kgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgICAgICAvKlRPRE86IGhhbmRsZSBlcnJvcnMqL1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7XG5cbiAgICB9XG5cbiAgICBnZXRBY3Rpdml0aWVzKCk6IHZvaWQge1xuICAgICAgICBpZiAoKHR5cGVvZiB0aGlzLm9wdGlvbkNhdGVnb3J5ICE9PSBcInVuZGVmaW5lZFwiICYmXG4gICAgICAgIHRoaXMub3B0aW9uQ2F0ZWdvcnkgIT09IG51bGwgPyB0aGlzLm9wdGlvbkNhdGVnb3J5LmlkIDogdm9pZCAwKSAhPSBudWxsICYmXG4gICAgICAgICAgICB0aGlzLm9wdGlvbkNhdGVnb3J5Lm5hbWUgPT09IFwicmFmdFwiKSB7XG4gICAgICAgICAgICB0aGlzLm9wdGlvblNlcnZpY2UuZ2V0QWxsQWN0aXZpdGllc0J5Q2F0ZWdvcnlBY3Rpb24odGhpcy5vcHRpb25DYXRlZ29yeS5pZClcbiAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICAocmVzdWx0OiBBcnJheTxBY3Rpdml0eT4pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0aXZpdGllcyA9IFt7a2V5OiBcIjBcIiwgbGFiZWw6IFwiS2llcyBlZW4gYWN0aXZpdGVpdFwifV07XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFjdGl2aXRpZXMgPSBbLi4udGhpcy5hY3Rpdml0aWVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC4uLnJlc3VsdC5tYXAoKHtpZCwgbmFtZX0pID0+ICh7a2V5OiBpZCwgbGFiZWw6IG5hbWV9KSldO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImdvdCBtZSBzb21lIGFjdGl2aXRpZXNcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdldEN1c3RvbWVycygpO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZGlyKGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8qVE9ETzogaGFuZGxlIGVycm9ycyovXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5nZXRDdXN0b21lcnMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRmUHJvcGVydHlDb21taXR0ZWRSYWZ0aW5nKGFyZ3MpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgZGF0YUZvcm0gPSA8UmFkRGF0YUZvcm0+YXJncy5vYmplY3Q7XG4gICAgICAgIGNvbnN0IHJhZnRpbmdDdXN0b21lcjogUmFmdGluZ0N1c3RvbWVyID0gPFJhZnRpbmdDdXN0b21lcj4gSlNPTi5wYXJzZShkYXRhRm9ybS5lZGl0ZWRPYmplY3QpO1xuXG4gICAgICAgIHRoaXMuY3VzdG9tZXJTZXJ2aWNlLnB1dEN1c3RvbWVyUmFmdGluZ09wdGlvbkFjdGlvbihyYWZ0aW5nQ3VzdG9tZXIpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJVcGRhdGVkIHJhZnRpbmcgY3VzdG9tZXJcIik7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5kaXIoZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICAvKlRPRE86IGhhbmRsZSBlcnJvcnMqL1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7XG4gICAgfVxuXG4gICAgZGZQcm9wZXJ0eUNvbW1pdHRlZENhbnlvbmluZyhhcmdzKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGRhdGFGb3JtID0gPFJhZERhdGFGb3JtPmFyZ3Mub2JqZWN0O1xuICAgICAgICBjb25zdCBjYW55b25pbmdDdXN0b21lcjogQ2FueW9uaW5nQ3VzdG9tZXIgPSA8Q2FueW9uaW5nQ3VzdG9tZXI+IEpTT04ucGFyc2UoZGF0YUZvcm0uZWRpdGVkT2JqZWN0KTtcbiAgICAgICAgY2FueW9uaW5nQ3VzdG9tZXIuYWN0aXZpdHlJZHMgPSAodHlwZW9mIGNhbnlvbmluZ0N1c3RvbWVyLmFjdGl2aXR5SWRzID09PSBcInN0cmluZ1wiICYmXG4gICAgICAgICAgICBjYW55b25pbmdDdXN0b21lci5hY3Rpdml0eUlkcy5sZW5ndGggPiAyKVxuICAgICAgICB8fCAodHlwZW9mIGNhbnlvbmluZ0N1c3RvbWVyLmFjdGl2aXR5SWRzID09PSBcIm9iamVjdFwiICYmXG4gICAgICAgICAgICBjYW55b25pbmdDdXN0b21lci5hY3Rpdml0eUlkcy5sZW5ndGggIT09IDApID8gdGhpcy5nZXRBY3Rpdml0eUlkcyhjYW55b25pbmdDdXN0b21lci5hY3Rpdml0eUlkcyxcbiAgICAgICAgICAgIGNhbnlvbmluZ0N1c3RvbWVyLnBvc3NpYmxlQWN0aXZpdGllc0Z1bGwpIDogW107XG5cbiAgICAgICAgaWYgKGNhbnlvbmluZ0N1c3RvbWVyLmFjdGl2aXR5SWRzKSB7XG4gICAgICAgICAgICBjYW55b25pbmdDdXN0b21lci5hY3Rpdml0eUlkcyA9IEpTT04uc3RyaW5naWZ5KGNhbnlvbmluZ0N1c3RvbWVyLmFjdGl2aXR5SWRzKTtcblxuICAgICAgICAgICAgdGhpcy5jdXN0b21lclNlcnZpY2UucHV0Q3VzdG9tZXJDYW55b25pbmdPcHRpb25BY3Rpb24oY2FueW9uaW5nQ3VzdG9tZXIpXG4gICAgICAgICAgICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJVcGRhdGVkIGNhbnlvbmluZyBjdXN0b21lclwiKTtcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmRpcihlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgICAgICAvKlRPRE86IGhhbmRsZSBlcnJvcnMqL1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldEFjdGl2aXR5SWRzKGFjdGl2aXRpZXMsIGFjdGl2aXRpZXNGdWxsKTogQXJyYXk8c3RyaW5nPiB7XG4gICAgICAgIGNvbnN0IGFjdGl2aXRpZXNJZHMgPSBbXTtcbiAgICAgICAgLypzdWRkZW5seSBhY3Rpdml0aWVzIGlzIGEgc3RyaW5nKi9cblxuICAgICAgICBpZiAodHlwZW9mIGFjdGl2aXRpZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgIGxldCBzdHJpbmdCdWlsZCA9IFwiXCI7XG4gICAgICAgICAgICAvKlJlbW92ZSBbIF0qL1xuICAgICAgICAgICAgbGV0IGkgPSAxO1xuICAgICAgICAgICAgY29uc3QgbGVuZ3RoU3RyaW5nID0gYWN0aXZpdGllcy5sZW5ndGg7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGxldHRlciBvZiBhY3Rpdml0aWVzKSB7XG4gICAgICAgICAgICAgICAgaWYgKGkgIT09IDEgJiYgaSA8IGxlbmd0aFN0cmluZykge1xuICAgICAgICAgICAgICAgICAgICBzdHJpbmdCdWlsZCArPSBsZXR0ZXI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGkrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHN0cmluZ0J1aWxkLnJlcGxhY2UoL1xccy9nLCBcIlwiKTtcbiAgICAgICAgICAgIGNvbnN0IHRleHRBcnIgPSBzdHJpbmdCdWlsZC5zcGxpdChcIixcIik7XG4gICAgICAgICAgICBjb25zdCBhcnJBY3Rpdml0aWVzID0gW107XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHRleHQgb2YgdGV4dEFycikge1xuICAgICAgICAgICAgICAgIGFyckFjdGl2aXRpZXMucHVzaChTdHJpbmcodGV4dCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYWN0aXZpdGllcyA9IGFyckFjdGl2aXRpZXM7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGNvbnN0IGFjdGl2aXR5TmFtZSBvZiBhY3Rpdml0aWVzKSB7XG4gICAgICAgICAgICBjb25zdCBhY3Rpdml0eUlkID0gYWN0aXZpdGllc0Z1bGxcbiAgICAgICAgICAgICAgICAuZmluZCgoeCkgPT4geC5sYWJlbCA9PT0gYWN0aXZpdHlOYW1lLnRyaW0oKSkua2V5O1xuICAgICAgICAgICAgYWN0aXZpdGllc0lkcy5wdXNoKGFjdGl2aXR5SWQpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGFjdGl2aXRpZXNJZHM7XG4gICAgfVxuXG4gICAgbWFwQ3VzdG9tZXJBY3Rpdml0aWVzTmFtZShhY3Rpdml0aWVzKSB7XG4gICAgICAgIHJldHVybiBhY3Rpdml0aWVzLm1hcCgoe2lkLCBuYW1lfSkgPT4gKG5hbWUpKTtcbiAgICB9XG5cbiAgICBtYXBDdXN0b21lckFjdGl2aXRpZXNGdWxsKGFjdGl2aXRpZXMpIHtcbiAgICAgICAgcmV0dXJuIGFjdGl2aXRpZXMubWFwKCh7aWQsIG5hbWV9KSA9PiAoe2tleTogaWQsIGxhYmVsOiBuYW1lfSkpO1xuICAgIH1cblxuICAgIGRmUHJvcGVydHlDb21taXR0ZWRTcGVjaWFsKGFyZ3MpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgZGF0YUZvcm0gPSA8UmFkRGF0YUZvcm0+YXJncy5vYmplY3Q7XG4gICAgICAgIGNvbnN0IHNwZWNpYWxDdXN0b21lcjogU3BlY2lhbEN1c3RvbWVyID0gPFNwZWNpYWxDdXN0b21lcj4gSlNPTi5wYXJzZShkYXRhRm9ybS5lZGl0ZWRPYmplY3QpO1xuXG4gICAgICAgIHNwZWNpYWxDdXN0b21lci5hY3Rpdml0eUlkcyA9ICh0eXBlb2Ygc3BlY2lhbEN1c3RvbWVyLmFjdGl2aXR5SWRzID09PSBcInN0cmluZ1wiICYmXG4gICAgICAgICAgICBzcGVjaWFsQ3VzdG9tZXIuYWN0aXZpdHlJZHMubGVuZ3RoID4gMilcbiAgICAgICAgfHwgKHR5cGVvZiBzcGVjaWFsQ3VzdG9tZXIuYWN0aXZpdHlJZHMgPT09IFwib2JqZWN0XCIgJiZcbiAgICAgICAgICAgIHNwZWNpYWxDdXN0b21lci5hY3Rpdml0eUlkcy5sZW5ndGggIT09IDApID8gdGhpcy5nZXRBY3Rpdml0eUlkcyhzcGVjaWFsQ3VzdG9tZXIuYWN0aXZpdHlJZHMsXG4gICAgICAgICAgICBzcGVjaWFsQ3VzdG9tZXIucG9zc2libGVBY3Rpdml0aWVzRnVsbCkgOiBbXTtcblxuICAgICAgICBpZiAoc3BlY2lhbEN1c3RvbWVyLmFjdGl2aXR5SWRzKSB7XG4gICAgICAgICAgICBzcGVjaWFsQ3VzdG9tZXIuYWN0aXZpdHlJZHMgPSBKU09OLnN0cmluZ2lmeShzcGVjaWFsQ3VzdG9tZXIuYWN0aXZpdHlJZHMpO1xuXG4gICAgICAgICAgICB0aGlzLmN1c3RvbWVyU2VydmljZS5wdXRDdXN0b21lclNwZWNpYWxPcHRpb25BY3Rpb24oc3BlY2lhbEN1c3RvbWVyKVxuICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVXBkYXRlZCBzcGVjaWFsIGN1c3RvbWVyXCIpO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZGlyKGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8qVE9ETzogaGFuZGxlIGVycm9ycyovXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG59XG4iXX0=