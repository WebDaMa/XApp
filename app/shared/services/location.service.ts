import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { Location } from "~/shared/models/location.model";
import { Service } from "~/shared/services/service";
import { Config } from "../config";

@Injectable()
export class LocationService extends Service {
    constructor(private http: HttpClient) {
        super();
    }

    getLocationsAction(): Observable<Array<Location>> {
        const headers = this.createRequestHeader();
        const url = Config.apiUrl + "api/locations";

        return this.http.get<Array<Location>>(url, { headers });

    }

}
