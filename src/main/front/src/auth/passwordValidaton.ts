export default function passwordValidation(password: string) {
  const hasMinLength = password.length >= 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
  const hasNoSpaces = !/\s/.test(password);

  return { hasMinLength, hasUpperCase, hasLowerCase, hasNumber, hasSpecialChar, hasNoSpaces };
}

export type PasswordValidation = ReturnType<typeof passwordValidation>;

export function isValidationValid(validation: PasswordValidation) {
  return Object.values(validation).every((x) => x === true);
}

export function isPasswordValid(password: string) {
  return isValidationValid(passwordValidation(password));
}
