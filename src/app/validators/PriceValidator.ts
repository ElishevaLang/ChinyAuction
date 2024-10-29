import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function PriceValidator(ticketPrice: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        if (control.value<ticketPrice) {
          return { PriceNotMatch: { value: control.value } }
        }
        return null;
    };
}                          