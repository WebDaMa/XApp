"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Settings = /** @class */ (function () {
    function Settings() {
    }
    Settings.getDate = function () {
        var appSettings = require("application-settings");
        var now = new Date();
        var date = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate();
        if (appSettings.hasKey("settingsDate")) {
            date = appSettings.getString("settingsDate");
        }
        return date;
    };
    Settings.getLocation = function () {
        var appSettings = require("application-settings");
        var locationId = "1";
        if (appSettings.hasKey("locationId")) {
            locationId = appSettings.getString("locationId");
        }
        return locationId;
    };
    Settings.getCurrentTabViewIndex = function () {
        var appSettings = require("application-settings");
        var tabViewIndex = 0;
        if (appSettings.hasKey("tabViewIndex")) {
            tabViewIndex = appSettings.getNumber("tabViewIndex");
        }
        return tabViewIndex;
    };
    return Settings;
}());
exports.Settings = Settings;
