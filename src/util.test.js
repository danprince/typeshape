import { name } from './util';

describe('util', () => {
  test('name', () => {
    expect(name({ schemaName: 'foo' })).toBe('"foo"');
    expect(name({ name: 'foo' })).toBe('"foo"');
    expect(name('foo')).toBe('"foo"');
    expect(name(null)).toBe('null');
    expect(name(undefined)).toBe('undefined');
  });
});
