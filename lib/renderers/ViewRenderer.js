'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _sketchConstants = require('sketch-constants');

var _SketchRenderer2 = require('./SketchRenderer');

var _SketchRenderer3 = _interopRequireDefault(_SketchRenderer2);

var _models = require('../jsonUtils/models');

var _shapeLayers = require('../jsonUtils/shapeLayers');

var _style = require('../jsonUtils/style');

var _hasAnyDefined = require('../utils/hasAnyDefined');

var _hasAnyDefined2 = _interopRequireDefault(_hasAnyDefined);

var _same = require('../utils/same');

var _same2 = _interopRequireDefault(_same);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DEFAULT_BORDER_COLOR = 'transparent';
var DEFAULT_BORDER_STYLE = 'solid';

var DEFAULT_BACKGROUND_COLOR = 'transparent';

var VISIBLE_STYLES = ['shadowColor', 'shadowOffset', 'shadowOpacity', 'shadowRadius', 'shadowSpread', 'backgroundColor', 'borderColor', 'borderTopColor', 'borderRightColor', 'borderBottomColor', 'borderLeftColor', 'borderStyle', 'borderTopStyle', 'borderRightStyle', 'borderBottomStyle', 'borderLeftStyle', 'borderWidth', 'borderTopWidth', 'borderRightWidth', 'borderBottomWidth', 'borderLeftWidth'];

var OVERFLOW_STYLES = ['overflow', 'overflowX', 'overflowY'];

var SHADOW_STYLES = ['shadowColor', 'shadowOffset', 'shadowOpacity', 'shadowRadius'];

var ViewRenderer = function (_SketchRenderer) {
  _inherits(ViewRenderer, _SketchRenderer);

  function ViewRenderer() {
    _classCallCheck(this, ViewRenderer);

    return _possibleConstructorReturn(this, (ViewRenderer.__proto__ || Object.getPrototypeOf(ViewRenderer)).apply(this, arguments));
  }

  _createClass(ViewRenderer, [{
    key: 'getDefaultGroupName',
    value: function getDefaultGroupName() {
      return 'View';
    }
  }, {
    key: 'renderBackingLayers',
    value: function renderBackingLayers(layout, style, textStyle,
    // eslint-disable-next-line no-unused-vars
    props) {
      var layers = [];
      // NOTE(lmr): the group handles the position, so we just care about width/height here
      var _style$borderTopWidth = style.borderTopWidth,
          borderTopWidth = _style$borderTopWidth === undefined ? 0 : _style$borderTopWidth,
          _style$borderRightWid = style.borderRightWidth,
          borderRightWidth = _style$borderRightWid === undefined ? 0 : _style$borderRightWid,
          _style$borderBottomWi = style.borderBottomWidth,
          borderBottomWidth = _style$borderBottomWi === undefined ? 0 : _style$borderBottomWi,
          _style$borderLeftWidt = style.borderLeftWidth,
          borderLeftWidth = _style$borderLeftWidt === undefined ? 0 : _style$borderLeftWidt,
          _style$borderTopLeftR = style.borderTopLeftRadius,
          borderTopLeftRadius = _style$borderTopLeftR === undefined ? 0 : _style$borderTopLeftR,
          _style$borderTopRight = style.borderTopRightRadius,
          borderTopRightRadius = _style$borderTopRight === undefined ? 0 : _style$borderTopRight,
          _style$borderBottomRi = style.borderBottomRightRadius,
          borderBottomRightRadius = _style$borderBottomRi === undefined ? 0 : _style$borderBottomRi,
          _style$borderBottomLe = style.borderBottomLeftRadius,
          borderBottomLeftRadius = _style$borderBottomLe === undefined ? 0 : _style$borderBottomLe,
          _style$borderTopColor = style.borderTopColor,
          borderTopColor = _style$borderTopColor === undefined ? DEFAULT_BORDER_COLOR : _style$borderTopColor,
          _style$borderRightCol = style.borderRightColor,
          borderRightColor = _style$borderRightCol === undefined ? DEFAULT_BORDER_COLOR : _style$borderRightCol,
          _style$borderBottomCo = style.borderBottomColor,
          borderBottomColor = _style$borderBottomCo === undefined ? DEFAULT_BORDER_COLOR : _style$borderBottomCo,
          _style$borderLeftColo = style.borderLeftColor,
          borderLeftColor = _style$borderLeftColo === undefined ? DEFAULT_BORDER_COLOR : _style$borderLeftColo,
          _style$borderTopStyle = style.borderTopStyle,
          borderTopStyle = _style$borderTopStyle === undefined ? DEFAULT_BORDER_STYLE : _style$borderTopStyle,
          _style$borderRightSty = style.borderRightStyle,
          borderRightStyle = _style$borderRightSty === undefined ? DEFAULT_BORDER_STYLE : _style$borderRightSty,
          _style$borderBottomSt = style.borderBottomStyle,
          borderBottomStyle = _style$borderBottomSt === undefined ? DEFAULT_BORDER_STYLE : _style$borderBottomSt,
          _style$borderLeftStyl = style.borderLeftStyle,
          borderLeftStyle = _style$borderLeftStyl === undefined ? DEFAULT_BORDER_STYLE : _style$borderLeftStyl;


      if (!(0, _hasAnyDefined2.default)(style, VISIBLE_STYLES)) {
        return layers;
      }

      var backgroundColor = style.backgroundColor || DEFAULT_BACKGROUND_COLOR;

      var frame = (0, _models.makeRect)(0, 0, layout.width, layout.height);
      var radii = [borderTopLeftRadius, borderTopRightRadius, borderBottomRightRadius, borderBottomLeftRadius];
      var shapeLayer = (0, _shapeLayers.makeRectShapeLayer)(0, 0, layout.width, layout.height, radii, props.resizingConstraint);

      var fill = (0, _models.makeColorFill)(backgroundColor);
      var content = (0, _shapeLayers.makeShapeGroup)(frame, [shapeLayer], [fill]);

      if (props.shadowGroup) {
        var shadows = [];
        props.shadowGroup.map(function (shadowStyle) {
          return shadows.push((0, _style.makeShadow)(shadowStyle));
        });
        content.style.shadows = shadows;
      } else if ((0, _hasAnyDefined2.default)(style, SHADOW_STYLES)) {
        var shadow = [(0, _style.makeShadow)(style)];
        if (style.shadowInner) {
          content.style.innerShadows = shadow;
        } else {
          content.style.shadows = shadow;
        }
      }

      if ((0, _hasAnyDefined2.default)(style, OVERFLOW_STYLES)) {
        if (style.overflow === 'hidden' || style.overflow === 'scroll' || style.overflowX === 'hidden' || style.overflowX === 'scroll' || style.overflowY === 'hidden' || style.overflowY === 'scroll') {
          content.hasClippingMask = true;
        }
      }

      if ((0, _same2.default)(borderTopWidth, borderRightWidth, borderBottomWidth, borderLeftWidth) && (0, _same2.default)(borderTopColor, borderRightColor, borderBottomColor, borderLeftColor) && (0, _same2.default)(borderTopStyle, borderRightStyle, borderBottomStyle, borderLeftStyle)) {
        // all sides have same border width
        // in this case, we can do everything with just a single shape.
        if (borderTopStyle !== undefined) {
          var borderOptions = (0, _style.makeBorderOptions)(borderTopStyle, borderTopWidth);
          if (borderOptions) {
            content.style.borderOptions = borderOptions;
          }
        }

        if (borderTopWidth > 0) {
          content.style.borders = [{
            _class: 'border',
            isEnabled: true,
            color: (0, _models.makeColorFromCSS)(borderTopColor),
            fillType: _sketchConstants.FillType.Solid,
            position: _sketchConstants.BorderPosition.Inside,
            thickness: borderTopWidth
          }];
        }
        layers.push(content);
      } else {
        content.hasClippingMask = true;
        layers.push(content);

        if (borderTopWidth > 0) {
          var topBorder = (0, _style.makeHorizontalBorder)(0, 0, layout.width, borderTopWidth, borderTopColor);
          topBorder.name = 'Border (top)';

          var _borderOptions = (0, _style.makeBorderOptions)(borderTopStyle, borderTopWidth);
          if (_borderOptions) {
            topBorder.style.borderOptions = _borderOptions;
          }

          layers.push(topBorder);
        }

        if (borderRightWidth > 0) {
          var rightBorder = (0, _style.makeVerticalBorder)(layout.width - borderRightWidth, 0, layout.height, borderRightWidth, borderRightColor);
          rightBorder.name = 'Border (right)';

          var _borderOptions2 = (0, _style.makeBorderOptions)(borderRightStyle, borderRightWidth);
          if (_borderOptions2) {
            rightBorder.style.borderOptions = _borderOptions2;
          }

          layers.push(rightBorder);
        }

        if (borderBottomWidth > 0) {
          var bottomBorder = (0, _style.makeHorizontalBorder)(0, layout.height - borderBottomWidth, layout.width, borderBottomWidth, borderBottomColor);
          bottomBorder.name = 'Border (bottom)';

          var _borderOptions3 = (0, _style.makeBorderOptions)(borderBottomStyle, borderBottomWidth);
          if (_borderOptions3) {
            bottomBorder.style.borderOptions = _borderOptions3;
          }

          layers.push(bottomBorder);
        }

        if (borderLeftWidth > 0) {
          var leftBorder = (0, _style.makeVerticalBorder)(0, 0, layout.height, borderLeftWidth, borderLeftColor);
          leftBorder.name = 'Border (left)';

          var _borderOptions4 = (0, _style.makeBorderOptions)(borderLeftStyle, borderLeftWidth);
          if (_borderOptions4) {
            leftBorder.style.borderOptions = _borderOptions4;
          }

          layers.push(leftBorder);
        }

        // TODO(lmr): how do we do transform in this case?
      }
      return layers;
    }
  }]);

  return ViewRenderer;
}(_SketchRenderer3.default);

module.exports = ViewRenderer;