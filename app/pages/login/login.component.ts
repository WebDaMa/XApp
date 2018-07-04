import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular";
import { Page } from "tns-core-modules/ui/page";
import { User } from "~/shared/models/user.model";
import { UserService } from "~/shared/services/user.service";

/* ***********************************************************
* Before you can navigate to this page from your app, you need to reference this page's module in the
* global app router module. Add the following object to the global array of routes:
* { path: "login", loadChildren: "./login/login.module#LoginModule" }
* Note that this simply points the path to the page module file. If you move the page, you need to update the route too.
*************************************************************/

@Component({
    selector: "Login",
    providers: [UserService],
    moduleId: module.id,
    templateUrl: "./login.component.html"
})
export class LoginComponent implements OnInit {
    user: User;
    isLoggingIn = true;

    constructor(private routerExtensions: RouterExtensions, private userService: UserService, private page: Page) {
        /* ***********************************************************
        * Use the constructor to inject app services that you need in this component.
        *************************************************************/
    }

    ngOnInit(): void {
        const appSettings = require("application-settings");
        const token = appSettings.getString("token");
        if (appSettings.hasKey("token") && token !== "") {
            console.log("continue");
            /* Already logged in keep going */
            this.routerExtensions.navigateByUrl(
                "/tabs",
                { clearHistory: true });
        }
        this.page.actionBarHidden = true;
        this.user = new User();
        this.user.password = "";
        this.user.username = "";

    }

    onSigninButtonTap(): void {
        this.userService.login(this.user)
            .subscribe(
                (result) => {
                    console.log("SuccesFull Login!");
                    const appSettings = require("application-settings");
                    appSettings.setString("token", (<any>result).access_token);
                    appSettings.setString("username", this.user.username);
                    console.log(appSettings.getString("username"));

                    this.routerExtensions.navigate(
                        ["/tabs"],
                        { clearHistory: true });
                },
                (error) => {
                    console.dir(error);
                    alert("Unfortunately we could not find your account.");
                }
            );
    }
}
