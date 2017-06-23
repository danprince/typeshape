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
      throw invalid(err.message, path);
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
        throw invalid(`Missing key: ${key}`, path);
      }
    }

    for (let key in value) {
      if (!(key in schema)) {
        throw invalid(`Unexpected key: ${key}`, path);
      }
    }

    return true;
  }

  // If we get to here, then we're probably validating against a
  // literal schema that failed the shallow equality check.
  throw invalid(`Does not match ${schema}`, path);;
}

function invalid(message, path) {
  let error = new TypeError(message);
  error.path = path;
  return error;
}

export default check

