const sse = import('express-sse').then(mod => {
  return new mod.default;
});

module.exports = {
  sse
};