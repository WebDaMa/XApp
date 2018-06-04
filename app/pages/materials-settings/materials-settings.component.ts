import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { DatePicker } from "tns-core-modules/ui/date-picker";
import { ListPicker } from "tns-core-modules/ui/list-picker";
import { Page } from "tns-core-modules/ui/page";
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
    hasGuides: boolean = false;
    selectedIndex: number = 0;

    constructor(private guideService: GuideService, private page: Page) {
    }

    ngOnInit(): void {
        this.page.on(Page.navigatingToEvent, () => {
            this.getGuides();
        });
    }

    selectedIndexChanged(args) {
        const picker = <ListPicker>args.object;
        const appSettings = require("application-settings");

        if (this.guides.length > 0) {
            appSettings.setNumber("guideIndex", picker.selectedIndex);
            this.guide = this.guides[picker.selectedIndex];
            appSettings.setString("guideId", this.guide.id);
        }

    }

    getGuides(): void {
        const appSettings = require("application-settings");
        let locationId: string = "1";
        if (appSettings.hasKey("locationId")) {
            locationId = appSettings.getString("locationId");
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
                        this.hasGuides = true;
                        console.log("found me some guides");
                    }

                    this.selectedIndex = appSettings.hasKey("guideIndex") ?
                        appSettings.getNumber("guideIndex") : 0;

                },
                (error) => {
                    console.dir(error);
                    this.hasGuides = false;
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
