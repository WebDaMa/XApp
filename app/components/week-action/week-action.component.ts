import { Component, EventEmitter, OnInit } from "@angular/core";
import { SegmentedBar, SegmentedBarItem } from "tns-core-modules/ui/segmented-bar";
import { Settings } from "~/settings/settings";

@Component({
    selector: "WeekAction",
    moduleId: module.id,
    templateUrl: "./week-action.component.html"
})
export class WeekActionComponent implements OnInit {
    weekEmitter: EventEmitter<string> = new EventEmitter<string>();

    daysBarItems: Array<SegmentedBarItem> = [];

    daysItems: Array<string> = [];

    isBusy: boolean = true;

    selectedIndex: number = 0;

    constructor() {
        this.daysItems = [];
        const weekDays = ["ZA", "ZO", "MA", "DI", "WO", "DO", "VR"];

        const date = new Date(Settings.getDate());
        /*Get Saturday*/
        const day = date.getDay() + 1;
        for (let i = 0; i < 7; i++) {
            if (i - day !== 0) {
                const days = i - day;
                const newDate = new Date(date.getTime() + (days * 86400000));
                const dateString: string = newDate.getFullYear() + "-" + (newDate.getMonth() + 1) +
                    "-" + newDate.getDate();
                this.daysItems.push(dateString);
            } else {
                const dateString: string = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
                this.daysItems.push(dateString);
            }
        }
        for (const weekDay of weekDays) {
            const item = new SegmentedBarItem();
            item.title = weekDay;
            this.daysBarItems.push(item);
        }
    }

    onSelectedIndexChange(args) {
        const segmentedBar = <SegmentedBar>args.object;
        this.selectedIndex = segmentedBar.selectedIndex;
        this.weekEmitter.emit(this.daysItems[this.selectedIndex]);
    }

    ngOnInit(): void {
        this.daysItems.forEach(
            (day, k) => {
            if (day === Settings.getDate()) {
                this.selectedIndex = k;
            }
        });
    }

}
