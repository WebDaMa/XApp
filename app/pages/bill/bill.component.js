"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var nativescript_angular_1 = require("nativescript-angular");
var dialogs = require("tns-core-modules/ui/dialogs");
var page_1 = require("tns-core-modules/ui/page");
var settings_1 = require("~/settings/settings");
var customer_service_1 = require("~/shared/services/customer.service");
var groep_service_1 = require("~/shared/services/groep.service");
var BillComponent = /** @class */ (function () {
    function BillComponent(groepService, customerService, routerExtensions, page) {
        var _this = this;
        this.groepService = groepService;
        this.customerService = customerService;
        this.routerExtensions = routerExtensions;
        this.page = page;
        this.groeps = [];
        this.groepItems = {};
        this.hasGroeps = false;
        this.selectedIndex = 0;
        this.customers = [];
        this.isBusy = true;
        this.lastTimer = { id: null, value: -1 };
        this.page.on(page_1.Page.navigatingToEvent, function () {
            _this.getCustomers();
        });
    }
    BillComponent.prototype.ngOnInit = function () {
        this.getGroeps();
        this.alertSaturday();
    };
    BillComponent.prototype.alertSaturday = function () {
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
    BillComponent.prototype.selectedIndexChangeDebouncer = function (args) {
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
            _this.selectedIndexChanged(args);
        }, 350);
    };
    BillComponent.prototype.selectedIndexChanged = function (args) {
        var picker = args.object;
        if (this.groeps.length > 0) {
            this.groep = this.groeps[picker.selectedIndex];
            this.getCustomers();
        }
    };
    BillComponent.prototype.getGroeps = function () {
        var _this = this;
        var locationId = settings_1.Settings.getLocation();
        var date = settings_1.Settings.getDate();
        this.groepService.getAllGroepsForWeekAndLocationAction(date, locationId)
            .subscribe(function (result) {
            _this.groups = result;
            if (_this.groeps.length > 0) {
                _this.groupItems = {
                    items: _this.groeps,
                    length: _this.groeps.length,
                    getItem: function (index) {
                        var item = _this.groeps[index];
                        return item.name;
                    }
                };
                _this.hasGroups = true;
                console.log("found me some bill groeps");
                _this.group = _this.groeps[0];
            }
            _this.getCustomers();
        }, function (error) {
            console.dir(error);
            /*TODO: handle errors*/
        });
    };
    BillComponent.prototype.getCustomers = function () {
        var _this = this;
        if ((typeof this.groep !== "undefined" &&
            this.groep !== null ? this.groep.id : void 0) != null) {
            this.isBusy = true;
            this.customerService.getAllByGroepForBillAction(this.groep.id)
                .subscribe(function (result) {
                _this.customers = result;
                console.log("found me some bill customers");
                _this.isBusy = false;
            }, function (error) {
                console.dir(error);
                _this.hasGroups = false;
                /*TODO: handle errors*/
            });
        }
    };
    BillComponent.prototype.goBack = function () {
        this.routerExtensions.navigate(["/tabs/default"], {
            transition: {
                name: "fade"
            }
        });
    };
    BillComponent = __decorate([
        core_1.Component({
            selector: "Bill",
            moduleId: module.id,
            providers: [groep_service_1.GroepService, customer_service_1.CustomerService],
            templateUrl: "./bill.component.html"
        }),
        __metadata("design:paramtypes", [groep_service_1.GroepService, customer_service_1.CustomerService,
            nativescript_angular_1.RouterExtensions, page_1.Page])
    ], BillComponent);
    return BillComponent;
}());
exports.BillComponent = BillComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmlsbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJiaWxsLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUE2RDtBQUM3RCw2REFBd0Q7QUFDeEQscURBQXVEO0FBRXZELGlEQUFnRDtBQUNoRCxnREFBK0M7QUFHL0MsdUVBQXFFO0FBQ3JFLGlFQUErRDtBQVEvRDtJQWNJLHVCQUFvQixZQUEwQixFQUFVLGVBQWdDLEVBQ3BFLGdCQUFrQyxFQUFVLElBQVU7UUFEMUUsaUJBS0M7UUFMbUIsaUJBQVksR0FBWixZQUFZLENBQWM7UUFBVSxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDcEUscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUFVLFNBQUksR0FBSixJQUFJLENBQU07UUFkMUUsV0FBTSxHQUFpQixFQUFFLENBQUM7UUFDMUIsZUFBVSxHQUFXLEVBQUUsQ0FBQztRQUV4QixjQUFTLEdBQVksS0FBSyxDQUFDO1FBRTNCLGtCQUFhLEdBQVcsQ0FBQyxDQUFDO1FBRTFCLGNBQVMsR0FBd0IsRUFBRSxDQUFDO1FBRXBDLFdBQU0sR0FBWSxJQUFJLENBQUM7UUFFdkIsY0FBUyxHQUFHLEVBQUMsRUFBRSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLEVBQUMsQ0FBQztRQUk5QixJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxXQUFJLENBQUMsaUJBQWlCLEVBQUU7WUFDakMsS0FBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3hCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELGdDQUFRLEdBQVI7UUFDSSxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDakIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ3pCLENBQUM7SUFFRCxxQ0FBYSxHQUFiO1FBQUEsaUJBMkJDO1FBMUJHLElBQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQyx1Q0FBdUMsQ0FBQyxDQUFDO1FB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QUM7Z0JBQ3ZCLHVCQUF1QjtZQUMzQixDQUFDLENBQ0osQ0FBQztTQUNUO0lBRUwsQ0FBQztJQUVELDhCQUFNLEdBQU47UUFDSSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUMsZUFBZSxDQUFDLEVBQUU7WUFDOUMsVUFBVSxFQUFFO2dCQUNSLElBQUksRUFBRSxNQUFNO2FBQ2Y7U0FDSixDQUFDLENBQUM7SUFDUCxDQUFDO0lBbEpRLGFBQWE7UUFOekIsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxNQUFNO1lBQ2hCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixTQUFTLEVBQUUsQ0FBQyw0QkFBWSxFQUFFLGtDQUFlLENBQUM7WUFDMUMsV0FBVyxFQUFFLHVCQUF1QjtTQUN2QyxDQUFDO3lDQWVvQyw0QkFBWSxFQUEyQixrQ0FBZTtZQUNsRCx1Q0FBZ0IsRUFBZ0IsV0FBSTtPQWZqRSxhQUFhLENBbUp6QjtJQUFELG9CQUFDO0NBQUEsQUFuSkQsSUFtSkM7QUFuSlksc0NBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgVmlld0NoaWxkIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXJcIjtcbmltcG9ydCAqIGFzIGRpYWxvZ3MgZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvZGlhbG9nc1wiO1xuaW1wb3J0IHsgTGlzdFBpY2tlciB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2xpc3QtcGlja2VyXCI7XG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvcGFnZVwiO1xuaW1wb3J0IHsgU2V0dGluZ3MgfSBmcm9tIFwifi9zZXR0aW5ncy9zZXR0aW5nc1wiO1xuaW1wb3J0IHsgQmlsbEN1c3RvbWVyIH0gZnJvbSBcIn4vc2hhcmVkL21vZGVscy9iaWxsQ3VzdG9tZXIubW9kZWxcIjtcbmltcG9ydCB7IEdyb2VwIH0gZnJvbSBcIn4vc2hhcmVkL21vZGVscy9ncm9lcC5tb2RlbFwiO1xuaW1wb3J0IHsgQ3VzdG9tZXJTZXJ2aWNlIH0gZnJvbSBcIn4vc2hhcmVkL3NlcnZpY2VzL2N1c3RvbWVyLnNlcnZpY2VcIjtcbmltcG9ydCB7IEdyb2VwU2VydmljZSB9IGZyb20gXCJ+L3NoYXJlZC9zZXJ2aWNlcy9ncm9lcC5zZXJ2aWNlXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcIkJpbGxcIixcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHByb3ZpZGVyczogW0dyb2VwU2VydmljZSwgQ3VzdG9tZXJTZXJ2aWNlXSxcbiAgICB0ZW1wbGF0ZVVybDogXCIuL2JpbGwuY29tcG9uZW50Lmh0bWxcIlxufSlcbmV4cG9ydCBjbGFzcyBCaWxsQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBncm9lcHM6IEFycmF5PEdyb2VwPiA9IFtdO1xuICAgIGdyb2VwSXRlbXM6IG9iamVjdCA9IHt9O1xuICAgIGdyb2VwOiBHcm9lcDtcbiAgICBoYXNHcm9lcHM6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIHNlbGVjdGVkSW5kZXg6IG51bWJlciA9IDA7XG5cbiAgICBjdXN0b21lcnM6IEFycmF5PEJpbGxDdXN0b21lcj4gPSBbXTtcblxuICAgIGlzQnVzeTogYm9vbGVhbiA9IHRydWU7XG5cbiAgICBsYXN0VGltZXIgPSB7aWQ6IG51bGwsIHZhbHVlOiAtMX07XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGdyb2VwU2VydmljZTogR3JvZXBTZXJ2aWNlLCBwcml2YXRlIGN1c3RvbWVyU2VydmljZTogQ3VzdG9tZXJTZXJ2aWNlLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgcm91dGVyRXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9ucywgcHJpdmF0ZSBwYWdlOiBQYWdlKSB7XG4gICAgICAgIHRoaXMucGFnZS5vbihQYWdlLm5hdmlnYXRpbmdUb0V2ZW50LCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmdldEN1c3RvbWVycygpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5nZXRHcm9lcHMoKTtcbiAgICAgICAgdGhpcy5hbGVydFNhdHVyZGF5KCk7XG4gICAgfVxuXG4gICAgYWxlcnRTYXR1cmRheSgpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgYXBwU2V0dGluZ3MgPSByZXF1aXJlKFwidG5zLWNvcmUtbW9kdWxlcy9hcHBsaWNhdGlvbi1zZXR0aW5nc1wiKTtcblxuICAgICAgICBpZiAoYXBwU2V0dGluZ3MuaGFzS2V5KFwic2V0dGluZ3NEYXRlXCIpKSB7XG4gICAgICAgICAgICBjb25zdCB3ZWVrRGF5ID0gbmV3IERhdGUoYXBwU2V0dGluZ3MuZ2V0U3RyaW5nKFwic2V0dGluZ3NEYXRlXCIpKS5nZXREYXkoKTtcblxuICAgICAgICAgICAgaWYgKHdlZWtEYXkgPT09IDYpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJUcmFuc2ZlciBEYXlcIixcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogXCJJbmRpZW4gamUgYWN0aWVzIHZvb3IgaHVpZGlnZSBncm9lcGVuIHdlbnN0IHRlIGRvZW4sIFwiICtcbiAgICAgICAgICAgICAgICAgICAgXCJwYXMgamUgZGUgZGF0dW0gbmFhciB2cmlqZGFnIGRlemUgd2VlayBhYW4gYmlqIHNldHRpbmdzIVwiLFxuICAgICAgICAgICAgICAgICAgICBva0J1dHRvblRleHQ6IFwiU2V0dGluZ3NcIixcbiAgICAgICAgICAgICAgICAgICAgY2FuY2VsQnV0dG9uVGV4dDogXCJOaWV1d2UgZ3JvZXBcIlxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICBkaWFsb2dzLmNvbmZpcm0ob3B0aW9ucykudGhlbigocmVzdWx0OiBib29sZWFuKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvc2V0dGluZ3NcIl0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2l0aW9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZmFkZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgc2VsZWN0ZWRJbmRleENoYW5nZURlYm91bmNlcihhcmdzKSB7XG4gICAgICAgIGNvbnN0IHBpY2tlciA9IDxMaXN0UGlja2VyPmFyZ3Mub2JqZWN0O1xuICAgICAgICAvLyBJZiB3ZSBhcmUgdGhlIHNhbWUgaW5kZXggYXMgdGhlIGxhc3QgdGltZSwgb3IgdGhlIG5leHQgdGltZTsgd2Ugc2tpcCBkb2luZyBhbnl0aGluZy5cbiAgICAgICAgaWYgKHBpY2tlci5zZWxlY3RlZEluZGV4ID09PSB0aGlzLmxhc3RUaW1lci52YWx1ZSkgeyByZXR1cm47IH1cblxuICAgICAgICAvLyBHcmFiIG91ciBjdXJyZW50IHZhbHVlLi4uXG4gICAgICAgIHRoaXMubGFzdFRpbWVyLnZhbHVlID0gcGlja2VyLnNlbGVjdGVkSW5kZXg7XG5cbiAgICAgICAgLy8gSWYgdGhlIHRpbWVyIGlzIGFscmVhZHkgcnVubmluZywgY2xlYXIgaXQuLi5cbiAgICAgICAgaWYgKHRoaXMubGFzdFRpbWVyLmlkICE9IG51bGwpIHsgY2xlYXJUaW1lb3V0KHRoaXMubGFzdFRpbWVyLmlkKTsgfVxuXG4gICAgICAgIC8vIFN0YXJ0IGEgbmV3IHRpbWVyICAocnVucyBpbiAxLzQgb2YgYSBzZWNvbmQpXG4gICAgICAgIHRoaXMubGFzdFRpbWVyLmlkID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmxhc3RUaW1lci5pZCA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkSW5kZXhDaGFuZ2VkKGFyZ3MpO1xuICAgICAgICB9LCAzNTApO1xuICAgIH1cblxuICAgIHNlbGVjdGVkSW5kZXhDaGFuZ2VkKGFyZ3MpIHtcbiAgICAgICAgY29uc3QgcGlja2VyID0gPExpc3RQaWNrZXI+YXJncy5vYmplY3Q7XG5cbiAgICAgICAgaWYgKHRoaXMuZ3JvZXBzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHRoaXMuZ3JvZXAgPSB0aGlzLmdyb2Vwc1twaWNrZXIuc2VsZWN0ZWRJbmRleF07XG4gICAgICAgICAgICB0aGlzLmdldEN1c3RvbWVycygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0R3JvZXBzKCk6IHZvaWQge1xuICAgICAgICBjb25zdCBsb2NhdGlvbklkID0gU2V0dGluZ3MuZ2V0TG9jYXRpb24oKTtcbiAgICAgICAgY29uc3QgZGF0ZSA9IFNldHRpbmdzLmdldERhdGUoKTtcblxuICAgICAgICB0aGlzLmdyb2VwU2VydmljZS5nZXRBbGxHcm9lcHNGb3JXZWVrQW5kTG9jYXRpb25BY3Rpb24oZGF0ZSwgbG9jYXRpb25JZClcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgKHJlc3VsdDogQXJyYXk8R3JvZXA+KSA9PiB7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ncm9lcHMgPSByZXN1bHQ7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZ3JvZXBzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ3JvZXBJdGVtcyA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtczogdGhpcy5ncm9lcHMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVuZ3RoOiB0aGlzLmdyb2Vwcy5sZW5ndGgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2V0SXRlbTogKGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSB0aGlzLmdyb2Vwc1tpbmRleF07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW0ubmFtZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhhc0dyb2VwcyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImZvdW5kIG1lIHNvbWUgYmlsbCBncm9lcHNcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdyb2VwID0gdGhpcy5ncm9lcHNbMF07XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdldEN1c3RvbWVycygpO1xuXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5kaXIoZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICAvKlRPRE86IGhhbmRsZSBlcnJvcnMqL1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7XG4gICAgfVxuXG4gICAgZ2V0Q3VzdG9tZXJzKCk6IHZvaWQge1xuICAgICAgICBpZiAoKHR5cGVvZiB0aGlzLmdyb2VwICE9PSBcInVuZGVmaW5lZFwiICYmXG4gICAgICAgIHRoaXMuZ3JvZXAgIT09IG51bGwgPyB0aGlzLmdyb2VwLmlkIDogdm9pZCAwKSAhPSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLmlzQnVzeSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmN1c3RvbWVyU2VydmljZS5nZXRBbGxCeUdyb2VwRm9yQmlsbEFjdGlvbih0aGlzLmdyb2VwLmlkKVxuICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgIChyZXN1bHQ6IEFycmF5PEJpbGxDdXN0b21lcj4pID0+IHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXN0b21lcnMgPSByZXN1bHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImZvdW5kIG1lIHNvbWUgYmlsbCBjdXN0b21lcnNcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmlzQnVzeSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZGlyKGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGFzR3JvZXBzID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAvKlRPRE86IGhhbmRsZSBlcnJvcnMqL1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgZ29CYWNrKCkge1xuICAgICAgICB0aGlzLnJvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL3RhYnMvZGVmYXVsdFwiXSwge1xuICAgICAgICAgICAgdHJhbnNpdGlvbjoge1xuICAgICAgICAgICAgICAgIG5hbWU6IFwiZmFkZVwiXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiJdfQ==