import { HttpHeaders } from "@angular/common/http";

export class Service {
    protected createRequestHeader() {
        const appSettings = require("tns-core-modules/application-settings");

        if (appSettings.hasKey("token")) {
            // set headers here e.g.
            return new HttpHeaders({
                Authorization: "Bearer " + appSettings.getString("token"),
                "Content-Type": "application/json"
            });

        }

    }

}
