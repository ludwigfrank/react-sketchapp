'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _ViewStylePropTypes = require('./ViewStylePropTypes');

var _ViewStylePropTypes2 = _interopRequireDefault(_ViewStylePropTypes);

var _ResizeModePropTypes = require('./ResizeModePropTypes');

var _ResizeModePropTypes2 = _interopRequireDefault(_ResizeModePropTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _extends({}, _ViewStylePropTypes2.default, {
  resizeMode: _ResizeModePropTypes2.default
});