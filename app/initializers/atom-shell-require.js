export function initialize(container, application) {
  if (window.atom_require) {
    container.register('require:main', window.atom_require, {instantiate: false, singleton: true});
    application.inject('route', 'require', 'require:main');
  }
};

export default {
  name: 'atom-shell-require',
  initialize: initialize
};
