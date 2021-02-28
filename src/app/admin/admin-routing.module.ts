import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductListComponent } from '../products/components/product-list/product-list.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { AdminComponent } from './components/admin/admin.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { OrdersComponent } from './components/orders/orders.component';
import { AdminGuard } from './guards/admin.guard';

const routes: Routes = [
    {
        path: '',
        component: AdminComponent,
        canLoad: [AdminGuard],
        canActivate: [AdminGuard],
        children: [
            {
                path: '',
                children: [
                    {
                        path: 'products',
                        component: ProductListComponent,
                    },
                    {
                        path: 'orders',
                        component: OrdersComponent,
                    },
                    {
                        path: 'products/add',
                        component: AddProductComponent,
                    },
                    {
                        path: 'product/edit/:id',
                        component: EditProductComponent,
                        canDeactivate: [AdminGuard],
                        resolve: { product: AdminGuard },
                    },
                ],
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AdminRoutingModule {}
