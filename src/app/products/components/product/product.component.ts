import { Component, EventEmitter, Input, Output } from '@angular/core';

import { IProductItem } from '../../models/product.model';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.css'],
})
export class ProductComponent {
    @Input() product: IProductItem;

    @Output() buy: EventEmitter<IProductItem> = new EventEmitter<IProductItem>();

    onBuy(product: IProductItem): void {
        this.buy.emit(product);
    }
}
