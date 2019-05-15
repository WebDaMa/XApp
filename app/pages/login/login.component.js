"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var nativescript_angular_1 = require("nativescript-angular");
var page_1 = require("tns-core-modules/ui/page");
var user_model_1 = require("~/shared/models/user.model");
var user_service_1 = require("~/shared/services/user.service");
var LoginComponent = /** @class */ (function () {
    function LoginComponent(routerExtensions, userService, page) {
        this.routerExtensions = routerExtensions;
        this.userService = userService;
        this.page = page;
        this.isLoggingIn = true;
    }
    LoginComponent.prototype.ngOnInit = function () {
        var _this = this;
        var appSettings = require("tns-core-modules/application-settings");
        var token = appSettings.getString("token");
        if (appSettings.hasKey("token") && token !== "") {
            console.log("continue");
            /* Already logged in keep going */
            this.routerExtensions.navigate(["/tabs/default"], { clearHistory: true });
        }
        this.page.actionBarHidden = true;
        this.user = new user_model_1.User();
        this.user.password = "";
        this.user.username = "";
        this.page.backgroundSpanUnderStatusBar = true;
        this.page.on("loaded", function (args) {
            if (_this.page.android) {
                _this.page.android.setFitsSystemWindows(true);
            }
        });
    };
    LoginComponent.prototype.onSigninButtonTap = function () {
        var _this = this;
        this.userService.login(this.user)
            .subscribe(function (result) {
            console.log("SuccesFull Login!");
            var appSettings = require("tns-core-modules/application-settings");
            appSettings.setString("token", result.access_token);
            appSettings.setString("username", _this.user.username);
            console.log(appSettings.getString("username"));
            _this.userService.getRoles().subscribe(function (res) {
                appSettings.setString("role", _this.decideRole(res));
                _this.routerExtensions.navigate(["/tabs/default"], { clearHistory: true });
            });
        }, function (error) {
            console.dir(error);
            alert(error.error.error_description);
        });
    };
    LoginComponent.prototype.decideRole = function (roles) {
        var role = "ROLE_USER";
        if (roles.indexOf("ROLE_KV") !== -1) {
            role = "ROLE_KV";
        }
        if (roles.indexOf("ROLE_STV") !== -1) {
            role = "ROLE_STV";
        }
        if (roles.indexOf("ROLE_ADMIN") !== -1) {
            role = "ROLE_ADMIN";
        }
        return role;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9naW4uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBQ2xELDZEQUF3RDtBQUN4RCxpREFBZ0Q7QUFDaEQseURBQWtEO0FBQ2xELCtEQUE2RDtBQVE3RDtJQUlJLHdCQUFvQixnQkFBa0MsRUFBVSxXQUF3QixFQUFVLElBQVU7UUFBeEYscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUFVLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQVUsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUY1RyxnQkFBVyxHQUFHLElBQUksQ0FBQztJQUduQixDQUFDO0lBRUQsaUNBQVEsR0FBUjtRQUFBLGlCQXNCQztRQXJCRyxJQUFNLFdBQVcsR0FBRyxPQUFPLENBQUMsdUNBQXVDLENBQUMsQ0FBQztRQUNyRSxJQUFNLEtBQUssR0FBRyxXQUFXLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzdDLElBQUksV0FBVyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxLQUFLLEtBQUssRUFBRSxFQUFFO1lBQzdDLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDeEIsa0NBQWtDO1lBQ2xDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQzFCLENBQUMsZUFBZSxDQUFDLEVBQ2pCLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7U0FDL0I7UUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7UUFDakMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLGlCQUFJLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7UUFDeEIsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO1FBRXhCLElBQUksQ0FBQyxJQUFJLENBQUMsNEJBQTRCLEdBQUcsSUFBSSxDQUFDO1FBQzlDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxVQUFDLElBQUk7WUFDeEIsSUFBSSxLQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRTtnQkFDbkIsS0FBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDaEQ7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUVQLENBQUM7SUFFRCwwQ0FBaUIsR0FBakI7UUFBQSxpQkF5QkM7UUF4QkcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQzthQUM1QixTQUFTLENBQ04sVUFBQyxNQUFNO1lBQ0gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1lBQ2pDLElBQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQyx1Q0FBdUMsQ0FBQyxDQUFDO1lBQ3JFLFdBQVcsQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFRLE1BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUMzRCxXQUFXLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBRSxLQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3RELE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBRS9DLEtBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLENBQUMsU0FBUyxDQUNqQyxVQUFDLEdBQWtCO2dCQUNmLFdBQVcsQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLEtBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFFcEQsS0FBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FDMUIsQ0FBQyxlQUFlLENBQUMsRUFDakIsRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztZQUNoQyxDQUFDLENBQ0osQ0FBQztRQUNOLENBQUMsRUFDRCxVQUFDLEtBQUs7WUFDRixPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ25CLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDekMsQ0FBQyxDQUNKLENBQUM7SUFDVixDQUFDO0lBRUQsbUNBQVUsR0FBVixVQUFXLEtBQW9CO1FBQzNCLElBQUksSUFBSSxHQUFHLFdBQVcsQ0FBQztRQUV2QixJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7WUFDakMsSUFBSSxHQUFHLFNBQVMsQ0FBQztTQUNwQjtRQUVELElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtZQUNsQyxJQUFJLEdBQUcsVUFBVSxDQUFDO1NBQ3JCO1FBRUQsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1lBQ3BDLElBQUksR0FBRyxZQUFZLENBQUM7U0FDdkI7UUFFRCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBMUVRLGNBQWM7UUFOMUIsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxPQUFPO1lBQ2pCLFNBQVMsRUFBRSxDQUFDLDBCQUFXLENBQUM7WUFDeEIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSx3QkFBd0I7U0FDeEMsQ0FBQzt5Q0FLd0MsdUNBQWdCLEVBQXVCLDBCQUFXLEVBQWdCLFdBQUk7T0FKbkcsY0FBYyxDQTJFMUI7SUFBRCxxQkFBQztDQUFBLEFBM0VELElBMkVDO0FBM0VZLHdDQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhclwiO1xuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3BhZ2VcIjtcbmltcG9ydCB7IFVzZXIgfSBmcm9tIFwifi9zaGFyZWQvbW9kZWxzL3VzZXIubW9kZWxcIjtcbmltcG9ydCB7IFVzZXJTZXJ2aWNlIH0gZnJvbSBcIn4vc2hhcmVkL3NlcnZpY2VzL3VzZXIuc2VydmljZVwiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJMb2dpblwiLFxuICAgIHByb3ZpZGVyczogW1VzZXJTZXJ2aWNlXSxcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vbG9naW4uY29tcG9uZW50Lmh0bWxcIlxufSlcbmV4cG9ydCBjbGFzcyBMb2dpbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgdXNlcjogVXNlcjtcbiAgICBpc0xvZ2dpbmdJbiA9IHRydWU7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMsIHByaXZhdGUgdXNlclNlcnZpY2U6IFVzZXJTZXJ2aWNlLCBwcml2YXRlIHBhZ2U6IFBhZ2UpIHtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgYXBwU2V0dGluZ3MgPSByZXF1aXJlKFwidG5zLWNvcmUtbW9kdWxlcy9hcHBsaWNhdGlvbi1zZXR0aW5nc1wiKTtcbiAgICAgICAgY29uc3QgdG9rZW4gPSBhcHBTZXR0aW5ncy5nZXRTdHJpbmcoXCJ0b2tlblwiKTtcbiAgICAgICAgaWYgKGFwcFNldHRpbmdzLmhhc0tleShcInRva2VuXCIpICYmIHRva2VuICE9PSBcIlwiKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImNvbnRpbnVlXCIpO1xuICAgICAgICAgICAgLyogQWxyZWFkeSBsb2dnZWQgaW4ga2VlcCBnb2luZyAqL1xuICAgICAgICAgICAgdGhpcy5yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFxuICAgICAgICAgICAgICAgIFtcIi90YWJzL2RlZmF1bHRcIl0sXG4gICAgICAgICAgICAgICAgeyBjbGVhckhpc3Rvcnk6IHRydWUgfSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wYWdlLmFjdGlvbkJhckhpZGRlbiA9IHRydWU7XG4gICAgICAgIHRoaXMudXNlciA9IG5ldyBVc2VyKCk7XG4gICAgICAgIHRoaXMudXNlci5wYXNzd29yZCA9IFwiXCI7XG4gICAgICAgIHRoaXMudXNlci51c2VybmFtZSA9IFwiXCI7XG5cbiAgICAgICAgdGhpcy5wYWdlLmJhY2tncm91bmRTcGFuVW5kZXJTdGF0dXNCYXIgPSB0cnVlO1xuICAgICAgICB0aGlzLnBhZ2Uub24oXCJsb2FkZWRcIiwgKGFyZ3MpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLnBhZ2UuYW5kcm9pZCkge1xuICAgICAgICAgICAgICAgIHRoaXMucGFnZS5hbmRyb2lkLnNldEZpdHNTeXN0ZW1XaW5kb3dzKHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgIH1cblxuICAgIG9uU2lnbmluQnV0dG9uVGFwKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnVzZXJTZXJ2aWNlLmxvZ2luKHRoaXMudXNlcilcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlN1Y2Nlc0Z1bGwgTG9naW4hXCIpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBhcHBTZXR0aW5ncyA9IHJlcXVpcmUoXCJ0bnMtY29yZS1tb2R1bGVzL2FwcGxpY2F0aW9uLXNldHRpbmdzXCIpO1xuICAgICAgICAgICAgICAgICAgICBhcHBTZXR0aW5ncy5zZXRTdHJpbmcoXCJ0b2tlblwiLCAoPGFueT5yZXN1bHQpLmFjY2Vzc190b2tlbik7XG4gICAgICAgICAgICAgICAgICAgIGFwcFNldHRpbmdzLnNldFN0cmluZyhcInVzZXJuYW1lXCIsIHRoaXMudXNlci51c2VybmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGFwcFNldHRpbmdzLmdldFN0cmluZyhcInVzZXJuYW1lXCIpKTtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLnVzZXJTZXJ2aWNlLmdldFJvbGVzKCkuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICAgICAgKHJlczogQXJyYXk8c3RyaW5nPikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFwcFNldHRpbmdzLnNldFN0cmluZyhcInJvbGVcIiwgdGhpcy5kZWNpZGVSb2xlKHJlcykpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXCIvdGFicy9kZWZhdWx0XCJdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGNsZWFySGlzdG9yeTogdHJ1ZSB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmRpcihlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0KGVycm9yLmVycm9yLmVycm9yX2Rlc2NyaXB0aW9uKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuICAgIH1cblxuICAgIGRlY2lkZVJvbGUocm9sZXM6IEFycmF5PHN0cmluZz4pOiBzdHJpbmcge1xuICAgICAgICBsZXQgcm9sZSA9IFwiUk9MRV9VU0VSXCI7XG5cbiAgICAgICAgaWYgKHJvbGVzLmluZGV4T2YoXCJST0xFX0tWXCIpICE9PSAtMSkge1xuICAgICAgICAgICAgcm9sZSA9IFwiUk9MRV9LVlwiO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHJvbGVzLmluZGV4T2YoXCJST0xFX1NUVlwiKSAhPT0gLTEpIHtcbiAgICAgICAgICAgIHJvbGUgPSBcIlJPTEVfU1RWXCI7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocm9sZXMuaW5kZXhPZihcIlJPTEVfQURNSU5cIikgIT09IC0xKSB7XG4gICAgICAgICAgICByb2xlID0gXCJST0xFX0FETUlOXCI7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcm9sZTtcbiAgICB9XG59XG4iXX0=