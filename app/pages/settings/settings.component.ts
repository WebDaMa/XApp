import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
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

        if (picker.selectedIndex !== 0) {
            appSettings.setNumber("locationIndex", picker.selectedIndex);
        }

        this.location = this.locations[picker.selectedIndex];
        appSettings.setNumber("locationId", this.location.id);
        appSettings.setNumber("guideIndex", 0);
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
}
