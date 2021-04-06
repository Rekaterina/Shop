import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';

import { selectProductsData, selectProductsError, AppState } from 'src/app/core/@ngrx';
import * as RouterActions from 'src/app/core/@ngrx/router/router.actions';
import * as ProductsActions from 'src/app/core/@ngrx/products/products.actions';

import { ICartProductItem } from '../../../cart/models/cart-product.model';
import { CartObservableService } from '../../../cart/services/cart-observable.service';
import { AdminService } from '../../../admin/services/admin.service';
import { IProductItem } from '../../models/product.model';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
    products: Promise<IProductItem[]>;
    cartProducts: ICartProductItem[];
    selectedId: number;
    isShowAddProductButton: boolean;
    products$: Observable<ReadonlyArray<IProductItem>>;
    productsError$: Observable<Error | string>;

    constructor(
        public adminService: AdminService,
        private router: Router,
        public cartObservableService: CartObservableService,
        private store: Store<AppState>,
    ) {}

    ngOnInit(): void {
        this.products$ = this.store.select(selectProductsData);
        this.productsError$ = this.store.select(selectProductsError);
        this.store.dispatch(ProductsActions.getProducts());

        this.cartObservableService.getCartProducts().subscribe((cartProducts) => {
            this.cartProducts = cartProducts;
        });
        this.isShowAddProductButton =
            !(this.router.routerState.snapshot.url === '/products-list') && this.adminService.isAdmin();
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

    onAddProduct(): void {
        this.store.dispatch(
            RouterActions.go({
                path: ['/admin/products/add'],
            }),
        );
    }

    onRemoveProduct(product: IProductItem): void {
        const productToRemove: IProductItem = { ...product };
        this.store.dispatch(ProductsActions.deleteProduct({ product: productToRemove }));
    }
}
