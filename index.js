'use strict';

module.exports = {
  name: 'ember-atom-shell',

  contentFor: function (type, config) {
    if (type === 'head') {
      /**
        This is the only opprotunity we get to shim a few things
        before the Ember app is initialsed
      */
      return  '<script type="text/javascript">' +
              ' if (window.process && window.process.versions["atom-shell"]) {' +
              ' require("./ember-atom-shell/shim")(window, "' + config.modulePrefix + '");' +
              ' }' +
              '</script>';
    }
  },

  includedCommands: function() {
    return {
      'atom-shell': require('./lib/commands/atom-shell')
    };
  }
};
