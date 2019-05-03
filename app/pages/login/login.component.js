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
