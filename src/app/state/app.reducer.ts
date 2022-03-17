import { MenuItemActions, MenuItemActionTypes } from './menu-item.actions';
import { MENU_ITEMS } from '@app/menu-items';
import { environment } from '@env';
import { MenuItem } from '@app/shared/models/menu-item';

export interface ApplicationState {
  disabledMenuItems: string[];
  menuItems: MenuItem[];
  error: string;
}

export const appInitialState: ApplicationState = {
  disabledMenuItems: ['Heartbeat'],
  menuItems: [],
  error: '',
};

export function applicationReducer(
  state = appInitialState,
  action: MenuItemActions
): ApplicationState {
  switch (action.type) {
    case MenuItemActionTypes.LoadMenuItems:
      return {
        ...state,
        menuItems: MENU_ITEMS.filter(
          menuItem =>
            (!environment.production ||
              (menuItem.name !== 'Settings' && menuItem.name !== 'Add-Ons')) &&
            !state.disabledMenuItems.some(item => item === menuItem.name)
        ),
        error: '',
      };
    case MenuItemActionTypes.ToggleMenuItem:
      const menuElement = state.disabledMenuItems.find(
        value => value === action.payload
      );
      const disabledItems = menuElement
        ? state.disabledMenuItems.filter(value => value !== menuElement)
        : [...state.disabledMenuItems, action.payload];
      const menuItems = MENU_ITEMS.filter(
        menuItem =>
          (!environment.production ||
            (menuItem.name !== 'Settings' && menuItem.name !== 'Add-Ons')) &&
          !disabledItems.some(item => item === menuItem.name)
      );
      return {
        ...state,
        disabledMenuItems: disabledItems,
        menuItems: menuItems,
        error: '',
      };
    default:
      return state;
  }
}
