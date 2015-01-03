import Ember from 'ember';
import { initialize } from 'ember-atom-shell/initializers/atom-shell-events';

var container, application;

module('AtomShellEventsInitializer', {
  setup: function() {
    Ember.run(function() {
      container = new Ember.Container();
      application = Ember.Application.create();
      application.deferReadiness();
    });
  }
});

// Replace this with your real tests.
test('it works', function() {
  initialize(container, application);

  // you would normally confirm the results of the initializer here
  ok(true);
});

