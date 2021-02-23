"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.MenuListContext = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _kefir = _interopRequireDefault(require("kefir"));

var _kefirStopper = _interopRequireDefault(require("kefir-stopper"));

var _arrayFindIndex = _interopRequireDefault(require("array-find-index"));

var _fromEventsCapture = _interopRequireDefault(require("./lib/fromEventsCapture"));

var _MenuEvent = _interopRequireDefault(require("./events/MenuEvent"));

var _ChosenEvent = _interopRequireDefault(require("./events/ChosenEvent"));

var _MenuListInspector = require("./MenuListInspector");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var MenuListContext = /*#__PURE__*/_react["default"].createContext(null);

exports.MenuListContext = MenuListContext;

var MenuList = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(MenuList, _React$Component);

  var _super = _createSuper(MenuList);

  function MenuList() {
    var _this;

    (0, _classCallCheck2["default"])(this, MenuList);

    for (var _len = arguments.length, args = new Array(_len), _key2 = 0; _key2 < _len; _key2++) {
      args[_key2] = arguments[_key2];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_stopper", (0, _kefirStopper["default"])());
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_listItems", []);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_naturalHighlightedIndex", void 0);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_lockedHighlightedIndex", void 0);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_keyboardTakenByIndex", void 0);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_elRef", /*#__PURE__*/_react["default"].createRef());
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_menuListContext", {
      registerItem: function registerItem(props, control, el) {
        var item = {
          props: props,
          control: control,
          el: el
        };

        var register = function register() {
          var i = -1;

          if (item.props.index == null) {
            i = (0, _arrayFindIndex["default"])(_this._listItems, function (_item) {
              return (item.el.compareDocumentPosition(_item.el) & Node.DOCUMENT_POSITION_PRECEDING) === 0;
            });
          } else {
            i = (0, _arrayFindIndex["default"])(_this._listItems, function (_item) {
              return _item.props.index != null && item.props.index < _item.props.index;
            });
          }

          if (i < 0) {
            _this._listItems.push(item);
          } else {
            _this._listItems.splice(i, 0, item);

            if (_this._naturalHighlightedIndex != null && i <= _this._naturalHighlightedIndex) {
              _this._naturalHighlightedIndex++;
            }

            if (_this._lockedHighlightedIndex != null && i <= _this._lockedHighlightedIndex) {
              _this._lockedHighlightedIndex++;
            }

            if (_this._keyboardTakenByIndex != null && i <= _this._keyboardTakenByIndex) {
              _this._keyboardTakenByIndex++;
            }
          }
        };

        register();
        var menuListHandle = {
          highlight: function highlight(byKeyboard) {
            var i = _this._listItems.indexOf(item);

            if (i < 0) throw new Error('Already unregistered MenuItem');

            _this._naturalHighlight(i, byKeyboard);
          },
          unhighlight: function unhighlight() {
            var i = _this._listItems.indexOf(item);

            if (i < 0) throw new Error('Already unregistered MenuItem');

            if (_this._naturalHighlightedIndex === i) {
              _this._naturalHighlight(null, false);
            }
          },
          itemChosen: function itemChosen(modifiers) {
            _this._dispatchEvent(control, new _ChosenEvent["default"]('chosen', false, modifiers));
          },
          takeKeyboard: function takeKeyboard() {
            var i = _this._listItems.indexOf(item);

            if (i < 0) throw new Error('Already unregistered MenuItem');
            _this._keyboardTakenByIndex = i;
          },
          releaseKeyboard: function releaseKeyboard() {
            var i = _this._listItems.indexOf(item);

            if (i < 0) throw new Error('Already unregistered MenuItem');

            if (_this._keyboardTakenByIndex === i) {
              _this._keyboardTakenByIndex = null;
            }
          },
          lockHighlight: function lockHighlight() {
            var i = _this._listItems.indexOf(item);

            if (i < 0) throw new Error('Already unregistered MenuItem');

            _this._lockHighlight(i);
          },
          unlockHighlight: function unlockHighlight() {
            var i = _this._listItems.indexOf(item);

            if (i < 0) throw new Error('Already unregistered MenuItem');

            if (_this._lockedHighlightedIndex === i) {
              _this._lockHighlight(null);
            }
          },
          moveCursor: function moveCursor(direction, prevCursorLocation) {
            _this.moveCursor(direction, prevCursorLocation);
          },
          updateProps: function updateProps(newProps) {
            if (item.props.index !== newProps.index) {
              var oldIndex = _this._listItems.indexOf(item);

              var isNaturalHighlightIndex = _this._naturalHighlightedIndex === oldIndex;
              var isLockedHighlightIndex = _this._lockedHighlightedIndex === oldIndex;
              var isKeyboardTakenByIndex = _this._keyboardTakenByIndex === oldIndex;
              menuListHandle.unregister();
              props = newProps;
              item.props = newProps;
              register();

              if (isNaturalHighlightIndex || isLockedHighlightIndex || isKeyboardTakenByIndex) {
                var newIndex = _this._listItems.indexOf(item);

                if (isNaturalHighlightIndex) _this._naturalHighlightedIndex = newIndex;
                if (isLockedHighlightIndex) _this._lockedHighlightedIndex = newIndex;
                if (isKeyboardTakenByIndex) _this._keyboardTakenByIndex = newIndex;
              }
            } else {
              props = newProps;
              item.props = newProps;
            }
          },
          unregister: function unregister() {
            var i = _this._listItems.indexOf(item);

            if (i < 0) throw new Error('Already unregistered MenuItem');

            if (i === _this._naturalHighlightedIndex) {
              _this._naturalHighlightedIndex = null;
            } else if (_this._naturalHighlightedIndex != null && i < _this._naturalHighlightedIndex) {
              _this._naturalHighlightedIndex--;
            }

            if (i === _this._lockedHighlightedIndex) {
              _this._lockedHighlightedIndex = null;
            } else if (_this._lockedHighlightedIndex != null && i < _this._lockedHighlightedIndex) {
              _this._lockedHighlightedIndex--;
            }

            if (i === _this._keyboardTakenByIndex) {
              _this._keyboardTakenByIndex = null;
            } else if (_this._keyboardTakenByIndex != null && i < _this._keyboardTakenByIndex) {
              _this._keyboardTakenByIndex--;
            }

            _this._listItems.splice(i, 1);
          }
        };
        return menuListHandle;
      }
    });
    return _this;
  }

  (0, _createClass2["default"])(MenuList, [{
    key: "_getVisibleHighlightedIndex",
    value: function _getVisibleHighlightedIndex() {
      return this._lockedHighlightedIndex != null ? this._lockedHighlightedIndex : this._naturalHighlightedIndex;
    }
  }, {
    key: "_parentCtx",
    value: function _parentCtx() {
      return this.context;
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      // const isEnterOrSpaceOrArrowKey = e =>
      //   e.which === 13 || e.which === 32 || (37 <= e.which && e.which <= 40);
      //
      // const el = this._elRef.current;

      /*:: if (!el) throw new Error(); */
      // The only things that should receive keydown/keypress events before us
      // are our children. This allows a MenuItem to contain a text input
      // which selectively stops propagation on key events for example.
      _kefir["default"].merge([// Kefir.fromEvents(window, 'keydown')
      //   .filter(isEnterOrSpaceOrArrowKey)
      //   .filter(e => el.contains(e.target)),
      (0, _fromEventsCapture["default"])(window, 'keydown') // .filter(isEnterOrSpaceOrArrowKey)
      // .filter(e => !el.contains(e.target)),
      ]).takeUntilBy(this._stopper).onValue(function (event) {
        return _this2._key(event);
      });

      var parentCtx = this._parentCtx();

      if (parentCtx) {
        parentCtx.registerMenuList(this);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this._stopper.destroy();

      var parentCtx = this._parentCtx();

      if (parentCtx) {
        parentCtx.unregisterMenuList(this);
      }
    }
  }, {
    key: "_naturalHighlight",
    value: function _naturalHighlight(index, byKeyboard, direction, prevCursorLocation) {
      var visibleHighlightedIndex = this._getVisibleHighlightedIndex();

      if (this._lockedHighlightedIndex != null && byKeyboard) {
        this._lockedHighlightedIndex = null;
      }

      this._naturalHighlightedIndex = index;

      if (this._lockedHighlightedIndex == null) {
        if (index != null) {
          this._listItems[index].control.notifyHighlighted(true, byKeyboard, direction, prevCursorLocation);
        }

        if (visibleHighlightedIndex != null && visibleHighlightedIndex != index) {
          this._listItems[visibleHighlightedIndex].control.notifyHighlighted(false);
        }
      }
    }
  }, {
    key: "_lockHighlight",
    value: function _lockHighlight(index) {
      if (index === this._lockedHighlightedIndex) return;

      var visibleHighlightedIndex = this._getVisibleHighlightedIndex();

      this._lockedHighlightedIndex = index;

      var newVisibleHighlightedIndex = this._getVisibleHighlightedIndex();

      if (visibleHighlightedIndex != null && newVisibleHighlightedIndex == null) {
        // When unlocking, prefer to keep the current selection over de-selecting
        // everything.
        this._naturalHighlightedIndex = visibleHighlightedIndex;
      } else if (visibleHighlightedIndex != newVisibleHighlightedIndex) {
        if (visibleHighlightedIndex != null) {
          this._listItems[visibleHighlightedIndex].control.notifyHighlighted(false);
        }

        if (newVisibleHighlightedIndex != null) {
          this._listItems[newVisibleHighlightedIndex].control.notifyHighlighted(true, false);
        } else if (this._naturalHighlightedIndex != null) {
          this._listItems[this._naturalHighlightedIndex].control.notifyHighlighted(true, false);
        }
      }
    }
  }, {
    key: "_dispatchEvent",
    value: function _dispatchEvent(control, event) {
      if (control) {
        control.notifyEvent(event);
        if (event.cancelBubble) return;
      }

      switch (event.type) {
        case 'chosen':
          /*:: if (!(event instanceof ChosenEvent)) throw new Error(); */
          if (this.props.onItemChosen) this.props.onItemChosen(event);
          break;
        // case 'up':
        //   break;
        // case 'down':
        //   break;

        case 'left':
          if (this.props.onLeftPushed) this.props.onLeftPushed(event);
          break;

        case 'right':
          if (this.props.onRightPushed) this.props.onRightPushed(event);
          break;
      }

      if (event.cancelBubble) return;

      var parentCtx = this._parentCtx();

      if (parentCtx) {
        parentCtx.dispatchEvent(event);
      }
    }
  }, {
    key: "_key",
    value: function _key(event) {
      event.preventDefault();
      event.stopPropagation();

      if (this._keyboardTakenByIndex != null || this._listItems.length === 0) {
        return;
      }

      var visibleHighlightedIndex = this._getVisibleHighlightedIndex(); // enter, left, right activate for the current visibly selected item.
      // up and down de-activate any locks in place, so that they act from the last
      // naturally-selected item.


      var mEvent = null;

      switch (event.which) {
        case 13: //enter

        case 32:
          //space
          if (visibleHighlightedIndex != null) {
            mEvent = new _ChosenEvent["default"]('chosen', true, {
              withAlt: event.altKey,
              withCtrl: event.ctrlKey,
              withMeta: event.metaKey,
              withShift: event.shiftKey
            });
          }

          break;

        case 37:
          //left
          if (visibleHighlightedIndex != null) {
            mEvent = new _MenuEvent["default"]('left');
          }

          break;

        case 39:
          //right
          if (visibleHighlightedIndex != null) {
            mEvent = new _MenuEvent["default"]('right');
          }

          break;

        case 38:
          //up
          this.moveCursor('up');
          break;

        case 40:
          //down
          this.moveCursor('down');
          break;
      }

      if (mEvent) {
        var _control = visibleHighlightedIndex == null ? null : this._listItems[visibleHighlightedIndex].control;

        this._dispatchEvent(_control, mEvent);

        if (mEvent.defaultPrevented) event.preventDefault();
        if (mEvent.defaultPrevented || mEvent.cancelBubble) event.stopPropagation();
      }
    }
  }, {
    key: "moveCursor",
    value: function moveCursor(direction, prevCursorLocation) {
      if (this._listItems.length == 0) return;

      switch (direction) {
        case 'up':
          if (this._naturalHighlightedIndex == null || this._naturalHighlightedIndex == 0) {
            this._naturalHighlight(this._listItems.length - 1, true, direction, prevCursorLocation);
          } else {
            this._naturalHighlight(this._naturalHighlightedIndex - 1, true, direction, prevCursorLocation);
          }

          break;

        case 'down':
          if (this._naturalHighlightedIndex == null || this._naturalHighlightedIndex == this._listItems.length - 1) {
            this._naturalHighlight(0, true, direction, prevCursorLocation);
          } else {
            this._naturalHighlight(this._naturalHighlightedIndex + 1, true, direction, prevCursorLocation);
          }

          break;
      }
    }
  }, {
    key: "hasHighlight",
    value: function hasHighlight() {
      return this._getVisibleHighlightedIndex() != null;
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/_react["default"].createElement("div", {
        role: "menu",
        ref: this._elRef
      }, /*#__PURE__*/_react["default"].createElement(MenuListContext.Provider, {
        value: this._menuListContext
      }, this.props.children));
    }
  }]);
  return MenuList;
}(_react["default"].Component);

exports["default"] = MenuList;
(0, _defineProperty2["default"])(MenuList, "propTypes", {
  onItemChosen: _propTypes["default"].func,
  onLeftPushed: _propTypes["default"].func,
  onRightPushed: _propTypes["default"].func,
  children: _propTypes["default"].node
});
(0, _defineProperty2["default"])(MenuList, "contextType", _MenuListInspector.MenuListInspectorContext);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9NZW51TGlzdC5qcyJdLCJuYW1lcyI6WyJNZW51TGlzdENvbnRleHQiLCJSZWFjdCIsImNyZWF0ZUNvbnRleHQiLCJNZW51TGlzdCIsImNyZWF0ZVJlZiIsInJlZ2lzdGVySXRlbSIsInByb3BzIiwiY29udHJvbCIsImVsIiwiaXRlbSIsInJlZ2lzdGVyIiwiaSIsImluZGV4IiwiX2xpc3RJdGVtcyIsIl9pdGVtIiwiY29tcGFyZURvY3VtZW50UG9zaXRpb24iLCJOb2RlIiwiRE9DVU1FTlRfUE9TSVRJT05fUFJFQ0VESU5HIiwicHVzaCIsInNwbGljZSIsIl9uYXR1cmFsSGlnaGxpZ2h0ZWRJbmRleCIsIl9sb2NrZWRIaWdobGlnaHRlZEluZGV4IiwiX2tleWJvYXJkVGFrZW5CeUluZGV4IiwibWVudUxpc3RIYW5kbGUiLCJoaWdobGlnaHQiLCJieUtleWJvYXJkIiwiaW5kZXhPZiIsIkVycm9yIiwiX25hdHVyYWxIaWdobGlnaHQiLCJ1bmhpZ2hsaWdodCIsIml0ZW1DaG9zZW4iLCJtb2RpZmllcnMiLCJfZGlzcGF0Y2hFdmVudCIsIkNob3NlbkV2ZW50IiwidGFrZUtleWJvYXJkIiwicmVsZWFzZUtleWJvYXJkIiwibG9ja0hpZ2hsaWdodCIsIl9sb2NrSGlnaGxpZ2h0IiwidW5sb2NrSGlnaGxpZ2h0IiwibW92ZUN1cnNvciIsImRpcmVjdGlvbiIsInByZXZDdXJzb3JMb2NhdGlvbiIsInVwZGF0ZVByb3BzIiwibmV3UHJvcHMiLCJvbGRJbmRleCIsImlzTmF0dXJhbEhpZ2hsaWdodEluZGV4IiwiaXNMb2NrZWRIaWdobGlnaHRJbmRleCIsImlzS2V5Ym9hcmRUYWtlbkJ5SW5kZXgiLCJ1bnJlZ2lzdGVyIiwibmV3SW5kZXgiLCJjb250ZXh0IiwiS2VmaXIiLCJtZXJnZSIsIndpbmRvdyIsInRha2VVbnRpbEJ5IiwiX3N0b3BwZXIiLCJvblZhbHVlIiwiZXZlbnQiLCJfa2V5IiwicGFyZW50Q3R4IiwiX3BhcmVudEN0eCIsInJlZ2lzdGVyTWVudUxpc3QiLCJkZXN0cm95IiwidW5yZWdpc3Rlck1lbnVMaXN0IiwidmlzaWJsZUhpZ2hsaWdodGVkSW5kZXgiLCJfZ2V0VmlzaWJsZUhpZ2hsaWdodGVkSW5kZXgiLCJub3RpZnlIaWdobGlnaHRlZCIsIm5ld1Zpc2libGVIaWdobGlnaHRlZEluZGV4Iiwibm90aWZ5RXZlbnQiLCJjYW5jZWxCdWJibGUiLCJ0eXBlIiwib25JdGVtQ2hvc2VuIiwib25MZWZ0UHVzaGVkIiwib25SaWdodFB1c2hlZCIsImRpc3BhdGNoRXZlbnQiLCJwcmV2ZW50RGVmYXVsdCIsInN0b3BQcm9wYWdhdGlvbiIsImxlbmd0aCIsIm1FdmVudCIsIndoaWNoIiwid2l0aEFsdCIsImFsdEtleSIsIndpdGhDdHJsIiwiY3RybEtleSIsIndpdGhNZXRhIiwibWV0YUtleSIsIndpdGhTaGlmdCIsInNoaWZ0S2V5IiwiTWVudUV2ZW50IiwiZGVmYXVsdFByZXZlbnRlZCIsIl9lbFJlZiIsIl9tZW51TGlzdENvbnRleHQiLCJjaGlsZHJlbiIsIkNvbXBvbmVudCIsIlByb3BUeXBlcyIsImZ1bmMiLCJub2RlIiwiTWVudUxpc3RJbnNwZWN0b3JDb250ZXh0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBOztBQUVBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUVBOztBQUNBOztBQUVBOzs7Ozs7QUE0Q08sSUFBTUEsZUFBZSxnQkFBR0Msa0JBQU1DLGFBQU4sQ0FBMkMsSUFBM0MsQ0FBeEI7Ozs7SUFTY0MsUTs7Ozs7Ozs7Ozs7Ozs7O2lHQVFSLCtCO21HQUlOLEU7Ozs7NEdBT0lGLGtCQUFNRyxTQUFOLEU7eUdBVWdDO0FBQ3ZDQyxNQUFBQSxZQUFZLEVBQUUsc0JBQUNDLEtBQUQsRUFBUUMsT0FBUixFQUFpQkMsRUFBakIsRUFBd0I7QUFDcEMsWUFBTUMsSUFBSSxHQUFHO0FBQUNILFVBQUFBLEtBQUssRUFBTEEsS0FBRDtBQUFRQyxVQUFBQSxPQUFPLEVBQVBBLE9BQVI7QUFBaUJDLFVBQUFB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UUFBQSxLQUFLLEVBQUUsS0FBS0M7QUFBdEMsU0FDRyxLQUFLckYsS0FBTCxDQUFXc0YsUUFEZCxDQURGLENBREY7QUFPRDs7O0VBL2FtQzNGLGtCQUFNNEYsUzs7O2lDQUF2QjFGLFEsZUFDQTtBQUNqQm9FLEVBQUFBLFlBQVksRUFBRXVCLHNCQUFVQyxJQURQO0FBRWpCdkIsRUFBQUEsWUFBWSxFQUFFc0Isc0JBQVVDLElBRlA7QUFHakJ0QixFQUFBQSxhQUFhLEVBQUVxQixzQkFBVUMsSUFIUjtBQUlqQkgsRUFBQUEsUUFBUSxFQUFFRSxzQkFBVUU7QUFKSCxDO2lDQURBN0YsUSxpQkEyQkU4RiwyQyIsInNvdXJjZXNDb250ZW50IjpbIi8qIEBmbG93ICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgdHlwZSB7Tm9kZSBhcyBSZWFjdE5vZGV9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgS2VmaXIgZnJvbSAna2VmaXInO1xuaW1wb3J0IGtlZmlyU3RvcHBlciBmcm9tICdrZWZpci1zdG9wcGVyJztcbmltcG9ydCBmaW5kSW5kZXggZnJvbSAnYXJyYXktZmluZC1pbmRleCc7XG5pbXBvcnQgZnJvbUV2ZW50c0NhcHR1cmUgZnJvbSAnLi9saWIvZnJvbUV2ZW50c0NhcHR1cmUnO1xuXG5pbXBvcnQgTWVudUV2ZW50IGZyb20gJy4vZXZlbnRzL01lbnVFdmVudCc7XG5pbXBvcnQgQ2hvc2VuRXZlbnQgZnJvbSAnLi9ldmVudHMvQ2hvc2VuRXZlbnQnO1xuaW1wb3J0IHR5cGUge1Byb3BzIGFzIE1lbnVJdGVtUHJvcHN9IGZyb20gJy4vTWVudUl0ZW0nO1xuaW1wb3J0IHtNZW51TGlzdEluc3BlY3RvckNvbnRleHR9IGZyb20gJy4vTWVudUxpc3RJbnNwZWN0b3InO1xuaW1wb3J0IHR5cGUge01lbnVMaXN0SW5zcGVjdG9yQ29udGV4dFZhbHVlfSBmcm9tICcuL01lbnVMaXN0SW5zcGVjdG9yJztcbmltcG9ydCB0eXBlIHtEaXJlY3Rpb24sIFJlY3R9IGZyb20gJy4vdHlwZXMnO1xuXG4vLyBUaGlzIHR5cGUgb2Ygb2JqZWN0IGlzIGdpdmVuIHRvIGEgTWVudUl0ZW0gdG8gdGFsayB0byB0aGUgTWVudUxpc3QuXG5leHBvcnQgdHlwZSBNZW51TGlzdEhhbmRsZSA9IHtcbiAgaGlnaGxpZ2h0KGJ5S2V5Ym9hcmQ6IGJvb2xlYW4pOiB2b2lkLFxuICB1bmhpZ2hsaWdodCgpOiB2b2lkLFxuICBtb3ZlQ3Vyc29yKGRpcmVjdGlvbjogRGlyZWN0aW9uLCBwcmV2Q3Vyc29yTG9jYXRpb246ID9SZWN0KTogdm9pZCxcbiAgaXRlbUNob3Nlbihtb2RpZmllcnM6IHt8XG4gICAgd2l0aE1ldGE6IGJvb2xlYW4sXG4gICAgd2l0aEFsdDogYm9vbGVhbixcbiAgICB3aXRoQ3RybDogYm9vbGVhbixcbiAgICB3aXRoU2hpZnQ6IGJvb2xlYW4sXG4gIHx9KTogdm9pZCxcbiAgdGFrZUtleWJvYXJkKCk6IHZvaWQsXG4gIHJlbGVhc2VLZXlib2FyZCgpOiB2b2lkLFxuICBsb2NrSGlnaGxpZ2h0KCk6IHZvaWQsXG4gIHVubG9ja0hpZ2hsaWdodCgpOiB2b2lkLFxuICB1cGRhdGVQcm9wcyhwcm9wczogTWVudUl0ZW1Qcm9wcyk6IHZvaWQsXG4gIHVucmVnaXN0ZXIoKTogdm9pZCxcbn07XG5cbi8vIFRoaXMgdHlwZSBvZiBvYmplY3QgaXMgZ2l2ZW4gdG8gYSBNZW51TGlzdCB0byB0YWxrIHRvIGEgTWVudUl0ZW0uXG5leHBvcnQgdHlwZSBNZW51SXRlbUNvbnRyb2wgPSB7XG4gIG5vdGlmeUhpZ2hsaWdodGVkKFxuICAgIGhpZ2hsaWdodGVkOiBib29sZWFuLFxuICAgIGJ5S2V5Ym9hcmQ6ID9ib29sZWFuLFxuICAgIGRpcmVjdGlvbjogP0RpcmVjdGlvbixcbiAgICBwcmV2Q3Vyc29yTG9jYXRpb246ID9SZWN0XG4gICk6IHZvaWQsXG4gIG5vdGlmeUV2ZW50KGV2ZW50OiBNZW51RXZlbnQpOiB2b2lkLFxufTtcblxuLy8gVGhpcyBpcyB0aGUgdHlwZSBvZiB0aGUgb2JqZWN0IHRoYXQgTWVudUxpc3QgZ2l2ZXMgYXMgY29udGV4dCB0byBpdHNcbi8vIGRlc2NlbmRhbnRzLlxuZXhwb3J0IHR5cGUgTWVudUxpc3RDb250ZXh0VmFsdWUgPSB7XG4gIHJlZ2lzdGVySXRlbShcbiAgICBwcm9wczogTWVudUl0ZW1Qcm9wcyxcbiAgICBjb250cm9sOiBNZW51SXRlbUNvbnRyb2wsXG4gICAgZWw6IEhUTUxFbGVtZW50XG4gICk6IE1lbnVMaXN0SGFuZGxlLFxufTtcblxuZXhwb3J0IGNvbnN0IE1lbnVMaXN0Q29udGV4dCA9IFJlYWN0LmNyZWF0ZUNvbnRleHQ8P01lbnVMaXN0Q29udGV4dFZhbHVlPihudWxsKTtcblxuZXhwb3J0IHR5cGUgUHJvcHMgPSB7XG4gIG9uSXRlbUNob3Nlbj86IChldmVudDogQ2hvc2VuRXZlbnQpID0+IHZvaWQsXG4gIG9uTGVmdFB1c2hlZD86IChldmVudDogTWVudUV2ZW50KSA9PiB2b2lkLFxuICBvblJpZ2h0UHVzaGVkPzogKGV2ZW50OiBNZW51RXZlbnQpID0+IHZvaWQsXG4gIGNoaWxkcmVuPzogUmVhY3ROb2RlLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWVudUxpc3QgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQ8UHJvcHM+IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBvbkl0ZW1DaG9zZW46IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uTGVmdFB1c2hlZDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25SaWdodFB1c2hlZDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgY2hpbGRyZW46IFByb3BUeXBlcy5ub2RlLFxuICB9O1xuXG4gIF9zdG9wcGVyID0ga2VmaXJTdG9wcGVyKCk7XG4gIF9saXN0SXRlbXM6IEFycmF5PHtcbiAgICBwcm9wczogTWVudUl0ZW1Qcm9wcyxcbiAgICBjb250cm9sOiBNZW51SXRlbUNvbnRyb2wsXG4gIH0+ID0gW107XG5cbiAgLy8gVGhlIG5hdHVyYWwgaGlnaGxpZ2h0IGlzIHdoZXJlIHRoZSBoaWdobGlnaHQgd291bGQgYmUgaWYgbm8gbG9jayBpcyBhY3RpdmUuXG4gIF9uYXR1cmFsSGlnaGxpZ2h0ZWRJbmRleDogP251bWJlcjtcbiAgX2xvY2tlZEhpZ2hsaWdodGVkSW5kZXg6ID9udW1iZXI7XG4gIF9rZXlib2FyZFRha2VuQnlJbmRleDogP251bWJlcjtcblxuICBfZWxSZWYgPSBSZWFjdC5jcmVhdGVSZWY8SFRNTERpdkVsZW1lbnQ+KCk7XG5cbiAgX2dldFZpc2libGVIaWdobGlnaHRlZEluZGV4KCk6ID9udW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9sb2NrZWRIaWdobGlnaHRlZEluZGV4ICE9IG51bGxcbiAgICAgID8gdGhpcy5fbG9ja2VkSGlnaGxpZ2h0ZWRJbmRleFxuICAgICAgOiB0aGlzLl9uYXR1cmFsSGlnaGxpZ2h0ZWRJbmRleDtcbiAgfVxuXG4gIHN0YXRpYyBjb250ZXh0VHlwZSA9IE1lbnVMaXN0SW5zcGVjdG9yQ29udGV4dDtcblxuICBfbWVudUxpc3RDb250ZXh0OiBNZW51TGlzdENvbnRleHRWYWx1ZSA9IHtcbiAgICByZWdpc3Rlckl0ZW06IChwcm9wcywgY29udHJvbCwgZWwpID0+IHtcbiAgICAgIGNvbnN0IGl0ZW0gPSB7cHJvcHMsIGNvbnRyb2wsIGVsfTtcblxuICAgICAgY29uc3QgcmVnaXN0ZXIgPSAoKSA9PiB7XG4gICAgICAgIGxldCBpID0gLTE7XG4gICAgICAgIGlmIChpdGVtLnByb3BzLmluZGV4ID09IG51bGwpIHtcbiAgICAgICAgICBpID0gZmluZEluZGV4KFxuICAgICAgICAgICAgdGhpcy5fbGlzdEl0ZW1zLFxuICAgICAgICAgICAgX2l0ZW0gPT5cbiAgICAgICAgICAgICAgKGl0ZW0uZWwuY29tcGFyZURvY3VtZW50UG9zaXRpb24oX2l0ZW0uZWwpICZcbiAgICAgICAgICAgICAgICBOb2RlLkRPQ1VNRU5UX1BPU0lUSU9OX1BSRUNFRElORykgPT09XG4gICAgICAgICAgICAgIDBcbiAgICAgICAgICApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGkgPSBmaW5kSW5kZXgoXG4gICAgICAgICAgICB0aGlzLl9saXN0SXRlbXMsXG4gICAgICAgICAgICBfaXRlbSA9PlxuICAgICAgICAgICAgICBfaXRlbS5wcm9wcy5pbmRleCAhPSBudWxsICYmIGl0ZW0ucHJvcHMuaW5kZXggPCBfaXRlbS5wcm9wcy5pbmRleFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGkgPCAwKSB7XG4gICAgICAgICAgdGhpcy5fbGlzdEl0ZW1zLnB1c2goaXRlbSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5fbGlzdEl0ZW1zLnNwbGljZShpLCAwLCBpdGVtKTtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICB0aGlzLl9uYXR1cmFsSGlnaGxpZ2h0ZWRJbmRleCAhPSBudWxsICYmXG4gICAgICAgICAgICBpIDw9IHRoaXMuX25hdHVyYWxIaWdobGlnaHRlZEluZGV4XG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICB0aGlzLl9uYXR1cmFsSGlnaGxpZ2h0ZWRJbmRleCsrO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICB0aGlzLl9sb2NrZWRIaWdobGlnaHRlZEluZGV4ICE9IG51bGwgJiZcbiAgICAgICAgICAgIGkgPD0gdGhpcy5fbG9ja2VkSGlnaGxpZ2h0ZWRJbmRleFxuICAgICAgICAgICkge1xuICAgICAgICAgICAgdGhpcy5fbG9ja2VkSGlnaGxpZ2h0ZWRJbmRleCsrO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICB0aGlzLl9rZXlib2FyZFRha2VuQnlJbmRleCAhPSBudWxsICYmXG4gICAgICAgICAgICBpIDw9IHRoaXMuX2tleWJvYXJkVGFrZW5CeUluZGV4XG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICB0aGlzLl9rZXlib2FyZFRha2VuQnlJbmRleCsrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgcmVnaXN0ZXIoKTtcblxuICAgICAgY29uc3QgbWVudUxpc3RIYW5kbGU6IE1lbnVMaXN0SGFuZGxlID0ge1xuICAgICAgICBoaWdobGlnaHQ6IChieUtleWJvYXJkOiBib29sZWFuKSA9PiB7XG4gICAgICAgICAgY29uc3QgaSA9IHRoaXMuX2xpc3RJdGVtcy5pbmRleE9mKGl0ZW0pO1xuICAgICAgICAgIGlmIChpIDwgMCkgdGhyb3cgbmV3IEVycm9yKCdBbHJlYWR5IHVucmVnaXN0ZXJlZCBNZW51SXRlbScpO1xuICAgICAgICAgIHRoaXMuX25hdHVyYWxIaWdobGlnaHQoaSwgYnlLZXlib2FyZCk7XG4gICAgICAgIH0sXG4gICAgICAgIHVuaGlnaGxpZ2h0OiAoKSA9PiB7XG4gICAgICAgICAgY29uc3QgaSA9IHRoaXMuX2xpc3RJdGVtcy5pbmRleE9mKGl0ZW0pO1xuICAgICAgICAgIGlmIChpIDwgMCkgdGhyb3cgbmV3IEVycm9yKCdBbHJlYWR5IHVucmVnaXN0ZXJlZCBNZW51SXRlbScpO1xuICAgICAgICAgIGlmICh0aGlzLl9uYXR1cmFsSGlnaGxpZ2h0ZWRJbmRleCA9PT0gaSkge1xuICAgICAgICAgICAgdGhpcy5fbmF0dXJhbEhpZ2hsaWdodChudWxsLCBmYWxzZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBpdGVtQ2hvc2VuOiAobW9kaWZpZXJzOiB7fFxuICAgICAgICAgIHdpdGhNZXRhOiBib29sZWFuLFxuICAgICAgICAgIHdpdGhBbHQ6IGJvb2xlYW4sXG4gICAgICAgICAgd2l0aEN0cmw6IGJvb2xlYW4sXG4gICAgICAgICAgd2l0aFNoaWZ0OiBib29sZWFuLFxuICAgICAgICB8fSkgPT4ge1xuICAgICAgICAgIHRoaXMuX2Rpc3BhdGNoRXZlbnQoXG4gICAgICAgICAgICBjb250cm9sLFxuICAgICAgICAgICAgbmV3IENob3NlbkV2ZW50KCdjaG9zZW4nLCBmYWxzZSwgbW9kaWZpZXJzKVxuICAgICAgICAgICk7XG4gICAgICAgIH0sXG4gICAgICAgIHRha2VLZXlib2FyZDogKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IGkgPSB0aGlzLl9saXN0SXRlbXMuaW5kZXhPZihpdGVtKTtcbiAgICAgICAgICBpZiAoaSA8IDApIHRocm93IG5ldyBFcnJvcignQWxyZWFkeSB1bnJlZ2lzdGVyZWQgTWVudUl0ZW0nKTtcbiAgICAgICAgICB0aGlzLl9rZXlib2FyZFRha2VuQnlJbmRleCA9IGk7XG4gICAgICAgIH0sXG4gICAgICAgIHJlbGVhc2VLZXlib2FyZDogKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IGkgPSB0aGlzLl9saXN0SXRlbXMuaW5kZXhPZihpdGVtKTtcbiAgICAgICAgICBpZiAoaSA8IDApIHRocm93IG5ldyBFcnJvcignQWxyZWFkeSB1bnJlZ2lzdGVyZWQgTWVudUl0ZW0nKTtcbiAgICAgICAgICBpZiAodGhpcy5fa2V5Ym9hcmRUYWtlbkJ5SW5kZXggPT09IGkpIHtcbiAgICAgICAgICAgIHRoaXMuX2tleWJvYXJkVGFrZW5CeUluZGV4ID0gbnVsbDtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGxvY2tIaWdobGlnaHQ6ICgpID0+IHtcbiAgICAgICAgICBjb25zdCBpID0gdGhpcy5fbGlzdEl0ZW1zLmluZGV4T2YoaXRlbSk7XG4gICAgICAgICAgaWYgKGkgPCAwKSB0aHJvdyBuZXcgRXJyb3IoJ0FscmVhZHkgdW5yZWdpc3RlcmVkIE1lbnVJdGVtJyk7XG4gICAgICAgICAgdGhpcy5fbG9ja0hpZ2hsaWdodChpKTtcbiAgICAgICAgfSxcbiAgICAgICAgdW5sb2NrSGlnaGxpZ2h0OiAoKSA9PiB7XG4gICAgICAgICAgY29uc3QgaSA9IHRoaXMuX2xpc3RJdGVtcy5pbmRleE9mKGl0ZW0pO1xuICAgICAgICAgIGlmIChpIDwgMCkgdGhyb3cgbmV3IEVycm9yKCdBbHJlYWR5IHVucmVnaXN0ZXJlZCBNZW51SXRlbScpO1xuICAgICAgICAgIGlmICh0aGlzLl9sb2NrZWRIaWdobGlnaHRlZEluZGV4ID09PSBpKSB7XG4gICAgICAgICAgICB0aGlzLl9sb2NrSGlnaGxpZ2h0KG51bGwpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgbW92ZUN1cnNvcjogKGRpcmVjdGlvbjogRGlyZWN0aW9uLCBwcmV2Q3Vyc29yTG9jYXRpb246ID9SZWN0KSA9PiB7XG4gICAgICAgICAgdGhpcy5tb3ZlQ3Vyc29yKGRpcmVjdGlvbiwgcHJldkN1cnNvckxvY2F0aW9uKTtcbiAgICAgICAgfSxcbiAgICAgICAgdXBkYXRlUHJvcHM6IChuZXdQcm9wczogTWVudUl0ZW1Qcm9wcykgPT4ge1xuICAgICAgICAgIGlmIChpdGVtLnByb3BzLmluZGV4ICE9PSBuZXdQcm9wcy5pbmRleCkge1xuICAgICAgICAgICAgY29uc3Qgb2xkSW5kZXggPSB0aGlzLl9saXN0SXRlbXMuaW5kZXhPZihpdGVtKTtcbiAgICAgICAgICAgIGNvbnN0IGlzTmF0dXJhbEhpZ2hsaWdodEluZGV4ID1cbiAgICAgICAgICAgICAgdGhpcy5fbmF0dXJhbEhpZ2hsaWdodGVkSW5kZXggPT09IG9sZEluZGV4O1xuICAgICAgICAgICAgY29uc3QgaXNMb2NrZWRIaWdobGlnaHRJbmRleCA9XG4gICAgICAgICAgICAgIHRoaXMuX2xvY2tlZEhpZ2hsaWdodGVkSW5kZXggPT09IG9sZEluZGV4O1xuICAgICAgICAgICAgY29uc3QgaXNLZXlib2FyZFRha2VuQnlJbmRleCA9XG4gICAgICAgICAgICAgIHRoaXMuX2tleWJvYXJkVGFrZW5CeUluZGV4ID09PSBvbGRJbmRleDtcblxuICAgICAgICAgICAgbWVudUxpc3RIYW5kbGUudW5yZWdpc3RlcigpO1xuICAgICAgICAgICAgcHJvcHMgPSBuZXdQcm9wcztcbiAgICAgICAgICAgIGl0ZW0ucHJvcHMgPSBuZXdQcm9wcztcbiAgICAgICAgICAgIHJlZ2lzdGVyKCk7XG5cbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgaXNOYXR1cmFsSGlnaGxpZ2h0SW5kZXggfHxcbiAgICAgICAgICAgICAgaXNMb2NrZWRIaWdobGlnaHRJbmRleCB8fFxuICAgICAgICAgICAgICBpc0tleWJvYXJkVGFrZW5CeUluZGV4XG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgY29uc3QgbmV3SW5kZXggPSB0aGlzLl9saXN0SXRlbXMuaW5kZXhPZihpdGVtKTtcbiAgICAgICAgICAgICAgaWYgKGlzTmF0dXJhbEhpZ2hsaWdodEluZGV4KVxuICAgICAgICAgICAgICAgIHRoaXMuX25hdHVyYWxIaWdobGlnaHRlZEluZGV4ID0gbmV3SW5kZXg7XG4gICAgICAgICAgICAgIGlmIChpc0xvY2tlZEhpZ2hsaWdodEluZGV4KVxuICAgICAgICAgICAgICAgIHRoaXMuX2xvY2tlZEhpZ2hsaWdodGVkSW5kZXggPSBuZXdJbmRleDtcbiAgICAgICAgICAgICAgaWYgKGlzS2V5Ym9hcmRUYWtlbkJ5SW5kZXgpIHRoaXMuX2tleWJvYXJkVGFrZW5CeUluZGV4ID0gbmV3SW5kZXg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHByb3BzID0gbmV3UHJvcHM7XG4gICAgICAgICAgICBpdGVtLnByb3BzID0gbmV3UHJvcHM7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB1bnJlZ2lzdGVyOiAoKSA9PiB7XG4gICAgICAgICAgY29uc3QgaSA9IHRoaXMuX2xpc3RJdGVtcy5pbmRleE9mKGl0ZW0pO1xuICAgICAgICAgIGlmIChpIDwgMCkgdGhyb3cgbmV3IEVycm9yKCdBbHJlYWR5IHVucmVnaXN0ZXJlZCBNZW51SXRlbScpO1xuICAgICAgICAgIGlmIChpID09PSB0aGlzLl9uYXR1cmFsSGlnaGxpZ2h0ZWRJbmRleCkge1xuICAgICAgICAgICAgdGhpcy5fbmF0dXJhbEhpZ2hsaWdodGVkSW5kZXggPSBudWxsO1xuICAgICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgICB0aGlzLl9uYXR1cmFsSGlnaGxpZ2h0ZWRJbmRleCAhPSBudWxsICYmXG4gICAgICAgICAgICBpIDwgdGhpcy5fbmF0dXJhbEhpZ2hsaWdodGVkSW5kZXhcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHRoaXMuX25hdHVyYWxIaWdobGlnaHRlZEluZGV4LS07XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChpID09PSB0aGlzLl9sb2NrZWRIaWdobGlnaHRlZEluZGV4KSB7XG4gICAgICAgICAgICB0aGlzLl9sb2NrZWRIaWdobGlnaHRlZEluZGV4ID0gbnVsbDtcbiAgICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgICAgdGhpcy5fbG9ja2VkSGlnaGxpZ2h0ZWRJbmRleCAhPSBudWxsICYmXG4gICAgICAgICAgICBpIDwgdGhpcy5fbG9ja2VkSGlnaGxpZ2h0ZWRJbmRleFxuICAgICAgICAgICkge1xuICAgICAgICAgICAgdGhpcy5fbG9ja2VkSGlnaGxpZ2h0ZWRJbmRleC0tO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoaSA9PT0gdGhpcy5fa2V5Ym9hcmRUYWtlbkJ5SW5kZXgpIHtcbiAgICAgICAgICAgIHRoaXMuX2tleWJvYXJkVGFrZW5CeUluZGV4ID0gbnVsbDtcbiAgICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgICAgdGhpcy5fa2V5Ym9hcmRUYWtlbkJ5SW5kZXggIT0gbnVsbCAmJlxuICAgICAgICAgICAgaSA8IHRoaXMuX2tleWJvYXJkVGFrZW5CeUluZGV4XG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICB0aGlzLl9rZXlib2FyZFRha2VuQnlJbmRleC0tO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLl9saXN0SXRlbXMuc3BsaWNlKGksIDEpO1xuICAgICAgICB9LFxuICAgICAgfTtcbiAgICAgIHJldHVybiBtZW51TGlzdEhhbmRsZTtcbiAgICB9LFxuICB9O1xuXG4gIF9wYXJlbnRDdHgoKTogP01lbnVMaXN0SW5zcGVjdG9yQ29udGV4dFZhbHVlIHtcbiAgICByZXR1cm4gdGhpcy5jb250ZXh0O1xuICB9XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgLy8gY29uc3QgaXNFbnRlck9yU3BhY2VPckFycm93S2V5ID0gZSA9PlxuICAgIC8vICAgZS53aGljaCA9PT0gMTMgfHwgZS53aGljaCA9PT0gMzIgfHwgKDM3IDw9IGUud2hpY2ggJiYgZS53aGljaCA8PSA0MCk7XG4gICAgLy9cbiAgICAvLyBjb25zdCBlbCA9IHRoaXMuX2VsUmVmLmN1cnJlbnQ7XG4gICAgLyo6OiBpZiAoIWVsKSB0aHJvdyBuZXcgRXJyb3IoKTsgKi9cblxuICAgIC8vIFRoZSBvbmx5IHRoaW5ncyB0aGF0IHNob3VsZCByZWNlaXZlIGtleWRvd24va2V5cHJlc3MgZXZlbnRzIGJlZm9yZSB1c1xuICAgIC8vIGFyZSBvdXIgY2hpbGRyZW4uIFRoaXMgYWxsb3dzIGEgTWVudUl0ZW0gdG8gY29udGFpbiBhIHRleHQgaW5wdXRcbiAgICAvLyB3aGljaCBzZWxlY3RpdmVseSBzdG9wcyBwcm9wYWdhdGlvbiBvbiBrZXkgZXZlbnRzIGZvciBleGFtcGxlLlxuICAgIEtlZmlyLm1lcmdlKFtcbiAgICAgIC8vIEtlZmlyLmZyb21FdmVudHMod2luZG93LCAna2V5ZG93bicpXG4gICAgICAvLyAgIC5maWx0ZXIoaXNFbnRlck9yU3BhY2VPckFycm93S2V5KVxuICAgICAgLy8gICAuZmlsdGVyKGUgPT4gZWwuY29udGFpbnMoZS50YXJnZXQpKSxcbiAgICAgIGZyb21FdmVudHNDYXB0dXJlKHdpbmRvdywgJ2tleWRvd24nKSxcbiAgICAgIC8vIC5maWx0ZXIoaXNFbnRlck9yU3BhY2VPckFycm93S2V5KVxuICAgICAgLy8gLmZpbHRlcihlID0+ICFlbC5jb250YWlucyhlLnRhcmdldCkpLFxuICAgIF0pXG4gICAgICAudGFrZVVudGlsQnkodGhpcy5fc3RvcHBlcilcbiAgICAgIC5vblZhbHVlKGV2ZW50ID0+IHRoaXMuX2tleShldmVudCkpO1xuXG4gICAgY29uc3QgcGFyZW50Q3R4ID0gdGhpcy5fcGFyZW50Q3R4KCk7XG4gICAgaWYgKHBhcmVudEN0eCkge1xuICAgICAgcGFyZW50Q3R4LnJlZ2lzdGVyTWVudUxpc3QodGhpcyk7XG4gICAgfVxuICB9XG5cbiAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgdGhpcy5fc3RvcHBlci5kZXN0cm95KCk7XG5cbiAgICBjb25zdCBwYXJlbnRDdHggPSB0aGlzLl9wYXJlbnRDdHgoKTtcbiAgICBpZiAocGFyZW50Q3R4KSB7XG4gICAgICBwYXJlbnRDdHgudW5yZWdpc3Rlck1lbnVMaXN0KHRoaXMpO1xuICAgIH1cbiAgfVxuXG4gIF9uYXR1cmFsSGlnaGxpZ2h0KFxuICAgIGluZGV4OiA/bnVtYmVyLFxuICAgIGJ5S2V5Ym9hcmQ6IGJvb2xlYW4sXG4gICAgZGlyZWN0aW9uOiA/RGlyZWN0aW9uLFxuICAgIHByZXZDdXJzb3JMb2NhdGlvbjogP1JlY3RcbiAgKSB7XG4gICAgY29uc3QgdmlzaWJsZUhpZ2hsaWdodGVkSW5kZXggPSB0aGlzLl9nZXRWaXNpYmxlSGlnaGxpZ2h0ZWRJbmRleCgpO1xuXG4gICAgaWYgKHRoaXMuX2xvY2tlZEhpZ2hsaWdodGVkSW5kZXggIT0gbnVsbCAmJiBieUtleWJvYXJkKSB7XG4gICAgICB0aGlzLl9sb2NrZWRIaWdobGlnaHRlZEluZGV4ID0gbnVsbDtcbiAgICB9XG4gICAgdGhpcy5fbmF0dXJhbEhpZ2hsaWdodGVkSW5kZXggPSBpbmRleDtcbiAgICBpZiAodGhpcy5fbG9ja2VkSGlnaGxpZ2h0ZWRJbmRleCA9PSBudWxsKSB7XG4gICAgICBpZiAoaW5kZXggIT0gbnVsbCkge1xuICAgICAgICB0aGlzLl9saXN0SXRlbXNbaW5kZXhdLmNvbnRyb2wubm90aWZ5SGlnaGxpZ2h0ZWQoXG4gICAgICAgICAgdHJ1ZSxcbiAgICAgICAgICBieUtleWJvYXJkLFxuICAgICAgICAgIGRpcmVjdGlvbixcbiAgICAgICAgICBwcmV2Q3Vyc29yTG9jYXRpb25cbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIGlmICh2aXNpYmxlSGlnaGxpZ2h0ZWRJbmRleCAhPSBudWxsICYmIHZpc2libGVIaWdobGlnaHRlZEluZGV4ICE9IGluZGV4KSB7XG4gICAgICAgIHRoaXMuX2xpc3RJdGVtc1t2aXNpYmxlSGlnaGxpZ2h0ZWRJbmRleF0uY29udHJvbC5ub3RpZnlIaWdobGlnaHRlZChcbiAgICAgICAgICBmYWxzZVxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIF9sb2NrSGlnaGxpZ2h0KGluZGV4OiA/bnVtYmVyKSB7XG4gICAgaWYgKGluZGV4ID09PSB0aGlzLl9sb2NrZWRIaWdobGlnaHRlZEluZGV4KSByZXR1cm47XG4gICAgY29uc3QgdmlzaWJsZUhpZ2hsaWdodGVkSW5kZXggPSB0aGlzLl9nZXRWaXNpYmxlSGlnaGxpZ2h0ZWRJbmRleCgpO1xuICAgIHRoaXMuX2xvY2tlZEhpZ2hsaWdodGVkSW5kZXggPSBpbmRleDtcbiAgICBjb25zdCBuZXdWaXNpYmxlSGlnaGxpZ2h0ZWRJbmRleCA9IHRoaXMuX2dldFZpc2libGVIaWdobGlnaHRlZEluZGV4KCk7XG4gICAgaWYgKHZpc2libGVIaWdobGlnaHRlZEluZGV4ICE9IG51bGwgJiYgbmV3VmlzaWJsZUhpZ2hsaWdodGVkSW5kZXggPT0gbnVsbCkge1xuICAgICAgLy8gV2hlbiB1bmxvY2tpbmcsIHByZWZlciB0byBrZWVwIHRoZSBjdXJyZW50IHNlbGVjdGlvbiBvdmVyIGRlLXNlbGVjdGluZ1xuICAgICAgLy8gZXZlcnl0aGluZy5cbiAgICAgIHRoaXMuX25hdHVyYWxIaWdobGlnaHRlZEluZGV4ID0gdmlzaWJsZUhpZ2hsaWdodGVkSW5kZXg7XG4gICAgfSBlbHNlIGlmICh2aXNpYmxlSGlnaGxpZ2h0ZWRJbmRleCAhPSBuZXdWaXNpYmxlSGlnaGxpZ2h0ZWRJbmRleCkge1xuICAgICAgaWYgKHZpc2libGVIaWdobGlnaHRlZEluZGV4ICE9IG51bGwpIHtcbiAgICAgICAgdGhpcy5fbGlzdEl0ZW1zW3Zpc2libGVIaWdobGlnaHRlZEluZGV4XS5jb250cm9sLm5vdGlmeUhpZ2hsaWdodGVkKFxuICAgICAgICAgIGZhbHNlXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICBpZiAobmV3VmlzaWJsZUhpZ2hsaWdodGVkSW5kZXggIT0gbnVsbCkge1xuICAgICAgICB0aGlzLl9saXN0SXRlbXNbbmV3VmlzaWJsZUhpZ2hsaWdodGVkSW5kZXhdLmNvbnRyb2wubm90aWZ5SGlnaGxpZ2h0ZWQoXG4gICAgICAgICAgdHJ1ZSxcbiAgICAgICAgICBmYWxzZVxuICAgICAgICApO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLl9uYXR1cmFsSGlnaGxpZ2h0ZWRJbmRleCAhPSBudWxsKSB7XG4gICAgICAgIHRoaXMuX2xpc3RJdGVtc1tcbiAgICAgICAgICB0aGlzLl9uYXR1cmFsSGlnaGxpZ2h0ZWRJbmRleFxuICAgICAgICBdLmNvbnRyb2wubm90aWZ5SGlnaGxpZ2h0ZWQodHJ1ZSwgZmFsc2UpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIF9kaXNwYXRjaEV2ZW50KGNvbnRyb2w6ID9NZW51SXRlbUNvbnRyb2wsIGV2ZW50OiBNZW51RXZlbnQpIHtcbiAgICBpZiAoY29udHJvbCkge1xuICAgICAgY29udHJvbC5ub3RpZnlFdmVudChldmVudCk7XG4gICAgICBpZiAoZXZlbnQuY2FuY2VsQnViYmxlKSByZXR1cm47XG4gICAgfVxuICAgIHN3aXRjaCAoZXZlbnQudHlwZSkge1xuICAgICAgY2FzZSAnY2hvc2VuJzpcbiAgICAgICAgLyo6OiBpZiAoIShldmVudCBpbnN0YW5jZW9mIENob3NlbkV2ZW50KSkgdGhyb3cgbmV3IEVycm9yKCk7ICovXG4gICAgICAgIGlmICh0aGlzLnByb3BzLm9uSXRlbUNob3NlbikgdGhpcy5wcm9wcy5vbkl0ZW1DaG9zZW4oZXZlbnQpO1xuICAgICAgICBicmVhaztcbiAgICAgIC8vIGNhc2UgJ3VwJzpcbiAgICAgIC8vICAgYnJlYWs7XG4gICAgICAvLyBjYXNlICdkb3duJzpcbiAgICAgIC8vICAgYnJlYWs7XG4gICAgICBjYXNlICdsZWZ0JzpcbiAgICAgICAgaWYgKHRoaXMucHJvcHMub25MZWZ0UHVzaGVkKSB0aGlzLnByb3BzLm9uTGVmdFB1c2hlZChldmVudCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAncmlnaHQnOlxuICAgICAgICBpZiAodGhpcy5wcm9wcy5vblJpZ2h0UHVzaGVkKSB0aGlzLnByb3BzLm9uUmlnaHRQdXNoZWQoZXZlbnQpO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gICAgaWYgKGV2ZW50LmNhbmNlbEJ1YmJsZSkgcmV0dXJuO1xuICAgIGNvbnN0IHBhcmVudEN0eCA9IHRoaXMuX3BhcmVudEN0eCgpO1xuICAgIGlmIChwYXJlbnRDdHgpIHtcbiAgICAgIHBhcmVudEN0eC5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbiAgICB9XG4gIH1cblxuICBfa2V5KGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgIGlmICh0aGlzLl9rZXlib2FyZFRha2VuQnlJbmRleCAhPSBudWxsIHx8IHRoaXMuX2xpc3RJdGVtcy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCB2aXNpYmxlSGlnaGxpZ2h0ZWRJbmRleCA9IHRoaXMuX2dldFZpc2libGVIaWdobGlnaHRlZEluZGV4KCk7XG5cbiAgICAvLyBlbnRlciwgbGVmdCwgcmlnaHQgYWN0aXZhdGUgZm9yIHRoZSBjdXJyZW50IHZpc2libHkgc2VsZWN0ZWQgaXRlbS5cbiAgICAvLyB1cCBhbmQgZG93biBkZS1hY3RpdmF0ZSBhbnkgbG9ja3MgaW4gcGxhY2UsIHNvIHRoYXQgdGhleSBhY3QgZnJvbSB0aGUgbGFzdFxuICAgIC8vIG5hdHVyYWxseS1zZWxlY3RlZCBpdGVtLlxuXG4gICAgbGV0IG1FdmVudCA9IG51bGw7XG5cbiAgICBzd2l0Y2ggKGV2ZW50LndoaWNoKSB7XG4gICAgICBjYXNlIDEzOiAvL2VudGVyXG4gICAgICBjYXNlIDMyOiAvL3NwYWNlXG4gICAgICAgIGlmICh2aXNpYmxlSGlnaGxpZ2h0ZWRJbmRleCAhPSBudWxsKSB7XG4gICAgICAgICAgbUV2ZW50ID0gbmV3IENob3NlbkV2ZW50KCdjaG9zZW4nLCB0cnVlLCB7XG4gICAgICAgICAgICB3aXRoQWx0OiBldmVudC5hbHRLZXksXG4gICAgICAgICAgICB3aXRoQ3RybDogZXZlbnQuY3RybEtleSxcbiAgICAgICAgICAgIHdpdGhNZXRhOiBldmVudC5tZXRhS2V5LFxuICAgICAgICAgICAgd2l0aFNoaWZ0OiBldmVudC5zaGlmdEtleSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMzc6IC8vbGVmdFxuICAgICAgICBpZiAodmlzaWJsZUhpZ2hsaWdodGVkSW5kZXggIT0gbnVsbCkge1xuICAgICAgICAgIG1FdmVudCA9IG5ldyBNZW51RXZlbnQoJ2xlZnQnKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMzk6IC8vcmlnaHRcbiAgICAgICAgaWYgKHZpc2libGVIaWdobGlnaHRlZEluZGV4ICE9IG51bGwpIHtcbiAgICAgICAgICBtRXZlbnQgPSBuZXcgTWVudUV2ZW50KCdyaWdodCcpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAzODogLy91cFxuICAgICAgICB0aGlzLm1vdmVDdXJzb3IoJ3VwJyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSA0MDogLy9kb3duXG4gICAgICAgIHRoaXMubW92ZUN1cnNvcignZG93bicpO1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICBpZiAobUV2ZW50KSB7XG4gICAgICBjb25zdCBjb250cm9sID1cbiAgICAgICAgdmlzaWJsZUhpZ2hsaWdodGVkSW5kZXggPT0gbnVsbFxuICAgICAgICAgID8gbnVsbFxuICAgICAgICAgIDogdGhpcy5fbGlzdEl0ZW1zW3Zpc2libGVIaWdobGlnaHRlZEluZGV4XS5jb250cm9sO1xuICAgICAgdGhpcy5fZGlzcGF0Y2hFdmVudChjb250cm9sLCBtRXZlbnQpO1xuICAgICAgaWYgKG1FdmVudC5kZWZhdWx0UHJldmVudGVkKSBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgaWYgKG1FdmVudC5kZWZhdWx0UHJldmVudGVkIHx8IG1FdmVudC5jYW5jZWxCdWJibGUpXG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH1cbiAgfVxuXG4gIG1vdmVDdXJzb3IoZGlyZWN0aW9uOiBEaXJlY3Rpb24sIHByZXZDdXJzb3JMb2NhdGlvbjogP1JlY3QpIHtcbiAgICBpZiAodGhpcy5fbGlzdEl0ZW1zLmxlbmd0aCA9PSAwKSByZXR1cm47XG5cbiAgICBzd2l0Y2ggKGRpcmVjdGlvbikge1xuICAgICAgY2FzZSAndXAnOlxuICAgICAgICBpZiAoXG4gICAgICAgICAgdGhpcy5fbmF0dXJhbEhpZ2hsaWdodGVkSW5kZXggPT0gbnVsbCB8fFxuICAgICAgICAgIHRoaXMuX25hdHVyYWxIaWdobGlnaHRlZEluZGV4ID09IDBcbiAgICAgICAgKSB7XG4gICAgICAgICAgdGhpcy5fbmF0dXJhbEhpZ2hsaWdodChcbiAgICAgICAgICAgIHRoaXMuX2xpc3RJdGVtcy5sZW5ndGggLSAxLFxuICAgICAgICAgICAgdHJ1ZSxcbiAgICAgICAgICAgIGRpcmVjdGlvbixcbiAgICAgICAgICAgIHByZXZDdXJzb3JMb2NhdGlvblxuICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5fbmF0dXJhbEhpZ2hsaWdodChcbiAgICAgICAgICAgIHRoaXMuX25hdHVyYWxIaWdobGlnaHRlZEluZGV4IC0gMSxcbiAgICAgICAgICAgIHRydWUsXG4gICAgICAgICAgICBkaXJlY3Rpb24sXG4gICAgICAgICAgICBwcmV2Q3Vyc29yTG9jYXRpb25cbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnZG93bic6XG4gICAgICAgIGlmIChcbiAgICAgICAgICB0aGlzLl9uYXR1cmFsSGlnaGxpZ2h0ZWRJbmRleCA9PSBudWxsIHx8XG4gICAgICAgICAgdGhpcy5fbmF0dXJhbEhpZ2hsaWdodGVkSW5kZXggPT0gdGhpcy5fbGlzdEl0ZW1zLmxlbmd0aCAtIDFcbiAgICAgICAgKSB7XG4gICAgICAgICAgdGhpcy5fbmF0dXJhbEhpZ2hsaWdodCgwLCB0cnVlLCBkaXJlY3Rpb24sIHByZXZDdXJzb3JMb2NhdGlvbik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5fbmF0dXJhbEhpZ2hsaWdodChcbiAgICAgICAgICAgIHRoaXMuX25hdHVyYWxIaWdobGlnaHRlZEluZGV4ICsgMSxcbiAgICAgICAgICAgIHRydWUsXG4gICAgICAgICAgICBkaXJlY3Rpb24sXG4gICAgICAgICAgICBwcmV2Q3Vyc29yTG9jYXRpb25cbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIGhhc0hpZ2hsaWdodCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fZ2V0VmlzaWJsZUhpZ2hsaWdodGVkSW5kZXgoKSAhPSBudWxsO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IHJvbGU9XCJtZW51XCIgcmVmPXt0aGlzLl9lbFJlZn0+XG4gICAgICAgIDxNZW51TGlzdENvbnRleHQuUHJvdmlkZXIgdmFsdWU9e3RoaXMuX21lbnVMaXN0Q29udGV4dH0+XG4gICAgICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW59XG4gICAgICAgIDwvTWVudUxpc3RDb250ZXh0LlByb3ZpZGVyPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuIl19