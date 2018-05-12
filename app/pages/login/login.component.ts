import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Page } from "tns-core-modules/ui/page";
import { Config } from "~/shared/config";
import { User } from "~/shared/user/user";
import { UserService } from "~/shared/user/user.service";

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

    constructor(private router: Router, private userService: UserService, private page: Page) {
        /* ***********************************************************
        * Use the constructor to inject app services that you need in this component.
        *************************************************************/
    }

    ngOnInit(): void {
        this.page.actionBarHidden = true;
        this.user = {
            username: "",
            password: ""
        };

        if (Config.username && Config.username !== "") {
            this.user.username = Config.username;
        }
    }

    onSigninButtonTap(): void {
        this.userService.login(this.user)
            .subscribe(
                (result) => {
                    console.log("SuccesFull Login!");
                    Config.token = (<any>result).json.data.access_token;
                    this.router.navigate(["/tabs"]);
                },
                (error) => {
                    console.dir(error);
                    alert("Unfortunately we could not find your account.");
                }
            );
    }
}
