import { Observable } from "tns-core-modules/data/observable";
import { Material } from "~/shared/material/material";

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
