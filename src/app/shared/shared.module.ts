import { InjectionToken, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HighlightDirective } from './directives/highlight.directive';
import { ConstantService, constantsToken } from '../core/services/constant.service';
import { LocalStorageService } from '../core/services/local-storage.service';
import { BorderChangeDirective } from './directives/border-change.directive';
import { FirstComponent } from '../first/components/first/first.component';

export const STORAGE = new InjectionToken<LocalStorageService>('Storage');

@NgModule({
    imports: [CommonModule],
    declarations: [HighlightDirective, BorderChangeDirective, FirstComponent],
    exports: [CommonModule, HighlightDirective, BorderChangeDirective, FirstComponent],
    providers: [
        { provide: constantsToken, useValue: ConstantService },
        { provide: STORAGE, useClass: LocalStorageService },
    ],
})
export class SharedModule {}
