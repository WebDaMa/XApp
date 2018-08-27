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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3B0aW9uLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJvcHRpb24uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDZDQUE2RTtBQUM3RSxzQ0FBMkM7QUFLM0MscURBQW9EO0FBQ3BELG9DQUFtQztBQUduQztJQUFtQyxpQ0FBTztJQUN0Qyx1QkFBb0IsSUFBZ0I7UUFBcEMsWUFDSSxpQkFBTyxTQUNWO1FBRm1CLFVBQUksR0FBSixJQUFJLENBQVk7O0lBRXBDLENBQUM7SUFFRCw4Q0FBc0IsR0FBdEI7UUFDSSxJQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztRQUMzQyxJQUFNLEdBQUcsR0FBRyxlQUFNLENBQUMsTUFBTSxHQUFHLHVCQUF1QixDQUFDO1FBQ3BELE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFakIsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUF3QixHQUFHLEVBQUUsRUFBRSxPQUFPLFNBQUEsRUFBRSxDQUFDLENBQUM7SUFDbEUsQ0FBQztJQUVELHdEQUFnQyxHQUFoQyxVQUFpQyxVQUFVO1FBQ3ZDLElBQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1FBQzNDLElBQU0sR0FBRyxHQUFHLGVBQU0sQ0FBQyxNQUFNLEdBQUcsaUJBQWlCLEdBQUcsVUFBVSxDQUFDO1FBQzNELE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFakIsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFrQixHQUFHLEVBQUUsRUFBRSxPQUFPLFNBQUEsRUFBRSxDQUFDLENBQUM7SUFDNUQsQ0FBQztJQW5CUSxhQUFhO1FBRHpCLGlCQUFVLEVBQUU7eUNBRWlCLGlCQUFVO09BRDNCLGFBQWEsQ0FxQnpCO0lBQUQsb0JBQUM7Q0FBQSxBQXJCRCxDQUFtQyxpQkFBTyxHQXFCekM7QUFyQlksc0NBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwSGVhZGVycywgSHR0cFJlc3BvbnNlIH0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vbi9odHRwXCI7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tIFwicnhqc1wiO1xuXG5pbXBvcnQgeyBBY3Rpdml0eSB9IGZyb20gXCJ+L3NoYXJlZC9tb2RlbHMvYWN0aXZpdHkubW9kZWxcIjtcbmltcG9ydCB7IE9wdGlvbkNhdGVnb3J5IH0gZnJvbSBcIn4vc2hhcmVkL21vZGVscy9vcHRpb25DYXRlZ29yeS5tb2RlbFwiO1xuaW1wb3J0IHsgU2VydmljZSB9IGZyb20gXCJ+L3NoYXJlZC9zZXJ2aWNlcy9zZXJ2aWNlXCI7XG5pbXBvcnQgeyBDb25maWcgfSBmcm9tIFwiLi4vY29uZmlnXCI7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBPcHRpb25TZXJ2aWNlIGV4dGVuZHMgU2VydmljZSB7XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50KSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgfVxuXG4gICAgZ2V0QWxsQ2F0ZWdvcmllc0FjdGlvbigpOiBPYnNlcnZhYmxlPEFycmF5PE9wdGlvbkNhdGVnb3J5Pj4ge1xuICAgICAgICBjb25zdCBoZWFkZXJzID0gdGhpcy5jcmVhdGVSZXF1ZXN0SGVhZGVyKCk7XG4gICAgICAgIGNvbnN0IHVybCA9IENvbmZpZy5hcGlVcmwgKyBcImFwaS9hY3Rpdml0aWVzL2dyb3Vwc1wiO1xuICAgICAgICBjb25zb2xlLmRpcih1cmwpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0PEFycmF5PE9wdGlvbkNhdGVnb3J5Pj4odXJsLCB7IGhlYWRlcnMgfSk7XG4gICAgfVxuXG4gICAgZ2V0QWxsQWN0aXZpdGllc0J5Q2F0ZWdvcnlBY3Rpb24oY2F0ZWdvcnlJZCk6IE9ic2VydmFibGU8QXJyYXk8QWN0aXZpdHk+PiB7XG4gICAgICAgIGNvbnN0IGhlYWRlcnMgPSB0aGlzLmNyZWF0ZVJlcXVlc3RIZWFkZXIoKTtcbiAgICAgICAgY29uc3QgdXJsID0gQ29uZmlnLmFwaVVybCArIFwiYXBpL2FjdGl2aXRpZXMvXCIgKyBjYXRlZ29yeUlkO1xuICAgICAgICBjb25zb2xlLmRpcih1cmwpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0PEFycmF5PEFjdGl2aXR5Pj4odXJsLCB7IGhlYWRlcnMgfSk7XG4gICAgfVxuXG59XG4iXX0=