import { MenuItem } from '@app/shared';

export const MarketplaceMenuItem: MenuItem = {
  name: 'Applications',
  icon: 'apps',
  route: '/apps',
  subItems: [
    {
      name: 'Overview',
      icon: 'view_quilt',
      route: '/apps/overview',
      subItems: [],
    },
    {
      name: 'Marketplace',
      icon: 'shopping_cart',
      route: '/apps/marketplace',
      subItems: [],
    },
    {
      name: 'Configure',
      icon: 'settings',
      route: '/apps/configure',
      expectedRoles: 'administrator',
      subItems: [],
    },
    {
      name: 'Registry',
      icon: 'list',
      route: '/apps/registry',
      subItems: [],
    },
    {
      name: 'Volumes',
      icon: 'storage',
      route: '/apps/volumes',
      subItems: [],
    },
  ],
};
