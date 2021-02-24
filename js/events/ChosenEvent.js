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
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "button", void 0);
    _this.byKeyboard = byKeyboard;
    _this.withMeta = modifiers.withMeta;
    _this.withAlt = modifiers.withAlt;
    _this.withCtrl = modifiers.withCtrl;
    _this.withShift = modifiers.withShift;
    _this.button = modifiers.button;
    return _this;
  }

  return ChosenEvent;
}(_MenuEvent2["default"]);

exports["default"] = ChosenEvent;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9ldmVudHMvQ2hvc2VuRXZlbnQuanMiXSwibmFtZXMiOlsiQ2hvc2VuRXZlbnQiLCJ0eXBlIiwiYnlLZXlib2FyZCIsIm1vZGlmaWVycyIsIndpdGhNZXRhIiwid2l0aEFsdCIsIndpdGhDdHJsIiwid2l0aFNoaWZ0IiwiYnV0dG9uIiwiTWVudUV2ZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQTs7Ozs7O0lBRXFCQSxXOzs7OztBQVNuQix1QkFDRUMsSUFERixFQUVFQyxVQUZGLEVBR0VDLFNBSEYsRUFVRTtBQUFBOztBQUFBO0FBQ0EsOEJBQU1GLElBQU47QUFEQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFFQSxVQUFLQyxVQUFMLEdBQWtCQSxVQUFsQjtBQUVBLFVBQUtFLFFBQUwsR0FBZ0JELFNBQVMsQ0FBQ0MsUUFBMUI7QUFDQSxVQUFLQyxPQUFMLEdBQWVGLFNBQVMsQ0FBQ0UsT0FBekI7QUFDQSxVQUFLQyxRQUFMLEdBQWdCSCxTQUFTLENBQUNHLFFBQTFCO0FBQ0EsVUFBS0MsU0FBTCxHQUFpQkosU0FBUyxDQUFDSSxTQUEzQjtBQUNBLFVBQUtDLE1BQUwsR0FBY0wsU0FBUyxDQUFDSyxNQUF4QjtBQVJBO0FBU0Q7OztFQTVCc0NDLHNCIiwic291cmNlc0NvbnRlbnQiOlsiLyogQGZsb3cgKi9cblxuaW1wb3J0IE1lbnVFdmVudCBmcm9tICcuL01lbnVFdmVudCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENob3NlbkV2ZW50IGV4dGVuZHMgTWVudUV2ZW50IHtcbiAgYnlLZXlib2FyZDogYm9vbGVhbjtcblxuICB3aXRoTWV0YTogYm9vbGVhbjtcbiAgd2l0aEFsdDogYm9vbGVhbjtcbiAgd2l0aEN0cmw6IGJvb2xlYW47XG4gIHdpdGhTaGlmdDogYm9vbGVhbjtcbiAgYnV0dG9uOiA/bnVtYmVyO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHR5cGU6IHN0cmluZyxcbiAgICBieUtleWJvYXJkOiBib29sZWFuLFxuICAgIG1vZGlmaWVyczoge3xcbiAgICAgIHdpdGhNZXRhOiBib29sZWFuLFxuICAgICAgd2l0aEFsdDogYm9vbGVhbixcbiAgICAgIHdpdGhDdHJsOiBib29sZWFuLFxuICAgICAgd2l0aFNoaWZ0OiBib29sZWFuLFxuICAgICAgYnV0dG9uOiBib29sZWFuLFxuICAgIHx9XG4gICkge1xuICAgIHN1cGVyKHR5cGUpO1xuICAgIHRoaXMuYnlLZXlib2FyZCA9IGJ5S2V5Ym9hcmQ7XG5cbiAgICB0aGlzLndpdGhNZXRhID0gbW9kaWZpZXJzLndpdGhNZXRhO1xuICAgIHRoaXMud2l0aEFsdCA9IG1vZGlmaWVycy53aXRoQWx0O1xuICAgIHRoaXMud2l0aEN0cmwgPSBtb2RpZmllcnMud2l0aEN0cmw7XG4gICAgdGhpcy53aXRoU2hpZnQgPSBtb2RpZmllcnMud2l0aFNoaWZ0O1xuICAgIHRoaXMuYnV0dG9uID0gbW9kaWZpZXJzLmJ1dHRvbjtcbiAgfVxufVxuIl19