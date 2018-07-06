"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var service_1 = require("~/shared/services/service");
var config_1 = require("../config");
var LocationService = /** @class */ (function (_super) {
    __extends(LocationService, _super);
    function LocationService(http) {
        var _this = _super.call(this) || this;
        _this.http = http;
        return _this;
    }
    LocationService.prototype.getLocationsAction = function () {
        var headers = this.createRequestHeader();
        var url = config_1.Config.apiUrl + "api/locations";
        console.log(url);
        return this.http.get(url, { headers: headers });
    };
    LocationService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], LocationService);
    return LocationService;
}(service_1.Service));
exports.LocationService = LocationService;
