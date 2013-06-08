/* vim: set expandtab tabstop=2 shiftwidth=2 foldmethod=marker: */

"use strict";

var should = require('should');
var yaflow = require(__dirname + '/../');

describe('yaflow interface', function () {

  /* {{{ should_flow_works_fine() */
  it('should_flow_works_fine', function (done) {
    var flow = yaflow.create();
    flow.use(function (a, next) {
      a.should.not.have.property('b');
      a.b = 'B';
      process.nextTick(next);
    });
    flow.use(function (a, next) {
      a.c = 'C';
      a.should.have.property('b', 'B');
      next();
    }).use(function (a) {
      a.should.eql({'b' : 'B', 'c' : 'C'});
      done();
    }).execute({});
  });
  /* }}} */

  /* {{{ should_stop_works_fine() */
  it('should_stop_works_fine', function (done) {
    var flow = yaflow.create();
    flow.use(function (a, next, stop) {
      process.nextTick(function () {
        a.push('a');
        next();
      });
    }).use(function (a, next, stop) {
      process.nextTick(function () {
        a.push('b');
        stop();
      });
    }).use(function (a, next, stop) {
      throw new Error('ShouldNotBeExecute');
    });

    flow.execute([1], function (data) {
      data.should.eql([1, 'a', 'b']);
      done();
    });
  });
  /* }}} */

  it('should_empty_stack_works_fine', function (done) {
    var flow = yaflow.create();
    flow.execute({'a' : 1}, function (res) {
      res.should.eql({'a' : 1});
      done();
    });
  });

});
