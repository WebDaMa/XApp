"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("@angular/common/http");
var Service = /** @class */ (function () {
    function Service() {
    }
    Service.prototype.createRequestHeader = function () {
        var appSettings = require("application-settings");
        if (appSettings.hasKey("token")) {
            // set headers here e.g.
            return new http_1.HttpHeaders({
                Authorization: "Bearer " + appSettings.getString("token"),
                "Content-Type": "application/json"
            });
        }
    };
    return Service;
}());
exports.Service = Service;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw2Q0FBbUQ7QUFFbkQ7SUFBQTtJQWVBLENBQUM7SUFkYSxxQ0FBbUIsR0FBN0I7UUFDSSxJQUFNLFdBQVcsR0FBRyxPQUFPLENBQUMsc0JBQXNCLENBQUMsQ0FBQztRQUVwRCxFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM5Qix3QkFBd0I7WUFDeEIsTUFBTSxDQUFDLElBQUksa0JBQVcsQ0FBQztnQkFDbkIsYUFBYSxFQUFFLFNBQVMsR0FBRyxXQUFXLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQztnQkFDekQsY0FBYyxFQUFFLGtCQUFrQjthQUNyQyxDQUFDLENBQUM7UUFFUCxDQUFDO0lBRUwsQ0FBQztJQUVMLGNBQUM7QUFBRCxDQUFDLEFBZkQsSUFlQztBQWZZLDBCQUFPIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSHR0cEhlYWRlcnMgfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uL2h0dHBcIjtcblxuZXhwb3J0IGNsYXNzIFNlcnZpY2Uge1xuICAgIHByb3RlY3RlZCBjcmVhdGVSZXF1ZXN0SGVhZGVyKCkge1xuICAgICAgICBjb25zdCBhcHBTZXR0aW5ncyA9IHJlcXVpcmUoXCJhcHBsaWNhdGlvbi1zZXR0aW5nc1wiKTtcblxuICAgICAgICBpZiAoYXBwU2V0dGluZ3MuaGFzS2V5KFwidG9rZW5cIikpIHtcbiAgICAgICAgICAgIC8vIHNldCBoZWFkZXJzIGhlcmUgZS5nLlxuICAgICAgICAgICAgcmV0dXJuIG5ldyBIdHRwSGVhZGVycyh7XG4gICAgICAgICAgICAgICAgQXV0aG9yaXphdGlvbjogXCJCZWFyZXIgXCIgKyBhcHBTZXR0aW5ncy5nZXRTdHJpbmcoXCJ0b2tlblwiKSxcbiAgICAgICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfVxuXG4gICAgfVxuXG59XG4iXX0=