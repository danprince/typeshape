// Checks whether a value conforms to a given schema, returns true
// or throws a TypeError.
function check(schema, value, path=[]) {
  // Shortcut for supporting unconfigured types, such as Types.string
  // rather than forcing passing of an empty config.
  if (schema.validateWithoutConfig) {
    schema = schema.validateWithoutConfig;
  }

  // Simplest possible check is to see whether the value has shallow
  // equality with the schema. This enables writing schemas that contain
  // literal values without needing to use the Types.literal type.
  if (schema === value) {
    return true;
  }

  // Check value against schema function (usually a type or combinator)
  if (typeof schema === 'function') {
    try {
      return schema(value);
    } catch (err) {
      let location = path.join('.');
      throw new TypeError(`Shape mismatch at: "${location}".\n${err.message}`);
    }
  }

  // Support custom messages (e.g. [Types.string, 'My message'])
  if (hasCustomMessage(schema)) {
    let [test, message] = schema;

    try {
      return check(test, value, path);
    } catch (err) {
      throw new TypeError(message);
    }
  }

  // Iterate over objects and make sure the schema at each property
  // is satisfied by a value at the corresponding value property.
  if (typeof schema === 'object') {
    for (let key in schema) {
      let test = schema[key];

      if (key in value) {
        check(schema[key], value[key], [...path, key]);
      } else {
        throw new TypeError(`Missing key ${key}`);
      }
    }

    for (let key in value) {
      if (!(key in schema)) {
        throw new TypeError(`Unexpected key ${key}`);
      }
    }

    return true;
  }

  // If we get to here, then we're probably validating against a
  // literal schema that failed the shallow equality check.
  throw new TypeError(`Does not match ${schema}`);
}

// Rough check to see whether a given schema looks like a custom
// message. Note that this syntax means you can't use a literal schema
// of [someFunc, someString] because it'll be interpreted as a message.
function hasCustomMessage(schema) {
  return (
    Array.isArray(schema) &&
    schema.length === 2 &&
    typeof schema[0] === 'function' &&
    typeof schema[1] === 'string'
  );
}

export default check

