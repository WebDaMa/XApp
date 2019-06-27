import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RouterExtensions } from "nativescript-angular";
import { Page } from "tns-core-modules/ui/page";

@Component({
    selector: "MaterialsSettings",
    moduleId: module.id,
    templateUrl: "./materials-settings.component.html"
})
export class MaterialsSettingsComponent {

    constructor(private page: Page, private routerExtensions: RouterExtensions,
                private activeRoute: ActivatedRoute) {
    }

    goBack() {
        this.routerExtensions.back({
            relativeTo: this.activeRoute
        });
    }

}
