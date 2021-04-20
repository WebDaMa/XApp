import { Component, EventEmitter, OnInit } from "@angular/core";
import { action } from "tns-core-modules/ui/dialogs";
import { Settings } from "~/settings/settings";
import { Group } from "~/shared/models/groep.model";
import { GroupService } from "~/shared/services/group.service";

@Component({
    selector: "GroupsAction",
    moduleId: module.id,
    providers: [GroupService],
    templateUrl: "./groups-action.component.html"
})
export class GroupsActionComponent implements OnInit {
    groups: Array<Group> = [];
    groupItems: Array<string> = [];
    group: Group = {
        id: "1",
        name: "Loading"
    };
    hasGroups: boolean = false;
    groupEmitter: EventEmitter<Group> = new EventEmitter<Group>();

    isBusy: boolean = true;

    selectedIndex: number = 0;

    constructor(private groupService: GroupService) {
    }

    ngOnInit(): void {
        this.getGroups();
    }

    displayGroupDialog() {
        const options = {
            title: "Selecteer een groep.",
            message: "Groepen:",
            cancelButtonText: "Cancel",
            actions: this.groupItems
        };

        action(options).then((result) => {
            if (result !== "Cancel") {
                this.groupChanged(result);
            }
        });
    }

    groupChanged(groupItem) {
        if (this.groups.length > 0) {
            /*Get Guide ID first*/
            const groupId = groupItem.substring(
                groupItem.lastIndexOf("[") + 1,
                groupItem.lastIndexOf("]")
            );

            this.selectedIndex = this.groups.map((x) => x.id).indexOf(groupId);
            Settings.setGroupIndex(this.selectedIndex);
            this.group = this.groups[this.selectedIndex];
            Settings.setGroupId(this.group.id);
            this.groupEmitter.emit(this.group);
        }
    }

    getGroups(): void {
        const locationId = Settings.getLocation();
        const date = Settings.getDate();

        this.isBusy = true;

        this.groupService.getAllGroepsForWeekAndLocationAction(date, locationId)
            .subscribe(
                (result: Array<Group>) => {

                    this.groups = result;

                    if (this.groups.length > 0) {
                        // Make it empty first
                        this.groupItems = [];
                        for (const groupItem of this.groups) {
                            this.groupItems.push(
                                groupItem.name + " [" +
                                groupItem.id + "]"
                            );
                        }
                        console.log("found me some groups");
                        this.selectedIndex = Settings.getGroupIndex();
                        this.group = this.groups[this.selectedIndex];
                        Settings.setGroupId(this.group.id);
                        this.hasGroups = true;
                        this.groupEmitter.emit(this.group);
                    }

                    this.isBusy = false;

                },
                (error) => {
                    console.dir(error);
                    this.isBusy = false;
                    this.hasGroups = false;
                    /*TODO: handle errors*/
                }
            );
    }

}
