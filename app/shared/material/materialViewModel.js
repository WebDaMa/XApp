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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0ZXJpYWxWaWV3TW9kZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJtYXRlcmlhbFZpZXdNb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLCtEQUE4RDtBQUc5RDtJQUF1QyxxQ0FBVTtJQUU3QztlQUNJLGlCQUFPO0lBQ1gsQ0FBQztJQUVELHNCQUFJLHVDQUFRO2FBSVo7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNqQyxDQUFDO2FBTkQsVUFBYSxLQUFlO1lBQ3hCLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ2pDLENBQUM7OztPQUFBO0lBS0wsd0JBQUM7QUFBRCxDQUFDLEFBYkQsQ0FBdUMsdUJBQVUsR0FhaEQ7QUFiWSw4Q0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvZGF0YS9vYnNlcnZhYmxlXCI7XG5pbXBvcnQgeyBNYXRlcmlhbCB9IGZyb20gXCJ+L3NoYXJlZC9tYXRlcmlhbC9tYXRlcmlhbFwiO1xuXG5leHBvcnQgY2xhc3MgTWF0ZXJpYWxWaWV3TW9kZWwgZXh0ZW5kcyBPYnNlcnZhYmxlIHtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgIH1cblxuICAgIHNldCBtYXRlcmlhbCh2YWx1ZTogTWF0ZXJpYWwpIHtcbiAgICAgICAgdGhpcy5zZXQoXCJfbWF0ZXJpYWxcIiwgdmFsdWUpO1xuICAgIH1cblxuICAgIGdldCBtYXRlcmlhbCgpOiBNYXRlcmlhbCB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldChcIl9tYXRlcmlhbFwiKTtcbiAgICB9XG59XG4iXX0=