import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, AbstractControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { UserModel } from '../../models/user.model';

@Component({
    selector: 'app-process-order',
    templateUrl: './process-order.component.html',
    styleUrls: ['./process-order.component.css'],
})
export class ProcessOrderComponent implements OnInit, OnDestroy {
    user: UserModel = new UserModel();
    userForm: FormGroup;
    addressPlaceholder = 'Address (required)';
    validationMessagesMap = new Map([
        [
            'firstName',
            {
                message: '', // message for user
                required: 'Please enter your first name.',
                minlength: 'The first name must be longer than 3 characters.',
            },
        ],
        [
            'email',
            {
                message: '',
                required: 'Please enter your email address.',
                email: 'Please enter a valid email address.',
            },
        ],
        [
            'address',
            {
                message: '',
                required: 'Please enter your address.',
            },
        ],
    ]);

    private sub: Subscription;

    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {
        this.buildForm();
        if (this.pickup) {
            this.sub = this.pickup.valueChanges.subscribe((value) => this.setAddressValidator(value));
        }
        const sub = this.userForm.valueChanges.pipe(debounceTime(500)).subscribe((_) => this.setValidationMessages());
        this.sub.add(sub);
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    onAddPhone(): void {
        this.phones.push(new FormControl(''));
    }

    onRemovePhone(index: number): void {
        this.phones.removeAt(index);
    }

    onBlur(event: any): void {
        const controlName = event.target.getAttribute('formControlName');
        this.setValidationMessages(controlName);
    }

    get firstName(): AbstractControl | null {
        return this.userForm.get('firstName');
    }

    get lastName(): AbstractControl | null {
        return this.userForm.get('lastName');
    }

    get email(): AbstractControl | null {
        return this.userForm.get('email');
    }

    get phones(): FormArray {
        return this.userForm.get('phones') as FormArray;
    }

    get address(): AbstractControl | null {
        return this.userForm.get('address');
    }

    get pickup(): AbstractControl | null {
        return this.userForm.get('pickup');
    }

    private buildForm(): void {
        this.userForm = this.fb.group({
            firstName: ['', [Validators.required, Validators.minLength(3)]],
            lastName: '',
            phones: this.fb.array([new FormControl('')]),
            address: ['', [Validators.required]],
            email: ['', Validators.required],
            pickup: false,
        });
    }

    private setAddressValidator(pickupValue: boolean): void {
        if (!pickupValue) {
            if (this.address) {
                this.address.setValidators([Validators.required]);
                this.addressPlaceholder = 'Address (required)';
                this.address.updateValueAndValidity();
            }
        } else {
            if (this.address) {
                this.address.clearValidators();
                this.addressPlaceholder = 'Address';
                this.address.updateValueAndValidity();
            }
        }
    }

    private setValidationMessages(controlName?: string): void {
        if (controlName) {
            this.buildValidationMessages(controlName);
        } else {
            this.validationMessagesMap.forEach((control, cntrlName) => {
                this.buildValidationMessages(cntrlName);
            });
        }
    }

    private buildValidationMessages(controlName: string): void {
        const control = this.userForm.get(controlName);
        this.validationMessagesMap.get(controlName)!.message = '';

        if ((control?.touched || control?.dirty) && control.invalid && control.errors) {
            this.validationMessagesMap.get(controlName)!.message = Object.keys(control.errors)
                .map((key) => (this.validationMessagesMap.get(controlName) as any)[key])
                .join(' ');
        }
    }
}
