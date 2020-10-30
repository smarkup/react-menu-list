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

var _kefir = _interopRequireDefault(require("kefir"));

var _kefirBus = _interopRequireDefault(require("kefir-bus"));

var _kefirStopper = _interopRequireDefault(require("kefir-stopper"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _pointRectDistance = _interopRequireDefault(require("./lib/pointRectDistance"));

var _MenuListInspector = _interopRequireDefault(require("./MenuListInspector"));

var _reactFloatAnchor = _interopRequireDefault(require("react-float-anchor"));

var _MenuItem = _interopRequireDefault(require("./MenuItem"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var SubMenuItem = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(SubMenuItem, _React$Component);

  var _super = _createSuper(SubMenuItem);

  function SubMenuItem() {
    var _this;

    (0, _classCallCheck2["default"])(this, SubMenuItem);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "state", {
      opened: false
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_menuItemRef", /*#__PURE__*/_react["default"].createRef());
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_floatAnchorRef", /*#__PURE__*/_react["default"].createRef());
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_menuInspectorRef", /*#__PURE__*/_react["default"].createRef());
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_menuContainerRef", /*#__PURE__*/_react["default"].createRef());
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_resetMouseLeaveWatcher", (0, _kefirBus["default"])());
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_stopper", (0, _kefirStopper["default"])());
    return _this;
  }

  (0, _createClass2["default"])(SubMenuItem, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this._stopper.destroy();
    }
  }, {
    key: "open",
    value: function open() {
      var _this2 = this;

      var menuItem = this._menuItemRef.current;
      if (!menuItem) throw new Error();
      menuItem.lockHighlight();
      if (this.state.opened) return Promise.resolve();
      if (this.props.onWillOpen) this.props.onWillOpen();
      menuItem.takeKeyboard();
      return new Promise(function (resolve) {
        _this2.setState({
          opened: true
        }, function () {
          if (_this2.props.onDidOpen) _this2.props.onDidOpen();
          resolve();
        });
      });
    }
  }, {
    key: "close",
    value: function close() {
      var menuItem = this._menuItemRef.current;
      if (!menuItem) throw new Error();
      if (!this.state.opened) return;
      if (this.props.onWillClose) this.props.onWillClose();
      this.setState({
        opened: false
      });
      menuItem.releaseKeyboard();
      menuItem.unlockHighlight();
    }
  }, {
    key: "toggle",
    value: function toggle() {
      if (this.state.opened) {
        this.close();
      } else {
        this.open();
      }
    }
  }, {
    key: "reposition",
    value: function reposition() {
      var floatAnchor = this._floatAnchorRef.current;
      if (!floatAnchor) throw new Error();
      floatAnchor.reposition();
    }
  }, {
    key: "hasHighlight",
    value: function hasHighlight() {
      var menuItem = this._menuItemRef.current;
      if (!menuItem) throw new Error();
      return menuItem.hasHighlight();
    }
  }, {
    key: "highlight",
    value: function highlight() {
      var byKeyboard = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      var menuItem = this._menuItemRef.current;
      if (!menuItem) throw new Error();
      menuItem.highlight(byKeyboard);
    }
  }, {
    key: "unhighlight",
    value: function unhighlight() {
      var menuItem = this._menuItemRef.current;
      if (!menuItem) throw new Error();
      menuItem.unhighlight();
    }
  }, {
    key: "moveCursor",
    value: function moveCursor(direction, prevCursorLocation) {
      var menuItem = this._menuItemRef.current;
      if (!menuItem) throw new Error();
      menuItem.moveCursor(direction, prevCursorLocation);
    }
  }, {
    key: "_onHighlightChange",
    value: function _onHighlightChange(highlighted, event) {
      var _this3 = this;

      this._resetMouseLeaveWatcher.emit(null);

      if (highlighted && !event.byKeyboard) {
        var OPEN_DELAY = 200;

        _kefir["default"].later(OPEN_DELAY).takeUntilBy(this._resetMouseLeaveWatcher).takeUntilBy(this._stopper).onValue(function () {
          _this3.open();
        });
      } else if (!highlighted) {
        this.close();
      }
    }
  }, {
    key: "_onMouseLeaveItem",
    value: function _onMouseLeaveItem(event) {
      var _this4 = this;

      var menuItem = this._menuItemRef.current;
      if (!menuItem) throw new Error();

      if (!this.state.opened) {
        menuItem.unhighlight();
        return;
      }

      var menuContainer = this._menuContainerRef.current;
      if (!menuContainer) throw new Error(); // If the mouse isn't going toward the menu, then unhighlight ourself.

      var menuRect = menuContainer.getBoundingClientRect();
      var startTime = Date.now();
      var startX = event.pageX,
          startY = event.pageY;

      function getDistance(x, y) {
        return (0, _pointRectDistance["default"])(x, y, menuRect.left, menuRect.top, menuRect.right - menuRect.width, menuRect.bottom - menuRect.top);
      }

      var startDistance = getDistance(startX, startY);
      var lastCoords = {
        pageX: startX,
        pageY: startY
      }; // pixels per second the user must be moving the mouse toward the menu for
      // the menu to stay open.

      var MIN_SPEED = 60; // ms before the menu will close if the user hasn't reached it yet, no
      // matter how they're moving the cursor toward it.

      var MAX_TIME = 750; // ms to offset start time, to set maxDistance back a little so it's not so
      // unforgiving at the very start.

      var LEAD_TIME = 50; // Listen to mouse moves, find the first event not going towards the menu,
      // and end it there. Or end after a timer.

      _kefir["default"].fromEvents(window, 'mousemove').bufferBy(_kefir["default"].interval(60, null)).map(function (events) {
        if (events.length) {
          var last = events[events.length - 1];
          lastCoords = {
            pageX: last.pageX,
            pageY: last.pageY
          };
        }

        return lastCoords;
      }).filter(function (_ref) {
        var pageX = _ref.pageX,
            pageY = _ref.pageY;
        var distance = getDistance(pageX, pageY);
        var maxDistance = startDistance - (Date.now() - startTime - LEAD_TIME) / 1000 * MIN_SPEED;
        return distance > maxDistance;
      }).merge(_kefir["default"].later(MAX_TIME * 1000)).take(1).takeUntilBy(this._resetMouseLeaveWatcher).takeUntilBy(this._stopper).onValue(function () {
        _this4.close();

        menuItem.unhighlight();
      });
    }
  }, {
    key: "_mouseEnterMenu",
    value: function _mouseEnterMenu() {
      var menuItem = this._menuItemRef.current;
      if (!menuItem) throw new Error();

      this._resetMouseLeaveWatcher.emit(null);

      menuItem.unlockHighlight();
    }
  }, {
    key: "render",
    value: function render() {
      var _this5 = this;

      var _this$props = this.props,
          index = _this$props.index,
          highlightedStyle = _this$props.highlightedStyle,
          highlightedClassName = _this$props.highlightedClassName,
          positionOptions = _this$props.positionOptions,
          menuZIndex = _this$props.menuZIndex,
          children = _this$props.children,
          menu = _this$props.menu;
      var opened = this.state.opened;
      var style = this.props.style;
      var className = this.props.className;

      if (opened) {
        if (this.props.openedStyle) {
          style = _objectSpread(_objectSpread({}, style), this.props.openedStyle);
        }

        if (this.props.openedClassName) {
          className = "".concat(className || '', " ").concat(this.props.openedClassName);
        }
      }

      return /*#__PURE__*/_react["default"].createElement(_reactFloatAnchor["default"], {
        parentElement: this.props.menuParentElement,
        ref: this._floatAnchorRef,
        options: positionOptions,
        zIndex: menuZIndex,
        anchor: function anchor(anchorRef) {
          return /*#__PURE__*/_react["default"].createElement(_MenuItem["default"], {
            ref: _this5._menuItemRef,
            domRef: anchorRef,
            index: index,
            style: style,
            className: className,
            highlightedStyle: highlightedStyle,
            highlightedClassName: highlightedClassName,
            onHighlightChange: function onHighlightChange(h, e) {
              return _this5._onHighlightChange(h, e);
            },
            onMouseLeave: function onMouseLeave(e) {
              return _this5._onMouseLeaveItem(e);
            },
            onRightPushed: function onRightPushed(e) {
              if (!_this5.state.opened) {
                e.stopPropagation();
                e.preventDefault();

                _this5.open();

                var menuInspector = _this5._menuInspectorRef.current;
                if (!menuInspector) throw new Error();
                menuInspector.moveCursor('down');
              }
            },
            onItemChosen: function onItemChosen(e) {
              e.stopPropagation();
              e.preventDefault();

              _this5.open();

              if (e.byKeyboard) {
                var menuInspector = _this5._menuInspectorRef.current;
                if (!menuInspector) throw new Error();
                menuInspector.moveCursor('down');
              }
            },
            "aria-haspopup": true,
            "aria-expanded": opened
          }, children);
        },
        "float": !opened ? null : /*#__PURE__*/_react["default"].createElement(_MenuListInspector["default"], {
          ref: this._menuInspectorRef,
          onLeftPushed: function onLeftPushed(e) {
            e.stopPropagation();
            e.preventDefault();

            _this5.close();
          }
        }, /*#__PURE__*/_react["default"].createElement("div", {
          ref: this._menuContainerRef,
          onMouseEnter: function onMouseEnter() {
            return _this5._mouseEnterMenu();
          }
        }, menu))
      });
    }
  }]);
  return SubMenuItem;
}(_react["default"].Component);

exports["default"] = SubMenuItem;
(0, _defineProperty2["default"])(SubMenuItem, "propTypes", {
  menu: _propTypes["default"].node,
  positionOptions: _propTypes["default"].object,
  menuZIndex: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].number]),
  onWillOpen: _propTypes["default"].func,
  onDidOpen: _propTypes["default"].func,
  onWillClose: _propTypes["default"].func,
  className: _propTypes["default"].string,
  style: _propTypes["default"].object,
  highlightedClassName: _propTypes["default"].string,
  highlightedStyle: _propTypes["default"].object,
  index: _propTypes["default"].number,
  openedClassName: _propTypes["default"].string,
  openedStyle: _propTypes["default"].object,
  onItemChosen: _propTypes["default"].func,
  onHighlightChange: _propTypes["default"].func,
  children: _propTypes["default"].node
});
(0, _defineProperty2["default"])(SubMenuItem, "defaultProps", {
  positionOptions: {
    position: 'right',
    vAlign: 'top',
    hAlign: 'left'
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9TdWJNZW51SXRlbS5qcyJdLCJuYW1lcyI6WyJTdWJNZW51SXRlbSIsIm9wZW5lZCIsIlJlYWN0IiwiY3JlYXRlUmVmIiwiX3N0b3BwZXIiLCJkZXN0cm95IiwibWVudUl0ZW0iLCJfbWVudUl0ZW1SZWYiLCJjdXJyZW50IiwiRXJyb3IiLCJsb2NrSGlnaGxpZ2h0Iiwic3RhdGUiLCJQcm9taXNlIiwicmVzb2x2ZSIsInByb3BzIiwib25XaWxsT3BlbiIsInRha2VLZXlib2FyZCIsInNldFN0YXRlIiwib25EaWRPcGVuIiwib25XaWxsQ2xvc2UiLCJyZWxlYXNlS2V5Ym9hcmQiLCJ1bmxvY2tIaWdobGlnaHQiLCJjbG9zZSIsIm9wZW4iLCJmbG9hdEFuY2hvciIsIl9mbG9hdEFuY2hvclJlZiIsInJlcG9zaXRpb24iLCJoYXNIaWdobGlnaHQiLCJieUtleWJvYXJkIiwiaGlnaGxpZ2h0IiwidW5oaWdobGlnaHQiLCJkaXJlY3Rpb24iLCJwcmV2Q3Vyc29yTG9jYXRpb24iLCJtb3ZlQ3Vyc29yIiwiaGlnaGxpZ2h0ZWQiLCJldmVudCIsIl9yZXNldE1vdXNlTGVhdmVXYXRjaGVyIiwiZW1pdCIsIk9QRU5fREVMQVkiLCJLZWZpciIsImxhdGVyIiwidGFrZVVudGlsQnkiLCJvblZhbHVlIiwibWVudUNvbnRhaW5lciIsIl9tZW51Q29udGFpbmVyUmVmIiwibWVudVJlY3QiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJzdGFydFRpbWUiLCJEYXRlIiwibm93Iiwic3RhcnRYIiwicGFnZVgiLCJzdGFydFkiLCJwYWdlWSIsImdldERpc3RhbmNlIiwieCIsInkiLCJsZWZ0IiwidG9wIiwicmlnaHQiLCJ3aWR0aCIsImJvdHRvbSIsInN0YXJ0RGlzdGFuY2UiLCJsYXN0Q29vcmRzIiwiTUlOX1NQRUVEIiwiTUFYX1RJTUUiLCJMRUFEX1RJTUUiLCJmcm9tRXZlbnRzIiwid2luZG93IiwiYnVmZmVyQnkiLCJpbnRlcnZhbCIsIm1hcCIsImV2ZW50cyIsImxlbmd0aCIsImxhc3QiLCJmaWx0ZXIiLCJkaXN0YW5jZSIsIm1heERpc3RhbmNlIiwibWVyZ2UiLCJ0YWtlIiwiaW5kZXgiLCJoaWdobGlnaHRlZFN0eWxlIiwiaGlnaGxpZ2h0ZWRDbGFzc05hbWUiLCJwb3NpdGlvbk9wdGlvbnMiLCJtZW51WkluZGV4IiwiY2hpbGRyZW4iLCJtZW51Iiwic3R5bGUiLCJjbGFzc05hbWUiLCJvcGVuZWRTdHlsZSIsIm9wZW5lZENsYXNzTmFtZSIsIm1lbnVQYXJlbnRFbGVtZW50IiwiYW5jaG9yUmVmIiwiaCIsImUiLCJfb25IaWdobGlnaHRDaGFuZ2UiLCJfb25Nb3VzZUxlYXZlSXRlbSIsInN0b3BQcm9wYWdhdGlvbiIsInByZXZlbnREZWZhdWx0IiwibWVudUluc3BlY3RvciIsIl9tZW51SW5zcGVjdG9yUmVmIiwiX21vdXNlRW50ZXJNZW51IiwiQ29tcG9uZW50IiwiUHJvcFR5cGVzIiwibm9kZSIsIm9iamVjdCIsIm9uZU9mVHlwZSIsInN0cmluZyIsIm51bWJlciIsImZ1bmMiLCJvbkl0ZW1DaG9zZW4iLCJvbkhpZ2hsaWdodENoYW5nZSIsInBvc2l0aW9uIiwidkFsaWduIiwiaEFsaWduIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBOztBQUNBOztBQUVBOztBQUNBOztBQUVBOztBQUNBOztBQUVBOztBQUNBOztBQUdBOzs7Ozs7Ozs7O0lBMENxQkEsVzs7Ozs7Ozs7Ozs7Ozs7OzhGQTZCSjtBQUNiQyxNQUFBQSxNQUFNLEVBQUU7QUFESyxLO2tIQUlBQyxrQkFBTUMsU0FBTixFO3FIQUNHRCxrQkFBTUMsU0FBTixFO3VIQUNFRCxrQkFBTUMsU0FBTixFO3VIQUNBRCxrQkFBTUMsU0FBTixFO2dIQUNpQiwyQjtpR0FDMUIsK0I7Ozs7OzsyQ0FFWTtBQUNyQixXQUFLQyxRQUFMLENBQWNDLE9BQWQ7QUFDRDs7OzJCQUVxQjtBQUFBOztBQUNwQixVQUFNQyxRQUFRLEdBQUcsS0FBS0MsWUFBTCxDQUFrQkMsT0FBbkM7QUFDQSxV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a0JBeUJHO0FBQ3BCbUYsRUFBQUEsZUFBZSxFQUFFO0FBQUM2QixJQUFBQSxRQUFRLEVBQUUsT0FBWDtBQUFvQkMsSUFBQUEsTUFBTSxFQUFFLEtBQTVCO0FBQW1DQyxJQUFBQSxNQUFNLEVBQUU7QUFBM0M7QUFERyxDIiwic291cmNlc0NvbnRlbnQiOlsiLyogQGZsb3cgKi9cblxuaW1wb3J0IEtlZmlyIGZyb20gJ2tlZmlyJztcbmltcG9ydCBrZWZpckJ1cyBmcm9tICdrZWZpci1idXMnO1xuaW1wb3J0IHR5cGUge0J1c30gZnJvbSAna2VmaXItYnVzJztcbmltcG9ydCBrZWZpclN0b3BwZXIgZnJvbSAna2VmaXItc3RvcHBlcic7XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHR5cGUge05vZGUgYXMgUmVhY3ROb2RlfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHBvaW50UmVjdERpc3RhbmNlIGZyb20gJy4vbGliL3BvaW50UmVjdERpc3RhbmNlJztcblxuaW1wb3J0IE1lbnVMaXN0SW5zcGVjdG9yIGZyb20gJy4vTWVudUxpc3RJbnNwZWN0b3InO1xuaW1wb3J0IEZsb2F0QW5jaG9yIGZyb20gJ3JlYWN0LWZsb2F0LWFuY2hvcic7XG5pbXBvcnQgdHlwZSB7T3B0aW9ucyBhcyBGbG9hdEFuY2hvck9wdGlvbnN9IGZyb20gJ3JlYWN0LWZsb2F0LWFuY2hvcic7XG5leHBvcnQgdHlwZSB7T3B0aW9ucyBhcyBGbG9hdEFuY2hvck9wdGlvbnN9IGZyb20gJ3JlYWN0LWZsb2F0LWFuY2hvcic7XG5pbXBvcnQgTWVudUl0ZW0gZnJvbSAnLi9NZW51SXRlbSc7XG5cbmltcG9ydCB0eXBlIHtEaXJlY3Rpb24sIFJlY3R9IGZyb20gJy4vdHlwZXMnO1xuaW1wb3J0IHR5cGUgTWVudUV2ZW50IGZyb20gJy4vZXZlbnRzL01lbnVFdmVudCc7XG5pbXBvcnQgdHlwZSBDaG9zZW5FdmVudCBmcm9tICcuL2V2ZW50cy9DaG9zZW5FdmVudCc7XG5cbnR5cGUgU3RhdGUgPSB7XG4gIG9wZW5lZDogYm9vbGVhbixcbn07XG5cbmV4cG9ydCB0eXBlIFByb3BzID0ge1xuICBtZW51OiBSZWFjdE5vZGUsXG4gIHBvc2l0aW9uT3B0aW9uczogRmxvYXRBbmNob3JPcHRpb25zLFxuICBtZW51WkluZGV4Pzogc3RyaW5nIHwgbnVtYmVyLFxuICBtZW51UGFyZW50RWxlbWVudD86IEhUTUxFbGVtZW50LFxuXG4gIG9uV2lsbE9wZW4/OiAoKSA9PiB2b2lkLFxuICBvbkRpZE9wZW4/OiAoKSA9PiB2b2lkLFxuICBvbldpbGxDbG9zZT86ICgpID0+IHZvaWQsXG5cbiAgY2xhc3NOYW1lPzogc3RyaW5nLFxuICBzdHlsZT86IE9iamVjdCxcbiAgaGlnaGxpZ2h0ZWRDbGFzc05hbWU/OiBzdHJpbmcsXG4gIGhpZ2hsaWdodGVkU3R5bGU/OiBPYmplY3QsXG4gIGluZGV4PzogbnVtYmVyLFxuXG4gIG9wZW5lZENsYXNzTmFtZT86IHN0cmluZyxcbiAgb3BlbmVkU3R5bGU/OiBPYmplY3QsXG5cbiAgb25JdGVtQ2hvc2VuPzogKGV2ZW50OiBDaG9zZW5FdmVudCkgPT4gdm9pZCxcbiAgb25IaWdobGlnaHRDaGFuZ2U/OiAoXG4gICAgaGlnaGxpZ2h0ZWQ6IGJvb2xlYW4sXG4gICAgZGV0YWlsczoge1xuICAgICAgYnlLZXlib2FyZD86IGJvb2xlYW4sXG4gICAgICBwcmV2Q3Vyc29yTG9jYXRpb24/OiBSZWN0LFxuICAgICAgZGlyZWN0aW9uPzogRGlyZWN0aW9uLFxuICAgIH1cbiAgKSA9PiB2b2lkLFxuXG4gIGNoaWxkcmVuPzogUmVhY3ROb2RlLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3ViTWVudUl0ZW0gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQ8UHJvcHMsIFN0YXRlPiB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgbWVudTogUHJvcFR5cGVzLm5vZGUsXG4gICAgcG9zaXRpb25PcHRpb25zOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgIG1lbnVaSW5kZXg6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5udW1iZXJdKSxcblxuICAgIG9uV2lsbE9wZW46IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uRGlkT3BlbjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25XaWxsQ2xvc2U6IFByb3BUeXBlcy5mdW5jLFxuXG4gICAgY2xhc3NOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHN0eWxlOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgIGhpZ2hsaWdodGVkQ2xhc3NOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGhpZ2hsaWdodGVkU3R5bGU6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgaW5kZXg6IFByb3BUeXBlcy5udW1iZXIsXG5cbiAgICBvcGVuZWRDbGFzc05hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgb3BlbmVkU3R5bGU6IFByb3BUeXBlcy5vYmplY3QsXG5cbiAgICBvbkl0ZW1DaG9zZW46IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uSGlnaGxpZ2h0Q2hhbmdlOiBQcm9wVHlwZXMuZnVuYyxcblxuICAgIGNoaWxkcmVuOiBQcm9wVHlwZXMubm9kZSxcbiAgfTtcblxuICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgIHBvc2l0aW9uT3B0aW9uczoge3Bvc2l0aW9uOiAncmlnaHQnLCB2QWxpZ246ICd0b3AnLCBoQWxpZ246ICdsZWZ0J30sXG4gIH07XG5cbiAgc3RhdGU6IFN0YXRlID0ge1xuICAgIG9wZW5lZDogZmFsc2UsXG4gIH07XG5cbiAgX21lbnVJdGVtUmVmID0gUmVhY3QuY3JlYXRlUmVmPE1lbnVJdGVtPigpO1xuICBfZmxvYXRBbmNob3JSZWYgPSBSZWFjdC5jcmVhdGVSZWY8RmxvYXRBbmNob3I+KCk7XG4gIF9tZW51SW5zcGVjdG9yUmVmID0gUmVhY3QuY3JlYXRlUmVmPE1lbnVMaXN0SW5zcGVjdG9yPigpO1xuICBfbWVudUNvbnRhaW5lclJlZiA9IFJlYWN0LmNyZWF0ZVJlZjxIVE1MRGl2RWxlbWVudD4oKTtcbiAgX3Jlc2V0TW91c2VMZWF2ZVdhdGNoZXI6IEJ1czxudWxsPiA9IGtlZmlyQnVzKCk7XG4gIF9zdG9wcGVyID0ga2VmaXJTdG9wcGVyKCk7XG5cbiAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgdGhpcy5fc3RvcHBlci5kZXN0cm95KCk7XG4gIH1cblxuICBvcGVuKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IG1lbnVJdGVtID0gdGhpcy5fbWVudUl0ZW1SZWYuY3VycmVudDtcbiAgICBpZiAoIW1lbnVJdGVtKSB0aHJvdyBuZXcgRXJyb3IoKTtcblxuICAgIG1lbnVJdGVtLmxvY2tIaWdobGlnaHQoKTtcbiAgICBpZiAodGhpcy5zdGF0ZS5vcGVuZWQpIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICBpZiAodGhpcy5wcm9wcy5vbldpbGxPcGVuKSB0aGlzLnByb3BzLm9uV2lsbE9wZW4oKTtcbiAgICBtZW51SXRlbS50YWtlS2V5Ym9hcmQoKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtvcGVuZWQ6IHRydWV9LCAoKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLm9uRGlkT3BlbikgdGhpcy5wcm9wcy5vbkRpZE9wZW4oKTtcbiAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBjbG9zZSgpIHtcbiAgICBjb25zdCBtZW51SXRlbSA9IHRoaXMuX21lbnVJdGVtUmVmLmN1cnJlbnQ7XG4gICAgaWYgKCFtZW51SXRlbSkgdGhyb3cgbmV3IEVycm9yKCk7XG5cbiAgICBpZiAoIXRoaXMuc3RhdGUub3BlbmVkKSByZXR1cm47XG4gICAgaWYgKHRoaXMucHJvcHMub25XaWxsQ2xvc2UpIHRoaXMucHJvcHMub25XaWxsQ2xvc2UoKTtcbiAgICB0aGlzLnNldFN0YXRlKHtvcGVuZWQ6IGZhbHNlfSk7XG4gICAgbWVudUl0ZW0ucmVsZWFzZUtleWJvYXJkKCk7XG4gICAgbWVudUl0ZW0udW5sb2NrSGlnaGxpZ2h0KCk7XG4gIH1cblxuICB0b2dnbGUoKSB7XG4gICAgaWYgKHRoaXMuc3RhdGUub3BlbmVkKSB7XG4gICAgICB0aGlzLmNsb3NlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMub3BlbigpO1xuICAgIH1cbiAgfVxuXG4gIHJlcG9zaXRpb24oKSB7XG4gICAgY29uc3QgZmxvYXRBbmNob3IgPSB0aGlzLl9mbG9hdEFuY2hvclJlZi5jdXJyZW50O1xuICAgIGlmICghZmxvYXRBbmNob3IpIHRocm93IG5ldyBFcnJvcigpO1xuXG4gICAgZmxvYXRBbmNob3IucmVwb3NpdGlvbigpO1xuICB9XG5cbiAgaGFzSGlnaGxpZ2h0KCk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IG1lbnVJdGVtID0gdGhpcy5fbWVudUl0ZW1SZWYuY3VycmVudDtcbiAgICBpZiAoIW1lbnVJdGVtKSB0aHJvdyBuZXcgRXJyb3IoKTtcblxuICAgIHJldHVybiBtZW51SXRlbS5oYXNIaWdobGlnaHQoKTtcbiAgfVxuXG4gIGhpZ2hsaWdodChieUtleWJvYXJkOiBib29sZWFuID0gdHJ1ZSkge1xuICAgIGNvbnN0IG1lbnVJdGVtID0gdGhpcy5fbWVudUl0ZW1SZWYuY3VycmVudDtcbiAgICBpZiAoIW1lbnVJdGVtKSB0aHJvdyBuZXcgRXJyb3IoKTtcblxuICAgIG1lbnVJdGVtLmhpZ2hsaWdodChieUtleWJvYXJkKTtcbiAgfVxuXG4gIHVuaGlnaGxpZ2h0KCkge1xuICAgIGNvbnN0IG1lbnVJdGVtID0gdGhpcy5fbWVudUl0ZW1SZWYuY3VycmVudDtcbiAgICBpZiAoIW1lbnVJdGVtKSB0aHJvdyBuZXcgRXJyb3IoKTtcblxuICAgIG1lbnVJdGVtLnVuaGlnaGxpZ2h0KCk7XG4gIH1cblxuICBtb3ZlQ3Vyc29yKGRpcmVjdGlvbjogRGlyZWN0aW9uLCBwcmV2Q3Vyc29yTG9jYXRpb246ID9SZWN0KSB7XG4gICAgY29uc3QgbWVudUl0ZW0gPSB0aGlzLl9tZW51SXRlbVJlZi5jdXJyZW50O1xuICAgIGlmICghbWVudUl0ZW0pIHRocm93IG5ldyBFcnJvcigpO1xuXG4gICAgbWVudUl0ZW0ubW92ZUN1cnNvcihkaXJlY3Rpb24sIHByZXZDdXJzb3JMb2NhdGlvbik7XG4gIH1cblxuICBfb25IaWdobGlnaHRDaGFuZ2UoaGlnaGxpZ2h0ZWQ6IGJvb2xlYW4sIGV2ZW50OiBPYmplY3QpIHtcbiAgICB0aGlzLl9yZXNldE1vdXNlTGVhdmVXYXRjaGVyLmVtaXQobnVsbCk7XG5cbiAgICBpZiAoaGlnaGxpZ2h0ZWQgJiYgIWV2ZW50LmJ5S2V5Ym9hcmQpIHtcbiAgICAgIGNvbnN0IE9QRU5fREVMQVkgPSAyMDA7XG5cbiAgICAgIEtlZmlyLmxhdGVyKE9QRU5fREVMQVkpXG4gICAgICAgIC50YWtlVW50aWxCeSh0aGlzLl9yZXNldE1vdXNlTGVhdmVXYXRjaGVyKVxuICAgICAgICAudGFrZVVudGlsQnkodGhpcy5fc3RvcHBlcilcbiAgICAgICAgLm9uVmFsdWUoKCkgPT4ge1xuICAgICAgICAgIHRoaXMub3BlbigpO1xuICAgICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKCFoaWdobGlnaHRlZCkge1xuICAgICAgdGhpcy5jbG9zZSgpO1xuICAgIH1cbiAgfVxuXG4gIF9vbk1vdXNlTGVhdmVJdGVtKGV2ZW50OiBPYmplY3QpIHtcbiAgICBjb25zdCBtZW51SXRlbSA9IHRoaXMuX21lbnVJdGVtUmVmLmN1cnJlbnQ7XG4gICAgaWYgKCFtZW51SXRlbSkgdGhyb3cgbmV3IEVycm9yKCk7XG5cbiAgICBpZiAoIXRoaXMuc3RhdGUub3BlbmVkKSB7XG4gICAgICBtZW51SXRlbS51bmhpZ2hsaWdodCgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IG1lbnVDb250YWluZXIgPSB0aGlzLl9tZW51Q29udGFpbmVyUmVmLmN1cnJlbnQ7XG4gICAgaWYgKCFtZW51Q29udGFpbmVyKSB0aHJvdyBuZXcgRXJyb3IoKTtcblxuICAgIC8vIElmIHRoZSBtb3VzZSBpc24ndCBnb2luZyB0b3dhcmQgdGhlIG1lbnUsIHRoZW4gdW5oaWdobGlnaHQgb3Vyc2VsZi5cblxuICAgIGNvbnN0IG1lbnVSZWN0ID0gbWVudUNvbnRhaW5lci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICAgIGNvbnN0IHN0YXJ0VGltZSA9IERhdGUubm93KCk7XG4gICAgY29uc3Qgc3RhcnRYID0gZXZlbnQucGFnZVgsXG4gICAgICBzdGFydFkgPSBldmVudC5wYWdlWTtcblxuICAgIGZ1bmN0aW9uIGdldERpc3RhbmNlKHgsIHkpIHtcbiAgICAgIHJldHVybiBwb2ludFJlY3REaXN0YW5jZShcbiAgICAgICAgeCxcbiAgICAgICAgeSxcbiAgICAgICAgbWVudVJlY3QubGVmdCxcbiAgICAgICAgbWVudVJlY3QudG9wLFxuICAgICAgICBtZW51UmVjdC5yaWdodCAtIG1lbnVSZWN0LndpZHRoLFxuICAgICAgICBtZW51UmVjdC5ib3R0b20gLSBtZW51UmVjdC50b3BcbiAgICAgICk7XG4gICAgfVxuXG4gICAgY29uc3Qgc3RhcnREaXN0YW5jZSA9IGdldERpc3RhbmNlKHN0YXJ0WCwgc3RhcnRZKTtcbiAgICBsZXQgbGFzdENvb3JkcyA9IHtwYWdlWDogc3RhcnRYLCBwYWdlWTogc3RhcnRZfTtcblxuICAgIC8vIHBpeGVscyBwZXIgc2Vjb25kIHRoZSB1c2VyIG11c3QgYmUgbW92aW5nIHRoZSBtb3VzZSB0b3dhcmQgdGhlIG1lbnUgZm9yXG4gICAgLy8gdGhlIG1lbnUgdG8gc3RheSBvcGVuLlxuICAgIGNvbnN0IE1JTl9TUEVFRCA9IDYwO1xuXG4gICAgLy8gbXMgYmVmb3JlIHRoZSBtZW51IHdpbGwgY2xvc2UgaWYgdGhlIHVzZXIgaGFzbid0IHJlYWNoZWQgaXQgeWV0LCBub1xuICAgIC8vIG1hdHRlciBob3cgdGhleSdyZSBtb3ZpbmcgdGhlIGN1cnNvciB0b3dhcmQgaXQuXG4gICAgY29uc3QgTUFYX1RJTUUgPSA3NTA7XG5cbiAgICAvLyBtcyB0byBvZmZzZXQgc3RhcnQgdGltZSwgdG8gc2V0IG1heERpc3RhbmNlIGJhY2sgYSBsaXR0bGUgc28gaXQncyBub3Qgc29cbiAgICAvLyB1bmZvcmdpdmluZyBhdCB0aGUgdmVyeSBzdGFydC5cbiAgICBjb25zdCBMRUFEX1RJTUUgPSA1MDtcblxuICAgIC8vIExpc3RlbiB0byBtb3VzZSBtb3ZlcywgZmluZCB0aGUgZmlyc3QgZXZlbnQgbm90IGdvaW5nIHRvd2FyZHMgdGhlIG1lbnUsXG4gICAgLy8gYW5kIGVuZCBpdCB0aGVyZS4gT3IgZW5kIGFmdGVyIGEgdGltZXIuXG4gICAgS2VmaXIuZnJvbUV2ZW50cyh3aW5kb3csICdtb3VzZW1vdmUnKVxuICAgICAgLmJ1ZmZlckJ5KEtlZmlyLmludGVydmFsKDYwLCBudWxsKSlcbiAgICAgIC5tYXAoZXZlbnRzID0+IHtcbiAgICAgICAgaWYgKGV2ZW50cy5sZW5ndGgpIHtcbiAgICAgICAgICBjb25zdCBsYXN0ID0gZXZlbnRzW2V2ZW50cy5sZW5ndGggLSAxXTtcbiAgICAgICAgICBsYXN0Q29vcmRzID0ge3BhZ2VYOiBsYXN0LnBhZ2VYLCBwYWdlWTogbGFzdC5wYWdlWX07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGxhc3RDb29yZHM7XG4gICAgICB9KVxuICAgICAgLmZpbHRlcigoe3BhZ2VYLCBwYWdlWX0pID0+IHtcbiAgICAgICAgY29uc3QgZGlzdGFuY2UgPSBnZXREaXN0YW5jZShwYWdlWCwgcGFnZVkpO1xuICAgICAgICBjb25zdCBtYXhEaXN0YW5jZSA9XG4gICAgICAgICAgc3RhcnREaXN0YW5jZSAtXG4gICAgICAgICAgKChEYXRlLm5vdygpIC0gc3RhcnRUaW1lIC0gTEVBRF9USU1FKSAvIDEwMDApICogTUlOX1NQRUVEO1xuICAgICAgICByZXR1cm4gZGlzdGFuY2UgPiBtYXhEaXN0YW5jZTtcbiAgICAgIH0pXG4gICAgICAubWVyZ2UoS2VmaXIubGF0ZXIoTUFYX1RJTUUgKiAxMDAwKSlcbiAgICAgIC50YWtlKDEpXG4gICAgICAudGFrZVVudGlsQnkodGhpcy5fcmVzZXRNb3VzZUxlYXZlV2F0Y2hlcilcbiAgICAgIC50YWtlVW50aWxCeSh0aGlzLl9zdG9wcGVyKVxuICAgICAgLm9uVmFsdWUoKCkgPT4ge1xuICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICAgIG1lbnVJdGVtLnVuaGlnaGxpZ2h0KCk7XG4gICAgICB9KTtcbiAgfVxuXG4gIF9tb3VzZUVudGVyTWVudSgpIHtcbiAgICBjb25zdCBtZW51SXRlbSA9IHRoaXMuX21lbnVJdGVtUmVmLmN1cnJlbnQ7XG4gICAgaWYgKCFtZW51SXRlbSkgdGhyb3cgbmV3IEVycm9yKCk7XG5cbiAgICB0aGlzLl9yZXNldE1vdXNlTGVhdmVXYXRjaGVyLmVtaXQobnVsbCk7XG4gICAgbWVudUl0ZW0udW5sb2NrSGlnaGxpZ2h0KCk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge1xuICAgICAgaW5kZXgsXG4gICAgICBoaWdobGlnaHRlZFN0eWxlLFxuICAgICAgaGlnaGxpZ2h0ZWRDbGFzc05hbWUsXG4gICAgICBwb3NpdGlvbk9wdGlvbnMsXG4gICAgICBtZW51WkluZGV4LFxuICAgICAgY2hpbGRyZW4sXG4gICAgICBtZW51LFxuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHtvcGVuZWR9ID0gdGhpcy5zdGF0ZTtcblxuICAgIGxldCBzdHlsZSA9IHRoaXMucHJvcHMuc3R5bGU7XG4gICAgbGV0IGNsYXNzTmFtZSA9IHRoaXMucHJvcHMuY2xhc3NOYW1lO1xuICAgIGlmIChvcGVuZWQpIHtcbiAgICAgIGlmICh0aGlzLnByb3BzLm9wZW5lZFN0eWxlKSB7XG4gICAgICAgIHN0eWxlID0gey4uLnN0eWxlLCAuLi50aGlzLnByb3BzLm9wZW5lZFN0eWxlfTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLnByb3BzLm9wZW5lZENsYXNzTmFtZSkge1xuICAgICAgICBjbGFzc05hbWUgPSBgJHtjbGFzc05hbWUgfHwgJyd9ICR7dGhpcy5wcm9wcy5vcGVuZWRDbGFzc05hbWV9YDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgPEZsb2F0QW5jaG9yXG4gICAgICAgIHBhcmVudEVsZW1lbnQ9e3RoaXMucHJvcHMubWVudVBhcmVudEVsZW1lbnR9XG4gICAgICAgIHJlZj17dGhpcy5fZmxvYXRBbmNob3JSZWZ9XG4gICAgICAgIG9wdGlvbnM9e3Bvc2l0aW9uT3B0aW9uc31cbiAgICAgICAgekluZGV4PXttZW51WkluZGV4fVxuICAgICAgICBhbmNob3I9e2FuY2hvclJlZiA9PiAoXG4gICAgICAgICAgPE1lbnVJdGVtXG4gICAgICAgICAgICByZWY9e3RoaXMuX21lbnVJdGVtUmVmfVxuICAgICAgICAgICAgZG9tUmVmPXthbmNob3JSZWZ9XG4gICAgICAgICAgICBpbmRleD17aW5kZXh9XG4gICAgICAgICAgICBzdHlsZT17c3R5bGV9XG4gICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZX1cbiAgICAgICAgICAgIGhpZ2hsaWdodGVkU3R5bGU9e2hpZ2hsaWdodGVkU3R5bGV9XG4gICAgICAgICAgICBoaWdobGlnaHRlZENsYXNzTmFtZT17aGlnaGxpZ2h0ZWRDbGFzc05hbWV9XG4gICAgICAgICAgICBvbkhpZ2hsaWdodENoYW5nZT17KGgsIGUpID0+IHRoaXMuX29uSGlnaGxpZ2h0Q2hhbmdlKGgsIGUpfVxuICAgICAgICAgICAgb25Nb3VzZUxlYXZlPXtlID0+IHRoaXMuX29uTW91c2VMZWF2ZUl0ZW0oZSl9XG4gICAgICAgICAgICBvblJpZ2h0UHVzaGVkPXsoZTogTWVudUV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgIGlmICghdGhpcy5zdGF0ZS5vcGVuZWQpIHtcbiAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLm9wZW4oKTtcbiAgICAgICAgICAgICAgICBjb25zdCBtZW51SW5zcGVjdG9yID0gdGhpcy5fbWVudUluc3BlY3RvclJlZi5jdXJyZW50O1xuICAgICAgICAgICAgICAgIGlmICghbWVudUluc3BlY3RvcikgdGhyb3cgbmV3IEVycm9yKCk7XG4gICAgICAgICAgICAgICAgbWVudUluc3BlY3Rvci5tb3ZlQ3Vyc29yKCdkb3duJyk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH19XG4gICAgICAgICAgICBvbkl0ZW1DaG9zZW49eyhlOiBDaG9zZW5FdmVudCkgPT4ge1xuICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgIHRoaXMub3BlbigpO1xuICAgICAgICAgICAgICBpZiAoZS5ieUtleWJvYXJkKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbWVudUluc3BlY3RvciA9IHRoaXMuX21lbnVJbnNwZWN0b3JSZWYuY3VycmVudDtcbiAgICAgICAgICAgICAgICBpZiAoIW1lbnVJbnNwZWN0b3IpIHRocm93IG5ldyBFcnJvcigpO1xuICAgICAgICAgICAgICAgIG1lbnVJbnNwZWN0b3IubW92ZUN1cnNvcignZG93bicpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9fVxuICAgICAgICAgICAgYXJpYS1oYXNwb3B1cD17dHJ1ZX1cbiAgICAgICAgICAgIGFyaWEtZXhwYW5kZWQ9e29wZW5lZH1cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7Y2hpbGRyZW59XG4gICAgICAgICAgPC9NZW51SXRlbT5cbiAgICAgICAgKX1cbiAgICAgICAgZmxvYXQ9e1xuICAgICAgICAgICFvcGVuZWQgPyBudWxsIDogKFxuICAgICAgICAgICAgPE1lbnVMaXN0SW5zcGVjdG9yXG4gICAgICAgICAgICAgIHJlZj17dGhpcy5fbWVudUluc3BlY3RvclJlZn1cbiAgICAgICAgICAgICAgb25MZWZ0UHVzaGVkPXtlID0+IHtcbiAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICAgICAgICAgIH19XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICByZWY9e3RoaXMuX21lbnVDb250YWluZXJSZWZ9XG4gICAgICAgICAgICAgICAgb25Nb3VzZUVudGVyPXsoKSA9PiB0aGlzLl9tb3VzZUVudGVyTWVudSgpfVxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAge21lbnV9XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9NZW51TGlzdEluc3BlY3Rvcj5cbiAgICAgICAgICApXG4gICAgICAgIH1cbiAgICAgIC8+XG4gICAgKTtcbiAgfVxufVxuIl19