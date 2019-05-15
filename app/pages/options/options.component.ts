import { Component, OnInit } from "@angular/core";
import { RadDataForm } from "nativescript-ui-dataform";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { ListPicker } from "tns-core-modules/ui/list-picker";
import { Page } from "tns-core-modules/ui/page";
import { SegmentedBar, SegmentedBarItem } from "tns-core-modules/ui/segmented-bar";
import { Settings } from "~/settings/settings";
import { Activity } from "~/shared/models/activity.model";
import { CanyoningCustomer } from "~/shared/models/canyoningCustomer.model";
import { Groep } from "~/shared/models/groep.model";
import { OptionCategory } from "~/shared/models/optionCategory.model";
import { RaftingCustomer } from "~/shared/models/raftingCustomer.model";
import { SpecialCustomer } from "~/shared/models/specialCustomer.model";
import { CustomerService } from "~/shared/services/customer.service";
import { GroepService } from "~/shared/services/groep.service";
import { OptionService } from "~/shared/services/option.service";

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

    isBusy: boolean;

    activities: Array<any> = [];

    optionCategories: Array<OptionCategory> = [];
    optionCategoryItems: Array<SegmentedBarItem> = [];
    optionCategory: OptionCategory = {
        id: "1",
        name: ""
    };

    selectedGroepIndex: number = 0;

    hasRaftingCustomers: boolean = false;
    raftingCustomers: Array<RaftingCustomer> = [];

    hasCanyoningCustomers: boolean = false;
    canyoningCustomers: Array<CanyoningCustomer> = [];

    hasSpecialCustomers: boolean = false;
    specialCustomers: Array<SpecialCustomer> = [];

    lastTimer = {id: null, value: -1};

    constructor(private groepService: GroepService, private customerService: CustomerService,
                private page: Page, private optionService: OptionService) {
    }

    ngOnInit(): void {
        this.getGroeps();
    }

    selectedIndexChangeDebouncer(args) {
        const picker = <ListPicker>args.object;
        console.log("picker selection: " + picker.selectedIndex);
        // If we are the same index as the last time, or the next time; we skip doing anything.
        if (picker.selectedIndex === this.lastTimer.value) { return; }

        // Grab our current value...
        this.lastTimer.value = picker.selectedIndex;

        // If the timer is already running, clear it...
        if (this.lastTimer.id != null) { clearTimeout(this.lastTimer.id); }

        // Start a new timer  (runs in 1/4 of a second)
        this.lastTimer.id = setTimeout(() => {
            this.lastTimer.id = null;
            this.selectedGroepIndexChanged(args);
        }, 250);
    }

    selectedGroepIndexChanged(args) {
        const picker = <ListPicker>args.object;

        if (this.groeps.length > 0) {
            this.groep = this.groeps[picker.selectedIndex];

            if ((typeof this.optionCategory !== "undefined" &&
            this.optionCategory !== null ? this.optionCategory.id : void 0) != null) {
                this.getOptionCategories();
            }
        }

    }

    selectedOptionCategoryIndexChanged(args) {
        const segmentedBar = <SegmentedBar>args.object;
        const selectedIndex = segmentedBar.selectedIndex;

        if (this.optionCategories.length > 0) {
            this.optionCategory = this.optionCategories[selectedIndex];
            this.getActivities();
        }

    }

    getCustomers(): void {
        if ((typeof this.groep !== "undefined" &&
        this.groep !== null ? this.groep.id : void 0) != null) {
            switch (this.optionCategory.name) {
                case "raft":
                    this.getRaftingCustomers();
                    break;

                case "canyon":
                    this.getCanyoningCustomers();
                    break;

                case "special":
                    this.getSpecialCustomers();
                    break;
            }
        }
    }

    getGroeps(): void {
        const locationId = Settings.getLocation();
        const date = Settings.getDate();

        this.isBusy = true;

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

                        this.groep = this.groeps[0];
                        this.getOptionCategories();
                    }
                    this.isBusy = false;

                },
                (error) => {
                    console.dir(error);
                    this.hasGroeps = false;
                    this.isBusy = false;

                    /*TODO: handle errors*/
                }
            );
    }

    getOptionCategories(): void {
        this.isBusy = true;

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

                    if (this.optionCategories.length > 0) {
                        this.optionCategory = this.optionCategories[0];
                        this.getActivities();
                    } else {
                        this.isBusy = false;
                    }

                },
                (error) => {
                    console.dir(error);
                    this.isBusy = false;

                    /*TODO: handle errors*/
                }
            );
    }

    getRaftingCustomers(): void {
        this.isBusy = true;

        this.customerService.getAllByGroepWithRaftingOptionAction(this.groep.id)
            .subscribe(
                (result: Array<RaftingCustomer>) => {
                    this.raftingCustomers = result;
                    this.hasRaftingCustomers = true;
                    console.log("found me some rafting customers");
                    this.isBusy = false;
                },
                (error) => {
                    console.dir(error);
                    this.hasRaftingCustomers = false;
                    this.isBusy = false;

                    /*TODO: handle errors*/
                }
            );

    }

    getCanyoningCustomers(): void {
        this.isBusy = true;

        this.customerService.getAllByGroepWithCanyoningOptionAction(this.groep.id)
            .subscribe(
                (result: Array<CanyoningCustomer>) => {
                    let i = 0;
                    for (const canyoningCustomer of result) {
                        canyoningCustomer.possibleActivitiesFull =
                            this.mapCustomerActivitiesFull(canyoningCustomer.possibleActivities);
                        canyoningCustomer.possibleActivities =
                            this.mapCustomerActivitiesName(canyoningCustomer.possibleActivities);
                        result[i] = canyoningCustomer;
                        i++;
                    }
                    this.canyoningCustomers = result;
                    this.hasCanyoningCustomers = true;
                    console.log("found me some customers");
                    this.isBusy = false;

                },
                (error) => {
                    console.dir(error);
                    this.hasCanyoningCustomers = false;
                    this.isBusy = false;

                    /*TODO: handle errors*/
                }
            );

    }

    getSpecialCustomers(): void {
        this.isBusy = true;

        this.customerService.getAllByGroepWithSpecialOptionAction(this.groep.id)
            .subscribe(
                (result: Array<SpecialCustomer>) => {
                    let i = 0;
                    for (const specialCustomer of result) {
                        specialCustomer.possibleActivitiesFull =
                            this.mapCustomerActivitiesFull(specialCustomer.possibleActivities);
                        specialCustomer.possibleActivities =
                            this.mapCustomerActivitiesName(specialCustomer.possibleActivities);
                        result[i] = specialCustomer;
                        i++;
                    }
                    this.specialCustomers = result;
                    this.hasSpecialCustomers = true;
                    console.log("found me some customers");
                    this.isBusy = false;
                },
                (error) => {
                    console.dir(error);
                    this.hasSpecialCustomers = false;
                    this.isBusy = false;

                    /*TODO: handle errors*/
                }
            );

    }

    getActivities(): void {
        if ((typeof this.optionCategory !== "undefined" &&
        this.optionCategory !== null ? this.optionCategory.id : void 0) != null &&
            this.optionCategory.name === "raft") {
            this.isBusy = true;

            this.optionService.getAllActivitiesByCategoryAction(this.optionCategory.id)
                .subscribe(
                    (result: Array<Activity>) => {
                        this.activities = [{key: "0", label: "Kies een activiteit"}];
                        this.activities = [...this.activities,
                            ...result.map(({id, name}) => ({key: id, label: name}))];

                        console.log("got me some activities");
                        this.isBusy = false;

                        this.getCustomers();
                    },
                    (error) => {
                        console.dir(error);
                        this.isBusy = false;
                        /*TODO: handle errors*/
                    }
                );
        } else {
            this.getCustomers();
        }
    }

    dfPropertyCommittedRafting(args): void {
        const dataForm = <RadDataForm>args.object;
        const raftingCustomer: RaftingCustomer = <RaftingCustomer> JSON.parse(dataForm.editedObject);

        this.isBusy = true;

        this.customerService.putCustomerRaftingOptionAction(raftingCustomer)
            .subscribe(
                () => {
                    this.isBusy = false;
                    console.log("Updated rafting customer");
                },
                (error) => {
                    console.dir(error);
                    this.isBusy = false;
                    /*TODO: handle errors*/
                }
            );
    }

    dfPropertyCommittedCanyoning(args): void {
        const dataForm = <RadDataForm>args.object;
        const canyoningCustomer: CanyoningCustomer = <CanyoningCustomer> JSON.parse(dataForm.editedObject);

        canyoningCustomer.activityIds = (typeof canyoningCustomer.activityIds === "string" &&
            canyoningCustomer.activityIds.length > 2)
        || (typeof canyoningCustomer.activityIds === "object" &&
            canyoningCustomer.activityIds.length !== 0) ? this.getActivityIds(canyoningCustomer.activityIds,
            canyoningCustomer.possibleActivitiesFull) : [];

        if (canyoningCustomer.activityIds) {
            canyoningCustomer.activityIds = JSON.stringify(canyoningCustomer.activityIds);

            this.isBusy = true;

            this.customerService.putCustomerCanyoningOptionAction(canyoningCustomer)
                .subscribe(
                    () => {
                        this.isBusy = false;
                        console.log("Updated canyoning customer");
                    },
                    (error) => {
                        this.isBusy = false;
                        console.dir(error);
                        /*TODO: handle errors*/
                    }
                );
        }
    }

    getActivityIds(activities, activitiesFull): Array<string> {
        const activitiesIds = [];
        /*suddenly activities is a string*/

        if (typeof activities === "string") {
            let stringBuild = "";
            /*Remove [ ]*/
            let i = 1;
            const lengthString = activities.length;
            for (const letter of activities) {
                if (i !== 1 && i < lengthString) {
                    stringBuild += letter;
                }
                i++;
            }
            stringBuild.replace(/\s/g, "");
            const textArr = stringBuild.split(",");
            const arrActivities = [];
            for (const text of textArr) {
                arrActivities.push(String(text));
            }
            activities = arrActivities;
        }

        for (const activityName of activities) {
            const activityId = activitiesFull
                .find((x) => x.label === activityName.trim()).key;
            activitiesIds.push(activityId);
        }

        return activitiesIds;
    }

    mapCustomerActivitiesName(activities) {
        return activities.map(({id, name}) => (name));
    }

    mapCustomerActivitiesFull(activities) {
        return activities.map(({id, name}) => ({key: id, label: name}));
    }

    dfPropertyCommittedSpecial(args): void {
        const dataForm = <RadDataForm>args.object;
        const specialCustomer: SpecialCustomer = <SpecialCustomer> JSON.parse(dataForm.editedObject);

        specialCustomer.activityIds = (typeof specialCustomer.activityIds === "string" &&
            specialCustomer.activityIds.length > 2)
        || (typeof specialCustomer.activityIds === "object" &&
            specialCustomer.activityIds.length !== 0) ? this.getActivityIds(specialCustomer.activityIds,
            specialCustomer.possibleActivitiesFull) : [];

        if (specialCustomer.activityIds) {
            specialCustomer.activityIds = JSON.stringify(specialCustomer.activityIds);
            this.isBusy = true;

            this.customerService.putCustomerSpecialOptionAction(specialCustomer)
                .subscribe(
                    () => {
                        this.isBusy = false;
                        console.log("Updated special customer");
                    },
                    (error) => {
                        this.isBusy = false;
                        console.dir(error);
                        /*TODO: handle errors*/
                    }
                );
        }
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

}
