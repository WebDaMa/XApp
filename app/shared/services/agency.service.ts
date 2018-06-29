import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { Agency } from "~/shared/models/agency.model";
import { Service } from "~/shared/services/service";
import { Config } from "../config";

@Injectable()
export class AgencyService extends Service {
    constructor(private http: HttpClient) {
        super();
    }

    getAllAgenciesForWeekAndLocationAction(date, locationId): Observable<Array<Agency>> {
        const headers = this.createRequestHeader();
        const url = Config.apiUrl + "api/agencies/week-and-location/" + date + "/" + locationId;
        console.dir(url);

        return this.http.get<Array<Agency>>(url, { headers });
    }

}
