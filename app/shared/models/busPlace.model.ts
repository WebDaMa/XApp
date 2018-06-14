import { BusCustomer } from "~/shared/models/busCustomer.model";
import { BusTotal } from "~/shared/models/busTotal.model";

export class BusPlace {
    totals: Array<BusTotal>;
    place: string;
    customers: Array<BusCustomer>;
}
