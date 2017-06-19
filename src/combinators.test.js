import { Maybe, OneOf, Not } from './combinators';
import * as Types from './types';

test('Combinators.Maybe', () => {
  expect(() => Maybe(Types.string)('')).not.toThrow();
  expect(() => Maybe(Types.string)(null)).not.toThrow();
  expect(() => Maybe(Types.string)(undefined)).not.toThrow();
  expect(() => Maybe(Types.string)(4)).toThrow(TypeError);

  expect(() => Maybe('hello')('hello')).not.toThrow();
  expect(() => Maybe('hello')(undefined)).not.toThrow();
  expect(() => Maybe('hello')('hi')).toThrow(TypeError);
});

test('Combinators.OneOf', () => {
  let StringOrNumber = OneOf(Types.string, Types.number);
  expect(() => StringOrNumber('3')).not.toThrow();
  expect(() => StringOrNumber(3)).not.toThrow();
  expect(() => StringOrNumber(false)).toThrow(TypeError);
});

test('Combinators.Not', () => {
  expect(() => Not(Types.string)(3)).not.toThrow();
  expect(() => Not(Types.string)('')).toThrow(TypeError);
  expect(() => Not('foo')('bar')).not.toThrow();
  expect(() => Not('foo')('foo')).toThrow(TypeError);
});
