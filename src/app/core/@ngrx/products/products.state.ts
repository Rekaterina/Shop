import { IProductItem } from 'src/app/products/models/product.model';

export interface ProductsState {
    data: ReadonlyArray<IProductItem>;
    readonly loading: boolean;
    readonly loaded: boolean;
    readonly error: Error | string;
}

export const initialProductsState: ProductsState = {
    data: [],
    loading: false,
    loaded: false,
    error: '',
};
