import { Component, OnInit } from '@angular/core';

import { ICartData } from '../../models/cart-data.model';
import { ICartProductItem } from '../../models/cart-product.model';
import { CartService } from '../../services/cart.service';

@Component({
    selector: 'app-cart-list',
    templateUrl: './cart-list.component.html',
    styleUrls: ['./cart-list.component.css'],
})
export class CartListComponent implements OnInit {
    cartProducts: Array<ICartProductItem>;
    cartData: ICartData;

    constructor(public cartService: CartService) {}

    ngOnInit(): void {
        this.cartProducts = this.cartService.getCartProducts();
        this.cartData = this.cartService.getCartData();
    }

    onRemoveAll(): void {
        this.cartService.removeAllProducts();
    }

    onRemove(cartProduct: ICartProductItem): void {
        this.cartService.removeProduct(cartProduct);
    }

    onDecreaseQuantity(cartProduct: ICartProductItem): void {
        this.cartService.decreaseQuantity(cartProduct);
    }

    onIncreaseQuantity(cartProduct: ICartProductItem): void {
        this.cartService.increaseQuantity(cartProduct);
    }

    trackByCartProducts(index: number, cartProduct: ICartProductItem): number {
        return cartProduct.id;
    }
}
