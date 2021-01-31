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
      if (string.indexOf('||') > -1) return cleanVars(string);
      return string;
    }
    return string;
  }

  function cleanVars(string) {
    const groups = string.trim().split(/\s+/);
    return groups.map((group) => {
      const vals = group.split('||');
      let val;
      while (vals.length > 0) {
        val = vals.shift();
        if (val !== 'undefined') break;
      }
      return val;
    }).join(' ');
  }
}

trekVars.postcss = true;

module.exports = trekVars;