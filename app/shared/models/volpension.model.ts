import { VolpensionCustomer } from "~/shared/models/volpensionCustomer.model";
import { VolpensionRow } from "~/shared/models/volpensionRow.model";

export class Volpension {
    total: string;
    date: string;
    totalRows: Array<VolpensionRow>;
    customers: Array<VolpensionCustomer>;
}
