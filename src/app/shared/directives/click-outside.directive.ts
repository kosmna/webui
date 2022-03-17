import { Directive, ElementRef, Output, EventEmitter, HostListener } from '@angular/core';

@Directive({
    selector: '[loopClickOutside]'
})
export class LoopClickOutsideDirective {
    @Output()
    clickOutside = new EventEmitter();

    constructor(private _elementRef: ElementRef) {
    }


    @HostListener('document:click', ['$event.target'])
    onClick(targetElement) {
        const clickedInside = this._elementRef.nativeElement.contains(targetElement);
        if (!clickedInside) {
            this.clickOutside.emit(null);
        }
    }
}
