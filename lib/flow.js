/* vim: set expandtab tabstop=2 shiftwidth=2 foldmethod=marker: */

"use strict";

exports.create = function () {

  var stack = [];

  var _me = {};

  _me.use = function (fn) {
    if ('function' === (typeof fn)) {
      stack.push(fn);
    }
    return _me;
  };

  _me.execute = function (/**<  arg1, arg2, ..., done */) {

    var index = 0;
    var input = Array.prototype.slice.call(arguments);

    var after = function () {};
    if ('function' === (typeof input[input.length - 1])) {
      after = input.pop();
    }

    var _stop = function () {
      index = input.length;
      after.apply(null, input);
    };

    (function _next() {
      var layer = stack[index++];
      if (!layer) {
        after.apply(null, input);
      } else {
        layer.apply(null, input.concat(_next, _stop));
      }
    })();
  };

  return _me;
};

