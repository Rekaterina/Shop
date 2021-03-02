import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

import { AdminService } from '../../../admin/services/admin.service';
import { IProductItem } from '../../models/product.model';
import { ProductsService } from '../../services/products.service';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductComponent {
    @Input() product: IProductItem;

    @Output() buy: EventEmitter<IProductItem> = new EventEmitter<IProductItem>();

    // лишняя зависимость?
    constructor(/*public productsService: ProductsService, */ private router: Router, public adminService: AdminService) {}

    onBuy(product: IProductItem): void {
        this.buy.emit(product);
    }

    onSeeProductDetails(id: number): void {
        const link = ['/product', id];
        this.router.navigate(link);
    }

    onEdit(id: number): void {
        const link = ['/admin/product/edit', id];
        this.router.navigate(link);
    }
}
