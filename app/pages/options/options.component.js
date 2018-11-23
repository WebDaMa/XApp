"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var app = require("tns-core-modules/application");
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
        this.getGroeps();
    };
    OptionsComponent.prototype.selectedGroepIndexChanged = function (args) {
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
        var segmentedBar = args.object;
        var selectedIndex = segmentedBar.selectedIndex;
        if (this.optionCategories.length > 0) {
            this.optionCategory = this.optionCategories[selectedIndex];
            this.getActivities();
        }
    };
    OptionsComponent.prototype.getCustomers = function () {
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
    };
    OptionsComponent.prototype.getGroeps = function () {
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
        this.isBusy = true;
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
        this.isBusy = true;
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
        this.isBusy = true;
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
        this.isBusy = true;
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
            this.isBusy = true;
            this.optionService.getAllActivitiesByCategoryAction(this.optionCategory.id)
                .subscribe(function (result) {
                _this.activities = [{ key: "0", label: "Kies een activiteit" }];
                _this.activities = _this.activities.concat(result.map(function (_a) {
                    var id = _a.id, name = _a.name;
                    return ({ key: id, label: name });
                }));
                console.log("got me some activities");
                _this.isBusy = false;
                _this.getCustomers();
            }, function (error) {
                console.dir(error);
                _this.isBusy = false;
                /*TODO: handle errors*/
            });
        }
        else {
            this.getCustomers();
        }
    };
    OptionsComponent.prototype.dfPropertyCommittedRafting = function (args) {
        var _this = this;
        var dataForm = args.object;
        var raftingCustomer = JSON.parse(dataForm.editedObject);
        this.isBusy = true;
        this.customerService.putCustomerRaftingOptionAction(raftingCustomer)
            .subscribe(function () {
            _this.isBusy = false;
            console.log("Updated rafting customer");
        }, function (error) {
            console.dir(error);
            _this.isBusy = false;
            /*TODO: handle errors*/
        });
    };
    OptionsComponent.prototype.dfPropertyCommittedCanyoning = function (args) {
        var _this = this;
        var dataForm = args.object;
        var canyoningCustomer = JSON.parse(dataForm.editedObject);
        canyoningCustomer.activityIds = (typeof canyoningCustomer.activityIds === "string" &&
            canyoningCustomer.activityIds.length > 2)
            || (typeof canyoningCustomer.activityIds === "object" &&
                canyoningCustomer.activityIds.length !== 0) ? this.getActivityIds(canyoningCustomer.activityIds, canyoningCustomer.possibleActivitiesFull) : [];
        if (canyoningCustomer.activityIds) {
            canyoningCustomer.activityIds = JSON.stringify(canyoningCustomer.activityIds);
            this.isBusy = true;
            this.customerService.putCustomerCanyoningOptionAction(canyoningCustomer)
                .subscribe(function () {
                _this.isBusy = false;
                console.log("Updated canyoning customer");
            }, function (error) {
                _this.isBusy = false;
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
        var _this = this;
        var dataForm = args.object;
        var specialCustomer = JSON.parse(dataForm.editedObject);
        specialCustomer.activityIds = (typeof specialCustomer.activityIds === "string" &&
            specialCustomer.activityIds.length > 2)
            || (typeof specialCustomer.activityIds === "object" &&
                specialCustomer.activityIds.length !== 0) ? this.getActivityIds(specialCustomer.activityIds, specialCustomer.possibleActivitiesFull) : [];
        if (specialCustomer.activityIds) {
            specialCustomer.activityIds = JSON.stringify(specialCustomer.activityIds);
            this.isBusy = true;
            this.customerService.putCustomerSpecialOptionAction(specialCustomer)
                .subscribe(function () {
                _this.isBusy = false;
                console.log("Updated special customer");
            }, function (error) {
                _this.isBusy = false;
                console.dir(error);
                /*TODO: handle errors*/
            });
        }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3B0aW9ucy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJvcHRpb25zLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFrRDtBQUdsRCxrREFBb0Q7QUFFcEQsaURBQWdEO0FBQ2hELG1FQUFtRjtBQUNuRixnREFBK0M7QUFPL0MsdUVBQXFFO0FBQ3JFLGlFQUErRDtBQUMvRCxtRUFBaUU7QUFRakU7SUE2QkksMEJBQW9CLFlBQTBCLEVBQVUsZUFBZ0MsRUFDcEUsSUFBVSxFQUFVLGFBQTRCO1FBRGhELGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQVUsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQ3BFLFNBQUksR0FBSixJQUFJLENBQU07UUFBVSxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQTVCcEUsV0FBTSxHQUFpQixFQUFFLENBQUM7UUFDMUIsZUFBVSxHQUFXLEVBQUUsQ0FBQztRQUV4QixjQUFTLEdBQVksS0FBSyxDQUFDO1FBSTNCLGVBQVUsR0FBZSxFQUFFLENBQUM7UUFFNUIscUJBQWdCLEdBQTBCLEVBQUUsQ0FBQztRQUM3Qyx3QkFBbUIsR0FBNEIsRUFBRSxDQUFDO1FBQ2xELG1CQUFjLEdBQW1CO1lBQzdCLEVBQUUsRUFBRSxHQUFHO1lBQ1AsSUFBSSxFQUFFLEVBQUU7U0FDWCxDQUFDO1FBRUYsdUJBQWtCLEdBQVcsQ0FBQyxDQUFDO1FBRS9CLHdCQUFtQixHQUFZLEtBQUssQ0FBQztRQUNyQyxxQkFBZ0IsR0FBMkIsRUFBRSxDQUFDO1FBRTlDLDBCQUFxQixHQUFZLEtBQUssQ0FBQztRQUN2Qyx1QkFBa0IsR0FBNkIsRUFBRSxDQUFDO1FBRWxELHdCQUFtQixHQUFZLEtBQUssQ0FBQztRQUNyQyxxQkFBZ0IsR0FBMkIsRUFBRSxDQUFDO0lBSTlDLENBQUM7SUFFRCxtQ0FBUSxHQUFSO1FBQ0ksSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFFRCxvREFBeUIsR0FB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QUFZLEVBQUUsa0NBQWUsRUFBRSw4QkFBYSxDQUFDO1lBQ3pELFdBQVcsRUFBRSwwQkFBMEI7U0FDMUMsQ0FBQzt5Q0E4Qm9DLDRCQUFZLEVBQTJCLGtDQUFlO1lBQzlELFdBQUksRUFBeUIsOEJBQWE7T0E5QjNELGdCQUFnQixDQTJZNUI7SUFBRCx1QkFBQztDQUFBLEFBM1lELElBMllDO0FBM1lZLDRDQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IFJhZERhdGFGb3JtIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC11aS1kYXRhZm9ybVwiO1xuaW1wb3J0IHsgUmFkU2lkZURyYXdlciB9IGZyb20gXCJuYXRpdmVzY3JpcHQtdWktc2lkZWRyYXdlclwiO1xuaW1wb3J0ICogYXMgYXBwIGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2FwcGxpY2F0aW9uXCI7XG5pbXBvcnQgeyBMaXN0UGlja2VyIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvbGlzdC1waWNrZXJcIjtcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9wYWdlXCI7XG5pbXBvcnQgeyBTZWdtZW50ZWRCYXIsIFNlZ21lbnRlZEJhckl0ZW0gfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9zZWdtZW50ZWQtYmFyXCI7XG5pbXBvcnQgeyBTZXR0aW5ncyB9IGZyb20gXCJ+L3NldHRpbmdzL3NldHRpbmdzXCI7XG5pbXBvcnQgeyBBY3Rpdml0eSB9IGZyb20gXCJ+L3NoYXJlZC9tb2RlbHMvYWN0aXZpdHkubW9kZWxcIjtcbmltcG9ydCB7IENhbnlvbmluZ0N1c3RvbWVyIH0gZnJvbSBcIn4vc2hhcmVkL21vZGVscy9jYW55b25pbmdDdXN0b21lci5tb2RlbFwiO1xuaW1wb3J0IHsgR3JvZXAgfSBmcm9tIFwifi9zaGFyZWQvbW9kZWxzL2dyb2VwLm1vZGVsXCI7XG5pbXBvcnQgeyBPcHRpb25DYXRlZ29yeSB9IGZyb20gXCJ+L3NoYXJlZC9tb2RlbHMvb3B0aW9uQ2F0ZWdvcnkubW9kZWxcIjtcbmltcG9ydCB7IFJhZnRpbmdDdXN0b21lciB9IGZyb20gXCJ+L3NoYXJlZC9tb2RlbHMvcmFmdGluZ0N1c3RvbWVyLm1vZGVsXCI7XG5pbXBvcnQgeyBTcGVjaWFsQ3VzdG9tZXIgfSBmcm9tIFwifi9zaGFyZWQvbW9kZWxzL3NwZWNpYWxDdXN0b21lci5tb2RlbFwiO1xuaW1wb3J0IHsgQ3VzdG9tZXJTZXJ2aWNlIH0gZnJvbSBcIn4vc2hhcmVkL3NlcnZpY2VzL2N1c3RvbWVyLnNlcnZpY2VcIjtcbmltcG9ydCB7IEdyb2VwU2VydmljZSB9IGZyb20gXCJ+L3NoYXJlZC9zZXJ2aWNlcy9ncm9lcC5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBPcHRpb25TZXJ2aWNlIH0gZnJvbSBcIn4vc2hhcmVkL3NlcnZpY2VzL29wdGlvbi5zZXJ2aWNlXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcIk9wdGlvbnNcIixcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHByb3ZpZGVyczogW0dyb2VwU2VydmljZSwgQ3VzdG9tZXJTZXJ2aWNlLCBPcHRpb25TZXJ2aWNlXSxcbiAgICB0ZW1wbGF0ZVVybDogXCIuL29wdGlvbnMuY29tcG9uZW50Lmh0bWxcIlxufSlcbmV4cG9ydCBjbGFzcyBPcHRpb25zQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICAgIGdyb2VwczogQXJyYXk8R3JvZXA+ID0gW107XG4gICAgZ3JvZXBJdGVtczogb2JqZWN0ID0ge307XG4gICAgZ3JvZXA6IEdyb2VwO1xuICAgIGhhc0dyb2VwczogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgaXNCdXN5OiBib29sZWFuO1xuXG4gICAgYWN0aXZpdGllczogQXJyYXk8YW55PiA9IFtdO1xuXG4gICAgb3B0aW9uQ2F0ZWdvcmllczogQXJyYXk8T3B0aW9uQ2F0ZWdvcnk+ID0gW107XG4gICAgb3B0aW9uQ2F0ZWdvcnlJdGVtczogQXJyYXk8U2VnbWVudGVkQmFySXRlbT4gPSBbXTtcbiAgICBvcHRpb25DYXRlZ29yeTogT3B0aW9uQ2F0ZWdvcnkgPSB7XG4gICAgICAgIGlkOiBcIjFcIixcbiAgICAgICAgbmFtZTogXCJcIlxuICAgIH07XG5cbiAgICBzZWxlY3RlZEdyb2VwSW5kZXg6IG51bWJlciA9IDA7XG5cbiAgICBoYXNSYWZ0aW5nQ3VzdG9tZXJzOiBib29sZWFuID0gZmFsc2U7XG4gICAgcmFmdGluZ0N1c3RvbWVyczogQXJyYXk8UmFmdGluZ0N1c3RvbWVyPiA9IFtdO1xuXG4gICAgaGFzQ2FueW9uaW5nQ3VzdG9tZXJzOiBib29sZWFuID0gZmFsc2U7XG4gICAgY2FueW9uaW5nQ3VzdG9tZXJzOiBBcnJheTxDYW55b25pbmdDdXN0b21lcj4gPSBbXTtcblxuICAgIGhhc1NwZWNpYWxDdXN0b21lcnM6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBzcGVjaWFsQ3VzdG9tZXJzOiBBcnJheTxTcGVjaWFsQ3VzdG9tZXI+ID0gW107XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGdyb2VwU2VydmljZTogR3JvZXBTZXJ2aWNlLCBwcml2YXRlIGN1c3RvbWVyU2VydmljZTogQ3VzdG9tZXJTZXJ2aWNlLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgcGFnZTogUGFnZSwgcHJpdmF0ZSBvcHRpb25TZXJ2aWNlOiBPcHRpb25TZXJ2aWNlKSB7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZ2V0R3JvZXBzKCk7XG4gICAgfVxuXG4gICAgc2VsZWN0ZWRHcm9lcEluZGV4Q2hhbmdlZChhcmdzKSB7XG4gICAgICAgIGNvbnN0IHBpY2tlciA9IDxMaXN0UGlja2VyPmFyZ3Mub2JqZWN0O1xuXG4gICAgICAgIGlmICh0aGlzLmdyb2Vwcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB0aGlzLmdyb2VwID0gdGhpcy5ncm9lcHNbcGlja2VyLnNlbGVjdGVkSW5kZXhdO1xuXG4gICAgICAgICAgICBpZiAoKHR5cGVvZiB0aGlzLm9wdGlvbkNhdGVnb3J5ICE9PSBcInVuZGVmaW5lZFwiICYmXG4gICAgICAgICAgICB0aGlzLm9wdGlvbkNhdGVnb3J5ICE9PSBudWxsID8gdGhpcy5vcHRpb25DYXRlZ29yeS5pZCA6IHZvaWQgMCkgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZ2V0T3B0aW9uQ2F0ZWdvcmllcygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBzZWxlY3RlZE9wdGlvbkNhdGVnb3J5SW5kZXhDaGFuZ2VkKGFyZ3MpIHtcbiAgICAgICAgY29uc3Qgc2VnbWVudGVkQmFyID0gPFNlZ21lbnRlZEJhcj5hcmdzLm9iamVjdDtcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRJbmRleCA9IHNlZ21lbnRlZEJhci5zZWxlY3RlZEluZGV4O1xuXG4gICAgICAgIGlmICh0aGlzLm9wdGlvbkNhdGVnb3JpZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdGhpcy5vcHRpb25DYXRlZ29yeSA9IHRoaXMub3B0aW9uQ2F0ZWdvcmllc1tzZWxlY3RlZEluZGV4XTtcbiAgICAgICAgICAgIHRoaXMuZ2V0QWN0aXZpdGllcygpO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBnZXRDdXN0b21lcnMoKTogdm9pZCB7XG4gICAgICAgIGlmICgodHlwZW9mIHRoaXMuZ3JvZXAgIT09IFwidW5kZWZpbmVkXCIgJiZcbiAgICAgICAgdGhpcy5ncm9lcCAhPT0gbnVsbCA/IHRoaXMuZ3JvZXAuaWQgOiB2b2lkIDApICE9IG51bGwpIHtcbiAgICAgICAgICAgIHN3aXRjaCAodGhpcy5vcHRpb25DYXRlZ29yeS5uYW1lKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBcInJhZnRcIjpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRSYWZ0aW5nQ3VzdG9tZXJzKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSBcImNhbnlvblwiOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdldENhbnlvbmluZ0N1c3RvbWVycygpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgXCJzcGVjaWFsXCI6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0U3BlY2lhbEN1c3RvbWVycygpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldEdyb2VwcygpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgbG9jYXRpb25JZCA9IFNldHRpbmdzLmdldExvY2F0aW9uKCk7XG4gICAgICAgIGNvbnN0IGRhdGUgPSBTZXR0aW5ncy5nZXREYXRlKCk7XG5cbiAgICAgICAgdGhpcy5pc0J1c3kgPSB0cnVlO1xuXG4gICAgICAgIHRoaXMuZ3JvZXBTZXJ2aWNlLmdldEFsbEdyb2Vwc0ZvcldlZWtBbmRMb2NhdGlvbkFjdGlvbihkYXRlLCBsb2NhdGlvbklkKVxuICAgICAgICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICAocmVzdWx0OiBBcnJheTxHcm9lcD4pID0+IHtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdyb2VwcyA9IHJlc3VsdDtcblxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5ncm9lcHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ncm9lcEl0ZW1zID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1zOiB0aGlzLmdyb2VwcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZW5ndGg6IHRoaXMuZ3JvZXBzLmxlbmd0aCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBnZXRJdGVtOiAoaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaXRlbSA9IHRoaXMuZ3JvZXBzW2luZGV4XTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXRlbS5uYW1lO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhhc0dyb2VwcyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImZvdW5kIG1lIHNvbWUgZ3JvZXBzXCIpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdyb2VwID0gdGhpcy5ncm9lcHNbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdldE9wdGlvbkNhdGVnb3JpZXMoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzQnVzeSA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5kaXIoZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhc0dyb2VwcyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzQnVzeSA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgICAgIC8qVE9ETzogaGFuZGxlIGVycm9ycyovXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcbiAgICB9XG5cbiAgICBnZXRPcHRpb25DYXRlZ29yaWVzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmlzQnVzeSA9IHRydWU7XG5cbiAgICAgICAgdGhpcy5vcHRpb25TZXJ2aWNlLmdldEFsbENhdGVnb3JpZXNBY3Rpb24oKVxuICAgICAgICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICAocmVzdWx0OiBBcnJheTxPcHRpb25DYXRlZ29yeT4pID0+IHtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbkNhdGVnb3JpZXMgPSByZXN1bHQ7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZm91bmQgbWUgc29tZSBvcHRpb25DYXRlZ29yaWVzXCIpO1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3B0aW9uQ2F0ZWdvcnlJdGVtcyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IG9wdGlvbkNhdGVnb3J5IG9mIHRoaXMub3B0aW9uQ2F0ZWdvcmllcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2VnbWVudGVkQmFySXRlbSA9IDxTZWdtZW50ZWRCYXJJdGVtPm5ldyBTZWdtZW50ZWRCYXJJdGVtKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWdtZW50ZWRCYXJJdGVtLnRpdGxlID0gb3B0aW9uQ2F0ZWdvcnkubmFtZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3B0aW9uQ2F0ZWdvcnlJdGVtcy5wdXNoKHNlZ21lbnRlZEJhckl0ZW0pO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9uQ2F0ZWdvcmllcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbkNhdGVnb3J5ID0gdGhpcy5vcHRpb25DYXRlZ29yaWVzWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRBY3Rpdml0aWVzKCk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmlzQnVzeSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmRpcihlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNCdXN5ID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICAgICAgLypUT0RPOiBoYW5kbGUgZXJyb3JzKi9cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuICAgIH1cblxuICAgIGdldFJhZnRpbmdDdXN0b21lcnMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuaXNCdXN5ID0gdHJ1ZTtcblxuICAgICAgICB0aGlzLmN1c3RvbWVyU2VydmljZS5nZXRBbGxCeUdyb2VwV2l0aFJhZnRpbmdPcHRpb25BY3Rpb24odGhpcy5ncm9lcC5pZClcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgKHJlc3VsdDogQXJyYXk8UmFmdGluZ0N1c3RvbWVyPikgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJhZnRpbmdDdXN0b21lcnMgPSByZXN1bHQ7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGFzUmFmdGluZ0N1c3RvbWVycyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZm91bmQgbWUgc29tZSByYWZ0aW5nIGN1c3RvbWVyc1wiKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc0J1c3kgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmRpcihlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGFzUmFmdGluZ0N1c3RvbWVycyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzQnVzeSA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgICAgIC8qVE9ETzogaGFuZGxlIGVycm9ycyovXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcblxuICAgIH1cblxuICAgIGdldENhbnlvbmluZ0N1c3RvbWVycygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5pc0J1c3kgPSB0cnVlO1xuXG4gICAgICAgIHRoaXMuY3VzdG9tZXJTZXJ2aWNlLmdldEFsbEJ5R3JvZXBXaXRoQ2FueW9uaW5nT3B0aW9uQWN0aW9uKHRoaXMuZ3JvZXAuaWQpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgIChyZXN1bHQ6IEFycmF5PENhbnlvbmluZ0N1c3RvbWVyPikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBsZXQgaSA9IDA7XG4gICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgY2FueW9uaW5nQ3VzdG9tZXIgb2YgcmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYW55b25pbmdDdXN0b21lci5wb3NzaWJsZUFjdGl2aXRpZXNGdWxsID1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1hcEN1c3RvbWVyQWN0aXZpdGllc0Z1bGwoY2FueW9uaW5nQ3VzdG9tZXIucG9zc2libGVBY3Rpdml0aWVzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbnlvbmluZ0N1c3RvbWVyLnBvc3NpYmxlQWN0aXZpdGllcyA9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXBDdXN0b21lckFjdGl2aXRpZXNOYW1lKGNhbnlvbmluZ0N1c3RvbWVyLnBvc3NpYmxlQWN0aXZpdGllcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRbaV0gPSBjYW55b25pbmdDdXN0b21lcjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGkrKztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNhbnlvbmluZ0N1c3RvbWVycyA9IHJlc3VsdDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYXNDYW55b25pbmdDdXN0b21lcnMgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImZvdW5kIG1lIHNvbWUgY3VzdG9tZXJzXCIpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzQnVzeSA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5kaXIoZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhc0NhbnlvbmluZ0N1c3RvbWVycyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzQnVzeSA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgICAgIC8qVE9ETzogaGFuZGxlIGVycm9ycyovXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcblxuICAgIH1cblxuICAgIGdldFNwZWNpYWxDdXN0b21lcnMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuaXNCdXN5ID0gdHJ1ZTtcblxuICAgICAgICB0aGlzLmN1c3RvbWVyU2VydmljZS5nZXRBbGxCeUdyb2VwV2l0aFNwZWNpYWxPcHRpb25BY3Rpb24odGhpcy5ncm9lcC5pZClcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgKHJlc3VsdDogQXJyYXk8U3BlY2lhbEN1c3RvbWVyPikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBsZXQgaSA9IDA7XG4gICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3Qgc3BlY2lhbEN1c3RvbWVyIG9mIHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3BlY2lhbEN1c3RvbWVyLnBvc3NpYmxlQWN0aXZpdGllc0Z1bGwgPVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWFwQ3VzdG9tZXJBY3Rpdml0aWVzRnVsbChzcGVjaWFsQ3VzdG9tZXIucG9zc2libGVBY3Rpdml0aWVzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNwZWNpYWxDdXN0b21lci5wb3NzaWJsZUFjdGl2aXRpZXMgPVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWFwQ3VzdG9tZXJBY3Rpdml0aWVzTmFtZShzcGVjaWFsQ3VzdG9tZXIucG9zc2libGVBY3Rpdml0aWVzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdFtpXSA9IHNwZWNpYWxDdXN0b21lcjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGkrKztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNwZWNpYWxDdXN0b21lcnMgPSByZXN1bHQ7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGFzU3BlY2lhbEN1c3RvbWVycyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZm91bmQgbWUgc29tZSBjdXN0b21lcnNcIik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNCdXN5ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5kaXIoZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhc1NwZWNpYWxDdXN0b21lcnMgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc0J1c3kgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgICAgICAvKlRPRE86IGhhbmRsZSBlcnJvcnMqL1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7XG5cbiAgICB9XG5cbiAgICBnZXRBY3Rpdml0aWVzKCk6IHZvaWQge1xuICAgICAgICBpZiAoKHR5cGVvZiB0aGlzLm9wdGlvbkNhdGVnb3J5ICE9PSBcInVuZGVmaW5lZFwiICYmXG4gICAgICAgIHRoaXMub3B0aW9uQ2F0ZWdvcnkgIT09IG51bGwgPyB0aGlzLm9wdGlvbkNhdGVnb3J5LmlkIDogdm9pZCAwKSAhPSBudWxsICYmXG4gICAgICAgICAgICB0aGlzLm9wdGlvbkNhdGVnb3J5Lm5hbWUgPT09IFwicmFmdFwiKSB7XG4gICAgICAgICAgICB0aGlzLmlzQnVzeSA9IHRydWU7XG5cbiAgICAgICAgICAgIHRoaXMub3B0aW9uU2VydmljZS5nZXRBbGxBY3Rpdml0aWVzQnlDYXRlZ29yeUFjdGlvbih0aGlzLm9wdGlvbkNhdGVnb3J5LmlkKVxuICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgIChyZXN1bHQ6IEFycmF5PEFjdGl2aXR5PikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hY3Rpdml0aWVzID0gW3trZXk6IFwiMFwiLCBsYWJlbDogXCJLaWVzIGVlbiBhY3Rpdml0ZWl0XCJ9XTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0aXZpdGllcyA9IFsuLi50aGlzLmFjdGl2aXRpZXMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLi4ucmVzdWx0Lm1hcCgoe2lkLCBuYW1lfSkgPT4gKHtrZXk6IGlkLCBsYWJlbDogbmFtZX0pKV07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZ290IG1lIHNvbWUgYWN0aXZpdGllc1wiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaXNCdXN5ID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0Q3VzdG9tZXJzKCk7XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5kaXIoZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pc0J1c3kgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8qVE9ETzogaGFuZGxlIGVycm9ycyovXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5nZXRDdXN0b21lcnMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRmUHJvcGVydHlDb21taXR0ZWRSYWZ0aW5nKGFyZ3MpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgZGF0YUZvcm0gPSA8UmFkRGF0YUZvcm0+YXJncy5vYmplY3Q7XG4gICAgICAgIGNvbnN0IHJhZnRpbmdDdXN0b21lcjogUmFmdGluZ0N1c3RvbWVyID0gPFJhZnRpbmdDdXN0b21lcj4gSlNPTi5wYXJzZShkYXRhRm9ybS5lZGl0ZWRPYmplY3QpO1xuXG4gICAgICAgIHRoaXMuaXNCdXN5ID0gdHJ1ZTtcblxuICAgICAgICB0aGlzLmN1c3RvbWVyU2VydmljZS5wdXRDdXN0b21lclJhZnRpbmdPcHRpb25BY3Rpb24ocmFmdGluZ0N1c3RvbWVyKVxuICAgICAgICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNCdXN5ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVXBkYXRlZCByYWZ0aW5nIGN1c3RvbWVyXCIpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZGlyKGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc0J1c3kgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgLypUT0RPOiBoYW5kbGUgZXJyb3JzKi9cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuICAgIH1cblxuICAgIGRmUHJvcGVydHlDb21taXR0ZWRDYW55b25pbmcoYXJncyk6IHZvaWQge1xuICAgICAgICBjb25zdCBkYXRhRm9ybSA9IDxSYWREYXRhRm9ybT5hcmdzLm9iamVjdDtcbiAgICAgICAgY29uc3QgY2FueW9uaW5nQ3VzdG9tZXI6IENhbnlvbmluZ0N1c3RvbWVyID0gPENhbnlvbmluZ0N1c3RvbWVyPiBKU09OLnBhcnNlKGRhdGFGb3JtLmVkaXRlZE9iamVjdCk7XG5cbiAgICAgICAgY2FueW9uaW5nQ3VzdG9tZXIuYWN0aXZpdHlJZHMgPSAodHlwZW9mIGNhbnlvbmluZ0N1c3RvbWVyLmFjdGl2aXR5SWRzID09PSBcInN0cmluZ1wiICYmXG4gICAgICAgICAgICBjYW55b25pbmdDdXN0b21lci5hY3Rpdml0eUlkcy5sZW5ndGggPiAyKVxuICAgICAgICB8fCAodHlwZW9mIGNhbnlvbmluZ0N1c3RvbWVyLmFjdGl2aXR5SWRzID09PSBcIm9iamVjdFwiICYmXG4gICAgICAgICAgICBjYW55b25pbmdDdXN0b21lci5hY3Rpdml0eUlkcy5sZW5ndGggIT09IDApID8gdGhpcy5nZXRBY3Rpdml0eUlkcyhjYW55b25pbmdDdXN0b21lci5hY3Rpdml0eUlkcyxcbiAgICAgICAgICAgIGNhbnlvbmluZ0N1c3RvbWVyLnBvc3NpYmxlQWN0aXZpdGllc0Z1bGwpIDogW107XG5cbiAgICAgICAgaWYgKGNhbnlvbmluZ0N1c3RvbWVyLmFjdGl2aXR5SWRzKSB7XG4gICAgICAgICAgICBjYW55b25pbmdDdXN0b21lci5hY3Rpdml0eUlkcyA9IEpTT04uc3RyaW5naWZ5KGNhbnlvbmluZ0N1c3RvbWVyLmFjdGl2aXR5SWRzKTtcblxuICAgICAgICAgICAgdGhpcy5pc0J1c3kgPSB0cnVlO1xuXG4gICAgICAgICAgICB0aGlzLmN1c3RvbWVyU2VydmljZS5wdXRDdXN0b21lckNhbnlvbmluZ09wdGlvbkFjdGlvbihjYW55b25pbmdDdXN0b21lcilcbiAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmlzQnVzeSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJVcGRhdGVkIGNhbnlvbmluZyBjdXN0b21lclwiKTtcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmlzQnVzeSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5kaXIoZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLypUT0RPOiBoYW5kbGUgZXJyb3JzKi9cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRBY3Rpdml0eUlkcyhhY3Rpdml0aWVzLCBhY3Rpdml0aWVzRnVsbCk6IEFycmF5PHN0cmluZz4ge1xuICAgICAgICBjb25zdCBhY3Rpdml0aWVzSWRzID0gW107XG4gICAgICAgIC8qc3VkZGVubHkgYWN0aXZpdGllcyBpcyBhIHN0cmluZyovXG5cbiAgICAgICAgaWYgKHR5cGVvZiBhY3Rpdml0aWVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICBsZXQgc3RyaW5nQnVpbGQgPSBcIlwiO1xuICAgICAgICAgICAgLypSZW1vdmUgWyBdKi9cbiAgICAgICAgICAgIGxldCBpID0gMTtcbiAgICAgICAgICAgIGNvbnN0IGxlbmd0aFN0cmluZyA9IGFjdGl2aXRpZXMubGVuZ3RoO1xuICAgICAgICAgICAgZm9yIChjb25zdCBsZXR0ZXIgb2YgYWN0aXZpdGllcykge1xuICAgICAgICAgICAgICAgIGlmIChpICE9PSAxICYmIGkgPCBsZW5ndGhTdHJpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgc3RyaW5nQnVpbGQgKz0gbGV0dGVyO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpKys7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzdHJpbmdCdWlsZC5yZXBsYWNlKC9cXHMvZywgXCJcIik7XG4gICAgICAgICAgICBjb25zdCB0ZXh0QXJyID0gc3RyaW5nQnVpbGQuc3BsaXQoXCIsXCIpO1xuICAgICAgICAgICAgY29uc3QgYXJyQWN0aXZpdGllcyA9IFtdO1xuICAgICAgICAgICAgZm9yIChjb25zdCB0ZXh0IG9mIHRleHRBcnIpIHtcbiAgICAgICAgICAgICAgICBhcnJBY3Rpdml0aWVzLnB1c2goU3RyaW5nKHRleHQpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGFjdGl2aXRpZXMgPSBhcnJBY3Rpdml0aWVzO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChjb25zdCBhY3Rpdml0eU5hbWUgb2YgYWN0aXZpdGllcykge1xuICAgICAgICAgICAgY29uc3QgYWN0aXZpdHlJZCA9IGFjdGl2aXRpZXNGdWxsXG4gICAgICAgICAgICAgICAgLmZpbmQoKHgpID0+IHgubGFiZWwgPT09IGFjdGl2aXR5TmFtZS50cmltKCkpLmtleTtcbiAgICAgICAgICAgIGFjdGl2aXRpZXNJZHMucHVzaChhY3Rpdml0eUlkKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBhY3Rpdml0aWVzSWRzO1xuICAgIH1cblxuICAgIG1hcEN1c3RvbWVyQWN0aXZpdGllc05hbWUoYWN0aXZpdGllcykge1xuICAgICAgICByZXR1cm4gYWN0aXZpdGllcy5tYXAoKHtpZCwgbmFtZX0pID0+IChuYW1lKSk7XG4gICAgfVxuXG4gICAgbWFwQ3VzdG9tZXJBY3Rpdml0aWVzRnVsbChhY3Rpdml0aWVzKSB7XG4gICAgICAgIHJldHVybiBhY3Rpdml0aWVzLm1hcCgoe2lkLCBuYW1lfSkgPT4gKHtrZXk6IGlkLCBsYWJlbDogbmFtZX0pKTtcbiAgICB9XG5cbiAgICBkZlByb3BlcnR5Q29tbWl0dGVkU3BlY2lhbChhcmdzKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGRhdGFGb3JtID0gPFJhZERhdGFGb3JtPmFyZ3Mub2JqZWN0O1xuICAgICAgICBjb25zdCBzcGVjaWFsQ3VzdG9tZXI6IFNwZWNpYWxDdXN0b21lciA9IDxTcGVjaWFsQ3VzdG9tZXI+IEpTT04ucGFyc2UoZGF0YUZvcm0uZWRpdGVkT2JqZWN0KTtcblxuICAgICAgICBzcGVjaWFsQ3VzdG9tZXIuYWN0aXZpdHlJZHMgPSAodHlwZW9mIHNwZWNpYWxDdXN0b21lci5hY3Rpdml0eUlkcyA9PT0gXCJzdHJpbmdcIiAmJlxuICAgICAgICAgICAgc3BlY2lhbEN1c3RvbWVyLmFjdGl2aXR5SWRzLmxlbmd0aCA+IDIpXG4gICAgICAgIHx8ICh0eXBlb2Ygc3BlY2lhbEN1c3RvbWVyLmFjdGl2aXR5SWRzID09PSBcIm9iamVjdFwiICYmXG4gICAgICAgICAgICBzcGVjaWFsQ3VzdG9tZXIuYWN0aXZpdHlJZHMubGVuZ3RoICE9PSAwKSA/IHRoaXMuZ2V0QWN0aXZpdHlJZHMoc3BlY2lhbEN1c3RvbWVyLmFjdGl2aXR5SWRzLFxuICAgICAgICAgICAgc3BlY2lhbEN1c3RvbWVyLnBvc3NpYmxlQWN0aXZpdGllc0Z1bGwpIDogW107XG5cbiAgICAgICAgaWYgKHNwZWNpYWxDdXN0b21lci5hY3Rpdml0eUlkcykge1xuICAgICAgICAgICAgc3BlY2lhbEN1c3RvbWVyLmFjdGl2aXR5SWRzID0gSlNPTi5zdHJpbmdpZnkoc3BlY2lhbEN1c3RvbWVyLmFjdGl2aXR5SWRzKTtcbiAgICAgICAgICAgIHRoaXMuaXNCdXN5ID0gdHJ1ZTtcblxuICAgICAgICAgICAgdGhpcy5jdXN0b21lclNlcnZpY2UucHV0Q3VzdG9tZXJTcGVjaWFsT3B0aW9uQWN0aW9uKHNwZWNpYWxDdXN0b21lcilcbiAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmlzQnVzeSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJVcGRhdGVkIHNwZWNpYWwgY3VzdG9tZXJcIik7XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pc0J1c3kgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZGlyKGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8qVE9ETzogaGFuZGxlIGVycm9ycyovXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25EcmF3ZXJCdXR0b25UYXAoKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHNpZGVEcmF3ZXIgPSA8UmFkU2lkZURyYXdlcj5hcHAuZ2V0Um9vdFZpZXcoKTtcbiAgICAgICAgc2lkZURyYXdlci5zaG93RHJhd2VyKCk7XG4gICAgfVxuXG59XG4iXX0=