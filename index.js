function trekVars(options = {}) {
  return {
    postcssPlugin: 'postcss-trek-vars',
    Declaration(decl) {
      decl.value = replaceVars(decl.value);
    }
  }
  
  function replaceVars(string) {
    if (string.indexOf('-trek-') > -1) {
      const regex = /-trek-([a-zA-Z0-9-_]+)/g;
      return string.replace(regex, (whole, variable) => undefined !== options[variable] ? options[variable] : 'undefined');
    }
    return string;
  }
}

trekVars.postcss = true;

module.exports = trekVars;