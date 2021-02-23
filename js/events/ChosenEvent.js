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

  function ChosenEvent(type, byKeyboard, modifiers) {
    var _this;

    (0, _classCallCheck2["default"])(this, ChosenEvent);
    _this = _super.call(this, type);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "byKeyboard", void 0);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "withMeta", void 0);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "withAlt", void 0);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "withCtrl", void 0);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "withShift", void 0);
    _this.byKeyboard = byKeyboard;
    _this.withMeta = modifiers.withMeta;
    _this.withAlt = modifiers.withAlt;
    _this.withCtrl = modifiers.withCtrl;
    _this.withShift = modifiers.withShift;
    return _this;
  }

  return ChosenEvent;
}(_MenuEvent2["default"]);

exports["default"] = ChosenEvent;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9ldmVudHMvQ2hvc2VuRXZlbnQuanMiXSwibmFtZXMiOlsiQ2hvc2VuRXZlbnQiLCJ0eXBlIiwiYnlLZXlib2FyZCIsIm1vZGlmaWVycyIsIndpdGhNZXRhIiwid2l0aEFsdCIsIndpdGhDdHJsIiwid2l0aFNoaWZ0IiwiTWVudUV2ZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQTs7Ozs7O0lBRXFCQSxXOzs7OztBQVFuQix1QkFDRUMsSUFERixFQUVFQyxVQUZGLEVBR0VDLFNBSEYsRUFTRTtBQUFBOztBQUFBO0FBQ0EsOEJBQU1GLElBQU47QUFEQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRUEsVUFBS0MsVUFBTCxHQUFrQkEsVUFBbEI7QUFFQSxVQUFLRSxRQUFMLEdBQWdCRCxTQUFTLENBQUNDLFFBQTFCO0FBQ0EsVUFBS0MsT0FBTCxHQUFlRixTQUFTLENBQUNFLE9BQXpCO0FBQ0EsVUFBS0MsUUFBTCxHQUFnQkgsU0FBUyxDQUFDRyxRQUExQjtBQUNBLFVBQUtDLFNBQUwsR0FBaUJKLFNBQVMsQ0FBQ0ksU0FBM0I7QUFQQTtBQVFEOzs7RUF6QnNDQyxzQiIsInNvdXJjZXNDb250ZW50IjpbIi8qIEBmbG93ICovXG5cbmltcG9ydCBNZW51RXZlbnQgZnJvbSAnLi9NZW51RXZlbnQnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDaG9zZW5FdmVudCBleHRlbmRzIE1lbnVFdmVudCB7XG4gIGJ5S2V5Ym9hcmQ6IGJvb2xlYW47XG5cbiAgd2l0aE1ldGE6IGJvb2xlYW47XG4gIHdpdGhBbHQ6IGJvb2xlYW47XG4gIHdpdGhDdHJsOiBib29sZWFuO1xuICB3aXRoU2hpZnQ6IGJvb2xlYW47XG5cbiAgY29uc3RydWN0b3IoXG4gICAgdHlwZTogc3RyaW5nLFxuICAgIGJ5S2V5Ym9hcmQ6IGJvb2xlYW4sXG4gICAgbW9kaWZpZXJzOiB7fFxuICAgICAgd2l0aE1ldGE6IGJvb2xlYW4sXG4gICAgICB3aXRoQWx0OiBib29sZWFuLFxuICAgICAgd2l0aEN0cmw6IGJvb2xlYW4sXG4gICAgICB3aXRoU2hpZnQ6IGJvb2xlYW4sXG4gICAgfH1cbiAgKSB7XG4gICAgc3VwZXIodHlwZSk7XG4gICAgdGhpcy5ieUtleWJvYXJkID0gYnlLZXlib2FyZDtcblxuICAgIHRoaXMud2l0aE1ldGEgPSBtb2RpZmllcnMud2l0aE1ldGE7XG4gICAgdGhpcy53aXRoQWx0ID0gbW9kaWZpZXJzLndpdGhBbHQ7XG4gICAgdGhpcy53aXRoQ3RybCA9IG1vZGlmaWVycy53aXRoQ3RybDtcbiAgICB0aGlzLndpdGhTaGlmdCA9IG1vZGlmaWVycy53aXRoU2hpZnQ7XG4gIH1cbn1cbiJdfQ==