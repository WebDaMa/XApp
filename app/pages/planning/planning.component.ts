import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular";
import { RadDataForm } from "nativescript-ui-dataform";
import { Settings } from "~/settings/settings";
import { Guide } from "~/shared/models/guide.model";
import { CustomerService } from "~/shared/services/customer.service";
import { GuideService } from "~/shared/services/guide.service";
import { PlanningService } from "~/shared/services/planning.service";
import {Planning} from "~/shared/models/planning.model";

@Component({
    selector: "Planning",
    moduleId: module.id,
    providers: [CustomerService, PlanningService, GuideService],
    templateUrl: "./planning.component.html"
})
export class PlanningComponent implements OnInit {
    guides: Array<object> = [];
    plannings: Array<Planning>;

    isBusy: boolean = false;

    constructor(private customerService: CustomerService,
                private routerExtensions: RouterExtensions, private planningService: PlanningService,
                private guideService: GuideService) {

    }

    ngOnInit(): void {
        this.getGuides();
        this.getPlannings();
    }

    getPlannings(): void {
        this.isBusy = true;
        const locationId = Settings.getLocation();
        const date = Settings.getDate();
        this.planningService.getAllByDayAndLocationAction(date, locationId)
            .subscribe(
                (result: Array<Planning>) => {
                    this.plannings = result;
                    console.log("found me some plannings");
                    this.isBusy = false;
                },
                (error) => {
                    console.dir(error);
                    /*TODO: handle errors*/
                }
            );
    }

    getGuides(): void {
        const locationId = Settings.getLocation();
        const date = Settings.getDate();
        this.guideService.getAllGuidesForWeekAndLocationAction(date, locationId)
            .subscribe(
                (result: Array<Guide>) => {
                    this.guides = [{key: "0", label: "Kies een Gids"}];
                    this.guides = [...this.guides, ...result.map(
                        ({ id, guideShort, guideFirstName, guideLastName }) => (
                            { key: id, label: guideShort + " - " + guideFirstName + " " + guideLastName }))];

                },
                (error) => {
                    console.dir(error);
                    /*TODO: handle errors*/
                }
            );

    }

    dfPropertyCommitted(args) {
        const dataForm = <RadDataForm>args.object;
        const planning: Planning = <Planning> JSON.parse(dataForm.editedObject);
        this.isBusy = true;

        if (planning.guideId !== "0") {
            this.planningService.putPlanningUpdateAction(planning)
                .subscribe(
                    () => {
                        console.log("Updated planning");
                        this.isBusy = false;
                    },
                    (error) => {
                        console.dir(error);
                        /*TODO: handle errors*/
                    }
                );
        }
    }

    goBack() {
        this.routerExtensions.backToPreviousPage();
    }
}
