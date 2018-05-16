"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var nativescript_angular_1 = require("nativescript-angular");
var MaterialsComponent = /** @class */ (function () {
    function MaterialsComponent(router, route) {
        this.router = router;
        this.route = route;
        // Use the component constructor to inject providers.
    }
    MaterialsComponent.prototype.ngOnInit = function () {
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
    };
    Object.defineProperty(MaterialsComponent.prototype, "sizeTotals", {
        get: function () {
            return this._sizeTotals;
        },
        set: function (value) {
            this._sizeTotals = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MaterialsComponent.prototype, "beltTotals", {
        get: function () {
            return this._beltTotals;
        },
        set: function (value) {
            this._beltTotals = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MaterialsComponent.prototype, "helmetTotals", {
        get: function () {
            return this._helmetTotals;
        },
        set: function (value) {
            this._helmetTotals = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MaterialsComponent.prototype, "userSizes", {
        get: function () {
            return this._userSizes;
        },
        set: function (value) {
            this._userSizes = value;
        },
        enumerable: true,
        configurable: true
    });
    MaterialsComponent = __decorate([
        core_1.Component({
            selector: "Materials",
            moduleId: module.id,
            templateUrl: "./materials.component.html"
        }),
        __metadata("design:paramtypes", [nativescript_angular_1.RouterExtensions, router_1.ActivatedRoute])
    ], MaterialsComponent);
    return MaterialsComponent;
}());
exports.MaterialsComponent = MaterialsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0ZXJpYWxzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1hdGVyaWFscy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBa0Q7QUFDbEQsMENBQWlEO0FBQ2pELDZEQUF3RDtBQVN4RDtJQU1JLDRCQUFvQixNQUF3QixFQUFVLEtBQXFCO1FBQXZELFdBQU0sR0FBTixNQUFNLENBQWtCO1FBQVUsVUFBSyxHQUFMLEtBQUssQ0FBZ0I7UUFDdkUscURBQXFEO0lBQ3pELENBQUM7SUFFRCxxQ0FBUSxHQUFSO1FBQ0ksdUNBQXVDO1FBQ3ZDLElBQUksQ0FBQyxVQUFVLEdBQUc7WUFDZDtnQkFDSSxJQUFJLEVBQUUsSUFBSTtnQkFDVixLQUFLLEVBQUUsQ0FBQzthQUNYO1lBQ0Q7Z0JBQ0ksSUFBSSxFQUFFLEdBQUc7Z0JBQ1QsS0FBSyxFQUFFLENBQUM7YUFDWDtZQUNEO2dCQUNJLElBQUksRUFBRSxHQUFHO2dCQUNULEtBQUssRUFBRSxDQUFDO2FBQ1g7WUFDRDtnQkFDSSxJQUFJLEVBQUUsSUFBSTtnQkFDVixLQUFLLEVBQUUsQ0FBQzthQUNYO1NBQ0osQ0FBQztRQUVGLElBQUksQ0FBQyxVQUFVLEdBQUc7WUFDZDtnQkFDSSxJQUFJLEVBQUUsR0FBRztnQkFDVCxLQUFLLEVBQUUsRUFBRTthQUNaO1lBQ0Q7Z0JBQ0ksSUFBSSxFQUFFLEdBQUc7Z0JBQ1QsS0FBSyxFQUFFLENBQUM7YUFDWDtTQUNKLENBQUM7UUFFRixJQUFJLENBQUMsWUFBWSxHQUFHO1lBQ2hCO2dCQUNJLElBQUksRUFBRSxNQUFNO2dCQUNaLEtBQUssRUFBRSxDQUFDO2FBQ1g7WUFDRDtnQkFDSSxJQUFJLEVBQUUsSUFBSTtnQkFDVixLQUFLLEVBQUUsRUFBRTthQUNaO1NBQ0osQ0FBQztRQUVGLElBQUksQ0FBQyxTQUFTLEdBQUc7WUFDYjtnQkFDSSxRQUFRLEVBQUUsbUJBQW1CO2dCQUM3QixJQUFJLEVBQUUsSUFBSTtnQkFDVixRQUFRLEVBQUUsTUFBTTthQUNuQjtZQUNEO2dCQUNJLFFBQVEsRUFBRSxtQkFBbUI7Z0JBQzdCLElBQUksRUFBRSxHQUFHO2dCQUNULFFBQVEsRUFBRSxjQUFjO2FBQzNCO1lBQ0Q7Z0JBQ0ksUUFBUSxFQUFFLGlCQUFpQjtnQkFDM0IsSUFBSSxFQUFFLElBQUk7Z0JBQ1YsUUFBUSxFQUFFLEVBQUU7YUFDZjtZQUNEO2dCQUNJLFFBQVEsRUFBRSxrQkFBa0I7Z0JBQzVCLElBQUksRUFBRSxJQUFJO2dCQUNWLFFBQVEsRUFBRSxFQUFFO2FBQ2Y7U0FDSixDQUFDO0lBQ04sQ0FBQztJQUVELHNCQUFJLDBDQUFVO2FBQWQ7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUM1QixDQUFDO2FBRUQsVUFBZSxLQUF1QjtZQUNsQyxJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztRQUM3QixDQUFDOzs7T0FKQTtJQU1ELHNCQUFJLDBDQUFVO2FBQWQ7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUM1QixDQUFDO2FBRUQsVUFBZSxLQUF1QjtZQUNsQyxJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztRQUM3QixDQUFDOzs7T0FKQTtJQU1ELHNCQUFJLDRDQUFZO2FBQWhCO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUM7UUFDOUIsQ0FBQzthQUVELFVBQWlCLEtBQXVCO1lBQ3BDLElBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO1FBQy9CLENBQUM7OztPQUpBO0lBTUQsc0JBQUkseUNBQVM7YUFBYjtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQzNCLENBQUM7YUFFRCxVQUFjLEtBQWtCO1lBQzVCLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO1FBQzVCLENBQUM7OztPQUpBO0lBdkdRLGtCQUFrQjtRQUw5QixnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLFdBQVc7WUFDckIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSw0QkFBNEI7U0FDNUMsQ0FBQzt5Q0FPOEIsdUNBQWdCLEVBQWlCLHVCQUFjO09BTmxFLGtCQUFrQixDQTRHOUI7SUFBRCx5QkFBQztDQUFBLEFBNUdELElBNEdDO0FBNUdZLGdEQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXJcIjtcclxuaW1wb3J0IHsgU2l6ZSB9IGZyb20gXCJ+L3NoYXJlZC9zaXplL3NpemVcIjtcclxuaW1wb3J0IHsgU2l6ZVRvdGFsIH0gZnJvbSBcIn4vc2hhcmVkL3NpemUvc2l6ZVRvdGFsXCI7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiBcIk1hdGVyaWFsc1wiLFxyXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICAgIHRlbXBsYXRlVXJsOiBcIi4vbWF0ZXJpYWxzLmNvbXBvbmVudC5odG1sXCJcclxufSlcclxuZXhwb3J0IGNsYXNzIE1hdGVyaWFsc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgICBwcml2YXRlIF9zaXplVG90YWxzOiBBcnJheTxTaXplVG90YWw+O1xyXG4gICAgcHJpdmF0ZSBfYmVsdFRvdGFsczogQXJyYXk8U2l6ZVRvdGFsPjtcclxuICAgIHByaXZhdGUgX2hlbG1ldFRvdGFsczogQXJyYXk8U2l6ZVRvdGFsPjtcclxuICAgIHByaXZhdGUgX3VzZXJTaXplczogQXJyYXk8U2l6ZT47XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXI6IFJvdXRlckV4dGVuc2lvbnMsIHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlKSB7XHJcbiAgICAgICAgLy8gVXNlIHRoZSBjb21wb25lbnQgY29uc3RydWN0b3IgdG8gaW5qZWN0IHByb3ZpZGVycy5cclxuICAgIH1cclxuXHJcbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgICAgICAvLyBJbml0IHlvdXIgY29tcG9uZW50IHByb3BlcnRpZXMgaGVyZS5cclxuICAgICAgICB0aGlzLnNpemVUb3RhbHMgPSBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHNpemU6IFwiWFNcIixcclxuICAgICAgICAgICAgICAgIHRvdGFsOiAyXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHNpemU6IFwiU1wiLFxyXG4gICAgICAgICAgICAgICAgdG90YWw6IDNcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc2l6ZTogXCJNXCIsXHJcbiAgICAgICAgICAgICAgICB0b3RhbDogNVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzaXplOiBcIk1MXCIsXHJcbiAgICAgICAgICAgICAgICB0b3RhbDogMVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgXTtcclxuXHJcbiAgICAgICAgdGhpcy5iZWx0VG90YWxzID0gW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzaXplOiBcIk1cIixcclxuICAgICAgICAgICAgICAgIHRvdGFsOiAxMVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzaXplOiBcIkxcIixcclxuICAgICAgICAgICAgICAgIHRvdGFsOiAzXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBdO1xyXG5cclxuICAgICAgICB0aGlzLmhlbG1ldFRvdGFscyA9IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc2l6ZTogXCJraWRzXCIsXHJcbiAgICAgICAgICAgICAgICB0b3RhbDogMlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzaXplOiBcIlZXXCIsXHJcbiAgICAgICAgICAgICAgICB0b3RhbDogMTJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIF07XHJcblxyXG4gICAgICAgIHRoaXMudXNlclNpemVzID0gW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjdXN0b21lcjogXCJBbm5lIFZhbmRlcmhhbGxlblwiLFxyXG4gICAgICAgICAgICAgICAgc2l6ZTogXCJNTFwiLFxyXG4gICAgICAgICAgICAgICAgc2l6ZUluZm86IFwicm9vZFwiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGN1c3RvbWVyOiBcIkVsbGEgRGVzaW1wZWxhZXJlXCIsXHJcbiAgICAgICAgICAgICAgICBzaXplOiBcIk1cIixcclxuICAgICAgICAgICAgICAgIHNpemVJbmZvOiBcIjEtZGVsaWcgcm9vZFwiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGN1c3RvbWVyOiBcIkVtaWVsIFZhbiBIZWNrZVwiLFxyXG4gICAgICAgICAgICAgICAgc2l6ZTogXCJYU1wiLFxyXG4gICAgICAgICAgICAgICAgc2l6ZUluZm86IFwiXCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY3VzdG9tZXI6IFwiRmllbiBWZXJzY2h1ZXJlblwiLFxyXG4gICAgICAgICAgICAgICAgc2l6ZTogXCJYU1wiLFxyXG4gICAgICAgICAgICAgICAgc2l6ZUluZm86IFwiXCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIF07XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHNpemVUb3RhbHMoKTogQXJyYXk8U2l6ZVRvdGFsPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NpemVUb3RhbHM7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IHNpemVUb3RhbHModmFsdWU6IEFycmF5PFNpemVUb3RhbD4pIHtcclxuICAgICAgICB0aGlzLl9zaXplVG90YWxzID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGJlbHRUb3RhbHMoKTogQXJyYXk8U2l6ZVRvdGFsPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2JlbHRUb3RhbHM7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IGJlbHRUb3RhbHModmFsdWU6IEFycmF5PFNpemVUb3RhbD4pIHtcclxuICAgICAgICB0aGlzLl9iZWx0VG90YWxzID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGhlbG1ldFRvdGFscygpOiBBcnJheTxTaXplVG90YWw+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5faGVsbWV0VG90YWxzO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBoZWxtZXRUb3RhbHModmFsdWU6IEFycmF5PFNpemVUb3RhbD4pIHtcclxuICAgICAgICB0aGlzLl9oZWxtZXRUb3RhbHMgPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgdXNlclNpemVzKCk6IEFycmF5PFNpemU+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fdXNlclNpemVzO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCB1c2VyU2l6ZXModmFsdWU6IEFycmF5PFNpemU+KSB7XHJcbiAgICAgICAgdGhpcy5fdXNlclNpemVzID0gdmFsdWU7XHJcbiAgICB9XHJcbn1cclxuIl19