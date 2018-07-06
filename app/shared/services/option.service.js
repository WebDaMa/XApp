"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var service_1 = require("~/shared/services/service");
var config_1 = require("../config");
var OptionService = /** @class */ (function (_super) {
    __extends(OptionService, _super);
    function OptionService(http) {
        var _this = _super.call(this) || this;
        _this.http = http;
        return _this;
    }
    OptionService.prototype.getAllCategoriesAction = function () {
        var headers = this.createRequestHeader();
        var url = config_1.Config.apiUrl + "api/activities/groups";
        console.dir(url);
        return this.http.get(url, { headers: headers });
    };
    OptionService.prototype.getAllActivitiesByCategoryAction = function (categoryId) {
        var headers = this.createRequestHeader();
        var url = config_1.Config.apiUrl + "api/activities/" + categoryId;
        console.dir(url);
        return this.http.get(url, { headers: headers });
    };
    OptionService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], OptionService);
    return OptionService;
}(service_1.Service));
exports.OptionService = OptionService;
