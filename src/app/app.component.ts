import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit {
    @ViewChild('appTitle') titleElem: ElementRef<HTMLElement>;

    ngAfterViewInit(): void {
        this.titleElem.nativeElement.innerText = 'Book shop';
    }
}
