"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var routes = [
    { path: "", redirectTo: "/login", pathMatch: "full" },
    { path: "login", loadChildren: "~/pages/login/login.module#LoginModule" },
    { path: "settings", loadChildren: "~/pages/settings/settings.module#SettingsModule" },
    { path: "busgo", loadChildren: "~/pages/busgo/busgo.module#BusgoModule" },
    { path: "busback", loadChildren: "~/pages/busback/busback.module#BusbackModule" },
    { path: "volpension", loadChildren: "~/pages/volpension/volpension.module#VolpensionModule" },
    { path: "lodging", loadChildren: "~/pages/lodging/lodging.module#LodgingModule" },
    { path: "groep", loadChildren: "~/pages/groep/groep.module#GroepModule" },
    { path: "checkin", loadChildren: "~/pages/checkin/checkin.module#CheckinModule" },
    { path: "planning", loadChildren: "~/pages/planning/planning.module#PlanningModule" },
    { path: "payments", loadChildren: "~/pages/payments/payments.module#PaymentsModule" },
    { path: "bill", loadChildren: "~/pages/bill/bill.module#BillModule" },
    {
        path: "tabs",
        loadChildren: "~/pages/tabs.module#TabsModule"
    }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.NativeScriptRouterModule.forRoot(routes)],
            exports: [router_1.NativeScriptRouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
exports.navigatableComponents = [];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLXJvdXRpbmcubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBwLXJvdXRpbmcubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQXlDO0FBRXpDLHNEQUF1RTtBQUV2RSxJQUFNLE1BQU0sR0FBVztJQUNuQixFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFO0lBQ3JELEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxZQUFZLEVBQUUsd0NBQXdDLEVBQUU7SUFDekUsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxpREFBaUQsRUFBRTtJQUNyRixFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsWUFBWSxFQUFFLHdDQUF3QyxFQUFFO0lBQ3pFLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsOENBQThDLEVBQUU7SUFDakYsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSx1REFBdUQsRUFBRTtJQUM3RixFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLDhDQUE4QyxFQUFFO0lBQ2pGLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxZQUFZLEVBQUUsd0NBQXdDLEVBQUU7SUFDekUsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSw4Q0FBOEMsRUFBRTtJQUNqRixFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLGlEQUFpRCxFQUFFO0lBQ3JGLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsaURBQWlELEVBQUU7SUFDckYsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxxQ0FBcUMsRUFBRTtJQUNyRTtRQUNJLElBQUksRUFBRSxNQUFNO1FBQ1osWUFBWSxFQUFFLGdDQUFnQztLQUNqRDtDQUNKLENBQUM7QUFNRjtJQUFBO0lBQWdDLENBQUM7SUFBcEIsZ0JBQWdCO1FBSjVCLGVBQVEsQ0FBQztZQUNOLE9BQU8sRUFBRSxDQUFDLGlDQUF3QixDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNuRCxPQUFPLEVBQUUsQ0FBQyxpQ0FBd0IsQ0FBQztTQUN0QyxDQUFDO09BQ1csZ0JBQWdCLENBQUk7SUFBRCx1QkFBQztDQUFBLEFBQWpDLElBQWlDO0FBQXBCLDRDQUFnQjtBQUVoQixRQUFBLHFCQUFxQixHQUFHLEVBQ3BDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IFJvdXRlcyB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgTmF0aXZlU2NyaXB0Um91dGVyTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xyXG5cclxuY29uc3Qgcm91dGVzOiBSb3V0ZXMgPSBbXHJcbiAgICB7IHBhdGg6IFwiXCIsIHJlZGlyZWN0VG86IFwiL2xvZ2luXCIsIHBhdGhNYXRjaDogXCJmdWxsXCIgfSxcclxuICAgIHsgcGF0aDogXCJsb2dpblwiLCBsb2FkQ2hpbGRyZW46IFwifi9wYWdlcy9sb2dpbi9sb2dpbi5tb2R1bGUjTG9naW5Nb2R1bGVcIiB9LFxyXG4gICAgeyBwYXRoOiBcInNldHRpbmdzXCIsIGxvYWRDaGlsZHJlbjogXCJ+L3BhZ2VzL3NldHRpbmdzL3NldHRpbmdzLm1vZHVsZSNTZXR0aW5nc01vZHVsZVwiIH0sXHJcbiAgICB7IHBhdGg6IFwiYnVzZ29cIiwgbG9hZENoaWxkcmVuOiBcIn4vcGFnZXMvYnVzZ28vYnVzZ28ubW9kdWxlI0J1c2dvTW9kdWxlXCIgfSxcclxuICAgIHsgcGF0aDogXCJidXNiYWNrXCIsIGxvYWRDaGlsZHJlbjogXCJ+L3BhZ2VzL2J1c2JhY2svYnVzYmFjay5tb2R1bGUjQnVzYmFja01vZHVsZVwiIH0sXHJcbiAgICB7IHBhdGg6IFwidm9scGVuc2lvblwiLCBsb2FkQ2hpbGRyZW46IFwifi9wYWdlcy92b2xwZW5zaW9uL3ZvbHBlbnNpb24ubW9kdWxlI1ZvbHBlbnNpb25Nb2R1bGVcIiB9LFxyXG4gICAgeyBwYXRoOiBcImxvZGdpbmdcIiwgbG9hZENoaWxkcmVuOiBcIn4vcGFnZXMvbG9kZ2luZy9sb2RnaW5nLm1vZHVsZSNMb2RnaW5nTW9kdWxlXCIgfSxcclxuICAgIHsgcGF0aDogXCJncm9lcFwiLCBsb2FkQ2hpbGRyZW46IFwifi9wYWdlcy9ncm9lcC9ncm9lcC5tb2R1bGUjR3JvZXBNb2R1bGVcIiB9LFxyXG4gICAgeyBwYXRoOiBcImNoZWNraW5cIiwgbG9hZENoaWxkcmVuOiBcIn4vcGFnZXMvY2hlY2tpbi9jaGVja2luLm1vZHVsZSNDaGVja2luTW9kdWxlXCIgfSxcclxuICAgIHsgcGF0aDogXCJwbGFubmluZ1wiLCBsb2FkQ2hpbGRyZW46IFwifi9wYWdlcy9wbGFubmluZy9wbGFubmluZy5tb2R1bGUjUGxhbm5pbmdNb2R1bGVcIiB9LFxyXG4gICAgeyBwYXRoOiBcInBheW1lbnRzXCIsIGxvYWRDaGlsZHJlbjogXCJ+L3BhZ2VzL3BheW1lbnRzL3BheW1lbnRzLm1vZHVsZSNQYXltZW50c01vZHVsZVwiIH0sXHJcbiAgICB7IHBhdGg6IFwiYmlsbFwiLCBsb2FkQ2hpbGRyZW46IFwifi9wYWdlcy9iaWxsL2JpbGwubW9kdWxlI0JpbGxNb2R1bGVcIiB9LFxyXG4gICAge1xyXG4gICAgICAgIHBhdGg6IFwidGFic1wiLFxyXG4gICAgICAgIGxvYWRDaGlsZHJlbjogXCJ+L3BhZ2VzL3RhYnMubW9kdWxlI1RhYnNNb2R1bGVcIlxyXG4gICAgfVxyXG5dO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICAgIGltcG9ydHM6IFtOYXRpdmVTY3JpcHRSb3V0ZXJNb2R1bGUuZm9yUm9vdChyb3V0ZXMpXSxcclxuICAgIGV4cG9ydHM6IFtOYXRpdmVTY3JpcHRSb3V0ZXJNb2R1bGVdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBcHBSb3V0aW5nTW9kdWxlIHsgfVxyXG5cclxuZXhwb3J0IGNvbnN0IG5hdmlnYXRhYmxlQ29tcG9uZW50cyA9IFtcclxuXTtcclxuIl19