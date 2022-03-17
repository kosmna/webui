import { Action, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoot from '@app/state';
import { MarketplaceState } from './marketplace.reducer';
import { state } from '@angular/animations';

export interface State extends fromRoot.State {
  marketplace: MarketplaceState;
}

const getMarketplaceFeatureState = createFeatureSelector<MarketplaceState>(
  'marketplace'
);

export const getVolumes = createSelector(
  getMarketplaceFeatureState,
  marketplaceState => marketplaceState.volumes
);

export const getMarketplaces = createSelector(
  getMarketplaceFeatureState,
  marketplaceState => marketplaceState.marketplaces
);

export const getError = createSelector(
  getMarketplaceFeatureState,
  marketplaceState => marketplaceState.error
);

export const getApplications = createSelector(
  getMarketplaceFeatureState,
  marketplaceState => marketplaceState.applications
);

export const getCurrentApplication = createSelector(
  getMarketplaceFeatureState,
  marketplaceState => marketplaceState.currentApplicationDetails
);

export const getCurrentApplicationNetworkInformation = createSelector(
  getCurrentApplication,
  currentApplication => currentApplication.networkInformation
);

export const getCurrentApplicationSelectedHost = createSelector(
  getCurrentApplication,
  currentApplication =>
    currentApplication.networkInformation.find(
      hostInformation =>
        hostInformation.name === currentApplication.selectedContainer
    )
);

export const getCurrentApplicationCpuUtilization = createSelector(
  getCurrentApplication,
  currentApplication => [
    {
      x: currentApplication.statistics.timestamp * 1000,
      y: Math.round(currentApplication.statistics.cpuPercent),
    },
  ]
);

export const getCurrentApplicationMemoryLoad = createSelector(
  getCurrentApplication,
  currentApplication => [
    {
      x: currentApplication.statistics.timestamp * 1000,
      y: Math.round(currentApplication.statistics.memoryPercent),
    },
  ]
);

export const getCurrentApplicationNetworkUtilization = createSelector(
  getCurrentApplication,
  currentApplication => [
    {
      x: currentApplication.statistics.timestamp * 1000,
      y: currentApplication.statistics.netRx,
    },
    {
      x: currentApplication.statistics.timestamp * 1000,
      y: currentApplication.statistics.netTx,
    },
  ]
);

export const getCurrentApplicationStorageIo = createSelector(
  getCurrentApplication,
  currentApplication => [
    {
      x: currentApplication.statistics.timestamp * 1000,
      y: currentApplication.statistics.blockRead / 1000000,
    },
    {
      x: currentApplication.statistics.timestamp * 1000,
      y: currentApplication.statistics.blockWrite / 1000000,
    },
  ]
);

export const getCurrentApplicationProcessInfo = createSelector(
  getCurrentApplication,
  currentApplication =>
    currentApplication.processInfo.find(
      processInfo => processInfo.name === currentApplication.selectedContainer
    )
);

export const getCurrentApplicationLogs = createSelector(
  getCurrentApplication,
  currentApplication => currentApplication.applicationLogs
);
