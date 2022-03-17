import { Component, OnInit, Input, ElementRef } from '@angular/core';
/**
 * Dot loaders Animations are made with pure css
 * Size is based on font size. default size is 15 px
 *
 * @class DotLoadersComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'loop-dot-loaders',
  templateUrl: './loop-dot-loaders.component.html',
  styleUrls: ['./loop-dot-loaders.component.scss']
})

export class DotLoadersComponent implements OnInit {
  // Size is in px
  @Input('size') size = 15;

  constructor(private el: ElementRef) { }

  ngOnInit() {
    this.el.nativeElement.style.fontSize = `${this.size}px`;
  }

}
