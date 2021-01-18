import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FirstComponent } from './first/components/first/first.component';
import { ProductComponent } from './products/components/product/product.component';
import { ProductListComponent } from './products/components/product-list/product-list.component';
import { CartListComponent } from './cart/components/cart-list/cart-list.component';
import { CartItemComponent } from './cart/components/cart-item/cart-item.component';

@NgModule({
    declarations: [AppComponent, FirstComponent, ProductComponent, ProductListComponent, CartListComponent, CartItemComponent],
    imports: [BrowserModule, AppRoutingModule, CommonModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
