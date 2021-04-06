import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { Store } from '@ngrx/store';

import * as RouterActions from 'src/app/core/@ngrx/router/router.actions';

import { AdminService } from '../../../admin/services/admin.service';
import { IProductItem } from '../../models/product.model';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductComponent {
    @Input() product: IProductItem;

    @Output() buy: EventEmitter<IProductItem> = new EventEmitter<IProductItem>();
    @Output() remove: EventEmitter<IProductItem> = new EventEmitter<IProductItem>();

    constructor(public adminService: AdminService, private store: Store) {}

    onBuy(product: IProductItem): void {
        this.buy.emit(product);
    }

    onRemove(product: IProductItem): void {
        this.remove.emit(product);
    }

    onSeeProductDetails(id: number): void {
        this.store.dispatch(
            RouterActions.go({
                path: ['/product', id],
            }),
        );
    }

    onEdit(id: number): void {
        this.store.dispatch(
            RouterActions.go({
                path: ['/admin/product/edit', id],
            }),
        );
    }
}
