import {AfterViewInit, Component, OnInit, ViewChild} from "@angular/core";
import { RouterExtensions } from "nativescript-angular";
import { DatePicker } from "tns-core-modules/ui/date-picker";
import * as dialogs from "tns-core-modules/ui/dialogs";
import { ListPicker } from "tns-core-modules/ui/list-picker";
import { Location } from "~/shared/models/location.model";
import { LocationService } from "~/shared/services/location.service";
import {GroupsActionComponent} from "~/components/groups-action/groups-action.component";
import {LocationsActionComponent} from "~/components/locations-action/locations-action.component";
import {Settings} from "~/settings/settings";

@Component({
    selector: "Settings",
    moduleId: module.id,
    providers: [],
    templateUrl: "./settings.component.html"
})
export class SettingsComponent implements AfterViewInit {
    locations: Array<Location> = [];
    locationItems: object = {};
    location: Location;
    selectedIndex: number = 0;

    @ViewChild(LocationsActionComponent, {static: false}) locationsAction: LocationsActionComponent;
    @ViewChild(DatePicker, {static: false}) datePicker: DatePicker;
    constructor(private routerExtensions: RouterExtensions) {
    }

    ngAfterViewInit() {
        this.locationsAction.locationEmitter.subscribe((location) => {
            /*Reset indexes*/
            Settings.setGuideIndex(0);
            Settings.setGroupIndex(0);
        });
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

        /* Show alert on Saturday, as there are 2 groups, current group should use Friday.*/

        this.alertSaturday(date);

    }

    alertSaturday(date): void {
        const weekDay = date.getDay();
        if (weekDay === 6) {
            const options = {
                title: "Transfer Day",
                message: "Indien je acties voor groepen die vandaag vertrekken wenst te doen, " +
                "pas je de datum naar vrijdag(gisteren) aan!",
                okButtonText: "OK"
            };

            dialogs.alert(options);
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
        this.alertSaturday(now);
    }

    goBack() {
        this.routerExtensions.navigate(["/tabs/default"], {
            transition: {
                name: "fade"
            }
        });
    }
}
