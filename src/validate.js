import check from './check';

// Friendly wrapper around check that returns a result object with a
// boolean "valid" property rather than throwing an error.

function validate(schema, value) {
  try {
    check(schema, value);
    return {
      valid: true,
      reason: '',
      path: []
    };
  } catch (err) {
    return {
      valid: false,
      reason: err.message,
      path: err.path
    };
  }
}

export default validate
