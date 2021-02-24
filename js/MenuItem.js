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

var _propTypes = _interopRequireDefault(require("prop-types"));

var _ChosenEvent = _interopRequireDefault(require("./events/ChosenEvent"));

var _MenuList = require("./MenuList");

var _setRef = _interopRequireDefault(require("./lib/setRef"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var MenuItem = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(MenuItem, _React$Component);

  var _super = _createSuper(MenuItem);

  function MenuItem() {
    var _this;

    (0, _classCallCheck2["default"])(this, MenuItem);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_menuListHandle", void 0);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "state", {
      highlighted: false
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_el", void 0);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_elSetter", function (el) {
      _this._el = el;

      if (_this.props.domRef) {
        (0, _setRef["default"])(_this.props.domRef, el);
      }
    });
    return _this;
  }

  (0, _createClass2["default"])(MenuItem, [{
    key: "hasHighlight",
    value: function hasHighlight() {
      return this.state.highlighted;
    }
  }, {
    key: "takeKeyboard",
    value: function takeKeyboard() {
      this._menuListHandle.takeKeyboard();
    }
  }, {
    key: "releaseKeyboard",
    value: function releaseKeyboard() {
      this._menuListHandle.releaseKeyboard();
    }
  }, {
    key: "lockHighlight",
    value: function lockHighlight() {
      this._menuListHandle.lockHighlight();
    }
  }, {
    key: "unlockHighlight",
    value: function unlockHighlight() {
      this._menuListHandle.unlockHighlight();
    } // byKeyboard forces focus immediately and scrolls the item into view.
    // With it false, the highlight might be delayed depending on mouse movement
    // and won't cause anything to scroll.

  }, {
    key: "highlight",
    value: function highlight() {
      var byKeyboard = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      this._menuListHandle.highlight(byKeyboard);
    }
  }, {
    key: "unhighlight",
    value: function unhighlight() {
      this._menuListHandle.unhighlight();
    }
  }, {
    key: "moveCursor",
    value: function moveCursor(direction, prevCursorLocation) {
      this._menuListHandle.moveCursor(direction, prevCursorLocation);
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      var el = this._el;
      /*:: if (!el) throw new Error(); */

      this._menuListHandle = this.context.registerItem(this.props, {
        notifyHighlighted: function notifyHighlighted(highlighted, byKeyboard, direction, prevCursorLocation) {
          _this2.setState({
            highlighted: highlighted
          }, function () {
            if (highlighted && byKeyboard) {
              var _el = _this2._el;
              /*:: if (!el) throw new Error(); */

              if (typeof _el.scrollIntoViewIfNeeded === 'function') {
                _el.scrollIntoViewIfNeeded();
              } else if (_el.scrollIntoView) {
                _el.scrollIntoView();
              }
            }
          });

          if (_this2.props.onHighlightChange) {
            _this2.props.onHighlightChange(highlighted, {
              byKeyboard: byKeyboard == null ? undefined : byKeyboard,
              prevCursorLocation: prevCursorLocation == null ? undefined : prevCursorLocation,
              direction: direction == null ? undefined : direction
            });
          }
        },
        notifyEvent: function notifyEvent(event) {
          switch (event.type) {
            case 'chosen':
              /*:: if (!(event instanceof ChosenEvent)) throw new Error(); */
              if (_this2.props.onItemChosen) _this2.props.onItemChosen(event);
              break;

            case 'left':
              if (_this2.props.onLeftPushed) _this2.props.onLeftPushed(event);
              break;

            case 'right':
              if (_this2.props.onRightPushed) _this2.props.onRightPushed(event);
              break;
          }
        }
      }, el);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this._menuListHandle.unregister();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this._menuListHandle.updateProps(this.props);
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$props = this.props,
          children = _this$props.children,
          onMouseLeave = _this$props.onMouseLeave,
          _this$props$behaviour = _this$props.behaviour,
          behaviour = _this$props$behaviour === void 0 ? 'web' : _this$props$behaviour;
      var highlighted = this.state.highlighted;
      var style = this.props.style;
      var className = this.props.className;

      if (highlighted) {
        if (this.props.highlightedStyle) {
          style = _objectSpread(_objectSpread({}, style), this.props.highlightedStyle);
        }

        if (this.props.highlightedClassName) {
          className = "".concat(className || '', " ").concat(this.props.highlightedClassName);
        }
      }

      return /*#__PURE__*/_react["default"].createElement("div", {
        ref: this._elSetter,
        style: style,
        className: className,
        onMouseDown: function onMouseDown(e) {
          return e.preventDefault();
        },
        onClick: function onClick(e) {
          return _this3._menuListHandle.itemChosen({
            withShift: e.shiftKey,
            withMeta: e.metaKey,
            withCtrl: e.ctrlKey,
            withAlt: e.altKey
          });
        },
        onAuxClick: behaviour === 'desktop' ? function (e) {
          _this3._menuListHandle.itemChosen({
            withShift: e.shiftKey,
            withMeta: e.metaKey,
            withCtrl: e.ctrlKey,
            withAlt: e.altKey
          });
        } : undefined,
        onContextMenu: behaviour === 'desktop' ? function (e) {
          e.preventDefault(); // handled in onAuxClick
        } : undefined,
        onMouseEnter: function onMouseEnter() {
          return _this3.highlight(false);
        },
        onMouseLeave: onMouseLeave || function () {
          return _this3.unhighlight();
        },
        role: "menuitem",
        "aria-haspopup": this.props['aria-haspopup'],
        "aria-expanded": this.props['aria-expanded']
      }, children);
    }
  }]);
  return MenuItem;
}(_react["default"].Component);

exports["default"] = MenuItem;
(0, _defineProperty2["default"])(MenuItem, "propTypes", {
  onItemChosen: _propTypes["default"].func,
  onHighlightChange: _propTypes["default"].func,
  onLeftPushed: _propTypes["default"].func,
  onRightPushed: _propTypes["default"].func,
  className: _propTypes["default"].string,
  style: _propTypes["default"].object,
  highlightedClassName: _propTypes["default"].string,
  highlightedStyle: _propTypes["default"].object,
  index: _propTypes["default"].number,
  onMouseLeave: _propTypes["default"].func,
  children: _propTypes["default"].node,
  domRef: _propTypes["default"].oneOfType([_propTypes["default"].object, _propTypes["default"].func]),
  'aria-haspopup': _propTypes["default"].bool,
  'aria-expanded': _propTypes["default"].bool
});
(0, _defineProperty2["default"])(MenuItem, "contextType", _MenuList.MenuListContext);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9NZW51SXRlbS5qcyJdLCJuYW1lcyI6WyJNZW51SXRlbSIsImhpZ2hsaWdodGVkIiwiZWwiLCJfZWwiLCJwcm9wcyIsImRvbVJlZiIsInN0YXRlIiwiX21lbnVMaXN0SGFuZGxlIiwidGFrZUtleWJvYXJkIiwicmVsZWFzZUtleWJvYXJkIiwibG9ja0hpZ2hsaWdodCIsInVubG9ja0hpZ2hsaWdodCIsImJ5S2V5Ym9hcmQiLCJoaWdobGlnaHQiLCJ1bmhpZ2hsaWdodCIsImRpcmVjdGlvbiIsInByZXZDdXJzb3JMb2NhdGlvbiIsIm1vdmVDdXJzb3IiLCJjb250ZXh0IiwicmVnaXN0ZXJJdGVtIiwibm90aWZ5SGlnaGxpZ2h0ZWQiLCJzZXRTdGF0ZSIsInNjcm9sbEludG9WaWV3SWZOZWVkZWQiLCJzY3JvbGxJbnRvVmlldyIsIm9uSGlnaGxpZ2h0Q2hhbmdlIiwidW5kZWZpbmVkIiwibm90aWZ5RXZlbnQiLCJldmVudCIsInR5cGUiLCJvbkl0ZW1DaG9zZW4iLCJvbkxlZnRQdXNoZWQiLCJvblJpZ2h0UHVzaGVkIiwidW5yZWdpc3RlciIsInVwZGF0ZVByb3BzIiwiY2hpbGRyZW4iLCJvbk1vdXNlTGVhdmUiLCJiZWhhdmlvdXIiLCJzdHlsZSIsImNsYXNzTmFtZSIsImhpZ2hsaWdodGVkU3R5bGUiLCJoaWdobGlnaHRlZENsYXNzTmFtZSIsIl9lbFNldHRlciIsImUiLCJwcmV2ZW50RGVmYXVsdCIsIml0ZW1DaG9zZW4iLCJ3aXRoU2hpZnQiLCJzaGlmdEtleSIsIndpdGhNZXRhIiwibWV0YUtleSIsIndpdGhDdHJsIiwiY3RybEtleSIsIndpdGhBbHQiLCJhbHRLZXkiLCJSZWFjdCIsIkNvbXBvbmVudCIsIlByb3BUeXBlcyIsImZ1bmMiLCJzdHJpbmciLCJvYmplY3QiLCJpbmRleCIsIm51bWJlciIsIm5vZGUiLCJvbmVPZlR5cGUiLCJib29sIiwiTWVudUxpc3RDb250ZXh0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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KiBAZmxvdyAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHR5cGUge1JlZiBhcyBSZWFjdFJlZiwgTm9kZSBhcyBSZWFjdE5vZGV9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5cbmltcG9ydCB0eXBlIE1lbnVFdmVudCBmcm9tICcuL2V2ZW50cy9NZW51RXZlbnQnO1xuaW1wb3J0IENob3NlbkV2ZW50IGZyb20gJy4vZXZlbnRzL0Nob3NlbkV2ZW50JztcbmltcG9ydCB7TWVudUxpc3RDb250ZXh0fSBmcm9tICcuL01lbnVMaXN0JztcbmltcG9ydCB0eXBlIHtNZW51TGlzdENvbnRleHRWYWx1ZSwgTWVudUxpc3RIYW5kbGV9IGZyb20gJy4vTWVudUxpc3QnO1xuaW1wb3J0IHNldFJlZiBmcm9tICcuL2xpYi9zZXRSZWYnO1xuaW1wb3J0IHR5cGUge0RpcmVjdGlvbiwgUmVjdH0gZnJvbSAnLi90eXBlcyc7XG5cbnR5cGUgU3RhdGUgPSB7XG4gIGhpZ2hsaWdodGVkOiBib29sZWFuLFxufTtcblxuZXhwb3J0IHR5cGUgUHJvcHMgPSB7XG4gIG9uSXRlbUNob3Nlbj86IChldmVudDogQ2hvc2VuRXZlbnQpID0+IHZvaWQsXG4gIG9uTGVmdFB1c2hlZD86IChldmVudDogTWVudUV2ZW50KSA9PiB2b2lkLFxuICBvblJpZ2h0UHVzaGVkPzogKGV2ZW50OiBNZW51RXZlbnQpID0+IHZvaWQsXG4gIG9uSGlnaGxpZ2h0Q2hhbmdlPzogKFxuICAgIGhpZ2hsaWdodGVkOiBib29sZWFuLFxuICAgIGRldGFpbHM6IHtcbiAgICAgIGJ5S2V5Ym9hcmQ/OiBib29sZWFuLFxuICAgICAgcHJldkN1cnNvckxvY2F0aW9uPzogUmVjdCxcbiAgICAgIGRpcmVjdGlvbj86IERpcmVjdGlvbixcbiAgICB9XG4gICkgPT4gdm9pZCxcblxuICBjbGFzc05hbWU/OiBzdHJpbmcsXG4gIHN0eWxlPzogT2JqZWN0LFxuICBoaWdobGlnaHRlZENsYXNzTmFtZT86IHN0cmluZyxcbiAgaGlnaGxpZ2h0ZWRTdHlsZT86IE9iamVjdCxcblxuICBpbmRleD86IG51bWJlcixcbiAgb25Nb3VzZUxlYXZlPzogKGV2ZW50OiBNb3VzZUV2ZW50KSA9PiB2b2lkLFxuICBiZWhhdmlvdXI/OiAnZGVza3RvcCcgfCAnd2ViJyxcblxuICBjaGlsZHJlbj86IFJlYWN0Tm9kZSxcblxuICBkb21SZWY/OiBSZWFjdFJlZjwnZGl2Jz4sXG5cbiAgJ2FyaWEtaGFzcG9wdXAnPzogYm9vbGVhbixcbiAgJ2FyaWEtZXhwYW5kZWQnPzogYm9vbGVhbixcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1lbnVJdGVtIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PFByb3BzLCBTdGF0ZT4ge1xuICBfbWVudUxpc3RIYW5kbGU6IE1lbnVMaXN0SGFuZGxlO1xuICBzdGF0ZSA9IHtcbiAgICBoaWdobGlnaHRlZDogZmFsc2UsXG4gIH07XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgb25JdGVtQ2hvc2VuOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvbkhpZ2hsaWdodENoYW5nZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25MZWZ0UHVzaGVkOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvblJpZ2h0UHVzaGVkOiBQcm9wVHlwZXMuZnVuYyxcblxuICAgIGNsYXNzTmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBzdHlsZTogUHJvcFR5cGVzLm9iamVjdCxcbiAgICBoaWdobGlnaHRlZENsYXNzTmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBoaWdobGlnaHRlZFN0eWxlOiBQcm9wVHlwZXMub2JqZWN0LFxuXG4gICAgaW5kZXg6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgb25Nb3VzZUxlYXZlOiBQcm9wVHlwZXMuZnVuYyxcblxuICAgIGNoaWxkcmVuOiBQcm9wVHlwZXMubm9kZSxcblxuICAgIGRvbVJlZjogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLm9iamVjdCwgUHJvcFR5cGVzLmZ1bmNdKSxcblxuICAgICdhcmlhLWhhc3BvcHVwJzogUHJvcFR5cGVzLmJvb2wsXG4gICAgJ2FyaWEtZXhwYW5kZWQnOiBQcm9wVHlwZXMuYm9vbCxcbiAgfTtcblxuICBzdGF0aWMgY29udGV4dFR5cGUgPSBNZW51TGlzdENvbnRleHQ7XG5cbiAgX2VsOiA/SFRNTERpdkVsZW1lbnQ7XG4gIF9lbFNldHRlciA9IChlbDogP0hUTUxEaXZFbGVtZW50KSA9PiB7XG4gICAgdGhpcy5fZWwgPSBlbDtcblxuICAgIGlmICh0aGlzLnByb3BzLmRvbVJlZikge1xuICAgICAgc2V0UmVmKHRoaXMucHJvcHMuZG9tUmVmLCBlbCk7XG4gICAgfVxuICB9O1xuXG4gIGhhc0hpZ2hsaWdodCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5zdGF0ZS5oaWdobGlnaHRlZDtcbiAgfVxuXG4gIHRha2VLZXlib2FyZCgpIHtcbiAgICB0aGlzLl9tZW51TGlzdEhhbmRsZS50YWtlS2V5Ym9hcmQoKTtcbiAgfVxuXG4gIHJlbGVhc2VLZXlib2FyZCgpIHtcbiAgICB0aGlzLl9tZW51TGlzdEhhbmRsZS5yZWxlYXNlS2V5Ym9hcmQoKTtcbiAgfVxuXG4gIGxvY2tIaWdobGlnaHQoKSB7XG4gICAgdGhpcy5fbWVudUxpc3RIYW5kbGUubG9ja0hpZ2hsaWdodCgpO1xuICB9XG5cbiAgdW5sb2NrSGlnaGxpZ2h0KCkge1xuICAgIHRoaXMuX21lbnVMaXN0SGFuZGxlLnVubG9ja0hpZ2hsaWdodCgpO1xuICB9XG5cbiAgLy8gYnlLZXlib2FyZCBmb3JjZXMgZm9jdXMgaW1tZWRpYXRlbHkgYW5kIHNjcm9sbHMgdGhlIGl0ZW0gaW50byB2aWV3LlxuICAvLyBXaXRoIGl0IGZhbHNlLCB0aGUgaGlnaGxpZ2h0IG1pZ2h0IGJlIGRlbGF5ZWQgZGVwZW5kaW5nIG9uIG1vdXNlIG1vdmVtZW50XG4gIC8vIGFuZCB3b24ndCBjYXVzZSBhbnl0aGluZyB0byBzY3JvbGwuXG4gIGhpZ2hsaWdodChieUtleWJvYXJkOiBib29sZWFuID0gdHJ1ZSkge1xuICAgIHRoaXMuX21lbnVMaXN0SGFuZGxlLmhpZ2hsaWdodChieUtleWJvYXJkKTtcbiAgfVxuXG4gIHVuaGlnaGxpZ2h0KCkge1xuICAgIHRoaXMuX21lbnVMaXN0SGFuZGxlLnVuaGlnaGxpZ2h0KCk7XG4gIH1cblxuICBtb3ZlQ3Vyc29yKGRpcmVjdGlvbjogRGlyZWN0aW9uLCBwcmV2Q3Vyc29yTG9jYXRpb246ID9SZWN0KSB7XG4gICAgdGhpcy5fbWVudUxpc3RIYW5kbGUubW92ZUN1cnNvcihkaXJlY3Rpb24sIHByZXZDdXJzb3JMb2NhdGlvbik7XG4gIH1cblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICBjb25zdCBlbCA9IHRoaXMuX2VsO1xuICAgIC8qOjogaWYgKCFlbCkgdGhyb3cgbmV3IEVycm9yKCk7ICovXG5cbiAgICB0aGlzLl9tZW51TGlzdEhhbmRsZSA9ICh0aGlzLmNvbnRleHQ6IE1lbnVMaXN0Q29udGV4dFZhbHVlKS5yZWdpc3Rlckl0ZW0oXG4gICAgICB0aGlzLnByb3BzLFxuICAgICAge1xuICAgICAgICBub3RpZnlIaWdobGlnaHRlZDogKFxuICAgICAgICAgIGhpZ2hsaWdodGVkOiBib29sZWFuLFxuICAgICAgICAgIGJ5S2V5Ym9hcmQ6ID9ib29sZWFuLFxuICAgICAgICAgIGRpcmVjdGlvbjogP0RpcmVjdGlvbixcbiAgICAgICAgICBwcmV2Q3Vyc29yTG9jYXRpb246ID9SZWN0XG4gICAgICAgICkgPT4ge1xuICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2hpZ2hsaWdodGVkfSwgKCkgPT4ge1xuICAgICAgICAgICAgaWYgKGhpZ2hsaWdodGVkICYmIGJ5S2V5Ym9hcmQpIHtcbiAgICAgICAgICAgICAgY29uc3QgZWwgPSB0aGlzLl9lbDtcbiAgICAgICAgICAgICAgLyo6OiBpZiAoIWVsKSB0aHJvdyBuZXcgRXJyb3IoKTsgKi9cbiAgICAgICAgICAgICAgaWYgKHR5cGVvZiAoZWw6IGFueSkuc2Nyb2xsSW50b1ZpZXdJZk5lZWRlZCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIChlbDogYW55KS5zY3JvbGxJbnRvVmlld0lmTmVlZGVkKCk7XG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAoZWwuc2Nyb2xsSW50b1ZpZXcpIHtcbiAgICAgICAgICAgICAgICBlbC5zY3JvbGxJbnRvVmlldygpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgaWYgKHRoaXMucHJvcHMub25IaWdobGlnaHRDaGFuZ2UpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25IaWdobGlnaHRDaGFuZ2UoaGlnaGxpZ2h0ZWQsIHtcbiAgICAgICAgICAgICAgYnlLZXlib2FyZDogYnlLZXlib2FyZCA9PSBudWxsID8gdW5kZWZpbmVkIDogYnlLZXlib2FyZCxcbiAgICAgICAgICAgICAgcHJldkN1cnNvckxvY2F0aW9uOlxuICAgICAgICAgICAgICAgIHByZXZDdXJzb3JMb2NhdGlvbiA9PSBudWxsID8gdW5kZWZpbmVkIDogcHJldkN1cnNvckxvY2F0aW9uLFxuICAgICAgICAgICAgICBkaXJlY3Rpb246IGRpcmVjdGlvbiA9PSBudWxsID8gdW5kZWZpbmVkIDogZGlyZWN0aW9uLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBub3RpZnlFdmVudDogKGV2ZW50OiBNZW51RXZlbnQpID0+IHtcbiAgICAgICAgICBzd2l0Y2ggKGV2ZW50LnR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ2Nob3Nlbic6XG4gICAgICAgICAgICAgIC8qOjogaWYgKCEoZXZlbnQgaW5zdGFuY2VvZiBDaG9zZW5FdmVudCkpIHRocm93IG5ldyBFcnJvcigpOyAqL1xuICAgICAgICAgICAgICBpZiAodGhpcy5wcm9wcy5vbkl0ZW1DaG9zZW4pIHRoaXMucHJvcHMub25JdGVtQ2hvc2VuKGV2ZW50KTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdsZWZ0JzpcbiAgICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMub25MZWZ0UHVzaGVkKSB0aGlzLnByb3BzLm9uTGVmdFB1c2hlZChldmVudCk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAncmlnaHQnOlxuICAgICAgICAgICAgICBpZiAodGhpcy5wcm9wcy5vblJpZ2h0UHVzaGVkKSB0aGlzLnByb3BzLm9uUmlnaHRQdXNoZWQoZXZlbnQpO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgZWxcbiAgICApO1xuICB9XG5cbiAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgdGhpcy5fbWVudUxpc3RIYW5kbGUudW5yZWdpc3RlcigpO1xuICB9XG5cbiAgY29tcG9uZW50RGlkVXBkYXRlKCkge1xuICAgIHRoaXMuX21lbnVMaXN0SGFuZGxlLnVwZGF0ZVByb3BzKHRoaXMucHJvcHMpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtjaGlsZHJlbiwgb25Nb3VzZUxlYXZlLCBiZWhhdmlvdXIgPSAnd2ViJ30gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHtoaWdobGlnaHRlZH0gPSB0aGlzLnN0YXRlO1xuXG4gICAgbGV0IHN0eWxlID0gdGhpcy5wcm9wcy5zdHlsZTtcbiAgICBsZXQgY2xhc3NOYW1lID0gdGhpcy5wcm9wcy5jbGFzc05hbWU7XG4gICAgaWYgKGhpZ2hsaWdodGVkKSB7XG4gICAgICBpZiAodGhpcy5wcm9wcy5oaWdobGlnaHRlZFN0eWxlKSB7XG4gICAgICAgIHN0eWxlID0gey4uLnN0eWxlLCAuLi50aGlzLnByb3BzLmhpZ2hsaWdodGVkU3R5bGV9O1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMucHJvcHMuaGlnaGxpZ2h0ZWRDbGFzc05hbWUpIHtcbiAgICAgICAgY2xhc3NOYW1lID0gYCR7Y2xhc3NOYW1lIHx8ICcnfSAke3RoaXMucHJvcHMuaGlnaGxpZ2h0ZWRDbGFzc05hbWV9YDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdlxuICAgICAgICByZWY9e3RoaXMuX2VsU2V0dGVyfVxuICAgICAgICBzdHlsZT17c3R5bGV9XG4gICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lfVxuICAgICAgICBvbk1vdXNlRG93bj17ZSA9PiBlLnByZXZlbnREZWZhdWx0KCl9XG4gICAgICAgIG9uQ2xpY2s9e2UgPT5cbiAgICAgICAgICB0aGlzLl9tZW51TGlzdEhhbmRsZS5pdGVtQ2hvc2VuKHtcbiAgICAgICAgICAgIHdpdGhTaGlmdDogZS5zaGlmdEtleSxcbiAgICAgICAgICAgIHdpdGhNZXRhOiBlLm1ldGFLZXksXG4gICAgICAgICAgICB3aXRoQ3RybDogZS5jdHJsS2V5LFxuICAgICAgICAgICAgd2l0aEFsdDogZS5hbHRLZXksXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICBvbkF1eENsaWNrPXtcbiAgICAgICAgICBiZWhhdmlvdXIgPT09ICdkZXNrdG9wJ1xuICAgICAgICAgICAgPyBlID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLl9tZW51TGlzdEhhbmRsZS5pdGVtQ2hvc2VuKHtcbiAgICAgICAgICAgICAgICAgIHdpdGhTaGlmdDogZS5zaGlmdEtleSxcbiAgICAgICAgICAgICAgICAgIHdpdGhNZXRhOiBlLm1ldGFLZXksXG4gICAgICAgICAgICAgICAgICB3aXRoQ3RybDogZS5jdHJsS2V5LFxuICAgICAgICAgICAgICAgICAgd2l0aEFsdDogZS5hbHRLZXksXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDogdW5kZWZpbmVkXG4gICAgICAgIH1cbiAgICAgICAgb25Db250ZXh0TWVudT17XG4gICAgICAgICAgYmVoYXZpb3VyID09PSAnZGVza3RvcCdcbiAgICAgICAgICAgID8gZSA9PiB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpOyAvLyBoYW5kbGVkIGluIG9uQXV4Q2xpY2tcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgOiB1bmRlZmluZWRcbiAgICAgICAgfVxuICAgICAgICBvbk1vdXNlRW50ZXI9eygpID0+IHRoaXMuaGlnaGxpZ2h0KGZhbHNlKX1cbiAgICAgICAgb25Nb3VzZUxlYXZlPXtvbk1vdXNlTGVhdmUgfHwgKCgpID0+IHRoaXMudW5oaWdobGlnaHQoKSl9XG4gICAgICAgIHJvbGU9XCJtZW51aXRlbVwiXG4gICAgICAgIGFyaWEtaGFzcG9wdXA9e3RoaXMucHJvcHNbJ2FyaWEtaGFzcG9wdXAnXX1cbiAgICAgICAgYXJpYS1leHBhbmRlZD17dGhpcy5wcm9wc1snYXJpYS1leHBhbmRlZCddfVxuICAgICAgPlxuICAgICAgICB7Y2hpbGRyZW59XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG4iXX0=