import { InjectionToken } from '@angular/core';

import { IConstants } from '../models/constants.model';

export const constantsToken = new InjectionToken<IConstants>('Constants');

export const ConstantService: IConstants = {
    App: 'TaskManager',
    Ver: '1.0',
};
