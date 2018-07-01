import { Component, OnInit } from "@angular/core";
import { RadDataForm } from "nativescript-ui-dataform";
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

    isBusy: boolean = true;

    activities: Array<object> = [];

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

    constructor(private groepService: GroepService, private customerService: CustomerService,
                private page: Page, private optionService: OptionService) {
    }

    ngOnInit(): void {
        this.getGroeps();
        this.getOptionCategories();
        this.page.on(Page.navigatingToEvent, () => {
            this.getGroeps();
            this.getOptionCategories();
            this.getCustomers();
        });

    }

    selectedGroepIndexChanged(args) {
        const picker = <ListPicker>args.object;

        if (this.groeps.length > 0) {
            this.groep = this.groeps[picker.selectedIndex];
            if ((typeof this.optionCategory !== "undefined" &&
            this.optionCategory !== null ? this.optionCategory.id : void 0) != null) {
                this.getCustomers();
            }
        }

    }

    selectedOptionCategoryIndexChanged(args) {
        const segmentedBar = <SegmentedBar>args.object;
        const selectedIndex = segmentedBar.selectedIndex;

        if (this.optionCategories.length > 0) {
            this.optionCategory = this.optionCategories[selectedIndex];
            this.getActivities();
            this.getCustomers();
        }

    }

    getCustomers(): void {
        if ((typeof this.groep !== "undefined" &&
        this.groep !== null ? this.groep.id : void 0) != null) {
            this.isBusy = true;
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
                    }

                },
                (error) => {
                    console.dir(error);
                    this.hasGroeps = false;
                    /*TODO: handle errors*/
                }
            );
    }

    getOptionCategories(): void {
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
                        this.getCustomers();
                    }

                },
                (error) => {
                    console.dir(error);
                    /*TODO: handle errors*/
                }
            );
    }

    getRaftingCustomers(): void {
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
                    /*TODO: handle errors*/
                }
            );

    }

    getCanyoningCustomers(): void {
        this.customerService.getAllByGroepWithCanyoningOptionAction(this.groep.id)
            .subscribe(
                (result: Array<CanyoningCustomer>) => {
                    this.canyoningCustomers = result;
                    this.hasCanyoningCustomers = true;
                    console.log("found me some customers");
                    this.isBusy = false;

                },
                (error) => {
                    console.dir(error);
                    this.hasCanyoningCustomers = false;
                    /*TODO: handle errors*/
                }
            );

    }

    getSpecialCustomers(): void {
        this.customerService.getAllByGroepWithSpecialOptionAction(this.groep.id)
            .subscribe(
                (result: Array<SpecialCustomer>) => {
                    this.specialCustomers = result;
                    this.hasSpecialCustomers = true;
                    console.log("found me some customers");
                    this.isBusy = false;
                },
                (error) => {
                    console.dir(error);
                    this.hasSpecialCustomers = false;
                    /*TODO: handle errors*/
                }
            );

    }

    getActivities(): void {
        if ((typeof this.optionCategory !== "undefined" &&
        this.optionCategory !== null ? this.optionCategory.id : void 0) != null) {
            this.optionService.getAllActivitiesByCategoryAction(this.optionCategory.id)
                .subscribe(
                    (result: Array<Activity>) => {
                        this.activities = [{key: "0", label: "Kies een activiteit"}];
                        this.activities = [...this.activities, ...result.map(({id, name}) => ({key: id, label: name}))];
                        console.log("got me some activities");
                    },
                    (error) => {
                        console.dir(error);
                        /*TODO: handle errors*/
                    }
                );
        }
    }

    dfPropertyCommittedRafting(args): void {
        const dataForm = <RadDataForm>args.object;
        const raftingCustomer: RaftingCustomer = <RaftingCustomer> JSON.parse(dataForm.editedObject);

        if (raftingCustomer.activityId !== "0") {
            this.customerService.putCustomerRaftingOptionAction(raftingCustomer)
                .subscribe(
                    () => {
                        console.log("Updated rafting customer");
                    },
                    (error) => {
                        console.dir(error);
                        /*TODO: handle errors*/
                    }
                );
        }
    }

    dfPropertyCommittedCanyoning(args): void {

    }

    dfPropertyCommittedSpecial(args): void {

    }

}
