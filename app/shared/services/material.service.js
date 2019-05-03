"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var service_1 = require("~/shared/services/service");
var config_1 = require("../config");
var MaterialService = /** @class */ (function (_super) {
    __extends(MaterialService, _super);
    function MaterialService(http) {
        var _this = _super.call(this) || this;
        _this.http = http;
        return _this;
    }
    MaterialService.prototype.getTotalForGuideAndDateAction = function (guideId, date) {
        var headers = this.createRequestHeader();
        var url = config_1.Config.apiUrl + "api/suitsize/total/" + guideId + "/" + date;
        console.log(url);
        return this.http.get(url, { headers: headers });
    };
    MaterialService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], MaterialService);
    return MaterialService;
}(service_1.Service));
exports.MaterialService = MaterialService;
