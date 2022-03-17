import { Action } from '@ngrx/store';

export enum MenuItemActionTypes {
  LoadMenuItems = '[MenuItem] Load Menu Items',
  ToggleMenuItem = '[MenuItem] Toggle Menu Item',
}

export class LoadMenuItems implements Action {
  readonly type = MenuItemActionTypes.LoadMenuItems;
}

export class ToggleMenuItem implements Action {
  readonly type = MenuItemActionTypes.ToggleMenuItem;
  constructor(public payload: string) {}
}

export type MenuItemActions = LoadMenuItems | ToggleMenuItem;
