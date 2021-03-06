'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeHorizontalBorder = exports.makeVerticalBorder = exports.makeShadow = exports.makeBorderOptions = undefined;

var _sketchConstants = require('sketch-constants');

var _models = require('../jsonUtils/models');

var _shapeLayers = require('../jsonUtils/shapeLayers');

var DEFAULT_SHADOW_COLOR = '#000';


var makeDashPattern = function makeDashPattern(style, width) {
  switch (style) {
    case 'dashed':
      return [width * 3, width * 3];
    case 'dotted':
      return [width, width];
    case 'solid':
      return [];
    default:
      return [];
  }
};

var makeBorderOptions = exports.makeBorderOptions = function makeBorderOptions(style, width) {
  return {
    _class: 'borderOptions',
    isEnabled: false,
    dashPattern: makeDashPattern(style, width),
    lineCapStyle: 0,
    lineJoinStyle: 0
  };
};

var makeShadow = exports.makeShadow = function makeShadow(style) {
  var opacity = style.shadowOpacity !== undefined ? style.shadowOpacity : 1;
  var color = style.shadowColor || style.color || DEFAULT_SHADOW_COLOR;
  var radius = style.shadowRadius !== undefined ? style.shadowRadius : 1;
  var _class = style.shadowInner !== undefined ? 'innerShadow' : 'shadow';
  var spread = style.shadowSpread !== undefined ? style.shadowSpread : 0;

  var _ref = style.shadowOffset || {},
      _ref$width = _ref.width,
      offsetX = _ref$width === undefined ? 0 : _ref$width,
      _ref$height = _ref.height,
      offsetY = _ref$height === undefined ? 0 : _ref$height;

  return {
    _class: _class,
    isEnabled: true,
    blurRadius: radius,
    color: (0, _models.makeColorFromCSS)(color, opacity),
    contextSettings: {
      _class: 'graphicsContextSettings',
      blendMode: 0,
      opacity: 1
    },
    offsetX: offsetX,
    offsetY: offsetY,
    spread: spread
  };
};

var makeVerticalBorder = exports.makeVerticalBorder = function makeVerticalBorder(x, y, length, thickness, color) {
  var frame = (0, _models.makeRect)(x, y, thickness, length);
  var shapeFrame = (0, _models.makeRect)(0, 0, thickness, length);
  var shapePath = (0, _shapeLayers.makeShapePath)(shapeFrame, (0, _shapeLayers.makeVerticalPath)());
  var content = (0, _shapeLayers.makeShapeGroup)(frame, [shapePath]);
  content.style.borders = [{
    _class: 'border',
    isEnabled: true,
    color: (0, _models.makeColorFromCSS)(color),
    fillType: 0,
    position: _sketchConstants.BorderPosition.Center,
    thickness: thickness
  }];
  return content;
};

var makeHorizontalBorder = exports.makeHorizontalBorder = function makeHorizontalBorder(x, y, length, thickness, color) {
  var frame = (0, _models.makeRect)(x, y, length, thickness);
  var shapeFrame = (0, _models.makeRect)(0, 0, length, thickness);
  var shapePath = (0, _shapeLayers.makeShapePath)(shapeFrame, (0, _shapeLayers.makeHorizontalPath)());
  var content = (0, _shapeLayers.makeShapeGroup)(frame, [shapePath]);
  content.style.borders = [{
    _class: 'border',
    isEnabled: true,
    color: (0, _models.makeColorFromCSS)(color),
    fillType: 0,
    position: _sketchConstants.BorderPosition.Center,
    thickness: thickness
  }];
  return content;
};