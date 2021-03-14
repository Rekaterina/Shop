import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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
    product: IProductItem;
    cartProducts: ICartProductItem[];

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        public productsPromiseService: ProductsPromiseService,
        public cartObservableService: CartObservableService,
    ) {}

    ngOnInit(): void {
        this.productsPromiseService
            .getProduct(+this.route.snapshot.params.id)
            .then((product) => (this.product = product))
            .catch((err) => console.log(err));
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
        this.router.navigate(['/products-list']);
    }
}
