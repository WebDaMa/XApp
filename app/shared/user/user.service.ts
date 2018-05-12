import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";
import { Observable } from "rxjs/Observable";

import { Config } from "../config";
import { User } from "./user";

@Injectable()
export class UserService {
    constructor(private http: HttpClient) {}

    login(user: User) {

        return this.http.post(
            Config.apiUrl + "oauth/v2/token",
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
        )
    }

    getCommonHeaders() {
        const headers = new HttpHeaders({
            "Content-Type": "application/json"
        });

        return headers;
    }

}
