import { Inject, Injectable } from '@angular/core';

import { IProductItem } from '../../products/models/product.model';
import { LocalStorageService } from '../../core/services/local-storage.service';
import { STORAGE } from '../../core/core.module';
import { ICartData } from '../models/cart-data.model';
import { ICartProductItem } from '../models/cart-product.model';

@Injectable({
    providedIn: 'root',
})
export class CartService {
    private cartProducts: Array<ICartProductItem> = [];
    private cartData = { totalQuantity: 0, totalSum: 0 };

    constructor(@Inject(STORAGE) private storageService: LocalStorageService) {}

    addCartProduct(product: IProductItem): void {
        const itemIndex = this.getCartProductIndex(product);
        if (itemIndex !== -1) {
            this.cartProducts[itemIndex].quantity += 1;
        } else {
            this.cartProducts.push({ ...product, quantity: 1 });
        }
        this.updateCartData();
    }

    getCartProducts(): Array<ICartProductItem> {
        if (localStorage.cartProducts) {
            this.cartProducts = this.storageService.getItem('cartProducts');
        }
        return this.cartProducts;
    }

    removeAllProducts(): void {
        this.cartProducts.splice(0, this.cartProducts.length);
        this.updateCartData();
    }

    removeProduct(cartProduct: ICartProductItem): void {
        const itemIndex = this.getCartProductIndex(cartProduct);
        this.cartProducts.splice(itemIndex, 1);
        this.updateCartData();
    }

    getCartData(): ICartData {
        if (localStorage.cartData) {
            this.cartData = this.storageService.getItem('cartData');
        }
        return this.cartData;
    }

    decreaseQuantity(cartProduct: ICartProductItem, quantity: number = 1, isIncrease: boolean = false): void {
        this.changeQuantity(cartProduct, quantity, isIncrease);
        this.updateCartData();
    }

    increaseQuantity(cartProduct: ICartProductItem, quantity: number = 1, isIncrease: boolean = true): void {
        this.changeQuantity(cartProduct, quantity, isIncrease);
        this.updateCartData();
    }

    isEmptyCart(): boolean {
        return this.cartProducts.length === 0;
    }

    private changeQuantity(cartProduct: ICartProductItem, quantity: number, isIncrease: boolean): void {
        const itemIndex = this.getCartProductIndex(cartProduct);
        if (isIncrease) {
            this.cartProducts[itemIndex].quantity += quantity;
        } else {
            if (this.cartProducts[itemIndex].quantity <= quantity) {
                this.cartProducts.splice(itemIndex, 1);
            } else {
                this.cartProducts[itemIndex].quantity -= quantity;
            }
        }
    }

    private updateCartData(): void {
        this.cartData.totalQuantity = this.cartProducts.reduce((acc, item) => acc + item.quantity, 0);
        this.cartData.totalSum = this.cartProducts.reduce((acc, item) => acc + item.price * item.quantity, 0);
        this.storageService.setItem('cartProducts', this.cartProducts);
        this.storageService.setItem('cartData', this.cartData);
    }

    private getCartProductIndex(product: IProductItem): number {
        return this.cartProducts.findIndex((item) => item.id === product.id);
    }
}
