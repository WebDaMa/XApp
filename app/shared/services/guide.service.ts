import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { Guide } from "~/shared/models/guide.model";
import { Service } from "~/shared/services/service";
import { Config } from "../config";

@Injectable()
export class GuideService extends Service {
    constructor(private http: HttpClient) {
        super();
    }

    getAllGuidesForWeekAndLocationAction(date, locationId): Observable<Array<Guide>> {
        const headers = this.createRequestHeader();
        const url = Config.apiUrl + "api/guides/week-and-location/" + date + "/" + locationId;
        console.dir(url);

        return this.http.get<Array<Guide>>(url, { headers });
    }

}
