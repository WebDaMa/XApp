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
    MaterialService.prototype.getTotalForGuideAndDateAction = function (guideId, date) {
        var headers = this.createRequestHeader();
        var url = config_1.Config.apiUrl + "api/suitsize/total/" + guideId + "/" + date;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0ZXJpYWwuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1hdGVyaWFsLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw2Q0FBNkU7QUFDN0Usc0NBQTJDO0FBRzNDLHFEQUFvRDtBQUNwRCxvQ0FBbUM7QUFJbkM7SUFBcUMsbUNBQU87SUFDeEMseUJBQW9CLElBQWdCO1FBQXBDLFlBQ0ksaUJBQU8sU0FDVjtRQUZtQixVQUFJLEdBQUosSUFBSSxDQUFZOztJQUVwQyxDQUFDO0lBRUQsdURBQTZCLEdBQTdCLFVBQThCLE9BQU8sRUFBRSxJQUFJO1FBQ3ZDLElBQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1FBQzNDLElBQU0sR0FBRyxHQUFHLGVBQU0sQ0FBQyxNQUFNLEdBQUcscUJBQXFCLEdBQUcsT0FBTyxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUM7UUFDekUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUVqQixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQVcsR0FBRyxFQUFFLEVBQUUsT0FBTyxTQUFBLEVBQUUsQ0FBQyxDQUFDO0lBQ3JELENBQUM7SUFYUSxlQUFlO1FBRDNCLGlCQUFVLEVBQUU7eUNBRWlCLGlCQUFVO09BRDNCLGVBQWUsQ0FhM0I7SUFBRCxzQkFBQztDQUFBLEFBYkQsQ0FBcUMsaUJBQU8sR0FhM0M7QUFiWSwwQ0FBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBIZWFkZXJzLCBIdHRwUmVzcG9uc2UgfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uL2h0dHBcIjtcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gXCJyeGpzXCI7XG5cbmltcG9ydCB7IFNlcnZpY2UgfSBmcm9tIFwifi9zaGFyZWQvc2VydmljZXMvc2VydmljZVwiO1xuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSBcIi4uL2NvbmZpZ1wiO1xuaW1wb3J0IHtNYXRlcmlhbH0gZnJvbSBcIn4vc2hhcmVkL21vZGVscy9tYXRlcmlhbC5tb2RlbFwiO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTWF0ZXJpYWxTZXJ2aWNlIGV4dGVuZHMgU2VydmljZSB7XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50KSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgfVxuXG4gICAgZ2V0VG90YWxGb3JHdWlkZUFuZERhdGVBY3Rpb24oZ3VpZGVJZCwgZGF0ZSk6IE9ic2VydmFibGU8TWF0ZXJpYWw+IHtcbiAgICAgICAgY29uc3QgaGVhZGVycyA9IHRoaXMuY3JlYXRlUmVxdWVzdEhlYWRlcigpO1xuICAgICAgICBjb25zdCB1cmwgPSBDb25maWcuYXBpVXJsICsgXCJhcGkvc3VpdHNpemUvdG90YWwvXCIgKyBndWlkZUlkICsgXCIvXCIgKyBkYXRlO1xuICAgICAgICBjb25zb2xlLmxvZyh1cmwpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0PE1hdGVyaWFsPih1cmwsIHsgaGVhZGVycyB9KTtcbiAgICB9XG5cbn1cbiJdfQ==