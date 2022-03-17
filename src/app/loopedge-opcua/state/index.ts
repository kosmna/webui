import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoot from '@app/state';
import { OpcState } from './opc.reducer';

export interface State extends fromRoot.State {
  opc: OpcState;
}

const getOpcFeatureState = createFeatureSelector<OpcState>('opc');

export const getClients = createSelector(
  getOpcFeatureState,
  state => state.clients
);

export const getAutoRefreshState = createSelector(
  getOpcFeatureState,
  state => state.clientsAutoRefresh
);

export const getNodes = createSelector(
  getOpcFeatureState,
  state => state.nodes
);

export const getStatus = createSelector(
  getOpcFeatureState,
  state => state.status
);

export const getModes = createSelector(
  getOpcFeatureState,
  state => state.modes
);

export const getPolicies = createSelector(
  getOpcFeatureState,
  state => state.policies
);

export const getUsers = createSelector(
  getOpcFeatureState,
  state => state.users
);

export const getManagedUser = createSelector(
  getOpcFeatureState,
  state => state.managedUser
);

export const getSelectedNode = createSelector(
  getOpcFeatureState,
  state => state.selectedNode
);
