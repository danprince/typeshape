import check from './check';
import mismatch from './mismatch';

function Type({ name, configure, validate }) {
  let type = params => value =>
    validate(value, configure(params));

  type.schemaName = name;

  // It's handy to be able to use types without passing any config
  // if this method is available then the checker will call it
  // directly.
  type.validateWithoutConfig = (value) => validate(value, undefined);
  type.validateWithoutConfig.schemaName = name;

  return type;
}

export const number = Type({
  name: 'number',
  configure(params) {
    let config = {};

    if ('lt' in params) config.lt = params.lt;
    if ('lte' in params) config.lte = params.lte;
    if ('gt' in params) config.gt = params.gt;
    if ('gte' in params) config.gte = params.gte;

    if ('<' in params) config.lt = params['<'];
    if ('>' in params) config.gt = params['>'];
    if ('<=' in params) config.lte = params['<='];
    if ('>=' in params) config.gte = params['>='];

    return config;
  },
  validate(value, config={}) {
    if (typeof value !== 'number') {
      throw mismatch('number', value);
    }

    if ('lt' in config && !(value < config.lt)) {
      throw mismatch(`< ${config.lt}`);
    }

    if ('lte' in config && !(value <= config.lte)) {
      throw mismatch(`<= ${config.lte}`);
    }

    if ('gt' in config && !(value > config.gt)) {
      throw mismatch(`> ${config.gt}`);
    }

    if ('gte' in config && !(value >= config.gte)) {
      throw mismatch(`>= ${config.gte}`);
    }

    return true;
  }
});

export const integer = Type({
  name: 'integer',
  configure(config) {
    return config;
  },
  validate(value, config={}) {
    number(config)(value);

    if (parseInt(value) !== value) {
      throw mismatch('integer', value);
    }
  }
});

export const string = Type({
  name: 'string',
  configure(params) {
    let config = {};

    if (params instanceof RegExp) {
      return { pattern: params };
    }

    if (params.length) config.length = params.length;
    if (params.minLength) config.minLength = params.minLength;
    if (params.maxLength) config.maxLength = params.maxLength;
    if (params.pattern) config.pattern = params.pattern;

    return config;
  },
  validate(value, config={}) {
    if (typeof value !== 'string') {
      throw mismatch('string', value);
    }

    if ('pattern' in config && !config.pattern.test(value)) {
      throw mismatch(`string matching pattern ${config.pattern}`, value);
    }

    if ('length' in config && value.length !== config.length) {
      throw mismatch(`string of length ${config.length}`);
    }

    if ('minLength' in config && value.length < config.minLength) {
      throw mismatch(`string of min length ${config.minLength}`);
    }

    if ('maxLength' in config && value.length > config.maxLength) {
      throw mismatch(`string of max length ${config.maxLength}`);
    }

    return true;
  }
});

export const boolean = Type({
  name: 'boolean',
  validate(value) {
    if (typeof value !== 'boolean') {
      throw mismatch('boolean', value);
    }

    return true;
  }
});


export const array = Type({
  name: 'array',
  configure(params) {
    let config = {};

    if (typeof params === 'function') {
      return { type: params };
    }

    if ('length' in params) config.length = params.length;
    if ('type' in params) config.type = params.type;

    return config;
  },
  validate(value, config={}) {
    if (!Array.isArray(value)) {
      throw mismatch('array', value);
    }

    if ('length' in config && value.length !== config.length) {
      throw mismatch(`array with length ${config.length}`, value);
    }

    if ('type' in config) {
      for (let index = 0; index < value.length; index++) {
        check(config.type, value[index], [index]);
      }
    }

    return true;
  }
});

export const object = Type({
  name: 'object',
  configure(params) {
    let config = {};

    if (typeof params === 'function') {
      config.type = params;
    }

    return config;
  },
  validate(value, config) {
    if (typeof value !== 'object') {
      throw mismatch('object', value);
    }

    for (let key in value) {
      check(config.type, value[key], [key]);
    }

    return true;
  }
});

export const any = Type({
  name: 'any',
  validate(value) {
    return true;
  }
});

