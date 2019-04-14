const { getDom } = require("./dom");

(module.exports.fetch = async function() {
  return {
    json: async () => {
      return [{}, {}];
    }
  };
}),

  (module.exports.customEvent = function(value) {
    return {
      target: {
        value: value
      }
    };
  });

  module.exports.getDom = getDom;
