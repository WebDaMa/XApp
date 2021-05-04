import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { RadDataForm } from "nativescript-ui-dataform";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { GroupsActionComponent } from "~/components/groups-action/groups-action.component";
import { Group } from "~/shared/models/groep.model";
import { SizeCustomer } from "~/shared/models/sizeCustomer.model";
import { SuitSize } from "~/shared/models/suitSize.model";
import { CustomerService } from "~/shared/services/customer.service";
import { SuitSizeService } from "~/shared/services/suitSize.service";

@Component({
    selector: "Sizes",
    moduleId: module.id,
    providers: [CustomerService, SuitSizeService],
    templateUrl: "./sizes.component.html"
})
export class SizesComponent implements AfterViewInit {
    isBusy: boolean = false;

    customers: Array<SizeCustomer> = [];
    sizes: Array<object> = [];

    @ViewChild(GroupsActionComponent, {static: false}) groupsAction: GroupsActionComponent;
    constructor(
        private customerService: CustomerService,
        private suitSizeService: SuitSizeService
    ) {}

    ngAfterViewInit() {
        this.groupsAction.groupEmitter.subscribe((group: Group) => {
            this.getSizes();
        });
    }

    getCustomers(): void {
        this.isBusy = true;
        this.customerService.getAllByGroepAction(this.groupsAction.group.id)
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
        if (this.sizes.length === 0) {
            this.isBusy = true;
            this.suitSizeService.getAllAction()
                .subscribe(
                    (result: Array<SuitSize>) => {
                        this.sizes = [{key: null, label: "Kies een Maat"}];
                        this.sizes = [...this.sizes, ...result.map(({id, name}) => ({key: id, label: name}))];
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

}
