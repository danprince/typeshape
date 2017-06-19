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
        return check(type, value);
      } catch (err) {
        return false;
      }
    });

    if (isValid === false) {
      throw new TypeError(`Expected one of ${types}`);
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

