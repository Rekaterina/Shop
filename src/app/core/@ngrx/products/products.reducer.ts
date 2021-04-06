import { Action, createReducer, on } from '@ngrx/store';

import { ProductsState, initialProductsState } from './products.state';
import * as ProductsActions from './products.actions';

const reducer = createReducer(
    initialProductsState,
    on(ProductsActions.getProducts, (state) => {
        return {
            ...state,
            loading: true,
        };
    }),

    on(ProductsActions.getProductsSuccess, (state, { products }) => {
        const data = [...products];
        return {
            ...state,
            data,
            loading: false,
            loaded: true,
        };
    }),
    on(ProductsActions.getProductsError, (state, { error }) => {
        return {
            ...state,
            loading: false,
            loaded: false,
            error,
        };
    }),

    on(ProductsActions.deleteProduct, (state) => {
        return { ...state };
    }),

    on(ProductsActions.deleteProductSuccess, (state, { product }) => {
        const data = state.data.filter((item) => item.id !== product.id);

        return {
            ...state,
            data,
        };
    }),

    on(ProductsActions.deleteProductError, (state, { error }) => {
        return {
            ...state,
            error,
        };
    }),
);

export function productsReducer(state: ProductsState | undefined, action: Action): ProductsState {
    return reducer(state, action);
}
