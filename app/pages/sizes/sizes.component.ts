import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { DatePicker } from "tns-core-modules/ui/date-picker";
import { ListPicker } from "tns-core-modules/ui/list-picker";
import { Page } from "tns-core-modules/ui/page";
import { Groep } from "~/shared/models/groep";
import { GroepService } from "~/shared/services/groep.service";

/* ***********************************************************
* Before you can navigate to this page from your app, you need to reference this page's module in the
* global app router module. Add the following object to the global array of routes:
* { path: "sizes", loadChildren: "./sizes/sizes.module#SizesModule" }
* Note that this simply points the path to the page module file. If you move the page, you need to update the route too.
*************************************************************/

@Component({
    selector: "Sizes",
    moduleId: module.id,
    providers: [GroepService],
    templateUrl: "./sizes.component.html"
})
export class SizesComponent implements OnInit {
    groeps: Array<Groep> = [];
    items: object = {};
    groep: Groep;
    hasGroeps: boolean = false;
    selectedIndex: number = 0;

    constructor(private groepService: GroepService, private page: Page) {
    }

    ngOnInit(): void {
        this.page.on(Page.navigatingToEvent, () => {
            this.getGroeps();
        });
    }

    selectedIndexChanged(args) {
        const picker = <ListPicker>args.object;
        const appSettings = require("application-settings");

        if (this.groeps.length > 0) {
            appSettings.setNumber("groepIndex", picker.selectedIndex);
            this.groep = this.groeps[picker.selectedIndex];
            appSettings.setString("groepId", this.groep.id);
        }

    }

    getGroeps(): void {
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

        this.groepService.getAllGroepsForWeekAndLocationAction(date, locationId)
            .subscribe(
                (result: Array<Groep>) => {

                    this.groeps = result;

                    if (this.groeps.length > 0) {
                        this.items = {
                            items: this.groeps,
                            length: this.groeps.length,
                            getItem(index) {
                                const item = this.items[index];

                                return item.name;

                            }
                        };
                        this.hasGroeps = true;
                        console.log("found me some groeps");
                    }

                    this.selectedIndex = appSettings.hasKey("groepIndex") ?
                        appSettings.getNumber("groepIndex") : 0;

                },
                (error) => {
                    console.dir(error);
                    this.hasGroeps = false;
                    /*TODO: handle errors*/
                }
            );
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

}
