"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("@angular/common/http");
var Service = /** @class */ (function () {
    function Service() {
    }
    Service.prototype.createRequestHeader = function () {
        var appSettings = require("tns-core-modules/application-settings");
        if (appSettings.hasKey("token")) {
            // set headers here e.g.
            return new http_1.HttpHeaders({
                Authorization: "Bearer " + appSettings.getString("token"),
                "Content-Type": "application/json"
            });
        }
    };
    return Service;
}());
exports.Service = Service;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw2Q0FBbUQ7QUFFbkQ7SUFBQTtJQWVBLENBQUM7SUFkYSxxQ0FBbUIsR0FBN0I7UUFDSSxJQUFNLFdBQVcsR0FBRyxPQUFPLENBQUMsdUNBQXVDLENBQUMsQ0FBQztRQUVyRSxJQUFJLFdBQVcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDN0Isd0JBQXdCO1lBQ3hCLE9BQU8sSUFBSSxrQkFBVyxDQUFDO2dCQUNuQixhQUFhLEVBQUUsU0FBUyxHQUFHLFdBQVcsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDO2dCQUN6RCxjQUFjLEVBQUUsa0JBQWtCO2FBQ3JDLENBQUMsQ0FBQztTQUVOO0lBRUwsQ0FBQztJQUVMLGNBQUM7QUFBRCxDQUFDLEFBZkQsSUFlQztBQWZZLDBCQUFPIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSHR0cEhlYWRlcnMgfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uL2h0dHBcIjtcblxuZXhwb3J0IGNsYXNzIFNlcnZpY2Uge1xuICAgIHByb3RlY3RlZCBjcmVhdGVSZXF1ZXN0SGVhZGVyKCkge1xuICAgICAgICBjb25zdCBhcHBTZXR0aW5ncyA9IHJlcXVpcmUoXCJ0bnMtY29yZS1tb2R1bGVzL2FwcGxpY2F0aW9uLXNldHRpbmdzXCIpO1xuXG4gICAgICAgIGlmIChhcHBTZXR0aW5ncy5oYXNLZXkoXCJ0b2tlblwiKSkge1xuICAgICAgICAgICAgLy8gc2V0IGhlYWRlcnMgaGVyZSBlLmcuXG4gICAgICAgICAgICByZXR1cm4gbmV3IEh0dHBIZWFkZXJzKHtcbiAgICAgICAgICAgICAgICBBdXRob3JpemF0aW9uOiBcIkJlYXJlciBcIiArIGFwcFNldHRpbmdzLmdldFN0cmluZyhcInRva2VuXCIpLFxuICAgICAgICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9XG5cbiAgICB9XG5cbn1cbiJdfQ==