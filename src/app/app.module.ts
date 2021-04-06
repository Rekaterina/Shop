import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CartModule } from './cart/cart.module';
import { ProductsModule } from './products/products.module';
import { SharedModule } from './shared/shared.module';
import { FirstComponent } from './first/components/first/first.component';
import { CoreModule } from './core/core.module';
import { LayoutModule } from './layout/layout.module';
import { httpInterceptorProviders } from './core/interceptors';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { RootStoreModule } from './core/@ngrx/root-store.module';

@NgModule({
    declarations: [AppComponent, FirstComponent],
    imports: [
        BrowserModule,
        CartModule,
        ProductsModule,
        SharedModule,
        CoreModule,
        LayoutModule,
        HttpClientModule,
        RootStoreModule,
        AppRoutingModule,
        StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    ],
    providers: [httpInterceptorProviders],
    bootstrap: [AppComponent],
})
export class AppModule {}
