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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWdlbmN5LnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhZ2VuY3kuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDZDQUE2RTtBQUM3RSxzQ0FBMkM7QUFJM0MscURBQW9EO0FBQ3BELG9DQUFtQztBQUduQztJQUFtQyxpQ0FBTztJQUN0Qyx1QkFBb0IsSUFBZ0I7UUFBcEMsWUFDSSxpQkFBTyxTQUNWO1FBRm1CLFVBQUksR0FBSixJQUFJLENBQVk7O0lBRXBDLENBQUM7SUFFRCw4REFBc0MsR0FBdEMsVUFBdUMsSUFBSSxFQUFFLFVBQVU7UUFDbkQsSUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7UUFDM0MsSUFBTSxHQUFHLEdBQUcsZUFBTSxDQUFDLE1BQU0sR0FBRyxpQ0FBaUMsR0FBRyxJQUFJLEdBQUcsR0FBRyxHQUFHLFVBQVUsQ0FBQztRQUN4RixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRWpCLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBZ0IsR0FBRyxFQUFFLEVBQUUsT0FBTyxTQUFBLEVBQUUsQ0FBQyxDQUFDO0lBQzFELENBQUM7SUFYUSxhQUFhO1FBRHpCLGlCQUFVLEVBQUU7eUNBRWlCLGlCQUFVO09BRDNCLGFBQWEsQ0FhekI7SUFBRCxvQkFBQztDQUFBLEFBYkQsQ0FBbUMsaUJBQU8sR0FhekM7QUFiWSxzQ0FBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBIZWFkZXJzLCBIdHRwUmVzcG9uc2UgfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uL2h0dHBcIjtcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gXCJyeGpzXCI7XG5cbmltcG9ydCB7IEFnZW5jeSB9IGZyb20gXCJ+L3NoYXJlZC9tb2RlbHMvYWdlbmN5Lm1vZGVsXCI7XG5pbXBvcnQgeyBTZXJ2aWNlIH0gZnJvbSBcIn4vc2hhcmVkL3NlcnZpY2VzL3NlcnZpY2VcIjtcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gXCIuLi9jb25maWdcIjtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEFnZW5jeVNlcnZpY2UgZXh0ZW5kcyBTZXJ2aWNlIHtcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICB9XG5cbiAgICBnZXRBbGxBZ2VuY2llc0ZvcldlZWtBbmRMb2NhdGlvbkFjdGlvbihkYXRlLCBsb2NhdGlvbklkKTogT2JzZXJ2YWJsZTxBcnJheTxBZ2VuY3k+PiB7XG4gICAgICAgIGNvbnN0IGhlYWRlcnMgPSB0aGlzLmNyZWF0ZVJlcXVlc3RIZWFkZXIoKTtcbiAgICAgICAgY29uc3QgdXJsID0gQ29uZmlnLmFwaVVybCArIFwiYXBpL2FnZW5jaWVzL3dlZWstYW5kLWxvY2F0aW9uL1wiICsgZGF0ZSArIFwiL1wiICsgbG9jYXRpb25JZDtcbiAgICAgICAgY29uc29sZS5kaXIodXJsKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldDxBcnJheTxBZ2VuY3k+Pih1cmwsIHsgaGVhZGVycyB9KTtcbiAgICB9XG5cbn1cbiJdfQ==