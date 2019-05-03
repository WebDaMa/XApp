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
