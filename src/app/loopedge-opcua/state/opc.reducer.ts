import { ClientActions, ClientActionTypes } from './opc.actions';
import {
  Security,
  AuthenticationType,
  OpcuaUser,
  OpcuaStatus,
} from '../models';
import { ITreeNode } from 'angular-tree-component/dist/defs/api';

export interface OpcState {
  status: OpcuaStatus;
  nodes: any[];
  selectedNode: ITreeNode | null;
  clients: any[];
  clientsAutoRefresh: boolean;
  modes: Security[];
  policies: AuthenticationType[];
  users: OpcuaUser[];
  managedUser: OpcuaUser;
  error: string;
}

export const initialState: OpcState = {
  status: { status: 'STOPPED' },
  nodes: [],
  selectedNode: null,
  clients: [],
  clientsAutoRefresh: true,
  modes: [],
  policies: [],
  users: [],
  managedUser: null,
  error: '',
};

export function reducer(state = initialState, action: ClientActions): OpcState {
  switch (action.type) {
    case ClientActionTypes.LoadClientsSuccess:
      return {
        ...state,
        clients: action.payload,
        error: '',
      };
    case ClientActionTypes.LoadClientsFail:
      return {
        ...state,
        clients: [],
        error: action.payload,
      };
    case ClientActionTypes.ToggleTrustedFail:
    case ClientActionTypes.DeleteClientFail:
    case ClientActionTypes.DeleteAllClientsFail:
    case ClientActionTypes.SaveNodesFail:
    case ClientActionTypes.UpdateModesFail:
    case ClientActionTypes.UpdatePoliciesFail:
    case ClientActionTypes.UpdateUserFail:
    case ClientActionTypes.ResetUserPasswordFail:
    case ClientActionTypes.DeleteUserFail:
      return {
        ...state,
        error: action.payload,
      };
    case ClientActionTypes.ToggleAutoRefresh:
      return {
        ...state,
        clientsAutoRefresh: action.payload,
        error: '',
      };
    case ClientActionTypes.LoadNodesSuccess:
      return {
        ...state,
        nodes: action.payload,
        error: '',
      };
    case ClientActionTypes.LoadNodesFail:
      return {
        ...state,
        nodes: [],
        error: action.payload,
      };
    case ClientActionTypes.SelectNode:
      return {
        ...state,
        selectedNode: action.payload,
        error: '',
      };
    case ClientActionTypes.LoadStatusSuccess:
      return {
        ...state,
        status: action.payload,
        error: '',
      };
    case ClientActionTypes.LoadStatusFail:
    case ClientActionTypes.StartServerFail:
    case ClientActionTypes.StopServerFail:
    case ClientActionTypes.RestartServerFail:
      return {
        ...state,
        status: { status: 'FAILED' },
        error: action.payload,
      };
    case ClientActionTypes.LoadModesSuccess:
      return {
        ...state,
        modes: action.payload,
        error: '',
      };
    case ClientActionTypes.LoadModesFail:
      return {
        ...state,
        modes: [],
        error: action.payload,
      };
    case ClientActionTypes.LoadPoliciesSuccess:
      return {
        ...state,
        policies: action.payload,
        error: '',
      };
    case ClientActionTypes.LoadPoliciesFail:
      return {
        ...state,
        policies: [],
        error: action.payload,
      };
    case ClientActionTypes.LoadUsersSuccess:
      return {
        ...state,
        users: action.payload,
        error: '',
      };
    case ClientActionTypes.LoadUsersFail:
      return {
        ...state,
        users: [],
        error: action.payload,
      };
    case ClientActionTypes.SetManagedUser:
      return {
        ...state,
        managedUser: action.payload,
        error: '',
      };
    case ClientActionTypes.UpdateUserSuccess:
    case ClientActionTypes.ResetUserPasswordSuccess:
      return {
        ...state,
        managedUser: action.payload,
        error: '',
      };

    default:
      return state;
  }
}
