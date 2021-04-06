import { createFeatureSelector, createSelector } from '@ngrx/store';

import { AppState } from './../app.state';
import { ProductsState } from './products.state';
import { selectRouterState } from './../router';
import { IProductItem } from 'src/app/products/models/product.model';

export const selectProductsState = createFeatureSelector<AppState, ProductsState>('products');

export const selectProductsData = createSelector(selectProductsState, (state: ProductsState) => state.data);
export const selectProductsError = createSelector(selectProductsState, (state: ProductsState) => state.error);
export const selectProductsLoaded = createSelector(selectProductsState, (state: ProductsState) => state.loaded);

export const getProductByUrl = createSelector(selectProductsData, selectRouterState, (products, router):
    | IProductItem
    | undefined => {
    const productID = router.state.params.id;
    return products.find((product) => product.id === +productID);
});
