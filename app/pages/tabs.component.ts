import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RouterExtensions } from "nativescript-angular";
import { Page } from "tns-core-modules/ui/page";

@Component({
    selector: "Tabs",
    moduleId: module.id,
    templateUrl: "./tabs.component.html",
    styleUrls: ["./tabs.component.scss"]
})
export class TabsComponent implements OnInit {

    constructor(private page: Page, private routerExtension: RouterExtensions,
                private activeRoute: ActivatedRoute) {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        this.page.actionBarHidden = true;
        // Init your component properties here.
        this.page.backgroundSpanUnderStatusBar = true;
        this.page.on("loaded", (args) => {
            if (this.page.android) {
                this.page.android.setFitsSystemWindows(true);
            }
        });

        this.routerExtension.navigate([{
            outlets: {
                materialsTab: ["materials"],
                weekOverviewTab: ["weekOverview"],
                sizesTab: ["sizes"],
                optionsTab: ["options"]
            }
        }], { relativeTo: this.activeRoute });
    }
}
