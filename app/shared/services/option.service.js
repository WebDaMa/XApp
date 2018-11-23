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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3B0aW9uLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJvcHRpb24uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDZDQUE2RTtBQUM3RSxzQ0FBMkM7QUFLM0MscURBQW9EO0FBQ3BELG9DQUFtQztBQUduQztJQUFtQyxpQ0FBTztJQUN0Qyx1QkFBb0IsSUFBZ0I7UUFBcEMsWUFDSSxpQkFBTyxTQUNWO1FBRm1CLFVBQUksR0FBSixJQUFJLENBQVk7O0lBRXBDLENBQUM7SUFFRCw4Q0FBc0IsR0FBdEI7UUFDSSxJQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztRQUMzQyxJQUFNLEdBQUcsR0FBRyxlQUFNLENBQUMsTUFBTSxHQUFHLHVCQUF1QixDQUFDO1FBQ3BELE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFakIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBd0IsR0FBRyxFQUFFLEVBQUUsT0FBTyxTQUFBLEVBQUUsQ0FBQyxDQUFDO0lBQ2xFLENBQUM7SUFFRCx3REFBZ0MsR0FBaEMsVUFBaUMsVUFBVTtRQUN2QyxJQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztRQUMzQyxJQUFNLEdBQUcsR0FBRyxlQUFNLENBQUMsTUFBTSxHQUFHLGlCQUFpQixHQUFHLFVBQVUsQ0FBQztRQUMzRCxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRWpCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQWtCLEdBQUcsRUFBRSxFQUFFLE9BQU8sU0FBQSxFQUFFLENBQUMsQ0FBQztJQUM1RCxDQUFDO0lBbkJRLGFBQWE7UUFEekIsaUJBQVUsRUFBRTt5Q0FFaUIsaUJBQVU7T0FEM0IsYUFBYSxDQXFCekI7SUFBRCxvQkFBQztDQUFBLEFBckJELENBQW1DLGlCQUFPLEdBcUJ6QztBQXJCWSxzQ0FBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBIZWFkZXJzLCBIdHRwUmVzcG9uc2UgfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uL2h0dHBcIjtcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gXCJyeGpzXCI7XG5cbmltcG9ydCB7IEFjdGl2aXR5IH0gZnJvbSBcIn4vc2hhcmVkL21vZGVscy9hY3Rpdml0eS5tb2RlbFwiO1xuaW1wb3J0IHsgT3B0aW9uQ2F0ZWdvcnkgfSBmcm9tIFwifi9zaGFyZWQvbW9kZWxzL29wdGlvbkNhdGVnb3J5Lm1vZGVsXCI7XG5pbXBvcnQgeyBTZXJ2aWNlIH0gZnJvbSBcIn4vc2hhcmVkL3NlcnZpY2VzL3NlcnZpY2VcIjtcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gXCIuLi9jb25maWdcIjtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE9wdGlvblNlcnZpY2UgZXh0ZW5kcyBTZXJ2aWNlIHtcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICB9XG5cbiAgICBnZXRBbGxDYXRlZ29yaWVzQWN0aW9uKCk6IE9ic2VydmFibGU8QXJyYXk8T3B0aW9uQ2F0ZWdvcnk+PiB7XG4gICAgICAgIGNvbnN0IGhlYWRlcnMgPSB0aGlzLmNyZWF0ZVJlcXVlc3RIZWFkZXIoKTtcbiAgICAgICAgY29uc3QgdXJsID0gQ29uZmlnLmFwaVVybCArIFwiYXBpL2FjdGl2aXRpZXMvZ3JvdXBzXCI7XG4gICAgICAgIGNvbnNvbGUuZGlyKHVybCk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQ8QXJyYXk8T3B0aW9uQ2F0ZWdvcnk+Pih1cmwsIHsgaGVhZGVycyB9KTtcbiAgICB9XG5cbiAgICBnZXRBbGxBY3Rpdml0aWVzQnlDYXRlZ29yeUFjdGlvbihjYXRlZ29yeUlkKTogT2JzZXJ2YWJsZTxBcnJheTxBY3Rpdml0eT4+IHtcbiAgICAgICAgY29uc3QgaGVhZGVycyA9IHRoaXMuY3JlYXRlUmVxdWVzdEhlYWRlcigpO1xuICAgICAgICBjb25zdCB1cmwgPSBDb25maWcuYXBpVXJsICsgXCJhcGkvYWN0aXZpdGllcy9cIiArIGNhdGVnb3J5SWQ7XG4gICAgICAgIGNvbnNvbGUuZGlyKHVybCk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQ8QXJyYXk8QWN0aXZpdHk+Pih1cmwsIHsgaGVhZGVycyB9KTtcbiAgICB9XG5cbn1cbiJdfQ==