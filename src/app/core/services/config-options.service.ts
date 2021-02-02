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
      // по моему так проще или нет?
        this.configOptions = {...this.configOptions, ...options};

        // for (const key in options) {
        //     if (options.hasOwnProperty(key)) {
        //         (this.configOptions as Record<string, any>)[key] = (options as Record<string, any>)[key];
        //     }
        // }
    }
}
