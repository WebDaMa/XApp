"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var nativescript_angular_1 = require("nativescript-angular");
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
        this.page.on(page_1.Page.navigatingToEvent, function () {
            _this.getCustomers();
        });
    }
    BillComponent.prototype.ngOnInit = function () {
        this.getGroeps();
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
                console.log("found me some bill groeps");
                _this.groep = _this.groeps[0];
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
                console.log("found me some size customers");
                _this.isBusy = false;
            }, function (error) {
                console.dir(error);
                _this.hasGroeps = false;
                /*TODO: handle errors*/
            });
        }
    };
    BillComponent.prototype.goBack = function () {
        this.routerExtensions.backToPreviousPage();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmlsbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJiaWxsLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUE2RDtBQUM3RCw2REFBd0Q7QUFFeEQsaURBQWdEO0FBQ2hELGdEQUErQztBQUcvQyx1RUFBcUU7QUFDckUsaUVBQStEO0FBUS9EO0lBWUksdUJBQW9CLFlBQTBCLEVBQVUsZUFBZ0MsRUFDcEUsZ0JBQWtDLEVBQVUsSUFBVTtRQUQxRSxpQkFLQztRQUxtQixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUFVLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUNwRSxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQVUsU0FBSSxHQUFKLElBQUksQ0FBTTtRQVoxRSxXQUFNLEdBQWlCLEVBQUUsQ0FBQztRQUMxQixlQUFVLEdBQVcsRUFBRSxDQUFDO1FBRXhCLGNBQVMsR0FBWSxLQUFLLENBQUM7UUFFM0Isa0JBQWEsR0FBVyxDQUFDLENBQUM7UUFFMUIsY0FBUyxHQUF3QixFQUFFLENBQUM7UUFFcEMsV0FBTSxHQUFZLElBQUksQ0FBQztRQUluQixJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxXQUFJLENBQUMsaUJBQWlCLEVBQUU7WUFDakMsS0FBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3hCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELGdDQUFRLEdBQVI7UUFDSSxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUVELDRDQUFvQixHQUFwQixVQUFxQixJQUFJO1FBQ3JCLElBQU0sTUFBTSxHQUFlLElBQUksQ0FBQyxNQUFNLENBQUM7UUFFdkMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN6QixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxD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QUFnQixFQUFnQixXQUFJO09BYmpFLGFBQWEsQ0E2RnpCO0lBQUQsb0JBQUM7Q0FBQSxBQTdGRCxJQTZGQztBQTdGWSxzQ0FBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBWaWV3Q2hpbGQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhclwiO1xuaW1wb3J0IHsgTGlzdFBpY2tlciB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2xpc3QtcGlja2VyXCI7XG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvcGFnZVwiO1xuaW1wb3J0IHsgU2V0dGluZ3MgfSBmcm9tIFwifi9zZXR0aW5ncy9zZXR0aW5nc1wiO1xuaW1wb3J0IHsgQmlsbEN1c3RvbWVyIH0gZnJvbSBcIn4vc2hhcmVkL21vZGVscy9iaWxsQ3VzdG9tZXIubW9kZWxcIjtcbmltcG9ydCB7IEdyb2VwIH0gZnJvbSBcIn4vc2hhcmVkL21vZGVscy9ncm9lcC5tb2RlbFwiO1xuaW1wb3J0IHsgQ3VzdG9tZXJTZXJ2aWNlIH0gZnJvbSBcIn4vc2hhcmVkL3NlcnZpY2VzL2N1c3RvbWVyLnNlcnZpY2VcIjtcbmltcG9ydCB7IEdyb2VwU2VydmljZSB9IGZyb20gXCJ+L3NoYXJlZC9zZXJ2aWNlcy9ncm9lcC5zZXJ2aWNlXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcIkJpbGxcIixcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHByb3ZpZGVyczogW0dyb2VwU2VydmljZSwgQ3VzdG9tZXJTZXJ2aWNlXSxcbiAgICB0ZW1wbGF0ZVVybDogXCIuL2JpbGwuY29tcG9uZW50Lmh0bWxcIlxufSlcbmV4cG9ydCBjbGFzcyBCaWxsQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBncm9lcHM6IEFycmF5PEdyb2VwPiA9IFtdO1xuICAgIGdyb2VwSXRlbXM6IG9iamVjdCA9IHt9O1xuICAgIGdyb2VwOiBHcm9lcDtcbiAgICBoYXNHcm9lcHM6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIHNlbGVjdGVkSW5kZXg6IG51bWJlciA9IDA7XG5cbiAgICBjdXN0b21lcnM6IEFycmF5PEJpbGxDdXN0b21lcj4gPSBbXTtcblxuICAgIGlzQnVzeTogYm9vbGVhbiA9IHRydWU7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGdyb2VwU2VydmljZTogR3JvZXBTZXJ2aWNlLCBwcml2YXRlIGN1c3RvbWVyU2VydmljZTogQ3VzdG9tZXJTZXJ2aWNlLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgcm91dGVyRXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9ucywgcHJpdmF0ZSBwYWdlOiBQYWdlKSB7XG4gICAgICAgIHRoaXMucGFnZS5vbihQYWdlLm5hdmlnYXRpbmdUb0V2ZW50LCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmdldEN1c3RvbWVycygpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5nZXRHcm9lcHMoKTtcbiAgICB9XG5cbiAgICBzZWxlY3RlZEluZGV4Q2hhbmdlZChhcmdzKSB7XG4gICAgICAgIGNvbnN0IHBpY2tlciA9IDxMaXN0UGlja2VyPmFyZ3Mub2JqZWN0O1xuXG4gICAgICAgIGlmICh0aGlzLmdyb2Vwcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB0aGlzLmdyb2VwID0gdGhpcy5ncm9lcHNbcGlja2VyLnNlbGVjdGVkSW5kZXhdO1xuICAgICAgICAgICAgdGhpcy5nZXRDdXN0b21lcnMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldEdyb2VwcygpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgbG9jYXRpb25JZCA9IFNldHRpbmdzLmdldExvY2F0aW9uKCk7XG4gICAgICAgIGNvbnN0IGRhdGUgPSBTZXR0aW5ncy5nZXREYXRlKCk7XG5cbiAgICAgICAgdGhpcy5ncm9lcFNlcnZpY2UuZ2V0QWxsR3JvZXBzRm9yV2Vla0FuZExvY2F0aW9uQWN0aW9uKGRhdGUsIGxvY2F0aW9uSWQpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgIChyZXN1bHQ6IEFycmF5PEdyb2VwPikgPT4ge1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ3JvZXBzID0gcmVzdWx0O1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmdyb2Vwcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdyb2VwSXRlbXMgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbXM6IHRoaXMuZ3JvZXBzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlbmd0aDogdGhpcy5ncm9lcHMubGVuZ3RoLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdldEl0ZW06IChpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBpdGVtID0gdGhpcy5ncm9lcHNbaW5kZXhdO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpdGVtLm5hbWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oYXNHcm9lcHMgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJmb3VuZCBtZSBzb21lIGJpbGwgZ3JvZXBzXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ncm9lcCA9IHRoaXMuZ3JvZXBzWzBdO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRDdXN0b21lcnMoKTtcblxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZGlyKGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgLypUT0RPOiBoYW5kbGUgZXJyb3JzKi9cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuICAgIH1cblxuICAgIGdldEN1c3RvbWVycygpOiB2b2lkIHtcbiAgICAgICAgaWYgKCh0eXBlb2YgdGhpcy5ncm9lcCAhPT0gXCJ1bmRlZmluZWRcIiAmJlxuICAgICAgICB0aGlzLmdyb2VwICE9PSBudWxsID8gdGhpcy5ncm9lcC5pZCA6IHZvaWQgMCkgIT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5pc0J1c3kgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5jdXN0b21lclNlcnZpY2UuZ2V0QWxsQnlHcm9lcEZvckJpbGxBY3Rpb24odGhpcy5ncm9lcC5pZClcbiAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICAocmVzdWx0OiBBcnJheTxCaWxsQ3VzdG9tZXI+KSA9PiB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3VzdG9tZXJzID0gcmVzdWx0O1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJmb3VuZCBtZSBzb21lIHNpemUgY3VzdG9tZXJzXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pc0J1c3kgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmRpcihlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhhc0dyb2VwcyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgLypUT0RPOiBoYW5kbGUgZXJyb3JzKi9cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIGdvQmFjaygpIHtcbiAgICAgICAgdGhpcy5yb3V0ZXJFeHRlbnNpb25zLmJhY2tUb1ByZXZpb3VzUGFnZSgpO1xuICAgIH1cbn1cbiJdfQ==