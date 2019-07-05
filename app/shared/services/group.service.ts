import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { Group } from "~/shared/models/groep.model";
import { Service } from "~/shared/services/service";
import { Config } from "../config";

@Injectable()
export class GroupService extends Service {
    constructor(private http: HttpClient) {
        super();
    }

    getAllGroepsForWeekAndLocationAction(date, locationId): Observable<Array<Group>> {
        const headers = this.createRequestHeader();
        const url = Config.apiUrl + "api/groeps/week-and-location/" + date + "/" + locationId;
        console.dir(url);

        return this.http.get<Array<Group>>(url, { headers });
    }

}
