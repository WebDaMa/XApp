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
    return Settings;
}());
exports.Settings = Settings;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0dGluZ3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzZXR0aW5ncy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBO0lBQUE7SUF1QkEsQ0FBQztJQXJCVSxnQkFBTyxHQUFkO1FBQ0ksSUFBTSxXQUFXLEdBQUcsT0FBTyxDQUFDLHNCQUFzQixDQUFDLENBQUM7UUFFcEQsSUFBTSxHQUFHLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztRQUN2QixJQUFJLElBQUksR0FBVyxHQUFHLENBQUMsV0FBVyxFQUFFLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDeEYsRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDckMsSUFBSSxHQUFHLFdBQVcsQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDakQsQ0FBQztRQUVELE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVNLG9CQUFXLEdBQWxCO1FBQ0ksSUFBTSxXQUFXLEdBQUcsT0FBTyxDQUFDLHNCQUFzQixDQUFDLENBQUM7UUFDcEQsSUFBSSxVQUFVLEdBQVcsR0FBRyxDQUFDO1FBQzdCLEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ25DLFVBQVUsR0FBRyxXQUFXLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ3JELENBQUM7UUFFRCxNQUFNLENBQUMsVUFBVSxDQUFDO0lBQ3RCLENBQUM7SUFDTCxlQUFDO0FBQUQsQ0FBQyxBQXZCRCxJQXVCQztBQXZCWSw0QkFBUSIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBTZXR0aW5ncyB7XG5cbiAgICBzdGF0aWMgZ2V0RGF0ZSgpIHtcbiAgICAgICAgY29uc3QgYXBwU2V0dGluZ3MgPSByZXF1aXJlKFwiYXBwbGljYXRpb24tc2V0dGluZ3NcIik7XG5cbiAgICAgICAgY29uc3Qgbm93ID0gbmV3IERhdGUoKTtcbiAgICAgICAgbGV0IGRhdGU6IHN0cmluZyA9IG5vdy5nZXRGdWxsWWVhcigpICsgXCItXCIgKyAobm93LmdldE1vbnRoKCkgKyAxKSArIFwiLVwiICsgbm93LmdldERhdGUoKTtcbiAgICAgICAgaWYgKGFwcFNldHRpbmdzLmhhc0tleShcInNldHRpbmdzRGF0ZVwiKSkge1xuICAgICAgICAgICAgZGF0ZSA9IGFwcFNldHRpbmdzLmdldFN0cmluZyhcInNldHRpbmdzRGF0ZVwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBkYXRlO1xuICAgIH1cblxuICAgIHN0YXRpYyBnZXRMb2NhdGlvbigpIHtcbiAgICAgICAgY29uc3QgYXBwU2V0dGluZ3MgPSByZXF1aXJlKFwiYXBwbGljYXRpb24tc2V0dGluZ3NcIik7XG4gICAgICAgIGxldCBsb2NhdGlvbklkOiBzdHJpbmcgPSBcIjFcIjtcbiAgICAgICAgaWYgKGFwcFNldHRpbmdzLmhhc0tleShcImxvY2F0aW9uSWRcIikpIHtcbiAgICAgICAgICAgIGxvY2F0aW9uSWQgPSBhcHBTZXR0aW5ncy5nZXRTdHJpbmcoXCJsb2NhdGlvbklkXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGxvY2F0aW9uSWQ7XG4gICAgfVxufVxuIl19