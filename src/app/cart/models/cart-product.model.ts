import { IProductItem } from '../../products/models/product.model';

export interface ICartProductItem extends IProductItem {
    quantity: number;
}
