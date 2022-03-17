import { Injectable } from '@angular/core';
import { BehaviorSubject ,  Observable, merge, fromEvent, of } from 'rxjs';
import { MediaChange, ObservableMedia } from '@angular/flex-layout';
import { environment } from '@env';
import { mapTo } from 'rxjs/operators';

@Injectable()
export class UtilityService {

  private showLog$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  get showLog(): BehaviorSubject<boolean> {
    return this.showLog$;
  }

  get media$(): Observable<MediaChange> {
    return this._media.asObservable();
  }

  private mobileBrowserSource$: BehaviorSubject<boolean> = new BehaviorSubject<boolean> (this.checkMedia());
  get mobileBrowser$(): Observable<boolean> {
    return this.mobileBrowserSource$.asObservable();
  }

  private disableSideNavSource$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  get  disableSidenav$(): Observable<boolean> {
    return this.disableSideNavSource$.asObservable();
  }

  set disableNav(disable: boolean) {
    this.disableSideNavSource$.next(disable);
  }

  get hostname(): string {
    return window.location.hostname;
  }

  constructor(
    private _media: ObservableMedia
  ) { }

  checkMedia(): boolean {
    const ua = navigator.userAgent;
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(ua)) {
          // mobile user
          return true;
        }  else {
           return false;
        }
  }

  log(string: string, style: string = 'background: #46b67b; color: white; display: block;' ): void {
    if (this.showLog.value === true ) {
      // tslint:disable:no-console
      console.log('================================');
      console.log(`%c ${string}`, `${style}`);
      // tslint:enable:no-console
    }
  }
/**
 * Checks if you are connected to a network
 *
 * @returns {Observable<boolean>}
 * @memberof UtilityService
 */
  checkOnline(): boolean {
    const isOnline: boolean = navigator.onLine;
    return isOnline;
  }

  checkOnline$(): Observable<boolean> {
   return merge(
      fromEvent(window, 'offline')
      .pipe(
        mapTo(false)
      ),
      fromEvent(window, 'online')
      .pipe(
        mapTo(true)
      ),
      of(navigator.onLine),
    );
  }

  isLitmus(): boolean {
    return !environment.whiteLabel && !environment.parker;
  }

  createFile(fileName: string, type: string, data: any): void {
    const blob: Blob = new Blob([data], { type: type });
    if (navigator.msSaveBlob) { // IE 10+
        navigator.msSaveBlob(blob, fileName);
    } else {
        const link = document.createElement('a');
        if (link.download !== undefined) { // feature detection
            // Browsers that support HTML5 download attribute
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', fileName);
            // link.style = 'visibility:hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }
  }
}
