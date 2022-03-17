import { MenuItem } from '@app/shared';

export const cosmynaMenuItem: MenuItem = {
  name: 'cosmyna',
  icon: 'devices',
  route: '/cosmyna',
  subItems: [
    {
      name: 'Devices',
      icon: 'developer_board',
      route: '/cosmyna/devices',
      subItems: [],
    },
    {
      name: 'Tags',
      icon: 'memory',
      route: '/cosmyna/tags',
      subItems: [],
    },
    {
      name: 'Device Discovery',
      icon: 'network_check',
      route: '/cosmyna/discover',
      subItems: [],
    },
  ],
};
