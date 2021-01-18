import { Injectable } from '@angular/core';

import { IProductItem } from '../../products/models/product.model';

@Injectable({
    providedIn: 'root',
})
export class CartService {
    cartProducts: Array<IProductItem> = [];

    addCartProduct(product: IProductItem): void {
        this.cartProducts.push(product);
    }

    getCartProducts(): Array<IProductItem> {
        return this.cartProducts;
    }

    removeAllProducts(): void {
        this.cartProducts.splice(0, this.cartProducts.length);
    }
}
