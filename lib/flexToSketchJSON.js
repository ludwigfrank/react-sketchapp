'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _renderers = require('./renderers');

var _renderers2 = _interopRequireDefault(_renderers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var flexToSketchJSON = function flexToSketchJSON(node) {
  var type = node.type,
      style = node.style,
      textStyle = node.textStyle,
      layout = node.layout,
      props = node.props,
      children = node.children;

  var Renderer = _renderers2.default[type];
  if (Renderer == null) {
    // Give some insight as to why there might be issues
    // specific to Page and Document components or SVG components
    var additionalNotes = '';
    if (type === 'document') {
      additionalNotes = '\nBe sure to only have <Page> components as children of <Document>.';
    } else if (type.indexOf('svg') === 0) {
      // the svg renderer should stop the walk down the tree so it shouldn't happen
      additionalNotes = '\nBe sure to always have <Svg.*> components as children of <Svg>.';
    }
    throw new Error('Could not find renderer for type \'' + type + '\'. ' + additionalNotes);
  }

  var renderer = new Renderer();
  var groupLayer = renderer.renderGroupLayer(layout, style, textStyle, props);
  var backingLayers = renderer.renderBackingLayers(layout, style, textStyle, props, children);

  // stopping the walk down the tree if we have an svg
  var sublayers = type !== 'svg' ? children.map(function (child) {
    return flexToSketchJSON(child);
  }) : [];

  // Filter out anything null, undefined
  var layers = [].concat(_toConsumableArray(backingLayers), _toConsumableArray(sublayers)).filter(function (l) {
    return l;
  });

  return _extends({}, groupLayer, { layers: layers });
};

exports.default = flexToSketchJSON;