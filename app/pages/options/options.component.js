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
        this.test = {
            id: "1",
            activityIds: [],
            customer: "hey",
            programType: "AC"
        };
        this.isBusy = true;
        this.activities = [];
        this.activitiesFull = [];
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
        this.getGroeps();
        this.page.on(page_1.Page.navigatingToEvent, function () {
            if (settings_1.Settings.getCurrentTabViewIndex() === 2) {
                _this.isBusy = true;
                _this.getGroeps();
            }
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
        if (settings_1.Settings.getCurrentTabViewIndex() === 2) {
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
            this.optionCategory !== null ? this.optionCategory.id : void 0) != null) {
            this.optionService.getAllActivitiesByCategoryAction(this.optionCategory.id)
                .subscribe(function (result) {
                if (_this.optionCategory.name === "raft") {
                    _this.activities = [{ key: "0", label: "Kies een activiteit" }];
                    _this.activities = _this.activities.concat(result.map(function (_a) {
                        var id = _a.id, name = _a.name;
                        return ({ key: id, label: name });
                    }));
                }
                else {
                    _this.activities = result.map(function (_a) {
                        var id = _a.id, name = _a.name;
                        return (name);
                    });
                    _this.activitiesFull = result.map(function (_a) {
                        var id = _a.id, name = _a.name;
                        return ({ key: id, label: name });
                    });
                }
                console.log("got me some activities");
                _this.getCustomers();
            }, function (error) {
                console.dir(error);
                /*TODO: handle errors*/
            });
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
                canyoningCustomer.activityIds.length !== 0) ? this.getActivityIds(canyoningCustomer.activityIds) : [];
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
    OptionsComponent.prototype.getActivityIds = function (activities) {
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
            var activityId = this_1.activitiesFull.find(function (x) { return x.label === activityName.trim(); }).key;
            activitiesIds.push(activityId);
        };
        var this_1 = this;
        for (var _b = 0, activities_2 = activities; _b < activities_2.length; _b++) {
            var activityName = activities_2[_b];
            _loop_1(activityName);
        }
        return activitiesIds;
    };
    OptionsComponent.prototype.dfPropertyCommittedSpecial = function (args) {
        var dataForm = args.object;
        var specialCustomer = JSON.parse(dataForm.editedObject);
        specialCustomer.activityIds = (typeof specialCustomer.activityIds === "string" &&
            specialCustomer.activityIds.length > 2)
            || (typeof specialCustomer.activityIds === "object" &&
                specialCustomer.activityIds.length !== 0) ? this.getActivityIds(specialCustomer.activityIds) : [];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3B0aW9ucy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJvcHRpb25zLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFrRDtBQUdsRCxpREFBZ0Q7QUFDaEQsbUVBQW1GO0FBQ25GLGdEQUErQztBQU8vQyx1RUFBcUU7QUFDckUsaUVBQStEO0FBQy9ELG1FQUFpRTtBQVFqRTtJQXFDSSwwQkFBb0IsWUFBMEIsRUFBVSxlQUFnQyxFQUNwRSxJQUFVLEVBQVUsYUFBNEI7UUFEaEQsaUJBQVksR0FBWixZQUFZLENBQWM7UUFBVSxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDcEUsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUFVLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBcENwRSxXQUFNLEdBQWlCLEVBQUUsQ0FBQztRQUMxQixlQUFVLEdBQVcsRUFBRSxDQUFDO1FBRXhCLGNBQVMsR0FBWSxLQUFLLENBQUM7UUFFM0IsU0FBSSxHQUFzQjtZQUN0QixFQUFFLEVBQUUsR0FBRztZQUNQLFdBQVcsRUFBRSxFQUFFO1lBQ2YsUUFBUSxFQUFFLEtBQUs7WUFDZixXQUFXLEVBQUUsSUFBSTtTQUNwQixDQUFDO1FBRUYsV0FBTSxHQUFZLElBQUksQ0FBQztRQUV2QixlQUFVLEdBQWUsRUFBRSxDQUFDO1FBQzVCLG1CQUFjLEdBQWUsRUFBRSxDQUFDO1FBRWhDLHFCQUFnQixHQUEwQixFQUFFLENBQUM7UUFDN0Msd0JBQW1CLEdBQTRCLEVBQUUsQ0FBQztRQUNsRCxtQkFBYyxHQUFtQjtZQUM3QixFQUFFLEVBQUUsR0FBRztZQUNQLElBQUksRUFBRSxFQUFFO1NBQ1gsQ0FBQztRQUVGLHVCQUFrQixHQUFXLENBQUMsQ0FBQztRQUUvQix3QkFBbUIsR0FBWSxLQUFLLENBQUM7UUFDckMscUJBQWdCLEdBQTJCLEVBQUUsQ0FBQztRQUU5QywwQkFBcUIsR0FBWSxLQUFLLENBQUM7UUFDdkMsdUJBQWtCLEdBQTZCLEVB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QUMsZUFBZSxDQUFDO2lCQUMvRCxTQUFTLENBQ047Z0JBQ0ksT0FBTyxDQUFDLEdBQUcsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO1lBQzVDLENBQUMsRUFDRCxVQUFDLEtBQUs7Z0JBQ0YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDbkIsdUJBQXVCO1lBQzNCLENBQUMsQ0FDSixDQUFDO1FBQ1YsQ0FBQztJQUNMLENBQUM7SUFuV1EsZ0JBQWdCO1FBTjVCLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsU0FBUztZQUNuQixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsU0FBUyxFQUFFLENBQUMsNEJBQVksRUFBRSxrQ0FBZSxFQUFFLDhCQUFhLENBQUM7WUFDekQsV0FBVyxFQUFFLDBCQUEwQjtTQUMxQyxDQUFDO3lDQXNDb0MsNEJBQVksRUFBMkIsa0NBQWU7WUFDOUQsV0FBSSxFQUF5Qiw4QkFBYTtPQXRDM0QsZ0JBQWdCLENBcVc1QjtJQUFELHVCQUFDO0NBQUEsQUFyV0QsSUFxV0M7QUFyV1ksNENBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgUmFkRGF0YUZvcm0gfSBmcm9tIFwibmF0aXZlc2NyaXB0LXVpLWRhdGFmb3JtXCI7XG5pbXBvcnQgeyBMaXN0UGlja2VyIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvbGlzdC1waWNrZXJcIjtcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9wYWdlXCI7XG5pbXBvcnQgeyBTZWdtZW50ZWRCYXIsIFNlZ21lbnRlZEJhckl0ZW0gfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9zZWdtZW50ZWQtYmFyXCI7XG5pbXBvcnQgeyBTZXR0aW5ncyB9IGZyb20gXCJ+L3NldHRpbmdzL3NldHRpbmdzXCI7XG5pbXBvcnQgeyBBY3Rpdml0eSB9IGZyb20gXCJ+L3NoYXJlZC9tb2RlbHMvYWN0aXZpdHkubW9kZWxcIjtcbmltcG9ydCB7IENhbnlvbmluZ0N1c3RvbWVyIH0gZnJvbSBcIn4vc2hhcmVkL21vZGVscy9jYW55b25pbmdDdXN0b21lci5tb2RlbFwiO1xuaW1wb3J0IHsgR3JvZXAgfSBmcm9tIFwifi9zaGFyZWQvbW9kZWxzL2dyb2VwLm1vZGVsXCI7XG5pbXBvcnQgeyBPcHRpb25DYXRlZ29yeSB9IGZyb20gXCJ+L3NoYXJlZC9tb2RlbHMvb3B0aW9uQ2F0ZWdvcnkubW9kZWxcIjtcbmltcG9ydCB7IFJhZnRpbmdDdXN0b21lciB9IGZyb20gXCJ+L3NoYXJlZC9tb2RlbHMvcmFmdGluZ0N1c3RvbWVyLm1vZGVsXCI7XG5pbXBvcnQgeyBTcGVjaWFsQ3VzdG9tZXIgfSBmcm9tIFwifi9zaGFyZWQvbW9kZWxzL3NwZWNpYWxDdXN0b21lci5tb2RlbFwiO1xuaW1wb3J0IHsgQ3VzdG9tZXJTZXJ2aWNlIH0gZnJvbSBcIn4vc2hhcmVkL3NlcnZpY2VzL2N1c3RvbWVyLnNlcnZpY2VcIjtcbmltcG9ydCB7IEdyb2VwU2VydmljZSB9IGZyb20gXCJ+L3NoYXJlZC9zZXJ2aWNlcy9ncm9lcC5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBPcHRpb25TZXJ2aWNlIH0gZnJvbSBcIn4vc2hhcmVkL3NlcnZpY2VzL29wdGlvbi5zZXJ2aWNlXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcIk9wdGlvbnNcIixcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHByb3ZpZGVyczogW0dyb2VwU2VydmljZSwgQ3VzdG9tZXJTZXJ2aWNlLCBPcHRpb25TZXJ2aWNlXSxcbiAgICB0ZW1wbGF0ZVVybDogXCIuL29wdGlvbnMuY29tcG9uZW50Lmh0bWxcIlxufSlcbmV4cG9ydCBjbGFzcyBPcHRpb25zQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICAgIGdyb2VwczogQXJyYXk8R3JvZXA+ID0gW107XG4gICAgZ3JvZXBJdGVtczogb2JqZWN0ID0ge307XG4gICAgZ3JvZXA6IEdyb2VwO1xuICAgIGhhc0dyb2VwczogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgdGVzdDogQ2FueW9uaW5nQ3VzdG9tZXIgPSB7XG4gICAgICAgIGlkOiBcIjFcIixcbiAgICAgICAgYWN0aXZpdHlJZHM6IFtdLFxuICAgICAgICBjdXN0b21lcjogXCJoZXlcIixcbiAgICAgICAgcHJvZ3JhbVR5cGU6IFwiQUNcIlxuICAgIH07XG5cbiAgICBpc0J1c3k6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgYWN0aXZpdGllczogQXJyYXk8YW55PiA9IFtdO1xuICAgIGFjdGl2aXRpZXNGdWxsOiBBcnJheTxhbnk+ID0gW107XG5cbiAgICBvcHRpb25DYXRlZ29yaWVzOiBBcnJheTxPcHRpb25DYXRlZ29yeT4gPSBbXTtcbiAgICBvcHRpb25DYXRlZ29yeUl0ZW1zOiBBcnJheTxTZWdtZW50ZWRCYXJJdGVtPiA9IFtdO1xuICAgIG9wdGlvbkNhdGVnb3J5OiBPcHRpb25DYXRlZ29yeSA9IHtcbiAgICAgICAgaWQ6IFwiMVwiLFxuICAgICAgICBuYW1lOiBcIlwiXG4gICAgfTtcblxuICAgIHNlbGVjdGVkR3JvZXBJbmRleDogbnVtYmVyID0gMDtcblxuICAgIGhhc1JhZnRpbmdDdXN0b21lcnM6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICByYWZ0aW5nQ3VzdG9tZXJzOiBBcnJheTxSYWZ0aW5nQ3VzdG9tZXI+ID0gW107XG5cbiAgICBoYXNDYW55b25pbmdDdXN0b21lcnM6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBjYW55b25pbmdDdXN0b21lcnM6IEFycmF5PENhbnlvbmluZ0N1c3RvbWVyPiA9IFtdO1xuXG4gICAgaGFzU3BlY2lhbEN1c3RvbWVyczogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHNwZWNpYWxDdXN0b21lcnM6IEFycmF5PFNwZWNpYWxDdXN0b21lcj4gPSBbXTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZ3JvZXBTZXJ2aWNlOiBHcm9lcFNlcnZpY2UsIHByaXZhdGUgY3VzdG9tZXJTZXJ2aWNlOiBDdXN0b21lclNlcnZpY2UsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBwYWdlOiBQYWdlLCBwcml2YXRlIG9wdGlvblNlcnZpY2U6IE9wdGlvblNlcnZpY2UpIHtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5nZXRHcm9lcHMoKTtcbiAgICAgICAgdGhpcy5wYWdlLm9uKFBhZ2UubmF2aWdhdGluZ1RvRXZlbnQsICgpID0+IHtcbiAgICAgICAgICAgIGlmIChTZXR0aW5ncy5nZXRDdXJyZW50VGFiVmlld0luZGV4KCkgPT09IDIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmlzQnVzeSA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5nZXRHcm9lcHMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICB9XG5cbiAgICBzZWxlY3RlZEdyb2VwSW5kZXhDaGFuZ2VkKGFyZ3MpIHtcbiAgICAgICAgdGhpcy5pc0J1c3kgPSB0cnVlO1xuICAgICAgICBjb25zdCBwaWNrZXIgPSA8TGlzdFBpY2tlcj5hcmdzLm9iamVjdDtcblxuICAgICAgICBpZiAodGhpcy5ncm9lcHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdGhpcy5ncm9lcCA9IHRoaXMuZ3JvZXBzW3BpY2tlci5zZWxlY3RlZEluZGV4XTtcblxuICAgICAgICAgICAgaWYgKCh0eXBlb2YgdGhpcy5vcHRpb25DYXRlZ29yeSAhPT0gXCJ1bmRlZmluZWRcIiAmJlxuICAgICAgICAgICAgdGhpcy5vcHRpb25DYXRlZ29yeSAhPT0gbnVsbCA/IHRoaXMub3B0aW9uQ2F0ZWdvcnkuaWQgOiB2b2lkIDApICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmdldE9wdGlvbkNhdGVnb3JpZXMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgc2VsZWN0ZWRPcHRpb25DYXRlZ29yeUluZGV4Q2hhbmdlZChhcmdzKSB7XG4gICAgICAgIHRoaXMuaXNCdXN5ID0gdHJ1ZTtcblxuICAgICAgICBjb25zdCBzZWdtZW50ZWRCYXIgPSA8U2VnbWVudGVkQmFyPmFyZ3Mub2JqZWN0O1xuICAgICAgICBjb25zdCBzZWxlY3RlZEluZGV4ID0gc2VnbWVudGVkQmFyLnNlbGVjdGVkSW5kZXg7XG5cbiAgICAgICAgaWYgKHRoaXMub3B0aW9uQ2F0ZWdvcmllcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB0aGlzLm9wdGlvbkNhdGVnb3J5ID0gdGhpcy5vcHRpb25DYXRlZ29yaWVzW3NlbGVjdGVkSW5kZXhdO1xuICAgICAgICAgICAgdGhpcy5nZXRBY3Rpdml0aWVzKCk7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIGdldEN1c3RvbWVycygpOiB2b2lkIHtcbiAgICAgICAgaWYgKFNldHRpbmdzLmdldEN1cnJlbnRUYWJWaWV3SW5kZXgoKSA9PT0gMikge1xuXG4gICAgICAgICAgICBpZiAoKHR5cGVvZiB0aGlzLmdyb2VwICE9PSBcInVuZGVmaW5lZFwiICYmXG4gICAgICAgICAgICB0aGlzLmdyb2VwICE9PSBudWxsID8gdGhpcy5ncm9lcC5pZCA6IHZvaWQgMCkgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAodGhpcy5vcHRpb25DYXRlZ29yeS5uYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJyYWZ0XCI6XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdldFJhZnRpbmdDdXN0b21lcnMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJjYW55b25cIjpcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0Q2FueW9uaW5nQ3VzdG9tZXJzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwic3BlY2lhbFwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRTcGVjaWFsQ3VzdG9tZXJzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRHcm9lcHMoKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGxvY2F0aW9uSWQgPSBTZXR0aW5ncy5nZXRMb2NhdGlvbigpO1xuICAgICAgICBjb25zdCBkYXRlID0gU2V0dGluZ3MuZ2V0RGF0ZSgpO1xuXG4gICAgICAgIHRoaXMuZ3JvZXBTZXJ2aWNlLmdldEFsbEdyb2Vwc0ZvcldlZWtBbmRMb2NhdGlvbkFjdGlvbihkYXRlLCBsb2NhdGlvbklkKVxuICAgICAgICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICAocmVzdWx0OiBBcnJheTxHcm9lcD4pID0+IHtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdyb2VwcyA9IHJlc3VsdDtcblxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5ncm9lcHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ncm9lcEl0ZW1zID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1zOiB0aGlzLmdyb2VwcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZW5ndGg6IHRoaXMuZ3JvZXBzLmxlbmd0aCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBnZXRJdGVtOiAoaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaXRlbSA9IHRoaXMuZ3JvZXBzW2luZGV4XTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXRlbS5uYW1lO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhhc0dyb2VwcyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImZvdW5kIG1lIHNvbWUgZ3JvZXBzXCIpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdyb2VwID0gdGhpcy5ncm9lcHNbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdldE9wdGlvbkNhdGVnb3JpZXMoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzQnVzeSA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5kaXIoZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhc0dyb2VwcyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzQnVzeSA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgICAgIC8qVE9ETzogaGFuZGxlIGVycm9ycyovXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcbiAgICB9XG5cbiAgICBnZXRPcHRpb25DYXRlZ29yaWVzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLm9wdGlvblNlcnZpY2UuZ2V0QWxsQ2F0ZWdvcmllc0FjdGlvbigpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgIChyZXN1bHQ6IEFycmF5PE9wdGlvbkNhdGVnb3J5PikgPT4ge1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3B0aW9uQ2F0ZWdvcmllcyA9IHJlc3VsdDtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJmb3VuZCBtZSBzb21lIG9wdGlvbkNhdGVnb3JpZXNcIik7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vcHRpb25DYXRlZ29yeUl0ZW1zID0gW107XG4gICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3Qgb3B0aW9uQ2F0ZWdvcnkgb2YgdGhpcy5vcHRpb25DYXRlZ29yaWVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzZWdtZW50ZWRCYXJJdGVtID0gPFNlZ21lbnRlZEJhckl0ZW0+bmV3IFNlZ21lbnRlZEJhckl0ZW0oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlZ21lbnRlZEJhckl0ZW0udGl0bGUgPSBvcHRpb25DYXRlZ29yeS5uYW1lO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcHRpb25DYXRlZ29yeUl0ZW1zLnB1c2goc2VnbWVudGVkQmFySXRlbSk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5vcHRpb25DYXRlZ29yaWVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3B0aW9uQ2F0ZWdvcnkgPSB0aGlzLm9wdGlvbkNhdGVnb3JpZXNbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdldEFjdGl2aXRpZXMoKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaXNCdXN5ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZGlyKGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc0J1c3kgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgICAgICAvKlRPRE86IGhhbmRsZSBlcnJvcnMqL1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7XG4gICAgfVxuXG4gICAgZ2V0UmFmdGluZ0N1c3RvbWVycygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jdXN0b21lclNlcnZpY2UuZ2V0QWxsQnlHcm9lcFdpdGhSYWZ0aW5nT3B0aW9uQWN0aW9uKHRoaXMuZ3JvZXAuaWQpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgIChyZXN1bHQ6IEFycmF5PFJhZnRpbmdDdXN0b21lcj4pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yYWZ0aW5nQ3VzdG9tZXJzID0gcmVzdWx0O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhc1JhZnRpbmdDdXN0b21lcnMgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImZvdW5kIG1lIHNvbWUgcmFmdGluZyBjdXN0b21lcnNcIik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNCdXN5ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5kaXIoZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhc1JhZnRpbmdDdXN0b21lcnMgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc0J1c3kgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgICAgICAvKlRPRE86IGhhbmRsZSBlcnJvcnMqL1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7XG5cbiAgICB9XG5cbiAgICBnZXRDYW55b25pbmdDdXN0b21lcnMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuY3VzdG9tZXJTZXJ2aWNlLmdldEFsbEJ5R3JvZXBXaXRoQ2FueW9uaW5nT3B0aW9uQWN0aW9uKHRoaXMuZ3JvZXAuaWQpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgIChyZXN1bHQ6IEFycmF5PENhbnlvbmluZ0N1c3RvbWVyPikgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNhbnlvbmluZ0N1c3RvbWVycyA9IHJlc3VsdDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYXNDYW55b25pbmdDdXN0b21lcnMgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImZvdW5kIG1lIHNvbWUgY3VzdG9tZXJzXCIpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzQnVzeSA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5kaXIoZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhc0NhbnlvbmluZ0N1c3RvbWVycyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzQnVzeSA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgICAgIC8qVE9ETzogaGFuZGxlIGVycm9ycyovXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcblxuICAgIH1cblxuICAgIGdldFNwZWNpYWxDdXN0b21lcnMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuY3VzdG9tZXJTZXJ2aWNlLmdldEFsbEJ5R3JvZXBXaXRoU3BlY2lhbE9wdGlvbkFjdGlvbih0aGlzLmdyb2VwLmlkKVxuICAgICAgICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICAocmVzdWx0OiBBcnJheTxTcGVjaWFsQ3VzdG9tZXI+KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3BlY2lhbEN1c3RvbWVycyA9IHJlc3VsdDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYXNTcGVjaWFsQ3VzdG9tZXJzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJmb3VuZCBtZSBzb21lIGN1c3RvbWVyc1wiKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc0J1c3kgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmRpcihlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGFzU3BlY2lhbEN1c3RvbWVycyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzQnVzeSA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgICAgIC8qVE9ETzogaGFuZGxlIGVycm9ycyovXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcblxuICAgIH1cblxuICAgIGdldEFjdGl2aXRpZXMoKTogdm9pZCB7XG4gICAgICAgIGlmICgodHlwZW9mIHRoaXMub3B0aW9uQ2F0ZWdvcnkgIT09IFwidW5kZWZpbmVkXCIgJiZcbiAgICAgICAgdGhpcy5vcHRpb25DYXRlZ29yeSAhPT0gbnVsbCA/IHRoaXMub3B0aW9uQ2F0ZWdvcnkuaWQgOiB2b2lkIDApICE9IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMub3B0aW9uU2VydmljZS5nZXRBbGxBY3Rpdml0aWVzQnlDYXRlZ29yeUFjdGlvbih0aGlzLm9wdGlvbkNhdGVnb3J5LmlkKVxuICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgIChyZXN1bHQ6IEFycmF5PEFjdGl2aXR5PikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9uQ2F0ZWdvcnkubmFtZSA9PT0gXCJyYWZ0XCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFjdGl2aXRpZXMgPSBbe2tleTogXCIwXCIsIGxhYmVsOiBcIktpZXMgZWVuIGFjdGl2aXRlaXRcIn1dO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0aXZpdGllcyA9IFsuLi50aGlzLmFjdGl2aXRpZXMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC4uLnJlc3VsdC5tYXAoKHtpZCwgbmFtZX0pID0+ICh7a2V5OiBpZCwgbGFiZWw6IG5hbWV9KSldO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFjdGl2aXRpZXMgPSByZXN1bHQubWFwKCh7aWQsIG5hbWV9KSA9PiAobmFtZSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0aXZpdGllc0Z1bGwgPSByZXN1bHQubWFwKCh7aWQsIG5hbWV9KSA9PiAoe2tleTogaWQsIGxhYmVsOiBuYW1lfSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImdvdCBtZSBzb21lIGFjdGl2aXRpZXNcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdldEN1c3RvbWVycygpO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZGlyKGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8qVE9ETzogaGFuZGxlIGVycm9ycyovXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZGZQcm9wZXJ0eUNvbW1pdHRlZFJhZnRpbmcoYXJncyk6IHZvaWQge1xuICAgICAgICBjb25zdCBkYXRhRm9ybSA9IDxSYWREYXRhRm9ybT5hcmdzLm9iamVjdDtcbiAgICAgICAgY29uc3QgcmFmdGluZ0N1c3RvbWVyOiBSYWZ0aW5nQ3VzdG9tZXIgPSA8UmFmdGluZ0N1c3RvbWVyPiBKU09OLnBhcnNlKGRhdGFGb3JtLmVkaXRlZE9iamVjdCk7XG5cbiAgICAgICAgdGhpcy5jdXN0b21lclNlcnZpY2UucHV0Q3VzdG9tZXJSYWZ0aW5nT3B0aW9uQWN0aW9uKHJhZnRpbmdDdXN0b21lcilcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlVwZGF0ZWQgcmFmdGluZyBjdXN0b21lclwiKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmRpcihlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIC8qVE9ETzogaGFuZGxlIGVycm9ycyovXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcbiAgICB9XG5cbiAgICBkZlByb3BlcnR5Q29tbWl0dGVkQ2FueW9uaW5nKGFyZ3MpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgZGF0YUZvcm0gPSA8UmFkRGF0YUZvcm0+YXJncy5vYmplY3Q7XG4gICAgICAgIGNvbnN0IGNhbnlvbmluZ0N1c3RvbWVyOiBDYW55b25pbmdDdXN0b21lciA9IDxDYW55b25pbmdDdXN0b21lcj4gSlNPTi5wYXJzZShkYXRhRm9ybS5lZGl0ZWRPYmplY3QpO1xuICAgICAgICBjYW55b25pbmdDdXN0b21lci5hY3Rpdml0eUlkcyA9ICh0eXBlb2YgY2FueW9uaW5nQ3VzdG9tZXIuYWN0aXZpdHlJZHMgPT09IFwic3RyaW5nXCIgJiZcbiAgICAgICAgICAgIGNhbnlvbmluZ0N1c3RvbWVyLmFjdGl2aXR5SWRzLmxlbmd0aCA+IDIpXG4gICAgICAgIHx8ICh0eXBlb2YgY2FueW9uaW5nQ3VzdG9tZXIuYWN0aXZpdHlJZHMgPT09IFwib2JqZWN0XCIgJiZcbiAgICAgICAgICAgIGNhbnlvbmluZ0N1c3RvbWVyLmFjdGl2aXR5SWRzLmxlbmd0aCAhPT0gMCkgPyB0aGlzLmdldEFjdGl2aXR5SWRzKGNhbnlvbmluZ0N1c3RvbWVyLmFjdGl2aXR5SWRzKSA6IFtdO1xuXG4gICAgICAgIGlmIChjYW55b25pbmdDdXN0b21lci5hY3Rpdml0eUlkcykge1xuICAgICAgICAgICAgY2FueW9uaW5nQ3VzdG9tZXIuYWN0aXZpdHlJZHMgPSBKU09OLnN0cmluZ2lmeShjYW55b25pbmdDdXN0b21lci5hY3Rpdml0eUlkcyk7XG5cbiAgICAgICAgICAgIHRoaXMuY3VzdG9tZXJTZXJ2aWNlLnB1dEN1c3RvbWVyQ2FueW9uaW5nT3B0aW9uQWN0aW9uKGNhbnlvbmluZ0N1c3RvbWVyKVxuICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVXBkYXRlZCBjYW55b25pbmcgY3VzdG9tZXJcIik7XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5kaXIoZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLypUT0RPOiBoYW5kbGUgZXJyb3JzKi9cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRBY3Rpdml0eUlkcyhhY3Rpdml0aWVzKTogQXJyYXk8c3RyaW5nPiB7XG4gICAgICAgIGNvbnN0IGFjdGl2aXRpZXNJZHMgPSBbXTtcbiAgICAgICAgLypzdWRkZW5seSBhY3Rpdml0aWVzIGlzIGEgc3RyaW5nKi9cblxuICAgICAgICBpZiAodHlwZW9mIGFjdGl2aXRpZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgIGxldCBzdHJpbmdCdWlsZCA9IFwiXCI7XG4gICAgICAgICAgICAvKlJlbW92ZSBbIF0qL1xuICAgICAgICAgICAgbGV0IGkgPSAxO1xuICAgICAgICAgICAgY29uc3QgbGVuZ3RoU3RyaW5nID0gYWN0aXZpdGllcy5sZW5ndGg7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGxldHRlciBvZiBhY3Rpdml0aWVzKSB7XG4gICAgICAgICAgICAgICAgaWYgKGkgIT09IDEgJiYgaSA8IGxlbmd0aFN0cmluZykge1xuICAgICAgICAgICAgICAgICAgICBzdHJpbmdCdWlsZCArPSBsZXR0ZXI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGkrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHN0cmluZ0J1aWxkLnJlcGxhY2UoL1xccy9nLCBcIlwiKTtcbiAgICAgICAgICAgIGNvbnN0IHRleHRBcnIgPSBzdHJpbmdCdWlsZC5zcGxpdChcIixcIik7XG4gICAgICAgICAgICBjb25zdCBhcnJBY3Rpdml0aWVzID0gW107XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHRleHQgb2YgdGV4dEFycikge1xuICAgICAgICAgICAgICAgIGFyckFjdGl2aXRpZXMucHVzaChTdHJpbmcodGV4dCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYWN0aXZpdGllcyA9IGFyckFjdGl2aXRpZXM7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGNvbnN0IGFjdGl2aXR5TmFtZSBvZiBhY3Rpdml0aWVzKSB7XG4gICAgICAgICAgICBjb25zdCBhY3Rpdml0eUlkID0gdGhpcy5hY3Rpdml0aWVzRnVsbC5maW5kKCh4KSA9PiB4LmxhYmVsID09PSBhY3Rpdml0eU5hbWUudHJpbSgpKS5rZXk7XG4gICAgICAgICAgICBhY3Rpdml0aWVzSWRzLnB1c2goYWN0aXZpdHlJZCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gYWN0aXZpdGllc0lkcztcbiAgICB9XG5cbiAgICBkZlByb3BlcnR5Q29tbWl0dGVkU3BlY2lhbChhcmdzKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGRhdGFGb3JtID0gPFJhZERhdGFGb3JtPmFyZ3Mub2JqZWN0O1xuICAgICAgICBjb25zdCBzcGVjaWFsQ3VzdG9tZXI6IFNwZWNpYWxDdXN0b21lciA9IDxTcGVjaWFsQ3VzdG9tZXI+IEpTT04ucGFyc2UoZGF0YUZvcm0uZWRpdGVkT2JqZWN0KTtcblxuICAgICAgICBzcGVjaWFsQ3VzdG9tZXIuYWN0aXZpdHlJZHMgPSAodHlwZW9mIHNwZWNpYWxDdXN0b21lci5hY3Rpdml0eUlkcyA9PT0gXCJzdHJpbmdcIiAmJlxuICAgICAgICAgICAgc3BlY2lhbEN1c3RvbWVyLmFjdGl2aXR5SWRzLmxlbmd0aCA+IDIpXG4gICAgICAgIHx8ICh0eXBlb2Ygc3BlY2lhbEN1c3RvbWVyLmFjdGl2aXR5SWRzID09PSBcIm9iamVjdFwiICYmXG4gICAgICAgICAgICBzcGVjaWFsQ3VzdG9tZXIuYWN0aXZpdHlJZHMubGVuZ3RoICE9PSAwKSA/IHRoaXMuZ2V0QWN0aXZpdHlJZHMoc3BlY2lhbEN1c3RvbWVyLmFjdGl2aXR5SWRzKSA6IFtdO1xuXG4gICAgICAgIGlmIChzcGVjaWFsQ3VzdG9tZXIuYWN0aXZpdHlJZHMpIHtcbiAgICAgICAgICAgIHNwZWNpYWxDdXN0b21lci5hY3Rpdml0eUlkcyA9IEpTT04uc3RyaW5naWZ5KHNwZWNpYWxDdXN0b21lci5hY3Rpdml0eUlkcyk7XG5cbiAgICAgICAgICAgIHRoaXMuY3VzdG9tZXJTZXJ2aWNlLnB1dEN1c3RvbWVyU3BlY2lhbE9wdGlvbkFjdGlvbihzcGVjaWFsQ3VzdG9tZXIpXG4gICAgICAgICAgICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJVcGRhdGVkIHNwZWNpYWwgY3VzdG9tZXJcIik7XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5kaXIoZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLypUT0RPOiBoYW5kbGUgZXJyb3JzKi9cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbn1cbiJdfQ==