import * as Types from './types';

test('Types.number', () => {
  expect(() => Types.number.validateWithoutConfig(3)).not.toThrow();
  expect(() => Types.number.validateWithoutConfig('')).toThrowError(
    `Expected number but got "" (string)`
  );

  expect(() => Types.number({ '>': 5 })(8)).not.toThrow();
  expect(() => Types.number({ '>': 5 })(3)).toThrow(TypeError);
  expect(() => Types.number({ '>': 5 })(5)).toThrowError(
    `Expected > 5 but got 5 (number)`
  );

  expect(() => Types.number({ '<': 5 })(2)).not.toThrow();
  expect(() => Types.number({ '<': 5 })(7)).toThrow(TypeError);
  expect(() => Types.number({ '<': 5 })(5)).toThrowError(
    `Expected < 5 but got 5 (number)`
  );

  expect(() => Types.number({ '>=': 0 })(0)).not.toThrow();
  expect(() => Types.number({ '>=': 0 })(1)).not.toThrow();
  expect(() => Types.number({ '>=': 0 })(-1)).toThrowError(
    `Expected >= 0 but got -1 (number)`
  );

  expect(() => Types.number({ '<=': 0 })(0)).not.toThrow();
  expect(() => Types.number({ '<=': 0 })(-1)).not.toThrow();
  expect(() => Types.number({ '<=': 0 })(1)).toThrowError(
    `Expected <= 0 but got 1 (number)`
  );
});

test('Types.integer', () => {
  expect(() => Types.integer.validateWithoutConfig(1)).not.toThrow();
  expect(() => Types.integer({ 'lte': 0 })(100)).toThrow(TypeError);
  expect(() => Types.integer.validateWithoutConfig(1.3)).toThrowError(
    `Expected integer but got 1.3 (number)`
  );
});

test('Types.string', () => {
  expect(() => Types.string.validateWithoutConfig('')).not.toThrow();
  expect(() => Types.string.validateWithoutConfig(3)).toThrowError(
    `Expected string but got 3 (number)`
  );

  expect(() => Types.string(/tea$/)('Green tea')).not.toThrow();
  expect(() => Types.string(/tea$/)('Coffee')).toThrow(TypeError);

  expect(() => Types.string({ pattern: /tea$/ })('Green tea')).not.toThrow();
  expect(() => Types.string({ pattern: /tea$/ })('Coffee')).toThrowError(
    `Expected string to match /tea$/ but got "Coffee" (string)`
  );

  expect(() => Types.string({ length: 3 })('Tea')).not.toThrow();
  expect(() => Types.string({ length: 3 })('Water')).toThrowError(
    `Expected string of length 3 but got "Water" (length 5)`
  );

  expect(() => Types.string({ maxLength: 4 })('Tea')).not.toThrow();
  expect(() => Types.string({ maxLength: 4 })('Milk')).not.toThrow();
  expect(() => Types.string({ maxLength: 4 })('Water')).toThrowError(
    `Expected string of max length 4 but got "Water" (length 5)`
  );

  expect(() => Types.string({ minLength: 4 })('Milk')).not.toThrow();
  expect(() => Types.string({ minLength: 4 })('Water')).not.toThrow();
  expect(() => Types.string({ minLength: 4 })('Tea')).toThrowError(
    `Expected string of min length 4 but got "Tea" (length 3)`
  );
});

test('Types.boolean', () => {
  expect(() => Types.boolean.validateWithoutConfig(false)).not.toThrow();
  expect(() => Types.boolean.validateWithoutConfig(true)).not.toThrow();

  expect(() => Types.boolean.validateWithoutConfig(3)).toThrowError(
    `Expected boolean but got 3 (number)`
  );

  expect(() => Types.boolean.validateWithoutConfig(null)).toThrow(TypeError);
  expect(() => Types.boolean.validateWithoutConfig(undefined)).toThrow(TypeError);
  expect(() => Types.boolean.validateWithoutConfig(0)).toThrow(TypeError);
  expect(() => Types.boolean.validateWithoutConfig(NaN)).toThrow(TypeError);
});

test('Types.array', () => {
  expect(() => Types.array.validateWithoutConfig([])).not.toThrow();
  expect(() => Types.array.validateWithoutConfig({})).toThrow(TypeError);
  expect(() => Types.array.validateWithoutConfig(32)).toThrowError(
    `Expected array but got 32 (number)`
  );

  expect(() => Types.array(Types.string)([])).not.toThrow();
  expect(() => Types.array(Types.string)([''])).not.toThrow();
  expect(() => Types.array(Types.string)([3])).toThrowError(
    `Expected string but got 3 (number)`
  );

  try {
    Types.array(Types.string)([3]);
  } catch (err) {
    expect(err.path).toEqual(['0']);
  }

  expect(() => Types.array({ length: 3 })([1, 2, 3])).not.toThrow();
  expect(() => Types.array({ length: 3 })([])).toThrowError(
    `Expected array of length 3 but got [] (length 0)`
  );
});

test('Types.object', () => {
  expect(() => Types.object.validateWithoutConfig({})).not.toThrow();
  expect(() => Types.object.validateWithoutConfig([])).not.toThrow();
  expect(() => Types.object.validateWithoutConfig(null)).not.toThrow();
  expect(() => Types.object.validateWithoutConfig(32)).toThrowError(
    `Expected object but got 32 (number)`
  );

  expect(() => Types.object(Types.string)({})).not.toThrow();
  expect(() => Types.object(Types.string)({ a: '' })).not.toThrow();
  expect(() => Types.object(Types.string)({ a: 3 })).toThrowError(
    `Expected string but got 3 (number)`
  );

  try {
    Types.object(Types.string)({ a: 3 });
  } catch (err) {
    expect(err.path).toEqual(['a']);
  }
});

test('Types.any', () => {
  expect(() => Types.any.validateWithoutConfig('Water')).not.toThrow();
  expect(() => Types.any.validateWithoutConfig(32)).not.toThrow();
  expect(() => Types.any.validateWithoutConfig({})).not.toThrow();
  expect(() => Types.any.validateWithoutConfig([])).not.toThrow();
  expect(() => Types.any.validateWithoutConfig(null)).not.toThrow();
  expect(() => Types.any.validateWithoutConfig(undefined)).not.toThrow();
  expect(() => Types.any.validateWithoutConfig(() => {})).not.toThrow();
});

