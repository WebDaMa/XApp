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
