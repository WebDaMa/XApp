import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular";
import { ListPicker } from "tns-core-modules/ui/list-picker";
import { Page } from "tns-core-modules/ui/page";
import { Settings } from "~/settings/settings";
import { Guide } from "~/shared/models/guide.model";
import { GuideService } from "~/shared/services/guide.service";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: "MaterialsSettings",
    moduleId: module.id,
    providers: [GuideService],
    templateUrl: "./materials-settings.component.html"
})
export class MaterialsSettingsComponent implements OnInit {
    guides: Array<Guide> = [];
    guideItems: object = {};
    guide: Guide;
    hasGuides: boolean;
    selectedIndex: number = 0;
    isBusy: boolean;

    constructor(private guideService: GuideService, private page: Page, private routerExtensions: RouterExtensions,
                private activeRoute: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.getGuides();
    }

    selectedIndexChanged(args) {
        const picker = <ListPicker>args.object;
        const appSettings = require("tns-core-modules/application-settings");

        if (this.guides.length > 0) {
            appSettings.setNumber("guideIndex", picker.selectedIndex);
            this.guide = this.guides[picker.selectedIndex];
            appSettings.setString("guideId", this.guide.id);
        }

    }

    getGuides(): void {
        const appSettings = require("tns-core-modules/application-settings");
        const locationId = Settings.getLocation();
        const date = Settings.getDate();

        this.isBusy = true;
        this.hasGuides = false;
        this.guideService.getAllGuidesForWeekAndLocationAction(date, locationId)
            .subscribe(
                (result: Array<Guide>) => {

                    this.guides = result;

                    if (this.guides.length > 0) {
                        this.guideItems = {
                            items: this.guides,
                            length: this.guides.length,
                            getItem: (index) => {
                                const item = this.guides[index];

                                return item.guideShort + " - " + item.guideFirstName + " - " + item.guideLastName;

                            }
                        };
                        console.log("found me some guides");
                        this.selectedIndex = appSettings.hasKey("guideIndex") ?
                            appSettings.getNumber("guideIndex") : 0;
                        this.guide = this.guides[this.selectedIndex];
                        appSettings.setString("guideId", this.guide.id);
                        this.hasGuides = true;
                    }
                    this.isBusy = false;
                },
                (error) => {
                    console.dir(error);
                    this.isBusy = false;
                    /*TODO: handle errors*/
                }
            );
    }

    goBack() {
        this.routerExtensions.back({
            relativeTo: this.activeRoute
        });
    }

}
