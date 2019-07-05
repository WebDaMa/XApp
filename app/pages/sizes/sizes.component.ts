import { Component, OnInit } from "@angular/core";
import { RadDataForm } from "nativescript-ui-dataform";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { action } from "tns-core-modules/ui/dialogs";
import { Page } from "tns-core-modules/ui/page";
import { Settings } from "~/settings/settings";
import { Group } from "~/shared/models/groep.model";
import { SizeCustomer } from "~/shared/models/sizeCustomer.model";
import { SuitSize } from "~/shared/models/suitSize.model";
import { CustomerService } from "~/shared/services/customer.service";
import { GroupService } from "~/shared/services/group.service";
import { SuitSizeService } from "~/shared/services/suitSize.service";

@Component({
    selector: "Sizes",
    moduleId: module.id,
    providers: [CustomerService, GroupService, SuitSizeService],
    templateUrl: "./sizes.component.html"
})
export class SizesComponent implements OnInit {
    isBusy: boolean = false;

    customers: Array<SizeCustomer> = [];
    sizes: Array<object> = [];

    groups: Array<Group> = [];
    groupItems: Array<string> = [];
    group: Group = {
        id: "1",
        name: "Loading"
    };
    hasGroups: boolean = false;

    selectedIndex: number = 0;

    constructor(private customerService: CustomerService,
                private suitSizeService: SuitSizeService, private page: Page,
                private groupService: GroupService) {
    }

    ngOnInit(): void {
        this.getGroups();
        this.getSizes();

        /*Do we still need this?*/
        this.page.backgroundSpanUnderStatusBar = true;
        this.page.on("loaded", (args) => {
            if (this.page.android) {
                this.page.android.setFitsSystemWindows(true);
            }
        });

    }

    getCustomers(): void {
        this.isBusy = true;
        this.customerService.getAllByGroepAction(this.group.id)
            .subscribe(
                (result: Array<SizeCustomer>) => {

                    this.customers = result;
                    console.log("found me some size customers");
                    this.isBusy = false;
                },
                (error) => {
                    console.dir(error);
                    this.isBusy = false;
                }
            );

    }

    getSizes(): void {
        this.isBusy = true;
        this.suitSizeService.getAllAction()
            .subscribe(
                (result: Array<SuitSize>) => {
                    this.sizes = [{key: "0", label: "Kies een Maat"}];
                    this.sizes = [...this.sizes, ...result.map(({ id, name }) => ({ key: id, label: name }))];
                    this.isBusy = false;
                },
                (error) => {
                    console.dir(error);
                    this.isBusy = false;
                    /*TODO: handle errors*/
                }
            );

    }

    dfPropertyCommitted(args) {
        const dataForm = <RadDataForm>args.object;
        const sizeCustomer: SizeCustomer = <SizeCustomer> JSON.parse(dataForm.editedObject);

        if (sizeCustomer.size !== "0") {
            this.isBusy = true;
            this.customerService.putCustomerSizeAction(sizeCustomer)
                .subscribe(
                    () => {
                        console.log("Updated customer");
                        this.isBusy = false;
                    },
                    (error) => {
                        console.dir(error);
                        this.isBusy = false;
                        /*TODO: handle errors*/
                    }
                );
        }
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
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
            this.getCustomers();
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
                        this.getCustomers();
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
