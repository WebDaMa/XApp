"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var service_1 = require("~/shared/services/service");
var config_1 = require("../config");
var AgencyService = /** @class */ (function (_super) {
    __extends(AgencyService, _super);
    function AgencyService(http) {
        var _this = _super.call(this) || this;
        _this.http = http;
        return _this;
    }
    AgencyService.prototype.getAllAgenciesForWeekAndLocationAction = function (date, locationId) {
        var headers = this.createRequestHeader();
        var url = config_1.Config.apiUrl + "api/agencies/week-and-location/" + date + "/" + locationId;
        console.dir(url);
        return this.http.get(url, { headers: headers });
    };
    AgencyService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], AgencyService);
    return AgencyService;
}(service_1.Service));
exports.AgencyService = AgencyService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWdlbmN5LnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhZ2VuY3kuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDZDQUE2RTtBQUM3RSxzQ0FBMkM7QUFJM0MscURBQW9EO0FBQ3BELG9DQUFtQztBQUduQztJQUFtQyxpQ0FBTztJQUN0Qyx1QkFBb0IsSUFBZ0I7UUFBcEMsWUFDSSxpQkFBTyxTQUNWO1FBRm1CLFVBQUksR0FBSixJQUFJLENBQVk7O0lBRXBDLENBQUM7SUFFRCw4REFBc0MsR0FBdEMsVUFBdUMsSUFBSSxFQUFFLFVBQVU7UUFDbkQsSUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7UUFDM0MsSUFBTSxHQUFHLEdBQUcsZUFBTSxDQUFDLE1BQU0sR0FBRyxpQ0FBaUMsR0FBRyxJQUFJLEdBQUcsR0FBRyxHQUFHLFVBQVUsQ0FBQztRQUN4RixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRWpCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQWdCLEdBQUcsRUFBRSxFQUFFLE9BQU8sU0FBQSxFQUFFLENBQUMsQ0FBQztJQUMxRCxDQUFDO0lBWFEsYUFBYTtRQUR6QixpQkFBVSxFQUFFO3lDQUVpQixpQkFBVTtPQUQzQixhQUFhLENBYXpCO0lBQUQsb0JBQUM7Q0FBQSxBQWJELENBQW1DLGlCQUFPLEdBYXpDO0FBYlksc0NBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwSGVhZGVycywgSHR0cFJlc3BvbnNlIH0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vbi9odHRwXCI7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tIFwicnhqc1wiO1xuXG5pbXBvcnQgeyBBZ2VuY3kgfSBmcm9tIFwifi9zaGFyZWQvbW9kZWxzL2FnZW5jeS5tb2RlbFwiO1xuaW1wb3J0IHsgU2VydmljZSB9IGZyb20gXCJ+L3NoYXJlZC9zZXJ2aWNlcy9zZXJ2aWNlXCI7XG5pbXBvcnQgeyBDb25maWcgfSBmcm9tIFwiLi4vY29uZmlnXCI7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBBZ2VuY3lTZXJ2aWNlIGV4dGVuZHMgU2VydmljZSB7XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50KSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgfVxuXG4gICAgZ2V0QWxsQWdlbmNpZXNGb3JXZWVrQW5kTG9jYXRpb25BY3Rpb24oZGF0ZSwgbG9jYXRpb25JZCk6IE9ic2VydmFibGU8QXJyYXk8QWdlbmN5Pj4ge1xuICAgICAgICBjb25zdCBoZWFkZXJzID0gdGhpcy5jcmVhdGVSZXF1ZXN0SGVhZGVyKCk7XG4gICAgICAgIGNvbnN0IHVybCA9IENvbmZpZy5hcGlVcmwgKyBcImFwaS9hZ2VuY2llcy93ZWVrLWFuZC1sb2NhdGlvbi9cIiArIGRhdGUgKyBcIi9cIiArIGxvY2F0aW9uSWQ7XG4gICAgICAgIGNvbnNvbGUuZGlyKHVybCk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQ8QXJyYXk8QWdlbmN5Pj4odXJsLCB7IGhlYWRlcnMgfSk7XG4gICAgfVxuXG59XG4iXX0=