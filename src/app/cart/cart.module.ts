import { NgModule } from '@angular/core';

import { CartListComponent } from './components/cart-list/cart-list.component';
import { CartItemComponent } from './components/cart-item/cart-item.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    imports: [SharedModule],
    declarations: [CartListComponent, CartItemComponent],
    exports: [CartListComponent],
})
export class CartModule {}
