import { BehaviorSubject ,  Observable ,  of } from 'rxjs';
import { MenuItem } from '@app/shared';
import { AddOn } from '@app/dynamic';

export const addOnsServiceStub = {
  getIstalledAddons(): Observable<MenuItem[]> {
    return of([]);
  },
  getAddonConfig(name: string) {
    const addon: AddOn = {
      name: 'FTP Service',
      endpoint: '/ftp/',
      operations: [
        {
          name: 'init',
          path: 'service/status',
          type: 'GET'
        }
      ],
      model: [
        {
          parameterName: 'Port',
          parameter: 'port',
          type: 'readonly',
          section: 'FTP Service'
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
              type: 'PUT'
            },
            {
              name: 'off',
              path: 'service/stop',
              type: 'PUT'
            }
          ]
        },
        {
          parameterName: 'Enable service to start automatically upon reboot',
          parameter: 'enabled',
          type: 'slideToggle',
          section: 'FTP Service',
          trueCommandName: 'Enabled',
          trueMessage: 'Disable service from starting automatically upon reboot',
          falseCommandName: 'Disabled',
          falseMessage: 'Enable service to start automatically upon reboot',
          operations: [
            {
              name: 'on',
              path: 'service/enable',
              type: 'PUT'
            },
            {
              name: 'off',
              path: 'service/disable',
              type: 'PUT'
            }
          ]
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
              type: 'GET'
            },
            {
              name: 'Reset Password',
              path: 'users/__parameter__/password',
              type: 'PUT',
              parameters: ['username']
            }
          ]
        }
      ]
    };
    return of(addon);
  },
  addOnGetRequest(url: string, ...parameters) {
    return url.includes('users') ? of([]) : of({});
  },
  addOnPutRequest(url: string, ...parameters) {
    return of({});
  }
};
