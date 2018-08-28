"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var service_1 = require("~/shared/services/service");
var config_1 = require("../config");
var PlanningService = /** @class */ (function (_super) {
    __extends(PlanningService, _super);
    function PlanningService(http) {
        var _this = _super.call(this) || this;
        _this.http = http;
        return _this;
    }
    PlanningService.prototype.getAllByDayAndLocationAction = function (date, locationId) {
        var headers = this.createRequestHeader();
        var url = config_1.Config.apiUrl + "api/planning/" + date + "/" + locationId;
        return this.http.get(url, { headers: headers });
    };
    PlanningService.prototype.putPlanningUpdateAction = function (planning) {
        var headers = this.createRequestHeader();
        var url = config_1.Config.apiUrl + "api/planning/" + planning.id;
        console.dir(url);
        return this.http.put(url, planning, { headers: headers });
    };
    PlanningService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], PlanningService);
    return PlanningService;
}(service_1.Service));
exports.PlanningService = PlanningService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxhbm5pbmcuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInBsYW5uaW5nLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw2Q0FBNkU7QUFDN0Usc0NBQTJDO0FBSTNDLHFEQUFvRDtBQUNwRCxvQ0FBbUM7QUFHbkM7SUFBcUMsbUNBQU87SUFDeEMseUJBQW9CLElBQWdCO1FBQXBDLFlBQ0ksaUJBQU8sU0FDVjtRQUZtQixVQUFJLEdBQUosSUFBSSxDQUFZOztJQUVwQyxDQUFDO0lBRUQsc0RBQTRCLEdBQTVCLFVBQTZCLElBQUksRUFBRSxVQUFVO1FBQ3pDLElBQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1FBQzNDLElBQU0sR0FBRyxHQUFHLGVBQU0sQ0FBQyxNQUFNLEdBQUcsZUFBZSxHQUFHLElBQUksR0FBRyxHQUFHLEdBQUcsVUFBVSxDQUFDO1FBRXRFLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBa0IsR0FBRyxFQUFFLEVBQUUsT0FBTyxTQUFBLEVBQUUsQ0FBQyxDQUFDO0lBRTVELENBQUM7SUFFRCxpREFBdUIsR0FBdkIsVUFBd0IsUUFBa0I7UUFDdEMsSUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7UUFDM0MsSUFBTSxHQUFHLEdBQUcsZUFBTSxDQUFDLE1BQU0sR0FBRyxlQUFlLEdBQUcsUUFBUSxDQUFDLEVBQUUsQ0FBQztRQUMxRCxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRWpCLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsUUFBUSxFQUFFLEVBQUUsT0FBTyxTQUFBLEVBQUUsQ0FBQyxDQUFDO0lBQ3JELENBQUM7SUFuQlEsZUFBZTtRQUQzQixpQkFBVSxFQUFFO3lDQUVpQixpQkFBVTtPQUQzQixlQUFlLENBcUIzQjtJQUFELHNCQUFDO0NBQUEsQUFyQkQsQ0FBcUMsaUJBQU8sR0FxQjNDO0FBckJZLDBDQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cEhlYWRlcnMsIEh0dHBSZXNwb25zZSB9IGZyb20gXCJAYW5ndWxhci9jb21tb24vaHR0cFwiO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSBcInJ4anNcIjtcblxuaW1wb3J0IHsgUGxhbm5pbmcgfSBmcm9tIFwifi9zaGFyZWQvbW9kZWxzL3BsYW5uaW5nLm1vZGVsXCI7XG5pbXBvcnQgeyBTZXJ2aWNlIH0gZnJvbSBcIn4vc2hhcmVkL3NlcnZpY2VzL3NlcnZpY2VcIjtcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gXCIuLi9jb25maWdcIjtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFBsYW5uaW5nU2VydmljZSBleHRlbmRzIFNlcnZpY2Uge1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cENsaWVudCkge1xuICAgICAgICBzdXBlcigpO1xuICAgIH1cblxuICAgIGdldEFsbEJ5RGF5QW5kTG9jYXRpb25BY3Rpb24oZGF0ZSwgbG9jYXRpb25JZCk6IE9ic2VydmFibGU8QXJyYXk8UGxhbm5pbmc+PiB7XG4gICAgICAgIGNvbnN0IGhlYWRlcnMgPSB0aGlzLmNyZWF0ZVJlcXVlc3RIZWFkZXIoKTtcbiAgICAgICAgY29uc3QgdXJsID0gQ29uZmlnLmFwaVVybCArIFwiYXBpL3BsYW5uaW5nL1wiICsgZGF0ZSArIFwiL1wiICsgbG9jYXRpb25JZDtcblxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldDxBcnJheTxQbGFubmluZz4+KHVybCwgeyBoZWFkZXJzIH0pO1xuXG4gICAgfVxuXG4gICAgcHV0UGxhbm5pbmdVcGRhdGVBY3Rpb24ocGxhbm5pbmc6IFBsYW5uaW5nKTogT2JzZXJ2YWJsZTxvYmplY3Q+IHtcbiAgICAgICAgY29uc3QgaGVhZGVycyA9IHRoaXMuY3JlYXRlUmVxdWVzdEhlYWRlcigpO1xuICAgICAgICBjb25zdCB1cmwgPSBDb25maWcuYXBpVXJsICsgXCJhcGkvcGxhbm5pbmcvXCIgKyBwbGFubmluZy5pZDtcbiAgICAgICAgY29uc29sZS5kaXIodXJsKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnB1dCh1cmwsIHBsYW5uaW5nLCB7IGhlYWRlcnMgfSk7XG4gICAgfVxuXG59XG4iXX0=