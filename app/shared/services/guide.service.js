"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var service_1 = require("~/shared/services/service");
var config_1 = require("../config");
var GuideService = /** @class */ (function (_super) {
    __extends(GuideService, _super);
    function GuideService(http) {
        var _this = _super.call(this) || this;
        _this.http = http;
        return _this;
    }
    GuideService.prototype.getAllGuidesForWeekAndLocationAction = function (date, locationId) {
        var headers = this.createRequestHeader();
        var url = config_1.Config.apiUrl + "api/guides-for-week-and-location/" + date + "/" + locationId;
        console.dir(url);
        return this.http.get(url, { headers: headers });
    };
    GuideService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], GuideService);
    return GuideService;
}(service_1.Service));
exports.GuideService = GuideService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3VpZGUuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImd1aWRlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw2Q0FBNkU7QUFDN0Usc0NBQTJDO0FBSzNDLHFEQUFvRDtBQUNwRCxvQ0FBbUM7QUFHbkM7SUFBa0MsZ0NBQU87SUFDckMsc0JBQW9CLElBQWdCO1FBQXBDLFlBQ0ksaUJBQU8sU0FDVjtRQUZtQixVQUFJLEdBQUosSUFBSSxDQUFZOztJQUVwQyxDQUFDO0lBRUQsMkRBQW9DLEdBQXBDLFVBQXFDLElBQUksRUFBRSxVQUFVO1FBQ2pELElBQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1FBQzNDLElBQU0sR0FBRyxHQUFHLGVBQU0sQ0FBQyxNQUFNLEdBQUcsbUNBQW1DLEdBQUcsSUFBSSxHQUFHLEdBQUcsR0FBRyxVQUFVLENBQUM7UUFDMUYsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUVqQixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQWUsR0FBRyxFQUFFLEVBQUUsT0FBTyxTQUFBLEVBQUUsQ0FBQyxDQUFDO0lBQ3pELENBQUM7SUFYUSxZQUFZO1FBRHhCLGlCQUFVLEVBQUU7eUNBRWlCLGlCQUFVO09BRDNCLFlBQVksQ0FheEI7SUFBRCxtQkFBQztDQUFBLEFBYkQsQ0FBa0MsaUJBQU8sR0FheEM7QUFiWSxvQ0FBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBIZWFkZXJzLCBIdHRwUmVzcG9uc2UgfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uL2h0dHBcIjtcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gXCJyeGpzXCI7XG5cbmltcG9ydCB7IG1hcCB9IGZyb20gXCJyeGpzL2ludGVybmFsL29wZXJhdG9yc1wiO1xuaW1wb3J0IHsgR3VpZGUgfSBmcm9tIFwifi9zaGFyZWQvbW9kZWxzL2d1aWRlLm1vZGVsXCI7XG5pbXBvcnQgeyBTZXJ2aWNlIH0gZnJvbSBcIn4vc2hhcmVkL3NlcnZpY2VzL3NlcnZpY2VcIjtcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gXCIuLi9jb25maWdcIjtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEd1aWRlU2VydmljZSBleHRlbmRzIFNlcnZpY2Uge1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cENsaWVudCkge1xuICAgICAgICBzdXBlcigpO1xuICAgIH1cblxuICAgIGdldEFsbEd1aWRlc0ZvcldlZWtBbmRMb2NhdGlvbkFjdGlvbihkYXRlLCBsb2NhdGlvbklkKTogT2JzZXJ2YWJsZTxBcnJheTxHdWlkZT4+IHtcbiAgICAgICAgY29uc3QgaGVhZGVycyA9IHRoaXMuY3JlYXRlUmVxdWVzdEhlYWRlcigpO1xuICAgICAgICBjb25zdCB1cmwgPSBDb25maWcuYXBpVXJsICsgXCJhcGkvZ3VpZGVzLWZvci13ZWVrLWFuZC1sb2NhdGlvbi9cIiArIGRhdGUgKyBcIi9cIiArIGxvY2F0aW9uSWQ7XG4gICAgICAgIGNvbnNvbGUuZGlyKHVybCk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQ8QXJyYXk8R3VpZGU+Pih1cmwsIHsgaGVhZGVycyB9KTtcbiAgICB9XG5cbn1cbiJdfQ==