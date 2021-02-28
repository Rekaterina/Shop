import { Injectable } from '@angular/core';
import { Router, CanLoad, UrlTree } from '@angular/router';

import { Observable } from 'rxjs';

import { CartService } from '../../cart/services/cart.service';

@Injectable({
    providedIn: 'root',
})
export class OrdersGuard implements CanLoad {
    constructor(public cartService: CartService) {}

    canLoad(): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        if (this.cartService.isEmptyCart()) {
            alert('Cart is empty');
            return false;
        }
        return true;
    }
}
