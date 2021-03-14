import { Injectable } from '@angular/core';
import { CanActivate, CanLoad } from '@angular/router';

import { Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICartProductItem } from '../../cart/models/cart-product.model';
import { CartObservableService } from '../../cart/services/cart-observable.service';

@Injectable({
    providedIn: 'root',
})
export class OrdersGuard implements CanLoad, CanActivate {
    cartProducts: ICartProductItem[];

    constructor(public cartObservableService: CartObservableService) {}

    canLoad(): Observable<boolean> {
        return this.getCheck();
    }

    canActivate(): Observable<boolean> {
        return this.getCheck();
    }

    getCheck(): Observable<boolean> {
        return this.cartObservableService.getCartProducts().pipe(
            mergeMap((cartProducts) => {
                if (cartProducts.length === 0) {
                    alert('Cart is empty');
                    return of(false);
                } else {
                    return of(true);
                }
            }),
        );
    }
}
