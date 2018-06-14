"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var app = require("tns-core-modules/application");
var page_1 = require("tns-core-modules/ui/page");
var guide_service_1 = require("~/shared/services/guide.service");
var MaterialsSettingsComponent = /** @class */ (function () {
    function MaterialsSettingsComponent(guideService, page) {
        this.guideService = guideService;
        this.page = page;
        this.guides = [];
        this.items = {};
        this.hasGuides = false;
        this.selectedIndex = 0;
    }
    MaterialsSettingsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.page.on(page_1.Page.navigatingToEvent, function () {
            _this.getGuides();
        });
    };
    MaterialsSettingsComponent.prototype.selectedIndexChanged = function (args) {
        var picker = args.object;
        var appSettings = require("application-settings");
        if (this.guides.length > 0) {
            appSettings.setNumber("guideIndex", picker.selectedIndex);
            this.guide = this.guides[picker.selectedIndex];
            appSettings.setString("guideId", this.guide.id);
        }
    };
    MaterialsSettingsComponent.prototype.getGuides = function () {
        var _this = this;
        var appSettings = require("application-settings");
        var locationId = "1";
        if (appSettings.hasKey("locationId")) {
            locationId = appSettings.getString("locationId");
        }
        var now = new Date();
        var date = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate();
        if (appSettings.hasKey("materialDate")) {
            date = appSettings.getString("materialDate");
        }
        this.guideService.getAllGuidesForWeekAndLocationAction(date, locationId)
            .subscribe(function (result) {
            _this.guides = result;
            if (_this.guides.length > 0) {
                _this.items = {
                    items: _this.guides,
                    length: _this.guides.length,
                    getItem: function (index) {
                        var item = this.items[index];
                        return item.guideShort + " - " + item.guideFirstName + " - " + item.guideLastName;
                    }
                };
                _this.hasGuides = true;
                console.log("found me some guides");
            }
            _this.selectedIndex = appSettings.hasKey("guideIndex") ?
                appSettings.getNumber("guideIndex") : 0;
        }, function (error) {
            console.dir(error);
            _this.hasGuides = false;
            /*TODO: handle errors*/
        });
    };
    MaterialsSettingsComponent.prototype.onDrawerButtonTap = function () {
        var sideDrawer = app.getRootView();
        sideDrawer.showDrawer();
    };
    MaterialsSettingsComponent = __decorate([
        core_1.Component({
            selector: "MaterialsSettings",
            moduleId: module.id,
            providers: [guide_service_1.GuideService],
            templateUrl: "./materials-settings.component.html"
        }),
        __metadata("design:paramtypes", [guide_service_1.GuideService, page_1.Page])
    ], MaterialsSettingsComponent);
    return MaterialsSettingsComponent;
}());
exports.MaterialsSettingsComponent = MaterialsSettingsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0ZXJpYWxzLXNldHRpbmdzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1hdGVyaWFscy1zZXR0aW5ncy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBa0Q7QUFFbEQsa0RBQW9EO0FBR3BELGlEQUFnRDtBQUVoRCxpRUFBK0Q7QUFRL0Q7SUFPSSxvQ0FBb0IsWUFBMEIsRUFBVSxJQUFVO1FBQTlDLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQVUsU0FBSSxHQUFKLElBQUksQ0FBTTtRQU5sRSxXQUFNLEdBQWlCLEVBQUUsQ0FBQztRQUMxQixVQUFLLEdBQVcsRUFBRSxDQUFDO1FBRW5CLGNBQVMsR0FBWSxLQUFLLENBQUM7UUFDM0Isa0JBQWEsR0FBVyxDQUFDLENBQUM7SUFHMUIsQ0FBQztJQUVELDZDQUFRLEdBQVI7UUFBQSxpQkFJQztRQUhHLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFdBQUksQ0FBQyxpQkFBaUIsRUFBRTtZQUNqQyxLQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDckIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQseURBQW9CLEdBQXBCLFVBQXFCLElBQUk7UUFDckIsSUFBTSxNQUFNLEdBQWUsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUN2QyxJQUFNLFdBQVcsR0FBRyxPQUFPLENBQUMsc0JBQXNCLENBQUMsQ0FBQztRQUVwRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3pCLFdBQVcsQ0FBQyxTQUFTLENBQUMsWUFBWSxFQUFFLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUMxRCxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQy9DLFdBQVcsQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFLElB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bnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBSYWRTaWRlRHJhd2VyIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC11aS1zaWRlZHJhd2VyXCI7XHJcbmltcG9ydCAqIGFzIGFwcCBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9hcHBsaWNhdGlvblwiO1xyXG5pbXBvcnQgeyBEYXRlUGlja2VyIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvZGF0ZS1waWNrZXJcIjtcclxuaW1wb3J0IHsgTGlzdFBpY2tlciB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2xpc3QtcGlja2VyXCI7XHJcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9wYWdlXCI7XHJcbmltcG9ydCB7IEd1aWRlIH0gZnJvbSBcIn4vc2hhcmVkL21vZGVscy9ndWlkZS5tb2RlbFwiO1xyXG5pbXBvcnQgeyBHdWlkZVNlcnZpY2UgfSBmcm9tIFwifi9zaGFyZWQvc2VydmljZXMvZ3VpZGUuc2VydmljZVwiO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogXCJNYXRlcmlhbHNTZXR0aW5nc1wiLFxyXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICAgIHByb3ZpZGVyczogW0d1aWRlU2VydmljZV0sXHJcbiAgICB0ZW1wbGF0ZVVybDogXCIuL21hdGVyaWFscy1zZXR0aW5ncy5jb21wb25lbnQuaHRtbFwiXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBNYXRlcmlhbHNTZXR0aW5nc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgICBndWlkZXM6IEFycmF5PEd1aWRlPiA9IFtdO1xyXG4gICAgaXRlbXM6IG9iamVjdCA9IHt9O1xyXG4gICAgZ3VpZGU6IEd1aWRlO1xyXG4gICAgaGFzR3VpZGVzOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBzZWxlY3RlZEluZGV4OiBudW1iZXIgPSAwO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZ3VpZGVTZXJ2aWNlOiBHdWlkZVNlcnZpY2UsIHByaXZhdGUgcGFnZTogUGFnZSkge1xyXG4gICAgfVxyXG5cclxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMucGFnZS5vbihQYWdlLm5hdmlnYXRpbmdUb0V2ZW50LCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2V0R3VpZGVzKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2VsZWN0ZWRJbmRleENoYW5nZWQoYXJncykge1xyXG4gICAgICAgIGNvbnN0IHBpY2tlciA9IDxMaXN0UGlja2VyPmFyZ3Mub2JqZWN0O1xyXG4gICAgICAgIGNvbnN0IGFwcFNldHRpbmdzID0gcmVxdWlyZShcImFwcGxpY2F0aW9uLXNldHRpbmdzXCIpO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5ndWlkZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBhcHBTZXR0aW5ncy5zZXROdW1iZXIoXCJndWlkZUluZGV4XCIsIHBpY2tlci5zZWxlY3RlZEluZGV4KTtcclxuICAgICAgICAgICAgdGhpcy5ndWlkZSA9IHRoaXMuZ3VpZGVzW3BpY2tlci5zZWxlY3RlZEluZGV4XTtcclxuICAgICAgICAgICAgYXBwU2V0dGluZ3Muc2V0U3RyaW5nKFwiZ3VpZGVJZFwiLCB0aGlzLmd1aWRlLmlkKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGdldEd1aWRlcygpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBhcHBTZXR0aW5ncyA9IHJlcXVpcmUoXCJhcHBsaWNhdGlvbi1zZXR0aW5nc1wiKTtcclxuICAgICAgICBsZXQgbG9jYXRpb25JZDogc3RyaW5nID0gXCIxXCI7XHJcbiAgICAgICAgaWYgKGFwcFNldHRpbmdzLmhhc0tleShcImxvY2F0aW9uSWRcIikpIHtcclxuICAgICAgICAgICAgbG9jYXRpb25JZCA9IGFwcFNldHRpbmdzLmdldFN0cmluZyhcImxvY2F0aW9uSWRcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBub3cgPSBuZXcgRGF0ZSgpO1xyXG4gICAgICAgIGxldCBkYXRlOiBzdHJpbmcgPSBub3cuZ2V0RnVsbFllYXIoKSArIFwiLVwiICsgKG5vdy5nZXRNb250aCgpICsgMSkgKyBcIi1cIiArIG5vdy5nZXREYXRlKCk7XHJcbiAgICAgICAgaWYgKGFwcFNldHRpbmdzLmhhc0tleShcIm1hdGVyaWFsRGF0ZVwiKSkge1xyXG4gICAgICAgICAgICBkYXRlID0gYXBwU2V0dGluZ3MuZ2V0U3RyaW5nKFwibWF0ZXJpYWxEYXRlXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5ndWlkZVNlcnZpY2UuZ2V0QWxsR3VpZGVzRm9yV2Vla0FuZExvY2F0aW9uQWN0aW9uKGRhdGUsIGxvY2F0aW9uSWQpXHJcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAgICAgICAocmVzdWx0OiBBcnJheTxHdWlkZT4pID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ndWlkZXMgPSByZXN1bHQ7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmd1aWRlcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaXRlbXMgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtczogdGhpcy5ndWlkZXMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZW5ndGg6IHRoaXMuZ3VpZGVzLmxlbmd0aCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdldEl0ZW0oaW5kZXgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBpdGVtID0gdGhpcy5pdGVtc1tpbmRleF07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpdGVtLmd1aWRlU2hvcnQgKyBcIiAtIFwiICsgaXRlbS5ndWlkZUZpcnN0TmFtZSArIFwiIC0gXCIgKyBpdGVtLmd1aWRlTGFzdE5hbWU7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhhc0d1aWRlcyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZm91bmQgbWUgc29tZSBndWlkZXNcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkSW5kZXggPSBhcHBTZXR0aW5ncy5oYXNLZXkoXCJndWlkZUluZGV4XCIpID9cclxuICAgICAgICAgICAgICAgICAgICAgICAgYXBwU2V0dGluZ3MuZ2V0TnVtYmVyKFwiZ3VpZGVJbmRleFwiKSA6IDA7XHJcblxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZGlyKGVycm9yKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhc0d1aWRlcyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIC8qVE9ETzogaGFuZGxlIGVycm9ycyovXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgb25EcmF3ZXJCdXR0b25UYXAoKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3Qgc2lkZURyYXdlciA9IDxSYWRTaWRlRHJhd2VyPmFwcC5nZXRSb290VmlldygpO1xyXG4gICAgICAgIHNpZGVEcmF3ZXIuc2hvd0RyYXdlcigpO1xyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=