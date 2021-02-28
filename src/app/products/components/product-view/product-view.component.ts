import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { CartService } from '../../../cart/services/cart.service';
import { IProductItem } from '../../models/product.model';
import { ProductsService } from '../../services/products.service';

@Component({
    selector: 'app-product-view',
    templateUrl: './product-view.component.html',
    styleUrls: ['./product-view.component.css'],
})
export class ProductViewComponent implements OnInit {
    product: IProductItem | null;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        public cartService: CartService,
        public productsService: ProductsService,
    ) {}

    ngOnInit(): void {
        this.product = this.productsService.getProduct(+this.route.snapshot.params.id);
    }

    onBuy(product: IProductItem): void {
        this.cartService.addCartProduct(product);
    }

    onBack(): void {
        this.router.navigate(['/products-list']);
    }
}
