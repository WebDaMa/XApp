import { AfterViewInit, Component, ViewChild } from "@angular/core";
import { RadDataForm } from "nativescript-ui-dataform";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { GroupsActionComponent } from "~/components/groups-action/groups-action.component";
import { Activity } from "~/shared/models/activity.model";
import { Group } from "~/shared/models/groep.model";
import { OptionCategory } from "~/shared/models/optionCategory.model";
import { RaftingCustomer } from "~/shared/models/raftingCustomer.model";
import { CustomerService } from "~/shared/services/customer.service";
import { OptionService } from "~/shared/services/option.service";

@Component({
    selector: "Options",
    moduleId: module.id,
    providers: [CustomerService, OptionService],
    templateUrl: "./options.component.html"
})
export class OptionsComponent implements AfterViewInit {

    isBusy: boolean;

    activities: Array<any> = [];

    // optionCategories: Array<OptionCategory> = [];
    // optionCategoryItems: Array<SegmentedBarItem> = [];
    optionCategory: OptionCategory = {
        id: "1",
        name: "raft"
    };

    hasRaftingCustomers: boolean = false;
    raftingCustomers: Array<RaftingCustomer> = [];

    // hasCanyoningCustomers: boolean = false;
    // canyoningCustomers: Array<CanyoningCustomer> = [];
    //
    // hasSpecialCustomers: boolean = false;
    // specialCustomers: Array<SpecialCustomer> = [];

    @ViewChild(GroupsActionComponent, {static: false}) groupsAction: GroupsActionComponent;
    constructor(
        private customerService: CustomerService,
        private optionService: OptionService
    ) {}

    ngAfterViewInit() {
        this.groupsAction.groupEmitter.subscribe((group: Group) => {
            this.getActivities();
        });
    }

    // selectedOptionCategoryIndexChanged(args) {
    //     const segmentedBar = <SegmentedBar>args.object;
    //     const selectedIndex = segmentedBar.selectedIndex;
    //
    //     this.optionCategory = this.optionCategories[selectedIndex];
    //     this.getActivities();
    //
    // }

    getCustomers(): void {
      // Base version
      this.getRaftingCustomers();
    //
    //     switch (this.optionCategory.name) {
    //         case "raft":
    //             this.getRaftingCustomers();
    //             break;
    //
    //         case "canyon":
    //             this.getCanyoningCustomers();
    //             break;
    //
    //         case "special":
    //             this.getSpecialCustomers();
    //             break;
    //     }
    }

    // getOptionCategories(): void {
    //     this.isBusy = true;
    //
    //     this.optionService.getAllCategoriesAction()
    //         .subscribe(
    //             (result: Array<OptionCategory>) => {
    //
    //                 this.optionCategories = result;
    //                 console.log("found me some optionCategories");
    //
    //                 this.optionCategoryItems = [];
    //                 for (const optionCategory of this.optionCategories) {
    //                     const segmentedBarItem = <SegmentedBarItem>new SegmentedBarItem();
    //                     segmentedBarItem.title = optionCategory.name;
    //                     this.optionCategoryItems.push(segmentedBarItem);
    //                 }
    //
    //                 if (this.optionCategories.length > 0) {
    //                     this.optionCategory = this.optionCategories[0];
    //                     this.getActivities();
    //                 } else {
    //                     this.isBusy = false;
    //                 }
    //
    //             },
    //             (error) => {
    //                 console.dir(error);
    //                 this.isBusy = false;
    //
    //                 /*TODO: handle errors*/
    //             }
    //         );
    // }

    getRaftingCustomers(): void {
        this.isBusy = true;
        // this.hasRaftingCustomers = false;

        this.customerService.getAllByGroepWithRaftingOptionAction(this.groupsAction.group.id)
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

    // getCanyoningCustomers(): void {
    //     this.isBusy = true;
    //
    //     this.customerService.getAllByGroepWithCanyoningOptionAction(this.group.id)
    //         .subscribe(
    //             (result: Array<CanyoningCustomer>) => {
    //                 let i = 0;
    //                 for (const canyoningCustomer of result) {
    //                     canyoningCustomer.possibleActivitiesFull =
    //                         this.mapCustomerActivitiesFull(canyoningCustomer.possibleActivities);
    //                     canyoningCustomer.possibleActivities =
    //                         this.mapCustomerActivitiesName(canyoningCustomer.possibleActivities);
    //                     result[i] = canyoningCustomer;
    //                     i++;
    //                 }
    //                 this.canyoningCustomers = result;
    //                 this.hasCanyoningCustomers = true;
    //                 console.log("found me some customers");
    //                 this.isBusy = false;
    //
    //             },
    //             (error) => {
    //                 console.dir(error);
    //                 this.hasCanyoningCustomers = false;
    //                 this.isBusy = false;
    //
    //                 /*TODO: handle errors*/
    //             }
    //         );
    //
    // }
    //
    // getSpecialCustomers(): void {
    //     this.isBusy = true;
    //
    //     this.customerService.getAllByGroepWithSpecialOptionAction(this.group.id)
    //         .subscribe(
    //             (result: Array<SpecialCustomer>) => {
    //                 let i = 0;
    //                 for (const specialCustomer of result) {
    //                     specialCustomer.possibleActivitiesFull =
    //                         this.mapCustomerActivitiesFull(specialCustomer.possibleActivities);
    //                     specialCustomer.possibleActivities =
    //                         this.mapCustomerActivitiesName(specialCustomer.possibleActivities);
    //                     result[i] = specialCustomer;
    //                     i++;
    //                 }
    //                 this.specialCustomers = result;
    //                 this.hasSpecialCustomers = true;
    //                 console.log("found me some customers");
    //                 this.isBusy = false;
    //             },
    //             (error) => {
    //                 console.dir(error);
    //                 this.hasSpecialCustomers = false;
    //                 this.isBusy = false;
    //
    //                 /*TODO: handle errors*/
    //             }
    //         );
    //
    // }

    getActivities(): void {
        if (this.activities.length === 0) {
            this.isBusy = true;

            this.optionService.getAllActivitiesByCategoryAction(this.optionCategory.id)
                .subscribe(
                    (result: Array<Activity>) => {
                        this.activities = [{key: null, label: "Kies een activiteit"}];
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
        if (this.hasRaftingCustomers) {
            const dataForm = <RadDataForm>args.object;
            const raftingCustomer: RaftingCustomer = <RaftingCustomer> JSON.parse(dataForm.editedObject);

            /*Used to check if first updates happened to skip empty update requests*/
            const options = {
                title: "Activiteit Wijzigen",
                message: "Wilt u de activiteit voor " + raftingCustomer.customer + " wijzigen?",
                okButtonText: "Wijzigen",
                cancelButtonText: "Cancel"
            };

            /* Bugs on first ui load when options get filled
            dialogs.confirm(options).then((result: boolean) => {
                if (result) {
                    this.updateRaftingCustomer(raftingCustomer);
                } else {
                    this.getCustomers();
                }
            });
            */
            this.updateRaftingCustomer(raftingCustomer);
        }
    }

    updateRaftingCustomer(raftingCustomer): void {
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

    // dfPropertyCommittedCanyoning(args): void {
    //     const dataForm = <RadDataForm>args.object;
    //     const canyoningCustomer: CanyoningCustomer = <CanyoningCustomer> JSON.parse(dataForm.editedObject);
    //
    //     canyoningCustomer.activityIds = (typeof canyoningCustomer.activityIds === "string" &&
    //         canyoningCustomer.activityIds.length > 2)
    //     || (typeof canyoningCustomer.activityIds === "object" &&
    //         canyoningCustomer.activityIds.length !== 0) ? this.getActivityIds(canyoningCustomer.activityIds,
    //         canyoningCustomer.possibleActivitiesFull) : [];
    //
    //     if (canyoningCustomer.activityIds) {
    //         canyoningCustomer.activityIds = JSON.stringify(canyoningCustomer.activityIds);
    //
    //         this.isBusy = true;
    //
    //         this.customerService.putCustomerCanyoningOptionAction(canyoningCustomer)
    //             .subscribe(
    //                 () => {
    //                     this.isBusy = false;
    //                     console.log("Updated canyoning customer");
    //                 },
    //                 (error) => {
    //                     this.isBusy = false;
    //                     console.dir(error);
    //                     /*TODO: handle errors*/
    //                 }
    //             );
    //     }
    // }

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

    // dfPropertyCommittedSpecial(args): void {
    //     const dataForm = <RadDataForm>args.object;
    //     const specialCustomer: SpecialCustomer = <SpecialCustomer> JSON.parse(dataForm.editedObject);
    //
    //     specialCustomer.activityIds = (typeof specialCustomer.activityIds === "string" &&
    //         specialCustomer.activityIds.length > 2)
    //     || (typeof specialCustomer.activityIds === "object" &&
    //         specialCustomer.activityIds.length !== 0) ? this.getActivityIds(specialCustomer.activityIds,
    //         specialCustomer.possibleActivitiesFull) : [];
    //
    //     if (specialCustomer.activityIds) {
    //         specialCustomer.activityIds = JSON.stringify(specialCustomer.activityIds);
    //         this.isBusy = true;
    //
    //         this.customerService.putCustomerSpecialOptionAction(specialCustomer)
    //             .subscribe(
    //                 () => {
    //                     this.isBusy = false;
    //                     console.log("Updated special customer");
    //                 },
    //                 (error) => {
    //                     this.isBusy = false;
    //                     console.dir(error);
    //                     /*TODO: handle errors*/
    //                 }
    //             );
    //     }
    // }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

}
