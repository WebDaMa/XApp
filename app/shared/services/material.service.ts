import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { Service } from "~/shared/services/service";
import { Config } from "../config";
import {Material} from "~/shared/models/material.model";

@Injectable()
export class MaterialService extends Service {
    constructor(private http: HttpClient) {
        super();
    }

    getTotalForGuideAndDateAction(guideId, date): Observable<Material> {
        const headers = this.createRequestHeader();
        const url = Config.apiUrl + "api/suitsize/total/" + guideId + "/" + date;
        console.log(url);

        return this.http.get<Material>(url, { headers });
    }

}
