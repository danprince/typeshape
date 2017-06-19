function check(schema, value, path=[]) {
  if (schema.validateWithoutConfig) {
    schema = schema.validateWithoutConfig;
  }

  if (schema === value) {
    return true;
  }

  if (typeof schema === 'function') {
    try {
      return schema(value);
    } catch (err) {
      let location = path.join('.');
      throw new TypeError(`Shape mismatch at: "${location}".\n${err.message}`);
    }
  }

  if (hasCustomMessage(schema)) {
    let [test, message] = schema;

    try {
      return check(test, value, path);
    } catch (err) {
      throw new TypeError(message);
    }
  }

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

  throw new TypeError(`Does not match ${schema}`);
}

function hasCustomMessage(schema) {
  return (
    Array.isArray(schema) &&
    schema.length === 2 &&
    typeof schema[0] === 'function' &&
    typeof schema[1] === 'string'
  );
}

export default check

