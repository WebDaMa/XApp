export class Settings {

    static getDate() {
        const appSettings = require("application-settings");

        const now = new Date();
        let date: string = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate();
        if (appSettings.hasKey("settingsDate")) {
            date = appSettings.getString("settingsDate");
        }

        return date;
    }

    static getLocation() {
        const appSettings = require("application-settings");
        let locationId: string = "1";
        if (appSettings.hasKey("locationId")) {
            locationId = appSettings.getString("locationId");
        }

        return locationId;
    }

    static getRole() {
        const appSettings = require("application-settings");
        let role: string = "ROLE_USER";
        if (appSettings.hasKey("role")) {
            role = appSettings.getString("role");
        }

        return role;
    }

    static getCurrentTabViewIndex() {
        const appSettings = require("application-settings");
        let tabViewIndex: number = 0;
        if (appSettings.hasKey("tabViewIndex")) {
            tabViewIndex = appSettings.getNumber("tabViewIndex");
        }

        return tabViewIndex;
    }
}
