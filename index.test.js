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
  
  decl.value = 'black 1.4';
  trekVars.Declaration(decl);
  expect(decl.value).toBe('black 1.4');
  
  decl.value = '0 (-trek-line-height / 2)';
  trekVars.Declaration(decl);
  expect(decl.value).toBe('0 (1.5 / 2)');
});

test('uses next variable if first does not exist', () => {
  const decl = { value: '' };
  
  decl.value = '-trek(color, Black)';
  trekVars.Declaration(decl);
  expect(decl.value).toBe('#000000');
  
  decl.value = '-trek(color, Black, color_1)';
  trekVars.Declaration(decl);
  expect(decl.value).toBe('#000000');
  
  decl.value = '-trek(color, black, color_1, col)';
  trekVars.Declaration(decl);
  expect(decl.value).toBe('#000');
  
  decl.value = '-trek(  color, black  , color_1, col  )';
  trekVars.Declaration(decl);
  expect(decl.value).toBe('#000');
  
  decl.value = '-trek(padding-left, padding-right, 25px)';
  trekVars.Declaration(decl);
  expect(decl.value).toBe('25px');
  
  decl.value = '-trek(padding-left, padding-right, font-size)';
  trekVars.Declaration(decl);
  expect(decl.value).toBe('1rem');
  
  decl.value = '-trek(padding-left, padding-right, margin-left)';
  trekVars.Declaration(decl);
  expect(decl.value).toBe('margin-left');
});