import { Component, EventEmitter, OnInit } from "@angular/core";
import { action } from "tns-core-modules/ui/dialogs";
import { Settings } from "~/settings/settings";
import { Location } from "~/shared/models/location.model";
import { LocationService } from "~/shared/services/location.service";

@Component({
    selector: "LocationsAction",
    moduleId: module.id,
    providers: [LocationService],
    templateUrl: "./locations-action.component.html"
})
export class LocationsActionComponent implements OnInit {
    locationEmitter: EventEmitter<Location> = new EventEmitter<Location>();

    locations: Array<Location> = [];
    location: Location = {
        id: "",
        code: "Loading Locations"
    };
    locatonsItems: Array<string> = [];
    hasLocations: boolean = false;

    isBusy: boolean = true;

    selectedIndex: number = 0;

    constructor(private locationService: LocationService) {
    }

    ngOnInit(): void {
        this.getLocations();
    }

    displayLocationDialog() {
        const options = {
            title: "Selecteer een agency.",
            message: "Agencies:",
            cancelButtonText: "Cancel",
            actions: this.locatonsItems
        };

        action(options).then((result) => {
            if (result !== "Cancel") {
                this.locationChanged(result);
            }
        });
    }

    locationChanged(locationItem) {
        if (this.locations.length > 0) {
            /*Get Guide ID first*/
            const locationId = locationItem.substring(
                locationItem.lastIndexOf("[") + 1,
                locationItem.lastIndexOf("]")
            );

            this.selectedIndex = this.locations.map((x) => x.id).indexOf(locationId);
            Settings.setLocationIndex(this.selectedIndex);
            this.location = this.locations[this.selectedIndex];
            Settings.setLocationId(this.location.id);
            this.locationEmitter.emit(this.location);
        }
    }

    getLocations(): void {
        this.locationService.getLocationsAction()
            .subscribe(
                (result: Array<Location>) => {
                    this.locations = result;

                    if (this.locations.length > 0) {
                        for (const locationItem of this.locations) {
                            this.locatonsItems.push(
                                locationItem.code + " [" +
                                locationItem.id + "]"
                            );
                        }
                        console.log("found me some locations");
                        this.selectedIndex = Settings.getLocationIndex();
                        this.location = this.locations[this.selectedIndex];
                        Settings.setLocationId(this.location.id);
                        this.hasLocations = true;
                        this.locationEmitter.emit(this.location);
                    }
                    this.isBusy = false;
                },
                (error) => {
                    console.dir(error);
                    this.hasLocations = false;
                    this.isBusy = false;
                    /*TODO: handle errors*/
                }
            );
    }

}
