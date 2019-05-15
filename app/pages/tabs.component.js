"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var nativescript_angular_1 = require("nativescript-angular");
var page_1 = require("tns-core-modules/ui/page");
var app = require("tns-core-modules/application");
var TabsComponent = /** @class */ (function () {
    function TabsComponent(page, routerExtension, activeRoute) {
        this.page = page;
        this.routerExtension = routerExtension;
        this.activeRoute = activeRoute;
        // Use the component constructor to inject providers.
    }
    TabsComponent.prototype.ngOnInit = function () {
        this.routerExtension.navigate([{
                outlets: {
                    materialsTab: ["materials"],
                    weekOverviewTab: ["weekOverview"],
                    sizesTab: ["sizes"],
                    optionsTab: ["options"]
                }
            }], { relativeTo: this.activeRoute });
    };
    TabsComponent.prototype.onDrawerButtonTap = function () {
        var sideDrawer = app.getRootView();
        sideDrawer.showDrawer();
    };
    TabsComponent = __decorate([
        core_1.Component({
            selector: "Tabs",
            moduleId: module.id,
            templateUrl: "./tabs.component.html",
            styleUrls: ["./tabs.component.scss"]
        }),
        __metadata("design:paramtypes", [page_1.Page, nativescript_angular_1.RouterExtensions,
            router_1.ActivatedRoute])
    ], TabsComponent);
    return TabsComponent;
}());
exports.TabsComponent = TabsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFicy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0YWJzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFrRDtBQUNsRCwwQ0FBaUQ7QUFDakQsNkRBQXdEO0FBQ3hELGlEQUFnRDtBQUVoRCxrREFBb0Q7QUFRcEQ7SUFFSSx1QkFBb0IsSUFBVSxFQUFVLGVBQWlDLEVBQ3JELFdBQTJCO1FBRDNCLFNBQUksR0FBSixJQUFJLENBQU07UUFBVSxvQkFBZSxHQUFmLGVBQWUsQ0FBa0I7UUFDckQsZ0JBQVcsR0FBWCxXQUFXLENBQWdCO1FBQzNDLHFEQUFxRDtJQUN6RCxDQUFDO0lBRUQsZ0NBQVEsR0FBUjtRQUNJLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQzNCLE9BQU8sRUFBRTtvQkFDTCxZQUFZLEVBQUUsQ0FBQyxXQUFXLENBQUM7b0JBQzNCLGVBQWUsRUFBRSxDQUFDLGNBQWMsQ0FBQztvQkFDakMsUUFBUSxFQUFFLENBQUMsT0FBTyxDQUFDO29CQUNuQixVQUFVLEVBQUUsQ0FBQyxTQUFTLENBQUM7aUJBQzFCO2FBQ0osQ0FBQyxFQUFFLEVBQUUsVUFBVSxFQUFFLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFFRCx5Q0FBaUIsR0FBakI7UUFDSSxJQUFNLFVBQVUsR0FBa0IsR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3BELFVBQVUsQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUM1QixDQUFDO0lBckJRLGFBQWE7UUFOekIsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxNQUFNO1lBQ2hCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixXQUFXLEVBQUUsdUJBQXVCO1lBQ3BDLFNBQVMsRUFBRSxDQUFDLHVCQUF1QixDQUFDO1NBQ3ZDLENBQUM7eUNBRzRCLFdBQUksRUFBMkIsdUNBQWdCO1lBQ3hDLHVCQUFjO09BSHRDLGFBQWEsQ0FzQnpCO0lBQUQsb0JBQUM7Q0FBQSxBQXRCRCxJQXNCQztBQXRCWSxzQ0FBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXJcIjtcclxuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3BhZ2VcIjtcclxuaW1wb3J0IHtSYWRTaWRlRHJhd2VyfSBmcm9tIFwibmF0aXZlc2NyaXB0LXVpLXNpZGVkcmF3ZXJcIjtcclxuaW1wb3J0ICogYXMgYXBwIGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2FwcGxpY2F0aW9uXCI7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiBcIlRhYnNcIixcclxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3RhYnMuY29tcG9uZW50Lmh0bWxcIixcclxuICAgIHN0eWxlVXJsczogW1wiLi90YWJzLmNvbXBvbmVudC5zY3NzXCJdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBUYWJzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHBhZ2U6IFBhZ2UsIHByaXZhdGUgcm91dGVyRXh0ZW5zaW9uOiBSb3V0ZXJFeHRlbnNpb25zLFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBhY3RpdmVSb3V0ZTogQWN0aXZhdGVkUm91dGUpIHtcclxuICAgICAgICAvLyBVc2UgdGhlIGNvbXBvbmVudCBjb25zdHJ1Y3RvciB0byBpbmplY3QgcHJvdmlkZXJzLlxyXG4gICAgfVxyXG5cclxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMucm91dGVyRXh0ZW5zaW9uLm5hdmlnYXRlKFt7XHJcbiAgICAgICAgICAgIG91dGxldHM6IHtcclxuICAgICAgICAgICAgICAgIG1hdGVyaWFsc1RhYjogW1wibWF0ZXJpYWxzXCJdLFxyXG4gICAgICAgICAgICAgICAgd2Vla092ZXJ2aWV3VGFiOiBbXCJ3ZWVrT3ZlcnZpZXdcIl0sXHJcbiAgICAgICAgICAgICAgICBzaXplc1RhYjogW1wic2l6ZXNcIl0sXHJcbiAgICAgICAgICAgICAgICBvcHRpb25zVGFiOiBbXCJvcHRpb25zXCJdXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XSwgeyByZWxhdGl2ZVRvOiB0aGlzLmFjdGl2ZVJvdXRlIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIG9uRHJhd2VyQnV0dG9uVGFwKCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IHNpZGVEcmF3ZXIgPSA8UmFkU2lkZURyYXdlcj5hcHAuZ2V0Um9vdFZpZXcoKTtcclxuICAgICAgICBzaWRlRHJhd2VyLnNob3dEcmF3ZXIoKTtcclxuICAgIH1cclxufVxyXG4iXX0=