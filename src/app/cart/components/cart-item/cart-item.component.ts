import { Component, Input } from '@angular/core';

import { IProductItem } from '../../../products/models/product.model';

@Component({
    selector: 'app-cart-item',
    templateUrl: './cart-item.component.html',
    styleUrls: ['./cart-item.component.css'],
})
export class CartItemComponent {
    @Input() cartProduct: IProductItem;
}
