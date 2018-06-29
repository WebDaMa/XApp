import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { ListPicker } from "tns-core-modules/ui/list-picker";
import { Page } from "tns-core-modules/ui/page";
import {SegmentedBar, SegmentedBarItem} from "tns-core-modules/ui/segmented-bar";
import { Activity } from "~/shared/models/activity.model";
import { Groep } from "~/shared/models/groep.model";
import { OptionCategory } from "~/shared/models/optionCategory.model";
import { RaftingCustomer } from "~/shared/models/raftingCustomer.model";
import { CustomerService } from "~/shared/services/customer.service";
import { GroepService } from "~/shared/services/groep.service";
import { OptionService } from "~/shared/services/option.service";
import {Settings} from "~/settings/settings";

/* ***********************************************************
* Before you can navigate to this page from your app, you need to reference this page's module in the
* global app router module. Add the following object to the global array of routes:
* { path: "planning", loadChildren: "./planning/planning.module#PlanningModule" }
* Note that this simply points the path to the page module file. If you move the page, you need to update the route too.
*************************************************************/

@Component({
    selector: "Options",
    moduleId: module.id,
    providers: [GroepService, CustomerService, OptionService],
    templateUrl: "./options.component.html"
})
export class OptionsComponent implements OnInit {
    groeps: Array<Groep> = [];
    groepItems: object = {};
    groep: Groep;
    hasGroeps: boolean = false;

    activities: Array<object> = [];

    optionCategories: Array<OptionCategory> = [];
    optionCategoryItems: Array<SegmentedBarItem> = [];
    optionCategory: OptionCategory = {
        id: "1",
        name: ""
    };

    hasRaftingGroeps: boolean = false;
    selectedGroepIndex: number = 0;
    raftingCustomers: Array<RaftingCustomer> = [];

    constructor(private groepService: GroepService, private customerService: CustomerService,
                private page: Page, private optionService: OptionService) {
    }

    ngOnInit(): void {
        this.getActivities();
        this.getOptionCategories();
        this.page.on(Page.navigatingToEvent, () => {
            this.getGroeps();
        });

    }

    selectedGroepIndexChanged(args) {
        const picker = <ListPicker>args.object;
        const appSettings = require("application-settings");

        if (this.groeps.length > 0) {
            appSettings.setNumber("groepIndex", picker.selectedIndex);
            this.groep = this.groeps[picker.selectedIndex];
            appSettings.setString("groepId", this.groep.id);
            this.getCustomers();
        }

    }

    selectedOptionCategoryIndexChanged(args) {
        const segmentedBar = <SegmentedBar>args.object;
        const selectedIndex = segmentedBar.selectedIndex;
        const appSettings = require("application-settings");

        if (this.optionCategories.length > 0) {
            this.optionCategory = this.optionCategories[selectedIndex];
            this.getActivities();
            this.getCustomers();
        }

    }

    getCustomers(): void {
        /*TODO: write logic*/
    }

    getGroeps(): void {
        const appSettings = require("application-settings");
        const locationId = Settings.getLocation();
        const date = Settings.getDate();

        this.groepService.getAllGroepsForWeekAndLocationAction(date, locationId)
            .subscribe(
                (result: Array<Groep>) => {

                    this.groeps = result;

                    if (this.groeps.length > 0) {
                        this.groepItems = {
                            items: this.groeps,
                            length: this.groeps.length,
                            getItem: (index) => {
                                const item = this.groeps[index];

                                return item.name;
                            }
                        };
                        this.hasGroeps = true;
                        console.log("found me some groeps");
                    }

                    this.selectedGroepIndex = appSettings.hasKey("groepIndex") ?
                        appSettings.getNumber("groepIndex") : 0;

                    /* TODO: get The data
                    this.getCustomers();*/

                },
                (error) => {
                    console.dir(error);
                    this.hasGroeps = false;
                    /*TODO: handle errors*/
                }
            );
    }

    getOptionCategories(): void {
        const appSettings = require("application-settings");

        this.optionService.getAllCategoriesAction()
            .subscribe(
                (result: Array<OptionCategory>) => {

                    this.optionCategories = result;
                    console.log("found me some optionCategories");

                    this.optionCategoryItems = [];
                    for (const optionCategory of this.optionCategories) {
                        const segmentedBarItem = <SegmentedBarItem>new SegmentedBarItem();
                        segmentedBarItem.title = optionCategory.name;
                        this.optionCategoryItems.push(segmentedBarItem);
                    }

                    /* TODO: get The data
                    this.getCustomers();*/

                },
                (error) => {
                    console.dir(error);
                    /*TODO: handle errors*/
                }
            );
    }

    getRaftingCustomers(): void {
        const appSettings = require("application-settings");
        if (appSettings.hasKey("groepId")) {
            const groepId = appSettings.getString("groepId");

            this.customerService.getAllByGroepWithRaftingOptionAction(groepId)
                .subscribe(
                    (result: Array<RaftingCustomer>) => {

                        this.raftingCustomers = result;
                        this.hasRaftingGroeps = true;
                        console.log("found me some customers");
                    },
                    (error) => {
                        console.dir(error);
                        this.hasRaftingGroeps = false;
                        /*TODO: handle errors*/
                    }
                );
        }

    }

    getActivities(): void {
        const appSettings = require("application-settings");

        const categoryId = this.optionCategory.id;
        this.optionService.getAllActivitiesByCategoryAction(categoryId)
            .subscribe(
                (result: Array<Activity>) => {

                    this.activities = result.map(({id, name}) => ({key: id, label: name}));
                    console.log("got me some activities");
                },
                (error) => {
                    console.dir(error);
                    /*TODO: handle errors*/
                }
            );

    }

    dfPropertyCommittedRafting(raftingCustomer: RaftingCustomer) {
        console.dir(raftingCustomer);
        /*this.customerService.putCustomerSizeAction(raftingCustomer)
            .subscribe(
                () => {
                    console.log("Updated customer");
                },
                (error) => {
                    console.dir(error);
                }
            );*/
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
}
