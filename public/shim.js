/**
  Some shimming is required before the Ember app is bootstrapped.
  - Avoid window.require naming collision
  - Set locationType to 'hash' in enviroment config
  - Remove <base> element
*/
module.exports = function (window, modulePrefix) {
  /**
    atom-shell's 'require' conflicts with ember's require(js)
  */
  window.atom_require = window.require;
  delete window.require;
  delete window.module;

  /**
    locationType auto breaks the Atom app. The browser supports
    html5 pushState but it breaks possibly due to the app
    index.html file being served over the file:// protocol.

    Ember CLI injects the enviroment config into the page as an escaped
    JSON string into the content attribute of a meta tag.
  */
  var metaEls = window.document.getElementsByTagName("meta");
  var configEl = metaEls[modulePrefix + '/config/environment'];
  var config = JSON.parse(unescape(configEl.content));
  config.locationType = 'hash';
  configEl.content = escape(JSON.stringify(config));

  /**
    Also need to remove the <base> element so that assets
    are served correctly.
  */
  var baseEl = window.document.getElementsByTagName("base")[0];
  if (baseEl) {
    document.head.removeChild(baseEl);
  }
};
