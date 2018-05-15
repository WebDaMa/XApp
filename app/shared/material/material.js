"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var observable_1 = require("tns-core-modules/data/observable");
var MaterialViewModel = /** @class */ (function (_super) {
    __extends(MaterialViewModel, _super);
    function MaterialViewModel() {
        return _super.call(this) || this;
    }
    Object.defineProperty(MaterialViewModel.prototype, "material", {
        get: function () {
            return this.get("_material");
        },
        set: function (value) {
            this.set("_material", value);
        },
        enumerable: true,
        configurable: true
    });
    return MaterialViewModel;
}(observable_1.Observable));
exports.MaterialViewModel = MaterialViewModel;
var Material = /** @class */ (function () {
    function Material(date, guide, activity, groupName, groupTotal, sizeTotals, beltTotals, helmetTotals, userSizes) {
        this.date = date;
        this.guide = guide;
        this.activity = activity;
        this.groupName = groupName;
        this.groupTotal = groupTotal;
        this.sizeTotals = sizeTotals;
        this.beltTotals = beltTotals;
        this.helmetTotals = helmetTotals;
        this.userSizes = userSizes;
    }
    return Material;
}());
exports.Material = Material;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0ZXJpYWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJtYXRlcmlhbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLCtEQUE4RDtBQUk5RDtJQUF1QyxxQ0FBVTtJQUU3QztlQUNJLGlCQUFPO0lBQ1gsQ0FBQztJQUVELHNCQUFJLHVDQUFRO2FBSVo7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNqQyxDQUFDO2FBTkQsVUFBYSxLQUFlO1lBQ3hCLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ2pDLENBQUM7OztPQUFBO0lBS0wsd0JBQUM7QUFBRCxDQUFDLEFBYkQsQ0FBdUMsdUJBQVUsR0FhaEQ7QUFiWSw4Q0FBaUI7QUFlOUI7SUFXSSxrQkFBWSxJQUFZLEVBQUUsS0FBYSxFQUFFLFFBQWdCLEVBQUUsU0FBaUIsRUFBRSxVQUFrQixFQUNwRixVQUF1QixFQUFFLFVBQXVCLEVBQUUsWUFBeUIsRUFBRSxTQUFpQjtRQUN0RyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUN6QixJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztRQUMzQixJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztRQUM3QixJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztRQUM3QixJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztRQUM3QixJQUFJLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQztRQUNqQyxJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztJQUMvQixDQUFDO0lBRUwsZUFBQztBQUFELENBQUMsQUF4QkQsSUF3QkM7QUF4QlksNEJBQVEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvZGF0YS9vYnNlcnZhYmxlXCI7XG5pbXBvcnQgeyBTaXplIH0gZnJvbSBcIn4vc2hhcmVkL3NpemUvc2l6ZVwiO1xuaW1wb3J0IHsgU2l6ZVRvdGFsIH0gZnJvbSBcIn4vc2hhcmVkL3NpemUvc2l6ZVRvdGFsXCI7XG5cbmV4cG9ydCBjbGFzcyBNYXRlcmlhbFZpZXdNb2RlbCBleHRlbmRzIE9ic2VydmFibGUge1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgfVxuXG4gICAgc2V0IG1hdGVyaWFsKHZhbHVlOiBNYXRlcmlhbCkge1xuICAgICAgICB0aGlzLnNldChcIl9tYXRlcmlhbFwiLCB2YWx1ZSk7XG4gICAgfVxuXG4gICAgZ2V0IG1hdGVyaWFsKCk6IE1hdGVyaWFsIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0KFwiX21hdGVyaWFsXCIpO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIE1hdGVyaWFsIHtcbiAgICBkYXRlOiBzdHJpbmc7XG4gICAgZ3VpZGU6IHN0cmluZztcbiAgICBhY3Rpdml0eTogc3RyaW5nO1xuICAgIGdyb3VwTmFtZTogc3RyaW5nO1xuICAgIGdyb3VwVG90YWw6IHN0cmluZztcbiAgICBzaXplVG90YWxzOiBbU2l6ZVRvdGFsXTtcbiAgICBiZWx0VG90YWxzOiBbU2l6ZVRvdGFsXTtcbiAgICBoZWxtZXRUb3RhbHM6IFtTaXplVG90YWxdO1xuICAgIHVzZXJTaXplczogW1NpemVdO1xuXG4gICAgY29uc3RydWN0b3IoZGF0ZTogc3RyaW5nLCBndWlkZTogc3RyaW5nLCBhY3Rpdml0eTogc3RyaW5nLCBncm91cE5hbWU6IHN0cmluZywgZ3JvdXBUb3RhbDogc3RyaW5nLFxuICAgICAgICAgICAgICAgIHNpemVUb3RhbHM6IFtTaXplVG90YWxdLCBiZWx0VG90YWxzOiBbU2l6ZVRvdGFsXSwgaGVsbWV0VG90YWxzOiBbU2l6ZVRvdGFsXSwgdXNlclNpemVzOiBbU2l6ZV0pIHtcbiAgICAgICAgdGhpcy5kYXRlID0gZGF0ZTtcbiAgICAgICAgdGhpcy5ndWlkZSA9IGd1aWRlO1xuICAgICAgICB0aGlzLmFjdGl2aXR5ID0gYWN0aXZpdHk7XG4gICAgICAgIHRoaXMuZ3JvdXBOYW1lID0gZ3JvdXBOYW1lO1xuICAgICAgICB0aGlzLmdyb3VwVG90YWwgPSBncm91cFRvdGFsO1xuICAgICAgICB0aGlzLnNpemVUb3RhbHMgPSBzaXplVG90YWxzO1xuICAgICAgICB0aGlzLmJlbHRUb3RhbHMgPSBiZWx0VG90YWxzO1xuICAgICAgICB0aGlzLmhlbG1ldFRvdGFscyA9IGhlbG1ldFRvdGFscztcbiAgICAgICAgdGhpcy51c2VyU2l6ZXMgPSB1c2VyU2l6ZXM7XG4gICAgfVxuXG59XG4iXX0=