import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { catchError, mergeMap, retry, share } from 'rxjs/operators';
import { STORAGE } from '../core.module';
import { IAppSettings } from '../models/app-settings.model';
import { LocalStorageService } from './local-storage.service';

@Injectable({
    providedIn: 'root',
})
export class AppSettingsService {
    constructor(private http: HttpClient, @Inject(STORAGE) private storageService: LocalStorageService) {}

    getAppSettings(): Observable<IAppSettings> {
        const appSettings: IAppSettings = this.storageService.getItem('appSettings');
        if (appSettings) {
            return of(appSettings);
        }

        const appSettingsFromJson = this.http.get<IAppSettings>('../../../assets/app-settings.json').pipe(
            retry(2),
            share(),
            catchError(() => {
                console.error('error');
                return of(null);
            }),
        );

        return appSettingsFromJson.pipe(
            mergeMap((settings) => {
                if (!settings) {
                    return of({ orderBy: 'price', isAsc: false });
                } else {
                    this.storageService.setItem('appSettings', settings);
                    return of(settings);
                }
            }),
        );
    }
}
