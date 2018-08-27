import { BillCustomerTotal } from "~/shared/models/billCustomerTotal.model";
import { Option } from "~/shared/models/option.model";

export class BillCustomerDetail {
    id: string;
    customer: string;
    booker: BillCustomerTotal;
    totals: Array<BillCustomerTotal>;
    options: Array<Option>;
}
