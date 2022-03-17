import { MenuItem } from '@app/shared';

export const SystemMenuItem: MenuItem = {
  name: 'System',
  icon: 'computer',
  route: '/system',
  subItems: [
    {
      name: 'Info',
      icon: 'equalizer',
      route: '/system/info',
      subItems: [],
    },
    {
      name: 'Certificates',
      icon: 'turned_in_not',
      route: '/system/certificates',
      subItems: [],
    },
    {
      name: 'Network',
      icon: 'settings_ethernet',
      route: '/system/network',
      expectedRoles: 'administrator',
      subItems: [],
    },
    {
      name: 'Remote Access',
      icon: 'settings',
      route: '/system/config',
      expectedRoles: 'administrator',
      subItems: [],
    },
    {
      name: 'Device Management',
      icon: 'widgets',
      route: '/system/device',
      subItems: [],
    },
    {
      name: 'LDAP/AD Auth',
      icon: 'fingerprint',
      route: '/system/ldap',
      expectedRoles: 'administrator',
      subItems: [],
    },
    {
      name: 'Users',
      icon: 'people',
      route: '/system/users',
      expectedRoles: 'administrator',
      subItems: [],
    },
    {
      name: 'FTP Server',
      icon: 'insert_drive_file',
      route: '/system/ftp',
      subItems: [],
    },
    {
      name: 'External Storage',
      icon: 'folder_shared',
      route: '/system/storage',
      subItems: [],
    },
    {
      name: 'License',
      icon: 'card_membership',
      route: '/system/license',
      subItems: [],
    },
    {
      name: 'Status',
      icon: 'info_outline',
      route: '/system/status',
      subItems: [],
    },
    {
      name: 'Backup/Restore',
      icon: 'backup',
      route: '/system/backup',
      subItems: [],
    },
  ],
};
