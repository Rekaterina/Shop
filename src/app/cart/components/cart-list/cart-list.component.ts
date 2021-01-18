import { Component, OnInit } from '@angular/core';

import { IProductItem } from '../../../products/models/product.model';
import { CartService } from '../../services/cart.service';

@Component({
    selector: 'app-cart-list',
    templateUrl: './cart-list.component.html',
    styleUrls: ['./cart-list.component.css'],
})
export class CartListComponent implements OnInit {
    cartProducts: Array<IProductItem> = [];

    constructor(public cartService: CartService) {}

    ngOnInit(): void {
        this.cartProducts = this.cartService.getCartProducts();
    }

    onRemoveAll(): void {
        this.cartService.removeAllProducts();
    }

    trackByCartProducts(index: number, cartProduct: IProductItem): number {
        return cartProduct.id;
    }
}
