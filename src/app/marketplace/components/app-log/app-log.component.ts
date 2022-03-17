import { Component, OnInit, Input, ElementRef, ViewChild, OnChanges, EventEmitter, Output } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'loop-app-log',
  templateUrl: './app-log.component.html',
  styleUrls: ['./app-log.component.scss']
})
export class AppLogComponent implements OnInit, OnChanges {
  @Input('data')
    set log (value: any) {
      // convert string to safeHtml
      if (value) {
        this._log = this.cleanString(value);
      }
    }

  get log(): any {
    return this._log;
  }

  get logExist(): boolean {
    return this._log !== '' && this._log !== undefined ? true : false;
  }

  @Output('refresh') refresh: EventEmitter<null> = new EventEmitter();
  @Output('download') download: EventEmitter<null> = new EventEmitter();
  @Output('fullscreen') fullscreenEvent: EventEmitter<boolean> = new EventEmitter();
  @ViewChild('preTxt') preTxt: ElementRef;


  private _log: SafeHtml;
  private _fullscreen = false;
  private _preTagHeight = '350px';
  private _fullScreen = false;

  constructor(
    private _sanitizer: DomSanitizer,
  ) { }

  ngOnInit(): void {
    this.initLog();
  }

  ngOnChanges(changes): void {
    /*
    * When log is empty 350px will be taller than 100% height
    * Will fire after OnInit
    */
    if (changes.log.currentValue === '') {
      this.preTxt.nativeElement.style['height'] = '100%';
    }

  }

  /**
   * User for the Expand button.
   * Sets scroll to bottom of div or mat-nav-content
   * @memberof AppLogComponent
   */
   toggleFullscreen(): void {
    this._fullscreen = !this._fullscreen;
    this.fullscreenEvent.emit(this._fullscreen);
    if (this._fullscreen ) {
      this.preTxt.nativeElement.style['height'] = '100%';
      this.setBottomScrollWindow();
    } else {
      this.preTxt.nativeElement.style['height'] = this._preTagHeight;
      this.setBottomScroll();
    }

  }

  /**
   *  Refresh click button
   *
   * @memberof AppLogComponent
   */
  refreshData(): void {
    this.refresh.emit();
  }

  /**
   * Set log height to Default height
   *
   * @private
   * @memberof AppLogComponent
   */
  private initLog(): void {
    const el = this.preTxt.nativeElement;
    el.style.height = this._preTagHeight;
  }
  /**
   * Go to the bottom of the pre tag
   *
   * @private
   * @memberof AppLogComponent
   */
  private setBottomScroll(): void {
    const el = this.preTxt.nativeElement;
    el.scrollTop = el.scrollHeight;
  }
  /**
   * Go to the bottom of content.
   *
   * @private
   * @memberof AppLogComponent
   */
  private setBottomScrollWindow(): void {
    const el = document.querySelector('mat-sidenav-content');
    el.scrollTop = el.scrollHeight - 500;
  }

    /**
   * Adds a br tag to new lines Consider moving to a service.
   * @param {string} txt
   * @returns {SafeHtml}
   * @memberof AppLogComponent
   */
  private cleanString(txt: string): SafeHtml {
    if ( txt === '' || undefined || null || typeof txt !== 'string') {
      return '';
    } else {
      txt = txt.replace(/\n/g, '<br/>');
      return this._sanitizer.bypassSecurityTrustHtml(txt);
    }
  }

}
