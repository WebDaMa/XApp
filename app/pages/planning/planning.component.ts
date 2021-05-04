import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import * as app from "application";
import { RouterExtensions } from "nativescript-angular";
import { RadDataForm } from "nativescript-ui-dataform";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { WeekActionComponent } from "~/components/week-action/week-action.component";
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
export class PlanningComponent implements OnInit, AfterViewInit {
    guides: Array<object> = [];
    plannings: Array<Planning>;
    hasPlannings: boolean = false;
    selectedPlanning: Planning = {
        id: "",
        activity: "",
        guideId: "",
        cag1Id: "",
        cag2Id: "",
        transport: "",
        date: "",
        groepName: ""
    };

    date: string = "";
    locationId: string = "";

    isBusy: boolean = false;

    @ViewChild(WeekActionComponent, {static: false}) weekAction: WeekActionComponent;
    constructor(
        private customerService: CustomerService,
        private routerExtensions: RouterExtensions,
        private planningService: PlanningService,
        private guideService: GuideService
    ) {}

    ngOnInit(): void {
        this.date = Settings.getDate();
        this.locationId = Settings.getLocation();

        this.getGuides();
    }

    ngAfterViewInit() {
        this.weekAction.weekEmitter.subscribe((day) => {
            this.date = day;
            this.selectedPlanning = {
                id: "",
                activity: "",
                guideId: "",
                cag1Id: "",
                cag2Id: "",
                transport: "",
                date: "",
                groepName: ""
            };
            this.getPlannings();
        });
    }

    getPlannings(): void {
        if (this.date !== "" && this.locationId !== "") {
            this.isBusy = true;
            this.planningService.getAllByDayAndLocationAction(this.date, this.locationId)
                .subscribe(
                    (result: Array<Planning>) => {
                        this.plannings = result;
                        console.log("found me some plannings");
                        this.isBusy = false;
                        if (this.plannings.length > 0) {
                            this.hasPlannings = true;
                        }
                    },
                    (error) => {
                        console.dir(error);
                        this.isBusy = false;
                        /*TODO: handle errors*/
                    }
                );
        }

    }

    getGuides(): void {
        if (this.date !== "" && this.locationId !== "") {
            this.isBusy = true;
            this.guideService.getAllGuidesForWeekAndLocationAction(this.date, this.locationId)
                .subscribe(
                    (result: Array<Guide>) => {
                        this.guides = [{key: null, label: "Kies een Gids"}];
                        this.guides = [...this.guides, ...result.map(
                            ({ id, guideShort, guideFirstName, guideLastName }) => (
                                { key: id, label: guideShort + " - " + guideFirstName + " " + guideLastName }))];
                        this.getPlannings();

                    },
                    (error) => {
                        console.dir(error);
                        this.isBusy = false;
                        /*TODO: handle errors*/
                    }
                );
        }

    }

    dfPropertyCommitted(args) {
        const dataForm = <RadDataForm>args.object;
        const planning: Planning = <Planning> JSON.parse(dataForm.editedObject);

        if (planning.guideId !== null) {
            this.isBusy = true;

            this.planningService.putPlanningUpdateAction(planning)
                .subscribe(
                    (res) => {
                        console.log("Updated planning");
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

    selectPlanning(planning: Planning): void {
        this.selectedPlanning = planning;
    }

    isSelectedColor(planning: Planning): string {
        if (planning === this.selectedPlanning) {
            return "#70b32e";
        }

        return "#e5e5e5";
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
}
