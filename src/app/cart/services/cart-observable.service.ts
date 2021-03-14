import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { concatMap, catchError } from 'rxjs/operators';

import { ICartProductItem } from '../models/cart-product.model';
import { CartProductsAPI } from '../cart-products.config';
import { IProductItem } from 'src/app/products/models/product.model';

@Injectable({
    providedIn: 'any',
})
export class CartObservableService {
    constructor(private http: HttpClient, @Inject(CartProductsAPI) private cartProductsUrl: string) {}

    getCartProducts(): Observable<ICartProductItem[]> {
        return this.http.get<ICartProductItem[]>(this.cartProductsUrl).pipe(catchError(this.handleError));
    }

    removeCartProduct(id: number): Observable<ICartProductItem[]> {
        const url = `${this.cartProductsUrl}/${id}`;

        return this.http.delete(url).pipe(
            concatMap(() => this.getCartProducts()),
            catchError(this.handleError),
        );
    }

    createCartProduct(product: IProductItem): Observable<ICartProductItem[]> {
        const url = this.cartProductsUrl;
        const body = JSON.stringify({ ...product, quantity: 1 });
        const options = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        };

        return this.http.post<ICartProductItem>(url, body, options).pipe(
            concatMap(() => this.getCartProducts()),
            catchError(this.handleError),
        );
    }

    updateCartProduct(cartProduct: ICartProductItem): Observable<ICartProductItem[]> {
        const url = `${this.cartProductsUrl}/${cartProduct.id}`;
        const body = JSON.stringify(cartProduct);
        const options = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        };

        return this.http.put<ICartProductItem>(url, body, options).pipe(
            concatMap(() => this.getCartProducts()),
            catchError(this.handleError),
        );
    }

    private handleError(err: HttpErrorResponse): Observable<any> {
        // A client-side or network error occurred.
        if (err.error instanceof Error) {
            console.error('An error occurred:', err.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(`Backend returned code ${err.status}, body was: ${err.error}`);
        }

        return throwError('Something bad happened; please try again later.');
    }
}
