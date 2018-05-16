import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RouterExtensions } from "nativescript-angular";
import { Size } from "~/shared/size/size";
import { SizeTotal } from "~/shared/size/sizeTotal";

@Component({
    selector: "Materials",
    moduleId: module.id,
    templateUrl: "./materials.component.html"
})
export class MaterialsComponent implements OnInit {
    private _sizeTotals: Array<SizeTotal>;
    private _beltTotals: Array<SizeTotal>;
    private _helmetTotals: Array<SizeTotal>;
    private _userSizes: Array<Size>;

    constructor(private router: RouterExtensions, private route: ActivatedRoute) {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        // Init your component properties here.
        this.sizeTotals = [
            {
                size: "XS",
                total: 2
            },
            {
                size: "S",
                total: 3
            },
            {
                size: "M",
                total: 5
            },
            {
                size: "ML",
                total: 1
            }
        ];

        this.beltTotals = [
            {
                size: "M",
                total: 11
            },
            {
                size: "L",
                total: 3
            }
        ];

        this.helmetTotals = [
            {
                size: "kids",
                total: 2
            },
            {
                size: "VW",
                total: 12
            }
        ];

        this.userSizes = [
            {
                customer: "Anne Vanderhallen",
                size: "ML",
                sizeInfo: "rood"
            },
            {
                customer: "Ella Desimpelaere",
                size: "M",
                sizeInfo: "1-delig rood"
            },
            {
                customer: "Emiel Van Hecke",
                size: "XS",
                sizeInfo: ""
            },
            {
                customer: "Fien Verschueren",
                size: "XS",
                sizeInfo: ""
            }
        ];
    }

    get sizeTotals(): Array<SizeTotal> {
        return this._sizeTotals;
    }

    set sizeTotals(value: Array<SizeTotal>) {
        this._sizeTotals = value;
    }

    get beltTotals(): Array<SizeTotal> {
        return this._beltTotals;
    }

    set beltTotals(value: Array<SizeTotal>) {
        this._beltTotals = value;
    }

    get helmetTotals(): Array<SizeTotal> {
        return this._helmetTotals;
    }

    set helmetTotals(value: Array<SizeTotal>) {
        this._helmetTotals = value;
    }

    get userSizes(): Array<Size> {
        return this._userSizes;
    }

    set userSizes(value: Array<Size>) {
        this._userSizes = value;
    }
}
