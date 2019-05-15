import { Component, OnInit, ViewChild } from "@angular/core";
import { RouterExtensions } from "nativescript-angular";
import { DatePicker } from "tns-core-modules/ui/date-picker";
import { ListPicker } from "tns-core-modules/ui/list-picker";
import { Location } from "~/shared/models/location.model";
import { LocationService } from "~/shared/services/location.service";

@Component({
    selector: "Settings",
    moduleId: module.id,
    providers: [LocationService],
    templateUrl: "./settings.component.html"
})
export class SettingsComponent implements OnInit {
    locations: Array<Location> = [];
    locationItems: object = {};
    location: Location;
    selectedIndex: number = 0;

    isBusy: boolean = true;

    @ViewChild(DatePicker) datePicker: DatePicker;
    constructor(private locationService: LocationService, private routerExtensions: RouterExtensions) {
    }

    ngOnInit(): void {
        this.getLocations();
    }

    selectedIndexChanged(args) {
        const picker = <ListPicker>args.object;
        const appSettings = require("tns-core-modules/application-settings");

        if (this.locations.length > 0) {
            appSettings.setNumber("locationIndex", picker.selectedIndex);
            this.location = this.locations[picker.selectedIndex];
            appSettings.setString("locationId", this.location.id);
            appSettings.setNumber("guideIndex", 0);
            appSettings.setNumber("groepIndex", 0);
        }

    }

    getLocations(): void {
        const appSettings = require("tns-core-modules/application-settings");
        this.locationService.getLocationsAction()
            .subscribe(
                (result: Array<Location>) => {

                    this.locations = result;

                    this.locationItems = {
                        items: this.locations,
                        length: this.locations.length,
                        getItem: (index) => {
                            const item = this.locations[index];

                            return item.code;
                        }
                    };

                    this.selectedIndex = appSettings.hasKey("locationIndex") ?
                        appSettings.getNumber("locationIndex") : 0;
                    this.isBusy = false;

                },
                (error) => {
                    console.dir(error);
                    /*TODO: handle errors*/
                    this.isBusy = false;
                }
            );
    }

    onPickerLoaded(args) {
        const datePicker = <DatePicker>args.object;
        const appSettings = require("tns-core-modules/application-settings");

        if (appSettings.hasKey("settingsDate")) {
            const date = new Date(appSettings.getString("settingsDate"));
            datePicker.year = date.getFullYear();
            datePicker.month = date.getMonth() + 1;
            datePicker.day = date.getDate();
        }

        datePicker.minDate = new Date(2017, 0, 1);
        datePicker.maxDate = new Date(2035, 12, 30);
    }

    onDateChanged(args) {
        const appSettings = require("tns-core-modules/application-settings");
        const date = args.value;
        let year;
        let month;
        let day;

        year = date.getFullYear();
        month = date.getMonth() + 1;
        day = date.getDate();
        appSettings.setString("settingsDate", year + "-" + month + "-" + day);

        if (this.datePicker !== null && typeof this.datePicker !== "undefined") {
            this.datePicker.year = year;
            this.datePicker.month = month;
            this.datePicker.day = day;
        }

    }

    setCurrentDay(): void {
        const appSettings = require("tns-core-modules/application-settings");
        const now = new Date();

        let year;
        let month;
        let day;

        year = now.getFullYear();
        month = now.getMonth() + 1;
        day = now.getDate();

        if (this.datePicker !== null && typeof this.datePicker !== "undefined") {
            this.datePicker.year = year;
            this.datePicker.month = month;
            this.datePicker.day = day;
        }

        appSettings.remove("settingsDate");

        alert("Datum ingesteld op: " + year + "-" + month + "-" + day);
    }

    goBack() {
        this.routerExtensions.navigate(["/tabs/default"], {
            transition: {
                name: "fade"
            }
        });
    }
}
