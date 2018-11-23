import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { ListPicker } from "tns-core-modules/ui/list-picker";
import { Page } from "tns-core-modules/ui/page";
import { Settings } from "~/settings/settings";
import { Guide } from "~/shared/models/guide.model";
import { GuideService } from "~/shared/services/guide.service";

@Component({
    selector: "MaterialsSettings",
    moduleId: "module.id",
    providers: [GuideService],
    templateUrl: "./materials-settings.component.html"
})
export class MaterialsSettingsComponent implements OnInit {
    guides: Array<Guide> = [];
    guideItems: object = {};
    guide: Guide;
    hasGuides: boolean = false;
    selectedIndex: number = 0;

    constructor(private guideService: GuideService, private page: Page, private routerExtensions: RouterExtensions) {
    }

    ngOnInit(): void {
        this.page.on(Page.navigatingToEvent, () => {
            this.getGuides();
        });
        this.getGuides();
    }

    selectedIndexChanged(args) {
        const picker = <ListPicker>args.object;
        const appSettings = require("application-settings");

        if (this.guides.length > 0) {
            appSettings.setNumber("guideIndex", picker.selectedIndex);
            this.guide = this.guides[picker.selectedIndex];
            appSettings.setString("guideId", this.guide.id);
        }

    }

    getGuides(): void {
        const appSettings = require("application-settings");
        const locationId = Settings.getLocation();
        const date = Settings.getDate();

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
                        this.hasGuides = true;
                        console.log("found me some guides");
                    }

                    this.selectedIndex = appSettings.hasKey("guideIndex") ?
                        appSettings.getNumber("guideIndex") : 0;
                    this.guide = this.guides[this.selectedIndex];
                    appSettings.setString("guideId", this.guide.id);

                },
                (error) => {
                    console.dir(error);
                    this.hasGuides = false;
                    /*TODO: handle errors*/
                }
            );
    }

    goBack() {
        this.routerExtensions.backToPreviousPage();
    }

}
