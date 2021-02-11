import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CartModule } from './cart/cart.module';
import { ProductsModule } from './products/products.module';
import { SharedModule } from './shared/shared.module';
import { FirstComponent } from './first/components/first/first.component';
import { CoreModule } from './core/core.module';

@NgModule({
    declarations: [AppComponent, FirstComponent],
    imports: [BrowserModule, AppRoutingModule, CartModule, ProductsModule, SharedModule, CoreModule],
    bootstrap: [AppComponent],
})
export class AppModule {}
