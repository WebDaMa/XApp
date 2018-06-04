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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0ZXJpYWwuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1hdGVyaWFsLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw2Q0FBNkU7QUFDN0Usc0NBQTJDO0FBSTNDLHFEQUFvRDtBQUNwRCxvQ0FBbUM7QUFHbkM7SUFBcUMsbUNBQU87SUFDeEMseUJBQW9CLElBQWdCO1FBQXBDLFlBQ0ksaUJBQU8sU0FDVjtRQUZtQixVQUFJLEdBQUosSUFBSSxDQUFZOztJQUVwQyxDQUFDO0lBRUQsdURBQTZCLEdBQTdCLFVBQThCLE9BQU8sRUFBRSxJQUFJO1FBQ3ZDLElBQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1FBQzNDLElBQU0sR0FBRyxHQUFHLGVBQU0sQ0FBQyxNQUFNLEdBQUcscUJBQXFCLEdBQUcsT0FBTyxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUM7UUFDekUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUVqQixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQVcsR0FBRyxFQUFFLEVBQUUsT0FBTyxTQUFBLEVBQUUsQ0FBQyxDQUFDO0lBQ3JELENBQUM7SUFYUSxlQUFlO1FBRDNCLGlCQUFVLEVBQUU7eUNBRWlCLGlCQUFVO09BRDNCLGVBQWUsQ0FhM0I7SUFBRCxzQkFBQztDQUFBLEFBYkQsQ0FBcUMsaUJBQU8sR0FhM0M7QUFiWSwwQ0FBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBIZWFkZXJzLCBIdHRwUmVzcG9uc2UgfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uL2h0dHBcIjtcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gXCJyeGpzXCI7XG5cbmltcG9ydCB7IE1hdGVyaWFsIH0gZnJvbSBcIn4vc2hhcmVkL21vZGVscy9tYXRlcmlhbC5tb2RlbFwiO1xuaW1wb3J0IHsgU2VydmljZSB9IGZyb20gXCJ+L3NoYXJlZC9zZXJ2aWNlcy9zZXJ2aWNlXCI7XG5pbXBvcnQgeyBDb25maWcgfSBmcm9tIFwiLi4vY29uZmlnXCI7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBNYXRlcmlhbFNlcnZpY2UgZXh0ZW5kcyBTZXJ2aWNlIHtcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICB9XG5cbiAgICBnZXRUb3RhbEZvckd1aWRlQW5kRGF0ZUFjdGlvbihndWlkZUlkLCBkYXRlKTogT2JzZXJ2YWJsZTxNYXRlcmlhbD4ge1xuICAgICAgICBjb25zdCBoZWFkZXJzID0gdGhpcy5jcmVhdGVSZXF1ZXN0SGVhZGVyKCk7XG4gICAgICAgIGNvbnN0IHVybCA9IENvbmZpZy5hcGlVcmwgKyBcImFwaS9zdWl0c2l6ZS90b3RhbC9cIiArIGd1aWRlSWQgKyBcIi9cIiArIGRhdGU7XG4gICAgICAgIGNvbnNvbGUubG9nKHVybCk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQ8TWF0ZXJpYWw+KHVybCwgeyBoZWFkZXJzIH0pO1xuICAgIH1cblxufVxuIl19