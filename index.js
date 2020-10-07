function trekVars(options = {}) {
  return {
    postcssPlugin: 'postcss-trek-vars',
    Declaration(decl) {
      decl.value = replaceVars(decl.value);
    }
  }
  
  function replaceVars(string) {
    if (string.indexOf('-trek(') > -1) {
      const regex = /\-trek\((.+)\)/g;
      return string.replace(regex, (whole, match) => {
        const vars = match.replace(/\s\s?/g, '').split(',');
        for (let i = 0, count = vars.length; i < count; i++) {
          if (undefined !== options[vars[i]]) return options[vars[i]];
        }
        return whole;
      });
    }
    else if (string.indexOf('-trek-') > -1) {
      const regex = /-trek-([a-zA-Z0-9-_]+)/g;
      return string.replace(regex, (whole, variable) => undefined !== options[variable] ? options[variable] : whole);
    }
    
    return string;
  }
}

trekVars.postcss = true;

module.exports = trekVars;