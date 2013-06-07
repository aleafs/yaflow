/* vim: set expandtab tabstop=2 shiftwidth=2 foldmethod=marker: */

"use strict";

var should = require('should');
var yaflow = require(__dirname + '/../');

describe('yaflow interface', function () {

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

});
