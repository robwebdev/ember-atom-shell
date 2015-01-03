import Ember from 'ember';

export default Ember.Mixin.create({
  onAcceleratorKeyPress: function (key) {
    var handler = this.get('accelerators.%@'.fmt(key));
    if (handler) {
      handler.call(this);
    }
  },

  bindToAcceleratorKeyPress: function () {
    var view = this;
    var listener;

    Ember.$(window).on('acceleratorKeyPress', function listener (e, key) {
      Ember.run(function () {
        view.onAcceleratorKeyPress(key);
      });
    });

    this.set('acceleratorKeyPressListener', listener);
  }.on('willInsertElement'),

  unbindFromAcceleratorKeyPress: function () {
      Ember.$(window).off('acceleratorKeyPress', this.get('acceleratorKeyPressListener'));
      this.set('acceleratorKeyPressListener', null);
  }.on('willDestroyElement')
});
