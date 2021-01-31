import { Injectable } from '@angular/core';

@Injectable()
export class GeneratorService {
    generate(n: number): string {
        let result = '';
        const symbols = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < n; i++) {
            result += symbols.charAt(Math.floor(Math.random() * symbols.length));
        }
        return result;
    }
}
