import { Component, OnInit } from "@angular/core";
import { SegmentedBar, SegmentedBarItem } from "tns-core-modules/ui/segmented-bar";

/* ***********************************************************
* Before you can navigate to this page from your app, you need to reference this page's module in the
* global app router module. Add the following object to the global array of routes:
* { path: "sizes", loadChildren: "./sizes/sizes.module#SizesModule" }
* Note that this simply points the path to the page module file. If you move the page, you need to update the route too.
*************************************************************/

@Component({
    selector: "Checkin",
    moduleId: module.id,
    templateUrl: "./checkin.component.html"
})
export class CheckinComponent implements OnInit {
    items: Array<SegmentedBarItem> = [];
    selectedIndex = 0;
    titles = ["Bus Heen", "Bus Terug", "Verblijf", "Vol pension"];

    constructor() {
    }

    onSelectedIndexChange(args) {
        const segmentedBar = <SegmentedBar>args.object;
        this.selectedIndex = segmentedBar.selectedIndex;
    }

    ngOnInit(): void {
        for (const title of this.titles) {
            const segmentedBarItem = <SegmentedBarItem>new SegmentedBarItem();
            segmentedBarItem.title = title;
            this.items.push(segmentedBarItem);
        }
        this.selectedIndex = 0;
    }
}
