import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { Groep } from "~/shared/models/groep";
import { Service } from "~/shared/services/service";
import { Config } from "../config";
import {GroepCustomer} from "~/shared/models/groepCustomer.model";

@Injectable()
export class CustomerService extends Service {
    constructor(private http: HttpClient) {
        super();
    }

    getAllByGroepAction(groepId): Observable<Array<GroepCustomer>> {
        const headers = this.createRequestHeader();
        const url = Config.apiUrl + "api/customers/groep/" + groepId;
        console.dir(url);

        return this.http.get<Array<GroepCustomer>>(url, { headers });
    }

    putCustomerSizeAction(groepCustomer: GroepCustomer): Observable<object> {
        const headers = this.createRequestHeader();
        const url = Config.apiUrl + "api/customers/suitsize/" + groepCustomer.id;
        console.dir(url);

        return this.http.put(url, groepCustomer, { headers });
    }

}
