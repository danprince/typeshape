import check from './check';
import * as Types from './types';
import { OneOf, Maybe, Not } from './combinators';

describe('check', () => {
  it('should check literal schemas', () => {
    expect(() => check(4, 4)).not.toThrow();
    expect(() => check(5, 4)).toThrowError(
      `Expected 5 but got 4 (number)`
    );

    expect(() => check({ a: 1 }, { a: 1 })).not.toThrow();
    expect(() => check({ a: 1 }, { a: 2 })).toThrowError(
      `Expected 1 but got 2 (number)`
    );
  });


  it('should check missing keys', () => {
    expect(() => check({ a: 1 }, { })).toThrowError(
      `Missing key: "a"`
    );
  });


  it('should check extra keys', () => {
    expect(() => check({ a: 1 }, { a: 1, b: 2 })).toThrowError(
      `Unexpected key: "b"`
    );
  });

  it('should check simple type schemas', () => {
    expect(() => check(Types.string, '')).not.toThrow();
    expect(() => check(Types.string, 3)).toThrowError(
      `Expected string but got 3 (number)`
    );
  });

  it('should check object schemas', () => {
    let CardSchema = { suit: Types.string, value: Types.integer };

    expect(() => check(CardSchema, { suit: 'Clubs', value: 1 })).not.toThrow();
    expect(() => check(CardSchema, { suit: 'Clubs', value: 1.3 })).toThrowError(
      `Expected integer but got 1.3 (number)`
    );
  });

  it('should check arrays as object schemas', () => {
    let TupleSchema = [Types.number, Types.number];

    expect(() => check(TupleSchema, [1, 2])).not.toThrow();
    expect(() => check(TupleSchema, [1, '2'])).toThrowError(
      `Expected number but got "2" (string)`
    );

    try {
      check(TupleSchema, [1, '2']);
    } catch (err) {
      expect(err.path).toEqual(['1']);
    }

    expect(() => check(TupleSchema, [1])).toThrowError(
      `Missing key: "1"`
    );
    expect(() => check(TupleSchema, [1, 2, 3])).toThrowError(
      `Unexpected key: "2"`
    );
  });

  it('should throw errors with paths for nested type mismatches', () => {
    let CardSchema = { suit: Types.string, value: Types.integer };

    try {
      check(CardSchema, { suit: 'Clubs', value: 1.3 });
    } catch (err) {
      expect(err.path).toEqual(['value']);
    }
  });

  it('should throw errors with paths for deeply nested type mismatches', () => {
    let NestedSchema = {
      down: {
        the: {
          rabbit: {
            hole: Types.number
          }
        }
      }
    };

    try {
      check(NestedSchema, { down: { the: { rabbit: { hole: '???' } } } });
    } catch (err) {
      expect(err.path).toEqual(['down', 'the', 'rabbit', 'hole']);
    }

    try {
      check({ foo: [Types.number] }, { foo: [null] });
    } catch (err) {
      expect(err.path).toEqual(['foo', '0']);
    }

    try {
      check({ foo: Types.array(Types.string) }, { foo: [null] });
    } catch (err) {
      expect(err.path).toEqual(['foo', '0']);
    }
  });
});

