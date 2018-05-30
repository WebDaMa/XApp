import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { DatePicker } from "tns-core-modules/ui/date-picker";
import { ListPicker } from "tns-core-modules/ui/list-picker";
import { Guide } from "~/shared/models/guide.model";
import { GuideService } from "~/shared/services/guide.service";

@Component({
    selector: "MaterialsSettings",
    moduleId: module.id,
    providers: [GuideService],
    templateUrl: "./materials-settings.component.html"
})
export class MaterialsSettingsComponent implements OnInit {
    guides: Array<Guide> = [];
    items: object = {};
    guide: Guide;
    year: number;
    month: number;
    day: number;
    selectedIndex: number = 0;

    constructor(private guideService: GuideService) {
    }

    ngOnInit(): void {
        this.getGuides();
    }

    selectedIndexChanged(args) {
        const picker = <ListPicker>args.object;
        const appSettings = require("application-settings");

        if (picker.selectedIndex !== 0) {
            appSettings.setNumber("guideIndex", picker.selectedIndex);
        }

        if (this.guides.length < 0) {
            this.guide = this.guides[picker.selectedIndex];
            appSettings.setNumber("guideId", this.guide.id);
        }

    }

    getGuides(): void {
        const appSettings = require("application-settings");
        let locationId: string = "1";
        if (appSettings.hasKey("locationId")) {
            locationId = appSettings.getNumber("locationId");
        }

        const now = new Date();
        let date: string = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate();
        if (appSettings.hasKey("materialDate")) {
            date = appSettings.getString("materialDate");
        }

        this.guideService.getAllGuidesForWeekAndLocationAction(date, locationId)
            .subscribe(
                (result: Array<Guide>) => {

                    this.guides = result;

                    if (this.guides.length > 0) {
                        this.items = {
                            items: this.guides,
                            length: this.guides.length,
                            getItem(index) {
                                const item = this.items[index];

                                return item.guideShort + " - " + item.guideFirstName + " - " + item.guideLastName;

                            }
                        };
                    }

                    this.selectedIndex = appSettings.hasKey("guideIndex") ?
                        appSettings.getNumber("guideIndex") : 0;

                },
                (error) => {
                    console.dir(error);
                    /*TODO: handle errors*/
                }
            );
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
        this.getGuides();
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    setCurrentDay(): void {
        const appSettings = require("application-settings");
        const now = new Date();

        appSettings.remove("materialDate");
        alert("Datum ingesteld op: " + now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate());
    }
}
