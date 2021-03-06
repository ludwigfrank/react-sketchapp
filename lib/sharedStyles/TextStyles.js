'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _sketchappJsonPlugin = require('sketchapp-json-plugin');

var _hashStyle = require('../utils/hashStyle');

var _hashStyle2 = _interopRequireDefault(_hashStyle);

var _sharedTextStyles = require('../wrappers/sharedTextStyles');

var _sharedTextStyles2 = _interopRequireDefault(_sharedTextStyles);

var _hacksForJSONImpl = require('../jsonUtils/hacksForJSONImpl');

var _pick = require('../utils/pick');

var _pick2 = _interopRequireDefault(_pick);

var _constants = require('../utils/constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _styles = {};

var _byName = {};

var registerStyle = function registerStyle(name, style) {
  var safeStyle = (0, _pick2.default)(style, _constants.INHERITABLE_FONT_STYLES);
  var hash = (0, _hashStyle2.default)(safeStyle);
  var sketchStyle = (0, _hacksForJSONImpl.makeTextStyle)(safeStyle);
  var sharedObjectID = _sharedTextStyles2.default.addStyle(name, sketchStyle);

  // FIXME(gold): side effect :'(
  _byName[name] = hash;

  _styles[hash] = {
    cssStyle: safeStyle,
    name: name,
    sketchStyle: sketchStyle,
    sharedObjectID: sharedObjectID
  };
};

var create = function create(options, styles) {
  var clearExistingStyles = options.clearExistingStyles,
      context = options.context;


  if (!(0, _sketchappJsonPlugin.appVersionSupported)()) {
    return context.document.showMessage('💎 Requires Sketch 43+ 💎');
  }

  (0, _invariant2.default)(options && options.context, 'Please provide a context');

  _sharedTextStyles2.default.setContext(context);

  if (clearExistingStyles) {
    _styles = {};
    _sharedTextStyles2.default.setStyles([]);
  }

  Object.keys(styles).forEach(function (name) {
    return registerStyle(name, styles[name]);
  });

  return _styles;
};

var resolve = function resolve(style) {
  var hash = (0, _hashStyle2.default)(style);

  return _styles[hash];
};

var get = function get(name) {
  var hash = _byName[name];
  var style = _styles[hash];

  return style ? style.cssStyle : {};
};

var clear = function clear() {
  _styles = {};
  _sharedTextStyles2.default.setStyles([]);
};

var styles = function styles() {
  return _styles;
};

var TextStyles = {
  create: create,
  resolve: resolve,
  get: get,
  styles: styles,
  clear: clear
};

exports.default = TextStyles;