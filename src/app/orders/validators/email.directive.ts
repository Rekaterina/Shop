import { Directive } from '@angular/core';
import { Validator, AbstractControl, ValidationErrors, NG_VALIDATORS } from '@angular/forms';

@Directive({
    selector: '[appEmailValidator]',
    providers: [
        {
            provide: NG_VALIDATORS,
            useExisting: EmailDirective,
            multi: true,
        },
    ],
})
export class EmailDirective implements Validator {
    validate(c: AbstractControl): ValidationErrors | null {
        const reg = /[a-z0-9._%+-]+@[a-z0-9.-]+/;
        if (!reg.test(c.value)) {
            return {
                email: true,
            };
        }
        return null;
    }
}
