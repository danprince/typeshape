// Returns the most appropriate name for a given schema
export function name(schema) {
  if (schema === null || schema === undefined) {
    return String(schema);
  }

  return JSON
    .stringify(schema.schemaName || schema.name || schema)
    .replace(/\\"/g, '');
}

// Prints a human readable version of value.
// TODO: need to truncate long objects/arrays
export function show(value) {
  if (Array.isArray(value)) {
    return JSON.stringify(value);
  }

  try {
    let json = JSON.stringify(value, null, 2);
    if (json === undefined) return String(value);
    return json;
  } catch (err) {
    return String(value);
  }
}

// Creates a schema with an explicit name (some combinators use
// the schema name as part of error messages).
export function NamedSchema(name, schema) {
  Object.defineProperty(schema, 'schemaName', {
    enumerable: false,
    value: name
  });

  return schema;
}

