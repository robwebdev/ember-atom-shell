module.exports = {
  name: 'atom-shell',
  triggerBuild: function(commandOptions) {
    var BuildTask = this.tasks.Build;
    var buildTask = new BuildTask({
      ui: this.ui,
      analytics: this.analytics,
      project: this.project
    });

    commandOptions.outputPath = 'dist';
    return buildTask.run(commandOptions);
  },

  runCommand: function (options, rawArgs) {
    if (rawArgs[0] === 'package') {
      return this.package(options, rawArgs);
    } else {
      return this.exec(options, rawArgs);
    }
  },

  getConfig: function (platform) {
    if (!platform) {
      platform = process.platform;
    }
    var fs = require('fs');
    var launchPaths = {
      darwin: '/Contents/MacOS/Atom'
    };
    var config = JSON.parse(fs.readFileSync('atom-shell.json'));

    return {
      applicationName: config.applicationName,
      binaryPath: config.binaryPaths[platform],
      launchPath: config.binaryPaths[platform] + launchPaths[platform],
      iconPath: config.iconPaths[platform]
    };
  },

  exec: function (options, rawArgs) {
    var spawn = require('child_process').spawn;
    var RSVP = require('rsvp');
    var Promise = RSVP.Promise;
    var config = this.getConfig();

    return new Promise(function (resolve, reject) {
      var result = {
        output: [],
        errors: [],
        code: null
      };
      var child = spawn(config.launchPath, [options.outputPath]);

      child.stdout.on('data', function (data) {
        var string = data.toString();
        console.log(string);
        result.output.push(string);
      });

      child.stderr.on('data', function (data) {
        var string = data.toString();
        console.error(string);
        result.errors.push(string);
      });

      child.on('close', function (code) {
        result.code = code;

        if (code === 0) {
          resolve(result);
        } else {
          reject(result);
        }
      });
    });
  },

  package: function (options, rawArgs) {
    var fs = require('fs-extra');
    var config = this.getConfig();
    var RSVP = require('rsvp');
    var Promise = RSVP.Promise;

    return new Promise(function (resolve, reject) {
      fs.copySync(config.binaryPath, 'atom-shell-dist/' + config.applicationName + '.app');
      fs.copySync(options.outputPath, 'atom-shell-dist/' + config.applicationName + '.app/Contents/Resources/app');
      fs.copySync(config.iconPath, 'atom-shell-dist/' + config.applicationName + '.app/Contents/Resources/atom.icns');
      resolve();
    });
  },

  run: function (options, rawArgs) {
    var self = this;
    return this.triggerBuild(options)
      .then(function () {
        self.runCommand(options, rawArgs);
      });
  }
};
