"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var service_1 = require("~/shared/services/service");
var config_1 = require("../config");
var CustomerService = /** @class */ (function (_super) {
    __extends(CustomerService, _super);
    function CustomerService(http) {
        var _this = _super.call(this) || this;
        _this.http = http;
        return _this;
    }
    CustomerService.prototype.getAllByGroepAction = function (groepId) {
        var headers = this.createRequestHeader();
        var url = config_1.Config.apiUrl + "api/customers/groep/" + groepId;
        console.dir(url);
        return this.http.get(url, { headers: headers });
    };
    CustomerService.prototype.getAllByAgencyForLodgingAndLocationAndPeriodAction = function (agencyId, locationId, date) {
        var headers = this.createRequestHeader();
        var url = config_1.Config.apiUrl + "api/customers/lodging/" + agencyId + "/" + locationId + "/" + date;
        console.dir(url);
        return this.http.get(url, { headers: headers });
    };
    CustomerService.prototype.getAllByGroepWithRaftingOptionAction = function (groepId) {
        var headers = this.createRequestHeader();
        var url = config_1.Config.apiUrl + "api/customers/groep/rafting/" + groepId;
        console.dir(url);
        return this.http.get(url, { headers: headers });
    };
    CustomerService.prototype.getAllByGroepWithCanyoningOptionAction = function (groepId) {
        var headers = this.createRequestHeader();
        var url = config_1.Config.apiUrl + "api/customers/groep/canyoning/" + groepId;
        console.dir(url);
        return this.http.get(url, { headers: headers });
    };
    CustomerService.prototype.getAllByGroepWithSpecialOptionAction = function (groepId) {
        var headers = this.createRequestHeader();
        var url = config_1.Config.apiUrl + "api/customers/groep/special/" + groepId;
        console.dir(url);
        return this.http.get(url, { headers: headers });
    };
    CustomerService.prototype.getBusGoCustomersByWeek = function (date) {
        var headers = this.createRequestHeader();
        var url = config_1.Config.apiUrl + "api/customers/bus/go/" + date;
        console.dir(url);
        return this.http.get(url, { headers: headers });
    };
    CustomerService.prototype.getBusBackCustomersByWeek = function (date) {
        var headers = this.createRequestHeader();
        var url = config_1.Config.apiUrl + "api/customers/bus/back/" + date;
        console.dir(url);
        return this.http.get(url, { headers: headers });
    };
    CustomerService.prototype.getAllByAllInTypeForLocationAndPeriodAction = function (locationId, date) {
        var headers = this.createRequestHeader();
        var url = config_1.Config.apiUrl + "api/customers/all-in-type/" + locationId + "/" + date;
        console.dir(url);
        return this.http.get(url, { headers: headers });
    };
    CustomerService.prototype.putCustomerSizeAction = function (groepCustomer) {
        var headers = this.createRequestHeader();
        var url = config_1.Config.apiUrl + "api/customers/suitsize/" + groepCustomer.id;
        console.dir(url);
        return this.http.put(url, groepCustomer, { headers: headers });
    };
    CustomerService.prototype.putCustomerRaftingOptionAction = function (raftingCustomer) {
        var headers = this.createRequestHeader();
        var url = config_1.Config.apiUrl + "api/customers/rafting/" + raftingCustomer.id;
        console.dir(url);
        return this.http.put(url, raftingCustomer, { headers: headers });
    };
    CustomerService.prototype.putCustomerCanyoningOptionAction = function (canyoningCustomer) {
        var headers = this.createRequestHeader();
        var url = config_1.Config.apiUrl + "api/customers/canyoning/" + canyoningCustomer.id;
        console.dir(url);
        return this.http.put(url, canyoningCustomer, { headers: headers });
    };
    CustomerService.prototype.putCustomerSpecialOptionAction = function (specialCustomer) {
        var headers = this.createRequestHeader();
        var url = config_1.Config.apiUrl + "api/customers/special/" + specialCustomer.id;
        console.dir(url);
        return this.http.put(url, specialCustomer, { headers: headers });
    };
    CustomerService.prototype.putBusGoCustomerAction = function (busCustomer) {
        var headers = this.createRequestHeader();
        var url = config_1.Config.apiUrl + "api/customers/bus/go/" + busCustomer.id;
        console.dir(url);
        return this.http.put(url, busCustomer, { headers: headers });
    };
    CustomerService.prototype.putBusBackCustomerAction = function (busCustomer) {
        var headers = this.createRequestHeader();
        var url = config_1.Config.apiUrl + "api/customers/bus/back/" + busCustomer.id;
        console.dir(url);
        return this.http.put(url, busCustomer, { headers: headers });
    };
    CustomerService.prototype.putLodgingLayoutCustomerAction = function (lodgingCustomer) {
        var headers = this.createRequestHeader();
        var url = config_1.Config.apiUrl + "api/customers/lodging/layout/" + lodgingCustomer.id;
        console.dir(url);
        return this.http.put(url, lodgingCustomer, { headers: headers });
    };
    CustomerService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], CustomerService);
    return CustomerService;
}(service_1.Service));
exports.CustomerService = CustomerService;
