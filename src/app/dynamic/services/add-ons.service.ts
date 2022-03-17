import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { MenuItem } from '@app/shared';
import { DemoAuthService } from '@app/core/services/loop-edge-auth.service';
import { LocaleService } from '@app/core/services/locale.service';
import { AddOn } from '@app/dynamic/models';

@Injectable()
export class AddOnsService {
  constructor(
    private _localeService: LocaleService,
    private _DemoAuthService: DemoAuthService
  ) {}

  getIstalledAddons(): Observable<MenuItem[]> {
    return of([
      // {
      //   name: 'FTP',
      //   icon: 'insert_drive_file',
      //   route: '/system/ftp',
      //   subItems: [],
      // },
    ]);
  }

  getAddonConfig(name: string) {
    const addon: AddOn = {
      name: 'FTP Service',
      endpoint: '/ftp/',
      operations: [
        {
          name: 'init',
          path: 'service/status',
          type: 'GET',
        },
      ],
      model: [
        {
          parameterName: 'Port',
          parameter: 'port',
          type: 'readonly',
          section: 'FTP Service',
        },
        {
          parameterName: 'Start',
          parameter: 'running',
          type: 'buttonToggle',
          section: 'FTP Service',
          trueCommandName: 'Stop',
          trueMessage: 'Service Running',
          falseCommandName: 'Start',
          falseMessage: 'Service Stopped',
          operations: [
            {
              name: 'on',
              path: 'service/start',
              type: 'PUT',
            },
            {
              name: 'off',
              path: 'service/stop',
              type: 'PUT',
            },
          ],
        },
        {
          parameterName: 'Enable service to start automatically upon reboot',
          parameter: 'enabled',
          type: 'slideToggle',
          section: 'FTP Service',
          trueCommandName: 'Enabled',
          trueMessage:
            'Disable service from starting automatically upon reboot',
          falseCommandName: 'Disabled',
          falseMessage: 'Enable service to start automatically upon reboot',
          operations: [
            {
              name: 'on',
              path: 'service/enable',
              type: 'PUT',
            },
            {
              name: 'off',
              path: 'service/disable',
              type: 'PUT',
            },
          ],
        },
        {
          parameterName: 'Users',
          parameter: 'users',
          type: 'table',
          section: 'Users',
          columns: ['username', 'disabled', 'actions'],
          operations: [
            {
              name: 'read',
              path: 'users',
              type: 'GET',
            },
            {
              name: 'Reset Password',
              path: 'users/__parameter__/password',
              type: 'PUT',
              parameters: ['username'],
              icon: 'lock',
            },
            {
              name: 'Delete User',
              path: 'users/__parameter__',
              type: 'DELETE',
              parameters: ['username'],
              icon: 'delete',
            },
            {
              name: 'add',
              path: 'users',
              type: 'POST',
              icon: 'add',
              payload: [
                {
                  name: 'username',
                  type: 'text',
                },
              ],
            },
          ],
        },
      ],
    };
    return of(addon);
  }

  /**
   * GET request proxy
   *
   * @param {string} url
   * @param {any} parameters
   * @returns {Observable}
   * @memberof AddOnsService
   */
  addOnGetRequest(url: string, ...parameters) {
    return this._DemoAuthService.httpClientGet<any>(
      this._localeService.localizeUrl(url)
    );
  }

  /**
   * PUT request proxy
   *
   * @param {string} url
   * @param {any} parameters
   * @returns {Observable}
   * @memberof AddOnsService
   */
  addOnPutRequest(url: string, ...parameters): Observable<any> {
    parameters.forEach(
      parameter => (url = url.replace('__parameter__', parameter))
    );
    return this._DemoAuthService.httpClientPut(
      this._localeService.localizeUrl(url),
      null
    );
  }

  /**
   * DELETE request proxy
   *
   * @param {string} url
   * @param {any} parameters
   * @returns {Observable}
   * @memberof AddOnsService
   */
  addOnDeleteRequest(url: string, ...parameters) {
    parameters.forEach(
      parameter => (url = url.replace('__parameter__', parameter))
    );
    return this._DemoAuthService.httpClientDelete(
      this._localeService.localizeUrl(url)
    );
  }

  /**
   * POST request proxy
   *
   * @param {string} url
   * @param {*} payload
   * @returns
   * @memberof AddOnsService
   */
  addOnPostRequest(url: string, payload: any): Observable<any> {
    return this._DemoAuthService.httpClientPost(
      this._localeService.localizeUrl(url),
      payload
    );
  }
}
