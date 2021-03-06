'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _models = require('../jsonUtils/models');

var _SketchRenderer2 = require('./SketchRenderer');

var _SketchRenderer3 = _interopRequireDefault(_SketchRenderer2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ArtboardRenderer = function (_SketchRenderer) {
  _inherits(ArtboardRenderer, _SketchRenderer);

  function ArtboardRenderer() {
    _classCallCheck(this, ArtboardRenderer);

    return _possibleConstructorReturn(this, (ArtboardRenderer.__proto__ || Object.getPrototypeOf(ArtboardRenderer)).apply(this, arguments));
  }

  _createClass(ArtboardRenderer, [{
    key: 'renderGroupLayer',
    value: function renderGroupLayer(layout, style, textStyle, props) {
      var color = void 0;
      if (style.backgroundColor !== undefined) {
        color = (0, _models.makeColorFromCSS)(style.backgroundColor);
      }

      return {
        _class: 'artboard',
        do_objectID: (0, _models.generateID)(),
        frame: (0, _models.makeRect)(layout.left, layout.top, layout.width, layout.height),
        // "layerListExpandedType": 0,
        name: props.name || 'Artboard',
        nameIsFixed: props.name !== undefined,
        // "layers": [],
        isVisible: true,
        backgroundColor: color || (0, _models.makeColorFromCSS)('white'),
        hasBackgroundColor: color !== undefined
      };
    }
  }]);

  return ArtboardRenderer;
}(_SketchRenderer3.default);

module.exports = ArtboardRenderer;