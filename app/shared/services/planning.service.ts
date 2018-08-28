import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { Planning } from "~/shared/models/planning.model";
import { Service } from "~/shared/services/service";
import { Config } from "../config";

@Injectable()
export class PlanningService extends Service {
    constructor(private http: HttpClient) {
        super();
    }

    getAllByDayAndLocationAction(date, locationId): Observable<Array<Planning>> {
        const headers = this.createRequestHeader();
        const url = Config.apiUrl + "api/planning/" + date + "/" + locationId;

        return this.http.get<Array<Planning>>(url, { headers });

    }

    putPlanningUpdateAction(planning: Planning): Observable<object> {
        const headers = this.createRequestHeader();
        const url = Config.apiUrl + "api/planning/" + planning.id;
        console.dir(url);

        return this.http.put(url, planning, { headers });
    }

}
