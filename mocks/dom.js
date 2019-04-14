const { JSDOM } = require('jsdom');

const getDom = () => {
  const jsdom = new JSDOM('<!doctype html><html><body></body></html>');
  const { window } = jsdom;
  const document = window.document;
  const navigator = {
    userAgent: 'node.js'
  };
  const requestAnimationFrame = (callback) => {
    return setTimeout(callback, 0);
  };
  const cancelAnimationFrame = function(id) {
    clearTimeout(id);
  };

  function extend(src, target) {
    console.log('getOwnPropertyDescriptors' in Object)
    Object.defineProperties(target, {
      ...Object.getOwnPropertyDescriptors(src),
      ...Object.getOwnPropertyDescriptors(target)
    });
  }

  return {
    window,
    document,
    navigator,
    requestAnimationFrame,
    cancelAnimationFrame,
    extend
  };
};

module.exports.getDom = getDom;
