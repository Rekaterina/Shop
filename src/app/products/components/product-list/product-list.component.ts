import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';

import { AdminService } from '../../../admin/services/admin.service';
import { CartService } from '../../../cart/services/cart.service';
import { IProductItem } from '../../models/product.model';
import { ProductsService } from '../../services/products.service';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
    products: Observable<IProductItem[]>;
    selectedId: number;
    isShowAddProductButton: boolean;

    constructor(
        public productsService: ProductsService,
        public cartService: CartService,
        public adminService: AdminService,
        private router: Router,
    ) {}

    ngOnInit(): void {
        this.products = this.productsService.getProducts();
        this.isShowAddProductButton =
            !(this.router.routerState.snapshot.url === '/products-list') && this.adminService.isAdmin();
    }

    onBuy(product: IProductItem): void {
        this.cartService.addCartProduct(product);
    }

    onAddProduct(): void {
        const link = ['/admin/products/add'];
        this.router.navigate(link);
    }
}
