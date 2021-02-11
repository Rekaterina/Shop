import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'orderby',
})
export class OrderByPipe implements PipeTransform {
    transform(array: any[], key: string, isAsc: boolean = false): any {
        if (!isAsc) {
            array.sort((a, b) => (a[key] < b[key] ? 1 : -1));
        }
        if (isAsc) {
            array.sort((a, b) => (a[key] > b[key] ? 1 : -1));
        }
        return array;
    }
}
