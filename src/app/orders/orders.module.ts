import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { ProcessOrderComponent } from './components/process-order/process-order.component';

@NgModule({
    declarations: [ProcessOrderComponent],
    imports: [CommonModule, OrdersRoutingModule],
})
export class OrdersModule {}
