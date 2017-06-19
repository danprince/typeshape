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

  it('should support custom messages', () => {
    let SuitSchema = [Types.string, 'Invalid suit'];
    expect(() => check(SuitSchema, 43)).toThrowError(/Invalid suit/);

    let FaceSchema = [OneOf('Ace', 'King', 'Queen', 'Jack'), 'Invalid face'];
    expect(() => check(FaceSchema, 43)).toThrowError(/Invalid face/);

    let CardSchema = {
      value: Types.integer,
      suit: [OneOf('Clubs', 'Spades', 'Hearts', 'Diamonds'), 'Invalid suit']
    }

    expect(() =>
      check(CardSchema, { value: 3, suit: 'Jock' })
    ).toThrowError(/Invalid suit/);
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
});
