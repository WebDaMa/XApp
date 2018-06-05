import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { SuitSize } from "~/shared/models/suitSize.model";
import { Service } from "~/shared/services/service";
import { Config } from "../config";

@Injectable()
export class SuitSizeService extends Service {
    constructor(private http: HttpClient) {
        super();
    }

    getAllAction(): Observable<Array<SuitSize>> {
        const headers = this.createRequestHeader();
        const url = Config.apiUrl + "api/suitsizes";

        return this.http.get<Array<SuitSize>>(url, { headers });

    }

}
