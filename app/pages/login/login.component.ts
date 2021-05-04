import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular";
import * as appSettings from "tns-core-modules/application-settings";
import { Page } from "tns-core-modules/ui/page";
import * as utils from "tns-core-modules/utils/utils";
import { User } from "~/shared/models/user.model";
import { EnvironmentManagerService } from "~/shared/services/env.service";
import { UserService } from "~/shared/services/user.service";

@Component({
    selector: "Login",
    providers: [UserService, EnvironmentManagerService],
    moduleId: module.id,
    templateUrl: "./login.component.html"
})
export class LoginComponent implements OnInit {
    user: User;
    isLoggingIn: boolean = true;
    isBusy: boolean = false;

    constructor(private routerExtensions: RouterExtensions, private userService: UserService, private page: Page) {
    }

    ngOnInit(): void {
        const token = appSettings.getString("token");
        if (appSettings.hasKey("token") && token !== "") {
            console.log("continue");
            /* Already logged in keep going */
            this.routerExtensions.navigate(
                ["/tabs/default"],
                { clearHistory: true });
        }
        this.page.actionBarHidden = true;
        this.user = new User();
        this.user.password = "";
        this.user.username = "";

        this.page.backgroundSpanUnderStatusBar = true;
        this.page.on("loaded", (args) => {
            if (this.page.android) {
                this.page.android.setFitsSystemWindows(true);
            }
        });

    }

    onSigninButtonTap(): void {
        this.isBusy = true;
        this.userService.login(this.user)
            .subscribe(
                (result) => {
                    console.log("SuccesFull Login!");
                    appSettings.setString("token", (<any>result).access_token);
                    appSettings.setString("username", this.user.username);
                    console.log(appSettings.getString("username"));

                    this.userService.getRoles().subscribe(
                        (res: Array<string>) => {
                            appSettings.setString("role", this.decideRole(res));
                            this.isBusy = false;
                            this.routerExtensions.navigate(
                                ["/tabs/default"],
                                { clearHistory: true });
                        }
                    );
                },
                (error) => {
                    console.dir(error);
                    this.isBusy = false;
                    alert(error.error.error_description);
                }
            );
    }

    decideRole(roles: Array<string>): string {
        let role = "ROLE_USER";

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
    }

    onForgotPasswordButtonTap(): void {
        utils.openUrl("https://app.lifelongexploring.com/resetting/request");
    }
}
