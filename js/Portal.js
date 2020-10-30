"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var stopPropagation = function stopPropagation(e) {
  e.stopPropagation();
};

var Portal = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(Portal, _React$Component);

  var _super = _createSuper(Portal);

  function Portal() {
    var _this;

    (0, _classCallCheck2["default"])(this, Portal);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_defaultNode", void 0);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_events", {
      onMouseDown: stopPropagation,
      onMouseUp: stopPropagation,
      onClick: stopPropagation,
      onDoubleClick: stopPropagation,
      onContextMenu: stopPropagation
    });
    return _this;
  }

  (0, _createClass2["default"])(Portal, [{
    key: "_setupDefaultNode",
    value: function _setupDefaultNode() {
      this._defaultNode = document.createElement('div');
      document.body.appendChild(this._defaultNode);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this._defaultNode) {
        document.body.removeChild(this._defaultNode);
      }

      this._defaultNode = undefined;
    }
  }, {
    key: "render",
    value: function render() {
      if (!this._defaultNode) {
        this._setupDefaultNode();
      }

      return /*#__PURE__*/_reactDom["default"].createPortal( /*#__PURE__*/_react["default"].createElement("div", this._events, this.props.children), this._defaultNode);
    }
  }]);
  return Portal;
}(_react["default"].Component);

var _default = Portal;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9Qb3J0YWwuanMiXSwibmFtZXMiOlsic3RvcFByb3BhZ2F0aW9uIiwiZSIsIlBvcnRhbCIsIm9uTW91c2VEb3duIiwib25Nb3VzZVVwIiwib25DbGljayIsIm9uRG91YmxlQ2xpY2siLCJvbkNvbnRleHRNZW51IiwiX2RlZmF1bHROb2RlIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiYm9keSIsImFwcGVuZENoaWxkIiwicmVtb3ZlQ2hpbGQiLCJ1bmRlZmluZWQiLCJfc2V0dXBEZWZhdWx0Tm9kZSIsIlJlYWN0RE9NIiwiY3JlYXRlUG9ydGFsIiwiX2V2ZW50cyIsInByb3BzIiwiY2hpbGRyZW4iLCJSZWFjdCIsIkNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQTs7QUFDQTs7Ozs7O0FBRUEsSUFBTUEsZUFBZSxHQUFHLFNBQWxCQSxlQUFrQixDQUFDQyxDQUFELEVBQW1CO0FBQ3pDQSxFQUFBQSxDQUFDLENBQUNELGVBQUY7QUFDRCxDQUZEOztJQUlNRSxNOzs7Ozs7Ozs7Ozs7Ozs7O2dHQUlNO0FBQ1JDLE1BQUFBLFdBQVcsRUFBRUgsZUFETDtBQUVSSSxNQUFBQSxTQUFTLEVBQUVKLGVBRkg7QUFHUkssTUFBQUEsT0FBTyxFQUFFTCxlQUhEO0FBSVJNLE1BQUFBLGFBQWEsRUFBRU4sZUFKUDtBQUtSTyxNQUFBQSxhQUFhLEVBQUVQO0FBTFAsSzs7Ozs7O3dDQVFVO0FBQ2xCLFdBQUtRLFlBQUwsR0FBb0JDLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QixLQUF2QixDQUFwQjtBQUNBRCxNQUFBQSxRQUFRLENBQUNFLElBQVQsQ0FBY0MsV0FBZCxDQUEwQixLQUFLSixZQUEvQjtBQUNEOzs7MkNBRXNCO0FBQ3JCLFVBQUksS0FBS0EsWUFBVCxFQUF1QjtBQUNyQkMsUUFBQUEsUUFBUSxDQUFDRSxJQUFULENBQWNFLFdBQWQsQ0FBMEIsS0FBS0wsWUFBL0I7QUFDRDs7QUFDRCxXQUFLQSxZQUFMLEdBQW9CTSxTQUFwQjtBQUNEOzs7NkJBRVE7QUFDUCxVQUFJLENBQUMsS0FBS04sWUFBVixFQUF3QjtBQUN0QixhQUFLTyxpQkFBTDtBQUNEOztBQUVELDBCQUFPQyxxQkFBU0MsWUFBVCxlQUNMLHVDQUFTLEtBQUtDLE9BQWQsRUFBd0IsS0FBS0MsS0FBTCxDQUFXQyxRQUFuQyxDQURLLEVBRUwsS0FBS1osWUFGQSxDQUFQO0FBSUQ7OztFQWpDa0JhLGtCQUFNQyxTOztlQW9DWnBCLE0iLCJzb3VyY2VzQ29udGVudCI6WyIvKiBAZmxvdyAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XG5cbmNvbnN0IHN0b3BQcm9wYWdhdGlvbiA9IChlOiBNb3VzZUV2ZW50KSA9PiB7XG4gIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG59O1xuXG5jbGFzcyBQb3J0YWwgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBfZGVmYXVsdE5vZGU6IEhUTUxFbGVtZW50O1xuXG4gIC8vIHJlYWN0IHBvcnRhbHMgYXJlIGJ1Z2d5OiBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svcmVhY3QvaXNzdWVzLzExMzg3XG4gIF9ldmVudHMgPSB7XG4gICAgb25Nb3VzZURvd246IHN0b3BQcm9wYWdhdGlvbixcbiAgICBvbk1vdXNlVXA6IHN0b3BQcm9wYWdhdGlvbixcbiAgICBvbkNsaWNrOiBzdG9wUHJvcGFnYXRpb24sXG4gICAgb25Eb3VibGVDbGljazogc3RvcFByb3BhZ2F0aW9uLFxuICAgIG9uQ29udGV4dE1lbnU6IHN0b3BQcm9wYWdhdGlvbixcbiAgfTtcblxuICBfc2V0dXBEZWZhdWx0Tm9kZSgpIHtcbiAgICB0aGlzLl9kZWZhdWx0Tm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5fZGVmYXVsdE5vZGUpO1xuICB9XG5cbiAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgaWYgKHRoaXMuX2RlZmF1bHROb2RlKSB7XG4gICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKHRoaXMuX2RlZmF1bHROb2RlKTtcbiAgICB9XG4gICAgdGhpcy5fZGVmYXVsdE5vZGUgPSB1bmRlZmluZWQ7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgaWYgKCF0aGlzLl9kZWZhdWx0Tm9kZSkge1xuICAgICAgdGhpcy5fc2V0dXBEZWZhdWx0Tm9kZSgpO1xuICAgIH1cblxuICAgIHJldHVybiBSZWFjdERPTS5jcmVhdGVQb3J0YWwoXG4gICAgICA8ZGl2IHsuLi50aGlzLl9ldmVudHN9Pnt0aGlzLnByb3BzLmNoaWxkcmVufTwvZGl2PixcbiAgICAgIHRoaXMuX2RlZmF1bHROb2RlXG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBQb3J0YWw7XG4iXX0=