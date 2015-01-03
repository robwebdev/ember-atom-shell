export function initialize(/* container, application */) {
  if (!window.atom_require) {
    return;
  }

  window.atom_require('ipc').on('acceleratorKeyPress', function(key) {
    Ember.$(window).trigger('acceleratorKeyPress', key);
  });

};

export default {
  name: 'atom-shell-events',
  initialize: initialize
};
