import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular";
import * as TNSPhone from "nativescript-phone";
import { RadDataForm } from "nativescript-ui-dataform";
import { Settings } from "~/settings/settings";
import { BusCustomer } from "~/shared/models/busCustomer.model";
import { BusPlace } from "~/shared/models/busPlace.model";
import { CheckinBus } from "~/shared/models/checkinBus.model";
import { CustomerService } from "~/shared/services/customer.service";
import {RadSideDrawer} from "nativescript-ui-sidedrawer";
import * as app from "application";

@Component({
    selector: "Busgo",
    moduleId: module.id,
    providers: [CustomerService],
    templateUrl: "./busgo.component.html"
})
export class BusgoComponent implements OnInit {

    checkinBusGo: CheckinBus = {
        total: "0",
        places: [],
        date: ""
    };

    selectedPlace: BusPlace = {
        total: "0",
        totals: [],
        place: "",
        customers: []
    };

    isBusy: boolean;

    constructor(private customerService: CustomerService, private routerExtensions: RouterExtensions) {
    }

    ngOnInit(): void {
        this.getCustomersBusGo();
    }

    getCustomersBusGo(): void {
        const date = Settings.getDate();
        this.isBusy = true;

        this.customerService.getBusGoCustomersByWeek(date)
            .subscribe(
                (result: CheckinBus) => {
                    this.checkinBusGo = result;
                    console.log("got me some bus customers");
                    this.isBusy = false;
                },
                (error) => {
                    console.dir(error);
                    this.isBusy = false;
                    /*TODO: handle errors*/
                }
            );
    }

    dfPropertyGoCommitted(args: any): void {
        const dataForm = <RadDataForm>args.object;
        const busCostumer: BusCustomer = <BusCustomer> JSON.parse(dataForm.editedObject);

        this.isBusy = true;

        this.customerService.putBusGoCustomerAction(busCostumer)
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

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    callNumber(phoneNumber): void {
        // Dial a phone number.
        TNSPhone.requestCallPermission("You should accept the permission to be able to make a direct phone call.")
            .then(() => TNSPhone.dial(phoneNumber, false))
            .catch(() => TNSPhone.dial(phoneNumber, true));
    }

    selectPlace(place: BusPlace): void {
        this.selectedPlace = place;
    }

    isSelectedColor(place: BusPlace): string {
        if (place === this.selectedPlace) {
            return "#70b32e";
        }

        return "#e5e5e5";
    }

    isTotal(total: string): boolean {
        return Number(total) + 1 < 2;
    }
}
