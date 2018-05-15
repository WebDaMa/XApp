import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RouterExtensions } from "nativescript-angular";

@Component({
    selector: "Materials",
    moduleId: module.id,
    templateUrl: "./materials.component.html"
})
export class MaterialsComponent implements OnInit {
    private _title: string;

    constructor(private router: RouterExtensions, private route: ActivatedRoute) {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        // Init your component properties here.
        this._title = "Materiaal";
    }
}
