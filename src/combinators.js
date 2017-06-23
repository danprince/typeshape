import check from './check';

export function Maybe(type) {
  return (value) => {
    if (value === null || value === undefined) {
      return true;
    }

    try {
      return check(type, value);
    } catch (err) {
      throw new TypeError(`Expected either ${type.schemaName} or null or undefined`);
    }
  };
}

export function OneOf(...types) {
  return (value) => {
    let isValid = types.some(type => {
      try {
        check(type, value);
        return true;
      } catch (err) {
        return false;
      }
    });

    if (isValid === false) {
      throw new TypeError(`Expected one of ${types.join(', ')}`);
    }
  }
}

export function Not(type) {
  return (value) => {
    try {
      check(type, value);
    } catch (err) {
      return true;
    }

    throw new TypeError(`Expected not ${type}`);
  }
}

export function All(...types) {
  return (value) => {
    let isValid = types.every(type => {
      try {
        check(type, value);
        return true;
      } catch (err) {
        return false;
      }
    });

    if (isValid === false) {
      throw new TypeError(`Expected all of ${types.join(', ')}`);
    }
  }
}

export function Throws(type, message) {
  return (value) => {
    try {
      check(type, value);
      return true;
    } catch (err) {
      throw new TypeError(message);
    }
  }
}

