function trekVars(options = {}) {
  return {
    postcssPlugin: 'postcss-trek-vars',
    Declaration(decl) {
      let value = replaceVars(decl.value);
      const regex = /(\s|^)(\(.+\))/;
      if (regex.test(value)) {
        const match = decl.value.match(regex);
        value = calculate(match[2]);
        console.log(value);
      }
      decl.value = value;
    }
  }
  
  function replaceVars(string) {
    if (string.indexOf('-trek') > -1) {
      const regex = /-trek-([a-z-]+)/g;
      return string.replace(regex, (whole, variable) => undefined !== options[variable] ? options[variable] : whole);
    }
    return string;
  }
  
  function calculate(string) {
    const match = string.match(/([a-z]+)/g);
    let unit = '';
    if (undefined !== match[0]) {
      unit = match[0];
      string = string.replace(/([a-z]+)/g, '');
    }
    return eval(string) + unit;
  }
}

trekVars.postcss = true;

module.exports = trekVars;