import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { ProcessOrderComponent } from './components/process-order/process-order.component';
import { SharedModule } from '../shared/shared.module';
import { EmailDirective } from './validators';

@NgModule({
    declarations: [ProcessOrderComponent, EmailDirective],
    imports: [CommonModule, OrdersRoutingModule, SharedModule],
})
export class OrdersModule {}
