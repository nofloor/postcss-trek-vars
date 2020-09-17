function trekVars(options = {}) {
  return {
    postcssPlugin: 'postcss-trek-vars',
    Declaration(decl) {
      if (decl.value.indexOf('-trek') > -1) {
        const regex = /-trek-([a-z-]+)/;
        const match = decl.value.match(regex);
        if (match[1]) decl.value = decl.value.replace(regex, options[match[1]]);
      }
    }
  }
}

trekVars.postcss = true;

module.exports = trekVars;