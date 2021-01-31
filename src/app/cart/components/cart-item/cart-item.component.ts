import { Component, EventEmitter, Input, Output } from '@angular/core';

import { ICartProductItem } from '../../models/cart-product.model';

@Component({
    selector: 'app-cart-item',
    templateUrl: './cart-item.component.html',
    styleUrls: ['./cart-item.component.css'],
})
export class CartItemComponent {
    @Input() cartProduct: ICartProductItem;

    @Output() remove: EventEmitter<ICartProductItem> = new EventEmitter<ICartProductItem>();
    @Output() decreaseQuantity: EventEmitter<ICartProductItem> = new EventEmitter<ICartProductItem>();
    @Output() increaseQuantity: EventEmitter<ICartProductItem> = new EventEmitter<ICartProductItem>();

    onRemove(cartProduct: ICartProductItem): void {
        this.remove.emit(cartProduct);
    }

    onDecreaseQuantity(cartProduct: ICartProductItem): void {
        this.decreaseQuantity.emit(cartProduct);
    }

    onIncreaseQuantity(cartProduct: ICartProductItem): void {
        this.increaseQuantity.emit(cartProduct);
    }
}
