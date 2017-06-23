import validate from './validate';
import * as Types from './types';

describe('validate', () => {
  it('should validate literal schemas', () => {
    expect(validate(4, 4)).toEqual({
      valid: true,
      message: '',
      path: [],
    });

    expect(validate(5, 4)).toEqual({
      valid: false,
      message: 'Expected 5 but got 4 (number)',
      path: []
    });

    expect(validate({ a: 1 }, { a: 2 })).toEqual({
      valid: false,
      message: 'Expected 1 but got 2 (number)',
      path: ['a']
    });
  });
});
