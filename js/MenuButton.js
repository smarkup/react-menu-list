"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var React = _interopRequireWildcard(require("react"));

var _kefir = _interopRequireDefault(require("kefir"));

var _kefirBus = _interopRequireDefault(require("kefir-bus"));

var _fromEventsCapture = _interopRequireDefault(require("./lib/fromEventsCapture"));

var _MenuListInspector = _interopRequireDefault(require("./MenuListInspector"));

var _reactPopper = require("react-popper");

var _Portal = _interopRequireDefault(require("./Portal"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var MenuButton = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(MenuButton, _React$Component);

  var _super = _createSuper(MenuButton);

  function MenuButton() {
    var _this;

    (0, _classCallCheck2["default"])(this, MenuButton);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "state", {
      opened: false,
      popperEl: undefined
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onClose", (0, _kefirBus["default"])());
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_bgRef", /*#__PURE__*/React.createRef());
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "open", function () {
      if (_this.state.opened) return Promise.resolve();
      if (_this.props.onWillOpen) _this.props.onWillOpen(); // Clicking outside of the dropdown or pressing escape should close the
      // dropdown.

      _kefir["default"].merge([_kefir["default"].merge([(0, _fromEventsCapture["default"])(window, 'mousedown'), (0, _fromEventsCapture["default"])(window, 'focus')]).filter(function (e) {
        if (!e.target) return true;
        if (e.target.nodeType !== 1) return true; // not an element

        if (e.target === _this._bgRef.current) {
          e.preventDefault(); // it messes with focus

          return true;
        }

        var popper = _this.state.popperEl;
        return !popper.contains(e.target);
      }), (0, _fromEventsCapture["default"])(window, 'keydown').filter(function (e) {
        if (e.key === 'Escape') {
          e.preventDefault();
          e.stopPropagation();
          return true;
        } else {
          return false;
        }
      }), _kefir["default"].fromEvents(window, 'blur')]).takeUntilBy(_this._onClose).onValue(function () {
        _this.close();
      });

      return new Promise(function (resolve) {
        _this.setState({
          opened: true
        }, function () {
          if (_this.props.onDidOpen) _this.props.onDidOpen();
          resolve();
        });
      });
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "close", function () {
      if (!_this.state.opened) return;
      _this._bgRef.current = undefined;

      _this._onClose.emit();

      if (_this.props.onWillClose) _this.props.onWillClose();

      _this.setState({
        opened: false,
        popperEl: undefined
      }, function () {
        if (_this.props.onDidClose) _this.props.onDidClose();
      });
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "toggle", function () {
      if (_this.state.opened) {
        _this.close();
      } else {
        _this.open();
      }
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "reposition", function () {// noop for now
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onContextMenu", function (e) {
      if (_this.props.disabled || _this.props.type !== 'context') return;
      e.preventDefault();
      e.stopPropagation();

      _this.toggle();
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onMouseDown", function (e) {
      if (_this.props.disabled || _this.props.type !== 'normal') return;

      if (e.button === 0) {
        e.preventDefault();
        e.stopPropagation();

        _this.toggle();
      }
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onKeyPress", function (e) {
      if (_this.props.disabled || _this.props.type !== 'normal') return;

      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();

        _this.toggle();
      }
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "setPopperEl", function (popperEl) {
      _this.setState({
        popperEl: popperEl
      });
    });
    return _this;
  }

  (0, _createClass2["default"])(MenuButton, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this._onClose.emit();
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          menu = _this$props.menu,
          positionOptions = _this$props.positionOptions,
          children = _this$props.children,
          renderButton = _this$props.renderButton,
          style = _this$props.style,
          menuZIndex = _this$props.menuZIndex;
      var opened = this.state.opened;
      var TriggerImpl = this.props.type === 'normal' ? TriggerNormal : TriggerContext;
      return /*#__PURE__*/React.createElement(TriggerImpl, {
        positionOptions: positionOptions,
        renderButton: renderButton,
        opened: opened,
        onKeyPress: this._onKeyPress,
        onMouseDown: this._onMouseDown,
        onContextMenu: this._onContextMenu,
        menu: /*#__PURE__*/React.createElement(_MenuListInspector["default"], {
          onItemChosen: this.close
        }, menu),
        setPopperElement: this.setPopperEl,
        popperElement: this.state.popperEl,
        style: style,
        menuZIndex: menuZIndex,
        bgRef: this._bgRef
      }, children);
    }
  }]);
  return MenuButton;
}(React.Component);

exports["default"] = MenuButton;
(0, _defineProperty2["default"])(MenuButton, "defaultProps", {
  type: 'normal'
});

var TriggerNormal = function TriggerNormal(_ref) {
  var positionOptions = _ref.positionOptions,
      renderButton = _ref.renderButton,
      children = _ref.children,
      opened = _ref.opened,
      onKeyPress = _ref.onKeyPress,
      onMouseDown = _ref.onMouseDown,
      onContextMenu = _ref.onContextMenu,
      menu = _ref.menu,
      popperElement = _ref.popperElement,
      setPopperElement = _ref.setPopperElement,
      style = _ref.style,
      menuZIndex = _ref.menuZIndex,
      bgRef = _ref.bgRef;

  var _React$useState = React.useState(null),
      _React$useState2 = (0, _slicedToArray2["default"])(_React$useState, 2),
      referenceElement = _React$useState2[0],
      setReferenceElement = _React$useState2[1];

  var _usePopper = (0, _reactPopper.usePopper)(referenceElement, popperElement, popperOptions(positionOptions)),
      styles = _usePopper.styles,
      attributes = _usePopper.attributes;

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    ref: setReferenceElement,
    onKeyPress: onKeyPress,
    onMouseDown: onMouseDown,
    onContextMenu: onContextMenu,
    style: style
  }, renderButton ? renderButton(opened) : children), opened ? /*#__PURE__*/React.createElement(_Portal["default"], null, /*#__PURE__*/React.createElement(Bg, {
    zIndex: menuZIndex,
    setRef: bgRef
  }), /*#__PURE__*/React.createElement("div", (0, _extends2["default"])({
    ref: setPopperElement,
    style: _objectSpread(_objectSpread({}, styles.popper), {}, {
      zIndex: menuZIndex
    })
  }, attributes.popper), menu)) : null);
};

var TriggerContext = function TriggerContext(_ref2) {
  var positionOptions = _ref2.positionOptions,
      renderButton = _ref2.renderButton,
      children = _ref2.children,
      opened = _ref2.opened,
      onKeyPress = _ref2.onKeyPress,
      onMouseDown = _ref2.onMouseDown,
      _onContextMenu = _ref2.onContextMenu,
      menu = _ref2.menu,
      popperElement = _ref2.popperElement,
      setPopperElement = _ref2.setPopperElement,
      style = _ref2.style,
      menuZIndex = _ref2.menuZIndex,
      bgRef = _ref2.bgRef;

  var _usePopper2 = (0, _reactPopper.usePopper)(virtualElement, popperElement, popperOptions(positionOptions, true)),
      styles = _usePopper2.styles,
      attributes = _usePopper2.attributes,
      update = _usePopper2.update;

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    onKeyPress: onKeyPress,
    onMouseDown: onMouseDown,
    onContextMenu: function onContextMenu(e) {
      virtualElement.getBoundingClientRect = generateGetBoundingClientRect(e.clientX, e.clientY);

      if (update) {
        update();
      }

      _onContextMenu(e);
    },
    style: style
  }, renderButton ? renderButton(opened) : children), opened ? /*#__PURE__*/React.createElement(_Portal["default"], null, /*#__PURE__*/React.createElement(Bg, {
    zIndex: menuZIndex,
    setRef: bgRef
  }), /*#__PURE__*/React.createElement("div", (0, _extends2["default"])({
    ref: setPopperElement,
    style: _objectSpread(_objectSpread({}, styles.popper), {}, {
      zIndex: menuZIndex
    })
  }, attributes.popper), menu)) : null);
};

var popperOptions = function popperOptions(placement) {
  var forContextMenu = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  return {
    placement: placement,
    modifiers: [{
      name: 'offset',
      options: {
        offset: forContextMenu ? [0, 2] : []
      }
    }, {
      name: 'preventOverflow',
      options: {
        padding: 5
      }
    }],
    strategy: 'fixed'
  };
};

function generateGetBoundingClientRect() {
  var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  return function () {
    return {
      width: 0,
      height: 0,
      top: y,
      left: x,
      bottom: y,
      right: x
    };
  };
}

var virtualElement = {
  getBoundingClientRect: generateGetBoundingClientRect()
};

var Bg = function Bg(_ref3) {
  var setRef = _ref3.setRef,
      zIndex = _ref3.zIndex;
  return /*#__PURE__*/React.createElement("div", {
    ref: setRef,
    style: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: zIndex,
      background: 'rgba(255,255,255,0.01)' // mitigate cursor flickering/jumping

    }
  });
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9NZW51QnV0dG9uLmpzIl0sIm5hbWVzIjpbIk1lbnVCdXR0b24iLCJvcGVuZWQiLCJwb3BwZXJFbCIsInVuZGVmaW5lZCIsIlJlYWN0IiwiY3JlYXRlUmVmIiwic3RhdGUiLCJQcm9taXNlIiwicmVzb2x2ZSIsInByb3BzIiwib25XaWxsT3BlbiIsIktlZmlyIiwibWVyZ2UiLCJ3aW5kb3ciLCJmaWx0ZXIiLCJlIiwidGFyZ2V0Iiwibm9kZVR5cGUiLCJfYmdSZWYiLCJjdXJyZW50IiwicHJldmVudERlZmF1bHQiLCJwb3BwZXIiLCJjb250YWlucyIsImtleSIsInN0b3BQcm9wYWdhdGlvbiIsImZyb21FdmVudHMiLCJ0YWtlVW50aWxCeSIsIl9vbkNsb3NlIiwib25WYWx1ZSIsImNsb3NlIiwic2V0U3RhdGUiLCJvbkRpZE9wZW4iLCJlbWl0Iiwib25XaWxsQ2xvc2UiLCJvbkRpZENsb3NlIiwib3BlbiIsImRpc2FibGVkIiwidHlwZSIsInRvZ2dsZSIsImJ1dHRvbiIsIm1lbnUiLCJwb3NpdGlvbk9wdGlvbnMiLCJjaGlsZHJlbiIsInJlbmRlckJ1dHRvbiIsInN0eWxlIiwibWVudVpJbmRleCIsIlRyaWdnZXJJbXBsIiwiVHJpZ2dlck5vcm1hbCIsIlRyaWdnZXJDb250ZXh0IiwiX29uS2V5UHJlc3MiLCJfb25Nb3VzZURvd24iLCJfb25Db250ZXh0TWVudSIsInNldFBvcHBlckVsIiwiQ29tcG9uZW50Iiwib25LZXlQcmVzcyIsIm9uTW91c2VEb3duIiwib25Db250ZXh0TWVudSIsInBvcHBlckVsZW1lbnQiLCJzZXRQb3BwZXJFbGVtZW50IiwiYmdSZWYiLCJ1c2VTdGF0ZSIsInJlZmVyZW5jZUVsZW1lbnQiLCJzZXRSZWZlcmVuY2VFbGVtZW50IiwicG9wcGVyT3B0aW9ucyIsInN0eWxlcyIsImF0dHJpYnV0ZXMiLCJ6SW5kZXgiLCJ2aXJ0dWFsRWxlbWVudCIsInVwZGF0ZSIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsImdlbmVyYXRlR2V0Qm91bmRpbmdDbGllbnRSZWN0IiwiY2xpZW50WCIsImNsaWVudFkiLCJwbGFjZW1lbnQiLCJmb3JDb250ZXh0TWVudSIsIm1vZGlmaWVycyIsIm5hbWUiLCJvcHRpb25zIiwib2Zmc2V0IiwicGFkZGluZyIsInN0cmF0ZWd5IiwieCIsInkiLCJ3aWR0aCIsImhlaWdodCIsInRvcCIsImxlZnQiLCJib3R0b20iLCJyaWdodCIsIkJnIiwic2V0UmVmIiwicG9zaXRpb24iLCJiYWNrZ3JvdW5kIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBOztBQUNBOztBQUNBOztBQUVBOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7Ozs7O0lBd0NxQkEsVTs7Ozs7Ozs7Ozs7Ozs7OzhGQUtKO0FBQ2JDLE1BQUFBLE1BQU0sRUFBRSxLQURLO0FBRWJDLE1BQUFBLFFBQVEsRUFBRUM7QUFGRyxLO2lHQUtPLDJCOzRHQUNiQyxLQUFLLENBQUNDLFNBQU4sRTs2RkFFRixZQUFxQjtBQUMxQixVQUFJLE1BQUtDLEtBQUwsQ0FBV0wsTUFBZixFQUF1QixPQUFPTSxPQUFPLENBQUNDLE9BQVIsRUFBUDtBQUN2QixVQUFJLE1BQUtDLEtBQUwsQ0FBV0MsVUFBZixFQUEyQixNQUFLRCxLQUFMLENBQVdDLFVBQVgsR0FGRCxDQUkxQjtBQUNBOztBQUNBQyx3QkFBTUMsS0FBTixDQUFZLENBQ1ZELGtCQUFNQyxLQUFOLENBQVksQ0FDVixtQ0FBa0JDLE1BQWxCLEVBQTBCLFdBQTFCLENBRFUsRUFFVixtQ0FBa0JBLE1BQWxCLEVBQTBCLE9BQTFCLENBRlUsQ0FBWixFQUdHQyxNQUhILENBR1UsVUFBQUMsQ0FBQyxFQUFJO0FBQ2IsWUFBSSxDQUFDQSxDQUFDLENBQUNDLE1BQVAsRUFBZSxPQUFPLElBQVA7QUFFZixZQUFJRCxDQUFDLENBQUNDLE1BQUYsQ0FBU0MsUUFBVCxLQUFzQixDQUExQixFQUE2QixPQUFPLElBQVAsQ0FIaEIsQ0FHNkI7O0FBRTFDLFlBQUlGLENBQUMsQ0FBQ0MsTUFB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LE1BQUY7QUFBQSxNQUFVeEIsTUFBVixTQUFVQSxNQUFWO0FBQUEsc0JBQ1Q7QUFDRSxJQUFBLEdBQUcsRUFBRXdCLE1BRFA7QUFFRSxJQUFBLEtBQUssRUFBRTtBQUNMQyxNQUFBQSxRQUFRLEVBQUUsT0FETDtBQUVMTixNQUFBQSxHQUFHLEVBQUUsQ0FGQTtBQUdMQyxNQUFBQSxJQUFJLEVBQUUsQ0FIRDtBQUlMRSxNQUFBQSxLQUFLLEVBQUUsQ0FKRjtBQUtMRCxNQUFBQSxNQUFNLEVBQUUsQ0FMSDtBQU1MckIsTUFBQUEsTUFBTSxFQUFOQSxNQU5LO0FBT0wwQixNQUFBQSxVQUFVLEVBQUUsd0JBUFAsQ0FPaUM7O0FBUGpDO0FBRlQsSUFEUztBQUFBLENBQVgiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBAZmxvdyAqL1xuXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgS2VmaXIgZnJvbSAna2VmaXInO1xuaW1wb3J0IGtlZmlyQnVzIGZyb20gJ2tlZmlyLWJ1cyc7XG5pbXBvcnQgdHlwZSB7QnVzfSBmcm9tICdrZWZpci1idXMnO1xuaW1wb3J0IGZyb21FdmVudHNDYXB0dXJlIGZyb20gJy4vbGliL2Zyb21FdmVudHNDYXB0dXJlJztcbmltcG9ydCBNZW51TGlzdEluc3BlY3RvciBmcm9tICcuL01lbnVMaXN0SW5zcGVjdG9yJztcbmltcG9ydCB7dXNlUG9wcGVyfSBmcm9tICdyZWFjdC1wb3BwZXInO1xuaW1wb3J0IFBvcnRhbCBmcm9tICcuL1BvcnRhbCc7XG5cbnR5cGUgU3RhdGUgPSB7XG4gIG9wZW5lZDogYm9vbGVhbixcbn07XG5cbnR5cGUgVHJpZ2dlclByb3BzID0ge1xuICBwb3NpdGlvbk9wdGlvbnM6IHN0cmluZyxcbiAgY2hpbGRyZW4/OiBSZWFjdC5SZWFjdEVsZW1lbnQsXG4gIHJlbmRlckJ1dHRvbj86IChvcGVuZWQ6IGJvb2xlYW4pID0+IFJlYWN0LlJlYWN0RWxlbWVudCxcbiAgb3BlbmVkOiBib29sZWFuLFxuICBvbktleVByZXNzOiAoZTogS2V5Ym9hcmRFdmVudCkgPT4gdm9pZCxcbiAgb25Nb3VzZURvd246IChlOiBNb3VzZUV2ZW50KSA9PiB2b2lkLFxuICBvbkNvbnRleHRNZW51OiAoZTogTW91c2VFdmVudCkgPT4gdm9pZCxcbiAgbWVudTogUmVhY3QuRWxlbWVudCxcbiAgcG9wcGVyRWxlbWVudDogYW55LFxuICBzZXRQb3BwZXJFbGVtZW50OiAoZWw6IGFueSkgPT4gdm9pZCxcbiAgYmdSZWY6IChlbDogYW55KSA9PiB2b2lkLFxuICBzdHlsZTogYW55LFxuICBtZW51WkluZGV4PzogbnVtYmVyLFxufTtcblxuZXhwb3J0IHR5cGUgUHJvcHMgPSB7XG4gIHR5cGU/OiAnbm9ybWFsJyB8ICdjb250ZXh0JyxcblxuICBjaGlsZHJlbj86IFJlYWN0LlJlYWN0RWxlbWVudCxcbiAgcmVuZGVyQnV0dG9uPzogKG9wZW5lZDogYm9vbGVhbikgPT4gUmVhY3QuUmVhY3RFbGVtZW50LFxuICBtZW51OiBSZWFjdC5SZWFjdEVsZW1lbnQsXG5cbiAgb25XaWxsT3Blbj86ICgpID0+IHZvaWQsXG4gIG9uRGlkT3Blbj86ICgpID0+IHZvaWQsXG4gIG9uV2lsbENsb3NlPzogKCkgPT4gdm9pZCxcbiAgb25EaWRDbG9zZT86ICgpID0+IHZvaWQsXG5cbiAgZGlzYWJsZWQ/OiBib29sZWFuLFxuICBwb3NpdGlvbk9wdGlvbnM/OiBzdHJpbmcsIC8vIHBvcHBlciBvcHRpb25cbiAgc3R5bGU6IGFueSxcbiAgbWVudVpJbmRleD86IG51bWJlcixcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1lbnVCdXR0b24gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQ8UHJvcHMsIFN0YXRlPiB7XG4gIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgdHlwZTogJ25vcm1hbCcsXG4gIH07XG5cbiAgc3RhdGU6IFN0YXRlID0ge1xuICAgIG9wZW5lZDogZmFsc2UsXG4gICAgcG9wcGVyRWw6IHVuZGVmaW5lZCxcbiAgfTtcblxuICBfb25DbG9zZTogQnVzPHZvaWQ+ID0ga2VmaXJCdXMoKTtcbiAgX2JnUmVmID0gUmVhY3QuY3JlYXRlUmVmPEhUTUxFbGVtZW50PigpO1xuXG4gIG9wZW4gPSAoKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgaWYgKHRoaXMuc3RhdGUub3BlbmVkKSByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgaWYgKHRoaXMucHJvcHMub25XaWxsT3BlbikgdGhpcy5wcm9wcy5vbldpbGxPcGVuKCk7XG5cbiAgICAvLyBDbGlja2luZyBvdXRzaWRlIG9mIHRoZSBkcm9wZG93biBvciBwcmVzc2luZyBlc2NhcGUgc2hvdWxkIGNsb3NlIHRoZVxuICAgIC8vIGRyb3Bkb3duLlxuICAgIEtlZmlyLm1lcmdlKFtcbiAgICAgIEtlZmlyLm1lcmdlKFtcbiAgICAgICAgZnJvbUV2ZW50c0NhcHR1cmUod2luZG93LCAnbW91c2Vkb3duJyksXG4gICAgICAgIGZyb21FdmVudHNDYXB0dXJlKHdpbmRvdywgJ2ZvY3VzJyksXG4gICAgICBdKS5maWx0ZXIoZSA9PiB7XG4gICAgICAgIGlmICghZS50YXJnZXQpIHJldHVybiB0cnVlO1xuXG4gICAgICAgIGlmIChlLnRhcmdldC5ub2RlVHlwZSAhPT0gMSkgcmV0dXJuIHRydWU7IC8vIG5vdCBhbiBlbGVtZW50XG5cbiAgICAgICAgaWYgKGUudGFyZ2V0ID09PSB0aGlzLl9iZ1JlZi5jdXJyZW50KSB7XG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpOyAvLyBpdCBtZXNzZXMgd2l0aCBmb2N1c1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcG9wcGVyID0gdGhpcy5zdGF0ZS5wb3BwZXJFbDtcbiAgICAgICAgcmV0dXJuICFwb3BwZXIuY29udGFpbnMoZS50YXJnZXQpO1xuICAgICAgfSksXG4gICAgICBmcm9tRXZlbnRzQ2FwdHVyZSh3aW5kb3csICdrZXlkb3duJykuZmlsdGVyKGUgPT4ge1xuICAgICAgICBpZiAoZS5rZXkgPT09ICdFc2NhcGUnKSB7XG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9KSxcbiAgICAgIEtlZmlyLmZyb21FdmVudHMod2luZG93LCAnYmx1cicpLFxuICAgIF0pXG4gICAgICAudGFrZVVudGlsQnkodGhpcy5fb25DbG9zZSlcbiAgICAgIC5vblZhbHVlKCgpID0+IHtcbiAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgfSk7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtvcGVuZWQ6IHRydWV9LCAoKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLm9uRGlkT3BlbikgdGhpcy5wcm9wcy5vbkRpZE9wZW4oKTtcbiAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgY2xvc2UgPSAoKSA9PiB7XG4gICAgaWYgKCF0aGlzLnN0YXRlLm9wZW5lZCkgcmV0dXJuO1xuXG4gICAgdGhpcy5fYmdSZWYuY3VycmVudCA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLl9vbkNsb3NlLmVtaXQoKTtcblxuICAgIGlmICh0aGlzLnByb3BzLm9uV2lsbENsb3NlKSB0aGlzLnByb3BzLm9uV2lsbENsb3NlKCk7XG5cbiAgICB0aGlzLnNldFN0YXRlKHtvcGVuZWQ6IGZhbHNlLCBwb3BwZXJFbDogdW5kZWZpbmVkfSwgKCkgPT4ge1xuICAgICAgaWYgKHRoaXMucHJvcHMub25EaWRDbG9zZSkgdGhpcy5wcm9wcy5vbkRpZENsb3NlKCk7XG4gICAgfSk7XG4gIH07XG5cbiAgdG9nZ2xlID0gKCkgPT4ge1xuICAgIGlmICh0aGlzLnN0YXRlLm9wZW5lZCkge1xuICAgICAgdGhpcy5jbG9zZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm9wZW4oKTtcbiAgICB9XG4gIH07XG5cbiAgcmVwb3NpdGlvbiA9ICgpID0+IHtcbiAgICAvLyBub29wIGZvciBub3dcbiAgfTtcblxuICBfb25Db250ZXh0TWVudSA9IChlOiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMuZGlzYWJsZWQgfHwgdGhpcy5wcm9wcy50eXBlICE9PSAnY29udGV4dCcpIHJldHVybjtcblxuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIHRoaXMudG9nZ2xlKCk7XG4gIH07XG5cbiAgX29uTW91c2VEb3duID0gKGU6IE1vdXNlRXZlbnQpID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5kaXNhYmxlZCB8fCB0aGlzLnByb3BzLnR5cGUgIT09ICdub3JtYWwnKSByZXR1cm47XG5cbiAgICBpZiAoZS5idXR0b24gPT09IDApIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICB0aGlzLnRvZ2dsZSgpO1xuICAgIH1cbiAgfTtcblxuICBfb25LZXlQcmVzcyA9IChlOiBLZXlib2FyZEV2ZW50KSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMuZGlzYWJsZWQgfHwgdGhpcy5wcm9wcy50eXBlICE9PSAnbm9ybWFsJykgcmV0dXJuO1xuXG4gICAgaWYgKGUua2V5ID09PSAnRW50ZXInIHx8IGUua2V5ID09PSAnICcpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHRoaXMudG9nZ2xlKCk7XG4gICAgfVxuICB9O1xuXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgIHRoaXMuX29uQ2xvc2UuZW1pdCgpO1xuICB9XG5cbiAgc2V0UG9wcGVyRWwgPSBwb3BwZXJFbCA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7cG9wcGVyRWx9KTtcbiAgfTtcblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge1xuICAgICAgbWVudSxcbiAgICAgIHBvc2l0aW9uT3B0aW9ucyxcbiAgICAgIGNoaWxkcmVuLFxuICAgICAgcmVuZGVyQnV0dG9uLFxuICAgICAgc3R5bGUsXG4gICAgICBtZW51WkluZGV4LFxuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHtvcGVuZWR9ID0gdGhpcy5zdGF0ZTtcblxuICAgIGNvbnN0IFRyaWdnZXJJbXBsID1cbiAgICAgIHRoaXMucHJvcHMudHlwZSA9PT0gJ25vcm1hbCcgPyBUcmlnZ2VyTm9ybWFsIDogVHJpZ2dlckNvbnRleHQ7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPFRyaWdnZXJJbXBsXG4gICAgICAgIHBvc2l0aW9uT3B0aW9ucz17cG9zaXRpb25PcHRpb25zfVxuICAgICAgICByZW5kZXJCdXR0b249e3JlbmRlckJ1dHRvbn1cbiAgICAgICAgb3BlbmVkPXtvcGVuZWR9XG4gICAgICAgIG9uS2V5UHJlc3M9e3RoaXMuX29uS2V5UHJlc3N9XG4gICAgICAgIG9uTW91c2VEb3duPXt0aGlzLl9vbk1vdXNlRG93bn1cbiAgICAgICAgb25Db250ZXh0TWVudT17dGhpcy5fb25Db250ZXh0TWVudX1cbiAgICAgICAgbWVudT17XG4gICAgICAgICAgPE1lbnVMaXN0SW5zcGVjdG9yIG9uSXRlbUNob3Nlbj17dGhpcy5jbG9zZX0+XG4gICAgICAgICAgICB7bWVudX1cbiAgICAgICAgICA8L01lbnVMaXN0SW5zcGVjdG9yPlxuICAgICAgICB9XG4gICAgICAgIHNldFBvcHBlckVsZW1lbnQ9e3RoaXMuc2V0UG9wcGVyRWx9XG4gICAgICAgIHBvcHBlckVsZW1lbnQ9e3RoaXMuc3RhdGUucG9wcGVyRWx9XG4gICAgICAgIHN0eWxlPXtzdHlsZX1cbiAgICAgICAgbWVudVpJbmRleD17bWVudVpJbmRleH1cbiAgICAgICAgYmdSZWY9e3RoaXMuX2JnUmVmfVxuICAgICAgPlxuICAgICAgICB7Y2hpbGRyZW59XG4gICAgICA8L1RyaWdnZXJJbXBsPlxuICAgICk7XG4gIH1cbn1cblxuY29uc3QgVHJpZ2dlck5vcm1hbCA9ICh7XG4gIHBvc2l0aW9uT3B0aW9ucyxcbiAgcmVuZGVyQnV0dG9uLFxuICBjaGlsZHJlbixcbiAgb3BlbmVkLFxuICBvbktleVByZXNzLFxuICBvbk1vdXNlRG93bixcbiAgb25Db250ZXh0TWVudSxcbiAgbWVudSxcbiAgcG9wcGVyRWxlbWVudCxcbiAgc2V0UG9wcGVyRWxlbWVudCxcbiAgc3R5bGUsXG4gIG1lbnVaSW5kZXgsXG4gIGJnUmVmLFxufTogVHJpZ2dlclByb3BzKSA9PiB7XG4gIGNvbnN0IFtyZWZlcmVuY2VFbGVtZW50LCBzZXRSZWZlcmVuY2VFbGVtZW50XSA9IFJlYWN0LnVzZVN0YXRlKG51bGwpO1xuICBjb25zdCB7c3R5bGVzLCBhdHRyaWJ1dGVzfSA9IHVzZVBvcHBlcihcbiAgICByZWZlcmVuY2VFbGVtZW50LFxuICAgIHBvcHBlckVsZW1lbnQsXG4gICAgcG9wcGVyT3B0aW9ucyhwb3NpdGlvbk9wdGlvbnMpXG4gICk7XG5cbiAgcmV0dXJuIChcbiAgICA8PlxuICAgICAgPGRpdlxuICAgICAgICByZWY9e3NldFJlZmVyZW5jZUVsZW1lbnR9XG4gICAgICAgIG9uS2V5UHJlc3M9e29uS2V5UHJlc3N9XG4gICAgICAgIG9uTW91c2VEb3duPXtvbk1vdXNlRG93bn1cbiAgICAgICAgb25Db250ZXh0TWVudT17b25Db250ZXh0TWVudX1cbiAgICAgICAgc3R5bGU9e3N0eWxlfVxuICAgICAgPlxuICAgICAgICB7cmVuZGVyQnV0dG9uID8gcmVuZGVyQnV0dG9uKG9wZW5lZCkgOiBjaGlsZHJlbn1cbiAgICAgIDwvZGl2PlxuXG4gICAgICB7b3BlbmVkID8gKFxuICAgICAgICA8UG9ydGFsPlxuICAgICAgICAgIDxCZyB6SW5kZXg9e21lbnVaSW5kZXh9IHNldFJlZj17YmdSZWZ9IC8+XG4gICAgICAgICAgPGRpdlxuICAgICAgICAgICAgcmVmPXtzZXRQb3BwZXJFbGVtZW50fVxuICAgICAgICAgICAgc3R5bGU9e3suLi5zdHlsZXMucG9wcGVyLCB6SW5kZXg6IG1lbnVaSW5kZXh9fVxuICAgICAgICAgICAgey4uLmF0dHJpYnV0ZXMucG9wcGVyfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHttZW51fVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L1BvcnRhbD5cbiAgICAgICkgOiBudWxsfVxuICAgIDwvPlxuICApO1xufTtcblxuY29uc3QgVHJpZ2dlckNvbnRleHQgPSAoe1xuICBwb3NpdGlvbk9wdGlvbnMsXG4gIHJlbmRlckJ1dHRvbixcbiAgY2hpbGRyZW4sXG4gIG9wZW5lZCxcbiAgb25LZXlQcmVzcyxcbiAgb25Nb3VzZURvd24sXG4gIG9uQ29udGV4dE1lbnUsXG4gIG1lbnUsXG4gIHBvcHBlckVsZW1lbnQsXG4gIHNldFBvcHBlckVsZW1lbnQsXG4gIHN0eWxlLFxuICBtZW51WkluZGV4LFxuICBiZ1JlZixcbn06IFRyaWdnZXJQcm9wcykgPT4ge1xuICBjb25zdCB7c3R5bGVzLCBhdHRyaWJ1dGVzLCB1cGRhdGV9ID0gdXNlUG9wcGVyKFxuICAgIHZpcnR1YWxFbGVtZW50LFxuICAgIHBvcHBlckVsZW1lbnQsXG4gICAgcG9wcGVyT3B0aW9ucyhwb3NpdGlvbk9wdGlvbnMsIHRydWUpXG4gICk7XG5cbiAgcmV0dXJuIChcbiAgICA8PlxuICAgICAgPGRpdlxuICAgICAgICBvbktleVByZXNzPXtvbktleVByZXNzfVxuICAgICAgICBvbk1vdXNlRG93bj17b25Nb3VzZURvd259XG4gICAgICAgIG9uQ29udGV4dE1lbnU9e2UgPT4ge1xuICAgICAgICAgIHZpcnR1YWxFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCA9IGdlbmVyYXRlR2V0Qm91bmRpbmdDbGllbnRSZWN0KFxuICAgICAgICAgICAgZS5jbGllbnRYLFxuICAgICAgICAgICAgZS5jbGllbnRZXG4gICAgICAgICAgKTtcblxuICAgICAgICAgIGlmICh1cGRhdGUpIHtcbiAgICAgICAgICAgIHVwZGF0ZSgpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIG9uQ29udGV4dE1lbnUoZSk7XG4gICAgICAgIH19XG4gICAgICAgIHN0eWxlPXtzdHlsZX1cbiAgICAgID5cbiAgICAgICAge3JlbmRlckJ1dHRvbiA/IHJlbmRlckJ1dHRvbihvcGVuZWQpIDogY2hpbGRyZW59XG4gICAgICA8L2Rpdj5cblxuICAgICAge29wZW5lZCA/IChcbiAgICAgICAgPFBvcnRhbD5cbiAgICAgICAgICA8QmcgekluZGV4PXttZW51WkluZGV4fSBzZXRSZWY9e2JnUmVmfSAvPlxuICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgIHJlZj17c2V0UG9wcGVyRWxlbWVudH1cbiAgICAgICAgICAgIHN0eWxlPXt7Li4uc3R5bGVzLnBvcHBlciwgekluZGV4OiBtZW51WkluZGV4fX1cbiAgICAgICAgICAgIHsuLi5hdHRyaWJ1dGVzLnBvcHBlcn1cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7bWVudX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9Qb3J0YWw+XG4gICAgICApIDogbnVsbH1cbiAgICA8Lz5cbiAgKTtcbn07XG5cbmNvbnN0IHBvcHBlck9wdGlvbnMgPSAocGxhY2VtZW50LCBmb3JDb250ZXh0TWVudSA9IGZhbHNlKSA9PiAoe1xuICBwbGFjZW1lbnQsXG4gIG1vZGlmaWVyczogW1xuICAgIHtuYW1lOiAnb2Zmc2V0Jywgb3B0aW9uczoge29mZnNldDogZm9yQ29udGV4dE1lbnUgPyBbMCwgMl0gOiBbXX19LFxuICAgIHtuYW1lOiAncHJldmVudE92ZXJmbG93Jywgb3B0aW9uczoge3BhZGRpbmc6IDV9fSxcbiAgXSxcbiAgc3RyYXRlZ3k6ICdmaXhlZCcsXG59KTtcblxuZnVuY3Rpb24gZ2VuZXJhdGVHZXRCb3VuZGluZ0NsaWVudFJlY3QoeCA9IDAsIHkgPSAwKSB7XG4gIHJldHVybiAoKSA9PiAoe1xuICAgIHdpZHRoOiAwLFxuICAgIGhlaWdodDogMCxcbiAgICB0b3A6IHksXG4gICAgbGVmdDogeCxcbiAgICBib3R0b206IHksXG4gICAgcmlnaHQ6IHgsXG4gIH0pO1xufVxuXG5jb25zdCB2aXJ0dWFsRWxlbWVudCA9IHtcbiAgZ2V0Qm91bmRpbmdDbGllbnRSZWN0OiBnZW5lcmF0ZUdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLFxufTtcblxuY29uc3QgQmcgPSAoe3NldFJlZiwgekluZGV4fToge3pJbmRleD86IG51bWJlciwgc2V0UmVmOiBhbnl9KSA9PiAoXG4gIDxkaXZcbiAgICByZWY9e3NldFJlZn1cbiAgICBzdHlsZT17e1xuICAgICAgcG9zaXRpb246ICdmaXhlZCcsXG4gICAgICB0b3A6IDAsXG4gICAgICBsZWZ0OiAwLFxuICAgICAgcmlnaHQ6IDAsXG4gICAgICBib3R0b206IDAsXG4gICAgICB6SW5kZXgsXG4gICAgICBiYWNrZ3JvdW5kOiAncmdiYSgyNTUsMjU1LDI1NSwwLjAxKScsIC8vIG1pdGlnYXRlIGN1cnNvciBmbGlja2VyaW5nL2p1bXBpbmdcbiAgICB9fVxuICAvPlxuKTtcbiJdfQ==