import { MenuItem } from '@app/shared';
import { environment } from '@env';

export const FlowsMenuItem: MenuItem = {
  name: 'Flows',
  icon: environment.parker ? 'loop-vom' : 'device_hub',
  route: '/flows',
  subItems: []
};
