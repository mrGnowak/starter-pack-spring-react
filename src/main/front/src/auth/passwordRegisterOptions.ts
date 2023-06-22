import passwordValidation, { isValidationValid } from './passwordValidaton';
import { RegisterOptions } from 'react-hook-form';

export const passwordRegisterOptions = (options: RegisterOptions = {}) => {
  const base: RegisterOptions = {
    required: {
      value: true,
      message: 'Password is required',
    },
    validate: (value) => isValidationValid(passwordValidation(value)) || 'Password is not strong enough',
  };

  return { ...base, ...options } as RegisterOptions;
};

export const repeatedPasswordRegisterOptions = (options: RegisterOptions = {}) => {
  const base: RegisterOptions = {
    required: {
      value: true,
      message: 'Repeated password is required',
    },
    validate: (value, formValues) => value === formValues.password || 'Passwords do not match',
  };

  return { ...base, ...options } as RegisterOptions;
};
