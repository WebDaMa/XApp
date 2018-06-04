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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYXRpb24uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImxvY2F0aW9uLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw2Q0FBNkU7QUFDN0Usc0NBQTJDO0FBSTNDLHFEQUFvRDtBQUNwRCxvQ0FBbUM7QUFHbkM7SUFBcUMsbUNBQU87SUFDeEMseUJBQW9CLElBQWdCO1FBQXBDLFlBQ0ksaUJBQU8sU0FDVjtRQUZtQixVQUFJLEdBQUosSUFBSSxDQUFZOztJQUVwQyxDQUFDO0lBRUQsNENBQWtCLEdBQWxCO1FBQ0ksSUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7UUFDM0MsSUFBTSxHQUFHLEdBQUcsZUFBTSxDQUFDLE1BQU0sR0FBRyxlQUFlLENBQUM7UUFFNUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFrQixHQUFHLEVBQUUsRUFBRSxPQUFPLFNBQUEsRUFBRSxDQUFDLENBQUM7SUFFNUQsQ0FBQztJQVhRLGVBQWU7UUFEM0IsaUJBQVUsRUFBRTt5Q0FFaUIsaUJBQVU7T0FEM0IsZUFBZSxDQWEzQjtJQUFELHNCQUFDO0NBQUEsQUFiRCxDQUFxQyxpQkFBTyxHQWEzQztBQWJZLDBDQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cEhlYWRlcnMsIEh0dHBSZXNwb25zZSB9IGZyb20gXCJAYW5ndWxhci9jb21tb24vaHR0cFwiO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSBcInJ4anNcIjtcblxuaW1wb3J0IHsgTG9jYXRpb24gfSBmcm9tIFwifi9zaGFyZWQvbW9kZWxzL2xvY2F0aW9uLm1vZGVsXCI7XG5pbXBvcnQgeyBTZXJ2aWNlIH0gZnJvbSBcIn4vc2hhcmVkL3NlcnZpY2VzL3NlcnZpY2VcIjtcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gXCIuLi9jb25maWdcIjtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIExvY2F0aW9uU2VydmljZSBleHRlbmRzIFNlcnZpY2Uge1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cENsaWVudCkge1xuICAgICAgICBzdXBlcigpO1xuICAgIH1cblxuICAgIGdldExvY2F0aW9uc0FjdGlvbigpOiBPYnNlcnZhYmxlPEFycmF5PExvY2F0aW9uPj4ge1xuICAgICAgICBjb25zdCBoZWFkZXJzID0gdGhpcy5jcmVhdGVSZXF1ZXN0SGVhZGVyKCk7XG4gICAgICAgIGNvbnN0IHVybCA9IENvbmZpZy5hcGlVcmwgKyBcImFwaS9sb2NhdGlvbnNcIjtcblxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldDxBcnJheTxMb2NhdGlvbj4+KHVybCwgeyBoZWFkZXJzIH0pO1xuXG4gICAgfVxuXG59XG4iXX0=