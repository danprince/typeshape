import { Maybe, OneOf, All, Not, Throws } from './combinators';
import * as Types from './types';

test('Combinators.Maybe', () => {
  expect(() => Maybe(Types.string)('')).not.toThrow();
  expect(() => Maybe(Types.string)(null)).not.toThrow();
  expect(() => Maybe(Types.string)(undefined)).not.toThrow();
  expect(() => Maybe(Types.string)(4)).toThrow(TypeError);

  expect(() => Maybe('hello')('hello')).not.toThrow();
  expect(() => Maybe('hello')(undefined)).not.toThrow();
  expect(() => Maybe('hello')('hi')).toThrow(TypeError);
  expect(() => Maybe('hello')('hi')).toThrowError(
    /Expected either "hello" or null or undefined but got "hi"/
  );
});

test('Combinators.OneOf', () => {
  let StringOrNumber = OneOf(Types.string, Types.number);
  expect(() => StringOrNumber('3')).not.toThrow();
  expect(() => StringOrNumber(3)).not.toThrow();
  expect(() => StringOrNumber(false)).toThrow(TypeError);
  expect(() => StringOrNumber(false)).toThrowError(
    /Expected one of "string" or "number" but got false/
  );
});

test('Combinators.All', () => {
  let NumberAndInt = All(Types.number, Types.integer);
  expect(() => NumberAndInt(3)).not.toThrow();
  expect(() => NumberAndInt(3.5)).toThrow();
  expect(() => NumberAndInt(3.5)).toThrowError(
    /Expected all of "number" and "integer" but got 3.5/
  );
});

test('Combinators.Not', () => {
  expect(() => Not(Types.string)(3)).not.toThrow();
  expect(() => Not(Types.string)('')).toThrow(TypeError);
  expect(() => Not('foo')('bar')).not.toThrow();
  expect(() => Not('foo')('foo')).toThrow(TypeError);
  expect(() => Not('foo')('foo')).toThrowError(
    /Expected not "foo" but got "foo"/
  );
});

test('Combinators.Throws', () => {
  let CustomNumber = Throws(Types.number, 'My custom error');
  expect(() => CustomNumber(3)).not.toThrow();
  expect(() => CustomNumber({})).toThrowError(
    /My custom error/
  );
});

