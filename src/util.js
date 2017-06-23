// Returns the most appropriate name for a given schema
export function name(schema) {
  return JSON
    .stringify(schema.schemaName || schema.name || schema)
    .replace(/\\"/g, '');
}

// Prints a human readable version of value.
export function show(value) {
  if (Array.isArray(value)) {
    return JSON.stringify(value);
  }

  try {
    let json = JSON.stringify(value, null, 2);
    if (json === undefined) throw null;
    return json;
  } catch (err) {
    return value.toString();
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

