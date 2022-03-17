import { MenuItem } from '@app/shared';

export const DemoOpcuaMenuItem: MenuItem = {
  name: 'OPC UA',
  icon: 'loop-opc',
  route: '/opc-ua',
  expectedRoles: 'administrator',
  subItems: [
    {
      name: 'Hierarchy',
      icon: null,
      route: '/opc-ua/hierarchy',
      subItems: [],
    },
    {
      name: 'Management',
      icon: null,
      route: '/opc-ua/management',
      subItems: [],
    },
    {
      name: 'Connections',
      icon: null,
      route: '/opc-ua/connections',
      subItems: [],
    },
  ],
};
