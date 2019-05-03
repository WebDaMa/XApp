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
