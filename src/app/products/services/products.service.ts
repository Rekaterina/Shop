import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { IProductItem } from '../models/product.model';

@Injectable({
    providedIn: 'root',
})
export class ProductsService {
    dataProducts: Array<IProductItem> = [
        {
            id: 0,
            category: 'Fantasy',
            name: 'Harry Potter and the Prisoner of Azkaban',
            author: 'J.K. Rowling',
            description: 'The novels chronicle the lives of a young wizard, Harry Potter, and his friends.',
            price: 10,
            isAvailable: true,
        },
        {
            id: 1,
            category: 'Science fiction',
            name: 'Cloud Atlas',
            author: 'David Mitchell',
            description: 'The fantastical speculative fiction book consists of six interconnected nested stories.',
            price: 15,
            isAvailable: true,
        },
        {
            id: 2,
            category: 'Novel',
            name: 'The Adventures of Tom Sawyer',
            author: 'Mark Twain',
            description: 'The novel about a young boy growing up along the Mississippi River.',
            price: 12,
            isAvailable: true,
        },
        {
            id: 3,
            category: 'Fairy tale',
            name: 'Little Red Riding Hood',
            author: 'Charles Perrault',
            description: 'The fairy tale about a young girl and a Big Bad Wolf.',
            price: 8,
            isAvailable: false,
        },
    ];

    getProducts(): Observable<IProductItem[]> {
        return of(this.dataProducts);
    }
}
