import { createAction, props } from '@ngrx/store';

import { IProductItem } from 'src/app/products/models/product.model';

export const getProducts = createAction('[Products List Page (App)] GET_PRODUCTS');

export const getProductsSuccess = createAction(
    '[Get Products Effect] GET_PRODUCTS_SUCCEESS',
    props<{ products: IProductItem[] }>(),
);
export const getProductsError = createAction(
    '[Get Products Effect] GET_PRODUCTS_ERROR',
    props<{ error: Error | string }>(),
);

export const deleteProduct = createAction('[Product List Page] DELETE_PRODUCT', props<{ product: IProductItem }>());

export const deleteProductSuccess = createAction(
    '[Delete Product Effect] DELETE_PRODUCT_SUCCESS',
    props<{ product: IProductItem }>(),
);

export const deleteProductError = createAction(
    '[Delete Product Effect] DELETE_PRODUCT_ERROR',
    props<{ error: Error | string }>(),
);
