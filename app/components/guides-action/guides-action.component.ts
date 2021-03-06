import {Component, EventEmitter, OnInit} from "@angular/core";
import { action } from "tns-core-modules/ui/dialogs";
import { Settings } from "~/settings/settings";
import { Guide } from "~/shared/models/guide.model";
import { GuideService } from "~/shared/services/guide.service";

@Component({
    selector: "GuidesAction",
    moduleId: module.id,
    providers: [GuideService],
    templateUrl: "./guides-action.component.html"
})
export class GuidesActionComponent implements OnInit {
    guideEmitter: EventEmitter<Guide> = new EventEmitter<Guide>();
    guides: Array<Guide> = [];
    guideItems: Array<string> = [];
    guide: Guide = {
        id: "",
        guideShort: "getting data",
        guideFirstName: "",
        guideLastName: ""
    };
    hasGuides: boolean;
    selectedIndex: number = 0;
    isBusy: boolean;

    constructor(private guideService: GuideService) {
    }

    ngOnInit(): void {
        this.getGuides();
    }

    displayGuideDialog() {
        const options = {
            title: "Selecteer een gids.",
            message: "Gidsen:",
            cancelButtonText: "Cancel",
            actions: this.guideItems
        };

        action(options).then((result) => {
            if (result !== "Cancel") {this.guideChanged(result); }
        });
    }

    guideChanged(guideItem) {
        if (this.guides.length > 0) {
            /*Get Guide ID first*/
            const guideId = guideItem.substring(
                guideItem.lastIndexOf("[") + 1,
                guideItem.lastIndexOf("]")
            );

            this.selectedIndex = this.guides.map((x) => x.id).indexOf(guideId);
            Settings.setGuideIndex(this.selectedIndex);
            this.guide = this.guides[this.selectedIndex];
            Settings.setGuideId(this.guide.id);
            this.guideEmitter.emit(this.guide);
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
                        // Make empty first
                        this.guideItems = [];
                        for (const guideItem of this.guides) {
                            this.guideItems.push(
                                guideItem.guideShort + " - " +
                                guideItem.guideFirstName + " - " +
                                guideItem.guideLastName + " - [" +
                                guideItem.id + "]"
                            );
                        }
                        console.log("found me some guides");
                        this.selectedIndex = Settings.getGuideIndex();
                        this.guide = this.guides[this.selectedIndex];
                        Settings.setGuideId(this.guide.id);
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

}
