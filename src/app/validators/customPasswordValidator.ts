import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function customPasswordValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.value;
  const hasUppercase = /[A-Z]{2}/.test(password);
  const hasLowercase = /[a-z]{2}/.test(password);
  const hasNumbers = /[0-9]{2}/.test(password);

  if (!hasUppercase) {
    return { uppercase: true };
  }

  if (!hasLowercase) {
    return { lowercase: true };
  }

  if (!hasNumbers) {
    return { numbers: true };
  }

  return null;
}

