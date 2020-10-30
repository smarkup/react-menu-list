"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.MenuListInspectorContext = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _ChosenEvent = _interopRequireDefault(require("./events/ChosenEvent"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var MenuListInspectorContext = /*#__PURE__*/_react["default"].createContext(null);

exports.MenuListInspectorContext = MenuListInspectorContext;

var MenuListInspector = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(MenuListInspector, _React$Component);

  var _super = _createSuper(MenuListInspector);

  function MenuListInspector() {
    var _this;

    (0, _classCallCheck2["default"])(this, MenuListInspector);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_descendantMenuLists", []);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_menuListInspectorContext", {
      registerMenuList: function registerMenuList(menuList) {
        _this._descendantMenuLists.push(menuList);
      },
      unregisterMenuList: function unregisterMenuList(menuList) {
        var i = _this._descendantMenuLists.indexOf(menuList);

        if (i < 0) throw new Error('MenuList not registered');

        _this._descendantMenuLists.splice(i, 1);
      },
      dispatchEvent: function dispatchEvent(event) {
        switch (event.type) {
          case 'chosen':
            /*:: if (!(event instanceof ChosenEvent)) throw new Error(); */
            if (_this.props.onItemChosen) _this.props.onItemChosen(event);
            break;

          case 'left':
            if (_this.props.onLeftPushed) _this.props.onLeftPushed(event);
            break;

          case 'right':
            if (_this.props.onRightPushed) _this.props.onRightPushed(event);
            break;
        }

        if (event.cancelBubble) return;

        var parentCtx = _this._parentCtx();

        if (parentCtx) {
          parentCtx.dispatchEvent(event);
        }
      }
    });
    return _this;
  }

  (0, _createClass2["default"])(MenuListInspector, [{
    key: "_parentCtx",
    value: function _parentCtx() {
      return this.context;
    }
  }, {
    key: "moveCursor",
    value: function moveCursor(direction, prevCursorLocation) {
      var menuList = this._descendantMenuLists[0];

      if (!menuList) {
        return false;
      }

      menuList.moveCursor(direction, prevCursorLocation);
      return true;
    }
  }, {
    key: "hasHighlight",
    value: function hasHighlight() {
      for (var i = 0, len = this._descendantMenuLists.length; i < len; i++) {
        if (this._descendantMenuLists[i].hasHighlight()) {
          return true;
        }
      }

      return false;
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/_react["default"].createElement(MenuListInspectorContext.Provider, {
        value: this._menuListInspectorContext
      }, this.props.children);
    }
  }]);
  return MenuListInspector;
}(_react["default"].Component);

exports["default"] = MenuListInspector;
(0, _defineProperty2["default"])(MenuListInspector, "propTypes", {
  onItemChosen: _propTypes["default"].func,
  onLeftPushed: _propTypes["default"].func,
  onRightPushed: _propTypes["default"].func,
  children: _propTypes["default"].element
});
(0, _defineProperty2["default"])(MenuListInspector, "contextType", MenuListInspectorContext);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9NZW51TGlzdEluc3BlY3Rvci5qcyJdLCJuYW1lcyI6WyJNZW51TGlzdEluc3BlY3RvckNvbnRleHQiLCJSZWFjdCIsImNyZWF0ZUNvbnRleHQiLCJNZW51TGlzdEluc3BlY3RvciIsInJlZ2lzdGVyTWVudUxpc3QiLCJtZW51TGlzdCIsIl9kZXNjZW5kYW50TWVudUxpc3RzIiwicHVzaCIsInVucmVnaXN0ZXJNZW51TGlzdCIsImkiLCJpbmRleE9mIiwiRXJyb3IiLCJzcGxpY2UiLCJkaXNwYXRjaEV2ZW50IiwiZXZlbnQiLCJ0eXBlIiwicHJvcHMiLCJvbkl0ZW1DaG9zZW4iLCJvbkxlZnRQdXNoZWQiLCJvblJpZ2h0UHVzaGVkIiwiY2FuY2VsQnViYmxlIiwicGFyZW50Q3R4IiwiX3BhcmVudEN0eCIsImNvbnRleHQiLCJkaXJlY3Rpb24iLCJwcmV2Q3Vyc29yTG9jYXRpb24iLCJtb3ZlQ3Vyc29yIiwibGVuIiwibGVuZ3RoIiwiaGFzSGlnaGxpZ2h0IiwiX21lbnVMaXN0SW5zcGVjdG9yQ29udGV4dCIsImNoaWxkcmVuIiwiQ29tcG9uZW50IiwiUHJvcFR5cGVzIiwiZnVuYyIsImVsZW1lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUE7O0FBRUE7O0FBR0E7Ozs7OztBQVNPLElBQU1BLHdCQUF3QixnQkFBR0Msa0JBQU1DLGFBQU4sQ0FDdEMsSUFEc0MsQ0FBakM7Ozs7SUFXY0MsaUI7Ozs7Ozs7Ozs7Ozs7Ozs2R0FXcUIsRTtrSEFNbUI7QUFDekRDLE1BQUFBLGdCQUFnQixFQUFFLDBCQUFDQyxRQUFELEVBQXdCO0FBQ3hDLGNBQUtDLG9CQUFMLENBQTBCQyxJQUExQixDQUErQkYsUUFBL0I7QUFDRCxPQUh3RDtBQUl6REcsTUFBQUEsa0JBQWtCLEVBQUUsNEJBQUNILFFBQUQsRUFBd0I7QUFDMUMsWUFBTUksQ0FBQyxHQUFHLE1BQUtILG9CQUFMLENBQTBCSSxPQUExQixDQUFrQ0wsUUFBbEMsQ0FBVjs7QUFDQSxZQUFJSSxDQUFDLEdBQUcsQ0FBUixFQUFXLE1BQU0sSUFBSUUsS0FBSixDQUFVLHlCQUFWLENBQU47O0FBQ1gsY0FBS0wsb0JBQUwsQ0FBMEJNLE1BQTFCLENBQWlDSCxDQUFqQyxFQUFvQyxDQUFwQztBQUNELE9BUndEO0FBU3pESSxNQUFBQSxhQUFhLEVBQUUsdUJBQUNDLEtBQUQsRUFBc0I7QUFDbkMsZ0JBQVFBLEtBQUssQ0FBQ0MsSUFBZDtBQUNFLGVBQUssUUFBTDtBQUNFO0FBQ0EsZ0JBQUksTUFBS0MsS0FBTCxDQUFXQyxZQUFmLEVBQTZCLE1BQUtELEtBQUwsQ0FBV0MsWUFBWCxDQUF3QkgsS0FBeEI7QUFDN0I7O0FBQ0YsZUFBSyxNQUFMO0FBQ0UsZ0JBQUksTUFBS0UsS0FBTCxDQUFXRSxZQUFmLEVBQTZCLE1BQUtGLEtBQUwsQ0FBV0UsWUFBWCxDQUF3QkosS0FBeEI7QUFDN0I7O0FBQ0YsZUFBSyxPQUFMO0FBQ0UsZ0JBQUksTUFBS0UsS0FBTCxDQUFXRyxhQUFmLEVBQThCLE1BQUtILEtBQUwsQ0FBV0csYUFBWCxDQUF5QkwsS0FBekI7QUFDOUI7QUFWSjs7QUFZQSxZQUFJQSxLQUFLLENBQUNNLFlBQVYsRUFBd0I7O0FBQ3hCLFlBQU1DLFNBQVMsR0FBRyxNQUFLQyxVQUFMLEVBQWxCOztBQUNBLFlBQUlELFNBQUosRUFBZTtBQUNiQSxVQUFBQSxTQUFTLENBQUNSLGFBQVYsQ0FBd0JDLEtBQXhCO0FBQ0Q7QUFDRjtBQTNCd0QsSzs7Ozs7O2lDQUpkO0FBQzNDLGFBQU8sS0FBS1MsT0FBWjtBQUNEOzs7K0JBZ0NVQyxTLEVBQXNCQyxrQixFQUFvQztBQUNuRSxVQUFNcEIsUUFBUSxHQUFHLEtBQUtDLG9CQUFMLENBQTBCLENBQTFCLENBQWpCOztBQUNBLFVBQUksQ0FBQ0QsUUFBTCxFQUFlO0FBQ2IsZUFBTyxLQUFQO0FBQ0Q7O0FBQ0RBLE1BQUFBLFFBQVEsQ0FBQ3FCLFVBQVQsQ0FBb0JGLFNBQXBCLEVBQStCQyxrQkFBL0I7QUFDQSxhQUFPLElBQVA7QUFDRDs7O21DQUV1QjtBQUN0QixXQUFLLElBQUloQixDQUFDLEdBQUcsQ0FBUixFQUFXa0IsR0FBRyxHQUFHLEtBQUtyQixvQkFBTCxDQUEwQnNCLE1BQWhELEVBQXdEbkIsQ0FBQyxHQUFHa0IsR0FBNUQsRUFBaUVsQixDQUFDLEVBQWxFLEVBQXNFO0FBQ3BFLFlBQUksS0FBS0gsb0JBQUwsQ0FBMEJHLENBQTFCLEVBQTZCb0IsWUFBN0IsRUFBSixFQUFpRDtBQUMvQyxpQkFBTyxJQUFQO0FBQ0Q7QUFDRjs7QUFDRCxhQUFPLEtBQVA7QUFDRDs7OzZCQUVRO0FBQ1AsMEJBQ0UsZ0NBQUMsd0JBQUQsQ0FBMEIsUUFBMUI7QUFBbUMsUUFBQSxLQUFLLEVBQUUsS0FBS0M7QUFBL0MsU0FDRyxLQUFLZCxLQUFMLENBQVdlLFFBRGQsQ0FERjtBQUtEOzs7RUF2RTRDOUIsa0JBQU0rQixTOzs7aUNBQWhDN0IsaUIsZUFDQTtBQUNqQmMsRUFBQUEsWUFBWSxFQUFFZ0Isc0JBQVVDLElBRFA7QUFFakJoQixFQUFBQSxZQUFZLEVBQUVlLHNCQUFVQyxJQUZQO0FBR2pCZixFQUFBQSxhQUFhLEVBQUVjLHNCQUFVQyxJQUhSO0FBS2pCSCxFQUFBQSxRQUFRLEVBQUVFLHNCQUFVRTtBQUxILEM7aUNBREFoQyxpQixpQkFTRUgsd0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBAZmxvdyAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHR5cGUge05vZGUgYXMgUmVhY3ROb2RlfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHR5cGUgTWVudUxpc3QgZnJvbSAnLi9NZW51TGlzdCc7XG5pbXBvcnQgdHlwZSBNZW51RXZlbnQgZnJvbSAnLi9ldmVudHMvTWVudUV2ZW50JztcbmltcG9ydCBDaG9zZW5FdmVudCBmcm9tICcuL2V2ZW50cy9DaG9zZW5FdmVudCc7XG5pbXBvcnQgdHlwZSB7RGlyZWN0aW9uLCBSZWN0fSBmcm9tICcuL3R5cGVzJztcblxuZXhwb3J0IHR5cGUgTWVudUxpc3RJbnNwZWN0b3JDb250ZXh0VmFsdWUgPSB7XG4gIHJlZ2lzdGVyTWVudUxpc3QobWVudUxpc3Q6IE1lbnVMaXN0KTogdm9pZCxcbiAgdW5yZWdpc3Rlck1lbnVMaXN0KG1lbnVMaXN0OiBNZW51TGlzdCk6IHZvaWQsXG4gIGRpc3BhdGNoRXZlbnQoZXZlbnQ6IE1lbnVFdmVudCk6IHZvaWQsXG59O1xuXG5leHBvcnQgY29uc3QgTWVudUxpc3RJbnNwZWN0b3JDb250ZXh0ID0gUmVhY3QuY3JlYXRlQ29udGV4dDw/TWVudUxpc3RJbnNwZWN0b3JDb250ZXh0VmFsdWU+KFxuICBudWxsXG4pO1xuXG5leHBvcnQgdHlwZSBQcm9wcyA9IHtcbiAgb25JdGVtQ2hvc2VuPzogKGV2ZW50OiBDaG9zZW5FdmVudCkgPT4gdm9pZCxcbiAgb25MZWZ0UHVzaGVkPzogKGV2ZW50OiBNZW51RXZlbnQpID0+IHZvaWQsXG4gIG9uUmlnaHRQdXNoZWQ/OiAoZXZlbnQ6IE1lbnVFdmVudCkgPT4gdm9pZCxcbiAgY2hpbGRyZW46IFJlYWN0Tm9kZSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1lbnVMaXN0SW5zcGVjdG9yIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PFByb3BzPiB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgb25JdGVtQ2hvc2VuOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvbkxlZnRQdXNoZWQ6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uUmlnaHRQdXNoZWQ6IFByb3BUeXBlcy5mdW5jLFxuXG4gICAgY2hpbGRyZW46IFByb3BUeXBlcy5lbGVtZW50LFxuICB9O1xuXG4gIHN0YXRpYyBjb250ZXh0VHlwZSA9IE1lbnVMaXN0SW5zcGVjdG9yQ29udGV4dDtcblxuICBfZGVzY2VuZGFudE1lbnVMaXN0czogQXJyYXk8TWVudUxpc3Q+ID0gW107XG5cbiAgX3BhcmVudEN0eCgpOiA/TWVudUxpc3RJbnNwZWN0b3JDb250ZXh0VmFsdWUge1xuICAgIHJldHVybiB0aGlzLmNvbnRleHQ7XG4gIH1cblxuICBfbWVudUxpc3RJbnNwZWN0b3JDb250ZXh0OiBNZW51TGlzdEluc3BlY3RvckNvbnRleHRWYWx1ZSA9IHtcbiAgICByZWdpc3Rlck1lbnVMaXN0OiAobWVudUxpc3Q6IE1lbnVMaXN0KSA9PiB7XG4gICAgICB0aGlzLl9kZXNjZW5kYW50TWVudUxpc3RzLnB1c2gobWVudUxpc3QpO1xuICAgIH0sXG4gICAgdW5yZWdpc3Rlck1lbnVMaXN0OiAobWVudUxpc3Q6IE1lbnVMaXN0KSA9PiB7XG4gICAgICBjb25zdCBpID0gdGhpcy5fZGVzY2VuZGFudE1lbnVMaXN0cy5pbmRleE9mKG1lbnVMaXN0KTtcbiAgICAgIGlmIChpIDwgMCkgdGhyb3cgbmV3IEVycm9yKCdNZW51TGlzdCBub3QgcmVnaXN0ZXJlZCcpO1xuICAgICAgdGhpcy5fZGVzY2VuZGFudE1lbnVMaXN0cy5zcGxpY2UoaSwgMSk7XG4gICAgfSxcbiAgICBkaXNwYXRjaEV2ZW50OiAoZXZlbnQ6IE1lbnVFdmVudCkgPT4ge1xuICAgICAgc3dpdGNoIChldmVudC50eXBlKSB7XG4gICAgICAgIGNhc2UgJ2Nob3Nlbic6XG4gICAgICAgICAgLyo6OiBpZiAoIShldmVudCBpbnN0YW5jZW9mIENob3NlbkV2ZW50KSkgdGhyb3cgbmV3IEVycm9yKCk7ICovXG4gICAgICAgICAgaWYgKHRoaXMucHJvcHMub25JdGVtQ2hvc2VuKSB0aGlzLnByb3BzLm9uSXRlbUNob3NlbihldmVudCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ2xlZnQnOlxuICAgICAgICAgIGlmICh0aGlzLnByb3BzLm9uTGVmdFB1c2hlZCkgdGhpcy5wcm9wcy5vbkxlZnRQdXNoZWQoZXZlbnQpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdyaWdodCc6XG4gICAgICAgICAgaWYgKHRoaXMucHJvcHMub25SaWdodFB1c2hlZCkgdGhpcy5wcm9wcy5vblJpZ2h0UHVzaGVkKGV2ZW50KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGlmIChldmVudC5jYW5jZWxCdWJibGUpIHJldHVybjtcbiAgICAgIGNvbnN0IHBhcmVudEN0eCA9IHRoaXMuX3BhcmVudEN0eCgpO1xuICAgICAgaWYgKHBhcmVudEN0eCkge1xuICAgICAgICBwYXJlbnRDdHguZGlzcGF0Y2hFdmVudChldmVudCk7XG4gICAgICB9XG4gICAgfSxcbiAgfTtcblxuICBtb3ZlQ3Vyc29yKGRpcmVjdGlvbjogRGlyZWN0aW9uLCBwcmV2Q3Vyc29yTG9jYXRpb246ID9SZWN0KTogYm9vbGVhbiB7XG4gICAgY29uc3QgbWVudUxpc3QgPSB0aGlzLl9kZXNjZW5kYW50TWVudUxpc3RzWzBdO1xuICAgIGlmICghbWVudUxpc3QpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgbWVudUxpc3QubW92ZUN1cnNvcihkaXJlY3Rpb24sIHByZXZDdXJzb3JMb2NhdGlvbik7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBoYXNIaWdobGlnaHQoKTogYm9vbGVhbiB7XG4gICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IHRoaXMuX2Rlc2NlbmRhbnRNZW51TGlzdHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGlmICh0aGlzLl9kZXNjZW5kYW50TWVudUxpc3RzW2ldLmhhc0hpZ2hsaWdodCgpKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxNZW51TGlzdEluc3BlY3RvckNvbnRleHQuUHJvdmlkZXIgdmFsdWU9e3RoaXMuX21lbnVMaXN0SW5zcGVjdG9yQ29udGV4dH0+XG4gICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVufVxuICAgICAgPC9NZW51TGlzdEluc3BlY3RvckNvbnRleHQuUHJvdmlkZXI+XG4gICAgKTtcbiAgfVxufVxuIl19