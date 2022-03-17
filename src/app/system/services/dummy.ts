import { HostInfo, Timezones } from '@app/system/models';
import { BackupCloud } from '@app/system/models/backup-restore-cloud';

export const getCloud = {
  'activatedAt': '2000-08-23T19:52:05-04:00',
  'companyID': '9vgp5h5qczfqsmxxd79gx9kik',
  'companyName': 'ACME Corp.',
  'deviceID': '9vgp5h5qczfqsmxxd79gx9kik',
  'modelID': '9vgp5h5qczfqsmxxd79gx9kik',
  'modelName': 'kosmyna-01-24',
  'projectID': '9vgp5h5qczfqsmxxd79gx9kik',
  'projectName': 'kosmyna-01',
  'status': 'Ok',
  'statusCode': 'ERROR'
};

export const hostInfo: HostInfo = {
  'country': 'CA',
  'description': 'CA;ON;Toronto;1 Yonge Street. This is a long description about things and abot tht',
  'dns': [
    '8.8.8.8',
    '8.8.4.4',
    '2001:4860:4860::8888',
    '2001:4860:4860::8844'
  ],
  'gateway': {
    'ipv4': '10.10.10.1',
    'ipv6': '2620:18:6000::1'
  },
  'hostname': 'kosmyna-000c295f5940',
  'ntp': [
    '0.pool.ntp.org',
    '1.pool.ntp.org',
    '2.pool.ntp.org',
    '3.pool.ntp.org'
  ],
  'timezone': 'America/Toronto'
};

export const timezones: Timezones = {
  'timezones': [
    'Africa/Abidjan',
    'Africa/Accra',
    'Africa/Addis_Aaba',
    'Africa/Algiers',
    'Africa/Asmara',
    'Africa/Bamako',
    'Africa/Bangui',
    'Africa/Banjul',
    'Africa/Bissau',
    'Africa/Blantyre',
    'Africa/Brazzaville',
    'Africa/Bujumbura',
    'Africa/Cairo',
    'Africa/Casablanca',
    'Africa/Ceuta',
    'Africa/Conakry',
    'America/Toronto'
  ]
};

export const backupCloudList: BackupCloud[] = [
  {
    'id': 'a2774d9a-9dde-451d-b91a-1661e04842c2',
    'size': 1234567,
    'ts': '1977-11-25T05:20:59Z'
  },
  {
    'id': 'a2774d9a-9dde-451d-b91a-1661e04842c2',
    'size': 1234567,
    'ts': '1977-11-25T05:20:59Z'
  },
  {
    'id': 'a2774d9a-9dde-451d-b91a-1661e04842c2',
    'size': 1234567,
    'ts': '1977-11-25T05:20:59Z'
  }
];
