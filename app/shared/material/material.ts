import { Size } from "~/shared/size/size";
import { SizeTotal } from "~/shared/size/sizeTotal";

export class Material {
    date: string;
    guide: string;
    activity: string;
    groupName: string;
    groupTotal: string;
    sizeTotals: Array<SizeTotal>;
    beltTotals: Array<SizeTotal>;
    helmetTotals: Array<SizeTotal>;
    userSizes: Array<Size>;

    constructor(date: string, guide: string, activity: string, groupName: string, groupTotal: string,
                sizeTotals: Array<SizeTotal>, beltTotals: Array<SizeTotal>, helmetTotals: Array<SizeTotal>,
                userSizes: Array<Size>) {
        this.date = date;
        this.guide = guide;
        this.activity = activity;
        this.groupName = groupName;
        this.groupTotal = groupTotal;
        this.sizeTotals = sizeTotals;
        this.beltTotals = beltTotals;
        this.helmetTotals = helmetTotals;
        this.userSizes = userSizes;
    }
}
