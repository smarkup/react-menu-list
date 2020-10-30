"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var MenuEvent = /*#__PURE__*/function () {
  function MenuEvent(type) {
    (0, _classCallCheck2["default"])(this, MenuEvent);
    (0, _defineProperty2["default"])(this, "type", void 0);
    (0, _defineProperty2["default"])(this, "cancelBubble", false);
    (0, _defineProperty2["default"])(this, "defaultPrevented", false);
    this.type = type;
  }

  (0, _createClass2["default"])(MenuEvent, [{
    key: "stopPropagation",
    value: function stopPropagation() {
      this.cancelBubble = true;
    }
  }, {
    key: "preventDefault",
    value: function preventDefault() {
      this.defaultPrevented = true;
    }
  }]);
  return MenuEvent;
}();

exports["default"] = MenuEvent;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9ldmVudHMvTWVudUV2ZW50LmpzIl0sIm5hbWVzIjpbIk1lbnVFdmVudCIsInR5cGUiLCJjYW5jZWxCdWJibGUiLCJkZWZhdWx0UHJldmVudGVkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7SUFFcUJBLFM7QUFLbkIscUJBQVlDLElBQVosRUFBMEI7QUFBQTtBQUFBO0FBQUEsMkRBSEYsS0FHRTtBQUFBLCtEQUZFLEtBRUY7QUFDeEIsU0FBS0EsSUFBTCxHQUFZQSxJQUFaO0FBQ0Q7Ozs7c0NBRWlCO0FBQ2hCLFdBQUtDLFlBQUwsR0FBb0IsSUFBcEI7QUFDRDs7O3FDQUVnQjtBQUNmLFdBQUtDLGdCQUFMLEdBQXdCLElBQXhCO0FBQ0QiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBAZmxvdyAqL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNZW51RXZlbnQge1xuICB0eXBlOiBzdHJpbmc7XG4gIGNhbmNlbEJ1YmJsZTogYm9vbGVhbiA9IGZhbHNlO1xuICBkZWZhdWx0UHJldmVudGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IodHlwZTogc3RyaW5nKSB7XG4gICAgdGhpcy50eXBlID0gdHlwZTtcbiAgfVxuXG4gIHN0b3BQcm9wYWdhdGlvbigpIHtcbiAgICB0aGlzLmNhbmNlbEJ1YmJsZSA9IHRydWU7XG4gIH1cblxuICBwcmV2ZW50RGVmYXVsdCgpIHtcbiAgICB0aGlzLmRlZmF1bHRQcmV2ZW50ZWQgPSB0cnVlO1xuICB9XG59XG4iXX0=