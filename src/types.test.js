import * as Types from './types';

test('Types.number', () => {
  expect(() => Types.number.validateWithoutConfig(3)).not.toThrow();
  expect(() => Types.number.validateWithoutConfig('')).toThrow(TypeError);

  expect(() => Types.number({ '>': 5 })(8)).not.toThrow();
  expect(() => Types.number({ '>': 5 })(3)).toThrow(TypeError);
  expect(() => Types.number({ '>': 5 })(5)).toThrow(TypeError);

  expect(() => Types.number({ '<': 5 })(2)).not.toThrow();
  expect(() => Types.number({ '<': 5 })(7)).toThrow(TypeError);
  expect(() => Types.number({ '<': 5 })(5)).toThrow(TypeError);

  expect(() => Types.number({ '>=': 0 })(0)).not.toThrow();
  expect(() => Types.number({ '>=': 0 })(1)).not.toThrow();
  expect(() => Types.number({ '>=': 0 })(-1)).toThrow(TypeError);

  expect(() => Types.number({ '<=': 0 })(0)).not.toThrow();
  expect(() => Types.number({ '<=': 0 })(-1)).not.toThrow();
  expect(() => Types.number({ '<=': 0 })(1)).toThrow(TypeError);

  expect(() => Types.number({ 'gt': 5 })(8)).not.toThrow();
  expect(() => Types.number({ 'gt': 5 })(3)).toThrow(TypeError);
  expect(() => Types.number({ 'gt': 5 })(5)).toThrow(TypeError);

  expect(() => Types.number({ 'lt': 5 })(2)).not.toThrow();
  expect(() => Types.number({ 'lt': 5 })(7)).toThrow(TypeError);
  expect(() => Types.number({ 'lt': 5 })(5)).toThrow(TypeError);

  expect(() => Types.number({ 'gte': 0 })(0)).not.toThrow();
  expect(() => Types.number({ 'gte': 0 })(1)).not.toThrow();
  expect(() => Types.number({ 'gte': 0 })(-1)).toThrow(TypeError);

  expect(() => Types.number({ 'lte': 0 })(0)).not.toThrow();
  expect(() => Types.number({ 'lte': 0 })(-1)).not.toThrow();
  expect(() => Types.number({ 'lte': 0 })(1)).toThrow(TypeError);
});

test('Types.integer', () => {
  expect(() => Types.integer.validateWithoutConfig(1)).not.toThrow();
  expect(() => Types.integer.validateWithoutConfig(1.3)).toThrow();
  expect(() => Types.integer({ 'lte': 0 })(100)).toThrow(TypeError);
});

test('Types.string', () => {
  expect(() => Types.string.validateWithoutConfig('')).not.toThrow();
  expect(() => Types.string.validateWithoutConfig(3)).toThrow(TypeError);

  expect(() => Types.string(/tea$/)('Green tea')).not.toThrow();
  expect(() => Types.string(/tea$/)('Coffee')).toThrow(TypeError);

  expect(() => Types.string({ pattern: /tea$/ })('Green tea')).not.toThrow();
  expect(() => Types.string({ pattern: /tea$/ })('Coffee')).toThrow(TypeError);

  expect(() => Types.string({ length: 3 })('Tea')).not.toThrow();
  expect(() => Types.string({ length: 3 })('Water')).toThrow(TypeError);

  expect(() => Types.string({ maxLength: 4 })('Tea')).not.toThrow();
  expect(() => Types.string({ maxLength: 4 })('Milk')).not.toThrow();
  expect(() => Types.string({ maxLength: 4 })('Water')).toThrow(TypeError);

  expect(() => Types.string({ minLength: 4 })('Milk')).not.toThrow();
  expect(() => Types.string({ minLength: 4 })('Water')).not.toThrow();
  expect(() => Types.string({ minLength: 4 })('Tea')).toThrow(TypeError);
});

test('Types.boolean', () => {
  expect(() => Types.string.validateWithoutConfig('')).not.toThrow();
  expect(() => Types.string.validateWithoutConfig(3)).toThrow(TypeError);

  expect(() => Types.string(/tea$/)('Green tea')).not.toThrow();
  expect(() => Types.string(/tea$/)('Coffee')).toThrow(TypeError);

  expect(() => Types.string({ pattern: /tea$/ })('Green tea')).not.toThrow();
  expect(() => Types.string({ pattern: /tea$/ })('Coffee')).toThrow(TypeError);

  expect(() => Types.string({ length: 3 })('Tea')).not.toThrow();
  expect(() => Types.string({ length: 3 })('Water')).toThrow(TypeError);

  expect(() => Types.string({ maxLength: 4 })('Tea')).not.toThrow();
  expect(() => Types.string({ maxLength: 4 })('Milk')).not.toThrow();
  expect(() => Types.string({ maxLength: 4 })('Water')).toThrow(TypeError);

  expect(() => Types.string({ minLength: 4 })('Milk')).not.toThrow();
  expect(() => Types.string({ minLength: 4 })('Water')).not.toThrow();
  expect(() => Types.string({ minLength: 4 })('Tea')).toThrow(TypeError);
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

test('Types.literal', () => {
  expect(() => Types.literal('Water')('Water')).not.toThrow();
  expect(() => Types.literal('Water')('Coffee')).toThrow();
  expect(() => Types.literal(0)('0')).toThrow();
});

test('Types.array', () => {
  expect(() => Types.array.validateWithoutConfig([])).not.toThrow();
  expect(() => Types.array.validateWithoutConfig(32)).toThrow(TypeError);
  expect(() => Types.array.validateWithoutConfig({})).toThrow(TypeError);

  expect(() => Types.array(Types.string)([])).not.toThrow();
  expect(() => Types.array(Types.string)([''])).not.toThrow();
  expect(() => Types.array(Types.string)([3])).toThrow(TypeError);

  expect(() => Types.array({ length: 3 })([1, 2, 3])).not.toThrow();
  expect(() => Types.array({ length: 3 })([])).toThrow(TypeError);
  expect(() =>
    Types.array({ type: Types.string, length: 3 })(['1', '2', 3])
  ).toThrow(TypeError);
});

test('Types.object', () => {
  expect(() => Types.object.validateWithoutConfig({})).not.toThrow();
  expect(() => Types.object.validateWithoutConfig([])).not.toThrow();
  expect(() => Types.object.validateWithoutConfig(32)).toThrow(TypeError);

  expect(() => Types.object(Types.string)({})).not.toThrow();
  expect(() => Types.object(Types.string)({ a: '' })).not.toThrow();
  expect(() => Types.object(Types.string)({ a: 3 })).toThrow(TypeError);
});

