import { Component, OnInit } from "@angular/core";

@Component({
    selector: "MaterialsSettings",
    moduleId: module.id,
    templateUrl: "./materials-settings.component.html"
})
export class MaterialsSettingsComponent implements OnInit {
    private _title: string;

    constructor() {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        // Init your component properties here.
        this._title = "Materiaal Settings";
    }
}
