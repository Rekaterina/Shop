import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './components/admin/admin.component';
import { OrdersComponent } from './components/orders/orders.component';
import { AddProductComponent } from './components/add-product/add-product.component';

@NgModule({
    declarations: [AdminComponent, OrdersComponent, AddProductComponent],
    imports: [CommonModule, AdminRoutingModule],
})
export class AdminModule {}
