"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var service_1 = require("~/shared/services/service");
var config_1 = require("../config");
var SuitSizeService = /** @class */ (function (_super) {
    __extends(SuitSizeService, _super);
    function SuitSizeService(http) {
        var _this = _super.call(this) || this;
        _this.http = http;
        return _this;
    }
    SuitSizeService.prototype.getAllAction = function () {
        var headers = this.createRequestHeader();
        var url = config_1.Config.apiUrl + "api/suitsizes";
        return this.http.get(url, { headers: headers });
    };
    SuitSizeService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], SuitSizeService);
    return SuitSizeService;
}(service_1.Service));
exports.SuitSizeService = SuitSizeService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VpdFNpemUuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInN1aXRTaXplLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw2Q0FBNkU7QUFDN0Usc0NBQTJDO0FBSTNDLHFEQUFvRDtBQUNwRCxvQ0FBbUM7QUFHbkM7SUFBcUMsbUNBQU87SUFDeEMseUJBQW9CLElBQWdCO1FBQXBDLFlBQ0ksaUJBQU8sU0FDVjtRQUZtQixVQUFJLEdBQUosSUFBSSxDQUFZOztJQUVwQyxDQUFDO0lBRUQsc0NBQVksR0FBWjtRQUNJLElBQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1FBQzNDLElBQU0sR0FBRyxHQUFHLGVBQU0sQ0FBQyxNQUFNLEdBQUcsZUFBZSxDQUFDO1FBRTVDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQWtCLEdBQUcsRUFBRSxFQUFFLE9BQU8sU0FBQSxFQUFFLENBQUMsQ0FBQztJQUU1RCxDQUFDO0lBWFEsZUFBZTtRQUQzQixpQkFBVSxFQUFFO3lDQUVpQixpQkFBVTtPQUQzQixlQUFlLENBYTNCO0lBQUQsc0JBQUM7Q0FBQSxBQWJELENBQXFDLGlCQUFPLEdBYTNDO0FBYlksMENBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwSGVhZGVycywgSHR0cFJlc3BvbnNlIH0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vbi9odHRwXCI7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tIFwicnhqc1wiO1xuXG5pbXBvcnQgeyBTdWl0U2l6ZSB9IGZyb20gXCJ+L3NoYXJlZC9tb2RlbHMvc3VpdFNpemUubW9kZWxcIjtcbmltcG9ydCB7IFNlcnZpY2UgfSBmcm9tIFwifi9zaGFyZWQvc2VydmljZXMvc2VydmljZVwiO1xuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSBcIi4uL2NvbmZpZ1wiO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU3VpdFNpemVTZXJ2aWNlIGV4dGVuZHMgU2VydmljZSB7XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50KSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgfVxuXG4gICAgZ2V0QWxsQWN0aW9uKCk6IE9ic2VydmFibGU8QXJyYXk8U3VpdFNpemU+PiB7XG4gICAgICAgIGNvbnN0IGhlYWRlcnMgPSB0aGlzLmNyZWF0ZVJlcXVlc3RIZWFkZXIoKTtcbiAgICAgICAgY29uc3QgdXJsID0gQ29uZmlnLmFwaVVybCArIFwiYXBpL3N1aXRzaXplc1wiO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0PEFycmF5PFN1aXRTaXplPj4odXJsLCB7IGhlYWRlcnMgfSk7XG5cbiAgICB9XG5cbn1cbiJdfQ==