import { FtpStatus, FtpUser, FtpVersion } from '@app/system/models/ftp';

export const ftpStatus: FtpStatus = {
    'enabled': true,
    'running': true,
    'port': 4200
  };

export const users: FtpUser[] = [
    {
    'disabled': true,
    'username': 'jcarter1'
    },
    {
    'disabled': false,
    'username': 'jcarter2'
    },
    {
    'disabled': false,
    'username': 'jcarter3'
    }
];

export const version: FtpVersion = {
    'git': 'cd243db4',
    'version': '1.2.3'
  };

export const User: FtpUser = {
  'disabled': false,
  'username': 'jcarter2',
  'password': 'SIWn*#7b1-Wn21'
};
