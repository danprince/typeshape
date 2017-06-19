import * as Types from './types';

let OrderedTypes = [
  Types.integer,
  Types.number,
  Types.string,
  Types.boolean,
  Types.array,
  Types.object,
  Types.any
];

export function generate(example) {
  if (Array.isArray(example)) {
    return Types.array(
      OrderedTypes.find(Type => example.every(Type.validateWithoutConfig))
    );
  }

  if (typeof example === 'object') {
    let schema = {};

    for (let key in example) {
      schema[key] = generate(example[key]);
    }

    return schema;
  }

  return findType(example);
}

export function findType(value) {
  for (let Type of OrderedTypes) {
    try {
      Type.validateWithoutConfig(value);
      return Type;
    } catch (err) {
      continue;
    }
  }
}

export default generate

