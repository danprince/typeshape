// Helper function alternative to typeof that understands more specific
// types: e.g. Array, Date, RegExp etc.
export function type(any) {
  let str = Object.prototype.toString.call(any);
  return str.slice(8, -1).toLowerCase();
}

// Convenient way to create a TypeError that describes a mismatch
// between an expected and actual value - along with printing the
// value and its type.
export function mismatch(expected, actual) {
  let actualOutput = JSON.stringify(actual, null, 2);

  let error = new TypeError(
    `Expected ${expected}\nGot ${type(actual)} = ${actualOutput}`
  );

  return error;
}

export default mismatch
