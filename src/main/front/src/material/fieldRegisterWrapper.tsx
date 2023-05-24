import {
  FieldErrors,
  FieldPath,
  FieldValues,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form/dist/types";

export const fieldRegisterWrapper =
  <T extends FieldValues>(
    register: UseFormRegister<T>,
    errors: FieldErrors<T>
  ) =>
  (name: FieldPath<T>, options?: RegisterOptions) => {
    return {
      ...register(name, options),
      error: !!errors[name],
      helperText: errors[name]?.message,
    };
  };
