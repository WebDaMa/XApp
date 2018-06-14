import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { ListPicker } from "tns-core-modules/ui/list-picker";
import { Location } from "~/shared/models/location.model";
import { LocationService } from "~/shared/services/location.service";
import {DatePicker} from "tns-core-modules/ui/date-picker";

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
    items: object = {};
    location: Location;
    selectedIndex: number = 0;

    constructor(private locationService: LocationService) {
    }

    ngOnInit(): void {
        const appSettings = require("application-settings");
        this.locationService.getLocationsAction()
            .subscribe(
                (result: Array<Location>) => {

                    this.locations = result;

                    this.items = {
                        items: this.locations,
                        length: this.locations.length,
                        getItem(index) {
                            const item = this.items[index];

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

        if (appSettings.hasKey("materialDate")) {
            const date = new Date(appSettings.getString("materialDate"));
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
        appSettings.setString("materialDate", date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate());
    }

    setCurrentDay(): void {
        const appSettings = require("application-settings");
        const now = new Date();

        appSettings.remove("materialDate");
        alert("Datum ingesteld op: " + now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate());
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
}
