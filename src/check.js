import mismatch from './mismatch';
import { show } from './util';

// Checks whether a value conforms to a given schema, returns true
// or throws a TypeError.

function check(schema, value, path=[]) {

  // Shortcut for supporting unconfigured types, such as Types.string
  // rather than forcing passing of an empty config.
  if (schema.validateWithoutConfig) {
    schema = schema.validateWithoutConfig;
  }

  // Simplest possible check is to see whether the value has shallow
  // equality with the schema.
  if (schema === value) {
    return true;
  }

  // Check value against schema function (usually a type or combinator)
  if (typeof schema === 'function') {
    try {
      return schema(value);
    } catch (err) {
      throw invalid(
        err.message,
        [...path, ...(err.path || [])]
      );
    }
  }

  // Iterate over objects and make sure the schema at each property
  // is satisfied by a value at the corresponding value property.
  if (typeof schema === 'object') {
    for (let key in schema) {
      let test = schema[key];

      if (value && key in value) {
        check(schema[key], value[key], [...path, key]);
      } else {
        throw invalid(`Missing key: ${show(key)}`, path);
      }
    }

    for (let key in value) {
      if (!(key in schema)) {
        throw invalid(`Unexpected key: ${show(key)}`, [...path, key]);
      }
    }

    return true;
  }

  // If we get to here, then we're probably validating against a
  // literal schema that failed the shallow equality check.
  let error = mismatch(schema, value);
  throw invalid(error.message, path);
}

function invalid(message, path) {
  let error = new TypeError(message);
  error.path = path;
  return error;
}

export default check

