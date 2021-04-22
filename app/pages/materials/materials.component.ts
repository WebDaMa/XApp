import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { WeekActionComponent } from "~/components/week-action/week-action.component";
import { Settings } from "~/settings/settings";
import { Material } from "~/shared/models/material.model";
import { MaterialService } from "~/shared/services/material.service";
import {GuidesActionComponent} from "~/components/guides-action/guides-action.component";
import {Guide} from "~/shared/models/guide.model";

@Component({
    selector: "Materials",
    moduleId: module.id,
    providers: [MaterialService],
    templateUrl: "./materials.component.html"
})
export class MaterialsComponent implements OnInit, AfterViewInit {

    isBusy: boolean = true;
    material: any | Material;

    date: string;

    @ViewChild(WeekActionComponent, {static: false}) weekAction: WeekActionComponent;
    @ViewChild(GuidesActionComponent, {static: false}) guideAction: GuidesActionComponent;
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

        this.date = Settings.getDate();

        this.reload();
    }

    ngAfterViewInit() {
        this.weekAction.weekEmitter.subscribe((day) => {
            this.date = day;
            this.reload();
        });
        this.guideAction.guideEmitter.subscribe((guide: Guide) => {
            this.reload();
        });
    }

    reload(): void {
        this.isBusy = true;

        const locationId = Settings.getLocationId();
        const guideId = Settings.getGuideId();
        this.materialService.getTotalForGuideDateAndLocationAction(guideId, this.date, locationId).subscribe(
            (result: Material) => {

                this.material = result;
                this.isBusy = false;

            },
            (error) => {
                console.dir(error);
                /*TODO: handle errors*/
                this.isBusy = false;
            }
        );
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

}
