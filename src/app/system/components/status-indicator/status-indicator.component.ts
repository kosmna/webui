import { Component, OnInit, Input } from '@angular/core';
import { ApiVersion } from '@app/system/models/api-version';

@Component({
  selector: 'loop-status-indicator',
  templateUrl: './status-indicator.component.html',
  styleUrls: ['./status-indicator.component.scss']
})
export class StatusIndicatorComponent implements OnInit {

  @Input() apiVersion: ApiVersion;

  constructor() { }

  ngOnInit() {
  }

  /**
   * Shorten git version if hash length more than 7 characters
   *
   * @private
   * @returns {string}
   * @memberof StatusIndicatorComponent
   */
  private _shortenGitVersion() {
    return this.apiVersion.serverVersion.git.length > 7 ?
      this.apiVersion.serverVersion.git.substr(-7) : this.apiVersion.serverVersion.git;
  }

  /**
   * Return API status
   *
   * @readonly
   * @memberof StatusIndicatorComponent
   */
  get status() {
    return this.apiVersion.isRespond;
  }

  /**
   * Return API version
   *
   * @readonly
   * @memberof StatusIndicatorComponent
   */
  get version() {
    return this.apiVersion.serverVersion && this.apiVersion.serverVersion.version ?
      this.apiVersion.serverVersion.version : '0.0.0';
  }

  /**
   * Return API git branch
   *
   * @readonly
   * @memberof StatusIndicatorComponent
   */
  get gitVersion() {
    return this.apiVersion.serverVersion && this.apiVersion.serverVersion.git ? this._shortenGitVersion() : 'HEAD';
  }

}
