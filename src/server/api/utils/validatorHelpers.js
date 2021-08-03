export const setEmptyValueMessage = field => `${field} can't be empty`;

function createValidatorForField(field = {}) {
  const name = field.name || field.key;
  const validator = {
    required: [field.required || true, `${name} can't be empty`],
  };
  if (field.minChars) {
    validator.validate = {
      validator: v => v.length >= field.minChars,
      message: `${name} should be atleast ${field.minChars} characters`,
    };
  }
  if (field.enum) {
    validator.enum = { values: field.enum, message: `Invalid ${name}` };
  }
  if (field.min) {
    validator.min = [field.min, `${name} can't be less than ${field.min}`];
  }
  if (field.match) {
    validator.match = [field.match, `Invalid ${name}`];
  }
  return validator;
}

export const createValidator = requiredFields => {
  const validator = {};
  requiredFields.forEach(field => {
    if (field.required !== false) {
      validator[field.key] = createValidatorForField(field);
    }
  });
  return validator;
};
