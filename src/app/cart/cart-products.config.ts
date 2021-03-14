import { InjectionToken } from '@angular/core';

export const CartProductsAPI = new InjectionToken<string>('CartProductsAPI', {
    providedIn: 'any',
    factory: () => 'http://localhost:3000/cart',
});
