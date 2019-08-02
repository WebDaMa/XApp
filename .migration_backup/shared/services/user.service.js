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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidXNlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNkNBQTZFO0FBQzdFLHNDQUEyQztBQUkzQyxvQ0FBbUM7QUFDbkMscURBQWtEO0FBR2xEO0lBQWlDLCtCQUFPO0lBQ3BDLHFCQUFvQixJQUFnQjtRQUFwQyxZQUNJLGlCQUFPLFNBQ1Y7UUFGbUIsVUFBSSxHQUFKLElBQUksQ0FBWTs7SUFFcEMsQ0FBQztJQUVELDJCQUFLLEdBQUwsVUFBTSxJQUFVO1FBQ1osSUFBTSxHQUFHLEdBQUcsZUFBTSxDQUFDLE1BQU0sR0FBRyxnQkFBZ0IsQ0FBQztRQUM3QyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRWpCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQ2pCLEdBQUcsRUFDSDtZQUNJLFVBQVUsRUFBRSxVQUFVO1lBQ3RCLFNBQVMsRUFBRSxlQUFNLENBQUMsTUFBTTtZQUN4QixhQUFhLEVBQUUsZUFBTSxDQUFDLFNBQVM7WUFDL0IsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRO1lBQ3ZCLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTtTQUMxQixFQUNELEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxFQUFFLENBQ3ZDLENBQUM7SUFDTixDQUFDO0lBRUQsOEJBQVEsR0FBUixVQUFTLElBQVU7UUFDZixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUNqQixlQUFNLENBQUMsTUFBTSxHQUFHLE9BQU8sR0FBRyxlQUFNLENBQUMsTUFBTSxFQUN2QyxJQUFJLENBQUMsU0FBUyxDQUFDO1lBQ1gsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRO1lBQ3ZCLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTtTQUMxQixDQUFDLEVBQ0YsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixFQUFFLEVBQUUsQ0FDdkMsQ0FBQztJQUNOLENBQUM7SUFFRCw4QkFBUSxHQUFSO1FBQ0ksSUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7UUFDM0MsSUFBTSxHQUFHLEdBQUcsZUFBTSxDQUFDLE1BQU0sR0FBRyxnQkFBZ0IsQ0FBQztRQUM3QyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRWpCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQWdCLEdBQUcsRUFBRSxFQUFFLE9BQU8sU0FBQSxFQUFFLENBQUMsQ0FBQztJQUMxRCxDQUFDO0lBRUQsc0NBQWdCLEdBQWhCO1FBQ0ksSUFBTSxPQUFPLEdBQUcsSUFBSSxrQkFBVyxDQUFDO1lBQzVCLGNBQWMsRUFBRSxrQkFBa0I7U0FDckMsQ0FBQyxDQUFDO1FBRUgsT0FBTyxPQUFPLENBQUM7SUFDbkIsQ0FBQztJQS9DUSxXQUFXO1FBRHZCLGlCQUFVLEVBQUU7eUNBRWlCLGlCQUFVO09BRDNCLFdBQVcsQ0FpRHZCO0lBQUQsa0JBQUM7Q0FBQSxBQWpERCxDQUFpQyxpQkFBTyxHQWlEdkM7QUFqRFksa0NBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwSGVhZGVycywgSHR0cFJlc3BvbnNlIH0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vbi9odHRwXCI7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tIFwicnhqc1wiO1xuXG5pbXBvcnQgeyBVc2VyIH0gZnJvbSBcIn4vc2hhcmVkL21vZGVscy91c2VyLm1vZGVsXCI7XG5pbXBvcnQgeyBDb25maWcgfSBmcm9tIFwiLi4vY29uZmlnXCI7XG5pbXBvcnQge1NlcnZpY2V9IGZyb20gXCJ+L3NoYXJlZC9zZXJ2aWNlcy9zZXJ2aWNlXCI7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBVc2VyU2VydmljZSBleHRlbmRzIFNlcnZpY2Uge1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cENsaWVudCkge1xuICAgICAgICBzdXBlcigpO1xuICAgIH1cblxuICAgIGxvZ2luKHVzZXI6IFVzZXIpIHtcbiAgICAgICAgY29uc3QgdXJsID0gQ29uZmlnLmFwaVVybCArIFwib2F1dGgvdjIvdG9rZW5cIjtcbiAgICAgICAgY29uc29sZS5sb2codXJsKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QoXG4gICAgICAgICAgICB1cmwsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZ3JhbnRfdHlwZTogXCJwYXNzd29yZFwiLFxuICAgICAgICAgICAgICAgIGNsaWVudF9pZDogQ29uZmlnLmFwcEtleSxcbiAgICAgICAgICAgICAgICBjbGllbnRfc2VjcmV0OiBDb25maWcuYXBwU2VjcmV0LFxuICAgICAgICAgICAgICAgIHVzZXJuYW1lOiB1c2VyLnVzZXJuYW1lLFxuICAgICAgICAgICAgICAgIHBhc3N3b3JkOiB1c2VyLnBhc3N3b3JkXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgeyBoZWFkZXJzOiB0aGlzLmdldENvbW1vbkhlYWRlcnMoKSB9XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmVnaXN0ZXIodXNlcjogVXNlcikge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QoXG4gICAgICAgICAgICBDb25maWcuYXBpVXJsICsgXCJ1c2VyL1wiICsgQ29uZmlnLmFwcEtleSxcbiAgICAgICAgICAgIEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgICAgICB1c2VybmFtZTogdXNlci51c2VybmFtZSxcbiAgICAgICAgICAgICAgICBwYXNzd29yZDogdXNlci5wYXNzd29yZFxuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICB7IGhlYWRlcnM6IHRoaXMuZ2V0Q29tbW9uSGVhZGVycygpIH1cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBnZXRSb2xlcygpOiBPYnNlcnZhYmxlPG9iamVjdD4ge1xuICAgICAgICBjb25zdCBoZWFkZXJzID0gdGhpcy5jcmVhdGVSZXF1ZXN0SGVhZGVyKCk7XG4gICAgICAgIGNvbnN0IHVybCA9IENvbmZpZy5hcGlVcmwgKyBcImFwaS91c2VyL3JvbGVzXCI7XG4gICAgICAgIGNvbnNvbGUuZGlyKHVybCk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQ8QXJyYXk8c3RyaW5nPj4odXJsLCB7IGhlYWRlcnMgfSk7XG4gICAgfVxuXG4gICAgZ2V0Q29tbW9uSGVhZGVycygpIHtcbiAgICAgICAgY29uc3QgaGVhZGVycyA9IG5ldyBIdHRwSGVhZGVycyh7XG4gICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gaGVhZGVycztcbiAgICB9XG5cbn1cbiJdfQ==