import { Component, OnInit } from "@angular/core";
import { Settings } from "~/settings/settings";
import { Guide } from "~/shared/models/guide.model";
import { Planning } from "~/shared/models/planning.model";
import { GuideService } from "~/shared/services/guide.service";
import { PlanningService } from "~/shared/services/planning.service";

@Component({
    selector: "WeekOverview",
    moduleId: module.id,
    providers: [GuideService, PlanningService],
    templateUrl: "./weekOverview.component.html"
})
export class WeekOverviewComponent implements OnInit {

    isBusy: boolean = true;

    guides: Array<object> = [];

    days: Array<string> = ["Zondag", "Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag", "Zaterdag"];

    plannings: Array<Planning> = [];

    constructor(private planningService: PlanningService, private guideService: GuideService) {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        this.getGuides();
    }

    getWeekPlanning(): void {
        this.isBusy = true;

        const date = Settings.getDate();
        const location = Settings.getLocation();

        const appSettings = require("application-settings");

        let guideId: string = "3";
        if (appSettings.hasKey("guideId")) {
            guideId = appSettings.getString("guideId");
        }

        this.planningService.getAllByGuideAndWeekAndLocationAction(guideId, date, location)
            .subscribe(
            (result: Array<Planning>) => {

                this.plannings = result;

                console.log("Found me some Planning!");
                this.isBusy = false;

            },
            (error) => {
                console.dir(error);
                this.isBusy = false;
            }
        );
    }

    getGuides(): void {
        this.isBusy = true;
        const locationId = Settings.getLocation();
        const date = Settings.getDate();
        this.guideService.getAllGuidesForWeekAndLocationAction(date, locationId)
            .subscribe(
                (result: Array<Guide>) => {
                    this.guides = [{key: "0", label: "/"}];
                    this.guides = [...this.guides, ...result.map(
                        ({ id, guideShort, guideFirstName, guideLastName }) => (
                            { key: id, label: guideShort + " - " + guideFirstName + " " + guideLastName }))];

                    console.log("Found me some Guides!");
                    this.getWeekPlanning();

                },
                (error) => {
                    console.dir(error);
                    /*TODO: handle errors*/
                }
            );

    }

    getDayOfWeek(date): string {
        const dateObj = new Date(date);

        const day = dateObj.getDay();

        return this.days[day];

    }

}
