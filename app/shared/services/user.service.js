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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidXNlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNkNBQTZFO0FBQzdFLHNDQUEyQztBQUkzQyxvQ0FBbUM7QUFDbkMscURBQWtEO0FBR2xEO0lBQWlDLCtCQUFPO0lBQ3BDLHFCQUFvQixJQUFnQjtRQUFwQyxZQUNJLGlCQUFPLFNBQ1Y7UUFGbUIsVUFBSSxHQUFKLElBQUksQ0FBWTs7SUFFcEMsQ0FBQztJQUVELDJCQUFLLEdBQUwsVUFBTSxJQUFVO1FBQ1osSUFBTSxHQUFHLEdBQUcsZUFBTSxDQUFDLE1BQU0sR0FBRyxnQkFBZ0IsQ0FBQztRQUM3QyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRWpCLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FDakIsR0FBRyxFQUNIO1lBQ0ksVUFBVSxFQUFFLFVBQVU7WUFDdEIsU0FBUyxFQUFFLGVBQU0sQ0FBQyxNQUFNO1lBQ3hCLGFBQWEsRUFBRSxlQUFNLENBQUMsU0FBUztZQUMvQixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7WUFDdkIsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRO1NBQzFCLEVBQ0QsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixFQUFFLEVBQUUsQ0FDdkMsQ0FBQztJQUNOLENBQUM7SUFFRCw4QkFBUSxHQUFSLFVBQVMsSUFBVTtRQUNmLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FDakIsZUFBTSxDQUFDLE1BQU0sR0FBRyxPQUFPLEdBQUcsZUFBTSxDQUFDLE1BQU0sRUFDdkMsSUFBSSxDQUFDLFNBQVMsQ0FBQztZQUNYLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTtZQUN2QixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7U0FDMUIsQ0FBQyxFQUNGLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxFQUFFLENBQ3ZDLENBQUM7SUFDTixDQUFDO0lBRUQsOEJBQVEsR0FBUjtRQUNJLElBQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1FBQzNDLElBQU0sR0FBRyxHQUFHLGVBQU0sQ0FBQyxNQUFNLEdBQUcsZ0JBQWdCLENBQUM7UUFDN0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUVqQixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQWdCLEdBQUcsRUFBRSxFQUFFLE9BQU8sU0FBQSxFQUFFLENBQUMsQ0FBQztJQUMxRCxDQUFDO0lBRUQsc0NBQWdCLEdBQWhCO1FBQ0ksSUFBTSxPQUFPLEdBQUcsSUFBSSxrQkFBVyxDQUFDO1lBQzVCLGNBQWMsRUFBRSxrQkFBa0I7U0FDckMsQ0FBQyxDQUFDO1FBRUgsTUFBTSxDQUFDLE9BQU8sQ0FBQztJQUNuQixDQUFDO0lBL0NRLFdBQVc7UUFEdkIsaUJBQVUsRUFBRTt5Q0FFaUIsaUJBQVU7T0FEM0IsV0FBVyxDQWlEdkI7SUFBRCxrQkFBQztDQUFBLEFBakRELENBQWlDLGlCQUFPLEdBaUR2QztBQWpEWSxrQ0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBIZWFkZXJzLCBIdHRwUmVzcG9uc2UgfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uL2h0dHBcIjtcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gXCJyeGpzXCI7XG5cbmltcG9ydCB7IFVzZXIgfSBmcm9tIFwifi9zaGFyZWQvbW9kZWxzL3VzZXIubW9kZWxcIjtcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gXCIuLi9jb25maWdcIjtcbmltcG9ydCB7U2VydmljZX0gZnJvbSBcIn4vc2hhcmVkL3NlcnZpY2VzL3NlcnZpY2VcIjtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFVzZXJTZXJ2aWNlIGV4dGVuZHMgU2VydmljZSB7XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50KSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgfVxuXG4gICAgbG9naW4odXNlcjogVXNlcikge1xuICAgICAgICBjb25zdCB1cmwgPSBDb25maWcuYXBpVXJsICsgXCJvYXV0aC92Mi90b2tlblwiO1xuICAgICAgICBjb25zb2xlLmxvZyh1cmwpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucG9zdChcbiAgICAgICAgICAgIHVybCxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBncmFudF90eXBlOiBcInBhc3N3b3JkXCIsXG4gICAgICAgICAgICAgICAgY2xpZW50X2lkOiBDb25maWcuYXBwS2V5LFxuICAgICAgICAgICAgICAgIGNsaWVudF9zZWNyZXQ6IENvbmZpZy5hcHBTZWNyZXQsXG4gICAgICAgICAgICAgICAgdXNlcm5hbWU6IHVzZXIudXNlcm5hbWUsXG4gICAgICAgICAgICAgICAgcGFzc3dvcmQ6IHVzZXIucGFzc3dvcmRcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7IGhlYWRlcnM6IHRoaXMuZ2V0Q29tbW9uSGVhZGVycygpIH1cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICByZWdpc3Rlcih1c2VyOiBVc2VyKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucG9zdChcbiAgICAgICAgICAgIENvbmZpZy5hcGlVcmwgKyBcInVzZXIvXCIgKyBDb25maWcuYXBwS2V5LFxuICAgICAgICAgICAgSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgICAgIHVzZXJuYW1lOiB1c2VyLnVzZXJuYW1lLFxuICAgICAgICAgICAgICAgIHBhc3N3b3JkOiB1c2VyLnBhc3N3b3JkXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIHsgaGVhZGVyczogdGhpcy5nZXRDb21tb25IZWFkZXJzKCkgfVxuICAgICAgICApO1xuICAgIH1cblxuICAgIGdldFJvbGVzKCk6IE9ic2VydmFibGU8b2JqZWN0PiB7XG4gICAgICAgIGNvbnN0IGhlYWRlcnMgPSB0aGlzLmNyZWF0ZVJlcXVlc3RIZWFkZXIoKTtcbiAgICAgICAgY29uc3QgdXJsID0gQ29uZmlnLmFwaVVybCArIFwiYXBpL3VzZXIvcm9sZXNcIjtcbiAgICAgICAgY29uc29sZS5kaXIodXJsKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldDxBcnJheTxzdHJpbmc+Pih1cmwsIHsgaGVhZGVycyB9KTtcbiAgICB9XG5cbiAgICBnZXRDb21tb25IZWFkZXJzKCkge1xuICAgICAgICBjb25zdCBoZWFkZXJzID0gbmV3IEh0dHBIZWFkZXJzKHtcbiAgICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBoZWFkZXJzO1xuICAgIH1cblxufVxuIl19