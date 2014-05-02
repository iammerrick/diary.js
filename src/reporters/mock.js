(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.MockReporter = factory();
  }
}(this, function () {
  function MockReporter() {
    this.logs = [];
  }

  MockReporter.prototype.receive = function(log) {
    this.logs.push('['+log.level+'|'+log.group+'] '+log.message);
  }

  return { MockReporter: MockReporter };

}));
