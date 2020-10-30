"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var Dropdown = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(Dropdown, _React$Component);

  var _super = _createSuper(Dropdown);

  function Dropdown() {
    (0, _classCallCheck2["default"])(this, Dropdown);
    return _super.apply(this, arguments);
  }

  (0, _createClass2["default"])(Dropdown, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/_react["default"].createElement("div", {
        style: {
          background: 'white',
          border: '1px solid rgba(0,0,0,.2)',
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
          padding: '6px 0'
        }
      }, this.props.children);
    }
  }]);
  return Dropdown;
}(_react["default"].Component);

exports["default"] = Dropdown;
(0, _defineProperty2["default"])(Dropdown, "propTypes", {
  children: _propTypes["default"].node
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9Ecm9wZG93bi5qcyJdLCJuYW1lcyI6WyJEcm9wZG93biIsImJhY2tncm91bmQiLCJib3JkZXIiLCJib3hTaGFkb3ciLCJwYWRkaW5nIiwicHJvcHMiLCJjaGlsZHJlbiIsIlJlYWN0IiwiQ29tcG9uZW50IiwiUHJvcFR5cGVzIiwibm9kZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUE7O0FBRUE7Ozs7OztJQU1xQkEsUTs7Ozs7Ozs7Ozs7OzZCQUtWO0FBQ1AsMEJBQ0U7QUFDRSxRQUFBLEtBQUssRUFBRTtBQUNMQyxVQUFBQSxVQUFVLEVBQUUsT0FEUDtBQUVMQyxVQUFBQSxNQUFNLEVBQUUsMEJBRkg7QUFHTEMsVUFBQUEsU0FBUyxFQUFFLDJCQUhOO0FBSUxDLFVBQUFBLE9BQU8sRUFBRTtBQUpKO0FBRFQsU0FRRyxLQUFLQyxLQUFMLENBQVdDLFFBUmQsQ0FERjtBQVlEOzs7RUFsQm1DQyxrQkFBTUMsUzs7O2lDQUF2QlIsUSxlQUNBO0FBQ2pCTSxFQUFBQSxRQUFRLEVBQUVHLHNCQUFVQztBQURILEMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBAZmxvdyAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHR5cGUge05vZGUgYXMgUmVhY3ROb2RlfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuXG50eXBlIFByb3BzID0ge1xuICBjaGlsZHJlbj86IFJlYWN0Tm9kZSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERyb3Bkb3duIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PFByb3BzPiB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgY2hpbGRyZW46IFByb3BUeXBlcy5ub2RlLFxuICB9O1xuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdlxuICAgICAgICBzdHlsZT17e1xuICAgICAgICAgIGJhY2tncm91bmQ6ICd3aGl0ZScsXG4gICAgICAgICAgYm9yZGVyOiAnMXB4IHNvbGlkIHJnYmEoMCwwLDAsLjIpJyxcbiAgICAgICAgICBib3hTaGFkb3c6ICcwIDJweCA0cHggcmdiYSgwLDAsMCwwLjIpJyxcbiAgICAgICAgICBwYWRkaW5nOiAnNnB4IDAnLFxuICAgICAgICB9fVxuICAgICAgPlxuICAgICAgICB7dGhpcy5wcm9wcy5jaGlsZHJlbn1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cbiJdfQ==