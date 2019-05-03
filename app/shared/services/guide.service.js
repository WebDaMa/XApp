"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var service_1 = require("~/shared/services/service");
var config_1 = require("../config");
var GuideService = /** @class */ (function (_super) {
    __extends(GuideService, _super);
    function GuideService(http) {
        var _this = _super.call(this) || this;
        _this.http = http;
        return _this;
    }
    GuideService.prototype.getAllGuidesForWeekAndLocationAction = function (date, locationId) {
        var headers = this.createRequestHeader();
        var url = config_1.Config.apiUrl + "api/guides/week-and-location/" + date + "/" + locationId;
        console.dir(url);
        return this.http.get(url, { headers: headers });
    };
    GuideService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], GuideService);
    return GuideService;
}(service_1.Service));
exports.GuideService = GuideService;
