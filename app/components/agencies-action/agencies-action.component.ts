import { Component, EventEmitter, OnInit } from "@angular/core";
import { action } from "tns-core-modules/ui/dialogs";
import { Settings } from "~/settings/settings";
import { Agency } from "~/shared/models/agency.model";
import { AgencyService } from "~/shared/services/agency.service";

@Component({
    selector: "AgenciesAction",
    moduleId: module.id,
    providers: [AgencyService],
    templateUrl: "./agencies-action.component.html"
})
export class AgenciesActionComponent implements OnInit {
    agencyEmitter: EventEmitter<Agency> = new EventEmitter<Agency>();

    agencies: Array<Agency> = [];
    agency: Agency = {
        id: "",
        name: ""
    };
    agenciesItems: Array<string> = [];
    hasAgencies: boolean = false;

    isBusy: boolean = true;

    selectedIndex: number = 0;

    constructor(private agencyService: AgencyService) {
    }

    ngOnInit(): void {
        this.getAgencies();
    }

    displayAgencyDialog() {
        const options = {
            title: "Selecteer een agency.",
            message: "Agencies:",
            cancelButtonText: "Cancel",
            actions: this.agenciesItems
        };

        action(options).then((result) => {
            if (result !== "Cancel") {
                this.agencyChanged(result);
            }
        });
    }

    agencyChanged(agencyItem) {
        if (this.agencies.length > 0) {
            /*Get Guide ID first*/
            const agencyId = agencyItem.substring(
                agencyItem.lastIndexOf("[") + 1,
                agencyItem.lastIndexOf("]")
            );

            this.selectedIndex = this.agencies.map((x) => x.id).indexOf(agencyId);
            Settings.setAgencyIndex(this.selectedIndex);
            this.agency = this.agencies[this.selectedIndex];
            Settings.setAgencyId(this.agency.id);
            this.agencyEmitter.emit(this.agency);
        }
    }

    getAgencies(): void {
        const locationId = Settings.getLocation();
        const date = Settings.getDate();

        this.agencyService.getAllAgenciesForWeekAndLocationAction(date, locationId)
            .subscribe(
                (result: Array<Agency>) => {
                    this.agencies = result;

                    if (this.agencies.length > 0) {
                        for (const agencyItem of this.agencies) {
                            this.agenciesItems.push(
                                agencyItem.name + " [" +
                                agencyItem.id + "]"
                            );
                        }
                        console.log("found me some agencies");
                        this.selectedIndex = Settings.getAgencyIndex();
                        this.agency = this.agencies[this.selectedIndex];
                        Settings.setAgencyId(this.agency.id);
                        this.hasAgencies = true;
                        this.agencyEmitter.emit(this.agency);
                    }
                    this.isBusy = false;
                },
                (error) => {
                    console.dir(error);
                    this.hasAgencies = false;
                    this.isBusy = false;
                    /*TODO: handle errors*/
                }
            );
    }

}
