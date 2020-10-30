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
          itemChosen: function itemChosen() {
            _this._dispatchEvent(control, new _ChosenEvent["default"]('chosen', false));
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
            mEvent = new _ChosenEvent["default"]('chosen', true);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9NZW51TGlzdC5qcyJdLCJuYW1lcyI6WyJNZW51TGlzdENvbnRleHQiLCJSZWFjdCIsImNyZWF0ZUNvbnRleHQiLCJNZW51TGlzdCIsImNyZWF0ZVJlZiIsInJlZ2lzdGVySXRlbSIsInByb3BzIiwiY29udHJvbCIsImVsIiwiaXRlbSIsInJlZ2lzdGVyIiwiaSIsImluZGV4IiwiX2xpc3RJdGVtcyIsIl9pdGVtIiwiY29tcGFyZURvY3VtZW50UG9zaXRpb24iLCJOb2RlIiwiRE9DVU1FTlRfUE9TSVRJT05fUFJFQ0VESU5HIiwicHVzaCIsInNwbGljZSIsIl9uYXR1cmFsSGlnaGxpZ2h0ZWRJbmRleCIsIl9sb2NrZWRIaWdobGlnaHRlZEluZGV4IiwiX2tleWJvYXJkVGFrZW5CeUluZGV4IiwibWVudUxpc3RIYW5kbGUiLCJoaWdobGlnaHQiLCJieUtleWJvYXJkIiwiaW5kZXhPZiIsIkVycm9yIiwiX25hdHVyYWxIaWdobGlnaHQiLCJ1bmhpZ2hsaWdodCIsIml0ZW1DaG9zZW4iLCJfZGlzcGF0Y2hFdmVudCIsIkNob3NlbkV2ZW50IiwidGFrZUtleWJvYXJkIiwicmVsZWFzZUtleWJvYXJkIiwibG9ja0hpZ2hsaWdodCIsIl9sb2NrSGlnaGxpZ2h0IiwidW5sb2NrSGlnaGxpZ2h0IiwibW92ZUN1cnNvciIsImRpcmVjdGlvbiIsInByZXZDdXJzb3JMb2NhdGlvbiIsInVwZGF0ZVByb3BzIiwibmV3UHJvcHMiLCJvbGRJbmRleCIsImlzTmF0dXJhbEhpZ2hsaWdodEluZGV4IiwiaXNMb2NrZWRIaWdobGlnaHRJbmRleCIsImlzS2V5Ym9hcmRUYWtlbkJ5SW5kZXgiLCJ1bnJlZ2lzdGVyIiwibmV3SW5kZXgiLCJjb250ZXh0IiwiS2VmaXIiLCJtZXJnZSIsIndpbmRvdyIsInRha2VVbnRpbEJ5IiwiX3N0b3BwZXIiLCJvblZhbHVlIiwiZXZlbnQiLCJfa2V5IiwicGFyZW50Q3R4IiwiX3BhcmVudEN0eCIsInJlZ2lzdGVyTWVudUxpc3QiLCJkZXN0cm95IiwidW5yZWdpc3Rlck1lbnVMaXN0IiwidmlzaWJsZUhpZ2hsaWdodGVkSW5kZXgiLCJfZ2V0VmlzaWJsZUhpZ2hsaWdodGVkSW5kZXgiLCJub3RpZnlIaWdobGlnaHRlZCIsIm5ld1Zpc2libGVIaWdobGlnaHRlZEluZGV4Iiwibm90aWZ5RXZlbnQiLCJjYW5jZWxCdWJibGUiLCJ0eXBlIiwib25JdGVtQ2hvc2VuIiwib25MZWZ0UHVzaGVkIiwib25SaWdodFB1c2hlZCIsImRpc3BhdGNoRXZlbnQiLCJwcmV2ZW50RGVmYXVsdCIsInN0b3BQcm9wYWdhdGlvbiIsImxlbmd0aCIsIm1FdmVudCIsIndoaWNoIiwiTWVudUV2ZW50IiwiZGVmYXVsdFByZXZlbnRlZCIsIl9lbFJlZiIsIl9tZW51TGlzdENvbnRleHQiLCJjaGlsZHJlbiIsIkNvbXBvbmVudCIsIlByb3BUeXBlcyIsImZ1bmMiLCJub2RlIiwiTWVudUxpc3RJbnNwZWN0b3JDb250ZXh0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBOztBQUVBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUVBOztBQUNBOztBQUVBOzs7Ozs7QUF1Q08sSUFBTUEsZUFBZSxnQkFBR0Msa0JBQU1DLGFBQU4sQ0FBMkMsSUFBM0MsQ0FBeEI7Ozs7SUFTY0MsUTs7Ozs7Ozs7Ozs7Ozs7O2lHQVFSLCtCO21HQUlOLEU7Ozs7NEdBT0lGLGtCQUFNRyxTQUFOLEU7eUdBVWdDO0FBQ3ZDQyxNQUFBQSxZQUFZLEVBQUUsc0JBQUNDLEtBQUQsRUFBUUMsT0FBUixFQUFpQkMsRUFBakIsRUFBd0I7QUFDcEMsWUFBTUMsSUFBSSxHQUFHO0FBQUNILFVBQUFBLEtBQUssRUFBTEEsS0FBRDtBQUFRQyxVQUFBQSxPQUFPLEVBQVBBLE9BQVI7QUFBaUJDLFVBQUFBLEVBQUUsRUFBRkE7QUFBakIsU0FBYjs7QUFFQSxZQUFNRSxRQUFRLEdBQUcsU0FBWEEsUUFBVyxHQUFNO0FBQ3JCLGNBQUlDLENBQUMsR0FBRyxDQUFDLENBQVQ7O0FB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IEBmbG93ICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgdHlwZSB7Tm9kZSBhcyBSZWFjdE5vZGV9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgS2VmaXIgZnJvbSAna2VmaXInO1xuaW1wb3J0IGtlZmlyU3RvcHBlciBmcm9tICdrZWZpci1zdG9wcGVyJztcbmltcG9ydCBmaW5kSW5kZXggZnJvbSAnYXJyYXktZmluZC1pbmRleCc7XG5pbXBvcnQgZnJvbUV2ZW50c0NhcHR1cmUgZnJvbSAnLi9saWIvZnJvbUV2ZW50c0NhcHR1cmUnO1xuXG5pbXBvcnQgTWVudUV2ZW50IGZyb20gJy4vZXZlbnRzL01lbnVFdmVudCc7XG5pbXBvcnQgQ2hvc2VuRXZlbnQgZnJvbSAnLi9ldmVudHMvQ2hvc2VuRXZlbnQnO1xuaW1wb3J0IHR5cGUge1Byb3BzIGFzIE1lbnVJdGVtUHJvcHN9IGZyb20gJy4vTWVudUl0ZW0nO1xuaW1wb3J0IHtNZW51TGlzdEluc3BlY3RvckNvbnRleHR9IGZyb20gJy4vTWVudUxpc3RJbnNwZWN0b3InO1xuaW1wb3J0IHR5cGUge01lbnVMaXN0SW5zcGVjdG9yQ29udGV4dFZhbHVlfSBmcm9tICcuL01lbnVMaXN0SW5zcGVjdG9yJztcbmltcG9ydCB0eXBlIHtEaXJlY3Rpb24sIFJlY3R9IGZyb20gJy4vdHlwZXMnO1xuXG4vLyBUaGlzIHR5cGUgb2Ygb2JqZWN0IGlzIGdpdmVuIHRvIGEgTWVudUl0ZW0gdG8gdGFsayB0byB0aGUgTWVudUxpc3QuXG5leHBvcnQgdHlwZSBNZW51TGlzdEhhbmRsZSA9IHtcbiAgaGlnaGxpZ2h0KGJ5S2V5Ym9hcmQ6IGJvb2xlYW4pOiB2b2lkLFxuICB1bmhpZ2hsaWdodCgpOiB2b2lkLFxuICBtb3ZlQ3Vyc29yKGRpcmVjdGlvbjogRGlyZWN0aW9uLCBwcmV2Q3Vyc29yTG9jYXRpb246ID9SZWN0KTogdm9pZCxcbiAgaXRlbUNob3NlbigpOiB2b2lkLFxuICB0YWtlS2V5Ym9hcmQoKTogdm9pZCxcbiAgcmVsZWFzZUtleWJvYXJkKCk6IHZvaWQsXG4gIGxvY2tIaWdobGlnaHQoKTogdm9pZCxcbiAgdW5sb2NrSGlnaGxpZ2h0KCk6IHZvaWQsXG4gIHVwZGF0ZVByb3BzKHByb3BzOiBNZW51SXRlbVByb3BzKTogdm9pZCxcbiAgdW5yZWdpc3RlcigpOiB2b2lkLFxufTtcblxuLy8gVGhpcyB0eXBlIG9mIG9iamVjdCBpcyBnaXZlbiB0byBhIE1lbnVMaXN0IHRvIHRhbGsgdG8gYSBNZW51SXRlbS5cbmV4cG9ydCB0eXBlIE1lbnVJdGVtQ29udHJvbCA9IHtcbiAgbm90aWZ5SGlnaGxpZ2h0ZWQoXG4gICAgaGlnaGxpZ2h0ZWQ6IGJvb2xlYW4sXG4gICAgYnlLZXlib2FyZDogP2Jvb2xlYW4sXG4gICAgZGlyZWN0aW9uOiA/RGlyZWN0aW9uLFxuICAgIHByZXZDdXJzb3JMb2NhdGlvbjogP1JlY3RcbiAgKTogdm9pZCxcbiAgbm90aWZ5RXZlbnQoZXZlbnQ6IE1lbnVFdmVudCk6IHZvaWQsXG59O1xuXG4vLyBUaGlzIGlzIHRoZSB0eXBlIG9mIHRoZSBvYmplY3QgdGhhdCBNZW51TGlzdCBnaXZlcyBhcyBjb250ZXh0IHRvIGl0c1xuLy8gZGVzY2VuZGFudHMuXG5leHBvcnQgdHlwZSBNZW51TGlzdENvbnRleHRWYWx1ZSA9IHtcbiAgcmVnaXN0ZXJJdGVtKFxuICAgIHByb3BzOiBNZW51SXRlbVByb3BzLFxuICAgIGNvbnRyb2w6IE1lbnVJdGVtQ29udHJvbCxcbiAgICBlbDogSFRNTEVsZW1lbnRcbiAgKTogTWVudUxpc3RIYW5kbGUsXG59O1xuXG5leHBvcnQgY29uc3QgTWVudUxpc3RDb250ZXh0ID0gUmVhY3QuY3JlYXRlQ29udGV4dDw/TWVudUxpc3RDb250ZXh0VmFsdWU+KG51bGwpO1xuXG5leHBvcnQgdHlwZSBQcm9wcyA9IHtcbiAgb25JdGVtQ2hvc2VuPzogKGV2ZW50OiBDaG9zZW5FdmVudCkgPT4gdm9pZCxcbiAgb25MZWZ0UHVzaGVkPzogKGV2ZW50OiBNZW51RXZlbnQpID0+IHZvaWQsXG4gIG9uUmlnaHRQdXNoZWQ/OiAoZXZlbnQ6IE1lbnVFdmVudCkgPT4gdm9pZCxcbiAgY2hpbGRyZW4/OiBSZWFjdE5vZGUsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNZW51TGlzdCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDxQcm9wcz4ge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIG9uSXRlbUNob3NlbjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25MZWZ0UHVzaGVkOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvblJpZ2h0UHVzaGVkOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBjaGlsZHJlbjogUHJvcFR5cGVzLm5vZGUsXG4gIH07XG5cbiAgX3N0b3BwZXIgPSBrZWZpclN0b3BwZXIoKTtcbiAgX2xpc3RJdGVtczogQXJyYXk8e1xuICAgIHByb3BzOiBNZW51SXRlbVByb3BzLFxuICAgIGNvbnRyb2w6IE1lbnVJdGVtQ29udHJvbCxcbiAgfT4gPSBbXTtcblxuICAvLyBUaGUgbmF0dXJhbCBoaWdobGlnaHQgaXMgd2hlcmUgdGhlIGhpZ2hsaWdodCB3b3VsZCBiZSBpZiBubyBsb2NrIGlzIGFjdGl2ZS5cbiAgX25hdHVyYWxIaWdobGlnaHRlZEluZGV4OiA/bnVtYmVyO1xuICBfbG9ja2VkSGlnaGxpZ2h0ZWRJbmRleDogP251bWJlcjtcbiAgX2tleWJvYXJkVGFrZW5CeUluZGV4OiA/bnVtYmVyO1xuXG4gIF9lbFJlZiA9IFJlYWN0LmNyZWF0ZVJlZjxIVE1MRGl2RWxlbWVudD4oKTtcblxuICBfZ2V0VmlzaWJsZUhpZ2hsaWdodGVkSW5kZXgoKTogP251bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX2xvY2tlZEhpZ2hsaWdodGVkSW5kZXggIT0gbnVsbFxuICAgICAgPyB0aGlzLl9sb2NrZWRIaWdobGlnaHRlZEluZGV4XG4gICAgICA6IHRoaXMuX25hdHVyYWxIaWdobGlnaHRlZEluZGV4O1xuICB9XG5cbiAgc3RhdGljIGNvbnRleHRUeXBlID0gTWVudUxpc3RJbnNwZWN0b3JDb250ZXh0O1xuXG4gIF9tZW51TGlzdENvbnRleHQ6IE1lbnVMaXN0Q29udGV4dFZhbHVlID0ge1xuICAgIHJlZ2lzdGVySXRlbTogKHByb3BzLCBjb250cm9sLCBlbCkgPT4ge1xuICAgICAgY29uc3QgaXRlbSA9IHtwcm9wcywgY29udHJvbCwgZWx9O1xuXG4gICAgICBjb25zdCByZWdpc3RlciA9ICgpID0+IHtcbiAgICAgICAgbGV0IGkgPSAtMTtcbiAgICAgICAgaWYgKGl0ZW0ucHJvcHMuaW5kZXggPT0gbnVsbCkge1xuICAgICAgICAgIGkgPSBmaW5kSW5kZXgoXG4gICAgICAgICAgICB0aGlzLl9saXN0SXRlbXMsXG4gICAgICAgICAgICBfaXRlbSA9PlxuICAgICAgICAgICAgICAoaXRlbS5lbC5jb21wYXJlRG9jdW1lbnRQb3NpdGlvbihfaXRlbS5lbCkgJlxuICAgICAgICAgICAgICAgIE5vZGUuRE9DVU1FTlRfUE9TSVRJT05fUFJFQ0VESU5HKSA9PT1cbiAgICAgICAgICAgICAgMFxuICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaSA9IGZpbmRJbmRleChcbiAgICAgICAgICAgIHRoaXMuX2xpc3RJdGVtcyxcbiAgICAgICAgICAgIF9pdGVtID0+XG4gICAgICAgICAgICAgIF9pdGVtLnByb3BzLmluZGV4ICE9IG51bGwgJiYgaXRlbS5wcm9wcy5pbmRleCA8IF9pdGVtLnByb3BzLmluZGV4XG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaSA8IDApIHtcbiAgICAgICAgICB0aGlzLl9saXN0SXRlbXMucHVzaChpdGVtKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLl9saXN0SXRlbXMuc3BsaWNlKGksIDAsIGl0ZW0pO1xuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIHRoaXMuX25hdHVyYWxIaWdobGlnaHRlZEluZGV4ICE9IG51bGwgJiZcbiAgICAgICAgICAgIGkgPD0gdGhpcy5fbmF0dXJhbEhpZ2hsaWdodGVkSW5kZXhcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHRoaXMuX25hdHVyYWxIaWdobGlnaHRlZEluZGV4Kys7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIHRoaXMuX2xvY2tlZEhpZ2hsaWdodGVkSW5kZXggIT0gbnVsbCAmJlxuICAgICAgICAgICAgaSA8PSB0aGlzLl9sb2NrZWRIaWdobGlnaHRlZEluZGV4XG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICB0aGlzLl9sb2NrZWRIaWdobGlnaHRlZEluZGV4Kys7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIHRoaXMuX2tleWJvYXJkVGFrZW5CeUluZGV4ICE9IG51bGwgJiZcbiAgICAgICAgICAgIGkgPD0gdGhpcy5fa2V5Ym9hcmRUYWtlbkJ5SW5kZXhcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHRoaXMuX2tleWJvYXJkVGFrZW5CeUluZGV4Kys7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICByZWdpc3RlcigpO1xuXG4gICAgICBjb25zdCBtZW51TGlzdEhhbmRsZTogTWVudUxpc3RIYW5kbGUgPSB7XG4gICAgICAgIGhpZ2hsaWdodDogKGJ5S2V5Ym9hcmQ6IGJvb2xlYW4pID0+IHtcbiAgICAgICAgICBjb25zdCBpID0gdGhpcy5fbGlzdEl0ZW1zLmluZGV4T2YoaXRlbSk7XG4gICAgICAgICAgaWYgKGkgPCAwKSB0aHJvdyBuZXcgRXJyb3IoJ0FscmVhZHkgdW5yZWdpc3RlcmVkIE1lbnVJdGVtJyk7XG4gICAgICAgICAgdGhpcy5fbmF0dXJhbEhpZ2hsaWdodChpLCBieUtleWJvYXJkKTtcbiAgICAgICAgfSxcbiAgICAgICAgdW5oaWdobGlnaHQ6ICgpID0+IHtcbiAgICAgICAgICBjb25zdCBpID0gdGhpcy5fbGlzdEl0ZW1zLmluZGV4T2YoaXRlbSk7XG4gICAgICAgICAgaWYgKGkgPCAwKSB0aHJvdyBuZXcgRXJyb3IoJ0FscmVhZHkgdW5yZWdpc3RlcmVkIE1lbnVJdGVtJyk7XG4gICAgICAgICAgaWYgKHRoaXMuX25hdHVyYWxIaWdobGlnaHRlZEluZGV4ID09PSBpKSB7XG4gICAgICAgICAgICB0aGlzLl9uYXR1cmFsSGlnaGxpZ2h0KG51bGwsIGZhbHNlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGl0ZW1DaG9zZW46ICgpID0+IHtcbiAgICAgICAgICB0aGlzLl9kaXNwYXRjaEV2ZW50KGNvbnRyb2wsIG5ldyBDaG9zZW5FdmVudCgnY2hvc2VuJywgZmFsc2UpKTtcbiAgICAgICAgfSxcbiAgICAgICAgdGFrZUtleWJvYXJkOiAoKSA9PiB7XG4gICAgICAgICAgY29uc3QgaSA9IHRoaXMuX2xpc3RJdGVtcy5pbmRleE9mKGl0ZW0pO1xuICAgICAgICAgIGlmIChpIDwgMCkgdGhyb3cgbmV3IEVycm9yKCdBbHJlYWR5IHVucmVnaXN0ZXJlZCBNZW51SXRlbScpO1xuICAgICAgICAgIHRoaXMuX2tleWJvYXJkVGFrZW5CeUluZGV4ID0gaTtcbiAgICAgICAgfSxcbiAgICAgICAgcmVsZWFzZUtleWJvYXJkOiAoKSA9PiB7XG4gICAgICAgICAgY29uc3QgaSA9IHRoaXMuX2xpc3RJdGVtcy5pbmRleE9mKGl0ZW0pO1xuICAgICAgICAgIGlmIChpIDwgMCkgdGhyb3cgbmV3IEVycm9yKCdBbHJlYWR5IHVucmVnaXN0ZXJlZCBNZW51SXRlbScpO1xuICAgICAgICAgIGlmICh0aGlzLl9rZXlib2FyZFRha2VuQnlJbmRleCA9PT0gaSkge1xuICAgICAgICAgICAgdGhpcy5fa2V5Ym9hcmRUYWtlbkJ5SW5kZXggPSBudWxsO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgbG9ja0hpZ2hsaWdodDogKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IGkgPSB0aGlzLl9saXN0SXRlbXMuaW5kZXhPZihpdGVtKTtcbiAgICAgICAgICBpZiAoaSA8IDApIHRocm93IG5ldyBFcnJvcignQWxyZWFkeSB1bnJlZ2lzdGVyZWQgTWVudUl0ZW0nKTtcbiAgICAgICAgICB0aGlzLl9sb2NrSGlnaGxpZ2h0KGkpO1xuICAgICAgICB9LFxuICAgICAgICB1bmxvY2tIaWdobGlnaHQ6ICgpID0+IHtcbiAgICAgICAgICBjb25zdCBpID0gdGhpcy5fbGlzdEl0ZW1zLmluZGV4T2YoaXRlbSk7XG4gICAgICAgICAgaWYgKGkgPCAwKSB0aHJvdyBuZXcgRXJyb3IoJ0FscmVhZHkgdW5yZWdpc3RlcmVkIE1lbnVJdGVtJyk7XG4gICAgICAgICAgaWYgKHRoaXMuX2xvY2tlZEhpZ2hsaWdodGVkSW5kZXggPT09IGkpIHtcbiAgICAgICAgICAgIHRoaXMuX2xvY2tIaWdobGlnaHQobnVsbCk7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBtb3ZlQ3Vyc29yOiAoZGlyZWN0aW9uOiBEaXJlY3Rpb24sIHByZXZDdXJzb3JMb2NhdGlvbjogP1JlY3QpID0+IHtcbiAgICAgICAgICB0aGlzLm1vdmVDdXJzb3IoZGlyZWN0aW9uLCBwcmV2Q3Vyc29yTG9jYXRpb24pO1xuICAgICAgICB9LFxuICAgICAgICB1cGRhdGVQcm9wczogKG5ld1Byb3BzOiBNZW51SXRlbVByb3BzKSA9PiB7XG4gICAgICAgICAgaWYgKGl0ZW0ucHJvcHMuaW5kZXggIT09IG5ld1Byb3BzLmluZGV4KSB7XG4gICAgICAgICAgICBjb25zdCBvbGRJbmRleCA9IHRoaXMuX2xpc3RJdGVtcy5pbmRleE9mKGl0ZW0pO1xuICAgICAgICAgICAgY29uc3QgaXNOYXR1cmFsSGlnaGxpZ2h0SW5kZXggPVxuICAgICAgICAgICAgICB0aGlzLl9uYXR1cmFsSGlnaGxpZ2h0ZWRJbmRleCA9PT0gb2xkSW5kZXg7XG4gICAgICAgICAgICBjb25zdCBpc0xvY2tlZEhpZ2hsaWdodEluZGV4ID1cbiAgICAgICAgICAgICAgdGhpcy5fbG9ja2VkSGlnaGxpZ2h0ZWRJbmRleCA9PT0gb2xkSW5kZXg7XG4gICAgICAgICAgICBjb25zdCBpc0tleWJvYXJkVGFrZW5CeUluZGV4ID1cbiAgICAgICAgICAgICAgdGhpcy5fa2V5Ym9hcmRUYWtlbkJ5SW5kZXggPT09IG9sZEluZGV4O1xuXG4gICAgICAgICAgICBtZW51TGlzdEhhbmRsZS51bnJlZ2lzdGVyKCk7XG4gICAgICAgICAgICBwcm9wcyA9IG5ld1Byb3BzO1xuICAgICAgICAgICAgaXRlbS5wcm9wcyA9IG5ld1Byb3BzO1xuICAgICAgICAgICAgcmVnaXN0ZXIoKTtcblxuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICBpc05hdHVyYWxIaWdobGlnaHRJbmRleCB8fFxuICAgICAgICAgICAgICBpc0xvY2tlZEhpZ2hsaWdodEluZGV4IHx8XG4gICAgICAgICAgICAgIGlzS2V5Ym9hcmRUYWtlbkJ5SW5kZXhcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICBjb25zdCBuZXdJbmRleCA9IHRoaXMuX2xpc3RJdGVtcy5pbmRleE9mKGl0ZW0pO1xuICAgICAgICAgICAgICBpZiAoaXNOYXR1cmFsSGlnaGxpZ2h0SW5kZXgpXG4gICAgICAgICAgICAgICAgdGhpcy5fbmF0dXJhbEhpZ2hsaWdodGVkSW5kZXggPSBuZXdJbmRleDtcbiAgICAgICAgICAgICAgaWYgKGlzTG9ja2VkSGlnaGxpZ2h0SW5kZXgpXG4gICAgICAgICAgICAgICAgdGhpcy5fbG9ja2VkSGlnaGxpZ2h0ZWRJbmRleCA9IG5ld0luZGV4O1xuICAgICAgICAgICAgICBpZiAoaXNLZXlib2FyZFRha2VuQnlJbmRleCkgdGhpcy5fa2V5Ym9hcmRUYWtlbkJ5SW5kZXggPSBuZXdJbmRleDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcHJvcHMgPSBuZXdQcm9wcztcbiAgICAgICAgICAgIGl0ZW0ucHJvcHMgPSBuZXdQcm9wcztcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHVucmVnaXN0ZXI6ICgpID0+IHtcbiAgICAgICAgICBjb25zdCBpID0gdGhpcy5fbGlzdEl0ZW1zLmluZGV4T2YoaXRlbSk7XG4gICAgICAgICAgaWYgKGkgPCAwKSB0aHJvdyBuZXcgRXJyb3IoJ0FscmVhZHkgdW5yZWdpc3RlcmVkIE1lbnVJdGVtJyk7XG4gICAgICAgICAgaWYgKGkgPT09IHRoaXMuX25hdHVyYWxIaWdobGlnaHRlZEluZGV4KSB7XG4gICAgICAgICAgICB0aGlzLl9uYXR1cmFsSGlnaGxpZ2h0ZWRJbmRleCA9IG51bGw7XG4gICAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICAgIHRoaXMuX25hdHVyYWxIaWdobGlnaHRlZEluZGV4ICE9IG51bGwgJiZcbiAgICAgICAgICAgIGkgPCB0aGlzLl9uYXR1cmFsSGlnaGxpZ2h0ZWRJbmRleFxuICAgICAgICAgICkge1xuICAgICAgICAgICAgdGhpcy5fbmF0dXJhbEhpZ2hsaWdodGVkSW5kZXgtLTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGkgPT09IHRoaXMuX2xvY2tlZEhpZ2hsaWdodGVkSW5kZXgpIHtcbiAgICAgICAgICAgIHRoaXMuX2xvY2tlZEhpZ2hsaWdodGVkSW5kZXggPSBudWxsO1xuICAgICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgICB0aGlzLl9sb2NrZWRIaWdobGlnaHRlZEluZGV4ICE9IG51bGwgJiZcbiAgICAgICAgICAgIGkgPCB0aGlzLl9sb2NrZWRIaWdobGlnaHRlZEluZGV4XG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICB0aGlzLl9sb2NrZWRIaWdobGlnaHRlZEluZGV4LS07XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChpID09PSB0aGlzLl9rZXlib2FyZFRha2VuQnlJbmRleCkge1xuICAgICAgICAgICAgdGhpcy5fa2V5Ym9hcmRUYWtlbkJ5SW5kZXggPSBudWxsO1xuICAgICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgICB0aGlzLl9rZXlib2FyZFRha2VuQnlJbmRleCAhPSBudWxsICYmXG4gICAgICAgICAgICBpIDwgdGhpcy5fa2V5Ym9hcmRUYWtlbkJ5SW5kZXhcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHRoaXMuX2tleWJvYXJkVGFrZW5CeUluZGV4LS07XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuX2xpc3RJdGVtcy5zcGxpY2UoaSwgMSk7XG4gICAgICAgIH0sXG4gICAgICB9O1xuICAgICAgcmV0dXJuIG1lbnVMaXN0SGFuZGxlO1xuICAgIH0sXG4gIH07XG5cbiAgX3BhcmVudEN0eCgpOiA/TWVudUxpc3RJbnNwZWN0b3JDb250ZXh0VmFsdWUge1xuICAgIHJldHVybiB0aGlzLmNvbnRleHQ7XG4gIH1cblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAvLyBjb25zdCBpc0VudGVyT3JTcGFjZU9yQXJyb3dLZXkgPSBlID0+XG4gICAgLy8gICBlLndoaWNoID09PSAxMyB8fCBlLndoaWNoID09PSAzMiB8fCAoMzcgPD0gZS53aGljaCAmJiBlLndoaWNoIDw9IDQwKTtcbiAgICAvL1xuICAgIC8vIGNvbnN0IGVsID0gdGhpcy5fZWxSZWYuY3VycmVudDtcbiAgICAvKjo6IGlmICghZWwpIHRocm93IG5ldyBFcnJvcigpOyAqL1xuXG4gICAgLy8gVGhlIG9ubHkgdGhpbmdzIHRoYXQgc2hvdWxkIHJlY2VpdmUga2V5ZG93bi9rZXlwcmVzcyBldmVudHMgYmVmb3JlIHVzXG4gICAgLy8gYXJlIG91ciBjaGlsZHJlbi4gVGhpcyBhbGxvd3MgYSBNZW51SXRlbSB0byBjb250YWluIGEgdGV4dCBpbnB1dFxuICAgIC8vIHdoaWNoIHNlbGVjdGl2ZWx5IHN0b3BzIHByb3BhZ2F0aW9uIG9uIGtleSBldmVudHMgZm9yIGV4YW1wbGUuXG4gICAgS2VmaXIubWVyZ2UoW1xuICAgICAgLy8gS2VmaXIuZnJvbUV2ZW50cyh3aW5kb3csICdrZXlkb3duJylcbiAgICAgIC8vICAgLmZpbHRlcihpc0VudGVyT3JTcGFjZU9yQXJyb3dLZXkpXG4gICAgICAvLyAgIC5maWx0ZXIoZSA9PiBlbC5jb250YWlucyhlLnRhcmdldCkpLFxuICAgICAgZnJvbUV2ZW50c0NhcHR1cmUod2luZG93LCAna2V5ZG93bicpLFxuICAgICAgLy8gLmZpbHRlcihpc0VudGVyT3JTcGFjZU9yQXJyb3dLZXkpXG4gICAgICAvLyAuZmlsdGVyKGUgPT4gIWVsLmNvbnRhaW5zKGUudGFyZ2V0KSksXG4gICAgXSlcbiAgICAgIC50YWtlVW50aWxCeSh0aGlzLl9zdG9wcGVyKVxuICAgICAgLm9uVmFsdWUoZXZlbnQgPT4gdGhpcy5fa2V5KGV2ZW50KSk7XG5cbiAgICBjb25zdCBwYXJlbnRDdHggPSB0aGlzLl9wYXJlbnRDdHgoKTtcbiAgICBpZiAocGFyZW50Q3R4KSB7XG4gICAgICBwYXJlbnRDdHgucmVnaXN0ZXJNZW51TGlzdCh0aGlzKTtcbiAgICB9XG4gIH1cblxuICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICB0aGlzLl9zdG9wcGVyLmRlc3Ryb3koKTtcblxuICAgIGNvbnN0IHBhcmVudEN0eCA9IHRoaXMuX3BhcmVudEN0eCgpO1xuICAgIGlmIChwYXJlbnRDdHgpIHtcbiAgICAgIHBhcmVudEN0eC51bnJlZ2lzdGVyTWVudUxpc3QodGhpcyk7XG4gICAgfVxuICB9XG5cbiAgX25hdHVyYWxIaWdobGlnaHQoXG4gICAgaW5kZXg6ID9udW1iZXIsXG4gICAgYnlLZXlib2FyZDogYm9vbGVhbixcbiAgICBkaXJlY3Rpb246ID9EaXJlY3Rpb24sXG4gICAgcHJldkN1cnNvckxvY2F0aW9uOiA/UmVjdFxuICApIHtcbiAgICBjb25zdCB2aXNpYmxlSGlnaGxpZ2h0ZWRJbmRleCA9IHRoaXMuX2dldFZpc2libGVIaWdobGlnaHRlZEluZGV4KCk7XG5cbiAgICBpZiAodGhpcy5fbG9ja2VkSGlnaGxpZ2h0ZWRJbmRleCAhPSBudWxsICYmIGJ5S2V5Ym9hcmQpIHtcbiAgICAgIHRoaXMuX2xvY2tlZEhpZ2hsaWdodGVkSW5kZXggPSBudWxsO1xuICAgIH1cbiAgICB0aGlzLl9uYXR1cmFsSGlnaGxpZ2h0ZWRJbmRleCA9IGluZGV4O1xuICAgIGlmICh0aGlzLl9sb2NrZWRIaWdobGlnaHRlZEluZGV4ID09IG51bGwpIHtcbiAgICAgIGlmIChpbmRleCAhPSBudWxsKSB7XG4gICAgICAgIHRoaXMuX2xpc3RJdGVtc1tpbmRleF0uY29udHJvbC5ub3RpZnlIaWdobGlnaHRlZChcbiAgICAgICAgICB0cnVlLFxuICAgICAgICAgIGJ5S2V5Ym9hcmQsXG4gICAgICAgICAgZGlyZWN0aW9uLFxuICAgICAgICAgIHByZXZDdXJzb3JMb2NhdGlvblxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgaWYgKHZpc2libGVIaWdobGlnaHRlZEluZGV4ICE9IG51bGwgJiYgdmlzaWJsZUhpZ2hsaWdodGVkSW5kZXggIT0gaW5kZXgpIHtcbiAgICAgICAgdGhpcy5fbGlzdEl0ZW1zW3Zpc2libGVIaWdobGlnaHRlZEluZGV4XS5jb250cm9sLm5vdGlmeUhpZ2hsaWdodGVkKFxuICAgICAgICAgIGZhbHNlXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgX2xvY2tIaWdobGlnaHQoaW5kZXg6ID9udW1iZXIpIHtcbiAgICBpZiAoaW5kZXggPT09IHRoaXMuX2xvY2tlZEhpZ2hsaWdodGVkSW5kZXgpIHJldHVybjtcbiAgICBjb25zdCB2aXNpYmxlSGlnaGxpZ2h0ZWRJbmRleCA9IHRoaXMuX2dldFZpc2libGVIaWdobGlnaHRlZEluZGV4KCk7XG4gICAgdGhpcy5fbG9ja2VkSGlnaGxpZ2h0ZWRJbmRleCA9IGluZGV4O1xuICAgIGNvbnN0IG5ld1Zpc2libGVIaWdobGlnaHRlZEluZGV4ID0gdGhpcy5fZ2V0VmlzaWJsZUhpZ2hsaWdodGVkSW5kZXgoKTtcbiAgICBpZiAodmlzaWJsZUhpZ2hsaWdodGVkSW5kZXggIT0gbnVsbCAmJiBuZXdWaXNpYmxlSGlnaGxpZ2h0ZWRJbmRleCA9PSBudWxsKSB7XG4gICAgICAvLyBXaGVuIHVubG9ja2luZywgcHJlZmVyIHRvIGtlZXAgdGhlIGN1cnJlbnQgc2VsZWN0aW9uIG92ZXIgZGUtc2VsZWN0aW5nXG4gICAgICAvLyBldmVyeXRoaW5nLlxuICAgICAgdGhpcy5fbmF0dXJhbEhpZ2hsaWdodGVkSW5kZXggPSB2aXNpYmxlSGlnaGxpZ2h0ZWRJbmRleDtcbiAgICB9IGVsc2UgaWYgKHZpc2libGVIaWdobGlnaHRlZEluZGV4ICE9IG5ld1Zpc2libGVIaWdobGlnaHRlZEluZGV4KSB7XG4gICAgICBpZiAodmlzaWJsZUhpZ2hsaWdodGVkSW5kZXggIT0gbnVsbCkge1xuICAgICAgICB0aGlzLl9saXN0SXRlbXNbdmlzaWJsZUhpZ2hsaWdodGVkSW5kZXhdLmNvbnRyb2wubm90aWZ5SGlnaGxpZ2h0ZWQoXG4gICAgICAgICAgZmFsc2VcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIGlmIChuZXdWaXNpYmxlSGlnaGxpZ2h0ZWRJbmRleCAhPSBudWxsKSB7XG4gICAgICAgIHRoaXMuX2xpc3RJdGVtc1tuZXdWaXNpYmxlSGlnaGxpZ2h0ZWRJbmRleF0uY29udHJvbC5ub3RpZnlIaWdobGlnaHRlZChcbiAgICAgICAgICB0cnVlLFxuICAgICAgICAgIGZhbHNlXG4gICAgICAgICk7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuX25hdHVyYWxIaWdobGlnaHRlZEluZGV4ICE9IG51bGwpIHtcbiAgICAgICAgdGhpcy5fbGlzdEl0ZW1zW1xuICAgICAgICAgIHRoaXMuX25hdHVyYWxIaWdobGlnaHRlZEluZGV4XG4gICAgICAgIF0uY29udHJvbC5ub3RpZnlIaWdobGlnaHRlZCh0cnVlLCBmYWxzZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgX2Rpc3BhdGNoRXZlbnQoY29udHJvbDogP01lbnVJdGVtQ29udHJvbCwgZXZlbnQ6IE1lbnVFdmVudCkge1xuICAgIGlmIChjb250cm9sKSB7XG4gICAgICBjb250cm9sLm5vdGlmeUV2ZW50KGV2ZW50KTtcbiAgICAgIGlmIChldmVudC5jYW5jZWxCdWJibGUpIHJldHVybjtcbiAgICB9XG4gICAgc3dpdGNoIChldmVudC50eXBlKSB7XG4gICAgICBjYXNlICdjaG9zZW4nOlxuICAgICAgICAvKjo6IGlmICghKGV2ZW50IGluc3RhbmNlb2YgQ2hvc2VuRXZlbnQpKSB0aHJvdyBuZXcgRXJyb3IoKTsgKi9cbiAgICAgICAgaWYgKHRoaXMucHJvcHMub25JdGVtQ2hvc2VuKSB0aGlzLnByb3BzLm9uSXRlbUNob3NlbihldmVudCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgLy8gY2FzZSAndXAnOlxuICAgICAgLy8gICBicmVhaztcbiAgICAgIC8vIGNhc2UgJ2Rvd24nOlxuICAgICAgLy8gICBicmVhaztcbiAgICAgIGNhc2UgJ2xlZnQnOlxuICAgICAgICBpZiAodGhpcy5wcm9wcy5vbkxlZnRQdXNoZWQpIHRoaXMucHJvcHMub25MZWZ0UHVzaGVkKGV2ZW50KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdyaWdodCc6XG4gICAgICAgIGlmICh0aGlzLnByb3BzLm9uUmlnaHRQdXNoZWQpIHRoaXMucHJvcHMub25SaWdodFB1c2hlZChldmVudCk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBpZiAoZXZlbnQuY2FuY2VsQnViYmxlKSByZXR1cm47XG4gICAgY29uc3QgcGFyZW50Q3R4ID0gdGhpcy5fcGFyZW50Q3R4KCk7XG4gICAgaWYgKHBhcmVudEN0eCkge1xuICAgICAgcGFyZW50Q3R4LmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuICAgIH1cbiAgfVxuXG4gIF9rZXkoZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgaWYgKHRoaXMuX2tleWJvYXJkVGFrZW5CeUluZGV4ICE9IG51bGwgfHwgdGhpcy5fbGlzdEl0ZW1zLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHZpc2libGVIaWdobGlnaHRlZEluZGV4ID0gdGhpcy5fZ2V0VmlzaWJsZUhpZ2hsaWdodGVkSW5kZXgoKTtcblxuICAgIC8vIGVudGVyLCBsZWZ0LCByaWdodCBhY3RpdmF0ZSBmb3IgdGhlIGN1cnJlbnQgdmlzaWJseSBzZWxlY3RlZCBpdGVtLlxuICAgIC8vIHVwIGFuZCBkb3duIGRlLWFjdGl2YXRlIGFueSBsb2NrcyBpbiBwbGFjZSwgc28gdGhhdCB0aGV5IGFjdCBmcm9tIHRoZSBsYXN0XG4gICAgLy8gbmF0dXJhbGx5LXNlbGVjdGVkIGl0ZW0uXG5cbiAgICBsZXQgbUV2ZW50ID0gbnVsbDtcblxuICAgIHN3aXRjaCAoZXZlbnQud2hpY2gpIHtcbiAgICAgIGNhc2UgMTM6IC8vZW50ZXJcbiAgICAgIGNhc2UgMzI6IC8vc3BhY2VcbiAgICAgICAgaWYgKHZpc2libGVIaWdobGlnaHRlZEluZGV4ICE9IG51bGwpIHtcbiAgICAgICAgICBtRXZlbnQgPSBuZXcgQ2hvc2VuRXZlbnQoJ2Nob3NlbicsIHRydWUpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAzNzogLy9sZWZ0XG4gICAgICAgIGlmICh2aXNpYmxlSGlnaGxpZ2h0ZWRJbmRleCAhPSBudWxsKSB7XG4gICAgICAgICAgbUV2ZW50ID0gbmV3IE1lbnVFdmVudCgnbGVmdCcpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAzOTogLy9yaWdodFxuICAgICAgICBpZiAodmlzaWJsZUhpZ2hsaWdodGVkSW5kZXggIT0gbnVsbCkge1xuICAgICAgICAgIG1FdmVudCA9IG5ldyBNZW51RXZlbnQoJ3JpZ2h0Jyk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDM4OiAvL3VwXG4gICAgICAgIHRoaXMubW92ZUN1cnNvcigndXAnKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDQwOiAvL2Rvd25cbiAgICAgICAgdGhpcy5tb3ZlQ3Vyc29yKCdkb3duJyk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGlmIChtRXZlbnQpIHtcbiAgICAgIGNvbnN0IGNvbnRyb2wgPVxuICAgICAgICB2aXNpYmxlSGlnaGxpZ2h0ZWRJbmRleCA9PSBudWxsXG4gICAgICAgICAgPyBudWxsXG4gICAgICAgICAgOiB0aGlzLl9saXN0SXRlbXNbdmlzaWJsZUhpZ2hsaWdodGVkSW5kZXhdLmNvbnRyb2w7XG4gICAgICB0aGlzLl9kaXNwYXRjaEV2ZW50KGNvbnRyb2wsIG1FdmVudCk7XG4gICAgICBpZiAobUV2ZW50LmRlZmF1bHRQcmV2ZW50ZWQpIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBpZiAobUV2ZW50LmRlZmF1bHRQcmV2ZW50ZWQgfHwgbUV2ZW50LmNhbmNlbEJ1YmJsZSlcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfVxuICB9XG5cbiAgbW92ZUN1cnNvcihkaXJlY3Rpb246IERpcmVjdGlvbiwgcHJldkN1cnNvckxvY2F0aW9uOiA/UmVjdCkge1xuICAgIGlmICh0aGlzLl9saXN0SXRlbXMubGVuZ3RoID09IDApIHJldHVybjtcblxuICAgIHN3aXRjaCAoZGlyZWN0aW9uKSB7XG4gICAgICBjYXNlICd1cCc6XG4gICAgICAgIGlmIChcbiAgICAgICAgICB0aGlzLl9uYXR1cmFsSGlnaGxpZ2h0ZWRJbmRleCA9PSBudWxsIHx8XG4gICAgICAgICAgdGhpcy5fbmF0dXJhbEhpZ2hsaWdodGVkSW5kZXggPT0gMFxuICAgICAgICApIHtcbiAgICAgICAgICB0aGlzLl9uYXR1cmFsSGlnaGxpZ2h0KFxuICAgICAgICAgICAgdGhpcy5fbGlzdEl0ZW1zLmxlbmd0aCAtIDEsXG4gICAgICAgICAgICB0cnVlLFxuICAgICAgICAgICAgZGlyZWN0aW9uLFxuICAgICAgICAgICAgcHJldkN1cnNvckxvY2F0aW9uXG4gICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLl9uYXR1cmFsSGlnaGxpZ2h0KFxuICAgICAgICAgICAgdGhpcy5fbmF0dXJhbEhpZ2hsaWdodGVkSW5kZXggLSAxLFxuICAgICAgICAgICAgdHJ1ZSxcbiAgICAgICAgICAgIGRpcmVjdGlvbixcbiAgICAgICAgICAgIHByZXZDdXJzb3JMb2NhdGlvblxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdkb3duJzpcbiAgICAgICAgaWYgKFxuICAgICAgICAgIHRoaXMuX25hdHVyYWxIaWdobGlnaHRlZEluZGV4ID09IG51bGwgfHxcbiAgICAgICAgICB0aGlzLl9uYXR1cmFsSGlnaGxpZ2h0ZWRJbmRleCA9PSB0aGlzLl9saXN0SXRlbXMubGVuZ3RoIC0gMVxuICAgICAgICApIHtcbiAgICAgICAgICB0aGlzLl9uYXR1cmFsSGlnaGxpZ2h0KDAsIHRydWUsIGRpcmVjdGlvbiwgcHJldkN1cnNvckxvY2F0aW9uKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLl9uYXR1cmFsSGlnaGxpZ2h0KFxuICAgICAgICAgICAgdGhpcy5fbmF0dXJhbEhpZ2hsaWdodGVkSW5kZXggKyAxLFxuICAgICAgICAgICAgdHJ1ZSxcbiAgICAgICAgICAgIGRpcmVjdGlvbixcbiAgICAgICAgICAgIHByZXZDdXJzb3JMb2NhdGlvblxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgaGFzSGlnaGxpZ2h0KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9nZXRWaXNpYmxlSGlnaGxpZ2h0ZWRJbmRleCgpICE9IG51bGw7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgcm9sZT1cIm1lbnVcIiByZWY9e3RoaXMuX2VsUmVmfT5cbiAgICAgICAgPE1lbnVMaXN0Q29udGV4dC5Qcm92aWRlciB2YWx1ZT17dGhpcy5fbWVudUxpc3RDb250ZXh0fT5cbiAgICAgICAgICB7dGhpcy5wcm9wcy5jaGlsZHJlbn1cbiAgICAgICAgPC9NZW51TGlzdENvbnRleHQuUHJvdmlkZXI+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG4iXX0=