"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var nativescript_angular_1 = require("nativescript-angular");
var page_1 = require("tns-core-modules/ui/page");
var user_service_1 = require("~/shared/services/user.service");
var user_model_1 = require("~/shared/models/user.model");
/* ***********************************************************
* Before you can navigate to this page from your app, you need to reference this page's module in the
* global app router module. Add the following object to the global array of routes:
* { path: "login", loadChildren: "./login/login.module#LoginModule" }
* Note that this simply points the path to the page module file. If you move the page, you need to update the route too.
*************************************************************/
var LoginComponent = /** @class */ (function () {
    function LoginComponent(routerExtensions, userService, page) {
        this.routerExtensions = routerExtensions;
        this.userService = userService;
        this.page = page;
        this.isLoggingIn = true;
        /* ***********************************************************
        * Use the constructor to inject app services that you need in this component.
        *************************************************************/
    }
    LoginComponent.prototype.ngOnInit = function () {
        var appSettings = require("application-settings");
        var token = appSettings.getString("token");
        console.log("continue");
        if (token !== "") {
            /* Already logged in keep going */
            this.routerExtensions.navigateByUrl("/tabs", { clearHistory: true });
        }
        this.page.actionBarHidden = true;
        this.user = new user_model_1.User();
        this.user.password = "";
        this.user.username = "";
    };
    LoginComponent.prototype.onSigninButtonTap = function () {
        var _this = this;
        this.userService.login(this.user)
            .subscribe(function (result) {
            console.log("SuccesFull Login!");
            var appSettings = require("application-settings");
            appSettings.setString("token", result.access_token);
            appSettings.setString("username", _this.user.username);
            console.log(appSettings.getString("username"));
            _this.routerExtensions.navigate(["/tabs"], { clearHistory: true });
        }, function (error) {
            console.dir(error);
            alert("Unfortunately we could not find your account.");
        });
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: "Login",
            providers: [user_service_1.UserService],
            moduleId: module.id,
            templateUrl: "./login.component.html"
        }),
        __metadata("design:paramtypes", [nativescript_angular_1.RouterExtensions, user_service_1.UserService, page_1.Page])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9naW4uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBQ2xELDZEQUF3RDtBQUN4RCxpREFBZ0Q7QUFHaEQsK0RBQTJEO0FBQzNELHlEQUFnRDtBQUVoRDs7Ozs7OERBSzhEO0FBUTlEO0lBSUksd0JBQW9CLGdCQUFrQyxFQUFVLFdBQXdCLEVBQVUsSUFBVTtRQUF4RixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQVUsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFBVSxTQUFJLEdBQUosSUFBSSxDQUFNO1FBRjVHLGdCQUFXLEdBQUcsSUFBSSxDQUFDO1FBR2Y7O3NFQUU4RDtJQUNsRSxDQUFDO0lBRUQsaUNBQVEsR0FBUjtRQUNJLElBQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1FBQ3BELElBQU0sS0FBSyxHQUFHLFdBQVcsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDN0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUN4QixFQUFFLENBQUMsQ0FBQyxLQUFLLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNmLGtDQUFrQztZQUNsQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsYUFBYSxDQUMvQixPQUFPLEVBQ1AsRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUNoQyxDQUFDO1FBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxpQkFBSSxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztJQUU1QixDQUFDO0lBRUQsMENBQWlCLEdBQWpCO1FBQUEsaUJBbUJDO1FBbEJHLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7YUFDNUIsU0FBUyxDQUNOLFVBQUMsTUFBTTtZQUNILE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsQ0FBQztZQUNqQyxJQUFNLFdBQVcsR0FBRyxPQUFPLENBQUMsc0JBQXNCLENBQUMsQ0FBQztZQUNwRCxXQUFXLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBUSxNQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDM0QsV0FBVyxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsS0FBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUN0RCxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztZQUUvQyxLQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUMxQixDQUFDLE9BQU8sQ0FBQyxFQUNULEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7UUFDaEMsQ0FBQyxFQUNELFVBQUMsS0FBSztZQUNGLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDbkIsS0FBSyxDQUFDLCtDQUErQyxDQUFDLENBQUM7UUFDM0QsQ0FBQyxDQUNKLENBQUM7SUFDVixDQUFDO0lBOUNRLGNBQWM7UUFOMUIsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxPQUFPO1lBQ2pCLFNBQVMsRUFBRSxDQUFDLDBCQUFXLENBQUM7WUFDeEIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSx3QkFBd0I7U0FDeEMsQ0FBQzt5Q0FLd0MsdUNBQWdCLEVBQXVCLDBCQUFXLEVBQWdCLFdBQUk7T0FKbkcsY0FBYyxDQStDMUI7SUFBRCxxQkFBQztDQUFBLEFBL0NELElBK0NDO0FBL0NZLHdDQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhclwiO1xuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3BhZ2VcIjtcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gXCJ+L3NoYXJlZC9jb25maWdcIjtcbmltcG9ydCB7Um91dGVyfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQge1VzZXJTZXJ2aWNlfSBmcm9tIFwifi9zaGFyZWQvc2VydmljZXMvdXNlci5zZXJ2aWNlXCI7XG5pbXBvcnQge1VzZXJ9IGZyb20gXCJ+L3NoYXJlZC9tb2RlbHMvdXNlci5tb2RlbFwiO1xuXG4vKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuKiBCZWZvcmUgeW91IGNhbiBuYXZpZ2F0ZSB0byB0aGlzIHBhZ2UgZnJvbSB5b3VyIGFwcCwgeW91IG5lZWQgdG8gcmVmZXJlbmNlIHRoaXMgcGFnZSdzIG1vZHVsZSBpbiB0aGVcbiogZ2xvYmFsIGFwcCByb3V0ZXIgbW9kdWxlLiBBZGQgdGhlIGZvbGxvd2luZyBvYmplY3QgdG8gdGhlIGdsb2JhbCBhcnJheSBvZiByb3V0ZXM6XG4qIHsgcGF0aDogXCJsb2dpblwiLCBsb2FkQ2hpbGRyZW46IFwiLi9sb2dpbi9sb2dpbi5tb2R1bGUjTG9naW5Nb2R1bGVcIiB9XG4qIE5vdGUgdGhhdCB0aGlzIHNpbXBseSBwb2ludHMgdGhlIHBhdGggdG8gdGhlIHBhZ2UgbW9kdWxlIGZpbGUuIElmIHlvdSBtb3ZlIHRoZSBwYWdlLCB5b3UgbmVlZCB0byB1cGRhdGUgdGhlIHJvdXRlIHRvby5cbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcIkxvZ2luXCIsXG4gICAgcHJvdmlkZXJzOiBbVXNlclNlcnZpY2VdLFxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9sb2dpbi5jb21wb25lbnQuaHRtbFwiXG59KVxuZXhwb3J0IGNsYXNzIExvZ2luQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgICB1c2VyOiBVc2VyO1xuICAgIGlzTG9nZ2luZ0luID0gdHJ1ZTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyRXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9ucywgcHJpdmF0ZSB1c2VyU2VydmljZTogVXNlclNlcnZpY2UsIHByaXZhdGUgcGFnZTogUGFnZSkge1xuICAgICAgICAvKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgICAgICAqIFVzZSB0aGUgY29uc3RydWN0b3IgdG8gaW5qZWN0IGFwcCBzZXJ2aWNlcyB0aGF0IHlvdSBuZWVkIGluIHRoaXMgY29tcG9uZW50LlxuICAgICAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuICAgIH1cblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICBjb25zdCBhcHBTZXR0aW5ncyA9IHJlcXVpcmUoXCJhcHBsaWNhdGlvbi1zZXR0aW5nc1wiKTtcbiAgICAgICAgY29uc3QgdG9rZW4gPSBhcHBTZXR0aW5ncy5nZXRTdHJpbmcoXCJ0b2tlblwiKTtcbiAgICAgICAgY29uc29sZS5sb2coXCJjb250aW51ZVwiKTtcbiAgICAgICAgaWYgKHRva2VuICE9PSBcIlwiKSB7XG4gICAgICAgICAgICAvKiBBbHJlYWR5IGxvZ2dlZCBpbiBrZWVwIGdvaW5nICovXG4gICAgICAgICAgICB0aGlzLnJvdXRlckV4dGVuc2lvbnMubmF2aWdhdGVCeVVybChcbiAgICAgICAgICAgICAgICBcIi90YWJzXCIsXG4gICAgICAgICAgICAgICAgeyBjbGVhckhpc3Rvcnk6IHRydWUgfSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wYWdlLmFjdGlvbkJhckhpZGRlbiA9IHRydWU7XG4gICAgICAgIHRoaXMudXNlciA9IG5ldyBVc2VyKCk7XG4gICAgICAgIHRoaXMudXNlci5wYXNzd29yZCA9IFwiXCI7XG4gICAgICAgIHRoaXMudXNlci51c2VybmFtZSA9IFwiXCI7XG5cbiAgICB9XG5cbiAgICBvblNpZ25pbkJ1dHRvblRhcCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy51c2VyU2VydmljZS5sb2dpbih0aGlzLnVzZXIpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgIChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJTdWNjZXNGdWxsIExvZ2luIVwiKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYXBwU2V0dGluZ3MgPSByZXF1aXJlKFwiYXBwbGljYXRpb24tc2V0dGluZ3NcIik7XG4gICAgICAgICAgICAgICAgICAgIGFwcFNldHRpbmdzLnNldFN0cmluZyhcInRva2VuXCIsICg8YW55PnJlc3VsdCkuYWNjZXNzX3Rva2VuKTtcbiAgICAgICAgICAgICAgICAgICAgYXBwU2V0dGluZ3Muc2V0U3RyaW5nKFwidXNlcm5hbWVcIiwgdGhpcy51c2VyLnVzZXJuYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYXBwU2V0dGluZ3MuZ2V0U3RyaW5nKFwidXNlcm5hbWVcIikpO1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShcbiAgICAgICAgICAgICAgICAgICAgICAgIFtcIi90YWJzXCJdLFxuICAgICAgICAgICAgICAgICAgICAgICAgeyBjbGVhckhpc3Rvcnk6IHRydWUgfSk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5kaXIoZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICBhbGVydChcIlVuZm9ydHVuYXRlbHkgd2UgY291bGQgbm90IGZpbmQgeW91ciBhY2NvdW50LlwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuICAgIH1cbn1cbiJdfQ==