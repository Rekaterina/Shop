import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import { AppState, getProductByUrl } from 'src/app/core/@ngrx';
import * as RouterActions from 'src/app/core/@ngrx/router/router.actions';

import { CartObservableService } from '../../../cart/services/cart-observable.service';
import { ICartProductItem } from '../../../cart/models/cart-product.model';
import { IProductItem } from '../../models/product.model';
import { ProductsPromiseService } from '../../services/products-promise.service';

@Component({
    selector: 'app-product-view',
    templateUrl: './product-view.component.html',
    styleUrls: ['./product-view.component.css'],
})
export class ProductViewComponent implements OnInit {
    product: IProductItem | undefined;
    cartProducts: ICartProductItem[];

    constructor(
        private store: Store<AppState>,
        public productsPromiseService: ProductsPromiseService,
        public cartObservableService: CartObservableService,
    ) {}

    ngOnInit(): void {
        this.store.select(getProductByUrl).subscribe((product) => {
            this.product = product;
        });
        this.cartObservableService.getCartProducts().subscribe((cartProducts) => {
            this.cartProducts = cartProducts;
        });
    }

    onBuy(product: IProductItem): void {
        const itemIndex = this.cartProducts.findIndex((item) => item.id === product.id);
        if (itemIndex !== -1) {
            const cartProduct = this.cartProducts[itemIndex];
            this.cartObservableService
                .updateCartProduct({ ...cartProduct, quantity: cartProduct.quantity + 1 })
                .subscribe((cartProducts) => {
                    this.cartProducts = cartProducts;
                });
        } else {
            this.cartObservableService.createCartProduct(product).subscribe((cartProducts) => {
                this.cartProducts = cartProducts;
            });
        }
    }

    onBack(): void {
        this.store.dispatch(RouterActions.back());
    }
}
