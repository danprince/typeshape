import { show } from './util';

// Helper function alternative to typeof that understands more specific
// types: e.g. Array, Date, RegExp etc.
export function type(any) {
  let str = Object.prototype.toString.call(any);
  return str.slice(8, -1).toLowerCase();
}

// Convenient way to create a TypeError that describes a mismatch
// between an expected and actual value - along with printing the
// value and its type.
export function mismatch(expected, actual, hint=type) {
  let error = new TypeError(
    `Expected ${expected} but got ${show(actual)} (${hint(actual)})`
  );

  return error;
}

export default mismatch
