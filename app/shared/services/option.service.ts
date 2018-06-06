import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { Activity } from "~/shared/models/activity.model";
import { OptionCategory } from "~/shared/models/optionCategory.model";
import { Service } from "~/shared/services/service";
import { Config } from "../config";

@Injectable()
export class OptionService extends Service {
    constructor(private http: HttpClient) {
        super();
    }

    getAllCategoriesAction(): Observable<Array<OptionCategory>> {
        const headers = this.createRequestHeader();
        const url = Config.apiUrl + "api/activities/groups";
        console.dir(url);

        return this.http.get<Array<OptionCategory>>(url, { headers });
    }

    getAllActivitiesByCategoryAction(categoryId): Observable<Array<Activity>> {
        const headers = this.createRequestHeader();
        const url = Config.apiUrl + "api/activities/" + categoryId;
        console.dir(url);

        return this.http.get<Array<Activity>>(url, { headers });
    }

}
