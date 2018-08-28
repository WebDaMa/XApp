import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { BillCustomer } from "~/shared/models/billCustomer.model";
import { BillCustomerDetail } from "~/shared/models/billCustomerDetail.model";
import { BillCustomerTotal } from "~/shared/models/billCustomerTotal.model";
import { BusCustomer } from "~/shared/models/busCustomer.model";
import { CanyoningCustomer } from "~/shared/models/canyoningCustomer.model";
import { CheckinBus } from "~/shared/models/checkinBus.model";
import { PaymentCustomer } from "~/shared/models/paymentCustomer.model";
import { Lodging } from "~/shared/models/lodging.model";
import { LodgingCustomer } from "~/shared/models/lodgingCustomer.model";
import { Payment } from "~/shared/models/payment.model";
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

    getAllByGroepForBillAction(groepId): Observable<Array<BillCustomer>> {
        const headers = this.createRequestHeader();
        const url = Config.apiUrl + "api/customers/groep/bill/" + groepId;
        console.dir(url);

        return this.http.get<Array<BillCustomer>>(url, { headers });
    }

    getAllByGroepForPaymentsAction(groepId): Observable<Array<PaymentCustomer>> {
        const headers = this.createRequestHeader();
        const url = Config.apiUrl + "api/customers/groep/payments/" + groepId;
        console.dir(url);

        return this.http.get<Array<PaymentCustomer>>(url, { headers });
    }

    getBillByCustomerId(customerId): Observable<BillCustomerDetail> {
        const headers = this.createRequestHeader();
        const url = Config.apiUrl + "api/customers/bill/" + customerId;
        console.dir(url);

        return this.http.get<BillCustomerDetail>(url, { headers });
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

    putCustomerCanyoningOptionAction(canyoningCustomer: CanyoningCustomer): Observable<object> {
        const headers = this.createRequestHeader();
        const url = Config.apiUrl + "api/customers/canyoning/" + canyoningCustomer.id;
        console.dir(url);

        return this.http.put(url, canyoningCustomer, { headers });
    }

    putCustomerSpecialOptionAction(specialCustomer: SpecialCustomer): Observable<object> {
        const headers = this.createRequestHeader();
        const url = Config.apiUrl + "api/customers/special/" + specialCustomer.id;
        console.dir(url);

        return this.http.put(url, specialCustomer, { headers });
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

    putBillPayedAction(billCustomerTotal: BillCustomerTotal): Observable<object> {
        const headers = this.createRequestHeader();
        const url = Config.apiUrl + "api/customers/bill/" + billCustomerTotal.id;
        console.dir(url);

        return this.http.put(url, billCustomerTotal, { headers });
    }

    putPaymentToCustomerAction(payment: Payment): Observable<object> {
        const headers = this.createRequestHeader();
        const url = Config.apiUrl + "api/customers/payments/" + payment.customerId;
        console.dir(url);

        return this.http.put(url, payment, { headers });
    }
}
