export const validateEmail = (input) => {
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(String(input).toLowerCase());
};

export const validatePhone = (input) => {
  /^(\d){12}$/;
};

export const validateName = (input) => {
  return /^[a-zA-Z_-\d]{3,20}$/gi.test(input);
};

export const validatePassword = (input) => {
  return validateName(input);
};

export const styleInput = (valid) => {
  return valid ? getStyles().field : getStyles().fieldError;
};

export const styleMessage = (valid) => {
  return valid ? '' : getStyles().errorMessage;
};

const getStyles = () => {
  return {
    field: ['field'].join(' '),
    fieldError: ['field error'].join(' '),
    errorMessage: ['ui error message show'].join(' '),
    displayToggle: ['show']
  };
};
