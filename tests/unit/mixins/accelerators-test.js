import Ember from 'ember';
import AcceleratorsMixin from 'ember-atom-shell/mixins/accelerators';

module('AcceleratorsMixin');

// Replace this with your real tests.
test('it works', function() {
  var AcceleratorsObject = Ember.Object.extend(AcceleratorsMixin);
  var subject = AcceleratorsObject.create();
  ok(subject);
});
