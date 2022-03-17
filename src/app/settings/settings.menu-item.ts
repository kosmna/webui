import { MenuItem } from '@app/shared';

export const SettingsMenuItem: MenuItem = {
  name: 'Settings',
  icon: 'settings',
  route: '/settings',
  subItems: [
  {
    name: 'Theming/Dev',
    icon: 'color_lens',
    route: 'settings/theming',
    subItems: []
  }
],
};
