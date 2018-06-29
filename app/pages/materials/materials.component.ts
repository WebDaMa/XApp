import { Component, OnInit } from "@angular/core";
import { Material } from "~/shared/models/material.model";
import { MaterialService } from "~/shared/services/material.service";
import {Settings} from "~/settings/settings";

@Component({
    selector: "Materials",
    moduleId: module.id,
    providers: [MaterialService],
    templateUrl: "./materials.component.html"
})
export class MaterialsComponent implements OnInit {

    isBusy: boolean = true;
    private _material: any | Material;

    constructor(private materialService: MaterialService) {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        this.material = {};
        this.material.guide = {};
        this.material.beltTotals = [];
        this.material.sizeTotals = [];
        this.material.helmetTotals = [];
        this.material.userSizes = [];

        this.reload();
    }

    get material(): Material | any {
        return this._material;
    }

    set material(value: Material | any) {
        this._material = value;
    }

    reload(): void {
        this.isBusy = true;

        const date = Settings.getDate();

        const appSettings = require("application-settings");
        let guideId: string = "3";
        if (appSettings.hasKey("guideId")) {
            guideId = appSettings.getString("guideId");
        }
        this.materialService.getTotalForGuideAndDateAction(guideId, date).subscribe(
            (result: Material) => {

                this.material = result;
                this.isBusy = false;

            },
            (error) => {
                console.dir(error);
                /*TODO: handle errors*/
            }
        );
    }

}
