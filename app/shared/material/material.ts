import { Observable } from "tns-core-modules/data/observable";
import { Size } from "~/shared/size/size";
import { SizeTotal } from "~/shared/size/sizeTotal";

export class MaterialViewModel extends Observable {

    constructor() {
        super();
    }

    set material(value: Material) {
        this.set("_material", value);
    }

    get material(): Material {
        return this.get("_material");
    }
}

export class Material {
    date: string;
    guide: string;
    activity: string;
    groupName: string;
    groupTotal: string;
    sizeTotals: [SizeTotal];
    beltTotals: [SizeTotal];
    helmetTotals: [SizeTotal];
    userSizes: [Size];

    constructor(date: string, guide: string, activity: string, groupName: string, groupTotal: string,
                sizeTotals: [SizeTotal], beltTotals: [SizeTotal], helmetTotals: [SizeTotal], userSizes: [Size]) {
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
