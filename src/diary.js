(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['./guid'], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory(require('./guid'));
    } else {
        root.Diary = factory(root.guid);
  }
}(this, function (guid) {

function Diary(group) {
  this.group = group;
}

Diary.prototype.log = function(level, group, message, endOf) {
  endOf = endOf || false;
  var id = guid();
  var message = {
    level: level,
    group: group,
    message: message,
    timestamp: Date.now(),
    guid: id
  };

  if (endOf) {
    message.endOf = endOf;
  }

  Diary.reporters.forEach(function(target) {

    var config = target.config;
    var reporter = target.reporter;

    if ((config.level.indexOf('*') !== -1 || config.level.indexOf(level) !== -1)
        &&
        (config.group.indexOf('*') !== -1 || config.group.indexOf(group) !== -1)
       ) {

      reporter.receive(message);
    }

  });

  if (this.isTiming) {
    this.isTiming = false;

    return function(message) {
      return this.log(level, group, message, id);
    }.bind(this);
  }
};

Object.defineProperty(Diary.prototype, 'start', {
  get: function() {
    this.isTiming = true;
    return this;
  }
});

/**
 * Factory method for convenient logger construction.
 */
Diary.logger = function(group) {
  return new Diary(group);
};

Diary.reporters = [];

/**
 * Register a reporter.
 */
Diary.reporter = function(reporter, config) {
  config = config || {};
  var settings = { level: ['*'], group: ['*'] };
  for (var setting in config) {
    if (config.hasOwnProperty(setting)) {
      settings[setting] = config[setting]; 
    }
  }

  var newReporter = {
    reporter: reporter,
    config: settings
  };

  Diary.reporters.push(newReporter);
  
  return function() {
    Diary.reporters.splice(Diary.reporters.indexOf(newReporter), 1);
  };
};


/**
 * Dynamically construct all of the log level functions.
 */

['info', 'warn', 'fatal', 'error'].forEach(function(level) {
  Diary.prototype[level] = function(message) {
    return this.log(level, this.group, message);
  };
});

return { Diary: Diary };

}));
