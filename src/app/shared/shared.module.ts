import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HighlightDirective } from './directives/highlight.directive';
import { BorderChangeDirective } from './directives/border-change.directive';
import { YesNoPipe } from './pipes/yes-no.pipe';
import { OrderByPipe } from './pipes/order-by.pipe';

const expDirs = [HighlightDirective, BorderChangeDirective];
const expPipes = [YesNoPipe, OrderByPipe];
@NgModule({
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
    declarations: [expDirs, expPipes],
    exports: [CommonModule, FormsModule, ReactiveFormsModule, expDirs, expPipes],
})
export class SharedModule {}
