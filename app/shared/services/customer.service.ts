import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { BusCustomer } from "~/shared/models/busCustomer.model";
import { CanyoningCustomer } from "~/shared/models/canyoningCustomer.model";
import { CheckinBus } from "~/shared/models/checkinBus.model";
import { Lodging } from "~/shared/models/lodging.model";
import { LodgingCustomer } from "~/shared/models/lodgingCustomer.model";
import { RaftingCustomer } from "~/shared/models/raftingCustomer.model";
import { SizeCustomer } from "~/shared/models/sizeCustomer.model";
import { SpecialCustomer } from "~/shared/models/specialCustomer.model";
import { Volpension } from "~/shared/models/volpension.model";
import { Service } from "~/shared/services/service";
import { Config } from "../config";

@Injectable()
export class CustomerService extends Service {
    constructor(private http: HttpClient) {
        super();
    }

    getAllByGroepAction(groepId): Observable<Array<SizeCustomer>> {
        const headers = this.createRequestHeader();
        const url = Config.apiUrl + "api/customers/groep/" + groepId;
        console.dir(url);

        return this.http.get<Array<SizeCustomer>>(url, { headers });
    }

    getAllByAgencyForLodgingAndLocationAndPeriodAction(agencyId, locationId, date): Observable<Lodging> {
        const headers = this.createRequestHeader();
        const url = Config.apiUrl + "api/customers/lodging/" + agencyId + "/" + locationId + "/" + date;
        console.dir(url);

        return this.http.get<Lodging>(url, { headers });
    }

    getAllByGroepWithRaftingOptionAction(groepId): Observable<Array<RaftingCustomer>> {
        const headers = this.createRequestHeader();
        const url = Config.apiUrl + "api/customers/groep/rafting/" + groepId;
        console.dir(url);

        return this.http.get<Array<RaftingCustomer>>(url, { headers });
    }

    getAllByGroepWithCanyoningOptionAction(groepId): Observable<Array<CanyoningCustomer>> {
        const headers = this.createRequestHeader();
        const url = Config.apiUrl + "api/customers/groep/canyoning/" + groepId;
        console.dir(url);

        return this.http.get<Array<CanyoningCustomer>>(url, { headers });
    }

    getAllByGroepWithSpecialOptionAction(groepId): Observable<Array<SpecialCustomer>> {
        const headers = this.createRequestHeader();
        const url = Config.apiUrl + "api/customers/groep/special/" + groepId;
        console.dir(url);

        return this.http.get<Array<SpecialCustomer>>(url, { headers });
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

    getAllByAllInTypeForLocationAndPeriodAction(locationId, date): Observable<Volpension> {
        const headers = this.createRequestHeader();
        const url = Config.apiUrl + "api/customers/all-in-type/" + locationId + "/" + date;
        console.dir(url);

        return this.http.get<Volpension>(url, { headers });
    }

    putCustomerSizeAction(groepCustomer: SizeCustomer): Observable<object> {
        const headers = this.createRequestHeader();
        const url = Config.apiUrl + "api/customers/suitsize/" + groepCustomer.id;
        console.dir(url);

        return this.http.put(url, groepCustomer, { headers });
    }

    putCustomerRaftingOptionAction(raftingCustomer: RaftingCustomer): Observable<object> {
        const headers = this.createRequestHeader();
        const url = Config.apiUrl + "api/customers/rafting/" + raftingCustomer.id;
        console.dir(url);

        return this.http.put(url, raftingCustomer, { headers });
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
