import { Injectable } from '@angular/core';

import { IConfig } from '../models/config.model';

@Injectable({
    providedIn: 'root',
})
export class ConfigOptionsService {
    configOptions: IConfig = { id: 4, login: 'admin', email: 'admin123' };

    getConfigOptions(): IConfig {
        return this.configOptions;
    }

    setConfigOptions(options: IConfig): void {
        this.configOptions = { ...this.configOptions, ...options };
    }
}
