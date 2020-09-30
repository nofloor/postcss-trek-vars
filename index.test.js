const trekVars = require('./index')({
  'font-size': '1rem',
  'line-height': 1.5,
  'color_1': '#000',
  'Black': '#000000'
});

test('replaces trek variables', () => {
  const decl = { value: '' };
  
  decl.value = '-trek-font-size';
  trekVars.Declaration(decl);
  expect(decl.value).toBe('1rem');
  
  decl.value = '-trek-line-height';
  trekVars.Declaration(decl);
  expect(decl.value).toBe('1.5');
  
  decl.value = 'bold -trek-font-size/-trek-line-height sans-serif';
  trekVars.Declaration(decl);
  expect(decl.value).toBe('bold 1rem/1.5 sans-serif');
  
  decl.value = '-trek-color_1';
  trekVars.Declaration(decl);
  expect(decl.value).toBe('#000');
  
  decl.value = '-trek-Black';
  trekVars.Declaration(decl);
  expect(decl.value).toBe('#000000');
});