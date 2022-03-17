import {
  Directive,
  EventEmitter,
  HostListener,
  ElementRef,
  Renderer2,
  Inject,
  Output,
  ContentChild, } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { LoopFileInputComponent } from '@app/shared/components/file/loop-file-input';

@Directive({
  selector: '[loopDropFile]'
})
export class DropFileDirective {
  @ContentChild(LoopFileInputComponent) fileComp: LoopFileInputComponent;
  @Output() fileDropped: EventEmitter<FileList> = new EventEmitter();

  template: HTMLSpanElement;
  constructor(
    private _elRef: ElementRef,
    private _renderer: Renderer2,
    @Inject(DOCUMENT) private _document
  ) { }
    /** Dropping file  */
  @HostListener('drop', ['$event'])
    onDrop(evt) {
      this.stopEvent(evt);

      const files = evt.dataTransfer.files;
      if (files.length > 0) {
        /** Call Loop-file-component method */
        if (this.fileComp) {
          this.fileComp.onDrag(files);
        } else {
          this.fileDropped.emit(files);
        }
      }
      this.removeDragView();
  }

  @HostListener('dragover', ['$event'])
    onDrag(evt: Event): void {
      this.stopEvent(evt);
      this.createDragView();

    }

  @HostListener('dragleave', [ '$event' ])
  onDragLeave(event: any): void {
    this.removeDragView();
  }

  private stopEvent(evt: any): void {
    evt.preventDefault();
    evt.stopPropagation();
  }

  private removeDragView(): void {
    this._renderer.removeClass(this._elRef.nativeElement, 'dragged');
    this.template.remove();
  }

  private createDragView(): void {
    this._renderer.addClass(this._elRef.nativeElement, 'dragged');
    /** Create span Element with Text */
    if (!this.template) {
      this.template = this._document.createElement('span');
      this.template.innerText = 'Add File';
      this.template.className = 'dragged-text mat-body-1';
      this.template.style.display = 'block';
      this._renderer.appendChild(this._elRef.nativeElement, this.template);
    }

  }

}
