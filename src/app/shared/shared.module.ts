import { InjectionToken, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HighlightDirective } from './directives/highlight.directive';
import { ConstantService, constantsToken } from '../core/services/constant.service';
import { LocalStorageService } from '../core/services/local-storage.service';
import { BorderChangeDirective } from './directives/border-change.directive';
import { FirstComponent } from '../first/components/first/first.component';

export const STORAGE = new InjectionToken<LocalStorageService>('Storage');

const expDirs = [HighlightDirective, BorderChangeDirective, FirstComponent];

@NgModule({
    imports: [CommonModule],
    declarations: [...expDirs],
    exports: [CommonModule, ...expDirs],
    // не верный подход в декларации сервисов в том модуле, который экспортирует
    // компоненты, директивы, пайпы.
    // Надо использовать другой модуль, который подключается к приложенияю только один раз
    // Если такого нет, то создать.
    providers: [
        { provide: constantsToken, useValue: ConstantService },
        { provide: STORAGE, useClass: LocalStorageService },
    ],
})
export class SharedModule {}
