import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { Groep } from "~/shared/models/groep.model";
import { Service } from "~/shared/services/service";
import { Config } from "../config";
import {GroepCustomer} from "~/shared/models/groepCustomer.model";
import {RaftingCustomer} from "~/shared/models/raftingCustomer.model";
import {CheckinBus} from "~/shared/models/checkinBus.model";
import {BusCustomer} from "~/shared/models/busCustomer.model";
import {LodgingCustomer} from "~/shared/models/lodgingCustomer.model";
import {Lodging} from "~/shared/models/lodging.model";

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

    getAllByAgencyForLodgingAndPeriodAction(agencyId, date): Observable<Lodging> {
        const headers = this.createRequestHeader();
        const url = Config.apiUrl + "api/customers/lodging/" + agencyId + "/" + date;
        console.dir(url);

        return this.http.get<Lodging>(url, { headers });
    }

    getAllByGroepWithRaftingOptionAction(groepId): Observable<Array<RaftingCustomer>> {
        const headers = this.createRequestHeader();
        const url = Config.apiUrl + "api/customers/groep/rafting/" + groepId;
        console.dir(url);

        return this.http.get<Array<RaftingCustomer>>(url, { headers });
    }

    getBusGoCustomersByWeek(date): Observable<CheckinBus> {
        const headers = this.createRequestHeader();
        const url = Config.apiUrl + "api/customers/bus/go/" + date;
        console.dir(url);

        return this.http.get<CheckinBus>(url, { headers });
    }

    getBusBackCustomersByWeek(date): Observable<CheckinBus> {
        const headers = this.createRequestHeader();
        const url = Config.apiUrl + "api/customers/bus/back/" + date;
        console.dir(url);

        return this.http.get<CheckinBus>(url, { headers });
    }

    putCustomerSizeAction(groepCustomer: GroepCustomer): Observable<object> {
        const headers = this.createRequestHeader();
        const url = Config.apiUrl + "api/customers/suitsize/" + groepCustomer.id;
        console.dir(url);

        return this.http.put(url, groepCustomer, { headers });
    }

    putBusGoCustomerAction(busCustomer: BusCustomer): Observable<object> {
        const headers = this.createRequestHeader();
        const url = Config.apiUrl + "api/customers/bus/go/" + busCustomer.id;
        console.dir(url);

        return this.http.put(url, busCustomer, { headers });
    }

    putBusBackCustomerAction(busCustomer: BusCustomer): Observable<object> {
        const headers = this.createRequestHeader();
        const url = Config.apiUrl + "api/customers/bus/back/" + busCustomer.id;
        console.dir(url);

        return this.http.put(url, busCustomer, { headers });
    }

    putLodgingLayoutCustomerAction(lodgingCustomer: LodgingCustomer): Observable<object> {
        const headers = this.createRequestHeader();
        const url = Config.apiUrl + "api/customers/lodging/layout/" + lodgingCustomer.id;
        console.dir(url);

        return this.http.put(url, lodgingCustomer, { headers });
    }

}
