import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import * as RouterActions from 'src/app/core/@ngrx/router/router.actions';

import { AppSettingsService } from '../../../core/services/app-settings.service';
import { ICartProductItem } from '../../models/cart-product.model';
import { CartObservableService } from '../../services/cart-observable.service';
import { CartService } from '../../services/cart.service';

@Component({
    selector: 'app-cart-list',
    templateUrl: './cart-list.component.html',
    styleUrls: ['./cart-list.component.css'],
})
export class CartListComponent implements OnInit {
    cartProducts: ICartProductItem[];
    cartData = { totalQuantity: 0, totalSum: 0 };
    orderBy: string;
    isAsc: boolean;
    keys = ['price', 'name', 'quantity'];

    constructor(
        public cartService: CartService,
        public cartObservableService: CartObservableService,
        public appSettingsService: AppSettingsService,
        private store: Store,
    ) {}

    ngOnInit(): void {
        this.cartObservableService.getCartProducts().subscribe((cartProducts) => {
            this.cartProducts = cartProducts;
            this.updateCartData();
        });

        this.appSettingsService.getAppSettings().subscribe((appSettings) => {
            this.orderBy = appSettings.orderBy;
            this.isAsc = appSettings.isAsc;
        });
    }

    onRemoveAll(cartProducts: ICartProductItem[]): void {
        this.cartObservableService.removeCartProducts(cartProducts).subscribe((cartProductsData) => {
            this.cartProducts = cartProductsData;
            this.updateCartData();
        });
    }

    onRemove(cartProduct: ICartProductItem): void {
        this.cartObservableService.removeCartProduct(cartProduct.id).subscribe((cartProducts) => {
            this.cartProducts = cartProducts;
            this.updateCartData();
        });
    }

    onDecreaseQuantity(cartProduct: ICartProductItem): void {
        if (cartProduct.quantity === 1) {
            this.cartObservableService.removeCartProduct(cartProduct.id).subscribe((cartProducts) => {
                this.cartProducts = cartProducts;
            });
        } else {
            this.cartObservableService
                .updateCartProduct({ ...cartProduct, quantity: cartProduct.quantity - 1 })
                .subscribe((cartProducts) => {
                    this.cartProducts = cartProducts;
                    this.updateCartData();
                });
        }
    }

    onIncreaseQuantity(cartProduct: ICartProductItem): void {
        this.cartObservableService
            .updateCartProduct({ ...cartProduct, quantity: cartProduct.quantity + 1 })
            .subscribe((cartProducts) => {
                this.cartProducts = cartProducts;
                this.updateCartData();
            });
    }

    trackByCartProducts(index: number, cartProduct: ICartProductItem): number {
        return cartProduct.id;
    }

    onOrder(): void {
        this.store.dispatch(
            RouterActions.go({
                path: ['/order'],
            }),
        );
    }

    private updateCartData(): void {
        this.cartData.totalQuantity = this.cartProducts.reduce((acc, item) => acc + item.quantity, 0);
        this.cartData.totalSum = this.cartProducts.reduce((acc, item) => acc + item.price * item.quantity, 0);
    }
}
