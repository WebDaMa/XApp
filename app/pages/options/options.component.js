"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var nativescript_angular_1 = require("nativescript-angular");
var app = require("tns-core-modules/application");
var dialogs = require("tns-core-modules/ui/dialogs");
var page_1 = require("tns-core-modules/ui/page");
var segmented_bar_1 = require("tns-core-modules/ui/segmented-bar");
var settings_1 = require("~/settings/settings");
var customer_service_1 = require("~/shared/services/customer.service");
var groep_service_1 = require("~/shared/services/groep.service");
var option_service_1 = require("~/shared/services/option.service");
var OptionsComponent = /** @class */ (function () {
    function OptionsComponent(groepService, customerService, page, optionService, routerExtensions) {
        this.groepService = groepService;
        this.customerService = customerService;
        this.page = page;
        this.optionService = optionService;
        this.routerExtensions = routerExtensions;
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
        this.lastTimer = { id: null, value: -1 };
    }
    OptionsComponent.prototype.ngOnInit = function () {
        this.getGroeps();
        this.alertSaturday();
    };
    OptionsComponent.prototype.alertSaturday = function () {
        var _this = this;
        var appSettings = require("tns-core-modules/application-settings");
        if (appSettings.hasKey("settingsDate")) {
            var weekDay = new Date(appSettings.getString("settingsDate")).getDay();
            if (weekDay === 6) {
                var options = {
                    title: "Transfer Day",
                    message: "Indien je acties voor huidige groepen wenst te doen, " +
                        "pas je de datum naar vrijdag deze week aan bij settings!",
                    okButtonText: "Settings",
                    cancelButtonText: "Nieuwe groep"
                };
                dialogs.confirm(options).then(function (result) {
                    if (result) {
                        _this.routerExtensions.navigate(["/settings"], {
                            transition: {
                                name: "fade"
                            }
                        });
                    }
                });
            }
        }
    };
    OptionsComponent.prototype.selectedIndexChangeDebouncer = function (args) {
        var _this = this;
        var picker = args.object;
        // If we are the same index as the last time, or the next time; we skip doing anything.
        if (picker.selectedIndex === this.lastTimer.value) {
            return;
        }
        // Grab our current value...
        this.lastTimer.value = picker.selectedIndex;
        // If the timer is already running, clear it...
        if (this.lastTimer.id != null) {
            clearTimeout(this.lastTimer.id);
        }
        // Start a new timer  (runs in 1/4 of a second)
        this.lastTimer.id = setTimeout(function () {
            _this.lastTimer.id = null;
            _this.selectedGroepIndexChanged(args);
        }, 350);
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
            page_1.Page, option_service_1.OptionService, nativescript_angular_1.RouterExtensions])
    ], OptionsComponent);
    return OptionsComponent;
}());
exports.OptionsComponent = OptionsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3B0aW9ucy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJvcHRpb25zLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFrRDtBQUNsRCw2REFBd0Q7QUFHeEQsa0RBQW9EO0FBQ3BELHFEQUF1RDtBQUV2RCxpREFBZ0Q7QUFDaEQsbUVBQW1GO0FBQ25GLGdEQUErQztBQU8vQyx1RUFBcUU7QUFDckUsaUVBQStEO0FBQy9ELG1FQUFpRTtBQVFqRTtJQStCSSwwQkFBb0IsWUFBMEIsRUFBVSxlQUFnQyxFQUNwRSxJQUFVLEVBQVUsYUFBNEIsRUFBVSxnQkFBa0M7UUFENUYsaUJBQVksR0FBWixZQUFZLENBQWM7UUFBVSxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDcEUsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUFVLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQVUscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQTlCaEgsV0FBTSxHQUFpQixFQUFFLENBQUM7UUFDMUIsZUFBVSxHQUFXLEVBQUUsQ0FBQztRQUV4QixjQUFTLEdBQVksS0FBSyxDQUFDO1FBSTNCLGVBQVUsR0FBZSxFQUFFLENBQUM7UUFFNUIscUJBQWdCLEdBQTBCLEVBQUUsQ0FBQztRQUM3Qyx3QkFBbUIsR0FBNEIsRUFBRSxDQUFDO1FBQ2xELG1CQUFjLEdBQW1CO1lBQzdCLEVBQUUsRUFBRSxHQUFHO1lBQ1AsSUFBSSxFQUFFLEVBQUU7U0FDWCxDQUFDO1FBRUYsdUJBQWtCLEdBQVcsQ0FBQyxDQUFDO1FBRS9CLHdCQUFtQixHQUFZLEtBQUssQ0FBQztRQUNyQyxxQkFBZ0IsR0FBMkIsRUFBRSxDQUFDO1FBRTlDLDBCQUFxQixHQUFZLEtBQUssQ0FBQztRQUN2Qyx1QkFBa0IsR0FBNkIsRUFBRSxDQUFDO1FBRWxELHdCQUFtQixHQUFZLEtBQUssQ0FBQztRQUNyQyxxQkFBZ0IsR0FBMkIsRUFBRSxDQUFDO1FBRTlDLGNBQVMsR0FB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Q0FDTjtnQkFDSSxLQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztnQkFDcEIsT0FBTyxDQUFDLEdBQUcsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO1lBQzVDLENBQUMsRUFDRCxVQUFDLEtBQUs7Z0JBQ0YsS0FBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7Z0JBQ3BCLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ25CLHVCQUF1QjtZQUMzQixDQUFDLENBQ0osQ0FBQztTQUNUO0lBQ0wsQ0FBQztJQUVELDRDQUFpQixHQUFqQjtRQUNJLElBQU0sVUFBVSxHQUFrQixHQUFHLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDcEQsVUFBVSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQzVCLENBQUM7SUEzYlEsZ0JBQWdCO1FBTjVCLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsU0FBUztZQUNuQixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsU0FBUyxFQUFFLENBQUMsNEJBQVksRUFBRSxrQ0FBZSxFQUFFLDhCQUFhLENBQUM7WUFDekQsV0FBVyxFQUFFLDBCQUEwQjtTQUMxQyxDQUFDO3lDQWdDb0MsNEJBQVksRUFBMkIsa0NBQWU7WUFDOUQsV0FBSSxFQUF5Qiw4QkFBYSxFQUE0Qix1Q0FBZ0I7T0FoQ3ZHLGdCQUFnQixDQTZiNUI7SUFBRCx1QkFBQztDQUFBLEFBN2JELElBNmJDO0FBN2JZLDRDQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXJcIjtcbmltcG9ydCB7IFJhZERhdGFGb3JtIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC11aS1kYXRhZm9ybVwiO1xuaW1wb3J0IHsgUmFkU2lkZURyYXdlciB9IGZyb20gXCJuYXRpdmVzY3JpcHQtdWktc2lkZWRyYXdlclwiO1xuaW1wb3J0ICogYXMgYXBwIGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2FwcGxpY2F0aW9uXCI7XG5pbXBvcnQgKiBhcyBkaWFsb2dzIGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2RpYWxvZ3NcIjtcbmltcG9ydCB7IExpc3RQaWNrZXIgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9saXN0LXBpY2tlclwiO1xuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3BhZ2VcIjtcbmltcG9ydCB7IFNlZ21lbnRlZEJhciwgU2VnbWVudGVkQmFySXRlbSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3NlZ21lbnRlZC1iYXJcIjtcbmltcG9ydCB7IFNldHRpbmdzIH0gZnJvbSBcIn4vc2V0dGluZ3Mvc2V0dGluZ3NcIjtcbmltcG9ydCB7IEFjdGl2aXR5IH0gZnJvbSBcIn4vc2hhcmVkL21vZGVscy9hY3Rpdml0eS5tb2RlbFwiO1xuaW1wb3J0IHsgQ2FueW9uaW5nQ3VzdG9tZXIgfSBmcm9tIFwifi9zaGFyZWQvbW9kZWxzL2NhbnlvbmluZ0N1c3RvbWVyLm1vZGVsXCI7XG5pbXBvcnQgeyBHcm9lcCB9IGZyb20gXCJ+L3NoYXJlZC9tb2RlbHMvZ3JvZXAubW9kZWxcIjtcbmltcG9ydCB7IE9wdGlvbkNhdGVnb3J5IH0gZnJvbSBcIn4vc2hhcmVkL21vZGVscy9vcHRpb25DYXRlZ29yeS5tb2RlbFwiO1xuaW1wb3J0IHsgUmFmdGluZ0N1c3RvbWVyIH0gZnJvbSBcIn4vc2hhcmVkL21vZGVscy9yYWZ0aW5nQ3VzdG9tZXIubW9kZWxcIjtcbmltcG9ydCB7IFNwZWNpYWxDdXN0b21lciB9IGZyb20gXCJ+L3NoYXJlZC9tb2RlbHMvc3BlY2lhbEN1c3RvbWVyLm1vZGVsXCI7XG5pbXBvcnQgeyBDdXN0b21lclNlcnZpY2UgfSBmcm9tIFwifi9zaGFyZWQvc2VydmljZXMvY3VzdG9tZXIuc2VydmljZVwiO1xuaW1wb3J0IHsgR3JvZXBTZXJ2aWNlIH0gZnJvbSBcIn4vc2hhcmVkL3NlcnZpY2VzL2dyb2VwLnNlcnZpY2VcIjtcbmltcG9ydCB7IE9wdGlvblNlcnZpY2UgfSBmcm9tIFwifi9zaGFyZWQvc2VydmljZXMvb3B0aW9uLnNlcnZpY2VcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwiT3B0aW9uc1wiLFxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgcHJvdmlkZXJzOiBbR3JvZXBTZXJ2aWNlLCBDdXN0b21lclNlcnZpY2UsIE9wdGlvblNlcnZpY2VdLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vb3B0aW9ucy5jb21wb25lbnQuaHRtbFwiXG59KVxuZXhwb3J0IGNsYXNzIE9wdGlvbnNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gICAgZ3JvZXBzOiBBcnJheTxHcm9lcD4gPSBbXTtcbiAgICBncm9lcEl0ZW1zOiBvYmplY3QgPSB7fTtcbiAgICBncm9lcDogR3JvZXA7XG4gICAgaGFzR3JvZXBzOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBpc0J1c3k6IGJvb2xlYW47XG5cbiAgICBhY3Rpdml0aWVzOiBBcnJheTxhbnk+ID0gW107XG5cbiAgICBvcHRpb25DYXRlZ29yaWVzOiBBcnJheTxPcHRpb25DYXRlZ29yeT4gPSBbXTtcbiAgICBvcHRpb25DYXRlZ29yeUl0ZW1zOiBBcnJheTxTZWdtZW50ZWRCYXJJdGVtPiA9IFtdO1xuICAgIG9wdGlvbkNhdGVnb3J5OiBPcHRpb25DYXRlZ29yeSA9IHtcbiAgICAgICAgaWQ6IFwiMVwiLFxuICAgICAgICBuYW1lOiBcIlwiXG4gICAgfTtcblxuICAgIHNlbGVjdGVkR3JvZXBJbmRleDogbnVtYmVyID0gMDtcblxuICAgIGhhc1JhZnRpbmdDdXN0b21lcnM6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICByYWZ0aW5nQ3VzdG9tZXJzOiBBcnJheTxSYWZ0aW5nQ3VzdG9tZXI+ID0gW107XG5cbiAgICBoYXNDYW55b25pbmdDdXN0b21lcnM6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBjYW55b25pbmdDdXN0b21lcnM6IEFycmF5PENhbnlvbmluZ0N1c3RvbWVyPiA9IFtdO1xuXG4gICAgaGFzU3BlY2lhbEN1c3RvbWVyczogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHNwZWNpYWxDdXN0b21lcnM6IEFycmF5PFNwZWNpYWxDdXN0b21lcj4gPSBbXTtcblxuICAgIGxhc3RUaW1lciA9IHtpZDogbnVsbCwgdmFsdWU6IC0xfTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZ3JvZXBTZXJ2aWNlOiBHcm9lcFNlcnZpY2UsIHByaXZhdGUgY3VzdG9tZXJTZXJ2aWNlOiBDdXN0b21lclNlcnZpY2UsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBwYWdlOiBQYWdlLCBwcml2YXRlIG9wdGlvblNlcnZpY2U6IE9wdGlvblNlcnZpY2UsIHByaXZhdGUgcm91dGVyRXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9ucykge1xuICAgIH1cblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmdldEdyb2VwcygpO1xuICAgICAgICB0aGlzLmFsZXJ0U2F0dXJkYXkoKTtcbiAgICB9XG5cbiAgICBhbGVydFNhdHVyZGF5KCk6IHZvaWQge1xuICAgICAgICBjb25zdCBhcHBTZXR0aW5ncyA9IHJlcXVpcmUoXCJ0bnMtY29yZS1tb2R1bGVzL2FwcGxpY2F0aW9uLXNldHRpbmdzXCIpO1xuXG4gICAgICAgIGlmIChhcHBTZXR0aW5ncy5oYXNLZXkoXCJzZXR0aW5nc0RhdGVcIikpIHtcbiAgICAgICAgICAgIGNvbnN0IHdlZWtEYXkgPSBuZXcgRGF0ZShhcHBTZXR0aW5ncy5nZXRTdHJpbmcoXCJzZXR0aW5nc0RhdGVcIikpLmdldERheSgpO1xuXG4gICAgICAgICAgICBpZiAod2Vla0RheSA9PT0gNikge1xuICAgICAgICAgICAgICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIlRyYW5zZmVyIERheVwiLFxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBcIkluZGllbiBqZSBhY3RpZXMgdm9vciBodWlkaWdlIGdyb2VwZW4gd2Vuc3QgdGUgZG9lbiwgXCIgK1xuICAgICAgICAgICAgICAgICAgICBcInBhcyBqZSBkZSBkYXR1bSBuYWFyIHZyaWpkYWcgZGV6ZSB3ZWVrIGFhbiBiaWogc2V0dGluZ3MhXCIsXG4gICAgICAgICAgICAgICAgICAgIG9rQnV0dG9uVGV4dDogXCJTZXR0aW5nc1wiLFxuICAgICAgICAgICAgICAgICAgICBjYW5jZWxCdXR0b25UZXh0OiBcIk5pZXV3ZSBncm9lcFwiXG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIGRpYWxvZ3MuY29uZmlybShvcHRpb25zKS50aGVuKChyZXN1bHQ6IGJvb2xlYW4pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFtcIi9zZXR0aW5nc1wiXSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zaXRpb246IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJmYWRlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBzZWxlY3RlZEluZGV4Q2hhbmdlRGVib3VuY2VyKGFyZ3MpIHtcbiAgICAgICAgY29uc3QgcGlja2VyID0gPExpc3RQaWNrZXI+YXJncy5vYmplY3Q7XG4gICAgICAgIC8vIElmIHdlIGFyZSB0aGUgc2FtZSBpbmRleCBhcyB0aGUgbGFzdCB0aW1lLCBvciB0aGUgbmV4dCB0aW1lOyB3ZSBza2lwIGRvaW5nIGFueXRoaW5nLlxuICAgICAgICBpZiAocGlja2VyLnNlbGVjdGVkSW5kZXggPT09IHRoaXMubGFzdFRpbWVyLnZhbHVlKSB7IHJldHVybjsgfVxuXG4gICAgICAgIC8vIEdyYWIgb3VyIGN1cnJlbnQgdmFsdWUuLi5cbiAgICAgICAgdGhpcy5sYXN0VGltZXIudmFsdWUgPSBwaWNrZXIuc2VsZWN0ZWRJbmRleDtcblxuICAgICAgICAvLyBJZiB0aGUgdGltZXIgaXMgYWxyZWFkeSBydW5uaW5nLCBjbGVhciBpdC4uLlxuICAgICAgICBpZiAodGhpcy5sYXN0VGltZXIuaWQgIT0gbnVsbCkgeyBjbGVhclRpbWVvdXQodGhpcy5sYXN0VGltZXIuaWQpOyB9XG5cbiAgICAgICAgLy8gU3RhcnQgYSBuZXcgdGltZXIgIChydW5zIGluIDEvNCBvZiBhIHNlY29uZClcbiAgICAgICAgdGhpcy5sYXN0VGltZXIuaWQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMubGFzdFRpbWVyLmlkID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRHcm9lcEluZGV4Q2hhbmdlZChhcmdzKTtcbiAgICAgICAgfSwgMzUwKTtcbiAgICB9XG5cbiAgICBzZWxlY3RlZEdyb2VwSW5kZXhDaGFuZ2VkKGFyZ3MpIHtcbiAgICAgICAgY29uc3QgcGlja2VyID0gPExpc3RQaWNrZXI+YXJncy5vYmplY3Q7XG5cbiAgICAgICAgaWYgKHRoaXMuZ3JvZXBzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHRoaXMuZ3JvZXAgPSB0aGlzLmdyb2Vwc1twaWNrZXIuc2VsZWN0ZWRJbmRleF07XG5cbiAgICAgICAgICAgIGlmICgodHlwZW9mIHRoaXMub3B0aW9uQ2F0ZWdvcnkgIT09IFwidW5kZWZpbmVkXCIgJiZcbiAgICAgICAgICAgIHRoaXMub3B0aW9uQ2F0ZWdvcnkgIT09IG51bGwgPyB0aGlzLm9wdGlvbkNhdGVnb3J5LmlkIDogdm9pZCAwKSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5nZXRPcHRpb25DYXRlZ29yaWVzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIHNlbGVjdGVkT3B0aW9uQ2F0ZWdvcnlJbmRleENoYW5nZWQoYXJncykge1xuICAgICAgICBjb25zdCBzZWdtZW50ZWRCYXIgPSA8U2VnbWVudGVkQmFyPmFyZ3Mub2JqZWN0O1xuICAgICAgICBjb25zdCBzZWxlY3RlZEluZGV4ID0gc2VnbWVudGVkQmFyLnNlbGVjdGVkSW5kZXg7XG5cbiAgICAgICAgaWYgKHRoaXMub3B0aW9uQ2F0ZWdvcmllcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB0aGlzLm9wdGlvbkNhdGVnb3J5ID0gdGhpcy5vcHRpb25DYXRlZ29yaWVzW3NlbGVjdGVkSW5kZXhdO1xuICAgICAgICAgICAgdGhpcy5nZXRBY3Rpdml0aWVzKCk7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIGdldEN1c3RvbWVycygpOiB2b2lkIHtcbiAgICAgICAgaWYgKCh0eXBlb2YgdGhpcy5ncm9lcCAhPT0gXCJ1bmRlZmluZWRcIiAmJlxuICAgICAgICB0aGlzLmdyb2VwICE9PSBudWxsID8gdGhpcy5ncm9lcC5pZCA6IHZvaWQgMCkgIT0gbnVsbCkge1xuICAgICAgICAgICAgc3dpdGNoICh0aGlzLm9wdGlvbkNhdGVnb3J5Lm5hbWUpIHtcbiAgICAgICAgICAgICAgICBjYXNlIFwicmFmdFwiOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdldFJhZnRpbmdDdXN0b21lcnMoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlIFwiY2FueW9uXCI6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0Q2FueW9uaW5nQ3VzdG9tZXJzKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSBcInNwZWNpYWxcIjpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRTcGVjaWFsQ3VzdG9tZXJzKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0R3JvZXBzKCk6IHZvaWQge1xuICAgICAgICBjb25zdCBsb2NhdGlvbklkID0gU2V0dGluZ3MuZ2V0TG9jYXRpb24oKTtcbiAgICAgICAgY29uc3QgZGF0ZSA9IFNldHRpbmdzLmdldERhdGUoKTtcblxuICAgICAgICB0aGlzLmlzQnVzeSA9IHRydWU7XG5cbiAgICAgICAgdGhpcy5ncm9lcFNlcnZpY2UuZ2V0QWxsR3JvZXBzRm9yV2Vla0FuZExvY2F0aW9uQWN0aW9uKGRhdGUsIGxvY2F0aW9uSWQpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgIChyZXN1bHQ6IEFycmF5PEdyb2VwPikgPT4ge1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ3JvZXBzID0gcmVzdWx0O1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmdyb2Vwcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdyb2VwSXRlbXMgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbXM6IHRoaXMuZ3JvZXBzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlbmd0aDogdGhpcy5ncm9lcHMubGVuZ3RoLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdldEl0ZW06IChpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBpdGVtID0gdGhpcy5ncm9lcHNbaW5kZXhdO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpdGVtLm5hbWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGFzR3JvZXBzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZm91bmQgbWUgc29tZSBncm9lcHNcIik7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ3JvZXAgPSB0aGlzLmdyb2Vwc1swXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0T3B0aW9uQ2F0ZWdvcmllcygpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNCdXN5ID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmRpcihlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGFzR3JvZXBzID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNCdXN5ID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICAgICAgLypUT0RPOiBoYW5kbGUgZXJyb3JzKi9cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuICAgIH1cblxuICAgIGdldE9wdGlvbkNhdGVnb3JpZXMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuaXNCdXN5ID0gdHJ1ZTtcblxuICAgICAgICB0aGlzLm9wdGlvblNlcnZpY2UuZ2V0QWxsQ2F0ZWdvcmllc0FjdGlvbigpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgIChyZXN1bHQ6IEFycmF5PE9wdGlvbkNhdGVnb3J5PikgPT4ge1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3B0aW9uQ2F0ZWdvcmllcyA9IHJlc3VsdDtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJmb3VuZCBtZSBzb21lIG9wdGlvbkNhdGVnb3JpZXNcIik7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vcHRpb25DYXRlZ29yeUl0ZW1zID0gW107XG4gICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3Qgb3B0aW9uQ2F0ZWdvcnkgb2YgdGhpcy5vcHRpb25DYXRlZ29yaWVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzZWdtZW50ZWRCYXJJdGVtID0gPFNlZ21lbnRlZEJhckl0ZW0+bmV3IFNlZ21lbnRlZEJhckl0ZW0oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlZ21lbnRlZEJhckl0ZW0udGl0bGUgPSBvcHRpb25DYXRlZ29yeS5uYW1lO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcHRpb25DYXRlZ29yeUl0ZW1zLnB1c2goc2VnbWVudGVkQmFySXRlbSk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5vcHRpb25DYXRlZ29yaWVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3B0aW9uQ2F0ZWdvcnkgPSB0aGlzLm9wdGlvbkNhdGVnb3JpZXNbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdldEFjdGl2aXRpZXMoKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaXNCdXN5ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZGlyKGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc0J1c3kgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgICAgICAvKlRPRE86IGhhbmRsZSBlcnJvcnMqL1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7XG4gICAgfVxuXG4gICAgZ2V0UmFmdGluZ0N1c3RvbWVycygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5pc0J1c3kgPSB0cnVlO1xuXG4gICAgICAgIHRoaXMuY3VzdG9tZXJTZXJ2aWNlLmdldEFsbEJ5R3JvZXBXaXRoUmFmdGluZ09wdGlvbkFjdGlvbih0aGlzLmdyb2VwLmlkKVxuICAgICAgICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICAocmVzdWx0OiBBcnJheTxSYWZ0aW5nQ3VzdG9tZXI+KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmFmdGluZ0N1c3RvbWVycyA9IHJlc3VsdDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYXNSYWZ0aW5nQ3VzdG9tZXJzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJmb3VuZCBtZSBzb21lIHJhZnRpbmcgY3VzdG9tZXJzXCIpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzQnVzeSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZGlyKGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYXNSYWZ0aW5nQ3VzdG9tZXJzID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNCdXN5ID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICAgICAgLypUT0RPOiBoYW5kbGUgZXJyb3JzKi9cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuXG4gICAgfVxuXG4gICAgZ2V0Q2FueW9uaW5nQ3VzdG9tZXJzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmlzQnVzeSA9IHRydWU7XG5cbiAgICAgICAgdGhpcy5jdXN0b21lclNlcnZpY2UuZ2V0QWxsQnlHcm9lcFdpdGhDYW55b25pbmdPcHRpb25BY3Rpb24odGhpcy5ncm9lcC5pZClcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgKHJlc3VsdDogQXJyYXk8Q2FueW9uaW5nQ3VzdG9tZXI+KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBpID0gMDtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBjYW55b25pbmdDdXN0b21lciBvZiByZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbnlvbmluZ0N1c3RvbWVyLnBvc3NpYmxlQWN0aXZpdGllc0Z1bGwgPVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWFwQ3VzdG9tZXJBY3Rpdml0aWVzRnVsbChjYW55b25pbmdDdXN0b21lci5wb3NzaWJsZUFjdGl2aXRpZXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FueW9uaW5nQ3VzdG9tZXIucG9zc2libGVBY3Rpdml0aWVzID1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1hcEN1c3RvbWVyQWN0aXZpdGllc05hbWUoY2FueW9uaW5nQ3VzdG9tZXIucG9zc2libGVBY3Rpdml0aWVzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdFtpXSA9IGNhbnlvbmluZ0N1c3RvbWVyO1xuICAgICAgICAgICAgICAgICAgICAgICAgaSsrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2FueW9uaW5nQ3VzdG9tZXJzID0gcmVzdWx0O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhc0NhbnlvbmluZ0N1c3RvbWVycyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZm91bmQgbWUgc29tZSBjdXN0b21lcnNcIik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNCdXN5ID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmRpcihlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGFzQ2FueW9uaW5nQ3VzdG9tZXJzID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNCdXN5ID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICAgICAgLypUT0RPOiBoYW5kbGUgZXJyb3JzKi9cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuXG4gICAgfVxuXG4gICAgZ2V0U3BlY2lhbEN1c3RvbWVycygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5pc0J1c3kgPSB0cnVlO1xuXG4gICAgICAgIHRoaXMuY3VzdG9tZXJTZXJ2aWNlLmdldEFsbEJ5R3JvZXBXaXRoU3BlY2lhbE9wdGlvbkFjdGlvbih0aGlzLmdyb2VwLmlkKVxuICAgICAgICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICAocmVzdWx0OiBBcnJheTxTcGVjaWFsQ3VzdG9tZXI+KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBpID0gMDtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBzcGVjaWFsQ3VzdG9tZXIgb2YgcmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzcGVjaWFsQ3VzdG9tZXIucG9zc2libGVBY3Rpdml0aWVzRnVsbCA9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXBDdXN0b21lckFjdGl2aXRpZXNGdWxsKHNwZWNpYWxDdXN0b21lci5wb3NzaWJsZUFjdGl2aXRpZXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc3BlY2lhbEN1c3RvbWVyLnBvc3NpYmxlQWN0aXZpdGllcyA9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXBDdXN0b21lckFjdGl2aXRpZXNOYW1lKHNwZWNpYWxDdXN0b21lci5wb3NzaWJsZUFjdGl2aXRpZXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0W2ldID0gc3BlY2lhbEN1c3RvbWVyO1xuICAgICAgICAgICAgICAgICAgICAgICAgaSsrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3BlY2lhbEN1c3RvbWVycyA9IHJlc3VsdDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYXNTcGVjaWFsQ3VzdG9tZXJzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJmb3VuZCBtZSBzb21lIGN1c3RvbWVyc1wiKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc0J1c3kgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmRpcihlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGFzU3BlY2lhbEN1c3RvbWVycyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzQnVzeSA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgICAgIC8qVE9ETzogaGFuZGxlIGVycm9ycyovXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcblxuICAgIH1cblxuICAgIGdldEFjdGl2aXRpZXMoKTogdm9pZCB7XG4gICAgICAgIGlmICgodHlwZW9mIHRoaXMub3B0aW9uQ2F0ZWdvcnkgIT09IFwidW5kZWZpbmVkXCIgJiZcbiAgICAgICAgdGhpcy5vcHRpb25DYXRlZ29yeSAhPT0gbnVsbCA/IHRoaXMub3B0aW9uQ2F0ZWdvcnkuaWQgOiB2b2lkIDApICE9IG51bGwgJiZcbiAgICAgICAgICAgIHRoaXMub3B0aW9uQ2F0ZWdvcnkubmFtZSA9PT0gXCJyYWZ0XCIpIHtcbiAgICAgICAgICAgIHRoaXMuaXNCdXN5ID0gdHJ1ZTtcblxuICAgICAgICAgICAgdGhpcy5vcHRpb25TZXJ2aWNlLmdldEFsbEFjdGl2aXRpZXNCeUNhdGVnb3J5QWN0aW9uKHRoaXMub3B0aW9uQ2F0ZWdvcnkuaWQpXG4gICAgICAgICAgICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgKHJlc3VsdDogQXJyYXk8QWN0aXZpdHk+KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFjdGl2aXRpZXMgPSBbe2tleTogXCIwXCIsIGxhYmVsOiBcIktpZXMgZWVuIGFjdGl2aXRlaXRcIn1dO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hY3Rpdml0aWVzID0gWy4uLnRoaXMuYWN0aXZpdGllcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi5yZXN1bHQubWFwKCh7aWQsIG5hbWV9KSA9PiAoe2tleTogaWQsIGxhYmVsOiBuYW1lfSkpXTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJnb3QgbWUgc29tZSBhY3Rpdml0aWVzXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pc0J1c3kgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRDdXN0b21lcnMoKTtcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmRpcihlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmlzQnVzeSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgLypUT0RPOiBoYW5kbGUgZXJyb3JzKi9cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmdldEN1c3RvbWVycygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZGZQcm9wZXJ0eUNvbW1pdHRlZFJhZnRpbmcoYXJncyk6IHZvaWQge1xuICAgICAgICBjb25zdCBkYXRhRm9ybSA9IDxSYWREYXRhRm9ybT5hcmdzLm9iamVjdDtcbiAgICAgICAgY29uc3QgcmFmdGluZ0N1c3RvbWVyOiBSYWZ0aW5nQ3VzdG9tZXIgPSA8UmFmdGluZ0N1c3RvbWVyPiBKU09OLnBhcnNlKGRhdGFGb3JtLmVkaXRlZE9iamVjdCk7XG5cbiAgICAgICAgdGhpcy5pc0J1c3kgPSB0cnVlO1xuXG4gICAgICAgIHRoaXMuY3VzdG9tZXJTZXJ2aWNlLnB1dEN1c3RvbWVyUmFmdGluZ09wdGlvbkFjdGlvbihyYWZ0aW5nQ3VzdG9tZXIpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc0J1c3kgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJVcGRhdGVkIHJhZnRpbmcgY3VzdG9tZXJcIik7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5kaXIoZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzQnVzeSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAvKlRPRE86IGhhbmRsZSBlcnJvcnMqL1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7XG4gICAgfVxuXG4gICAgZGZQcm9wZXJ0eUNvbW1pdHRlZENhbnlvbmluZyhhcmdzKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGRhdGFGb3JtID0gPFJhZERhdGFGb3JtPmFyZ3Mub2JqZWN0O1xuICAgICAgICBjb25zdCBjYW55b25pbmdDdXN0b21lcjogQ2FueW9uaW5nQ3VzdG9tZXIgPSA8Q2FueW9uaW5nQ3VzdG9tZXI+IEpTT04ucGFyc2UoZGF0YUZvcm0uZWRpdGVkT2JqZWN0KTtcblxuICAgICAgICBjYW55b25pbmdDdXN0b21lci5hY3Rpdml0eUlkcyA9ICh0eXBlb2YgY2FueW9uaW5nQ3VzdG9tZXIuYWN0aXZpdHlJZHMgPT09IFwic3RyaW5nXCIgJiZcbiAgICAgICAgICAgIGNhbnlvbmluZ0N1c3RvbWVyLmFjdGl2aXR5SWRzLmxlbmd0aCA+IDIpXG4gICAgICAgIHx8ICh0eXBlb2YgY2FueW9uaW5nQ3VzdG9tZXIuYWN0aXZpdHlJZHMgPT09IFwib2JqZWN0XCIgJiZcbiAgICAgICAgICAgIGNhbnlvbmluZ0N1c3RvbWVyLmFjdGl2aXR5SWRzLmxlbmd0aCAhPT0gMCkgPyB0aGlzLmdldEFjdGl2aXR5SWRzKGNhbnlvbmluZ0N1c3RvbWVyLmFjdGl2aXR5SWRzLFxuICAgICAgICAgICAgY2FueW9uaW5nQ3VzdG9tZXIucG9zc2libGVBY3Rpdml0aWVzRnVsbCkgOiBbXTtcblxuICAgICAgICBpZiAoY2FueW9uaW5nQ3VzdG9tZXIuYWN0aXZpdHlJZHMpIHtcbiAgICAgICAgICAgIGNhbnlvbmluZ0N1c3RvbWVyLmFjdGl2aXR5SWRzID0gSlNPTi5zdHJpbmdpZnkoY2FueW9uaW5nQ3VzdG9tZXIuYWN0aXZpdHlJZHMpO1xuXG4gICAgICAgICAgICB0aGlzLmlzQnVzeSA9IHRydWU7XG5cbiAgICAgICAgICAgIHRoaXMuY3VzdG9tZXJTZXJ2aWNlLnB1dEN1c3RvbWVyQ2FueW9uaW5nT3B0aW9uQWN0aW9uKGNhbnlvbmluZ0N1c3RvbWVyKVxuICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaXNCdXN5ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlVwZGF0ZWQgY2FueW9uaW5nIGN1c3RvbWVyXCIpO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaXNCdXN5ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmRpcihlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgICAgICAvKlRPRE86IGhhbmRsZSBlcnJvcnMqL1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldEFjdGl2aXR5SWRzKGFjdGl2aXRpZXMsIGFjdGl2aXRpZXNGdWxsKTogQXJyYXk8c3RyaW5nPiB7XG4gICAgICAgIGNvbnN0IGFjdGl2aXRpZXNJZHMgPSBbXTtcbiAgICAgICAgLypzdWRkZW5seSBhY3Rpdml0aWVzIGlzIGEgc3RyaW5nKi9cblxuICAgICAgICBpZiAodHlwZW9mIGFjdGl2aXRpZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgIGxldCBzdHJpbmdCdWlsZCA9IFwiXCI7XG4gICAgICAgICAgICAvKlJlbW92ZSBbIF0qL1xuICAgICAgICAgICAgbGV0IGkgPSAxO1xuICAgICAgICAgICAgY29uc3QgbGVuZ3RoU3RyaW5nID0gYWN0aXZpdGllcy5sZW5ndGg7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGxldHRlciBvZiBhY3Rpdml0aWVzKSB7XG4gICAgICAgICAgICAgICAgaWYgKGkgIT09IDEgJiYgaSA8IGxlbmd0aFN0cmluZykge1xuICAgICAgICAgICAgICAgICAgICBzdHJpbmdCdWlsZCArPSBsZXR0ZXI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGkrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHN0cmluZ0J1aWxkLnJlcGxhY2UoL1xccy9nLCBcIlwiKTtcbiAgICAgICAgICAgIGNvbnN0IHRleHRBcnIgPSBzdHJpbmdCdWlsZC5zcGxpdChcIixcIik7XG4gICAgICAgICAgICBjb25zdCBhcnJBY3Rpdml0aWVzID0gW107XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHRleHQgb2YgdGV4dEFycikge1xuICAgICAgICAgICAgICAgIGFyckFjdGl2aXRpZXMucHVzaChTdHJpbmcodGV4dCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYWN0aXZpdGllcyA9IGFyckFjdGl2aXRpZXM7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGNvbnN0IGFjdGl2aXR5TmFtZSBvZiBhY3Rpdml0aWVzKSB7XG4gICAgICAgICAgICBjb25zdCBhY3Rpdml0eUlkID0gYWN0aXZpdGllc0Z1bGxcbiAgICAgICAgICAgICAgICAuZmluZCgoeCkgPT4geC5sYWJlbCA9PT0gYWN0aXZpdHlOYW1lLnRyaW0oKSkua2V5O1xuICAgICAgICAgICAgYWN0aXZpdGllc0lkcy5wdXNoKGFjdGl2aXR5SWQpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGFjdGl2aXRpZXNJZHM7XG4gICAgfVxuXG4gICAgbWFwQ3VzdG9tZXJBY3Rpdml0aWVzTmFtZShhY3Rpdml0aWVzKSB7XG4gICAgICAgIHJldHVybiBhY3Rpdml0aWVzLm1hcCgoe2lkLCBuYW1lfSkgPT4gKG5hbWUpKTtcbiAgICB9XG5cbiAgICBtYXBDdXN0b21lckFjdGl2aXRpZXNGdWxsKGFjdGl2aXRpZXMpIHtcbiAgICAgICAgcmV0dXJuIGFjdGl2aXRpZXMubWFwKCh7aWQsIG5hbWV9KSA9PiAoe2tleTogaWQsIGxhYmVsOiBuYW1lfSkpO1xuICAgIH1cblxuICAgIGRmUHJvcGVydHlDb21taXR0ZWRTcGVjaWFsKGFyZ3MpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgZGF0YUZvcm0gPSA8UmFkRGF0YUZvcm0+YXJncy5vYmplY3Q7XG4gICAgICAgIGNvbnN0IHNwZWNpYWxDdXN0b21lcjogU3BlY2lhbEN1c3RvbWVyID0gPFNwZWNpYWxDdXN0b21lcj4gSlNPTi5wYXJzZShkYXRhRm9ybS5lZGl0ZWRPYmplY3QpO1xuXG4gICAgICAgIHNwZWNpYWxDdXN0b21lci5hY3Rpdml0eUlkcyA9ICh0eXBlb2Ygc3BlY2lhbEN1c3RvbWVyLmFjdGl2aXR5SWRzID09PSBcInN0cmluZ1wiICYmXG4gICAgICAgICAgICBzcGVjaWFsQ3VzdG9tZXIuYWN0aXZpdHlJZHMubGVuZ3RoID4gMilcbiAgICAgICAgfHwgKHR5cGVvZiBzcGVjaWFsQ3VzdG9tZXIuYWN0aXZpdHlJZHMgPT09IFwib2JqZWN0XCIgJiZcbiAgICAgICAgICAgIHNwZWNpYWxDdXN0b21lci5hY3Rpdml0eUlkcy5sZW5ndGggIT09IDApID8gdGhpcy5nZXRBY3Rpdml0eUlkcyhzcGVjaWFsQ3VzdG9tZXIuYWN0aXZpdHlJZHMsXG4gICAgICAgICAgICBzcGVjaWFsQ3VzdG9tZXIucG9zc2libGVBY3Rpdml0aWVzRnVsbCkgOiBbXTtcblxuICAgICAgICBpZiAoc3BlY2lhbEN1c3RvbWVyLmFjdGl2aXR5SWRzKSB7XG4gICAgICAgICAgICBzcGVjaWFsQ3VzdG9tZXIuYWN0aXZpdHlJZHMgPSBKU09OLnN0cmluZ2lmeShzcGVjaWFsQ3VzdG9tZXIuYWN0aXZpdHlJZHMpO1xuICAgICAgICAgICAgdGhpcy5pc0J1c3kgPSB0cnVlO1xuXG4gICAgICAgICAgICB0aGlzLmN1c3RvbWVyU2VydmljZS5wdXRDdXN0b21lclNwZWNpYWxPcHRpb25BY3Rpb24oc3BlY2lhbEN1c3RvbWVyKVxuICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaXNCdXN5ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlVwZGF0ZWQgc3BlY2lhbCBjdXN0b21lclwiKTtcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmlzQnVzeSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5kaXIoZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLypUT0RPOiBoYW5kbGUgZXJyb3JzKi9cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkRyYXdlckJ1dHRvblRhcCgpOiB2b2lkIHtcbiAgICAgICAgY29uc3Qgc2lkZURyYXdlciA9IDxSYWRTaWRlRHJhd2VyPmFwcC5nZXRSb290VmlldygpO1xuICAgICAgICBzaWRlRHJhd2VyLnNob3dEcmF3ZXIoKTtcbiAgICB9XG5cbn1cbiJdfQ==