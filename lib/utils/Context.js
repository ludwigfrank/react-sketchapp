"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Context = function () {
  function Context() {
    var styles = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Context);

    this.styles = styles;
    this.staged = [];
  }

  _createClass(Context, [{
    key: "addInheritableStyles",
    value: function addInheritableStyles(styles) {
      this.staged.push(styles);
    }
  }, {
    key: "forChildren",
    value: function forChildren() {
      if (this.staged.length === 0) {
        return new Context(this.styles);
      }
      var styles = Object.assign.apply(Object, [{}, this.styles].concat(_toConsumableArray(this.staged)));
      return new Context(styles);
    }
  }, {
    key: "getInheritedStyles",
    value: function getInheritedStyles() {
      return this.styles;
    }
  }]);

  return Context;
}();

exports.default = Context;