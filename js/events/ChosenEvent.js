"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _MenuEvent2 = _interopRequireDefault(require("./MenuEvent"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var ChosenEvent = /*#__PURE__*/function (_MenuEvent) {
  (0, _inherits2["default"])(ChosenEvent, _MenuEvent);

  var _super = _createSuper(ChosenEvent);

  function ChosenEvent(type, byKeyboard) {
    var _this;

    (0, _classCallCheck2["default"])(this, ChosenEvent);
    _this = _super.call(this, type);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "byKeyboard", void 0);
    _this.byKeyboard = byKeyboard;
    return _this;
  }

  return ChosenEvent;
}(_MenuEvent2["default"]);

exports["default"] = ChosenEvent;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9ldmVudHMvQ2hvc2VuRXZlbnQuanMiXSwibmFtZXMiOlsiQ2hvc2VuRXZlbnQiLCJ0eXBlIiwiYnlLZXlib2FyZCIsIk1lbnVFdmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUE7Ozs7OztJQUVxQkEsVzs7Ozs7QUFHbkIsdUJBQVlDLElBQVosRUFBMEJDLFVBQTFCLEVBQStDO0FBQUE7O0FBQUE7QUFDN0MsOEJBQU1ELElBQU47QUFENkM7QUFFN0MsVUFBS0MsVUFBTCxHQUFrQkEsVUFBbEI7QUFGNkM7QUFHOUM7OztFQU5zQ0Msc0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBAZmxvdyAqL1xuXG5pbXBvcnQgTWVudUV2ZW50IGZyb20gJy4vTWVudUV2ZW50JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2hvc2VuRXZlbnQgZXh0ZW5kcyBNZW51RXZlbnQge1xuICBieUtleWJvYXJkOiBib29sZWFuO1xuXG4gIGNvbnN0cnVjdG9yKHR5cGU6IHN0cmluZywgYnlLZXlib2FyZDogYm9vbGVhbikge1xuICAgIHN1cGVyKHR5cGUpO1xuICAgIHRoaXMuYnlLZXlib2FyZCA9IGJ5S2V5Ym9hcmQ7XG4gIH1cbn1cbiJdfQ==