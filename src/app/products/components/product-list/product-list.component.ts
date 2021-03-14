import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ICartProductItem } from '../../../cart/models/cart-product.model';
import { CartObservableService } from '../../../cart/services/cart-observable.service';
import { AdminService } from '../../../admin/services/admin.service';
import { IProductItem } from '../../models/product.model';
import { ProductsPromiseService } from '../../services/products-promise.service';

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

    constructor(
        public productsPromiseService: ProductsPromiseService,
        public adminService: AdminService,
        private router: Router,
        public cartObservableService: CartObservableService,
    ) {}

    ngOnInit(): void {
        this.products = this.productsPromiseService.getProducts();
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
        const link = ['/admin/products/add'];
        this.router.navigate(link);
    }
}
