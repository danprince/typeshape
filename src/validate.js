import check from './check';

function validate(schema, value) {
  try {
    check(schema, value);
    return {
      valid: true,
      message: '',
      path: []
    };
  } catch (err) {
    return {
      valid: false,
      message: err.message,
      path: err.path
    };
  }
}

export default validate
