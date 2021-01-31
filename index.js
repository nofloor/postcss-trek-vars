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
      string = string.replace(regex, (whole, variable) => undefined !== options[variable] ? options[variable] : 'undefined');
      if (string.indexOf('|') > -1) return cleanVars(string);
      return string;
    }
    return string;
  }

  function cleanVars(string) {
    const vars = string.split('|');
    while (vars.length > 0) {
      string = vars.shift();
      if (string !== 'undefined') break;
    }
    return string;
  }
}

trekVars.postcss = true;

module.exports = trekVars;