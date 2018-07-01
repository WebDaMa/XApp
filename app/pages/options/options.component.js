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
        this.getGroeps();
        this.getOptionCategories();
        this.page.on(page_1.Page.navigatingToEvent, function () {
            _this.getGroeps();
            _this.getOptionCategories();
            _this.getCustomers();
        });
    };
    OptionsComponent.prototype.selectedGroepIndexChanged = function (args) {
        var picker = args.object;
        if (this.groeps.length > 0) {
            this.groep = this.groeps[picker.selectedIndex];
            if ((typeof this.optionCategory !== "undefined" &&
                this.optionCategory !== null ? this.optionCategory.id : void 0) != null) {
                this.getCustomers();
            }
        }
    };
    OptionsComponent.prototype.selectedOptionCategoryIndexChanged = function (args) {
        var segmentedBar = args.object;
        var selectedIndex = segmentedBar.selectedIndex;
        if (this.optionCategories.length > 0) {
            this.optionCategory = this.optionCategories[selectedIndex];
            this.getActivities();
            this.getCustomers();
        }
    };
    OptionsComponent.prototype.getCustomers = function () {
        if ((typeof this.groep !== "undefined" &&
            this.groep !== null ? this.groep.id : void 0) != null) {
            this.isBusy = true;
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
            }
        }, function (error) {
            console.dir(error);
            _this.hasGroeps = false;
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
                _this.getCustomers();
            }
        }, function (error) {
            console.dir(error);
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
            /*TODO: handle errors*/
        });
    };
    OptionsComponent.prototype.getActivities = function () {
        var _this = this;
        if ((typeof this.optionCategory !== "undefined" &&
            this.optionCategory !== null ? this.optionCategory.id : void 0) != null) {
            this.optionService.getAllActivitiesByCategoryAction(this.optionCategory.id)
                .subscribe(function (result) {
                _this.activities = [{ key: "0", label: "Kies een activiteit" }];
                _this.activities = _this.activities.concat(result.map(function (_a) {
                    var id = _a.id, name = _a.name;
                    return ({ key: id, label: name });
                }));
                console.log("got me some activities");
            }, function (error) {
                console.dir(error);
                /*TODO: handle errors*/
            });
        }
    };
    OptionsComponent.prototype.dfPropertyCommittedRafting = function (args) {
        var dataForm = args.object;
        var raftingCustomer = JSON.parse(dataForm.editedObject);
        if (raftingCustomer.activityId !== "0") {
            this.customerService.putCustomerRaftingOptionAction(raftingCustomer)
                .subscribe(function () {
                console.log("Updated rafting customer");
            }, function (error) {
                console.dir(error);
                /*TODO: handle errors*/
            });
        }
    };
    OptionsComponent.prototype.dfPropertyCommittedCanyoning = function (args) {
    };
    OptionsComponent.prototype.dfPropertyCommittedSpecial = function (args) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3B0aW9ucy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJvcHRpb25zLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFrRDtBQUdsRCxpREFBZ0Q7QUFDaEQsbUVBQW1GO0FBQ25GLGdEQUErQztBQU8vQyx1RUFBcUU7QUFDckUsaUVBQStEO0FBQy9ELG1FQUFpRTtBQVFqRTtJQTZCSSwwQkFBb0IsWUFBMEIsRUFBVSxlQUFnQyxFQUNwRSxJQUFVLEVBQVUsYUFBNEI7UUFEaEQsaUJBQVksR0FBWixZQUFZLENBQWM7UUFBVSxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDcEUsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUFVLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBNUJwRSxXQUFNLEdBQWlCLEVBQUUsQ0FBQztRQUMxQixlQUFVLEdBQVcsRUFBRSxDQUFDO1FBRXhCLGNBQVMsR0FBWSxLQUFLLENBQUM7UUFFM0IsV0FBTSxHQUFZLElBQUksQ0FBQztRQUV2QixlQUFVLEdBQWtCLEVBQUUsQ0FBQztRQUUvQixxQkFBZ0IsR0FBMEIsRUFBRSxDQUFDO1FBQzdDLHdCQUFtQixHQUE0QixFQUFFLENBQUM7UUFDbEQsbUJBQWMsR0FBbUI7WUFDN0IsRUFBRSxFQUFFLEdBQUc7WUFDUCxJQUFJLEVBQUUsRUFBRTtTQUNYLENBQUM7UUFFRix1QkFBa0IsR0FBVyxDQUFDLENBQUM7UUFFL0Isd0JBQW1CLEdBQVksS0FBSyxDQUFDO1FBQ3JDLHFCQUFnQixHQUEyQixFQUFFLENBQUM7UUFFOUMsMEJBQXFCLEdBQVksS0FBSyxDQUFDO1FBQ3ZDLHVCQUFrQixHQUE2QixFQUFFLENBQUM7UUFFbEQsd0JBQW1CLEdBQVksS0FBSyxDQUFDO1FBQ3JDLHFCQUFnQixHQUEyQixFQUFFLENBQUM7SUFJOUMsQ0FBQztJQUVELG1DQUFRLEdBQVI7UUFBQSxpQkFTQztRQVJHLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNqQixJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztRQUMzQixJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxXQUFJLENBQUMsaUJBQWlCLEVBQUU7WUFDakMsS0FBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQ2pCLEtBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1lBQzNCLEtBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUN4QixDQUFDLENBQUMsQ0FBQztJQUVQLENBQUM7SUFFRCxvREFBeUIsR0FBekIsVUFBMEIsSUFBSTtRQUMxQixJQUFNLE1BQU0sR0FBZSxJQUFJLENBQUMsTUFBTSxDQUFDO1FBRXZDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDekIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUMvQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLGNBQWMsS0FBSyxXQUFXO2dCQUMvQyxJQUFJLENBQUMsY0FBYyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDdEUsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1lBQ3hCLENBQUM7UUFDTCxDQUFDO0lBRUwsQ0FBQztJQUVELDZEQUFrQyxHQUFsQyxVQUFtQyxJQUFJO1FBQ25DLElBQU0sWUFBWSxHQUFpQixJQUFJLENBQUMsTUFBTSxDQUFDO1FBQy9DLElBQU0sYUFBYSxHQUFHLFlBQVksQ0FBQyxhQUFhLENBQUM7UUFFakQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ25DLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQzNELElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztZQUNyQixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDeEIsQ0FBQztJQUVMLENBQUM7SUFFRCx1Q0FBWSxHQUFaO1FBQ0ksRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxLQUFLLEtBQUssV0FBVztZQUN0QyxJQUFJLENBQUMsS0FBSyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNwRCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztZQUNuQixNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQy9CLEtBQUssTUFBTTtvQkFDUCxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztvQkFDM0IsS0FBSyxDQUFDO2dCQUVWLEtBQUssUUFBUTtvQkFDVCxJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztvQkFDN0IsS0FBSyxDQUFDO2dCQUVWLEtBQUssU0FBUztvQkFDVixJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztvQkFDM0IsS0FBSyxDQUFDO1lBQ2QsQ0FBQztRQUNMLENBQUM7SUFDTCxDQUFDO0lBRUQsb0NBQVMsR0FBVDtRQUFBLGlCQWlDQztRQWhDRyxJQUFNLFVBQVUsR0FBRyxtQkFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQzFDLElBQU0sSUFBSSxHQUFHLG1CQUFRLENBQUMsT0FBTyxFQUFFLENBQUM7UUFFaEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxvQ0FBb0MsQ0FBQyxJQUFJLEVBQUUsVUFBVSxDQUFDO2FBQ25FLFNBQVMsQ0FDTixVQUFDLE1BQW9CO1lBRWpCLEtBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1lBRXJCLEVBQUUsQ0FBQyxDQUFDLEtBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3pCLEtBQUksQ0FBQyxVQUFVLEdBQUc7b0JBQ2QsS0FBSyxFQUFFLEtBQUksQ0FBQyxNQUFNO29CQUNsQixNQUFNLEVBQUUsS0FBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNO29CQUMxQixPQUFPLEVBQUUsVUFBQyxLQUFLO3dCQUNYLElBQU0sSUFBSSxHQUFHLEtBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7d0JBRWhDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO29CQUNyQixDQUFDO2lCQUNKLENBQUM7Z0JBQ0YsS0FBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7Z0JBQ3RCLE9BQU8sQ0FBQyxHQUFHLENBQUMsc0JBQXNCLENBQUMsQ0FBQztnQkFFcEMsS0FBSSxDQUFDLEtBQUssR0FBRyxLQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2hDLENBQUM7UUFFTCxDQUFDLEVBQ0QsVUFBQyxLQUFLO1lBQ0YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNuQixLQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztZQUN2Qix1QkFBdUI7UUFDM0IsQ0FBQyxDQUNKLENBQUM7SUFDVixDQUFDO0lBRUQsOENBQW1CLEdBQW5CO1FBQUEsaUJBMEJDO1FBekJHLElBQUksQ0FBQyxhQUFhLENBQUMsc0JBQXNCLEVBQUU7YUFDdEMsU0FBUyxDQUNOLFVBQUMsTUFBNkI7WUFFMUIsS0FBSSxDQUFDLGdCQUFnQixHQUFHLE1BQU0sQ0FBQztZQUMvQixPQUFPLENBQUMsR0FBRyxDQUFDLGdDQUFnQyxDQUFDLENBQUM7WUFFOUMsS0FBSSxDQUFDLG1CQUFtQixHQUFHLEVBQUUsQ0FBQztZQUM5QixHQUFHLENBQUMsQ0FBeUIsVUFBcUIsRUFBckIsS0FBQSxLQUFJLENBQUMsZ0JBQWdCLEVBQXJCLGNBQXFCLEVBQXJCLElBQXFCO2dCQUE3QyxJQUFNLGNBQWMsU0FBQTtnQkFDckIsSUFBTSxnQkFBZ0IsR0FBcUIsSUFBSSxnQ0FBZ0IsRUFBRSxDQUFDO2dCQUNsRSxnQkFBZ0IsQ0FBQyxLQUFLLEdBQUcsY0FBYyxDQUFDLElBQUksQ0FBQztnQkFDN0MsS0FBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO2FBQ25EO1lBRUQsRUFBRSxDQUFDLENBQUMsS0FBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNuQyxLQUFJLENBQUMsY0FBYyxHQUFHLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDL0MsS0FBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1lBQ3hCLENBQUM7UUFFTCxDQUFDLEVBQ0QsVUFBQyxLQUFLO1lBQ0YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNuQix1QkFBdUI7UUFDM0IsQ0FBQyxDQUNKLENBQUM7SUFDVixDQUFDO0lBRUQsOENBQW1CLEdBQW5CO1FBQUEsaUJBZ0JDO1FBZkcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxvQ0FBb0MsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQzthQUNuRSxTQUFTLENBQ04sVUFBQyxNQUE4QjtZQUMzQixLQUFJLENBQUMsZ0JBQWdCLEdBQUcsTUFBTSxDQUFDO1lBQy9CLEtBQUksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLENBQUM7WUFDaEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO1lBQy9DLEtBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3hCLENBQUMsRUFDRCxVQUFDLEtBQUs7WUFDRixPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ25CLEtBQUksQ0FBQyxtQkFBbUIsR0FBRyxLQUFLLENBQUM7WUFDakMsdUJBQXVCO1FBQzNCLENBQUMsQ0FDSixDQUFDO0lBRVYsQ0FBQztJQUVELGdEQUFxQixHQUFyQjtRQUFBLGlCQWlCQztRQWhCRyxJQUFJLENBQUMsZUFBZSxDQUFDLHNDQUFzQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDO2FBQ3JFLFNBQVMsQ0FDTixVQUFDLE1BQWdDO1lBQzdCLEtBQUksQ0FBQyxrQkFBa0IsR0FBRyxNQUFNLENBQUM7WUFDakMsS0FBSSxDQUFDLHFCQUFxQixHQUFHLElBQUksQ0FBQztZQUNsQyxPQUFPLENBQUMsR0FBRyxDQUFDLHlCQUF5QixDQUFDLENBQUM7WUFDdkMsS0FBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFFeEIsQ0FBQyxFQUNELFVBQUMsS0FBSztZQUNGLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDbkIsS0FBSSxDQUFDLHFCQUFxQixHQUFHLEtBQUssQ0FBQztZQUNuQyx1QkFBdUI7UUFDM0IsQ0FBQyxDQUNKLENBQUM7SUFFVixDQUFDO0lBRUQsOENBQW1CLEdBQW5CO1FBQUEsaUJBZ0JDO1FBZkcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxvQ0FBb0MsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQzthQUNuRSxTQUFTLENBQ04sVUFBQyxNQUE4QjtZQUMzQixLQUFJLENBQUMsZ0JBQWdCLEdBQUcsTUFBTSxDQUFDO1lBQy9CLEtBQUksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLENBQUM7WUFDaEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO1lBQ3ZDLEtBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3hCLENBQUMsRUFDRCxVQUFDLEtBQUs7WUFDRixPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ25CLEtBQUksQ0FBQyxtQkFBbUIsR0FBRyxLQUFLLENBQUM7WUFDakMsdUJBQXVCO1FBQzNCLENBQUMsQ0FDSixDQUFDO0lBRVYsQ0FBQztJQUVELHdDQUFhLEdBQWI7UUFBQSxpQkFnQkM7UUFmRyxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLGNBQWMsS0FBSyxXQUFXO1lBQy9DLElBQUksQ0FBQyxjQUFjLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ3RFLElBQUksQ0FBQyxhQUFhLENBQUMsZ0NBQWdDLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxFQUFFLENBQUM7aUJBQ3RFLFNBQVMsQ0FDTixVQUFDLE1BQXVCO2dCQUNwQixLQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsRUFBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxxQkFBcUIsRUFBQyxDQUFDLENBQUM7Z0JBQzdELEtBQUksQ0FBQyxVQUFVLEdBQU8sS0FBSSxDQUFDLFVBQVUsUUFBSyxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQUMsRUFBVTt3QkFBVCxVQUFFLEVBQUUsY0FBSTtvQkFBTSxPQUFBLENBQUMsRUFBQyxHQUFHLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUMsQ0FBQztnQkFBeEIsQ0FBd0IsQ0FBQyxDQUFDLENBQUM7Z0JBQ2hHLE9BQU8sQ0FBQyxHQUFHLENBQUMsd0JBQXdCLENBQUMsQ0FBQztZQUMxQyxDQUFDLEVBQ0QsVUFBQyxLQUFLO2dCQUNGLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ25CLHVCQUF1QjtZQUMzQixDQUFDLENBQ0osQ0FBQztRQUNWLENBQUM7SUFDTCxDQUFDO0lBRUQscURBQTBCLEdBQTFCLFVBQTJCLElBQUk7UUFDM0IsSUFBTSxRQUFRLEdBQWdCLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDMUMsSUFBTSxlQUFlLEdBQXNDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBRTdGLEVBQUUsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxVQUFVLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNyQyxJQUFJLENBQUMsZUFBZSxDQUFDLDhCQUE4QixDQUFDLGVBQWUsQ0FBQztpQkFDL0QsU0FBUyxDQUNOO2dCQUNJLE9BQU8sQ0FBQyxHQUFHLENBQUMsMEJBQTBCLENBQUMsQ0FBQztZQUM1QyxDQUFDLEVBQ0QsVUFBQyxLQUFLO2dCQUNGLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ25CLHVCQUF1QjtZQUMzQixDQUFDLENBQ0osQ0FBQztRQUNWLENBQUM7SUFDTCxDQUFDO0lBRUQsdURBQTRCLEdBQTVCLFVBQTZCLElBQUk7SUFFakMsQ0FBQztJQUVELHFEQUEwQixHQUExQixVQUEyQixJQUFJO0lBRS9CLENBQUM7SUF6UFEsZ0JBQWdCO1FBTjVCLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsU0FBUztZQUNuQixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsU0FBUyxFQUFFLENBQUMsNEJBQVksRUFBRSxrQ0FBZSxFQUFFLDhCQUFhLENBQUM7WUFDekQsV0FBVyxFQUFFLDBCQUEwQjtTQUMxQyxDQUFDO3lDQThCb0MsNEJBQVksRUFBMkIsa0NBQWU7WUFDOUQsV0FBSSxFQUF5Qiw4QkFBYTtPQTlCM0QsZ0JBQWdCLENBMlA1QjtJQUFELHVCQUFDO0NBQUEsQUEzUEQsSUEyUEM7QUEzUFksNENBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgUmFkRGF0YUZvcm0gfSBmcm9tIFwibmF0aXZlc2NyaXB0LXVpLWRhdGFmb3JtXCI7XG5pbXBvcnQgeyBMaXN0UGlja2VyIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvbGlzdC1waWNrZXJcIjtcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9wYWdlXCI7XG5pbXBvcnQgeyBTZWdtZW50ZWRCYXIsIFNlZ21lbnRlZEJhckl0ZW0gfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9zZWdtZW50ZWQtYmFyXCI7XG5pbXBvcnQgeyBTZXR0aW5ncyB9IGZyb20gXCJ+L3NldHRpbmdzL3NldHRpbmdzXCI7XG5pbXBvcnQgeyBBY3Rpdml0eSB9IGZyb20gXCJ+L3NoYXJlZC9tb2RlbHMvYWN0aXZpdHkubW9kZWxcIjtcbmltcG9ydCB7IENhbnlvbmluZ0N1c3RvbWVyIH0gZnJvbSBcIn4vc2hhcmVkL21vZGVscy9jYW55b25pbmdDdXN0b21lci5tb2RlbFwiO1xuaW1wb3J0IHsgR3JvZXAgfSBmcm9tIFwifi9zaGFyZWQvbW9kZWxzL2dyb2VwLm1vZGVsXCI7XG5pbXBvcnQgeyBPcHRpb25DYXRlZ29yeSB9IGZyb20gXCJ+L3NoYXJlZC9tb2RlbHMvb3B0aW9uQ2F0ZWdvcnkubW9kZWxcIjtcbmltcG9ydCB7IFJhZnRpbmdDdXN0b21lciB9IGZyb20gXCJ+L3NoYXJlZC9tb2RlbHMvcmFmdGluZ0N1c3RvbWVyLm1vZGVsXCI7XG5pbXBvcnQgeyBTcGVjaWFsQ3VzdG9tZXIgfSBmcm9tIFwifi9zaGFyZWQvbW9kZWxzL3NwZWNpYWxDdXN0b21lci5tb2RlbFwiO1xuaW1wb3J0IHsgQ3VzdG9tZXJTZXJ2aWNlIH0gZnJvbSBcIn4vc2hhcmVkL3NlcnZpY2VzL2N1c3RvbWVyLnNlcnZpY2VcIjtcbmltcG9ydCB7IEdyb2VwU2VydmljZSB9IGZyb20gXCJ+L3NoYXJlZC9zZXJ2aWNlcy9ncm9lcC5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBPcHRpb25TZXJ2aWNlIH0gZnJvbSBcIn4vc2hhcmVkL3NlcnZpY2VzL29wdGlvbi5zZXJ2aWNlXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcIk9wdGlvbnNcIixcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHByb3ZpZGVyczogW0dyb2VwU2VydmljZSwgQ3VzdG9tZXJTZXJ2aWNlLCBPcHRpb25TZXJ2aWNlXSxcbiAgICB0ZW1wbGF0ZVVybDogXCIuL29wdGlvbnMuY29tcG9uZW50Lmh0bWxcIlxufSlcbmV4cG9ydCBjbGFzcyBPcHRpb25zQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICAgIGdyb2VwczogQXJyYXk8R3JvZXA+ID0gW107XG4gICAgZ3JvZXBJdGVtczogb2JqZWN0ID0ge307XG4gICAgZ3JvZXA6IEdyb2VwO1xuICAgIGhhc0dyb2VwczogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgaXNCdXN5OiBib29sZWFuID0gdHJ1ZTtcblxuICAgIGFjdGl2aXRpZXM6IEFycmF5PG9iamVjdD4gPSBbXTtcblxuICAgIG9wdGlvbkNhdGVnb3JpZXM6IEFycmF5PE9wdGlvbkNhdGVnb3J5PiA9IFtdO1xuICAgIG9wdGlvbkNhdGVnb3J5SXRlbXM6IEFycmF5PFNlZ21lbnRlZEJhckl0ZW0+ID0gW107XG4gICAgb3B0aW9uQ2F0ZWdvcnk6IE9wdGlvbkNhdGVnb3J5ID0ge1xuICAgICAgICBpZDogXCIxXCIsXG4gICAgICAgIG5hbWU6IFwiXCJcbiAgICB9O1xuXG4gICAgc2VsZWN0ZWRHcm9lcEluZGV4OiBudW1iZXIgPSAwO1xuXG4gICAgaGFzUmFmdGluZ0N1c3RvbWVyczogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHJhZnRpbmdDdXN0b21lcnM6IEFycmF5PFJhZnRpbmdDdXN0b21lcj4gPSBbXTtcblxuICAgIGhhc0NhbnlvbmluZ0N1c3RvbWVyczogYm9vbGVhbiA9IGZhbHNlO1xuICAgIGNhbnlvbmluZ0N1c3RvbWVyczogQXJyYXk8Q2FueW9uaW5nQ3VzdG9tZXI+ID0gW107XG5cbiAgICBoYXNTcGVjaWFsQ3VzdG9tZXJzOiBib29sZWFuID0gZmFsc2U7XG4gICAgc3BlY2lhbEN1c3RvbWVyczogQXJyYXk8U3BlY2lhbEN1c3RvbWVyPiA9IFtdO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBncm9lcFNlcnZpY2U6IEdyb2VwU2VydmljZSwgcHJpdmF0ZSBjdXN0b21lclNlcnZpY2U6IEN1c3RvbWVyU2VydmljZSxcbiAgICAgICAgICAgICAgICBwcml2YXRlIHBhZ2U6IFBhZ2UsIHByaXZhdGUgb3B0aW9uU2VydmljZTogT3B0aW9uU2VydmljZSkge1xuICAgIH1cblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmdldEdyb2VwcygpO1xuICAgICAgICB0aGlzLmdldE9wdGlvbkNhdGVnb3JpZXMoKTtcbiAgICAgICAgdGhpcy5wYWdlLm9uKFBhZ2UubmF2aWdhdGluZ1RvRXZlbnQsICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZ2V0R3JvZXBzKCk7XG4gICAgICAgICAgICB0aGlzLmdldE9wdGlvbkNhdGVnb3JpZXMoKTtcbiAgICAgICAgICAgIHRoaXMuZ2V0Q3VzdG9tZXJzKCk7XG4gICAgICAgIH0pO1xuXG4gICAgfVxuXG4gICAgc2VsZWN0ZWRHcm9lcEluZGV4Q2hhbmdlZChhcmdzKSB7XG4gICAgICAgIGNvbnN0IHBpY2tlciA9IDxMaXN0UGlja2VyPmFyZ3Mub2JqZWN0O1xuXG4gICAgICAgIGlmICh0aGlzLmdyb2Vwcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB0aGlzLmdyb2VwID0gdGhpcy5ncm9lcHNbcGlja2VyLnNlbGVjdGVkSW5kZXhdO1xuICAgICAgICAgICAgaWYgKCh0eXBlb2YgdGhpcy5vcHRpb25DYXRlZ29yeSAhPT0gXCJ1bmRlZmluZWRcIiAmJlxuICAgICAgICAgICAgdGhpcy5vcHRpb25DYXRlZ29yeSAhPT0gbnVsbCA/IHRoaXMub3B0aW9uQ2F0ZWdvcnkuaWQgOiB2b2lkIDApICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmdldEN1c3RvbWVycygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBzZWxlY3RlZE9wdGlvbkNhdGVnb3J5SW5kZXhDaGFuZ2VkKGFyZ3MpIHtcbiAgICAgICAgY29uc3Qgc2VnbWVudGVkQmFyID0gPFNlZ21lbnRlZEJhcj5hcmdzLm9iamVjdDtcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRJbmRleCA9IHNlZ21lbnRlZEJhci5zZWxlY3RlZEluZGV4O1xuXG4gICAgICAgIGlmICh0aGlzLm9wdGlvbkNhdGVnb3JpZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdGhpcy5vcHRpb25DYXRlZ29yeSA9IHRoaXMub3B0aW9uQ2F0ZWdvcmllc1tzZWxlY3RlZEluZGV4XTtcbiAgICAgICAgICAgIHRoaXMuZ2V0QWN0aXZpdGllcygpO1xuICAgICAgICAgICAgdGhpcy5nZXRDdXN0b21lcnMoKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgZ2V0Q3VzdG9tZXJzKCk6IHZvaWQge1xuICAgICAgICBpZiAoKHR5cGVvZiB0aGlzLmdyb2VwICE9PSBcInVuZGVmaW5lZFwiICYmXG4gICAgICAgIHRoaXMuZ3JvZXAgIT09IG51bGwgPyB0aGlzLmdyb2VwLmlkIDogdm9pZCAwKSAhPSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLmlzQnVzeSA9IHRydWU7XG4gICAgICAgICAgICBzd2l0Y2ggKHRoaXMub3B0aW9uQ2F0ZWdvcnkubmFtZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgXCJyYWZ0XCI6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0UmFmdGluZ0N1c3RvbWVycygpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgXCJjYW55b25cIjpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRDYW55b25pbmdDdXN0b21lcnMoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlIFwic3BlY2lhbFwiOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdldFNwZWNpYWxDdXN0b21lcnMoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRHcm9lcHMoKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGxvY2F0aW9uSWQgPSBTZXR0aW5ncy5nZXRMb2NhdGlvbigpO1xuICAgICAgICBjb25zdCBkYXRlID0gU2V0dGluZ3MuZ2V0RGF0ZSgpO1xuXG4gICAgICAgIHRoaXMuZ3JvZXBTZXJ2aWNlLmdldEFsbEdyb2Vwc0ZvcldlZWtBbmRMb2NhdGlvbkFjdGlvbihkYXRlLCBsb2NhdGlvbklkKVxuICAgICAgICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICAocmVzdWx0OiBBcnJheTxHcm9lcD4pID0+IHtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdyb2VwcyA9IHJlc3VsdDtcblxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5ncm9lcHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ncm9lcEl0ZW1zID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1zOiB0aGlzLmdyb2VwcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZW5ndGg6IHRoaXMuZ3JvZXBzLmxlbmd0aCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBnZXRJdGVtOiAoaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaXRlbSA9IHRoaXMuZ3JvZXBzW2luZGV4XTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXRlbS5uYW1lO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhhc0dyb2VwcyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImZvdW5kIG1lIHNvbWUgZ3JvZXBzXCIpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdyb2VwID0gdGhpcy5ncm9lcHNbMF07XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZGlyKGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYXNHcm9lcHMgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgLypUT0RPOiBoYW5kbGUgZXJyb3JzKi9cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuICAgIH1cblxuICAgIGdldE9wdGlvbkNhdGVnb3JpZXMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMub3B0aW9uU2VydmljZS5nZXRBbGxDYXRlZ29yaWVzQWN0aW9uKClcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgKHJlc3VsdDogQXJyYXk8T3B0aW9uQ2F0ZWdvcnk+KSA9PiB7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vcHRpb25DYXRlZ29yaWVzID0gcmVzdWx0O1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImZvdW5kIG1lIHNvbWUgb3B0aW9uQ2F0ZWdvcmllc1wiKTtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbkNhdGVnb3J5SXRlbXMgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBvcHRpb25DYXRlZ29yeSBvZiB0aGlzLm9wdGlvbkNhdGVnb3JpZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHNlZ21lbnRlZEJhckl0ZW0gPSA8U2VnbWVudGVkQmFySXRlbT5uZXcgU2VnbWVudGVkQmFySXRlbSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VnbWVudGVkQmFySXRlbS50aXRsZSA9IG9wdGlvbkNhdGVnb3J5Lm5hbWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbkNhdGVnb3J5SXRlbXMucHVzaChzZWdtZW50ZWRCYXJJdGVtKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbkNhdGVnb3JpZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcHRpb25DYXRlZ29yeSA9IHRoaXMub3B0aW9uQ2F0ZWdvcmllc1swXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0Q3VzdG9tZXJzKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZGlyKGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgLypUT0RPOiBoYW5kbGUgZXJyb3JzKi9cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuICAgIH1cblxuICAgIGdldFJhZnRpbmdDdXN0b21lcnMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuY3VzdG9tZXJTZXJ2aWNlLmdldEFsbEJ5R3JvZXBXaXRoUmFmdGluZ09wdGlvbkFjdGlvbih0aGlzLmdyb2VwLmlkKVxuICAgICAgICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICAocmVzdWx0OiBBcnJheTxSYWZ0aW5nQ3VzdG9tZXI+KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmFmdGluZ0N1c3RvbWVycyA9IHJlc3VsdDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYXNSYWZ0aW5nQ3VzdG9tZXJzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJmb3VuZCBtZSBzb21lIHJhZnRpbmcgY3VzdG9tZXJzXCIpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzQnVzeSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZGlyKGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYXNSYWZ0aW5nQ3VzdG9tZXJzID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIC8qVE9ETzogaGFuZGxlIGVycm9ycyovXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcblxuICAgIH1cblxuICAgIGdldENhbnlvbmluZ0N1c3RvbWVycygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jdXN0b21lclNlcnZpY2UuZ2V0QWxsQnlHcm9lcFdpdGhDYW55b25pbmdPcHRpb25BY3Rpb24odGhpcy5ncm9lcC5pZClcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgKHJlc3VsdDogQXJyYXk8Q2FueW9uaW5nQ3VzdG9tZXI+KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2FueW9uaW5nQ3VzdG9tZXJzID0gcmVzdWx0O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhc0NhbnlvbmluZ0N1c3RvbWVycyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZm91bmQgbWUgc29tZSBjdXN0b21lcnNcIik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNCdXN5ID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmRpcihlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGFzQ2FueW9uaW5nQ3VzdG9tZXJzID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIC8qVE9ETzogaGFuZGxlIGVycm9ycyovXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcblxuICAgIH1cblxuICAgIGdldFNwZWNpYWxDdXN0b21lcnMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuY3VzdG9tZXJTZXJ2aWNlLmdldEFsbEJ5R3JvZXBXaXRoU3BlY2lhbE9wdGlvbkFjdGlvbih0aGlzLmdyb2VwLmlkKVxuICAgICAgICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICAocmVzdWx0OiBBcnJheTxTcGVjaWFsQ3VzdG9tZXI+KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3BlY2lhbEN1c3RvbWVycyA9IHJlc3VsdDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYXNTcGVjaWFsQ3VzdG9tZXJzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJmb3VuZCBtZSBzb21lIGN1c3RvbWVyc1wiKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc0J1c3kgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmRpcihlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGFzU3BlY2lhbEN1c3RvbWVycyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAvKlRPRE86IGhhbmRsZSBlcnJvcnMqL1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7XG5cbiAgICB9XG5cbiAgICBnZXRBY3Rpdml0aWVzKCk6IHZvaWQge1xuICAgICAgICBpZiAoKHR5cGVvZiB0aGlzLm9wdGlvbkNhdGVnb3J5ICE9PSBcInVuZGVmaW5lZFwiICYmXG4gICAgICAgIHRoaXMub3B0aW9uQ2F0ZWdvcnkgIT09IG51bGwgPyB0aGlzLm9wdGlvbkNhdGVnb3J5LmlkIDogdm9pZCAwKSAhPSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLm9wdGlvblNlcnZpY2UuZ2V0QWxsQWN0aXZpdGllc0J5Q2F0ZWdvcnlBY3Rpb24odGhpcy5vcHRpb25DYXRlZ29yeS5pZClcbiAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICAocmVzdWx0OiBBcnJheTxBY3Rpdml0eT4pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0aXZpdGllcyA9IFt7a2V5OiBcIjBcIiwgbGFiZWw6IFwiS2llcyBlZW4gYWN0aXZpdGVpdFwifV07XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFjdGl2aXRpZXMgPSBbLi4udGhpcy5hY3Rpdml0aWVzLCAuLi5yZXN1bHQubWFwKCh7aWQsIG5hbWV9KSA9PiAoe2tleTogaWQsIGxhYmVsOiBuYW1lfSkpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZ290IG1lIHNvbWUgYWN0aXZpdGllc1wiKTtcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmRpcihlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgICAgICAvKlRPRE86IGhhbmRsZSBlcnJvcnMqL1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRmUHJvcGVydHlDb21taXR0ZWRSYWZ0aW5nKGFyZ3MpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgZGF0YUZvcm0gPSA8UmFkRGF0YUZvcm0+YXJncy5vYmplY3Q7XG4gICAgICAgIGNvbnN0IHJhZnRpbmdDdXN0b21lcjogUmFmdGluZ0N1c3RvbWVyID0gPFJhZnRpbmdDdXN0b21lcj4gSlNPTi5wYXJzZShkYXRhRm9ybS5lZGl0ZWRPYmplY3QpO1xuXG4gICAgICAgIGlmIChyYWZ0aW5nQ3VzdG9tZXIuYWN0aXZpdHlJZCAhPT0gXCIwXCIpIHtcbiAgICAgICAgICAgIHRoaXMuY3VzdG9tZXJTZXJ2aWNlLnB1dEN1c3RvbWVyUmFmdGluZ09wdGlvbkFjdGlvbihyYWZ0aW5nQ3VzdG9tZXIpXG4gICAgICAgICAgICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJVcGRhdGVkIHJhZnRpbmcgY3VzdG9tZXJcIik7XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5kaXIoZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLypUT0RPOiBoYW5kbGUgZXJyb3JzKi9cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkZlByb3BlcnR5Q29tbWl0dGVkQ2FueW9uaW5nKGFyZ3MpOiB2b2lkIHtcblxuICAgIH1cblxuICAgIGRmUHJvcGVydHlDb21taXR0ZWRTcGVjaWFsKGFyZ3MpOiB2b2lkIHtcblxuICAgIH1cblxufVxuIl19