[![Build Status](https://travis-ci.org/aleafs/yaflow.png?branch=master)](https://travis-ci.org/aleafs/yaflow)
[![Coverage Status](https://coveralls.io/repos/aleafs/yaflow/badge.png)](https://coveralls.io/r/aleafs/yaflow)
[![Dependency Status](https://gemnasium.com/aleafs/yaflow.png)](https://gemnasium.com/aleafs/yaflow)

### About

`yaflow` is yet another flow control module for Node.js. 

### Usage

```javascript

var flow = require('yaflow').create();

flow.use(function (req, res, next, stop) {
  process.nextTick(function () {
	next();
  });
});

flow.use(function (req, res, next, stop) {
  // ...
});

flow.execute(req, res, function () {
  console.log(res);
});

```

### License

MIT
