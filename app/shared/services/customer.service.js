"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var service_1 = require("~/shared/services/service");
var config_1 = require("../config");
var CustomerService = /** @class */ (function (_super) {
    __extends(CustomerService, _super);
    function CustomerService(http) {
        var _this = _super.call(this) || this;
        _this.http = http;
        return _this;
    }
    CustomerService.prototype.getAllByGroepAction = function (groepId) {
        var headers = this.createRequestHeader();
        var url = config_1.Config.apiUrl + "api/customers/groep/" + groepId;
        console.dir(url);
        return this.http.get(url, { headers: headers });
    };
    CustomerService.prototype.getAllByGroepWithRaftingOptionAction = function (groepId) {
        var headers = this.createRequestHeader();
        var url = config_1.Config.apiUrl + "api/customers/groep/rafting/" + groepId;
        console.dir(url);
        return this.http.get(url, { headers: headers });
    };
    /*getAllByGroepWithCanyoningOptionAction(groepId): Observable<Array<RaftingCustomer>> {
        const headers = this.createRequestHeader();
        const url = Config.apiUrl + "api/customers/groep/rafting/" + groepId;
        console.dir(url);

        return this.http.get<Array<RaftingCustomer>>(url, { headers });
    }

    getAllByGroepWithSpecialOptionAction(groepId): Observable<Array<RaftingCustomer>> {
        const headers = this.createRequestHeader();
        const url = Config.apiUrl + "api/customers/groep/rafting/" + groepId;
        console.dir(url);

        return this.http.get<Array<RaftingCustomer>>(url, { headers });
    }*/
    CustomerService.prototype.putCustomerSizeAction = function (groepCustomer) {
        var headers = this.createRequestHeader();
        var url = config_1.Config.apiUrl + "api/customers/suitsize/" + groepCustomer.id;
        console.dir(url);
        return this.http.put(url, groepCustomer, { headers: headers });
    };
    CustomerService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], CustomerService);
    return CustomerService;
}(service_1.Service));
exports.CustomerService = CustomerService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImN1c3RvbWVyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw2Q0FBNkU7QUFDN0Usc0NBQTJDO0FBSTNDLHFEQUFvRDtBQUNwRCxvQ0FBbUM7QUFLbkM7SUFBcUMsbUNBQU87SUFDeEMseUJBQW9CLElBQWdCO1FBQXBDLFlBQ0ksaUJBQU8sU0FDVjtRQUZtQixVQUFJLEdBQUosSUFBSSxDQUFZOztJQUVwQyxDQUFDO0lBRUQsNkNBQW1CLEdBQW5CLFVBQW9CLE9BQU87UUFDdkIsSUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7UUFDM0MsSUFBTSxHQUFHLEdBQUcsZUFBTSxDQUFDLE1BQU0sR0FBRyxzQkFBc0IsR0FBRyxPQUFPLENBQUM7UUFDN0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUVqQixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQXVCLEdBQUcsRUFBRSxFQUFFLE9BQU8sU0FBQSxFQUFFLENBQUMsQ0FBQztJQUNqRSxDQUFDO0lBRUQsOERBQW9DLEdBQXBDLFVBQXFDLE9BQU87UUFDeEMsSUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7UUFDM0MsSUFBTSxHQUFHLEdBQUcsZUFBTSxDQUFDLE1BQU0sR0FBRyw4QkFBOEIsR0FBRyxPQUFPLENBQUM7UUFDckUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUVqQixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQXlCLEdBQUcsRUFBRSxFQUFFLE9BQU8sU0FBQSxFQUFFLENBQUMsQ0FBQztJQUNuRSxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7O09BY0c7SUFFSCwrQ0FBcUIsR0FBckIsVUFBc0IsYUFBNEI7UUFDOUMsSUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7UUFDM0MsSUFBTSxHQUFHLEdBQUcsZUFBTSxDQUFDLE1BQU0sR0FBRyx5QkFBeUIsR0FBRyxhQUFhLENBQUMsRUFBRSxDQUFDO1FBQ3pFLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFakIsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxhQUFhLEVBQUUsRUFBRSxPQUFPLFNBQUEsRUFBRSxDQUFDLENBQUM7SUFDMUQsQ0FBQztJQTNDUSxlQUFlO1FBRDNCLGlCQUFVLEVBQUU7eUNBRWlCLGlCQUFVO09BRDNCLGVBQWUsQ0E2QzNCO0lBQUQsc0JBQUM7Q0FBQSxBQTdDRCxDQUFxQyxpQkFBTyxHQTZDM0M7QUE3Q1ksMENBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwSGVhZGVycywgSHR0cFJlc3BvbnNlIH0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vbi9odHRwXCI7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tIFwicnhqc1wiO1xuXG5pbXBvcnQgeyBHcm9lcCB9IGZyb20gXCJ+L3NoYXJlZC9tb2RlbHMvZ3JvZXAubW9kZWxcIjtcbmltcG9ydCB7IFNlcnZpY2UgfSBmcm9tIFwifi9zaGFyZWQvc2VydmljZXMvc2VydmljZVwiO1xuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSBcIi4uL2NvbmZpZ1wiO1xuaW1wb3J0IHtHcm9lcEN1c3RvbWVyfSBmcm9tIFwifi9zaGFyZWQvbW9kZWxzL2dyb2VwQ3VzdG9tZXIubW9kZWxcIjtcbmltcG9ydCB7UmFmdGluZ0N1c3RvbWVyfSBmcm9tIFwifi9zaGFyZWQvbW9kZWxzL3JhZnRpbmdDdXN0b21lci5tb2RlbFwiO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQ3VzdG9tZXJTZXJ2aWNlIGV4dGVuZHMgU2VydmljZSB7XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50KSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgfVxuXG4gICAgZ2V0QWxsQnlHcm9lcEFjdGlvbihncm9lcElkKTogT2JzZXJ2YWJsZTxBcnJheTxHcm9lcEN1c3RvbWVyPj4ge1xuICAgICAgICBjb25zdCBoZWFkZXJzID0gdGhpcy5jcmVhdGVSZXF1ZXN0SGVhZGVyKCk7XG4gICAgICAgIGNvbnN0IHVybCA9IENvbmZpZy5hcGlVcmwgKyBcImFwaS9jdXN0b21lcnMvZ3JvZXAvXCIgKyBncm9lcElkO1xuICAgICAgICBjb25zb2xlLmRpcih1cmwpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0PEFycmF5PEdyb2VwQ3VzdG9tZXI+Pih1cmwsIHsgaGVhZGVycyB9KTtcbiAgICB9XG5cbiAgICBnZXRBbGxCeUdyb2VwV2l0aFJhZnRpbmdPcHRpb25BY3Rpb24oZ3JvZXBJZCk6IE9ic2VydmFibGU8QXJyYXk8UmFmdGluZ0N1c3RvbWVyPj4ge1xuICAgICAgICBjb25zdCBoZWFkZXJzID0gdGhpcy5jcmVhdGVSZXF1ZXN0SGVhZGVyKCk7XG4gICAgICAgIGNvbnN0IHVybCA9IENvbmZpZy5hcGlVcmwgKyBcImFwaS9jdXN0b21lcnMvZ3JvZXAvcmFmdGluZy9cIiArIGdyb2VwSWQ7XG4gICAgICAgIGNvbnNvbGUuZGlyKHVybCk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQ8QXJyYXk8UmFmdGluZ0N1c3RvbWVyPj4odXJsLCB7IGhlYWRlcnMgfSk7XG4gICAgfVxuXG4gICAgLypnZXRBbGxCeUdyb2VwV2l0aENhbnlvbmluZ09wdGlvbkFjdGlvbihncm9lcElkKTogT2JzZXJ2YWJsZTxBcnJheTxSYWZ0aW5nQ3VzdG9tZXI+PiB7XG4gICAgICAgIGNvbnN0IGhlYWRlcnMgPSB0aGlzLmNyZWF0ZVJlcXVlc3RIZWFkZXIoKTtcbiAgICAgICAgY29uc3QgdXJsID0gQ29uZmlnLmFwaVVybCArIFwiYXBpL2N1c3RvbWVycy9ncm9lcC9yYWZ0aW5nL1wiICsgZ3JvZXBJZDtcbiAgICAgICAgY29uc29sZS5kaXIodXJsKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldDxBcnJheTxSYWZ0aW5nQ3VzdG9tZXI+Pih1cmwsIHsgaGVhZGVycyB9KTtcbiAgICB9XG5cbiAgICBnZXRBbGxCeUdyb2VwV2l0aFNwZWNpYWxPcHRpb25BY3Rpb24oZ3JvZXBJZCk6IE9ic2VydmFibGU8QXJyYXk8UmFmdGluZ0N1c3RvbWVyPj4ge1xuICAgICAgICBjb25zdCBoZWFkZXJzID0gdGhpcy5jcmVhdGVSZXF1ZXN0SGVhZGVyKCk7XG4gICAgICAgIGNvbnN0IHVybCA9IENvbmZpZy5hcGlVcmwgKyBcImFwaS9jdXN0b21lcnMvZ3JvZXAvcmFmdGluZy9cIiArIGdyb2VwSWQ7XG4gICAgICAgIGNvbnNvbGUuZGlyKHVybCk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQ8QXJyYXk8UmFmdGluZ0N1c3RvbWVyPj4odXJsLCB7IGhlYWRlcnMgfSk7XG4gICAgfSovXG5cbiAgICBwdXRDdXN0b21lclNpemVBY3Rpb24oZ3JvZXBDdXN0b21lcjogR3JvZXBDdXN0b21lcik6IE9ic2VydmFibGU8b2JqZWN0PiB7XG4gICAgICAgIGNvbnN0IGhlYWRlcnMgPSB0aGlzLmNyZWF0ZVJlcXVlc3RIZWFkZXIoKTtcbiAgICAgICAgY29uc3QgdXJsID0gQ29uZmlnLmFwaVVybCArIFwiYXBpL2N1c3RvbWVycy9zdWl0c2l6ZS9cIiArIGdyb2VwQ3VzdG9tZXIuaWQ7XG4gICAgICAgIGNvbnNvbGUuZGlyKHVybCk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wdXQodXJsLCBncm9lcEN1c3RvbWVyLCB7IGhlYWRlcnMgfSk7XG4gICAgfVxuXG59XG4iXX0=