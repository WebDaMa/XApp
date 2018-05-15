import { Component, OnInit } from "@angular/core";

@Component({
    selector: "Materials",
    moduleId: module.id,
    templateUrl: "./materials.component.html"
})
export class MaterialsComponent implements OnInit {
    private _title: string;

    constructor() {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        // Init your component properties here.
        this._title = "Materiaal";
    }
}
