export const validateEmail = (input) => {
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(String(input).toLowerCase());
};

export const validateMobile = (input) => {
  return /^(\d){11}$/.test(input);
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

export const style = (status) => {
  return {
    field: ((positive) => {
      return positive ? styleList.field : styleList.fieldError;
    })(status),

    message: ((positive) => {
      return positive ? styleList.successMessage : styleList.errorMessage;
    })(status),

    display: ((positive) => {
      return positive ? '' : styleList.displayHide;
    })(status),

    button: ((positive) => {
      return positive ? styleList.button.active : styleList.button.disbled;
    })(status)
  };
};

const styleList = {
  field: ['field'].join(' '),
  fieldError: ['field error'].join(' '),
  errorMessage: ['ui error message show'].join(' '),
  successMessage: ['ui success message show'].join(' '),
  displayHide: ['hide'],
  button: {
    active: ['ui orange fluid button aligned center'].join(' '),
    disbled: ['ui orange disabled fluid button aligned center'].join(" ")
  }
};



