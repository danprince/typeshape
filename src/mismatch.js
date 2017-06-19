export function type(any) {
  let str = Object.prototype.toString.call(any);
  return str.slice(8, -1).toLowerCase();
}

export function mismatch(expected, actual) {
  let actualOutput = JSON.stringify(actual, null, 2);

  let error = new TypeError(
    `Expected ${expected}\nGot ${type(actual)} = ${actualOutput}`
  );

  return error;
}

export default mismatch
