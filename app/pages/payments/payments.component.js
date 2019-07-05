"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var nativescript_angular_1 = require("nativescript-angular");
var dialogs = require("tns-core-modules/ui/dialogs");
var page_1 = require("tns-core-modules/ui/page");
var settings_1 = require("~/settings/settings");
var customer_service_1 = require("~/shared/services/customer.service");
var groep_service_1 = require("~/shared/services/groep.service");
var PaymentsComponent = /** @class */ (function () {
    function PaymentsComponent(groepService, customerService, routerExtensions, page) {
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
    PaymentsComponent.prototype.ngOnInit = function () {
        this.getGroeps();
        this.alertSaturday();
    };
    PaymentsComponent.prototype.alertSaturday = function () {
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
    PaymentsComponent.prototype.selectedIndexChangeDebouncer = function (args) {
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
    PaymentsComponent.prototype.selectedIndexChanged = function (args) {
        var picker = args.object;
        if (this.groeps.length > 0) {
            this.groep = this.groeps[picker.selectedIndex];
            this.getCustomers();
        }
    };
    PaymentsComponent.prototype.getGroeps = function () {
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
                console.log("found me some size groeps");
                _this.group = _this.groeps[0];
            }
            _this.getCustomers();
        }, function (error) {
            console.dir(error);
            _this.hasGroups = false;
            /*TODO: handle errors*/
        });
    };
    PaymentsComponent.prototype.getCustomers = function () {
        var _this = this;
        if ((typeof this.groep !== "undefined" &&
            this.groep !== null ? this.groep.id : void 0) != null) {
            this.isBusy = true;
            this.customerService.getAllByGroepForPaymentsAction(this.groep.id)
                .subscribe(function (result) {
                _this.customers = result;
                console.log("found me some costs customers");
                _this.isBusy = false;
            }, function (error) {
                console.dir(error);
                /*TODO: handle errors*/
            });
        }
    };
    PaymentsComponent.prototype.goBack = function () {
        this.routerExtensions.navigate(["/tabs/default"], {
            transition: {
                name: "fade"
            }
        });
    };
    PaymentsComponent = __decorate([
        core_1.Component({
            selector: "Payments",
            moduleId: module.id,
            providers: [groep_service_1.GroepService, customer_service_1.CustomerService],
            templateUrl: "./payments.component.html"
        }),
        __metadata("design:paramtypes", [groep_service_1.GroepService, customer_service_1.CustomerService,
            nativescript_angular_1.RouterExtensions, page_1.Page])
    ], PaymentsComponent);
    return PaymentsComponent;
}());
exports.PaymentsComponent = PaymentsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF5bWVudHMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicGF5bWVudHMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBQ2xELDZEQUF3RDtBQUN4RCxxREFBdUQ7QUFFdkQsaURBQWdEO0FBQ2hELGdEQUErQztBQUcvQyx1RUFBcUU7QUFDckUsaUVBQStEO0FBUS9EO0lBY0ksMkJBQW9CLFlBQTBCLEVBQVUsZUFBZ0MsRUFDcEUsZ0JBQWtDLEVBQVUsSUFBVTtRQUQxRSxpQkFLQztRQUxtQixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUFVLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUNwRSxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQVUsU0FBSSxHQUFKLElBQUksQ0FBTTtRQWQxRSxXQUFNLEdBQWlCLEVBQUUsQ0FBQztRQUMxQixlQUFVLEdBQVcsRUFBRSxDQUFDO1FBRXhCLGNBQVMsR0FBWSxLQUFLLENBQUM7UUFFM0Isa0JBQWEsR0FBVyxDQUFDLENBQUM7UUFFMUIsY0FBUyxHQUEyQixFQUFFLENBQUM7UUFFdkMsV0FBTSxHQUFZLElBQUksQ0FBQztRQUV2QixjQUFTLEdBQUcsRUFBQyxFQUFFLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsRUFBQyxDQUFDO1FBSTlCLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFdBQUksQ0FBQyxpQkFBaUIsRUFBRTtZQUNqQyxLQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDeEIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsb0NBQVEsR0FBUjtRQUNJLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNqQixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDekIsQ0FBQztJQUVELHlDQUFhLEdBQWI7UUFBQSxpQkEyQkM7UUExQkcsSUFBTSxXQUFXLEdBQUcsT0FBTyxDQUFDLHVDQUF1QyxDQUFD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Q0FBQyxDQUFDO2dCQUNuQix1QkFBdUI7WUFDM0IsQ0FBQyxDQUNKLENBQUM7U0FDVDtJQUVMLENBQUM7SUFFRCxrQ0FBTSxHQUFOO1FBQ0ksSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxFQUFFO1lBQzlDLFVBQVUsRUFBRTtnQkFDUixJQUFJLEVBQUUsTUFBTTthQUNmO1NBQ0osQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQWxKUSxpQkFBaUI7UUFON0IsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxVQUFVO1lBQ3BCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixTQUFTLEVBQUUsQ0FBQyw0QkFBWSxFQUFFLGtDQUFlLENBQUM7WUFDMUMsV0FBVyxFQUFFLDJCQUEyQjtTQUMzQyxDQUFDO3lDQWVvQyw0QkFBWSxFQUEyQixrQ0FBZTtZQUNsRCx1Q0FBZ0IsRUFBZ0IsV0FBSTtPQWZqRSxpQkFBaUIsQ0FtSjdCO0lBQUQsd0JBQUM7Q0FBQSxBQW5KRCxJQW1KQztBQW5KWSw4Q0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyXCI7XG5pbXBvcnQgKiBhcyBkaWFsb2dzIGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2RpYWxvZ3NcIjtcbmltcG9ydCB7IExpc3RQaWNrZXIgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9saXN0LXBpY2tlclwiO1xuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3BhZ2VcIjtcbmltcG9ydCB7IFNldHRpbmdzIH0gZnJvbSBcIn4vc2V0dGluZ3Mvc2V0dGluZ3NcIjtcbmltcG9ydCB7IEdyb2VwIH0gZnJvbSBcIn4vc2hhcmVkL21vZGVscy9ncm9lcC5tb2RlbFwiO1xuaW1wb3J0IHsgUGF5bWVudEN1c3RvbWVyIH0gZnJvbSBcIn4vc2hhcmVkL21vZGVscy9wYXltZW50Q3VzdG9tZXIubW9kZWxcIjtcbmltcG9ydCB7IEN1c3RvbWVyU2VydmljZSB9IGZyb20gXCJ+L3NoYXJlZC9zZXJ2aWNlcy9jdXN0b21lci5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBHcm9lcFNlcnZpY2UgfSBmcm9tIFwifi9zaGFyZWQvc2VydmljZXMvZ3JvZXAuc2VydmljZVwiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJQYXltZW50c1wiLFxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgcHJvdmlkZXJzOiBbR3JvZXBTZXJ2aWNlLCBDdXN0b21lclNlcnZpY2VdLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vcGF5bWVudHMuY29tcG9uZW50Lmh0bWxcIlxufSlcbmV4cG9ydCBjbGFzcyBQYXltZW50c0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgZ3JvZXBzOiBBcnJheTxHcm9lcD4gPSBbXTtcbiAgICBncm9lcEl0ZW1zOiBvYmplY3QgPSB7fTtcbiAgICBncm9lcDogR3JvZXA7XG4gICAgaGFzR3JvZXBzOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBzZWxlY3RlZEluZGV4OiBudW1iZXIgPSAwO1xuXG4gICAgY3VzdG9tZXJzOiBBcnJheTxQYXltZW50Q3VzdG9tZXI+ID0gW107XG5cbiAgICBpc0J1c3k6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgbGFzdFRpbWVyID0ge2lkOiBudWxsLCB2YWx1ZTogLTF9O1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBncm9lcFNlcnZpY2U6IEdyb2VwU2VydmljZSwgcHJpdmF0ZSBjdXN0b21lclNlcnZpY2U6IEN1c3RvbWVyU2VydmljZSxcbiAgICAgICAgICAgICAgICBwcml2YXRlIHJvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMsIHByaXZhdGUgcGFnZTogUGFnZSkge1xuICAgICAgICB0aGlzLnBhZ2Uub24oUGFnZS5uYXZpZ2F0aW5nVG9FdmVudCwgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5nZXRDdXN0b21lcnMoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZ2V0R3JvZXBzKCk7XG4gICAgICAgIHRoaXMuYWxlcnRTYXR1cmRheSgpO1xuICAgIH1cblxuICAgIGFsZXJ0U2F0dXJkYXkoKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGFwcFNldHRpbmdzID0gcmVxdWlyZShcInRucy1jb3JlLW1vZHVsZXMvYXBwbGljYXRpb24tc2V0dGluZ3NcIik7XG5cbiAgICAgICAgaWYgKGFwcFNldHRpbmdzLmhhc0tleShcInNldHRpbmdzRGF0ZVwiKSkge1xuICAgICAgICAgICAgY29uc3Qgd2Vla0RheSA9IG5ldyBEYXRlKGFwcFNldHRpbmdzLmdldFN0cmluZyhcInNldHRpbmdzRGF0ZVwiKSkuZ2V0RGF5KCk7XG5cbiAgICAgICAgICAgIGlmICh3ZWVrRGF5ID09PSA2KSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiVHJhbnNmZXIgRGF5XCIsXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwiSW5kaWVuIGplIGFjdGllcyB2b29yIGh1aWRpZ2UgZ3JvZXBlbiB3ZW5zdCB0ZSBkb2VuLCBcIiArXG4gICAgICAgICAgICAgICAgICAgIFwicGFzIGplIGRlIGRhdHVtIG5hYXIgdnJpamRhZyBkZXplIHdlZWsgYWFuIGJpaiBzZXR0aW5ncyFcIixcbiAgICAgICAgICAgICAgICAgICAgb2tCdXR0b25UZXh0OiBcIlNldHRpbmdzXCIsXG4gICAgICAgICAgICAgICAgICAgIGNhbmNlbEJ1dHRvblRleHQ6IFwiTmlldXdlIGdyb2VwXCJcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgZGlhbG9ncy5jb25maXJtKG9wdGlvbnMpLnRoZW4oKHJlc3VsdDogYm9vbGVhbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL3NldHRpbmdzXCJdLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNpdGlvbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImZhZGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIHNlbGVjdGVkSW5kZXhDaGFuZ2VEZWJvdW5jZXIoYXJncykge1xuICAgICAgICBjb25zdCBwaWNrZXIgPSA8TGlzdFBpY2tlcj5hcmdzLm9iamVjdDtcbiAgICAgICAgLy8gSWYgd2UgYXJlIHRoZSBzYW1lIGluZGV4IGFzIHRoZSBsYXN0IHRpbWUsIG9yIHRoZSBuZXh0IHRpbWU7IHdlIHNraXAgZG9pbmcgYW55dGhpbmcuXG4gICAgICAgIGlmIChwaWNrZXIuc2VsZWN0ZWRJbmRleCA9PT0gdGhpcy5sYXN0VGltZXIudmFsdWUpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgLy8gR3JhYiBvdXIgY3VycmVudCB2YWx1ZS4uLlxuICAgICAgICB0aGlzLmxhc3RUaW1lci52YWx1ZSA9IHBpY2tlci5zZWxlY3RlZEluZGV4O1xuXG4gICAgICAgIC8vIElmIHRoZSB0aW1lciBpcyBhbHJlYWR5IHJ1bm5pbmcsIGNsZWFyIGl0Li4uXG4gICAgICAgIGlmICh0aGlzLmxhc3RUaW1lci5pZCAhPSBudWxsKSB7IGNsZWFyVGltZW91dCh0aGlzLmxhc3RUaW1lci5pZCk7IH1cblxuICAgICAgICAvLyBTdGFydCBhIG5ldyB0aW1lciAgKHJ1bnMgaW4gMS80IG9mIGEgc2Vjb25kKVxuICAgICAgICB0aGlzLmxhc3RUaW1lci5pZCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5sYXN0VGltZXIuaWQgPSBudWxsO1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEluZGV4Q2hhbmdlZChhcmdzKTtcbiAgICAgICAgfSwgMzUwKTtcbiAgICB9XG5cbiAgICBzZWxlY3RlZEluZGV4Q2hhbmdlZChhcmdzKSB7XG4gICAgICAgIGNvbnN0IHBpY2tlciA9IDxMaXN0UGlja2VyPmFyZ3Mub2JqZWN0O1xuXG4gICAgICAgIGlmICh0aGlzLmdyb2Vwcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB0aGlzLmdyb2VwID0gdGhpcy5ncm9lcHNbcGlja2VyLnNlbGVjdGVkSW5kZXhdO1xuICAgICAgICAgICAgdGhpcy5nZXRDdXN0b21lcnMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldEdyb2VwcygpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgbG9jYXRpb25JZCA9IFNldHRpbmdzLmdldExvY2F0aW9uKCk7XG4gICAgICAgIGNvbnN0IGRhdGUgPSBTZXR0aW5ncy5nZXREYXRlKCk7XG5cbiAgICAgICAgdGhpcy5ncm9lcFNlcnZpY2UuZ2V0QWxsR3JvZXBzRm9yV2Vla0FuZExvY2F0aW9uQWN0aW9uKGRhdGUsIGxvY2F0aW9uSWQpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgIChyZXN1bHQ6IEFycmF5PEdyb2VwPikgPT4ge1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ3JvZXBzID0gcmVzdWx0O1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmdyb2Vwcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdyb2VwSXRlbXMgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbXM6IHRoaXMuZ3JvZXBzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlbmd0aDogdGhpcy5ncm9lcHMubGVuZ3RoLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdldEl0ZW06IChpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBpdGVtID0gdGhpcy5ncm9lcHNbaW5kZXhdO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpdGVtLm5hbWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oYXNHcm9lcHMgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJmb3VuZCBtZSBzb21lIHNpemUgZ3JvZXBzXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ncm9lcCA9IHRoaXMuZ3JvZXBzWzBdO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRDdXN0b21lcnMoKTtcblxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZGlyKGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYXNHcm9lcHMgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgLypUT0RPOiBoYW5kbGUgZXJyb3JzKi9cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuICAgIH1cblxuICAgIGdldEN1c3RvbWVycygpOiB2b2lkIHtcbiAgICAgICAgaWYgKCh0eXBlb2YgdGhpcy5ncm9lcCAhPT0gXCJ1bmRlZmluZWRcIiAmJlxuICAgICAgICB0aGlzLmdyb2VwICE9PSBudWxsID8gdGhpcy5ncm9lcC5pZCA6IHZvaWQgMCkgIT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5pc0J1c3kgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5jdXN0b21lclNlcnZpY2UuZ2V0QWxsQnlHcm9lcEZvclBheW1lbnRzQWN0aW9uKHRoaXMuZ3JvZXAuaWQpXG4gICAgICAgICAgICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgKHJlc3VsdDogQXJyYXk8UGF5bWVudEN1c3RvbWVyPikgPT4ge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmN1c3RvbWVycyA9IHJlc3VsdDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZm91bmQgbWUgc29tZSBjb3N0cyBjdXN0b21lcnNcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmlzQnVzeSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZGlyKGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8qVE9ETzogaGFuZGxlIGVycm9ycyovXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBnb0JhY2soKSB7XG4gICAgICAgIHRoaXMucm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvdGFicy9kZWZhdWx0XCJdLCB7XG4gICAgICAgICAgICB0cmFuc2l0aW9uOiB7XG4gICAgICAgICAgICAgICAgbmFtZTogXCJmYWRlXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxufVxuIl19