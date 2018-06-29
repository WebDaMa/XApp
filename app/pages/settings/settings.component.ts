import { Component, OnInit, ViewChild } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { DatePicker } from "tns-core-modules/ui/date-picker";
import { ListPicker } from "tns-core-modules/ui/list-picker";
import { Location } from "~/shared/models/location.model";
import { LocationService } from "~/shared/services/location.service";

/* ***********************************************************
* Before you can navigate to this page from your app, you need to reference this page's module in the
* global app router module. Add the following object to the global array of routes:
* { path: "sizes", loadChildren: "./sizes/sizes.module#SizesModule" }
* Note that this simply points the path to the page module file. If you move the page, you need to update the route too.
*************************************************************/

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

    @ViewChild(DatePicker) datePicker: DatePicker;
    constructor(private locationService: LocationService) {
    }

    ngOnInit(): void {
        const appSettings = require("application-settings");
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

                },
                (error) => {
                    console.dir(error);
                    /*TODO: handle errors*/
                }
            );
    }

    selectedIndexChanged(args) {
        const picker = <ListPicker>args.object;
        const appSettings = require("application-settings");

        if (this.locations.length > 0) {
            appSettings.setNumber("locationIndex", picker.selectedIndex);
            this.location = this.locations[picker.selectedIndex];
            appSettings.setString("locationId", this.location.id);
            appSettings.setNumber("guideIndex", 0);
            appSettings.setNumber("groepIndex", 0);
        }

    }

    onPickerLoaded(args) {
        const datePicker = <DatePicker>args.object;
        const appSettings = require("application-settings");

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
        const appSettings = require("application-settings");
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
        const appSettings = require("application-settings");
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

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
}
