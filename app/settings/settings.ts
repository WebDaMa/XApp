export class Settings {

    static getDate() {
        const now = new Date();
        const date: string = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate();

        return this.getStringKey("settingsDate", date);
    }

    static getLocation() {
        return this.getStringKey("locationId");
    }

    static getRole() {
        return this.getStringKey("role", "ROLE_USER");
    }

    static getGuideId() {
        return this.getStringKey("guideId");
    }

    static setGuideId(indexNumber: string) {
        this.setStringKey("guideId", indexNumber);
    }

    static getGuideIndex() {
        return this.getNumberKey("guideIndex", 0);
    }

    static setGuideIndex(indexNumber: number) {
        this.setNumberKey("guideIndex", indexNumber);
    }

    static getGroupId() {
        return this.getStringKey("groupId");
    }

    static setGroupId(indexNumber: string) {
        this.setStringKey("groupId", indexNumber);
    }

    static getGroupIndex() {
        return this.getNumberKey("groupIndex", 0);
    }

    static setGroupIndex(indexNumber: number) {
        this.setNumberKey("groupIndex", indexNumber);
    }

    static getAgencyId() {
        return this.getStringKey("agencyId");
    }

    static setAgencyId(indexNumber: string) {
        this.setStringKey("agencyId", indexNumber);
    }

    static getAgencyIndex() {
        return this.getNumberKey("agencyIndex", 0);
    }

    static setAgencyIndex(indexNumber: number) {
        this.setNumberKey("agencyIndex", indexNumber);
    }

    static getLocationId() {
        return this.getStringKey("locationId");
    }

    static setLocationId(indexNumber: string) {
        this.setStringKey("locationId", indexNumber);
    }

    static getLocationIndex() {
        return this.getNumberKey("locationIndex", 0);
    }

    static setLocationIndex(indexNumber: number) {
        this.setNumberKey("locationIndex", indexNumber);
    }

    static getStringKey(key, defaultValue = "1") {
        const appSettings = require("tns-core-modules/application-settings");
        let value = defaultValue;
        if (appSettings.hasKey(key)) {
            value = appSettings.getString(key);
        }

        return value;
    }

    static setStringKey(key, value = "1") {
        const appSettings = require("tns-core-modules/application-settings");
        appSettings.setString(key, value);
    }

    static getNumberKey(key, defaultValue = 1) {
        const appSettings = require("tns-core-modules/application-settings");
        let value = defaultValue;
        if (appSettings.hasKey(key)) {
            value = appSettings.getNumber(key);
        }

        return value;
    }

    static setNumberKey(key, value = 1) {
        const appSettings = require("tns-core-modules/application-settings");
        appSettings.setNumber(key, value);
    }

}
