(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.guid = factory();
  }
}(this, function () {
var counter = 0;

function next() {
  return ++counter;
}

return next;
}));
