import { NgModule } from '@angular/core';

import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductComponent } from './components/product/product.component';
import { SharedModule } from '../shared/shared.module';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductViewComponent } from './components/product-view/product-view.component';
import { CartRoutingModule } from '../cart/cart-routing.module';

@NgModule({
    imports: [SharedModule, ProductsRoutingModule, CartRoutingModule],
    declarations: [ProductListComponent, ProductComponent, ProductViewComponent],
})
export class ProductsModule {}
