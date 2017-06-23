import check from './check';
import { name, show } from './util';

export function Maybe(type) {
  return (value) => {
    if (value === null || value === undefined) {
      return true;
    }

    try {
      return check(type, value);
    } catch (err) {
      throw new TypeError(
        `Expected either ${name(type)} or null or undefined, but got ${show(value)}`
      );
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
      let names = types.map(name);
      throw new TypeError(
        `Expected one of ${names.join(' or ')}, but got ${show(value)}`
      );
    }
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
      let names = types.map(name);
      throw new TypeError(`Expected all of ${names.join(' and ')}, but got ${show(value)}`);
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

    throw new TypeError(`Expected not ${name(type)}, but got ${show(value)}`);
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

