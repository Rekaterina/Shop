import { Component, OnInit } from '@angular/core';

import { CartService } from '../../../cart/services/cart.service';
import { IProductItem } from '../../models/product.model';
import { ProductsService } from '../../services/products.service';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
    products: Array<IProductItem> = [];

    constructor(public productsService: ProductsService, public cartService: CartService) {}

    ngOnInit(): void {
        this.products = this.productsService.getProducts();
    }

    onBuy(product: IProductItem): void {
        this.cartService.addCartProduct(product);
    }
}
