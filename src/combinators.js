import check from './check';
import { name, show } from './util';

export function Maybe(type) {
  function maybe(value) {
    if (value === null || value === undefined) {
      return true;
    }

    try {
      return check(type, value);
    } catch (err) {
      throw new TypeError(
        `Expected either ${name(type)} or null or undefined but got ${show(value)}`
      );
    }
  };

  maybe.schemaName = `Maybe(${name(type)})`;

  return maybe;
}

export function OneOf(...types) {
  let names = types.map(name);

  function oneOf(value) {
    let isValid = types.some(type => {
      try {
        check(type, value);
        return true;
      } catch (err) {
        return false;
      }
    });

    if (isValid === false) {
      throw new TypeError(
        `Expected one of ${names.join(' or ')} but got ${show(value)}`
      );
    }
  }

  oneOf.schemaName = `OneOf(${names.join(' or ')})`;

  return oneOf;
}

export function All(...types) {
  let names = types.map(name);

  function all(value) {
    let isValid = types.every(type => {
      try {
        check(type, value);
        return true;
      } catch (err) {
        return false;
      }
    });

    if (isValid === false) {
      throw new TypeError(`Expected all of ${names.join(' and ')} but got ${show(value)}`);
    }
  }

  all.schemaName = `All(${names.join(' and ')})`;

  return all;
}

export function Not(type) {
  function not(value){
    try {
      check(type, value);
    } catch (err) {
      return true;
    }

    throw new TypeError(`Expected not ${name(type)} but got ${show(value)}`);
  }

  not.schemaName = `Not(${name(type)})`;

  return not;
}

export function Explain(type, message) {
  return (value) => {
    try {
      check(type, value);
      return true;
    } catch (err) {
      throw new TypeError(message);
    }
  }
}

