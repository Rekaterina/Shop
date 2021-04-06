import { Injectable } from '@angular/core';
import { CanLoad, UrlTree, CanActivate, CanDeactivate, ActivatedRouteSnapshot, Router } from '@angular/router';

import { Observable, of } from 'rxjs';
import { map, catchError, take } from 'rxjs/operators';

import { Store } from '@ngrx/store';

import * as RouterActions from 'src/app/core/@ngrx/router/router.actions';

import { IProductItem } from '../../products/models/product.model';
import { ProductsService } from '../../products/services/products.service';
import { EditProductComponent } from '../components/edit-product/edit-product.component';
import { AdminService } from '../services/admin.service';

@Injectable({
    providedIn: 'root',
})
export class AdminGuard implements CanLoad, CanActivate, CanDeactivate<EditProductComponent> {
    constructor(public adminService: AdminService, public productsService: ProductsService, private store: Store) {}

    canLoad(): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.adminService.checkAccess();
    }

    canActivate(): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.adminService.checkAccess();
    }

    canDeactivate(
        component: EditProductComponent,
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if (component.isChanged) {
            return confirm('Discard changes?');
        }
        return true;
    }

    resolve(route: ActivatedRouteSnapshot): Observable<IProductItem | null> {
        return of(this.productsService.getProduct(+route.params.id)).pipe(
            map((product: IProductItem | null) => {
                if (product) {
                    return product;
                } else {
                    this.store.dispatch(
                        RouterActions.go({
                            path: ['/admin/products'],
                        }),
                    );
                    return null;
                }
            }),
            take(1),
            catchError(() => {
                this.store.dispatch(
                    RouterActions.go({
                        path: ['/admin/products'],
                    }),
                );
                return of(null);
            }),
        );
    }
}
