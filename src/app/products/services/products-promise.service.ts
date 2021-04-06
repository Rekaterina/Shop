import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { IProductItem } from '../models/product.model';

@Injectable({
    providedIn: 'any',
})
export class ProductsPromiseService {
    private productsUrl = 'http://localhost:3000/products';

    constructor(private http: HttpClient) {}

    getProducts(): Promise<IProductItem[]> {
        return this.http
            .get(this.productsUrl)
            .toPromise()
            .then((response) => response as IProductItem[])
            .catch(this.handleError);
    }

    getProduct(id: number): Promise<IProductItem> {
        const url = `${this.productsUrl}/${id}`;

        return this.http
            .get(url)
            .toPromise()
            .then((response) => response as IProductItem)
            .catch(this.handleError);
    }

    deleteProduct(product: IProductItem): Promise<IProductItem> {
        const url = `${this.productsUrl}/${product.id}`;

        return this.http
            .delete(url)
            .toPromise()
            .then((response) => response as IProductItem)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}
