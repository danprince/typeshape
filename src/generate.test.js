import generate from './generate';
import check from './check';
import * as Types from './types';

test('generate simple schema', () => {
  expect(generate(4)).toBe(Types.integer);
  expect(generate(4.5)).toBe(Types.number);
  expect(generate('')).toBe(Types.string);
  expect(generate(false)).toBe(Types.boolean);
});

test('generate object schema', () => {
  expect(
    generate({ foo: 4, bar: false })
  ).toEqual(
    { foo: Types.integer, bar: Types.boolean }
  );

  expect(
    () => check(generate({ foo: 4, bar: false }), { foo: 3, bar: true })
  ).not.toThrow();

  expect(
    () => check(generate({ foo: 4, bar: false }), { foo: true, bar: true })
  ).toThrow(TypeError);
});

test('generate array schema', () => {
  expect(
    () => check(generate([1, 2, 3]), [4, 5, 6])
  ).not.toThrow();

  expect(
    () => check(generate([1, 2, 3]), ['4', 5, 6])
  ).toThrow(TypeError);
});

