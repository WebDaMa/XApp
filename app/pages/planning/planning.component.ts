import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RouterExtensions } from "nativescript-angular";
import { RadDataForm } from "nativescript-ui-dataform";
import { Page } from "tns-core-modules/ui/page";
import { Settings } from "~/settings/settings";
import { Guide } from "~/shared/models/guide.model";
import { Planning } from "~/shared/models/planning.model";
import { CustomerService } from "~/shared/services/customer.service";
import { GuideService } from "~/shared/services/guide.service";
import { PlanningService } from "~/shared/services/planning.service";

@Component({
    selector: "Planning",
    moduleId: module.id,
    providers: [CustomerService, PlanningService, GuideService],
    templateUrl: "./planning.component.html"
})
export class PlanningComponent implements OnInit {
    guides: Array<object> = [];
    plannings: Array<Planning>;

    date: string = "";
    locationId: string = "";

    isBusy: boolean = false;

    constructor(private customerService: CustomerService,
                private routerExtensions: RouterExtensions, private planningService: PlanningService,
                private guideService: GuideService, private page: Page, private activeRoute: ActivatedRoute) {

    }

    ngOnInit(): void {
        this.date = Settings.getDate();
        this.locationId = Settings.getLocation();

        this.getGuides();

        this.page.backgroundSpanUnderStatusBar = true;
        this.page.on("loaded", (args) => {
            if (this.page.android) {
                this.page.android.setFitsSystemWindows(true);
            }
        });
    }

    getPlannings(): void {
        this.isBusy = true;
        this.planningService.getAllByDayAndLocationAction(this.date, this.locationId)
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
        this.isBusy = true;
        this.guideService.getAllGuidesForWeekAndLocationAction(this.date, this.locationId)
            .subscribe(
                (result: Array<Guide>) => {
                    this.guides = [{key: "0", label: "Kies een Gids"}];
                    this.guides = [...this.guides, ...result.map(
                        ({ id, guideShort, guideFirstName, guideLastName }) => (
                            { key: id, label: guideShort + " - " + guideFirstName + " " + guideLastName }))];
                    this.getPlannings();

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

        if (planning.guideId !== "0") {
            this.isBusy = true;

            this.planningService.putPlanningUpdateAction(planning)
                .subscribe(
                    (res) => {
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
        this.routerExtensions.navigate(["/tabs/default"], {
            transition: {
                name: "fade"
            }
        });
    }
}
