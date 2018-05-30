"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var service_1 = require("~/shared/services/service");
var config_1 = require("../config");
var LocationService = /** @class */ (function (_super) {
    __extends(LocationService, _super);
    function LocationService(http) {
        var _this = _super.call(this) || this;
        _this.http = http;
        return _this;
    }
    LocationService.prototype.getLocationsAction = function () {
        var headers = this.createRequestHeader();
        var url = config_1.Config.apiUrl + "api/locations";
        return this.http.get(url, { headers: headers });
    };
    LocationService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], LocationService);
    return LocationService;
}(service_1.Service));
exports.LocationService = LocationService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYXRpb24uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImxvY2F0aW9uLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw2Q0FBNkU7QUFDN0Usc0NBQTJDO0FBTTNDLHFEQUFvRDtBQUNwRCxvQ0FBbUM7QUFHbkM7SUFBcUMsbUNBQU87SUFDeEMseUJBQW9CLElBQWdCO1FBQXBDLFlBQ0ksaUJBQU8sU0FDVjtRQUZtQixVQUFJLEdBQUosSUFBSSxDQUFZOztJQUVwQyxDQUFDO0lBRUQsNENBQWtCLEdBQWxCO1FBQ0ksSUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7UUFDM0MsSUFBTSxHQUFHLEdBQUcsZUFBTSxDQUFDLE1BQU0sR0FBRyxlQUFlLENBQUM7UUFFNUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFrQixHQUFHLEVBQUUsRUFBRSxPQUFPLFNBQUEsRUFBRSxDQUFDLENBQUM7SUFFNUQsQ0FBQztJQVhRLGVBQWU7UUFEM0IsaUJBQVUsRUFBRTt5Q0FFaUIsaUJBQVU7T0FEM0IsZUFBZSxDQWEzQjtJQUFELHNCQUFDO0NBQUEsQUFiRCxDQUFxQyxpQkFBTyxHQWEzQztBQWJZLDBDQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cEhlYWRlcnMsIEh0dHBSZXNwb25zZSB9IGZyb20gXCJAYW5ndWxhci9jb21tb24vaHR0cFwiO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSBcInJ4anNcIjtcblxuaW1wb3J0IHsgZm9yRWFjaCB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXIvc3JjL3V0aWxzL2NvbGxlY3Rpb25cIjtcbmltcG9ydCB7IGV2ZXJ5LCBtYXAgfSBmcm9tIFwicnhqcy9pbnRlcm5hbC9vcGVyYXRvcnNcIjtcbmltcG9ydCB7IExvY2F0aW9uIH0gZnJvbSBcIn4vc2hhcmVkL21vZGVscy9sb2NhdGlvbi5tb2RlbFwiO1xuaW1wb3J0IHsgU2VydmljZSB9IGZyb20gXCJ+L3NoYXJlZC9zZXJ2aWNlcy9zZXJ2aWNlXCI7XG5pbXBvcnQgeyBDb25maWcgfSBmcm9tIFwiLi4vY29uZmlnXCI7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBMb2NhdGlvblNlcnZpY2UgZXh0ZW5kcyBTZXJ2aWNlIHtcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICB9XG5cbiAgICBnZXRMb2NhdGlvbnNBY3Rpb24oKTogT2JzZXJ2YWJsZTxBcnJheTxMb2NhdGlvbj4+IHtcbiAgICAgICAgY29uc3QgaGVhZGVycyA9IHRoaXMuY3JlYXRlUmVxdWVzdEhlYWRlcigpO1xuICAgICAgICBjb25zdCB1cmwgPSBDb25maWcuYXBpVXJsICsgXCJhcGkvbG9jYXRpb25zXCI7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQ8QXJyYXk8TG9jYXRpb24+Pih1cmwsIHsgaGVhZGVycyB9KTtcblxuICAgIH1cblxufVxuIl19