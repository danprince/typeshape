import check from './check';
import * as Types from './types';
import { OneOf, Maybe, Not } from './combinators';

describe('check', () => {
  it('should validate simple literal schemas', () => {
    expect(() => check(4, 4)).not.toThrow();
    expect(() => check(5, 4)).toThrow(TypeError); 

    expect(() => check({ a: 1 }, { a: 1 })).not.toThrow();
    expect(() => check({ a: 1 }, { a: 2 })).toThrow(TypeError);
  });


  it('should check missing keys', () => {
    expect(() => check({ a: 1 }, { })).toThrow(TypeError);
  });


  it('should check extra keys', () => {
    expect(() => check({ a: 1 }, { a: 1, b: 2 })).toThrow(TypeError);
  });

  it('should check simple type schemas', () => {
    expect(() => check(Types.string, '')).not.toThrow();
    expect(() => check(Types.string, 3)).toThrow(TypeError);
  });

  it('should check object schemas', () => {
    let CardSchema = { suit: Types.string, value: Types.integer };

    expect(() => check(CardSchema, { suit: 'Clubs', value: 1 })).not.toThrow();
    expect(() => check(CardSchema, { suit: 'Clubs', value: 1.3 })).toThrow(TypeError);
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
  });
});

