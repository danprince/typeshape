export function name(type) {
  return JSON.stringify(type.schemaName || type.name || type);
}

export function show(value) {
  return JSON.stringify(value);
}
