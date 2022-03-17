import { Injectable } from '@angular/core';
import { Subject ,  Observable } from 'rxjs';
import { Router } from '@angular/router';
import { No_Loading_Page_List, No_Loading_Url_List} from '@app/loop-loader/services/blacklist';

@Injectable()
export class LoaderService {



  // hide loading bar for urls
  private noLoadingUrlList: string[] = No_Loading_Url_List;
  // hide loading bar on current pages
  private noLoadingPageList: string[] = No_Loading_Page_List;
  // Observable boolean sources
  private isLoadingSource$ = new Subject<boolean>();
  private isLoadingbarSource$ = new Subject<boolean>();

  // Observable boolean streams
  get isLoading$(): Observable<boolean> {
    return this.isLoadingSource$.asObservable();
  }

  get isLoadingBar$(): Observable<boolean> {
    return  this.isLoadingbarSource$.asObservable();
  }

  constructor(private _router: Router) { }

  show(url: string): void {
    const currentPath = this._router.url;
    // check if url and current page is black listed
    const loadingbar = this.urlAllowed(url) && this.currentPageAllowed(currentPath);
    if (loadingbar) {
      this.isLoadingbarSource$.next(true);
    }

    this.isLoadingSource$.next(true);
  }

  hide(): void {
    this.isLoadingSource$.next(false);
    this.isLoadingbarSource$.next(false);
  }

  showLoader(): void {
    this.isLoadingbarSource$.next(true);
  }
  /**
   * Allows to add pages to the no Loading page list
   * @param {string} page
   */
  noLoadingPage(page: string): void {
    const index = this.noLoadingPageList.indexOf(page);
    if ( index === -1 ) {
      this.noLoadingPageList.push(page);
    }
  }

  /**
   * Add urls to the no loading url list
   * @param {string} url
   */
  noLoading(url: string ): void {
    const index = this.noLoadingUrlList.indexOf(url);
    if ( index === -1) {
      this.noLoadingUrlList.push(url);
    }
  }

  private  urlAllowed(url: string): boolean {
    // remove any query params
    if (url.includes('?')) {
      url = url.split('?')[0];
    }

    const noUrlLoading = this.noLoadingUrlList.some((x: string) => {
      if (x.includes(':')) {
        /*
          *create regex for wildcard urls
          * ex: foo/:id/bar => \/fo\/.{0,}\/bar
        */
        const urlArr: string[] = x.split('/');
        const reString = x.replace(/\//g, '\\/' ).replace(/:id/g, '.{0,}');
        const re: RegExp = new RegExp(reString);
        return re.test(url);

      }
      return url.includes(x);
    });
    return !noUrlLoading;
  }

  private  currentPageAllowed(currentPath: string): boolean {
    return !this.noLoadingPageList.includes(currentPath);
  }

}
