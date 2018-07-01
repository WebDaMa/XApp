"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var app = require("tns-core-modules/application");
var page_1 = require("tns-core-modules/ui/page");
var settings_1 = require("~/settings/settings");
var customer_service_1 = require("~/shared/services/customer.service");
var groep_service_1 = require("~/shared/services/groep.service");
var suitSize_service_1 = require("~/shared/services/suitSize.service");
var SizesComponent = /** @class */ (function () {
    function SizesComponent(groepService, customerService, suitSizeService, page) {
        this.groepService = groepService;
        this.customerService = customerService;
        this.suitSizeService = suitSizeService;
        this.page = page;
        this.groeps = [];
        this.groepItems = {};
        this.hasGroeps = false;
        this.isBusy = true;
        this.selectedIndex = 0;
        this.customers = [];
        this.sizes = [];
    }
    SizesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.getSizes();
        this.getGroeps();
        this.page.on(page_1.Page.navigatingToEvent, function () {
            _this.getGroeps();
        });
    };
    SizesComponent.prototype.selectedIndexChanged = function (args) {
        var picker = args.object;
        var appSettings = require("application-settings");
        if (this.groeps.length > 0) {
            this.groep = this.groeps[picker.selectedIndex];
            this.getCustomers();
        }
    };
    SizesComponent.prototype.getGroeps = function () {
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
                console.log("found me some size groeps");
                _this.groep = _this.groeps[0];
            }
            _this.getCustomers();
        }, function (error) {
            console.dir(error);
            _this.hasGroeps = false;
            /*TODO: handle errors*/
        });
    };
    SizesComponent.prototype.getCustomers = function () {
        var _this = this;
        if ((typeof this.groep !== "undefined" &&
            this.groep !== null ? this.groep.id : void 0) != null) {
            this.isBusy = true;
            this.customerService.getAllByGroepAction(this.groep.id)
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
    SizesComponent.prototype.getSizes = function () {
        var _this = this;
        this.suitSizeService.getAllAction()
            .subscribe(function (result) {
            _this.sizes = [{ key: "0", label: "Kies een Maat" }];
            _this.sizes = _this.sizes.concat(result.map(function (_a) {
                var id = _a.id, name = _a.name;
                return ({ key: id, label: name });
            }));
        }, function (error) {
            console.dir(error);
            /*TODO: handle errors*/
        });
    };
    SizesComponent.prototype.dfPropertyCommitted = function (args) {
        var dataForm = args.object;
        var sizeCustomer = JSON.parse(dataForm.editedObject);
        if (sizeCustomer.size !== "0") {
            this.customerService.putCustomerSizeAction(sizeCustomer)
                .subscribe(function () {
                console.log("Updated customer");
            }, function (error) {
                console.dir(error);
                /*TODO: handle errors*/
            });
        }
    };
    SizesComponent.prototype.onDrawerButtonTap = function () {
        var sideDrawer = app.getRootView();
        sideDrawer.showDrawer();
    };
    SizesComponent = __decorate([
        core_1.Component({
            selector: "Sizes",
            moduleId: module.id,
            providers: [groep_service_1.GroepService, customer_service_1.CustomerService, suitSize_service_1.SuitSizeService],
            templateUrl: "./sizes.component.html"
        }),
        __metadata("design:paramtypes", [groep_service_1.GroepService, customer_service_1.CustomerService,
            suitSize_service_1.SuitSizeService, page_1.Page])
    ], SizesComponent);
    return SizesComponent;
}());
exports.SizesComponent = SizesComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2l6ZXMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2l6ZXMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQXdFO0FBR3hFLGtEQUFvRDtBQUVwRCxpREFBZ0Q7QUFDaEQsZ0RBQStDO0FBSy9DLHVFQUFxRTtBQUNyRSxpRUFBK0Q7QUFDL0QsdUVBQXFFO0FBUXJFO0lBWUksd0JBQW9CLFlBQTBCLEVBQVUsZUFBZ0MsRUFDcEUsZUFBZ0MsRUFBVSxJQUFVO1FBRHBELGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQVUsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQ3BFLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUFVLFNBQUksR0FBSixJQUFJLENBQU07UUFaeEUsV0FBTSxHQUFpQixFQUFFLENBQUM7UUFDMUIsZUFBVSxHQUFXLEVBQUUsQ0FBQztRQUV4QixjQUFTLEdBQVksS0FBSyxDQUFDO1FBRTNCLFdBQU0sR0FBWSxJQUFJLENBQUM7UUFFdkIsa0JBQWEsR0FBVyxDQUFDLENBQUM7UUFDMUIsY0FBUyxHQUF3QixFQUFFLENBQUM7UUFDcEMsVUFBSyxHQUFrQixFQUFFLENBQUM7SUFJMUIsQ0FBQztJQUVELGlDQUFRLEdBQVI7UUFBQSxpQkFNQztRQUxHLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNoQixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDakIsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsV0FBSSxDQUFDLGlCQUFpQixFQUFFO1lBQ2pDLEtBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNyQixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCw2Q0FBb0IsR0FBcEIsVUFBcUIsSUFBSTtRQUNyQixJQUFNLE1BQU0sR0FBZSxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ3ZDLElBQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1FBRXBELEVB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O0lBaklRLGNBQWM7UUFOMUIsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxPQUFPO1lBQ2pCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixTQUFTLEVBQUUsQ0FBQyw0QkFBWSxFQUFFLGtDQUFlLEVBQUUsa0NBQWUsQ0FBQztZQUMzRCxXQUFXLEVBQUUsd0JBQXdCO1NBQ3hDLENBQUM7eUNBYW9DLDRCQUFZLEVBQTJCLGtDQUFlO1lBQ25ELGtDQUFlLEVBQWdCLFdBQUk7T0FiL0QsY0FBYyxDQW1JMUI7SUFBRCxxQkFBQztDQUFBLEFBbklELElBbUlDO0FBbklZLHdDQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIFF1ZXJ5TGlzdCwgVmlld0NoaWxkIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IFJhZERhdGFGb3JtIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC11aS1kYXRhZm9ybVwiO1xuaW1wb3J0IHsgUmFkU2lkZURyYXdlciB9IGZyb20gXCJuYXRpdmVzY3JpcHQtdWktc2lkZWRyYXdlclwiO1xuaW1wb3J0ICogYXMgYXBwIGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2FwcGxpY2F0aW9uXCI7XG5pbXBvcnQgeyBMaXN0UGlja2VyIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvbGlzdC1waWNrZXJcIjtcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9wYWdlXCI7XG5pbXBvcnQgeyBTZXR0aW5ncyB9IGZyb20gXCJ+L3NldHRpbmdzL3NldHRpbmdzXCI7XG5pbXBvcnQgeyBCdXNDdXN0b21lciB9IGZyb20gXCJ+L3NoYXJlZC9tb2RlbHMvYnVzQ3VzdG9tZXIubW9kZWxcIjtcbmltcG9ydCB7IEdyb2VwIH0gZnJvbSBcIn4vc2hhcmVkL21vZGVscy9ncm9lcC5tb2RlbFwiO1xuaW1wb3J0IHsgU2l6ZUN1c3RvbWVyIH0gZnJvbSBcIn4vc2hhcmVkL21vZGVscy9zaXplQ3VzdG9tZXIubW9kZWxcIjtcbmltcG9ydCB7IFN1aXRTaXplIH0gZnJvbSBcIn4vc2hhcmVkL21vZGVscy9zdWl0U2l6ZS5tb2RlbFwiO1xuaW1wb3J0IHsgQ3VzdG9tZXJTZXJ2aWNlIH0gZnJvbSBcIn4vc2hhcmVkL3NlcnZpY2VzL2N1c3RvbWVyLnNlcnZpY2VcIjtcbmltcG9ydCB7IEdyb2VwU2VydmljZSB9IGZyb20gXCJ+L3NoYXJlZC9zZXJ2aWNlcy9ncm9lcC5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBTdWl0U2l6ZVNlcnZpY2UgfSBmcm9tIFwifi9zaGFyZWQvc2VydmljZXMvc3VpdFNpemUuc2VydmljZVwiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJTaXplc1wiLFxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgcHJvdmlkZXJzOiBbR3JvZXBTZXJ2aWNlLCBDdXN0b21lclNlcnZpY2UsIFN1aXRTaXplU2VydmljZV0sXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9zaXplcy5jb21wb25lbnQuaHRtbFwiXG59KVxuZXhwb3J0IGNsYXNzIFNpemVzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBncm9lcHM6IEFycmF5PEdyb2VwPiA9IFtdO1xuICAgIGdyb2VwSXRlbXM6IG9iamVjdCA9IHt9O1xuICAgIGdyb2VwOiBHcm9lcDtcbiAgICBoYXNHcm9lcHM6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIGlzQnVzeTogYm9vbGVhbiA9IHRydWU7XG5cbiAgICBzZWxlY3RlZEluZGV4OiBudW1iZXIgPSAwO1xuICAgIGN1c3RvbWVyczogQXJyYXk8U2l6ZUN1c3RvbWVyPiA9IFtdO1xuICAgIHNpemVzOiBBcnJheTxvYmplY3Q+ID0gW107XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGdyb2VwU2VydmljZTogR3JvZXBTZXJ2aWNlLCBwcml2YXRlIGN1c3RvbWVyU2VydmljZTogQ3VzdG9tZXJTZXJ2aWNlLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgc3VpdFNpemVTZXJ2aWNlOiBTdWl0U2l6ZVNlcnZpY2UsIHByaXZhdGUgcGFnZTogUGFnZSkge1xuICAgIH1cblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmdldFNpemVzKCk7XG4gICAgICAgIHRoaXMuZ2V0R3JvZXBzKCk7XG4gICAgICAgIHRoaXMucGFnZS5vbihQYWdlLm5hdmlnYXRpbmdUb0V2ZW50LCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmdldEdyb2VwcygpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzZWxlY3RlZEluZGV4Q2hhbmdlZChhcmdzKSB7XG4gICAgICAgIGNvbnN0IHBpY2tlciA9IDxMaXN0UGlja2VyPmFyZ3Mub2JqZWN0O1xuICAgICAgICBjb25zdCBhcHBTZXR0aW5ncyA9IHJlcXVpcmUoXCJhcHBsaWNhdGlvbi1zZXR0aW5nc1wiKTtcblxuICAgICAgICBpZiAodGhpcy5ncm9lcHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdGhpcy5ncm9lcCA9IHRoaXMuZ3JvZXBzW3BpY2tlci5zZWxlY3RlZEluZGV4XTtcbiAgICAgICAgICAgIHRoaXMuZ2V0Q3VzdG9tZXJzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRHcm9lcHMoKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGxvY2F0aW9uSWQgPSBTZXR0aW5ncy5nZXRMb2NhdGlvbigpO1xuICAgICAgICBjb25zdCBkYXRlID0gU2V0dGluZ3MuZ2V0RGF0ZSgpO1xuXG4gICAgICAgIHRoaXMuZ3JvZXBTZXJ2aWNlLmdldEFsbEdyb2Vwc0ZvcldlZWtBbmRMb2NhdGlvbkFjdGlvbihkYXRlLCBsb2NhdGlvbklkKVxuICAgICAgICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICAocmVzdWx0OiBBcnJheTxHcm9lcD4pID0+IHtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdyb2VwcyA9IHJlc3VsdDtcblxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5ncm9lcHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ncm9lcEl0ZW1zID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1zOiB0aGlzLmdyb2VwcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZW5ndGg6IHRoaXMuZ3JvZXBzLmxlbmd0aCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBnZXRJdGVtOiAoaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaXRlbSA9IHRoaXMuZ3JvZXBzW2luZGV4XTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXRlbS5uYW1lO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGFzR3JvZXBzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZm91bmQgbWUgc29tZSBzaXplIGdyb2Vwc1wiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ3JvZXAgPSB0aGlzLmdyb2Vwc1swXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0Q3VzdG9tZXJzKCk7XG5cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmRpcihlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGFzR3JvZXBzID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIC8qVE9ETzogaGFuZGxlIGVycm9ycyovXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcbiAgICB9XG5cbiAgICBnZXRDdXN0b21lcnMoKTogdm9pZCB7XG4gICAgICAgIGlmICgodHlwZW9mIHRoaXMuZ3JvZXAgIT09IFwidW5kZWZpbmVkXCIgJiZcbiAgICAgICAgdGhpcy5ncm9lcCAhPT0gbnVsbCA/IHRoaXMuZ3JvZXAuaWQgOiB2b2lkIDApICE9IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuaXNCdXN5ID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuY3VzdG9tZXJTZXJ2aWNlLmdldEFsbEJ5R3JvZXBBY3Rpb24odGhpcy5ncm9lcC5pZClcbiAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICAocmVzdWx0OiBBcnJheTxTaXplQ3VzdG9tZXI+KSA9PiB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3VzdG9tZXJzID0gcmVzdWx0O1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJmb3VuZCBtZSBzb21lIHNpemUgY3VzdG9tZXJzXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pc0J1c3kgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmRpcihlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhhc0dyb2VwcyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgLypUT0RPOiBoYW5kbGUgZXJyb3JzKi9cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIGdldFNpemVzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnN1aXRTaXplU2VydmljZS5nZXRBbGxBY3Rpb24oKVxuICAgICAgICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICAocmVzdWx0OiBBcnJheTxTdWl0U2l6ZT4pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaXplcyA9IFt7a2V5OiBcIjBcIiwgbGFiZWw6IFwiS2llcyBlZW4gTWFhdFwifV07XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2l6ZXMgPSBbLi4udGhpcy5zaXplcywgLi4ucmVzdWx0Lm1hcCgoeyBpZCwgbmFtZSB9KSA9PiAoeyBrZXk6IGlkLCBsYWJlbDogbmFtZSB9KSldO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZGlyKGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgLypUT0RPOiBoYW5kbGUgZXJyb3JzKi9cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuXG4gICAgfVxuXG4gICAgZGZQcm9wZXJ0eUNvbW1pdHRlZChhcmdzKSB7XG4gICAgICAgIGNvbnN0IGRhdGFGb3JtID0gPFJhZERhdGFGb3JtPmFyZ3Mub2JqZWN0O1xuICAgICAgICBjb25zdCBzaXplQ3VzdG9tZXI6IFNpemVDdXN0b21lciA9IDxTaXplQ3VzdG9tZXI+IEpTT04ucGFyc2UoZGF0YUZvcm0uZWRpdGVkT2JqZWN0KTtcblxuICAgICAgICBpZiAoc2l6ZUN1c3RvbWVyLnNpemUgIT09IFwiMFwiKSB7XG4gICAgICAgICAgICB0aGlzLmN1c3RvbWVyU2VydmljZS5wdXRDdXN0b21lclNpemVBY3Rpb24oc2l6ZUN1c3RvbWVyKVxuICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVXBkYXRlZCBjdXN0b21lclwiKTtcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmRpcihlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgICAgICAvKlRPRE86IGhhbmRsZSBlcnJvcnMqL1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uRHJhd2VyQnV0dG9uVGFwKCk6IHZvaWQge1xuICAgICAgICBjb25zdCBzaWRlRHJhd2VyID0gPFJhZFNpZGVEcmF3ZXI+YXBwLmdldFJvb3RWaWV3KCk7XG4gICAgICAgIHNpZGVEcmF3ZXIuc2hvd0RyYXdlcigpO1xuICAgIH1cblxufVxuIl19