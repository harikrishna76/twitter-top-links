import { useContext } from 'react';
import ApplicationContext from 'components/ApplicationContext';

export function singletonInitializer(ref, Service) {
  let newService = ref;
  if (!newService) {
    newService = new Service();
  }
  return newService;
}

export function getDefaultValuesForFormFields(fields) {
  const defaultValues = {};
  fields.forEach(fieldDetails => {
    defaultValues[fieldDetails.key] =
      fieldDetails.defaultValue !== undefined ? fieldDetails.defaultValue : '';
  });
  return defaultValues;
}

export function isValue(value) {
  return !['', undefined, null].includes(value);
}

export function fieldValidator(field, value) {
  let message = null;
  if (!isValue(value) || (Array.isArray(value) && value.length === 0)) {
    message = 'Required';
  } else if (
    field.type === 'email' &&
    value &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
  ) {
    message = 'Invalid email address';
  } else if (field.type === 'tel' && value && !value.match(/^\d{10}$/)) {
    message = 'Invalid Mobile Number';
  }
  return message;
}

export function formValidator(fields, formData) {
  const fieldErrors = {};
  let validationStatus = true;
  fields.forEach(field => {
    if (
      field.required === true ||
      (typeof field.required === 'function' && field.required(formData))
    ) {
      fieldErrors[field.key] = fieldValidator(field, formData[field.key]);
      if (fieldErrors[field.key]) {
        validationStatus = false;
      }
    }
  });
  return { fieldErrors, validationStatus };
}

export function getUserDetails() {
  const context = useContext(ApplicationContext) || {};
  const user = context.user || {};
  return user;
}

export const random = {};
