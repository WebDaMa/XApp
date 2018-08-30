"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var nativescript_angular_1 = require("nativescript-angular");
var page_1 = require("tns-core-modules/ui/page");
var user_model_1 = require("~/shared/models/user.model");
var user_service_1 = require("~/shared/services/user.service");
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
        if (appSettings.hasKey("token") && token !== "") {
            console.log("continue");
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
            _this.userService.getRoles().subscribe(function (res) {
                appSettings.setString("role", _this.decideRole(res));
                _this.routerExtensions.navigate(["/tabs"], { clearHistory: true });
            });
        }, function (error) {
            console.dir(error);
            alert("Unfortunately we could not find your account.");
        });
    };
    LoginComponent.prototype.decideRole = function (roles) {
        var role = "ROLE_USER";
        if (roles.indexOf("ROLE_KV") !== -1) {
            role = "ROLE_KV";
            return role;
        }
        if (roles.indexOf("ROLE_STV") !== -1) {
            role = "ROLE_STV";
            return role;
        }
        if (roles.indexOf("ROLE_ADMIN") !== -1) {
            role = "ROLE_ADMIN";
            return role;
        }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9naW4uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBQ2xELDZEQUF3RDtBQUN4RCxpREFBZ0Q7QUFFaEQseURBQWtEO0FBQ2xELCtEQUE2RDtBQUU3RDs7Ozs7OERBSzhEO0FBUTlEO0lBSUksd0JBQW9CLGdCQUFrQyxFQUFVLFdBQXdCLEVBQVUsSUFBVTtRQUF4RixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQVUsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFBVSxTQUFJLEdBQUosSUFBSSxDQUFNO1FBRjVHLGdCQUFXLEdBQUcsSUFBSSxDQUFDO1FBR2Y7O3NFQUU4RDtJQUNsRSxDQUFDO0lBRUQsaUNBQVEsR0FBUjtRQUNJLElBQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1FBQ3BELElBQU0sS0FBSyxHQUFHLFdBQVcsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDN0MsRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxLQUFLLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztZQUM5QyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ3hCLGtDQUFrQztZQUNsQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsYUFBYSxDQUMvQixPQUFPLEVBQ1AsRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUNoQyxDQUFDO1FBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxpQkFBSSxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztJQUU1QixDQUFDO0lBRUQsMENBQWlCLEdBQWpCO1FBQUEsaUJBeUJDO1FBeEJHLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7YUFDNUIsU0FBUyxDQUNOLFVBQUMsTUFBTTtZQUNILE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsQ0FBQztZQUNqQyxJQUFNLFdBQVcsR0FBRyxPQUFPLENBQUMsc0JBQXNCLENBQUMsQ0FBQztZQUNwRCxXQUFXLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBUSxNQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDM0QsV0FBVyxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsS0FBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUN0RCxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztZQUUvQyxLQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxDQUFDLFNBQVMsQ0FDakMsVUFBQyxHQUFrQjtnQkFDZixXQUFXLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxLQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBRXBELEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQzFCLENBQUMsT0FBTyxDQUFDLEVBQ1QsRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztZQUNoQyxDQUFDLENBQ0osQ0FBQztRQUNOLENBQUMsRUFDRCxVQUFDLEtBQUs7WUFDRixPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ25CLEtBQUssQ0FBQywrQ0FBK0MsQ0FBQyxDQUFDO1FBQzNELENBQUMsQ0FDSixDQUFDO0lBQ1YsQ0FBQztJQUVELG1DQUFVLEdBQVYsVUFBVyxLQUFvQjtRQUMzQixJQUFJLElBQUksR0FBRyxXQUFXLENBQUM7UUFDdkIsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbEMsSUFBSSxHQUFHLFNBQVMsQ0FBQztZQUVqQixNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ2hCLENBQUM7UUFFRCxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNuQyxJQUFJLEdBQUcsVUFBVSxDQUFDO1lBRWxCLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDaEIsQ0FBQztRQUVELEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3JDLElBQUksR0FBRyxZQUFZLENBQUM7WUFFcEIsTUFBTSxDQUFDLElBQUksQ0FBQztRQUNoQixDQUFDO0lBQ0wsQ0FBQztJQXpFUSxjQUFjO1FBTjFCLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsT0FBTztZQUNqQixTQUFTLEVBQUUsQ0FBQywwQkFBVyxDQUFDO1lBQ3hCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixXQUFXLEVBQUUsd0JBQXdCO1NBQ3hDLENBQUM7eUNBS3dDLHVDQUFnQixFQUF1QiwwQkFBVyxFQUFnQixXQUFJO09BSm5HLGNBQWMsQ0EwRTFCO0lBQUQscUJBQUM7Q0FBQSxBQTFFRCxJQTBFQztBQTFFWSx3Q0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXJcIjtcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9wYWdlXCI7XG5pbXBvcnQgeyBTZXR0aW5ncyB9IGZyb20gXCJ+L3NldHRpbmdzL3NldHRpbmdzXCI7XG5pbXBvcnQgeyBVc2VyIH0gZnJvbSBcIn4vc2hhcmVkL21vZGVscy91c2VyLm1vZGVsXCI7XG5pbXBvcnQgeyBVc2VyU2VydmljZSB9IGZyb20gXCJ+L3NoYXJlZC9zZXJ2aWNlcy91c2VyLnNlcnZpY2VcIjtcblxuLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiogQmVmb3JlIHlvdSBjYW4gbmF2aWdhdGUgdG8gdGhpcyBwYWdlIGZyb20geW91ciBhcHAsIHlvdSBuZWVkIHRvIHJlZmVyZW5jZSB0aGlzIHBhZ2UncyBtb2R1bGUgaW4gdGhlXG4qIGdsb2JhbCBhcHAgcm91dGVyIG1vZHVsZS4gQWRkIHRoZSBmb2xsb3dpbmcgb2JqZWN0IHRvIHRoZSBnbG9iYWwgYXJyYXkgb2Ygcm91dGVzOlxuKiB7IHBhdGg6IFwibG9naW5cIiwgbG9hZENoaWxkcmVuOiBcIi4vbG9naW4vbG9naW4ubW9kdWxlI0xvZ2luTW9kdWxlXCIgfVxuKiBOb3RlIHRoYXQgdGhpcyBzaW1wbHkgcG9pbnRzIHRoZSBwYXRoIHRvIHRoZSBwYWdlIG1vZHVsZSBmaWxlLiBJZiB5b3UgbW92ZSB0aGUgcGFnZSwgeW91IG5lZWQgdG8gdXBkYXRlIHRoZSByb3V0ZSB0b28uXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJMb2dpblwiLFxuICAgIHByb3ZpZGVyczogW1VzZXJTZXJ2aWNlXSxcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vbG9naW4uY29tcG9uZW50Lmh0bWxcIlxufSlcbmV4cG9ydCBjbGFzcyBMb2dpbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgdXNlcjogVXNlcjtcbiAgICBpc0xvZ2dpbmdJbiA9IHRydWU7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMsIHByaXZhdGUgdXNlclNlcnZpY2U6IFVzZXJTZXJ2aWNlLCBwcml2YXRlIHBhZ2U6IFBhZ2UpIHtcbiAgICAgICAgLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICAgICAgKiBVc2UgdGhlIGNvbnN0cnVjdG9yIHRvIGluamVjdCBhcHAgc2VydmljZXMgdGhhdCB5b3UgbmVlZCBpbiB0aGlzIGNvbXBvbmVudC5cbiAgICAgICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgYXBwU2V0dGluZ3MgPSByZXF1aXJlKFwiYXBwbGljYXRpb24tc2V0dGluZ3NcIik7XG4gICAgICAgIGNvbnN0IHRva2VuID0gYXBwU2V0dGluZ3MuZ2V0U3RyaW5nKFwidG9rZW5cIik7XG4gICAgICAgIGlmIChhcHBTZXR0aW5ncy5oYXNLZXkoXCJ0b2tlblwiKSAmJiB0b2tlbiAhPT0gXCJcIikge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJjb250aW51ZVwiKTtcbiAgICAgICAgICAgIC8qIEFscmVhZHkgbG9nZ2VkIGluIGtlZXAgZ29pbmcgKi9cbiAgICAgICAgICAgIHRoaXMucm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZUJ5VXJsKFxuICAgICAgICAgICAgICAgIFwiL3RhYnNcIixcbiAgICAgICAgICAgICAgICB7IGNsZWFySGlzdG9yeTogdHJ1ZSB9KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnBhZ2UuYWN0aW9uQmFySGlkZGVuID0gdHJ1ZTtcbiAgICAgICAgdGhpcy51c2VyID0gbmV3IFVzZXIoKTtcbiAgICAgICAgdGhpcy51c2VyLnBhc3N3b3JkID0gXCJcIjtcbiAgICAgICAgdGhpcy51c2VyLnVzZXJuYW1lID0gXCJcIjtcblxuICAgIH1cblxuICAgIG9uU2lnbmluQnV0dG9uVGFwKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnVzZXJTZXJ2aWNlLmxvZ2luKHRoaXMudXNlcilcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlN1Y2Nlc0Z1bGwgTG9naW4hXCIpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBhcHBTZXR0aW5ncyA9IHJlcXVpcmUoXCJhcHBsaWNhdGlvbi1zZXR0aW5nc1wiKTtcbiAgICAgICAgICAgICAgICAgICAgYXBwU2V0dGluZ3Muc2V0U3RyaW5nKFwidG9rZW5cIiwgKDxhbnk+cmVzdWx0KS5hY2Nlc3NfdG9rZW4pO1xuICAgICAgICAgICAgICAgICAgICBhcHBTZXR0aW5ncy5zZXRTdHJpbmcoXCJ1c2VybmFtZVwiLCB0aGlzLnVzZXIudXNlcm5hbWUpO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhhcHBTZXR0aW5ncy5nZXRTdHJpbmcoXCJ1c2VybmFtZVwiKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy51c2VyU2VydmljZS5nZXRSb2xlcygpLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgICAgIChyZXM6IEFycmF5PHN0cmluZz4pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcHBTZXR0aW5ncy5zZXRTdHJpbmcoXCJyb2xlXCIsIHRoaXMuZGVjaWRlUm9sZShyZXMpKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW1wiL3RhYnNcIl0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgY2xlYXJIaXN0b3J5OiB0cnVlIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZGlyKGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgYWxlcnQoXCJVbmZvcnR1bmF0ZWx5IHdlIGNvdWxkIG5vdCBmaW5kIHlvdXIgYWNjb3VudC5cIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcbiAgICB9XG5cbiAgICBkZWNpZGVSb2xlKHJvbGVzOiBBcnJheTxzdHJpbmc+KTogc3RyaW5nIHtcbiAgICAgICAgbGV0IHJvbGUgPSBcIlJPTEVfVVNFUlwiO1xuICAgICAgICBpZiAocm9sZXMuaW5kZXhPZihcIlJPTEVfS1ZcIikgIT09IC0xKSB7XG4gICAgICAgICAgICByb2xlID0gXCJST0xFX0tWXCI7XG5cbiAgICAgICAgICAgIHJldHVybiByb2xlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHJvbGVzLmluZGV4T2YoXCJST0xFX1NUVlwiKSAhPT0gLTEpIHtcbiAgICAgICAgICAgIHJvbGUgPSBcIlJPTEVfU1RWXCI7XG5cbiAgICAgICAgICAgIHJldHVybiByb2xlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHJvbGVzLmluZGV4T2YoXCJST0xFX0FETUlOXCIpICE9PSAtMSkge1xuICAgICAgICAgICAgcm9sZSA9IFwiUk9MRV9BRE1JTlwiO1xuXG4gICAgICAgICAgICByZXR1cm4gcm9sZTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==