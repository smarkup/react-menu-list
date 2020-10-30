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
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "open", function () {
      if (_this.state.opened) return Promise.resolve();
      if (_this.props.onWillOpen) _this.props.onWillOpen(); // Clicking outside of the dropdown or pressing escape should close the
      // dropdown.

      _kefir["default"].merge([_kefir["default"].merge([(0, _fromEventsCapture["default"])(window, 'mousedown'), (0, _fromEventsCapture["default"])(window, 'focus')]).filter(function (e) {
        if (!e.target) return true;
        if (e.target.nodeType !== 1) return true; // not an element

        var popper = _this.state.popperEl;
        if (!popper) throw new Error('missing popper element');
        return !popper.contains(e.target);
      }), _kefir["default"].fromEvents(window, 'keydown').filter(function (e) {
        return e.key ? e.key === 'Escape' : e.which === 27;
      }).map(function (e) {
        e.preventDefault();
        e.stopPropagation();
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
      if (_this.props.onWillClose) _this.props.onWillClose();

      _this.setState({
        opened: false,
        popperEl: undefined
      }, function () {
        if (_this.props.onDidClose) _this.props.onDidClose();
      });

      _this._onClose.emit();
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
      if (_this.props.disabled) return;

      if (_this.props.type === 'context') {
        e.preventDefault();

        _this.toggle();
      }
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onMouseDown", function (e) {
      if (_this.props.disabled) return;

      if (e.button !== 0) {
        return;
      }

      if (_this.props.type === 'normal') {
        e.preventDefault();

        _this.toggle();
      }
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onKeyPress", function (e) {
      if (_this.props.disabled) return;

      if (_this.props.type === 'normal') {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();

          _this.toggle();
        }
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
          children = _this$props.children;
      var opened = this.state.opened;

      if (this.props.type === 'normal') {
        return /*#__PURE__*/React.createElement(TriggerNormal, {
          positionOptions: positionOptions,
          renderButton: children,
          opened: opened,
          onKeyPress: this._onKeyPress,
          onMouseDown: this._onMouseDown,
          onContextMenu: this._onContextMenu,
          menu: /*#__PURE__*/React.createElement(_MenuListInspector["default"], {
            onItemChosen: this.close
          }, menu),
          setPopperElement: this.setPopperEl,
          popperElement: this.state.popperEl
        });
      } else {
        return /*#__PURE__*/React.createElement(TriggerContext, {
          positionOptions: positionOptions,
          renderButton: children,
          opened: opened,
          onKeyPress: this._onKeyPress,
          onMouseDown: this._onMouseDown,
          onContextMenu: this._onContextMenu,
          menu: /*#__PURE__*/React.createElement(_MenuListInspector["default"], {
            onItemChosen: this.close
          }, menu),
          setPopperElement: this.setPopperEl,
          popperElement: this.state.popperEl
        });
      }
    }
  }]);
  return MenuButton;
}(React.Component);

exports["default"] = MenuButton;
(0, _defineProperty2["default"])(MenuButton, "defaultProps", {
  type: 'normal',
  positionOptions: {
    position: 'bottom',
    hAlign: 'left'
  }
});

var TriggerNormal = function TriggerNormal(_ref) {
  var positionOptions = _ref.positionOptions,
      renderButton = _ref.renderButton,
      opened = _ref.opened,
      onKeyPress = _ref.onKeyPress,
      onMouseDown = _ref.onMouseDown,
      onContextMenu = _ref.onContextMenu,
      menu = _ref.menu,
      popperElement = _ref.popperElement,
      setPopperElement = _ref.setPopperElement;

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
    onContextMenu: onContextMenu
  }, renderButton), /*#__PURE__*/React.createElement(Bg, {
    active: opened
  }), opened ? /*#__PURE__*/React.createElement(_Portal["default"], null, /*#__PURE__*/React.createElement("div", (0, _extends2["default"])({
    ref: setPopperElement,
    style: styles.popper
  }, attributes.popper), menu)) : null);
};

var TriggerContext = function TriggerContext(_ref2) {
  var positionOptions = _ref2.positionOptions,
      renderButton = _ref2.renderButton,
      opened = _ref2.opened,
      onKeyPress = _ref2.onKeyPress,
      onMouseDown = _ref2.onMouseDown,
      _onContextMenu = _ref2.onContextMenu,
      menu = _ref2.menu,
      popperElement = _ref2.popperElement,
      setPopperElement = _ref2.setPopperElement;

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
    }
  }, renderButton), /*#__PURE__*/React.createElement(Bg, {
    active: opened
  }), opened ? /*#__PURE__*/React.createElement(_Portal["default"], null, /*#__PURE__*/React.createElement("div", (0, _extends2["default"])({
    ref: setPopperElement,
    style: styles.popper
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
  var active = _ref3.active;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: active ? 'block' : 'none',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0
    }
  });
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9NZW51QnV0dG9uLmpzIl0sIm5hbWVzIjpbIk1lbnVCdXR0b24iLCJvcGVuZWQiLCJwb3BwZXJFbCIsInVuZGVmaW5lZCIsInN0YXRlIiwiUHJvbWlzZSIsInJlc29sdmUiLCJwcm9wcyIsIm9uV2lsbE9wZW4iLCJLZWZpciIsIm1lcmdlIiwid2luZG93IiwiZmlsdGVyIiwiZSIsInRhcmdldCIsIm5vZGVUeXBlIiwicG9wcGVyIiwiRXJyb3IiLCJjb250YWlucyIsImZyb21FdmVudHMiLCJrZXkiLCJ3aGljaCIsIm1hcCIsInByZXZlbnREZWZhdWx0Iiwic3RvcFByb3BhZ2F0aW9uIiwidGFrZVVudGlsQnkiLCJfb25DbG9zZSIsIm9uVmFsdWUiLCJjbG9zZSIsInNldFN0YXRlIiwib25EaWRPcGVuIiwib25XaWxsQ2xvc2UiLCJvbkRpZENsb3NlIiwiZW1pdCIsIm9wZW4iLCJkaXNhYmxlZCIsInR5cGUiLCJ0b2dnbGUiLCJidXR0b24iLCJtZW51IiwicG9zaXRpb25PcHRpb25zIiwiY2hpbGRyZW4iLCJfb25LZXlQcmVzcyIsIl9vbk1vdXNlRG93biIsIl9vbkNvbnRleHRNZW51Iiwic2V0UG9wcGVyRWwiLCJSZWFjdCIsIkNvbXBvbmVudCIsInBvc2l0aW9uIiwiaEFsaWduIiwiVHJpZ2dlck5vcm1hbCIsInJlbmRlckJ1dHRvbiIsIm9uS2V5UHJlc3MiLCJvbk1vdXNlRG93biIsIm9uQ29udGV4dE1lbnUiLCJwb3BwZXJFbGVtZW50Iiwic2V0UG9wcGVyRWxlbWVudCIsInVzZVN0YXRlIiwicmVmZXJlbmNlRWxlbWVudCIsInNldFJlZmVyZW5jZUVsZW1lbnQiLCJwb3BwZXJPcHRpb25zIiwic3R5bGVzIiwiYXR0cmlidXRlcyIsIlRyaWdnZXJDb250ZXh0IiwidmlydHVhbEVsZW1lbnQiLCJ1cGRhdGUiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJnZW5lcmF0ZUdldEJvdW5kaW5nQ2xpZW50UmVjdCIsImNsaWVudFgiLCJjbGllbnRZIiwicGxhY2VtZW50IiwiZm9yQ29udGV4dE1lbnUiLCJtb2RpZmllcnMiLCJuYW1lIiwib3B0aW9ucyIsIm9mZnNldCIsInBhZGRpbmciLCJzdHJhdGVneSIsIngiLCJ5Iiwid2lkdGgiLCJoZWlnaHQiLCJ0b3AiLCJsZWZ0IiwiYm90dG9tIiwicmlnaHQiLCJCZyIsImFjdGl2ZSIsImRpc3BsYXkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7OztJQW1DcUJBLFU7Ozs7Ozs7Ozs7Ozs7Ozs4RkFNSjtBQUNiQyxNQUFBQSxNQUFNLEVBQUUsS0FESztBQUViQyxNQUFBQSxRQUFRLEVBQUVDO0FBRkcsSztpR0FLTywyQjs2RkFFZixZQUFxQjtBQUMxQixVQUFJLE1BQUtDLEtBQUwsQ0FBV0gsTUFBZixFQUF1QixPQUFPSSxPQUFPLENBQUNDLE9BQVIsRUFBUDtBQUN2QixVQUFJLE1BQUtDLEtBQUwsQ0FBV0MsVUFBZixFQUEyQixNQUFLRCxLQUFMLENBQVdDLFVBQVgsR0FGRCxDQUkxQjtBQUNBOztBQUNBQyx3QkFBTUMsS0FBTixDQUFZLENBQ1ZELGtCQUFNQyxLQUFOLENBQVksQ0FDVixtQ0FBa0JDLE1BQWxCLEVBQTBCLFdBQTFCLENBRFUsRUFFVixtQ0FBa0JBLE1BQWxCLEVBQTBCLE9BQTFCLENBRlUsQ0FBWixFQUdHQyxNQUhILENBR1UsVUFBQUMsQ0FBQyxFQUFJO0FBQ2IsWUFBSSxDQUFDQSxDQUFDLENBQUNDLE1BQVAsRUFBZSxPQUFPLElBQVA7QUFFZixZQUFJRCxDQUFDLENBQUNDLE1BQUYsQ0FBU0MsUUFBVCxLQUFzQixDQUExQixFQUE2QixPQUFPLElBQVAsQ0FIaEIsQ0FHNkI7O0FBRTFDLFlBQU1DLE1BQU0sR0FBRyxNQUFLWixLQUFMLENBQVdGLFFBQTFCO0FBRUEsWUFBSSxDQUFDYyxNQUFMLEVBQWEsTUFBTSxJQUFJQyxLQUFKLENBQVUsd0JBQVYsQ0FBTjtBQUViLGVB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RSxRQUFBQSxPQUFPLEVBQUU7QUFBVjtBQUFuQyxLQUZTLENBRmlEO0FBTTVEQyxJQUFBQSxRQUFRLEVBQUU7QUFOa0QsR0FBeEM7QUFBQSxDQUF0Qjs7QUFTQSxTQUFTViw2QkFBVCxHQUFxRDtBQUFBLE1BQWRXLENBQWMsdUVBQVYsQ0FBVTtBQUFBLE1BQVBDLENBQU8sdUVBQUgsQ0FBRztBQUNuRCxTQUFPO0FBQUEsV0FBTztBQUNaQyxNQUFBQSxLQUFLLEVBQUUsQ0FESztBQUVaQyxNQUFBQSxNQUFNLEVBQUUsQ0FGSTtBQUdaQyxNQUFBQSxHQUFHLEVBQUVILENBSE87QUFJWkksTUFBQUEsSUFBSSxFQUFFTCxDQUpNO0FBS1pNLE1BQUFBLE1BQU0sRUFBRUwsQ0FMSTtBQU1aTSxNQUFBQSxLQUFLLEVBQUVQO0FBTkssS0FBUDtBQUFBLEdBQVA7QUFRRDs7QUFFRCxJQUFNZCxjQUFjLEdBQUc7QUFDckJFLEVBQUFBLHFCQUFxQixFQUFFQyw2QkFBNkI7QUFEL0IsQ0FBdkI7O0FBSUEsSUFBTW1CLEVBQUUsR0FBRyxTQUFMQSxFQUFLO0FBQUEsTUFBRUMsTUFBRixTQUFFQSxNQUFGO0FBQUEsc0JBQ1Q7QUFDRSxJQUFBLEtBQUssRUFBRTtBQUNMQyxNQUFBQSxPQUFPLEVBQUVELE1BQU0sR0FBRyxPQUFILEdBQWEsTUFEdkI7QUFFTHZDLE1BQUFBLFFBQVEsRUFBRSxPQUZMO0FBR0xrQyxNQUFBQSxHQUFHLEVBQUUsQ0FIQTtBQUlMQyxNQUFBQSxJQUFJLEVBQUUsQ0FKRDtBQUtMRSxNQUFBQSxLQUFLLEVBQUUsQ0FMRjtBQU1MRCxNQUFBQSxNQUFNLEVBQUU7QUFOSDtBQURULElBRFM7QUFBQSxDQUFYIiwic291cmNlc0NvbnRlbnQiOlsiLyogQGZsb3cgKi9cblxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IEtlZmlyIGZyb20gJ2tlZmlyJztcbmltcG9ydCBrZWZpckJ1cyBmcm9tICdrZWZpci1idXMnO1xuaW1wb3J0IHR5cGUge0J1c30gZnJvbSAna2VmaXItYnVzJztcbmltcG9ydCBmcm9tRXZlbnRzQ2FwdHVyZSBmcm9tICcuL2xpYi9mcm9tRXZlbnRzQ2FwdHVyZSc7XG5pbXBvcnQgTWVudUxpc3RJbnNwZWN0b3IgZnJvbSAnLi9NZW51TGlzdEluc3BlY3Rvcic7XG5pbXBvcnQge3VzZVBvcHBlcn0gZnJvbSAncmVhY3QtcG9wcGVyJztcbmltcG9ydCBQb3J0YWwgZnJvbSAnLi9Qb3J0YWwnO1xuXG50eXBlIFN0YXRlID0ge1xuICBvcGVuZWQ6IGJvb2xlYW4sXG59O1xuXG50eXBlIFRyaWdnZXJQcm9wcyA9IHtcbiAgcG9zaXRpb25PcHRpb25zOiBzdHJpbmcsXG4gIHJlbmRlckJ1dHRvbjogUmVhY3QuRWxlbWVudCxcbiAgb3BlbmVkOiBib29sZWFuLFxuICBvbktleVByZXNzOiAoZTogS2V5Ym9hcmRFdmVudCkgPT4gdm9pZCxcbiAgb25Nb3VzZURvd246IChlOiBNb3VzZUV2ZW50KSA9PiB2b2lkLFxuICBvbkNvbnRleHRNZW51OiAoZTogTW91c2VFdmVudCkgPT4gdm9pZCxcbiAgbWVudTogUmVhY3QuRWxlbWVudCxcbiAgcG9wcGVyRWxlbWVudDogYW55LFxuICBzZXRQb3BwZXJFbGVtZW50OiAoZWw6IGFueSkgPT4gdm9pZCxcbn07XG5cbmV4cG9ydCB0eXBlIFByb3BzID0ge1xuICB0eXBlPzogJ25vcm1hbCcgfCAnY29udGV4dCcsXG5cbiAgcG9zaXRpb25PcHRpb25zOiBzdHJpbmcsIC8vIHBvcHBlciBvcHRpb25cblxuICByZW5kZXJCdXR0b246IFJlYWN0LlJlYWN0RWxlbWVudCxcblxuICBjaGlsZHJlbj86IFJlYWN0LlJlYWN0RWxlbWVudCxcbiAgZGlzYWJsZWQ/OiBib29sZWFuLFxuXG4gIG1lbnU6IFJlYWN0LlJlYWN0RWxlbWVudCxcbiAgb25XaWxsT3Blbj86ICgpID0+IHZvaWQsXG4gIG9uRGlkT3Blbj86ICgpID0+IHZvaWQsXG4gIG9uV2lsbENsb3NlPzogKCkgPT4gdm9pZCxcbiAgb25EaWRDbG9zZT86ICgpID0+IHZvaWQsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNZW51QnV0dG9uIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PFByb3BzLCBTdGF0ZT4ge1xuICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgIHR5cGU6ICdub3JtYWwnLFxuICAgIHBvc2l0aW9uT3B0aW9uczoge3Bvc2l0aW9uOiAnYm90dG9tJywgaEFsaWduOiAnbGVmdCd9LFxuICB9O1xuXG4gIHN0YXRlOiBTdGF0ZSA9IHtcbiAgICBvcGVuZWQ6IGZhbHNlLFxuICAgIHBvcHBlckVsOiB1bmRlZmluZWQsXG4gIH07XG5cbiAgX29uQ2xvc2U6IEJ1czx2b2lkPiA9IGtlZmlyQnVzKCk7XG5cbiAgb3BlbiA9ICgpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICBpZiAodGhpcy5zdGF0ZS5vcGVuZWQpIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICBpZiAodGhpcy5wcm9wcy5vbldpbGxPcGVuKSB0aGlzLnByb3BzLm9uV2lsbE9wZW4oKTtcblxuICAgIC8vIENsaWNraW5nIG91dHNpZGUgb2YgdGhlIGRyb3Bkb3duIG9yIHByZXNzaW5nIGVzY2FwZSBzaG91bGQgY2xvc2UgdGhlXG4gICAgLy8gZHJvcGRvd24uXG4gICAgS2VmaXIubWVyZ2UoW1xuICAgICAgS2VmaXIubWVyZ2UoW1xuICAgICAgICBmcm9tRXZlbnRzQ2FwdHVyZSh3aW5kb3csICdtb3VzZWRvd24nKSxcbiAgICAgICAgZnJvbUV2ZW50c0NhcHR1cmUod2luZG93LCAnZm9jdXMnKSxcbiAgICAgIF0pLmZpbHRlcihlID0+IHtcbiAgICAgICAgaWYgKCFlLnRhcmdldCkgcmV0dXJuIHRydWU7XG5cbiAgICAgICAgaWYgKGUudGFyZ2V0Lm5vZGVUeXBlICE9PSAxKSByZXR1cm4gdHJ1ZTsgLy8gbm90IGFuIGVsZW1lbnRcblxuICAgICAgICBjb25zdCBwb3BwZXIgPSB0aGlzLnN0YXRlLnBvcHBlckVsO1xuXG4gICAgICAgIGlmICghcG9wcGVyKSB0aHJvdyBuZXcgRXJyb3IoJ21pc3NpbmcgcG9wcGVyIGVsZW1lbnQnKTtcblxuICAgICAgICByZXR1cm4gIXBvcHBlci5jb250YWlucyhlLnRhcmdldCk7XG4gICAgICB9KSxcbiAgICAgIEtlZmlyLmZyb21FdmVudHMod2luZG93LCAna2V5ZG93bicpXG4gICAgICAgIC5maWx0ZXIoZSA9PiAoZS5rZXkgPyBlLmtleSA9PT0gJ0VzY2FwZScgOiBlLndoaWNoID09PSAyNykpXG4gICAgICAgIC5tYXAoZSA9PiB7XG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIH0pLFxuICAgICAgS2VmaXIuZnJvbUV2ZW50cyh3aW5kb3csICdibHVyJyksXG4gICAgXSlcbiAgICAgIC50YWtlVW50aWxCeSh0aGlzLl9vbkNsb3NlKVxuICAgICAgLm9uVmFsdWUoKCkgPT4ge1xuICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICB9KTtcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe29wZW5lZDogdHJ1ZX0sICgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMub25EaWRPcGVuKSB0aGlzLnByb3BzLm9uRGlkT3BlbigpO1xuICAgICAgICByZXNvbHZlKCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICBjbG9zZSA9ICgpID0+IHtcbiAgICBpZiAoIXRoaXMuc3RhdGUub3BlbmVkKSByZXR1cm47XG4gICAgaWYgKHRoaXMucHJvcHMub25XaWxsQ2xvc2UpIHRoaXMucHJvcHMub25XaWxsQ2xvc2UoKTtcbiAgICB0aGlzLnNldFN0YXRlKHtvcGVuZWQ6IGZhbHNlLCBwb3BwZXJFbDogdW5kZWZpbmVkfSwgKCkgPT4ge1xuICAgICAgaWYgKHRoaXMucHJvcHMub25EaWRDbG9zZSkgdGhpcy5wcm9wcy5vbkRpZENsb3NlKCk7XG4gICAgfSk7XG4gICAgdGhpcy5fb25DbG9zZS5lbWl0KCk7XG4gIH07XG5cbiAgdG9nZ2xlID0gKCkgPT4ge1xuICAgIGlmICh0aGlzLnN0YXRlLm9wZW5lZCkge1xuICAgICAgdGhpcy5jbG9zZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm9wZW4oKTtcbiAgICB9XG4gIH07XG5cbiAgcmVwb3NpdGlvbiA9ICgpID0+IHtcbiAgICAvLyBub29wIGZvciBub3dcbiAgfTtcblxuICBfb25Db250ZXh0TWVudSA9IChlOiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMuZGlzYWJsZWQpIHJldHVybjtcblxuICAgIGlmICh0aGlzLnByb3BzLnR5cGUgPT09ICdjb250ZXh0Jykge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICB0aGlzLnRvZ2dsZSgpO1xuICAgIH1cbiAgfTtcblxuICBfb25Nb3VzZURvd24gPSAoZTogTW91c2VFdmVudCkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLmRpc2FibGVkKSByZXR1cm47XG5cbiAgICBpZiAoZS5idXR0b24gIT09IDApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5wcm9wcy50eXBlID09PSAnbm9ybWFsJykge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICB0aGlzLnRvZ2dsZSgpO1xuICAgIH1cbiAgfTtcblxuICBfb25LZXlQcmVzcyA9IChlOiBLZXlib2FyZEV2ZW50KSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMuZGlzYWJsZWQpIHJldHVybjtcblxuICAgIGlmICh0aGlzLnByb3BzLnR5cGUgPT09ICdub3JtYWwnKSB7XG4gICAgICBpZiAoZS5rZXkgPT09ICdFbnRlcicgfHwgZS5rZXkgPT09ICcgJykge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHRoaXMudG9nZ2xlKCk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgIHRoaXMuX29uQ2xvc2UuZW1pdCgpO1xuICB9XG5cbiAgc2V0UG9wcGVyRWwgPSBwb3BwZXJFbCA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7cG9wcGVyRWx9KTtcbiAgfTtcblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge21lbnUsIHBvc2l0aW9uT3B0aW9ucywgY2hpbGRyZW59ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB7b3BlbmVkfSA9IHRoaXMuc3RhdGU7XG5cbiAgICBpZiAodGhpcy5wcm9wcy50eXBlID09PSAnbm9ybWFsJykge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPFRyaWdnZXJOb3JtYWxcbiAgICAgICAgICBwb3NpdGlvbk9wdGlvbnM9e3Bvc2l0aW9uT3B0aW9uc31cbiAgICAgICAgICByZW5kZXJCdXR0b249e2NoaWxkcmVufVxuICAgICAgICAgIG9wZW5lZD17b3BlbmVkfVxuICAgICAgICAgIG9uS2V5UHJlc3M9e3RoaXMuX29uS2V5UHJlc3N9XG4gICAgICAgICAgb25Nb3VzZURvd249e3RoaXMuX29uTW91c2VEb3dufVxuICAgICAgICAgIG9uQ29udGV4dE1lbnU9e3RoaXMuX29uQ29udGV4dE1lbnV9XG4gICAgICAgICAgbWVudT17XG4gICAgICAgICAgICA8TWVudUxpc3RJbnNwZWN0b3Igb25JdGVtQ2hvc2VuPXt0aGlzLmNsb3NlfT5cbiAgICAgICAgICAgICAge21lbnV9XG4gICAgICAgICAgICA8L01lbnVMaXN0SW5zcGVjdG9yPlxuICAgICAgICAgIH1cbiAgICAgICAgICBzZXRQb3BwZXJFbGVtZW50PXt0aGlzLnNldFBvcHBlckVsfVxuICAgICAgICAgIHBvcHBlckVsZW1lbnQ9e3RoaXMuc3RhdGUucG9wcGVyRWx9XG4gICAgICAgIC8+XG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8VHJpZ2dlckNvbnRleHRcbiAgICAgICAgICBwb3NpdGlvbk9wdGlvbnM9e3Bvc2l0aW9uT3B0aW9uc31cbiAgICAgICAgICByZW5kZXJCdXR0b249e2NoaWxkcmVufVxuICAgICAgICAgIG9wZW5lZD17b3BlbmVkfVxuICAgICAgICAgIG9uS2V5UHJlc3M9e3RoaXMuX29uS2V5UHJlc3N9XG4gICAgICAgICAgb25Nb3VzZURvd249e3RoaXMuX29uTW91c2VEb3dufVxuICAgICAgICAgIG9uQ29udGV4dE1lbnU9e3RoaXMuX29uQ29udGV4dE1lbnV9XG4gICAgICAgICAgbWVudT17XG4gICAgICAgICAgICA8TWVudUxpc3RJbnNwZWN0b3Igb25JdGVtQ2hvc2VuPXt0aGlzLmNsb3NlfT5cbiAgICAgICAgICAgICAge21lbnV9XG4gICAgICAgICAgICA8L01lbnVMaXN0SW5zcGVjdG9yPlxuICAgICAgICAgIH1cbiAgICAgICAgICBzZXRQb3BwZXJFbGVtZW50PXt0aGlzLnNldFBvcHBlckVsfVxuICAgICAgICAgIHBvcHBlckVsZW1lbnQ9e3RoaXMuc3RhdGUucG9wcGVyRWx9XG4gICAgICAgIC8+XG4gICAgICApO1xuICAgIH1cbiAgfVxufVxuXG5jb25zdCBUcmlnZ2VyTm9ybWFsID0gKHtcbiAgcG9zaXRpb25PcHRpb25zLFxuICByZW5kZXJCdXR0b24sXG4gIG9wZW5lZCxcbiAgb25LZXlQcmVzcyxcbiAgb25Nb3VzZURvd24sXG4gIG9uQ29udGV4dE1lbnUsXG4gIG1lbnUsXG4gIHBvcHBlckVsZW1lbnQsXG4gIHNldFBvcHBlckVsZW1lbnQsXG59OiBUcmlnZ2VyUHJvcHMpID0+IHtcbiAgY29uc3QgW3JlZmVyZW5jZUVsZW1lbnQsIHNldFJlZmVyZW5jZUVsZW1lbnRdID0gUmVhY3QudXNlU3RhdGUobnVsbCk7XG4gIGNvbnN0IHtzdHlsZXMsIGF0dHJpYnV0ZXN9ID0gdXNlUG9wcGVyKFxuICAgIHJlZmVyZW5jZUVsZW1lbnQsXG4gICAgcG9wcGVyRWxlbWVudCxcbiAgICBwb3BwZXJPcHRpb25zKHBvc2l0aW9uT3B0aW9ucylcbiAgKTtcblxuICByZXR1cm4gKFxuICAgIDw+XG4gICAgICA8ZGl2XG4gICAgICAgIHJlZj17c2V0UmVmZXJlbmNlRWxlbWVudH1cbiAgICAgICAgb25LZXlQcmVzcz17b25LZXlQcmVzc31cbiAgICAgICAgb25Nb3VzZURvd249e29uTW91c2VEb3dufVxuICAgICAgICBvbkNvbnRleHRNZW51PXtvbkNvbnRleHRNZW51fVxuICAgICAgPlxuICAgICAgICB7cmVuZGVyQnV0dG9ufVxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxCZyBhY3RpdmU9e29wZW5lZH0gLz5cblxuICAgICAge29wZW5lZCA/IChcbiAgICAgICAgPFBvcnRhbD5cbiAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICByZWY9e3NldFBvcHBlckVsZW1lbnR9XG4gICAgICAgICAgICBzdHlsZT17c3R5bGVzLnBvcHBlcn1cbiAgICAgICAgICAgIHsuLi5hdHRyaWJ1dGVzLnBvcHBlcn1cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7bWVudX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9Qb3J0YWw+XG4gICAgICApIDogbnVsbH1cbiAgICA8Lz5cbiAgKTtcbn07XG5cbmNvbnN0IFRyaWdnZXJDb250ZXh0ID0gKHtcbiAgcG9zaXRpb25PcHRpb25zLFxuICByZW5kZXJCdXR0b24sXG4gIG9wZW5lZCxcbiAgb25LZXlQcmVzcyxcbiAgb25Nb3VzZURvd24sXG4gIG9uQ29udGV4dE1lbnUsXG4gIG1lbnUsXG4gIHBvcHBlckVsZW1lbnQsXG4gIHNldFBvcHBlckVsZW1lbnQsXG59OiBUcmlnZ2VyUHJvcHMpID0+IHtcbiAgY29uc3Qge3N0eWxlcywgYXR0cmlidXRlcywgdXBkYXRlfSA9IHVzZVBvcHBlcihcbiAgICB2aXJ0dWFsRWxlbWVudCxcbiAgICBwb3BwZXJFbGVtZW50LFxuICAgIHBvcHBlck9wdGlvbnMocG9zaXRpb25PcHRpb25zLCB0cnVlKVxuICApO1xuXG4gIHJldHVybiAoXG4gICAgPD5cbiAgICAgIDxkaXZcbiAgICAgICAgb25LZXlQcmVzcz17b25LZXlQcmVzc31cbiAgICAgICAgb25Nb3VzZURvd249e29uTW91c2VEb3dufVxuICAgICAgICBvbkNvbnRleHRNZW51PXtlID0+IHtcbiAgICAgICAgICB2aXJ0dWFsRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QgPSBnZW5lcmF0ZUdldEJvdW5kaW5nQ2xpZW50UmVjdChcbiAgICAgICAgICAgIGUuY2xpZW50WCxcbiAgICAgICAgICAgIGUuY2xpZW50WVxuICAgICAgICAgICk7XG5cbiAgICAgICAgICBpZiAodXBkYXRlKSB7XG4gICAgICAgICAgICB1cGRhdGUoKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBvbkNvbnRleHRNZW51KGUpO1xuICAgICAgICB9fVxuICAgICAgPlxuICAgICAgICB7cmVuZGVyQnV0dG9ufVxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxCZyBhY3RpdmU9e29wZW5lZH0gLz5cblxuICAgICAge29wZW5lZCA/IChcbiAgICAgICAgPFBvcnRhbD5cbiAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICByZWY9e3NldFBvcHBlckVsZW1lbnR9XG4gICAgICAgICAgICBzdHlsZT17c3R5bGVzLnBvcHBlcn1cbiAgICAgICAgICAgIHsuLi5hdHRyaWJ1dGVzLnBvcHBlcn1cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7bWVudX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9Qb3J0YWw+XG4gICAgICApIDogbnVsbH1cbiAgICA8Lz5cbiAgKTtcbn07XG5cbmNvbnN0IHBvcHBlck9wdGlvbnMgPSAocGxhY2VtZW50LCBmb3JDb250ZXh0TWVudSA9IGZhbHNlKSA9PiAoe1xuICBwbGFjZW1lbnQsXG4gIG1vZGlmaWVyczogW1xuICAgIHtuYW1lOiAnb2Zmc2V0Jywgb3B0aW9uczoge29mZnNldDogZm9yQ29udGV4dE1lbnUgPyBbMCwgMl0gOiBbXX19LFxuICAgIHtuYW1lOiAncHJldmVudE92ZXJmbG93Jywgb3B0aW9uczoge3BhZGRpbmc6IDV9fSxcbiAgXSxcbiAgc3RyYXRlZ3k6ICdmaXhlZCcsXG59KTtcblxuZnVuY3Rpb24gZ2VuZXJhdGVHZXRCb3VuZGluZ0NsaWVudFJlY3QoeCA9IDAsIHkgPSAwKSB7XG4gIHJldHVybiAoKSA9PiAoe1xuICAgIHdpZHRoOiAwLFxuICAgIGhlaWdodDogMCxcbiAgICB0b3A6IHksXG4gICAgbGVmdDogeCxcbiAgICBib3R0b206IHksXG4gICAgcmlnaHQ6IHgsXG4gIH0pO1xufVxuXG5jb25zdCB2aXJ0dWFsRWxlbWVudCA9IHtcbiAgZ2V0Qm91bmRpbmdDbGllbnRSZWN0OiBnZW5lcmF0ZUdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLFxufTtcblxuY29uc3QgQmcgPSAoe2FjdGl2ZX06IHthY3RpdmU6IGJvb2xlYW59KSA9PiAoXG4gIDxkaXZcbiAgICBzdHlsZT17e1xuICAgICAgZGlzcGxheTogYWN0aXZlID8gJ2Jsb2NrJyA6ICdub25lJyxcbiAgICAgIHBvc2l0aW9uOiAnZml4ZWQnLFxuICAgICAgdG9wOiAwLFxuICAgICAgbGVmdDogMCxcbiAgICAgIHJpZ2h0OiAwLFxuICAgICAgYm90dG9tOiAwLFxuICAgIH19XG4gIC8+XG4pO1xuIl19