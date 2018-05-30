import { Size } from "~/shared/models/size.model";
import { SizeTotal } from "~/shared/models/sizeTotal.model";

export class Material {

    date: string;
    guide: {
        short: string,
        name: string
    };
    activity: string;
    groupName: string;
    groupTotal: string;
    sizeTotals: Array<SizeTotal>;
    beltTotals: Array<SizeTotal>;
    helmetTotals: Array<SizeTotal>;
    userSizes: Array<Size>;

}
