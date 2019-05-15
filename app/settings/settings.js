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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0dGluZ3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzZXR0aW5ncy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBO0lBQUE7SUEyQ0EsQ0FBQztJQXpDVSxnQkFBTyxHQUFkO1FBQ0ksSUFBTSxXQUFXLEdBQUcsT0FBTyxDQUFDLHVDQUF1QyxDQUFDLENBQUM7UUFFckUsSUFBTSxHQUFHLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztRQUN2QixJQUFJLElBQUksR0FBVyxHQUFHLENBQUMsV0FBVyxFQUFFLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDeEYsSUFBSSxXQUFXLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxFQUFFO1lBQ3BDLElBQUksR0FBRyxXQUFXLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1NBQ2hEO1FBRUQsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVNLG9CQUFXLEdBQWxCO1FBQ0ksSUFBTSxXQUFXLEdBQUcsT0FBTyxDQUFDLHVDQUF1QyxDQUFDLENBQUM7UUFDckUsSUFBSSxVQUFVLEdBQVcsR0FBRyxDQUFDO1FBQzdCLElBQUksV0FBVyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsRUFBRTtZQUNsQyxVQUFVLEdBQUcsV0FBVyxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsQ0FBQztTQUNwRDtRQUVELE9BQU8sVUFBVSxDQUFDO0lBQ3RCLENBQUM7SUFFTSxnQkFBTyxHQUFkO1FBQ0ksSUFBTSxXQUFXLEdBQUcsT0FBTyxDQUFDLHVDQUF1QyxDQUFDLENBQUM7UUFDckUsSUFBSSxJQUFJLEdBQVcsV0FBVyxDQUFDO1FBQy9CLElBQUksV0FBVyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUM1QixJQUFJLEdBQUcsV0FBVyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUN4QztRQUVELE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFTSwrQkFBc0IsR0FBN0I7UUFDSSxJQUFNLFdBQVcsR0FBRyxPQUFPLENBQUMsdUNBQXVDLENBQUMsQ0FBQztRQUNyRSxJQUFJLFlBQVksR0FBVyxDQUFDLENBQUM7UUFDN0IsSUFBSSxXQUFXLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxFQUFFO1lBQ3BDLFlBQVksR0FBRyxXQUFXLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1NBQ3hEO1FBRUQsT0FBTyxZQUFZLENBQUM7SUFDeEIsQ0FBQztJQUNMLGVBQUM7QUFBRCxDQUFDLEFBM0NELElBMkNDO0FBM0NZLDRCQUFRIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIFNldHRpbmdzIHtcblxuICAgIHN0YXRpYyBnZXREYXRlKCkge1xuICAgICAgICBjb25zdCBhcHBTZXR0aW5ncyA9IHJlcXVpcmUoXCJ0bnMtY29yZS1tb2R1bGVzL2FwcGxpY2F0aW9uLXNldHRpbmdzXCIpO1xuXG4gICAgICAgIGNvbnN0IG5vdyA9IG5ldyBEYXRlKCk7XG4gICAgICAgIGxldCBkYXRlOiBzdHJpbmcgPSBub3cuZ2V0RnVsbFllYXIoKSArIFwiLVwiICsgKG5vdy5nZXRNb250aCgpICsgMSkgKyBcIi1cIiArIG5vdy5nZXREYXRlKCk7XG4gICAgICAgIGlmIChhcHBTZXR0aW5ncy5oYXNLZXkoXCJzZXR0aW5nc0RhdGVcIikpIHtcbiAgICAgICAgICAgIGRhdGUgPSBhcHBTZXR0aW5ncy5nZXRTdHJpbmcoXCJzZXR0aW5nc0RhdGVcIik7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZGF0ZTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0TG9jYXRpb24oKSB7XG4gICAgICAgIGNvbnN0IGFwcFNldHRpbmdzID0gcmVxdWlyZShcInRucy1jb3JlLW1vZHVsZXMvYXBwbGljYXRpb24tc2V0dGluZ3NcIik7XG4gICAgICAgIGxldCBsb2NhdGlvbklkOiBzdHJpbmcgPSBcIjFcIjtcbiAgICAgICAgaWYgKGFwcFNldHRpbmdzLmhhc0tleShcImxvY2F0aW9uSWRcIikpIHtcbiAgICAgICAgICAgIGxvY2F0aW9uSWQgPSBhcHBTZXR0aW5ncy5nZXRTdHJpbmcoXCJsb2NhdGlvbklkXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGxvY2F0aW9uSWQ7XG4gICAgfVxuXG4gICAgc3RhdGljIGdldFJvbGUoKSB7XG4gICAgICAgIGNvbnN0IGFwcFNldHRpbmdzID0gcmVxdWlyZShcInRucy1jb3JlLW1vZHVsZXMvYXBwbGljYXRpb24tc2V0dGluZ3NcIik7XG4gICAgICAgIGxldCByb2xlOiBzdHJpbmcgPSBcIlJPTEVfVVNFUlwiO1xuICAgICAgICBpZiAoYXBwU2V0dGluZ3MuaGFzS2V5KFwicm9sZVwiKSkge1xuICAgICAgICAgICAgcm9sZSA9IGFwcFNldHRpbmdzLmdldFN0cmluZyhcInJvbGVcIik7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcm9sZTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0Q3VycmVudFRhYlZpZXdJbmRleCgpIHtcbiAgICAgICAgY29uc3QgYXBwU2V0dGluZ3MgPSByZXF1aXJlKFwidG5zLWNvcmUtbW9kdWxlcy9hcHBsaWNhdGlvbi1zZXR0aW5nc1wiKTtcbiAgICAgICAgbGV0IHRhYlZpZXdJbmRleDogbnVtYmVyID0gMDtcbiAgICAgICAgaWYgKGFwcFNldHRpbmdzLmhhc0tleShcInRhYlZpZXdJbmRleFwiKSkge1xuICAgICAgICAgICAgdGFiVmlld0luZGV4ID0gYXBwU2V0dGluZ3MuZ2V0TnVtYmVyKFwidGFiVmlld0luZGV4XCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRhYlZpZXdJbmRleDtcbiAgICB9XG59XG4iXX0=