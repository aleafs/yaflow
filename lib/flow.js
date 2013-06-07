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

  _me.execute = function () {

    var idx = 0;
    var arg = Array.prototype.slice.call(arguments);
    var frame;
    var next = function () {
      frame = stack[idx++];
      if (!frame) {
        return;
      }
      frame.apply(null, arg.concat(next));
    };
    next();
  };

  return _me;
};

