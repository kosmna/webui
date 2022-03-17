import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

import { BROWSER_FAVICONS_CONFIG, FaviconsConfig, IconsConfig  } from '@app/core/models';

export abstract class Favicons {
  abstract activate(name: string): void;
}
@Injectable()
export class FaviconService implements Favicons {
  private elementId = 'favicon';
  private icons: IconsConfig;

  constructor( @Inject( BROWSER_FAVICONS_CONFIG ) private _config: FaviconsConfig,
               @Inject(DOCUMENT) private _document ) {
    this.icons = Object.assign( Object.create( null ), _config.icons );
    this.removeExternalLinkE();
  }
  /**
   * Exposed method in service to
   * Add Favicon
   * @param {string} name
   * @memberof FaviconService
   */
  activate(name: string): void {
    const icon = this.icons[name];
    this.addNode(icon.type, icon.href);
   }
  /**
   * Add Link node
   * @private
   * @param {string} type
   * @param {string} href
   * @memberof FaviconService
   */
  private addNode(type: string, href: string): void {
    // remove any nodes if exist
    this.removeNode();
    // create element and add it
    const linkE = document.createElement('link');
    linkE.setAttribute( 'id', this.elementId );
    linkE.setAttribute( 'rel', 'icon' );
    linkE.setAttribute( 'type', type );
    linkE.setAttribute( 'href', href );
    document.head.appendChild( linkE );
  }
  /**
   * Remove Node
   * @private
   * @memberof FaviconService
   */
  private removeNode(): void {
    const linkE = document.head.querySelector(`#${this.elementId}`);
    // remove node if it exists
    if ( linkE ) {
      document.head.removeChild(linkE);
    }
  }
  /**
   * This will remove any favicons not from this service
   * @private
   * @memberof FaviconService
   */
  private removeExternalLinkE(): void {
    const linkEArr = Array.apply(null, document.querySelectorAll( `link[ rel ~= 'icon' i]` ));
    linkEArr.forEach(e => {
      document.head.removeChild(e);
    });
  }


}
