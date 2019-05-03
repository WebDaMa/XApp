"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var service_1 = require("~/shared/services/service");
var config_1 = require("../config");
var SuitSizeService = /** @class */ (function (_super) {
    __extends(SuitSizeService, _super);
    function SuitSizeService(http) {
        var _this = _super.call(this) || this;
        _this.http = http;
        return _this;
    }
    SuitSizeService.prototype.getAllAction = function () {
        var headers = this.createRequestHeader();
        var url = config_1.Config.apiUrl + "api/suitsizes";
        return this.http.get(url, { headers: headers });
    };
    SuitSizeService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], SuitSizeService);
    return SuitSizeService;
}(service_1.Service));
exports.SuitSizeService = SuitSizeService;
