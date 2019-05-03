"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Settings = /** @class */ (function () {
    function Settings() {
    }
    Settings.getDate = function () {
        var appSettings = require("tns-core-modules/application-settings");
        var now = new Date();
        var date = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate();
        if (appSettings.hasKey("settingsDate")) {
            date = appSettings.getString("settingsDate");
        }
        return date;
    };
    Settings.getLocation = function () {
        var appSettings = require("tns-core-modules/application-settings");
        var locationId = "1";
        if (appSettings.hasKey("locationId")) {
            locationId = appSettings.getString("locationId");
        }
        return locationId;
    };
    Settings.getRole = function () {
        var appSettings = require("tns-core-modules/application-settings");
        var role = "ROLE_USER";
        if (appSettings.hasKey("role")) {
            role = appSettings.getString("role");
        }
        return role;
    };
    Settings.getCurrentTabViewIndex = function () {
        var appSettings = require("tns-core-modules/application-settings");
        var tabViewIndex = 0;
        if (appSettings.hasKey("tabViewIndex")) {
            tabViewIndex = appSettings.getNumber("tabViewIndex");
        }
        return tabViewIndex;
    };
    return Settings;
}());
exports.Settings = Settings;
