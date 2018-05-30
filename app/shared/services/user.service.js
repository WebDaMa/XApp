"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var config_1 = require("../config");
var UserService = /** @class */ (function () {
    function UserService(http) {
        this.http = http;
    }
    UserService.prototype.login = function (user) {
        return this.http.post(config_1.Config.apiUrl + "oauth/v2/token", {
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
}());
exports.UserService = UserService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidXNlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNkNBQTZFO0FBQzdFLHNDQUEyQztBQUkzQyxvQ0FBbUM7QUFHbkM7SUFDSSxxQkFBb0IsSUFBZ0I7UUFBaEIsU0FBSSxHQUFKLElBQUksQ0FBWTtJQUFHLENBQUM7SUFFeEMsMkJBQUssR0FBTCxVQUFNLElBQVU7UUFFWixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQ2pCLGVBQU0sQ0FBQyxNQUFNLEdBQUcsZ0JBQWdCLEVBQ2hDO1lBQ0ksVUFBVSxFQUFFLFVBQVU7WUFDdEIsU0FBUyxFQUFFLGVBQU0sQ0FBQyxNQUFNO1lBQ3hCLGFBQWEsRUFBRSxlQUFNLENBQUMsU0FBUztZQUMvQixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7WUFDdkIsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRO1NBQzFCLEVBQ0QsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixFQUFFLEVBQUUsQ0FDdkMsQ0FBQztJQUNOLENBQUM7SUFFRCw4QkFBUSxHQUFSLFVBQVMsSUFBVTtRQUNmLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FDakIsZUFBTSxDQUFDLE1BQU0sR0FBRyxPQUFPLEdBQUcsZUFBTSxDQUFDLE1BQU0sRUFDdkMsSUFBSSxDQUFDLFNBQVMsQ0FBQztZQUNYLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTtZQUN2QixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7U0FDMUIsQ0FBQyxFQUNGLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxFQUFFLENBQ3ZDLENBQUM7SUFDTixDQUFDO0lBRUQsc0NBQWdCLEdBQWhCO1FBQ0ksSUFBTSxPQUFPLEdBQUcsSUFBSSxrQkFBVyxDQUFDO1lBQzVCLGNBQWMsRUFBRSxrQkFBa0I7U0FDckMsQ0FBQyxDQUFDO1FBRUgsTUFBTSxDQUFDLE9BQU8sQ0FBQztJQUNuQixDQUFDO0lBbkNRLFdBQVc7UUFEdkIsaUJBQVUsRUFBRTt5Q0FFaUIsaUJBQVU7T0FEM0IsV0FBVyxDQXFDdkI7SUFBRCxrQkFBQztDQUFBLEFBckNELElBcUNDO0FBckNZLGtDQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cEhlYWRlcnMsIEh0dHBSZXNwb25zZSB9IGZyb20gXCJAYW5ndWxhci9jb21tb24vaHR0cFwiO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSBcInJ4anNcIjtcblxuaW1wb3J0IHsgVXNlciB9IGZyb20gXCJ+L3NoYXJlZC9tb2RlbHMvdXNlci5tb2RlbFwiO1xuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSBcIi4uL2NvbmZpZ1wiO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgVXNlclNlcnZpY2Uge1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cENsaWVudCkge31cblxuICAgIGxvZ2luKHVzZXI6IFVzZXIpIHtcblxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QoXG4gICAgICAgICAgICBDb25maWcuYXBpVXJsICsgXCJvYXV0aC92Mi90b2tlblwiLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGdyYW50X3R5cGU6IFwicGFzc3dvcmRcIixcbiAgICAgICAgICAgICAgICBjbGllbnRfaWQ6IENvbmZpZy5hcHBLZXksXG4gICAgICAgICAgICAgICAgY2xpZW50X3NlY3JldDogQ29uZmlnLmFwcFNlY3JldCxcbiAgICAgICAgICAgICAgICB1c2VybmFtZTogdXNlci51c2VybmFtZSxcbiAgICAgICAgICAgICAgICBwYXNzd29yZDogdXNlci5wYXNzd29yZFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHsgaGVhZGVyczogdGhpcy5nZXRDb21tb25IZWFkZXJzKCkgfVxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJlZ2lzdGVyKHVzZXI6IFVzZXIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KFxuICAgICAgICAgICAgQ29uZmlnLmFwaVVybCArIFwidXNlci9cIiArIENvbmZpZy5hcHBLZXksXG4gICAgICAgICAgICBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICAgICAgdXNlcm5hbWU6IHVzZXIudXNlcm5hbWUsXG4gICAgICAgICAgICAgICAgcGFzc3dvcmQ6IHVzZXIucGFzc3dvcmRcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgeyBoZWFkZXJzOiB0aGlzLmdldENvbW1vbkhlYWRlcnMoKSB9XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgZ2V0Q29tbW9uSGVhZGVycygpIHtcbiAgICAgICAgY29uc3QgaGVhZGVycyA9IG5ldyBIdHRwSGVhZGVycyh7XG4gICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gaGVhZGVycztcbiAgICB9XG5cbn1cbiJdfQ==