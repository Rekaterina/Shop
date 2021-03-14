import { Injectable } from '@angular/core';

import { ICartData } from '../../cart/models/cart-data.model';
import { ICartProductItem } from '../../cart/models/cart-product.model';
import { IAppSettings } from '../models/app-settings.model';

@Injectable()
export class LocalStorageService {
    setItem(key: string, value: Array<ICartProductItem> | ICartData | IAppSettings): void {
        localStorage.setItem(key, JSON.stringify(value));
    }

    getItem(key: string): any {
        const storageValue = localStorage.getItem(key);
        if (storageValue) {
            return JSON.parse(storageValue);
        }
    }
}
