import check from './check';
import * as Types from './types';
import { OneOf, Maybe, Not } from './combinators';
import { NamedSchema } from './util';

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

    try {
      check({ a: 1 }, { a: 1, b: 2 });
    } catch (err) {
      expect(err.path).toEqual(['b']);
    }
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

  it('should work with weird and wonderful composition', () => {
    let NoNumbersArray = Types.array(Not(Types.number));

    expect(() => check(NoNumbersArray, ['3', null, new Date, /hello/])).not.toThrow();
    expect(() => check(NoNumbersArray, ['3', null, 3, /hello/])).toThrowError(
      `Expected not "number" but got 3`
    );

    let SmallNumbersArray = Types.array(Types.number({ '<=': 1 }));

    expect(() => check(SmallNumbersArray, [.2, .9, .3])).not.toThrow();
    expect(() => check(SmallNumbersArray, [.1, 20, .2])).toThrowError(
      `Expected <= 1 but got 20 (number)`
    );

    let BlacklistSchema = Not(OneOf('foo', 'bar'));

    expect(() => check(BlacklistSchema, 'qux')).not.toThrow();
    expect(() => check(BlacklistSchema, 'foo')).toThrowError(
      `Expected not "OneOf(foo or bar)" but got "foo"`
    );

    let GridSchema = Types.array({
      type: Types.array({ length: 2 }),
      length: 2
    });

    expect(() => check(GridSchema, [[0, 1], [1, 0]])).not.toThrow()
    expect(() => check(GridSchema, [[0, 1], [1]])).toThrowError(
      `Expected array of length 2 but got [1] (length 1)`
    );
  });

  it('should work with recursive schema', () => {
    let TreeSchema = NamedSchema('TreeSchema', {});
    let NodeSchema = OneOf(TreeSchema, Types.integer);

    TreeSchema.left = NodeSchema;
    TreeSchema.right = NodeSchema;

    let goodTree = {
      left: 1,
      right: {
        left: 2,
        right: 3
      }
    };

    expect(() => check(TreeSchema, goodTree)).not.toThrow();

    let badTree = {
      left: 1,
      right: {
        left: 4,
        right: null
      }
    };

    expect(() => check(TreeSchema, badTree)).toThrowError(
      `Expected one of "TreeSchema" or "integer" but got`
    );
  });
});

