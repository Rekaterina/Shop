import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { concatMap, pluck, switchMap } from 'rxjs/operators';

import { Action } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as ProductsActions from './products.actions';
import { ProductsPromiseService } from 'src/app/products/services/products-promise.service';
import { IProductItem } from 'src/app/products/models/product.model';

@Injectable()
export class ProductsEffects {
    constructor(private actions$: Actions, private productsPromiseService: ProductsPromiseService) {}

    getProducts$: Observable<Action> = createEffect(() =>
        this.actions$.pipe(
            ofType(ProductsActions.getProducts),
            switchMap((action) =>
                this.productsPromiseService
                    .getProducts()
                    .then((products) => ProductsActions.getProductsSuccess({ products }))
                    .catch((error) => ProductsActions.getProductsError({ error })),
            ),
        ),
    );

    deleteProduct$: Observable<Action> = createEffect(() =>
        this.actions$.pipe(
            ofType(ProductsActions.deleteProduct),
            pluck('product'),
            concatMap((product: IProductItem) =>
                this.productsPromiseService
                    .deleteProduct(product)
                    .then(() => {
                        return ProductsActions.deleteProductSuccess({ product });
                    })
                    .catch((error) => ProductsActions.deleteProductError({ error })),
            ),
        ),
    );
}
