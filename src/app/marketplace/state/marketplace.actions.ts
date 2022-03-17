import { Action } from '@ngrx/store';
import { Volume, Marketplace } from '../models';

export enum MarketplaceActionTypes {
  LoadMarketplaces = '[Marketplace] Load Marketplaces',
  LoadMarketplacesSuccess = '[Marketplace] Load Marketplaces Success',
  LoadMarketplacesFail = '[Marketplace] Load Marketplaces Fail',
  CreateMarketplace = '[Marketplace] Create Marketplace',
  CreateMarketplaceSuccess = '[Marketplace] Create Marketplace Success',
  CreateMarketplaceFail = '[Marketplace] Create Marketplace Fail',
  CreateDefaultMarketplace = '[Marketplace] Create Default Marketplace',
  CreateDefaultMarketplaceFail = '[Marketplace] Create Default Marketplace Fail',
  RemoveMarketplace = '[Marketplace] Remove Marketplace',
  RemoveMarketplaceSuccess = '[Marketplace] Remove Marketplace Success',
  RemoveMarketplaceFail = '[Marketplace] Remove Marketplace Fail',
  LoadVolumes = '[Volume] Load Volumes',
  LoadVolumesSuccess = '[Volume] Load Volumes Success',
  LoadVolumesFail = '[Volume] Load Volumes Fail',
  DeleteVolume = '[Volume] Delete Volume',
  DeleteVolumeSuccess = '[Volume] Delete Volume Success',
  DeleteVolumeFail = '[Volume] Delete Volume Fail',
}

export class LoadMarketplaces implements Action {
  readonly type = MarketplaceActionTypes.LoadMarketplaces;
}

export class LoadMarketplacesSuccess implements Action {
  readonly type = MarketplaceActionTypes.LoadMarketplacesSuccess;
  constructor(public payload: Marketplace[]) {}
}

export class LoadMarketplacesFail implements Action {
  readonly type = MarketplaceActionTypes.LoadMarketplacesFail;
  constructor(public payload: string) {}
}

export class CreateMarketplace implements Action {
  readonly type = MarketplaceActionTypes.CreateMarketplace;
  constructor(public payload: Marketplace) {}
}

export class CreateMarketplaceSuccess implements Action {
  readonly type = MarketplaceActionTypes.CreateMarketplaceSuccess;
  constructor(public payload: Marketplace) {}
}

export class CreateMarketplaceFail implements Action {
  readonly type = MarketplaceActionTypes.CreateMarketplaceFail;
  constructor(public payload: string) {}
}

export class CreateDefaultMarketplace implements Action {
  readonly type = MarketplaceActionTypes.CreateDefaultMarketplace;
}

export class CreateDefaultMarketplaceFail implements Action {
  readonly type = MarketplaceActionTypes.CreateDefaultMarketplaceFail;
  constructor(public payload: string) {}
}

export class RemoveMarketplace implements Action {
  readonly type = MarketplaceActionTypes.RemoveMarketplace;
  constructor(public payload: Marketplace) {}
}

export class RemoveMarketplaceSuccess implements Action {
  readonly type = MarketplaceActionTypes.RemoveMarketplaceSuccess;
  constructor(public payload: Marketplace) {}
}

export class RemoveMarketplaceFail implements Action {
  readonly type = MarketplaceActionTypes.RemoveMarketplaceFail;
  constructor(public payload: string) {}
}

export class LoadVolumes implements Action {
  readonly type = MarketplaceActionTypes.LoadVolumes;
}

export class LoadVolumesSuccess implements Action {
  readonly type = MarketplaceActionTypes.LoadVolumesSuccess;
  constructor(public payload: Volume[]) {}
}

export class LoadVolumesFail implements Action {
  readonly type = MarketplaceActionTypes.LoadVolumesFail;
  constructor(public payload: string) {}
}

export class DeleteVolume implements Action {
  readonly type = MarketplaceActionTypes.DeleteVolume;
  constructor(public payload: Volume) {}
}

export class DeleteVolumeSuccess implements Action {
  readonly type = MarketplaceActionTypes.DeleteVolumeSuccess;
}

export class DeleteVolumeFail implements Action {
  readonly type = MarketplaceActionTypes.DeleteVolumeFail;
  constructor(public payload: string) {}
}

export type MarketplaceActions =
  | LoadMarketplaces
  | LoadMarketplacesSuccess
  | LoadMarketplacesFail
  | CreateMarketplace
  | CreateMarketplaceSuccess
  | CreateMarketplaceFail
  | CreateDefaultMarketplace
  | CreateDefaultMarketplaceFail
  | RemoveMarketplace
  | RemoveMarketplaceSuccess
  | RemoveMarketplaceFail
  | LoadVolumes
  | LoadVolumesSuccess
  | LoadVolumesFail
  | DeleteVolume
  | DeleteVolumeSuccess
  | DeleteVolumeFail;
