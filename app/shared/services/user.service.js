"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var config_1 = require("../config");
var service_1 = require("~/shared/services/service");
var UserService = /** @class */ (function (_super) {
    __extends(UserService, _super);
    function UserService(http) {
        var _this = _super.call(this) || this;
        _this.http = http;
        return _this;
    }
    UserService.prototype.login = function (user) {
        var url = config_1.Config.apiUrl + "oauth/v2/token";
        console.log(url);
        return this.http.post(url, {
            grant_type: "password",
            client_id: config_1.Config.appKey,
            client_secret: config_1.Config.appSecret,
            username: user.username,
            password: user.password
        }, { headers: this.getCommonHeaders() });
    };
    UserService.prototype.register = function (user) {
        return this.http.post(config_1.Config.apiUrl + "user/" + config_1.Config.appKey, JSON.stringify({
            username: user.username,
            password: user.password
        }), { headers: this.getCommonHeaders() });
    };
    UserService.prototype.getRoles = function () {
        var headers = this.createRequestHeader();
        var url = config_1.Config.apiUrl + "api/user/roles";
        console.dir(url);
        return this.http.get(url, { headers: headers });
    };
    UserService.prototype.getCommonHeaders = function () {
        var headers = new http_1.HttpHeaders({
            "Content-Type": "application/json"
        });
        return headers;
    };
    UserService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], UserService);
    return UserService;
}(service_1.Service));
exports.UserService = UserService;
