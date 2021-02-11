import { InjectionToken, NgModule } from '@angular/core';

import { LocalStorageService } from '../core/services/local-storage.service';

export const STORAGE = new InjectionToken<LocalStorageService>('Storage');

@NgModule({
    imports: [],
    declarations: [],
    exports: [],
    providers: [{ provide: STORAGE, useClass: LocalStorageService }],
})
export class CoreModule {}
