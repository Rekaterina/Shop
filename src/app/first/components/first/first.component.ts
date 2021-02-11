import { Component, Inject, OnInit, Optional } from '@angular/core';

import { ConfigOptionsService } from '../../../core/services/config-options.service';
import { generatedString5, GeneratorFactory } from '../../../core/generator.factory';
import { IConstants } from '../../../core/models/constants.model';
import { ConstantService, constantsToken } from '../../../core/services/constant.service';
import { GeneratorService } from '../../../core/services/generator';
import { Category } from '../../models/category.model';

@Component({
    selector: 'app-first',
    templateUrl: './first.component.html',
    providers: [
        GeneratorService,
        { provide: generatedString5, useFactory: GeneratorFactory(5), deps: [GeneratorService] },
        { provide: constantsToken, useValue: ConstantService },
    ],
})
export class FirstComponent implements OnInit {
    name = 'Harry Potter and the Prisoner of Azkaban';
    description = 'The novels chronicle the lives of a young wizard, Harry Potter, and his friends';
    price = 10;
    isAvailable = true;
    types: string[] = ['hardback', 'paperback'];
    category: string = Category.Fantasy;

    constructor(
        @Inject(constantsToken) private constants: IConstants,
        @Inject(generatedString5) private generated: string,
        @Optional()
        private configOptionsService: ConfigOptionsService,
    ) {}

    ngOnInit(): void {
        console.log('Constants:', this.constants);
        console.log('generatedString5:', this.generated);
        console.log('configOptions:', this.configOptionsService.getConfigOptions());
        this.configOptionsService.setConfigOptions({ id: 5, login: 'user1' });
        console.log('configOptions:', this.configOptionsService.getConfigOptions());
    }
}
