import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
    selector: '[appBorderChange]',
})
export class BorderChangeDirective {
    @Input('appBorderChange') color: string;

    constructor(private el: ElementRef, private render: Renderer2) {}

    @HostListener('click')
    onClick(): void {
        this.changeBorder(this.color);
    }

    private changeBorder(color: string): void {
        this.render.setStyle(this.el.nativeElement, 'border', `2px solid ${color}`);
    }
}
