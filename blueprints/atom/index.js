module.exports = {
  description: 'Generates the basic requirements for running an Ember CLI app in Atom shell',

  normalizeEntityName: function() {
    // this prevents an error when the entityName is
    // not specified (since that doesn't actually matter
    // to us
  },

  locals: function(options) {
    return {
      modulePrefix: options.project.pkg.name
    };
  },

  afterInstall: function () {
    var os = require('os');
    return this.insertIntoFile('.gitignore', ['dist-atom-shell' + os.EOL + 'atom-shell.json']);
  }
};
