import { Component } from '@angular/core';
import { Category } from '../../models/category.model';

@Component({
    selector: 'app-first',
    templateUrl: './first.component.html',
})
export class FirstComponent {
    name = 'Harry Potter and the Prisoner of Azkaban';
    description = 'The novels chronicle the lives of a young wizard, Harry Potter, and his friends';
    price = 10;
    isAvailable = true;
    types: string[] = ['hardback', 'paperback'];
    category: string = Category.Fantasy;
}
