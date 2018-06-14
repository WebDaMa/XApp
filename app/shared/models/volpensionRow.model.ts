import {VolpensionCustomer} from "~/shared/models/volpensionCustomer.model";

export class Volpension {
    total: string;
    date: string;
    totals: Array<>;
    customers: Array<VolpensionCustomer>;
}
