"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var nativescript_angular_1 = require("nativescript-angular");
var page_1 = require("tns-core-modules/ui/page");
var settings_1 = require("~/settings/settings");
var agency_service_1 = require("~/shared/services/agency.service");
var customer_service_1 = require("~/shared/services/customer.service");
var LodgingComponent = /** @class */ (function () {
    function LodgingComponent(customerService, agencyService, routerExtensions, page, activeRoute) {
        this.customerService = customerService;
        this.agencyService = agencyService;
        this.routerExtensions = routerExtensions;
        this.page = page;
        this.activeRoute = activeRoute;
        this.selectedIndex = 0;
        this.agencies = [];
        this.agency = {
            id: "",
            name: ""
        };
        this.agenciesItems = {};
        this.hasAgencies = false;
        this.lodging = {
            date: "",
            customers: []
        };
    }
    LodgingComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.getAgencies();
        this.page.backgroundSpanUnderStatusBar = true;
        this.page.on("loaded", function (args) {
            if (_this.page.android) {
                _this.page.android.setFitsSystemWindows(true);
            }
        });
    };
    LodgingComponent.prototype.getAgencies = function () {
        var _this = this;
        var date = settings_1.Settings.getDate();
        var locationId = settings_1.Settings.getLocation();
        this.isBusy = true;
        this.agencyService.getAllAgenciesForWeekAndLocationAction(date, locationId)
            .subscribe(function (result) {
            _this.agencies = result;
            if (_this.agencies.length > 0) {
                _this.agenciesItems = {
                    items: _this.agencies,
                    length: _this.agencies.length,
                    getItem: function (index) {
                        var item = _this.agencies[index];
                        return item.name;
                    }
                };
                _this.hasAgencies = true;
                _this.agency = _this.agencies[0];
                console.log("found me some agencies");
            }
            _this.isBusy = false;
            _this.getCustomersLodging();
        }, function (error) {
            console.dir(error);
            _this.hasAgencies = false;
            _this.isBusy = false;
            /*TODO: handle errors*/
        });
    };
    LodgingComponent.prototype.dfPropertyLodgingCommitted = function (args) {
        var _this = this;
        var dataForm = args.object;
        var lodgingCustomer = JSON.parse(dataForm.editedObject);
        this.isBusy = true;
        this.customerService.putLodgingLayoutCustomerAction(lodgingCustomer)
            .subscribe(function () {
            console.log("Updated customer");
            _this.isBusy = false;
        }, function (error) {
            console.dir(error);
            _this.isBusy = false;
            /*TODO: handle errors*/
        });
    };
    LodgingComponent.prototype.getCustomersLodging = function () {
        var _this = this;
        this.isBusy = true;
        var date = settings_1.Settings.getDate();
        var locationId = settings_1.Settings.getLocation();
        if ((typeof this.agency !== "undefined" &&
            this.agency !== null ? this.agency.id : void 0) != null) {
            this.customerService.getAllByAgencyForLodgingAndLocationAndPeriodAction(this.agency.id, locationId, date)
                .subscribe(function (result) {
                _this.lodging = result;
                _this.isBusy = false;
            }, function (error) {
                console.dir(error);
                /*TODO: handle errors*/
                _this.isBusy = false;
            });
        }
    };
    LodgingComponent.prototype.selectedIndexAgencyChanged = function (args) {
        var picker = args.object;
        if (this.agencies.length > 0) {
            this.agency = this.agencies[picker.selectedIndex];
            this.getCustomersLodging();
        }
    };
    LodgingComponent.prototype.goBack = function () {
        this.routerExtensions.navigate(["/tabs/default"], {
            transition: {
                name: "fade"
            }
        });
    };
    LodgingComponent = __decorate([
        core_1.Component({
            selector: "Lodging",
            moduleId: module.id,
            providers: [customer_service_1.CustomerService, agency_service_1.AgencyService],
            templateUrl: "./lodging.component.html"
        }),
        __metadata("design:paramtypes", [customer_service_1.CustomerService, agency_service_1.AgencyService,
            nativescript_angular_1.RouterExtensions, page_1.Page, router_1.ActivatedRoute])
    ], LodgingComponent);
    return LodgingComponent;
}());
exports.LodgingComponent = LodgingComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9kZ2luZy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJsb2RnaW5nLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUE2RDtBQUM3RCwwQ0FBaUQ7QUFDakQsNkRBQXdEO0FBR3hELGlEQUFnRDtBQUNoRCxnREFBK0M7QUFJL0MsbUVBQWlFO0FBQ2pFLHVFQUFxRTtBQVFyRTtJQWtCSSwwQkFBb0IsZUFBZ0MsRUFBVSxhQUE0QixFQUN0RSxnQkFBa0MsRUFBVSxJQUFVLEVBQVUsV0FBMkI7UUFEM0Ysb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQVUsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFDdEUscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUFVLFNBQUksR0FBSixJQUFJLENBQU07UUFBVSxnQkFBVyxHQUFYLFdBQVcsQ0FBZ0I7UUFsQi9HLGtCQUFhLEdBQVcsQ0FBQyxDQUFDO1FBSTFCLGFBQVEsR0FBa0IsRUFBRSxDQUFDO1FBQzdCLFdBQU0sR0FBVztZQUNiLEVBQUUsRUFBRSxFQUFFO1lBQ04sSUFBSSxFQUFFLEVBQUU7U0FDWCxDQUFDO1FBQ0Ysa0JBQWEsR0FBVyxFQUFFLENBQUM7UUFDM0IsZ0JBQVcsR0FBWSxLQUFLLENBQUM7UUFFN0IsWUFBTyxHQUFZO1lBQ2YsSUFBSSxFQUFFLEVBQUU7WUFDUixTQUFTLEVBQUUsRUFBRTtTQUNoQixDQUFDO0lBSUYsQ0FBQztJQUVELG1DQUFRLEdBQVI7UUFBQSxpQkFRQztRQVBHLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNuQixJQUFJLENBQUMsSUFBSSxDQUFDLDRCQUE0QixHQUFHLElBQUksQ0FBQztRQUM5QyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsVUFBQyxJQUFJO1lBQ3hCLElBQUksS0FBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUU7Z0JBQ25CLEtBQUksQ0FBQyxJQUFJLENBQUMsT0FB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QTBCO1NBQzFDLENBQUM7eUNBbUJ1QyxrQ0FBZSxFQUF5Qiw4QkFBYTtZQUNwRCx1Q0FBZ0IsRUFBZ0IsV0FBSSxFQUF1Qix1QkFBYztPQW5CdEcsZ0JBQWdCLENBK0g1QjtJQUFELHVCQUFDO0NBQUEsQUEvSEQsSUErSEM7QUEvSFksNENBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIFZpZXdDaGlsZCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXJcIjtcbmltcG9ydCB7IFJhZERhdGFGb3JtIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC11aS1kYXRhZm9ybVwiO1xuaW1wb3J0IHsgTGlzdFBpY2tlciB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2xpc3QtcGlja2VyXCI7XG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvcGFnZVwiO1xuaW1wb3J0IHsgU2V0dGluZ3MgfSBmcm9tIFwifi9zZXR0aW5ncy9zZXR0aW5nc1wiO1xuaW1wb3J0IHsgQWdlbmN5IH0gZnJvbSBcIn4vc2hhcmVkL21vZGVscy9hZ2VuY3kubW9kZWxcIjtcbmltcG9ydCB7IExvZGdpbmcgfSBmcm9tIFwifi9zaGFyZWQvbW9kZWxzL2xvZGdpbmcubW9kZWxcIjtcbmltcG9ydCB7IExvZGdpbmdDdXN0b21lciB9IGZyb20gXCJ+L3NoYXJlZC9tb2RlbHMvbG9kZ2luZ0N1c3RvbWVyLm1vZGVsXCI7XG5pbXBvcnQgeyBBZ2VuY3lTZXJ2aWNlIH0gZnJvbSBcIn4vc2hhcmVkL3NlcnZpY2VzL2FnZW5jeS5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBDdXN0b21lclNlcnZpY2UgfSBmcm9tIFwifi9zaGFyZWQvc2VydmljZXMvY3VzdG9tZXIuc2VydmljZVwiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJMb2RnaW5nXCIsXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICBwcm92aWRlcnM6IFtDdXN0b21lclNlcnZpY2UsIEFnZW5jeVNlcnZpY2VdLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vbG9kZ2luZy5jb21wb25lbnQuaHRtbFwiXG59KVxuZXhwb3J0IGNsYXNzIExvZGdpbmdDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIHNlbGVjdGVkSW5kZXg6IG51bWJlciA9IDA7XG5cbiAgICBpc0J1c3k6IGJvb2xlYW47XG5cbiAgICBhZ2VuY2llczogQXJyYXk8QWdlbmN5PiA9IFtdO1xuICAgIGFnZW5jeTogQWdlbmN5ID0ge1xuICAgICAgICBpZDogXCJcIixcbiAgICAgICAgbmFtZTogXCJcIlxuICAgIH07XG4gICAgYWdlbmNpZXNJdGVtczogb2JqZWN0ID0ge307XG4gICAgaGFzQWdlbmNpZXM6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIGxvZGdpbmc6IExvZGdpbmcgPSB7XG4gICAgICAgIGRhdGU6IFwiXCIsXG4gICAgICAgIGN1c3RvbWVyczogW11cbiAgICB9O1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBjdXN0b21lclNlcnZpY2U6IEN1c3RvbWVyU2VydmljZSwgcHJpdmF0ZSBhZ2VuY3lTZXJ2aWNlOiBBZ2VuY3lTZXJ2aWNlLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgcm91dGVyRXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9ucywgcHJpdmF0ZSBwYWdlOiBQYWdlLCBwcml2YXRlIGFjdGl2ZVJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSkge1xuICAgIH1cblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmdldEFnZW5jaWVzKCk7XG4gICAgICAgIHRoaXMucGFnZS5iYWNrZ3JvdW5kU3BhblVuZGVyU3RhdHVzQmFyID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5wYWdlLm9uKFwibG9hZGVkXCIsIChhcmdzKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5wYWdlLmFuZHJvaWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBhZ2UuYW5kcm9pZC5zZXRGaXRzU3lzdGVtV2luZG93cyh0cnVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZ2V0QWdlbmNpZXMoKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGRhdGUgPSBTZXR0aW5ncy5nZXREYXRlKCk7XG4gICAgICAgIGNvbnN0IGxvY2F0aW9uSWQgPSBTZXR0aW5ncy5nZXRMb2NhdGlvbigpO1xuXG4gICAgICAgIHRoaXMuaXNCdXN5ID0gdHJ1ZTtcblxuICAgICAgICB0aGlzLmFnZW5jeVNlcnZpY2UuZ2V0QWxsQWdlbmNpZXNGb3JXZWVrQW5kTG9jYXRpb25BY3Rpb24oZGF0ZSwgbG9jYXRpb25JZClcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgKHJlc3VsdDogQXJyYXk8QWdlbmN5PikgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFnZW5jaWVzID0gcmVzdWx0O1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5hZ2VuY2llcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFnZW5jaWVzSXRlbXMgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbXM6IHRoaXMuYWdlbmNpZXMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVuZ3RoOiB0aGlzLmFnZW5jaWVzLmxlbmd0aCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBnZXRJdGVtOiAoaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaXRlbSA9IHRoaXMuYWdlbmNpZXNbaW5kZXhdO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpdGVtLm5hbWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGFzQWdlbmNpZXMgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFnZW5jeSA9IHRoaXMuYWdlbmNpZXNbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImZvdW5kIG1lIHNvbWUgYWdlbmNpZXNcIik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc0J1c3kgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRDdXN0b21lcnNMb2RnaW5nKCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5kaXIoZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhc0FnZW5jaWVzID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNCdXN5ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIC8qVE9ETzogaGFuZGxlIGVycm9ycyovXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcbiAgICB9XG5cbiAgICBkZlByb3BlcnR5TG9kZ2luZ0NvbW1pdHRlZChhcmdzKSB7XG4gICAgICAgIGNvbnN0IGRhdGFGb3JtID0gPFJhZERhdGFGb3JtPmFyZ3Mub2JqZWN0O1xuICAgICAgICBjb25zdCBsb2RnaW5nQ3VzdG9tZXI6IExvZGdpbmdDdXN0b21lciA9IDxMb2RnaW5nQ3VzdG9tZXI+IEpTT04ucGFyc2UoZGF0YUZvcm0uZWRpdGVkT2JqZWN0KTtcblxuICAgICAgICB0aGlzLmlzQnVzeSA9IHRydWU7XG4gICAgICAgIHRoaXMuY3VzdG9tZXJTZXJ2aWNlLnB1dExvZGdpbmdMYXlvdXRDdXN0b21lckFjdGlvbihsb2RnaW5nQ3VzdG9tZXIpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJVcGRhdGVkIGN1c3RvbWVyXCIpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzQnVzeSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZGlyKGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc0J1c3kgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgLypUT0RPOiBoYW5kbGUgZXJyb3JzKi9cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuICAgIH1cblxuICAgIGdldEN1c3RvbWVyc0xvZGdpbmcoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuaXNCdXN5ID0gdHJ1ZTtcbiAgICAgICAgY29uc3QgZGF0ZSA9IFNldHRpbmdzLmdldERhdGUoKTtcbiAgICAgICAgY29uc3QgbG9jYXRpb25JZCA9IFNldHRpbmdzLmdldExvY2F0aW9uKCk7XG5cbiAgICAgICAgaWYgKCh0eXBlb2YgdGhpcy5hZ2VuY3kgIT09IFwidW5kZWZpbmVkXCIgJiZcbiAgICAgICAgdGhpcy5hZ2VuY3kgIT09IG51bGwgPyB0aGlzLmFnZW5jeS5pZCA6IHZvaWQgMCkgIT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5jdXN0b21lclNlcnZpY2UuZ2V0QWxsQnlBZ2VuY3lGb3JMb2RnaW5nQW5kTG9jYXRpb25BbmRQZXJpb2RBY3Rpb24odGhpcy5hZ2VuY3kuaWQsIGxvY2F0aW9uSWQsIGRhdGUpXG4gICAgICAgICAgICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgKHJlc3VsdDogTG9kZ2luZykgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2RnaW5nID0gcmVzdWx0O1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pc0J1c3kgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmRpcihlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgICAgICAvKlRPRE86IGhhbmRsZSBlcnJvcnMqL1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pc0J1c3kgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZWxlY3RlZEluZGV4QWdlbmN5Q2hhbmdlZChhcmdzKSB7XG4gICAgICAgIGNvbnN0IHBpY2tlciA9IDxMaXN0UGlja2VyPmFyZ3Mub2JqZWN0O1xuXG4gICAgICAgIGlmICh0aGlzLmFnZW5jaWVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHRoaXMuYWdlbmN5ID0gdGhpcy5hZ2VuY2llc1twaWNrZXIuc2VsZWN0ZWRJbmRleF07XG4gICAgICAgICAgICB0aGlzLmdldEN1c3RvbWVyc0xvZGdpbmcoKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgZ29CYWNrKCkge1xuICAgICAgICB0aGlzLnJvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL3RhYnMvZGVmYXVsdFwiXSwge1xuICAgICAgICAgICAgdHJhbnNpdGlvbjoge1xuICAgICAgICAgICAgICAgIG5hbWU6IFwiZmFkZVwiXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiJdfQ==