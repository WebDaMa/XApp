import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { User } from "~/shared/models/user.model";
import { Config } from "../config";
import {Service} from "~/shared/services/service";

@Injectable()
export class UserService extends Service {
    constructor(private http: HttpClient) {
        super();
    }

    login(user: User) {
        const url = Config.apiUrl + "oauth/v2/token";
        console.log(url);

        return this.http.post(
            url,
            {
                grant_type: "password",
                client_id: Config.appKey,
                client_secret: Config.appSecret,
                username: user.username,
                password: user.password
            },
            { headers: this.getCommonHeaders() }
        );
    }

    register(user: User) {
        return this.http.post(
            Config.apiUrl + "user/" + Config.appKey,
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
