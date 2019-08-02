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
    MaterialService.prototype.getTotalForGuideDateAndLocationAction = function (guideId, date, locationId) {
        var headers = this.createRequestHeader();
        var url = config_1.Config.apiUrl + "api/suitsize/total/" + guideId + "/" + date + "/" + locationId;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0ZXJpYWwuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1hdGVyaWFsLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw2Q0FBNkU7QUFDN0Usc0NBQTJDO0FBSTNDLHFEQUFvRDtBQUNwRCxvQ0FBbUM7QUFHbkM7SUFBcUMsbUNBQU87SUFDeEMseUJBQW9CLElBQWdCO1FBQXBDLFlBQ0ksaUJBQU8sU0FDVjtRQUZtQixVQUFJLEdBQUosSUFBSSxDQUFZOztJQUVwQyxDQUFDO0lBRUQsK0RBQXFDLEdBQXJDLFVBQXNDLE9BQU8sRUFBRSxJQUFJLEVBQUUsVUFBVTtRQUMzRCxJQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztRQUMzQyxJQUFNLEdBQUcsR0FBRyxlQUFNLENBQUMsTUFBTSxHQUFHLHFCQUFxQixHQUFHLE9BQU8sR0FBRyxHQUFHLEdBQUcsSUFBSSxHQUFHLEdBQUcsR0FBRyxVQUFVLENBQUM7UUFDNUYsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUVqQixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFXLEdBQUcsRUFBRSxFQUFFLE9BQU8sU0FBQSxFQUFFLENBQUMsQ0FBQztJQUNyRCxDQUFDO0lBWFEsZUFBZTtRQUQzQixpQkFBVSxFQUFFO3lDQUVpQixpQkFBVTtPQUQzQixlQUFlLENBYTNCO0lBQUQsc0JBQUM7Q0FBQSxBQWJELENBQXFDLGlCQUFPLEdBYTNDO0FBYlksMENBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwSGVhZGVycywgSHR0cFJlc3BvbnNlIH0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vbi9odHRwXCI7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tIFwicnhqc1wiO1xuXG5pbXBvcnQgeyBNYXRlcmlhbCB9IGZyb20gXCJ+L3NoYXJlZC9tb2RlbHMvbWF0ZXJpYWwubW9kZWxcIjtcbmltcG9ydCB7IFNlcnZpY2UgfSBmcm9tIFwifi9zaGFyZWQvc2VydmljZXMvc2VydmljZVwiO1xuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSBcIi4uL2NvbmZpZ1wiO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTWF0ZXJpYWxTZXJ2aWNlIGV4dGVuZHMgU2VydmljZSB7XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50KSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgfVxuXG4gICAgZ2V0VG90YWxGb3JHdWlkZURhdGVBbmRMb2NhdGlvbkFjdGlvbihndWlkZUlkLCBkYXRlLCBsb2NhdGlvbklkKTogT2JzZXJ2YWJsZTxNYXRlcmlhbD4ge1xuICAgICAgICBjb25zdCBoZWFkZXJzID0gdGhpcy5jcmVhdGVSZXF1ZXN0SGVhZGVyKCk7XG4gICAgICAgIGNvbnN0IHVybCA9IENvbmZpZy5hcGlVcmwgKyBcImFwaS9zdWl0c2l6ZS90b3RhbC9cIiArIGd1aWRlSWQgKyBcIi9cIiArIGRhdGUgKyBcIi9cIiArIGxvY2F0aW9uSWQ7XG4gICAgICAgIGNvbnNvbGUubG9nKHVybCk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQ8TWF0ZXJpYWw+KHVybCwgeyBoZWFkZXJzIH0pO1xuICAgIH1cblxufVxuIl19