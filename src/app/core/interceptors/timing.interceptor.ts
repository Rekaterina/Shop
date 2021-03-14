import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TimingInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const start = Date.now();
        return next.handle(req).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse && req.url.includes('products')) {
                    console.log(`Products request timing: ${Date.now() - start}ms`);
                }
                if (event instanceof HttpResponse && req.url.includes('cart')) {
                    console.log(`Cart request timing: ${Date.now() - start}ms`);
                }
                return event;
            }),
        );
    }
}
