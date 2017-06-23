import validate from './validate';
import * as Types from './types';

describe('validate', () => {
  it('should validate literal schemas', () => {
    expect(validate(4, 4)).toEqual({
      valid: true,
      reason: '',
      at: [],
    });

    expect(validate(5, 4)).toEqual({
      valid: false,
      reason: 'Expected 5 but got 4 (number)',
      at: []
    });

    expect(validate({ a: 1 }, { a: 2 })).toEqual({
      valid: false,
      reason: 'Expected 1 but got 2 (number)',
      at: ['a']
    });
  });
});
