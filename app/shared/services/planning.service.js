"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var service_1 = require("~/shared/services/service");
var config_1 = require("../config");
var PlanningService = /** @class */ (function (_super) {
    __extends(PlanningService, _super);
    function PlanningService(http) {
        var _this = _super.call(this) || this;
        _this.http = http;
        return _this;
    }
    PlanningService.prototype.getAllByDayAndLocationAction = function (date, locationId) {
        var headers = this.createRequestHeader();
        var url = config_1.Config.apiUrl + "api/planning/" + date + "/" + locationId;
        console.dir(url);
        return this.http.get(url, { headers: headers });
    };
    PlanningService.prototype.getAllByGuideAndWeekAndLocationAction = function (guideId, date, locationId) {
        var headers = this.createRequestHeader();
        var url = config_1.Config.apiUrl + "api/planning/" + guideId + "/" + date + "/" + locationId;
        console.dir(url);
        return this.http.get(url, { headers: headers });
    };
    PlanningService.prototype.putPlanningUpdateAction = function (planning) {
        var headers = this.createRequestHeader();
        var url = config_1.Config.apiUrl + "api/planning/" + planning.id;
        console.dir(url);
        return this.http.put(url, planning, { headers: headers });
    };
    PlanningService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], PlanningService);
    return PlanningService;
}(service_1.Service));
exports.PlanningService = PlanningService;
