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
            withAlt: e.altKey,
            button: e.button
          });
        },
        onAuxClick: behaviour === 'desktop' ? function (e) {
          _this3._menuListHandle.itemChosen({
            withShift: e.shiftKey,
            withMeta: e.metaKey,
            withCtrl: e.ctrlKey,
            withAlt: e.altKey,
            button: e.button
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9NZW51SXRlbS5qcyJdLCJuYW1lcyI6WyJNZW51SXRlbSIsImhpZ2hsaWdodGVkIiwiZWwiLCJfZWwiLCJwcm9wcyIsImRvbVJlZiIsInN0YXRlIiwiX21lbnVMaXN0SGFuZGxlIiwidGFrZUtleWJvYXJkIiwicmVsZWFzZUtleWJvYXJkIiwibG9ja0hpZ2hsaWdodCIsInVubG9ja0hpZ2hsaWdodCIsImJ5S2V5Ym9hcmQiLCJoaWdobGlnaHQiLCJ1bmhpZ2hsaWdodCIsImRpcmVjdGlvbiIsInByZXZDdXJzb3JMb2NhdGlvbiIsIm1vdmVDdXJzb3IiLCJjb250ZXh0IiwicmVnaXN0ZXJJdGVtIiwibm90aWZ5SGlnaGxpZ2h0ZWQiLCJzZXRTdGF0ZSIsInNjcm9sbEludG9WaWV3SWZOZWVkZWQiLCJzY3JvbGxJbnRvVmlldyIsIm9uSGlnaGxpZ2h0Q2hhbmdlIiwidW5kZWZpbmVkIiwibm90aWZ5RXZlbnQiLCJldmVudCIsInR5cGUiLCJvbkl0ZW1DaG9zZW4iLCJvbkxlZnRQdXNoZWQiLCJvblJpZ2h0UHVzaGVkIiwidW5yZWdpc3RlciIsInVwZGF0ZVByb3BzIiwiY2hpbGRyZW4iLCJvbk1vdXNlTGVhdmUiLCJiZWhhdmlvdXIiLCJzdHlsZSIsImNsYXNzTmFtZSIsImhpZ2hsaWdodGVkU3R5bGUiLCJoaWdobGlnaHRlZENsYXNzTmFtZSIsIl9lbFNldHRlciIsImUiLCJwcmV2ZW50RGVmYXVsdCIsIml0ZW1DaG9zZW4iLCJ3aXRoU2hpZnQiLCJzaGlmdEtleSIsIndpdGhNZXRhIiwibWV0YUtleSIsIndpdGhDdHJsIiwiY3RybEtleSIsIndpdGhBbHQiLCJhbHRLZXkiLCJidXR0b24iLCJSZWFjdCIsIkNvbXBvbmVudCIsIlByb3BUeXBlcyIsImZ1bmMiLCJzdHJpbmciLCJvYmplY3QiLCJpbmRleCIsIm51bWJlciIsIm5vZGUiLCJvbmVPZlR5cGUiLCJib29sIiwiTWVudUxpc3RDb250ZXh0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7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QUFpQkQsc0JBQVVRLElBbEJWO0FBbUJqQixtQkFBaUJSLHNCQUFVUTtBQW5CVixDO2lDQUxBaEUsUSxpQkEyQkVpRSx5QiIsInNvdXJjZXNDb250ZW50IjpbIi8qIEBmbG93ICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgdHlwZSB7UmVmIGFzIFJlYWN0UmVmLCBOb2RlIGFzIFJlYWN0Tm9kZX0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcblxuaW1wb3J0IHR5cGUgTWVudUV2ZW50IGZyb20gJy4vZXZlbnRzL01lbnVFdmVudCc7XG5pbXBvcnQgQ2hvc2VuRXZlbnQgZnJvbSAnLi9ldmVudHMvQ2hvc2VuRXZlbnQnO1xuaW1wb3J0IHtNZW51TGlzdENvbnRleHR9IGZyb20gJy4vTWVudUxpc3QnO1xuaW1wb3J0IHR5cGUge01lbnVMaXN0Q29udGV4dFZhbHVlLCBNZW51TGlzdEhhbmRsZX0gZnJvbSAnLi9NZW51TGlzdCc7XG5pbXBvcnQgc2V0UmVmIGZyb20gJy4vbGliL3NldFJlZic7XG5pbXBvcnQgdHlwZSB7RGlyZWN0aW9uLCBSZWN0fSBmcm9tICcuL3R5cGVzJztcblxudHlwZSBTdGF0ZSA9IHtcbiAgaGlnaGxpZ2h0ZWQ6IGJvb2xlYW4sXG59O1xuXG5leHBvcnQgdHlwZSBQcm9wcyA9IHtcbiAgb25JdGVtQ2hvc2VuPzogKGV2ZW50OiBDaG9zZW5FdmVudCkgPT4gdm9pZCxcbiAgb25MZWZ0UHVzaGVkPzogKGV2ZW50OiBNZW51RXZlbnQpID0+IHZvaWQsXG4gIG9uUmlnaHRQdXNoZWQ/OiAoZXZlbnQ6IE1lbnVFdmVudCkgPT4gdm9pZCxcbiAgb25IaWdobGlnaHRDaGFuZ2U/OiAoXG4gICAgaGlnaGxpZ2h0ZWQ6IGJvb2xlYW4sXG4gICAgZGV0YWlsczoge1xuICAgICAgYnlLZXlib2FyZD86IGJvb2xlYW4sXG4gICAgICBwcmV2Q3Vyc29yTG9jYXRpb24/OiBSZWN0LFxuICAgICAgZGlyZWN0aW9uPzogRGlyZWN0aW9uLFxuICAgIH1cbiAgKSA9PiB2b2lkLFxuXG4gIGNsYXNzTmFtZT86IHN0cmluZyxcbiAgc3R5bGU/OiBPYmplY3QsXG4gIGhpZ2hsaWdodGVkQ2xhc3NOYW1lPzogc3RyaW5nLFxuICBoaWdobGlnaHRlZFN0eWxlPzogT2JqZWN0LFxuXG4gIGluZGV4PzogbnVtYmVyLFxuICBvbk1vdXNlTGVhdmU/OiAoZXZlbnQ6IE1vdXNlRXZlbnQpID0+IHZvaWQsXG4gIGJlaGF2aW91cj86ICdkZXNrdG9wJyB8ICd3ZWInLFxuXG4gIGNoaWxkcmVuPzogUmVhY3ROb2RlLFxuXG4gIGRvbVJlZj86IFJlYWN0UmVmPCdkaXYnPixcblxuICAnYXJpYS1oYXNwb3B1cCc/OiBib29sZWFuLFxuICAnYXJpYS1leHBhbmRlZCc/OiBib29sZWFuLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWVudUl0ZW0gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQ8UHJvcHMsIFN0YXRlPiB7XG4gIF9tZW51TGlzdEhhbmRsZTogTWVudUxpc3RIYW5kbGU7XG4gIHN0YXRlID0ge1xuICAgIGhpZ2hsaWdodGVkOiBmYWxzZSxcbiAgfTtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBvbkl0ZW1DaG9zZW46IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uSGlnaGxpZ2h0Q2hhbmdlOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvbkxlZnRQdXNoZWQ6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uUmlnaHRQdXNoZWQ6IFByb3BUeXBlcy5mdW5jLFxuXG4gICAgY2xhc3NOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHN0eWxlOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgIGhpZ2hsaWdodGVkQ2xhc3NOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGhpZ2hsaWdodGVkU3R5bGU6IFByb3BUeXBlcy5vYmplY3QsXG5cbiAgICBpbmRleDogUHJvcFR5cGVzLm51bWJlcixcbiAgICBvbk1vdXNlTGVhdmU6IFByb3BUeXBlcy5mdW5jLFxuXG4gICAgY2hpbGRyZW46IFByb3BUeXBlcy5ub2RlLFxuXG4gICAgZG9tUmVmOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMub2JqZWN0LCBQcm9wVHlwZXMuZnVuY10pLFxuXG4gICAgJ2FyaWEtaGFzcG9wdXAnOiBQcm9wVHlwZXMuYm9vbCxcbiAgICAnYXJpYS1leHBhbmRlZCc6IFByb3BUeXBlcy5ib29sLFxuICB9O1xuXG4gIHN0YXRpYyBjb250ZXh0VHlwZSA9IE1lbnVMaXN0Q29udGV4dDtcblxuICBfZWw6ID9IVE1MRGl2RWxlbWVudDtcbiAgX2VsU2V0dGVyID0gKGVsOiA/SFRNTERpdkVsZW1lbnQpID0+IHtcbiAgICB0aGlzLl9lbCA9IGVsO1xuXG4gICAgaWYgKHRoaXMucHJvcHMuZG9tUmVmKSB7XG4gICAgICBzZXRSZWYodGhpcy5wcm9wcy5kb21SZWYsIGVsKTtcbiAgICB9XG4gIH07XG5cbiAgaGFzSGlnaGxpZ2h0KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnN0YXRlLmhpZ2hsaWdodGVkO1xuICB9XG5cbiAgdGFrZUtleWJvYXJkKCkge1xuICAgIHRoaXMuX21lbnVMaXN0SGFuZGxlLnRha2VLZXlib2FyZCgpO1xuICB9XG5cbiAgcmVsZWFzZUtleWJvYXJkKCkge1xuICAgIHRoaXMuX21lbnVMaXN0SGFuZGxlLnJlbGVhc2VLZXlib2FyZCgpO1xuICB9XG5cbiAgbG9ja0hpZ2hsaWdodCgpIHtcbiAgICB0aGlzLl9tZW51TGlzdEhhbmRsZS5sb2NrSGlnaGxpZ2h0KCk7XG4gIH1cblxuICB1bmxvY2tIaWdobGlnaHQoKSB7XG4gICAgdGhpcy5fbWVudUxpc3RIYW5kbGUudW5sb2NrSGlnaGxpZ2h0KCk7XG4gIH1cblxuICAvLyBieUtleWJvYXJkIGZvcmNlcyBmb2N1cyBpbW1lZGlhdGVseSBhbmQgc2Nyb2xscyB0aGUgaXRlbSBpbnRvIHZpZXcuXG4gIC8vIFdpdGggaXQgZmFsc2UsIHRoZSBoaWdobGlnaHQgbWlnaHQgYmUgZGVsYXllZCBkZXBlbmRpbmcgb24gbW91c2UgbW92ZW1lbnRcbiAgLy8gYW5kIHdvbid0IGNhdXNlIGFueXRoaW5nIHRvIHNjcm9sbC5cbiAgaGlnaGxpZ2h0KGJ5S2V5Ym9hcmQ6IGJvb2xlYW4gPSB0cnVlKSB7XG4gICAgdGhpcy5fbWVudUxpc3RIYW5kbGUuaGlnaGxpZ2h0KGJ5S2V5Ym9hcmQpO1xuICB9XG5cbiAgdW5oaWdobGlnaHQoKSB7XG4gICAgdGhpcy5fbWVudUxpc3RIYW5kbGUudW5oaWdobGlnaHQoKTtcbiAgfVxuXG4gIG1vdmVDdXJzb3IoZGlyZWN0aW9uOiBEaXJlY3Rpb24sIHByZXZDdXJzb3JMb2NhdGlvbjogP1JlY3QpIHtcbiAgICB0aGlzLl9tZW51TGlzdEhhbmRsZS5tb3ZlQ3Vyc29yKGRpcmVjdGlvbiwgcHJldkN1cnNvckxvY2F0aW9uKTtcbiAgfVxuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIGNvbnN0IGVsID0gdGhpcy5fZWw7XG4gICAgLyo6OiBpZiAoIWVsKSB0aHJvdyBuZXcgRXJyb3IoKTsgKi9cblxuICAgIHRoaXMuX21lbnVMaXN0SGFuZGxlID0gKHRoaXMuY29udGV4dDogTWVudUxpc3RDb250ZXh0VmFsdWUpLnJlZ2lzdGVySXRlbShcbiAgICAgIHRoaXMucHJvcHMsXG4gICAgICB7XG4gICAgICAgIG5vdGlmeUhpZ2hsaWdodGVkOiAoXG4gICAgICAgICAgaGlnaGxpZ2h0ZWQ6IGJvb2xlYW4sXG4gICAgICAgICAgYnlLZXlib2FyZDogP2Jvb2xlYW4sXG4gICAgICAgICAgZGlyZWN0aW9uOiA/RGlyZWN0aW9uLFxuICAgICAgICAgIHByZXZDdXJzb3JMb2NhdGlvbjogP1JlY3RcbiAgICAgICAgKSA9PiB7XG4gICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7aGlnaGxpZ2h0ZWR9LCAoKSA9PiB7XG4gICAgICAgICAgICBpZiAoaGlnaGxpZ2h0ZWQgJiYgYnlLZXlib2FyZCkge1xuICAgICAgICAgICAgICBjb25zdCBlbCA9IHRoaXMuX2VsO1xuICAgICAgICAgICAgICAvKjo6IGlmICghZWwpIHRocm93IG5ldyBFcnJvcigpOyAqL1xuICAgICAgICAgICAgICBpZiAodHlwZW9mIChlbDogYW55KS5zY3JvbGxJbnRvVmlld0lmTmVlZGVkID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgKGVsOiBhbnkpLnNjcm9sbEludG9WaWV3SWZOZWVkZWQoKTtcbiAgICAgICAgICAgICAgfSBlbHNlIGlmIChlbC5zY3JvbGxJbnRvVmlldykge1xuICAgICAgICAgICAgICAgIGVsLnNjcm9sbEludG9WaWV3KCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgICBpZiAodGhpcy5wcm9wcy5vbkhpZ2hsaWdodENoYW5nZSkge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vbkhpZ2hsaWdodENoYW5nZShoaWdobGlnaHRlZCwge1xuICAgICAgICAgICAgICBieUtleWJvYXJkOiBieUtleWJvYXJkID09IG51bGwgPyB1bmRlZmluZWQgOiBieUtleWJvYXJkLFxuICAgICAgICAgICAgICBwcmV2Q3Vyc29yTG9jYXRpb246XG4gICAgICAgICAgICAgICAgcHJldkN1cnNvckxvY2F0aW9uID09IG51bGwgPyB1bmRlZmluZWQgOiBwcmV2Q3Vyc29yTG9jYXRpb24sXG4gICAgICAgICAgICAgIGRpcmVjdGlvbjogZGlyZWN0aW9uID09IG51bGwgPyB1bmRlZmluZWQgOiBkaXJlY3Rpb24sXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIG5vdGlmeUV2ZW50OiAoZXZlbnQ6IE1lbnVFdmVudCkgPT4ge1xuICAgICAgICAgIHN3aXRjaCAoZXZlbnQudHlwZSkge1xuICAgICAgICAgICAgY2FzZSAnY2hvc2VuJzpcbiAgICAgICAgICAgICAgLyo6OiBpZiAoIShldmVudCBpbnN0YW5jZW9mIENob3NlbkV2ZW50KSkgdGhyb3cgbmV3IEVycm9yKCk7ICovXG4gICAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLm9uSXRlbUNob3NlbikgdGhpcy5wcm9wcy5vbkl0ZW1DaG9zZW4oZXZlbnQpO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2xlZnQnOlxuICAgICAgICAgICAgICBpZiAodGhpcy5wcm9wcy5vbkxlZnRQdXNoZWQpIHRoaXMucHJvcHMub25MZWZ0UHVzaGVkKGV2ZW50KTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdyaWdodCc6XG4gICAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLm9uUmlnaHRQdXNoZWQpIHRoaXMucHJvcHMub25SaWdodFB1c2hlZChldmVudCk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICBlbFxuICAgICk7XG4gIH1cblxuICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICB0aGlzLl9tZW51TGlzdEhhbmRsZS51bnJlZ2lzdGVyKCk7XG4gIH1cblxuICBjb21wb25lbnREaWRVcGRhdGUoKSB7XG4gICAgdGhpcy5fbWVudUxpc3RIYW5kbGUudXBkYXRlUHJvcHModGhpcy5wcm9wcyk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge2NoaWxkcmVuLCBvbk1vdXNlTGVhdmUsIGJlaGF2aW91ciA9ICd3ZWInfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3Qge2hpZ2hsaWdodGVkfSA9IHRoaXMuc3RhdGU7XG5cbiAgICBsZXQgc3R5bGUgPSB0aGlzLnByb3BzLnN0eWxlO1xuICAgIGxldCBjbGFzc05hbWUgPSB0aGlzLnByb3BzLmNsYXNzTmFtZTtcbiAgICBpZiAoaGlnaGxpZ2h0ZWQpIHtcbiAgICAgIGlmICh0aGlzLnByb3BzLmhpZ2hsaWdodGVkU3R5bGUpIHtcbiAgICAgICAgc3R5bGUgPSB7Li4uc3R5bGUsIC4uLnRoaXMucHJvcHMuaGlnaGxpZ2h0ZWRTdHlsZX07XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5wcm9wcy5oaWdobGlnaHRlZENsYXNzTmFtZSkge1xuICAgICAgICBjbGFzc05hbWUgPSBgJHtjbGFzc05hbWUgfHwgJyd9ICR7dGhpcy5wcm9wcy5oaWdobGlnaHRlZENsYXNzTmFtZX1gO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2XG4gICAgICAgIHJlZj17dGhpcy5fZWxTZXR0ZXJ9XG4gICAgICAgIHN0eWxlPXtzdHlsZX1cbiAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWV9XG4gICAgICAgIG9uTW91c2VEb3duPXtlID0+IGUucHJldmVudERlZmF1bHQoKX1cbiAgICAgICAgb25DbGljaz17ZSA9PlxuICAgICAgICAgIHRoaXMuX21lbnVMaXN0SGFuZGxlLml0ZW1DaG9zZW4oe1xuICAgICAgICAgICAgd2l0aFNoaWZ0OiBlLnNoaWZ0S2V5LFxuICAgICAgICAgICAgd2l0aE1ldGE6IGUubWV0YUtleSxcbiAgICAgICAgICAgIHdpdGhDdHJsOiBlLmN0cmxLZXksXG4gICAgICAgICAgICB3aXRoQWx0OiBlLmFsdEtleSxcbiAgICAgICAgICAgIGJ1dHRvbjogZS5idXR0b24sXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICBvbkF1eENsaWNrPXtcbiAgICAgICAgICBiZWhhdmlvdXIgPT09ICdkZXNrdG9wJ1xuICAgICAgICAgICAgPyBlID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLl9tZW51TGlzdEhhbmRsZS5pdGVtQ2hvc2VuKHtcbiAgICAgICAgICAgICAgICAgIHdpdGhTaGlmdDogZS5zaGlmdEtleSxcbiAgICAgICAgICAgICAgICAgIHdpdGhNZXRhOiBlLm1ldGFLZXksXG4gICAgICAgICAgICAgICAgICB3aXRoQ3RybDogZS5jdHJsS2V5LFxuICAgICAgICAgICAgICAgICAgd2l0aEFsdDogZS5hbHRLZXksXG4gICAgICAgICAgICAgICAgICBidXR0b246IGUuYnV0dG9uLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICA6IHVuZGVmaW5lZFxuICAgICAgICB9XG4gICAgICAgIG9uQ29udGV4dE1lbnU9e1xuICAgICAgICAgIGJlaGF2aW91ciA9PT0gJ2Rlc2t0b3AnXG4gICAgICAgICAgICA/IGUgPT4ge1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTsgLy8gaGFuZGxlZCBpbiBvbkF1eENsaWNrXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDogdW5kZWZpbmVkXG4gICAgICAgIH1cbiAgICAgICAgb25Nb3VzZUVudGVyPXsoKSA9PiB0aGlzLmhpZ2hsaWdodChmYWxzZSl9XG4gICAgICAgIG9uTW91c2VMZWF2ZT17b25Nb3VzZUxlYXZlIHx8ICgoKSA9PiB0aGlzLnVuaGlnaGxpZ2h0KCkpfVxuICAgICAgICByb2xlPVwibWVudWl0ZW1cIlxuICAgICAgICBhcmlhLWhhc3BvcHVwPXt0aGlzLnByb3BzWydhcmlhLWhhc3BvcHVwJ119XG4gICAgICAgIGFyaWEtZXhwYW5kZWQ9e3RoaXMucHJvcHNbJ2FyaWEtZXhwYW5kZWQnXX1cbiAgICAgID5cbiAgICAgICAge2NoaWxkcmVufVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuIl19