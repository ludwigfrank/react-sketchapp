'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _stylesheet = require('../stylesheet');

var _stylesheet2 = _interopRequireDefault(_stylesheet);

var _ViewStylePropTypes = require('./ViewStylePropTypes');

var _ViewStylePropTypes2 = _interopRequireDefault(_ViewStylePropTypes);

var _ResizingConstraintPropTypes = require('./ResizingConstraintPropTypes');

var _ResizingConstraintPropTypes2 = _interopRequireDefault(_ResizingConstraintPropTypes);

var _ShadowGroupPropTypes = require('./ShadowGroupPropTypes');

var _ShadowGroupPropTypes2 = _interopRequireDefault(_ShadowGroupPropTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = {
  // TODO(lmr): do some nice warning stuff like RN does
  style: _propTypes2.default.oneOfType([_propTypes2.default.shape(_extends({}, _ViewStylePropTypes2.default)), _propTypes2.default.arrayOf(_propTypes2.default.oneOfType([_propTypes2.default.shape(_extends({}, _ViewStylePropTypes2.default)), _propTypes2.default.number])), _propTypes2.default.number]),
  name: _propTypes2.default.string,
  resizingConstraint: _propTypes2.default.shape(_extends({}, _ResizingConstraintPropTypes2.default)),
  shadowGroup: _propTypes2.default.arrayOf(_propTypes2.default.shape(_extends({}, _ShadowGroupPropTypes2.default))),
  children: _propTypes2.default.node
};

// $FlowFixMe

var View = function (_React$Component) {
  _inherits(View, _React$Component);

  function View() {
    _classCallCheck(this, View);

    return _possibleConstructorReturn(this, (View.__proto__ || Object.getPrototypeOf(View)).apply(this, arguments));
  }

  _createClass(View, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'view',
        {
          name: this.props.name,
          style: _stylesheet2.default.flatten(this.props.style),
          resizingConstraint: this.props.resizingConstraint,
          shadowGroup: this.props.shadowGroup
        },
        this.props.children
      );
    }
  }]);

  return View;
}(_react2.default.Component);

View.defaultProps = {
  name: 'View'
};


View.propTypes = propTypes;

module.exports = View;