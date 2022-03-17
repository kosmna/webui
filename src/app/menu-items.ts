import { environment } from '@env';

import { DashboardMenuItem } from '@app/dashboard/dashboard.menu-item';
import { DatahubMenuItem } from '@app/datahub/datahub.menu-item';
import { cosmynaMenuItem } from '@app/cosmyna/cosmyna.menu-item';
import { FlowsMenuItem } from '@app/flows/flows.menu-item';
import { FunctionsMenuItem } from '@app/functions/functions.menu-item';
import { MarketplaceMenuItem } from '@app/marketplace/marketplace.menu-item';
import { SensonodeMenuItem } from '@app/sensonode';
import { SettingsMenuItem } from '@app/settings/settings.menu-item';
import { SystemMenuItem } from '@app/system/system.menu-item';
import { DemoCcMenuItem } from '@app/kosmyna-cc/kosmyna-cc.menu-item';
import { DemoOpcuaMenuItem } from '@app/kosmyna-opcua/kosmyna-opcua.menu-item';
import { HeartbeatMenuItem } from './heartbeat/heartbeat.menu-item';

// Rearrange these to reorganize the main menu
export const MENU_ITEMS = [
  DashboardMenuItem,
  /**
   * Add sensonode menu items
   */
  ...(environment.parker ? [SensonodeMenuItem] : []),

  /** Default Adds */
  DatahubMenuItem,
  DemoCcMenuItem,

  /**
   * Lite builds exclude cc, cosmyna, marketplace kosmynaOPCUA
   *
   */
  ...(environment.lite
    ? []
    : [cosmynaMenuItem, MarketplaceMenuItem, DemoOpcuaMenuItem]),
  FlowsMenuItem,
  /**
   * Add functions if environment exist
   */
  ...(environment.functions ? [FunctionsMenuItem] : []),
  SystemMenuItem,
  /**
   * Remove settings menu if environment is productions.
   */
  ...(environment.production ? [] : [SettingsMenuItem]),
  ...(environment.production ? [] : [HeartbeatMenuItem]),
];

// .filter(item => {
//   return environment.parker && environment.lite
//     ? item !== cosmynaMenuItem &&
//         item !== MarketplaceMenuItem &&
//         item !== SettingsMenuItem &&
//         item !== FunctionsMenuItem &&
//         item !== DemoCcMenuItem &&
//         item
//     : environment.parker
//       ? item !== SettingsMenuItem &&
//         item !== FunctionsMenuItem
//       : environment.production && environment.lite
//         ? item !== SensonodeMenuItem && item !== MarketplaceMenuItem
//         : environment.production && environment.functions
//           ? item !== SensonodeMenuItem
//           : item !== SensonodeMenuItem && item !== FunctionsMenuItem;
// })
// .map(item => {
//   if (environment.parker && environment.lite && item === SystemMenuItem) {
//     ['FTP', 'LDAP/AD Auth', 'Certificates'].forEach(name => {
//       const index = item.subItems.findIndex(subItem => subItem.name === name);
//       item.subItems.splice(index, 1);
//     });
//     return item;
//   }
//   return item;
// });
