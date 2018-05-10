import { Component, OnInit } from "@angular/core";
import * as app from "application";

@Component({
    selector: "Materials",
    moduleId: module.id,
    templateUrl: "./materials.component.html"
})
export class MaterialsComponent implements OnInit {

    constructor() {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        // Init your component properties here.
    }
}
