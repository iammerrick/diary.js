(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.ConsoleReporter = factory();
  }
}(this, function () {

function ConsoleReporter(options) {
  options = options || {};
  this.console = options.console || window.console;
}

ConsoleReporter.prototype.receive = function(log) {
  var processed = '['+log.level+'|'+log.group+'] '+log.message;

  if (log.level === 'fatal') {
    this.error(processed);
  } else {
    this[log.level](processed);
  }
}

ConsoleReporter.prototype.info = function (message) {
  this.console.info(message);
}

ConsoleReporter.prototype.warn = function (message) {
  this.console.warn(message);
}

ConsoleReporter.prototype.error = function (message) {
  this.console.error(message);
}

return { ConsoleReporter: ConsoleReporter };

}));
