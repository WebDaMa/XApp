import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { User } from "~/shared/models/user.model";
import { EnvironmentManagerService } from "~/shared/services/env.service";
import { Service } from "~/shared/services/service";
import { Config } from "../config";

@Injectable()
export class UserService extends Service {
    constructor(private http: HttpClient, private environmentManagerService: EnvironmentManagerService) {
        super();
    }

    login(user: User) {
        const url = Config.apiUrl + "oauth/v2/token";
        console.log(url);

        return this.http.post(
            url,
            {
                grant_type: "password",
                client_id: this.environmentManagerService.getAppKey(),
                client_secret: this.environmentManagerService.getAppSecret(),
                username: user.username,
                password: user.password
            },
            { headers: this.getCommonHeaders() }
        );
    }

    register(user: User) {
        return this.http.post(
            Config.apiUrl + "user/" + this.environmentManagerService.getAppKey(),
            JSON.stringify({
                username: user.username,
                password: user.password
            }),
            { headers: this.getCommonHeaders() }
        );
    }

    getRoles(): Observable<object> {
        const headers = this.createRequestHeader();
        const url = Config.apiUrl + "api/user/roles";
        console.dir(url);

        return this.http.get<Array<string>>(url, { headers });
    }

    getCommonHeaders() {
        const headers = new HttpHeaders({
            "Content-Type": "application/json"
        });

        return headers;
    }

}
