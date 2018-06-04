import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { Groep } from "~/shared/models/groep";
import { Service } from "~/shared/services/service";
import { Config } from "../config";

@Injectable()
export class GroepService extends Service {
    constructor(private http: HttpClient) {
        super();
    }

    getAllGroepsForWeekAndLocationAction(date, locationId): Observable<Array<Groep>> {
        const headers = this.createRequestHeader();
        const url = Config.apiUrl + "api/groeps-for-week-and-location/" + date + "/" + locationId;
        console.dir(url);

        return this.http.get<Array<Groep>>(url, { headers });
    }

}
