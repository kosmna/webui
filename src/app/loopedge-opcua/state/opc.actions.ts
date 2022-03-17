import { Action } from '@ngrx/store';
import {
  OpcuaStatus,
  Security,
  AuthenticationType,
  OpcuaUser,
  OpcCertificate,
  OpcuaNode,
} from '../models';
import { ITreeNode } from 'angular-tree-component/dist/defs/api';

export enum ClientActionTypes {
  LoadClients = '[OPC] Load Clients',
  LoadClientsSuccess = '[OPC] Load Clients Success',
  LoadClientsFail = '[OPC] Load Clients Fail',
  ToggleAutoRefresh = '[OPC] Toggle Automatic Refresh',
  ToggleTrusted = '[OPC] Toggle Trusted',
  ToggleTrustedSuccess = '[OPC] Toggle Trusted Success',
  ToggleTrustedFail = '[OPC] Toggle Trusted Fail',
  DeleteClient = '[OPC] Delete Client',
  DeleteClientFail = '[OPC] Delete Client Fail',
  DeleteAllClients = '[OPC] Delete All Clients',
  DeleteAllClientsFail = '[OPC] Delete All Clients Fail',
  DownloadServerCertificate = '[OPC] Download Server Certificate',
  LoadNodes = '[OPC] Load Nodes',
  LoadNodesSuccess = '[OPC] Load Nodes Success',
  LoadNodesFail = '[OPC] Load Nodes Fail',
  SaveNodes = '[OPC] Save Nodes',
  SaveNodesFail = '[OPC] Save Nodes Fail',
  SelectNode = '[OPC] Select Node',
  LoadStatus = '[OPC] Load Status',
  LoadStatusSuccess = '[OPC] Load Status Success',
  LoadStatusFail = '[OPC] Load Status Fail',
  LoadModes = '[OPC] Load Modes',
  LoadModesSuccess = '[OPC] Load Modes Success',
  LoadModesFail = '[OPC] Load Modes Fail',
  UpdateModes = '[OPC] Update Modes',
  UpdateModesFail = '[OPC] Update Modes Fail',
  LoadPolicies = '[OPC] Load Policies',
  LoadPoliciesSuccess = '[OPC] Load Policies Success',
  LoadPoliciesFail = '[OPC] Load Policies Fail',
  UpdatePolicies = '[OPC] Update Policies',
  UpdatePoliciesFail = '[OPC] Update Policies Fail',
  LoadUsers = '[OPC] Load Users',
  LoadUsersSuccess = '[OPC] Load Users Success',
  LoadUsersFail = '[OPC] Load Users Fail',
  AddUser = '[OPC] Add User',
  AddUserFail = '[OPC] Add User Fail',
  SetManagedUser = '[OPC] Set Managed User',
  UpdateUser = '[OPC] Update User',
  UpdateUserSuccess = '[OPC] Update User Success',
  UpdateUserFail = '[OPC] Update User Fail',
  ResetUserPassword = '[OPC] Reset User Password',
  ResetUserPasswordSuccess = '[OPC] Reset User Password Success',
  ResetUserPasswordFail = '[OPC] Reset User Password Fail',
  DeleteUser = '[OPC] Delete User',
  DeleteUserFail = '[OPC] Delete User Fail',
  StartServer = '[OPC] Start Server',
  StartServerFail = '[OPC] Start Server Fail',
  StopServer = '[OPC] Stop Server',
  StopServerFail = '[OPC] Stop Server Fail',
  RestartServer = '[OPC] Restart Server',
  RestartServerFail = '[OPC] Restart Server Fail',
}

/**
 * Load connected clients action
 *
 * @export
 * @class LoadClients
 * @implements {Action}
 */
export class LoadClients implements Action {
  readonly type = ClientActionTypes.LoadClients;
}

/**
 * Action that fires if load clients succeed
 *
 * @export
 * @class LoadClientsSuccess
 * @implements {Action}
 */
export class LoadClientsSuccess implements Action {
  readonly type = ClientActionTypes.LoadClientsSuccess;
  constructor(public payload: any[]) {}
}

export class LoadClientsFail implements Action {
  readonly type = ClientActionTypes.LoadClientsFail;
  constructor(public payload: string) {}
}

/**
 * Toggle automatic refresh for connected clients
 *
 * @export
 * @class ToggleAutoRefresh
 * @implements {Action}
 */
export class ToggleAutoRefresh implements Action {
  readonly type = ClientActionTypes.ToggleAutoRefresh;

  constructor(public payload: boolean) {}
}

/**
 * Toggle certificate trust
 *
 * @export
 * @class ToggleTrusted
 * @implements {Action}
 */
export class ToggleTrusted implements Action {
  readonly type = ClientActionTypes.ToggleTrusted;
  constructor(public payload: OpcCertificate) {}
}

/**
 * Action that fire up certificates reload after trust toggle
 * ! Not used as for now, the list just reloaded using LoadClients
 *
 * @export
 * @class ToggleTrustedSuccess
 * @implements {Action}
 */
export class ToggleTrustedSuccess implements Action {
  readonly type = ClientActionTypes.ToggleTrustedSuccess;
}

export class ToggleTrustedFail implements Action {
  readonly type = ClientActionTypes.ToggleTrustedFail;
  constructor(public payload: string) {}
}

/**
 * Delete client action
 *
 * @export
 * @class DeleteClient
 * @implements {Action}
 */
export class DeleteClient implements Action {
  readonly type = ClientActionTypes.DeleteClient;
  constructor(public payload: OpcCertificate) {}
}

export class DeleteClientFail implements Action {
  readonly type = ClientActionTypes.DeleteClientFail;
  constructor(public payload: string) {}
}

/**
 * Delete all the clients action
 *
 * @export
 * @class DeleteAllClients
 * @implements {Action}
 */
export class DeleteAllClients implements Action {
  readonly type = ClientActionTypes.DeleteAllClients;
}

export class DeleteAllClientsFail implements Action {
  readonly type = ClientActionTypes.DeleteAllClientsFail;
  constructor(public payload: string) {}
}

/**
 * Download server certificate action
 *
 * @export
 * @class DownloadServerCertificate
 * @implements {Action}
 */
export class DownloadServerCertificate implements Action {
  readonly type = ClientActionTypes.DownloadServerCertificate;
}

export class LoadNodes implements Action {
  readonly type = ClientActionTypes.LoadNodes;
}

export class LoadNodesSuccess implements Action {
  readonly type = ClientActionTypes.LoadNodesSuccess;
  constructor(public payload: OpcuaNode[]) {}
}

export class LoadNodesFail implements Action {
  readonly type = ClientActionTypes.LoadNodesFail;
  constructor(public payload: string) {}
}

export class SaveNodes implements Action {
  readonly type = ClientActionTypes.SaveNodes;
  constructor(public payload: OpcuaNode) {}
}

export class SaveNodesFail implements Action {
  readonly type = ClientActionTypes.SaveNodesFail;
  constructor(public payload: string) {}
}

export class SelectNode implements Action {
  readonly type = ClientActionTypes.SelectNode;
  constructor(public payload: ITreeNode) {}
}

/**
 * Initiate load of the OPC UA status
 *
 * @export
 * @class LoadStatus
 * @implements {Action}
 */
export class LoadStatus implements Action {
  readonly type = ClientActionTypes.LoadStatus;
}

/**
 * Action that fires when status received
 *
 * @export
 * @class LoadStatusSuccess
 * @implements {Action}
 */
export class LoadStatusSuccess implements Action {
  readonly type = ClientActionTypes.LoadStatusSuccess;
  constructor(public payload: OpcuaStatus) {}
}

export class LoadStatusFail implements Action {
  readonly type = ClientActionTypes.LoadStatusFail;
  constructor(public payload: string) {}
}

/**
 * Initiate load of the OPC UA security modes
 *
 * @export
 * @class LoadModes
 * @implements {Action}
 */
export class LoadModes implements Action {
  readonly type = ClientActionTypes.LoadModes;
}

/**
 * Action that fires when security modes received
 *
 * @export
 * @class LoadModesSuccess
 * @implements {Action}
 */
export class LoadModesSuccess implements Action {
  readonly type = ClientActionTypes.LoadModesSuccess;
  constructor(public payload: Security[]) {}
}

export class LoadModesFail implements Action {
  readonly type = ClientActionTypes.LoadModesFail;
  constructor(public payload: string) {}
}

/**
 * Update security modes (enable/disable a particular mode)
 *
 * @export
 * @class UpdateModes
 * @implements {Action}
 */
export class UpdateModes implements Action {
  readonly type = ClientActionTypes.UpdateModes;
  constructor(public payload: Security[]) {}
}

export class UpdateModesFail implements Action {
  readonly type = ClientActionTypes.UpdateModesFail;
  constructor(public payload: string) {}
}

/**
 * Initiate a policies load
 *
 * @export
 * @class LoadPolicies
 * @implements {Action}
 */
export class LoadPolicies implements Action {
  readonly type = ClientActionTypes.LoadPolicies;
}

/**
 * Action that fires when policies successfully loaded
 *
 * @export
 * @class LoadPoliciesSuccess
 * @implements {Action}
 */
export class LoadPoliciesSuccess implements Action {
  readonly type = ClientActionTypes.LoadPoliciesSuccess;
  constructor(public payload: AuthenticationType[]) {}
}

export class LoadPoliciesFail implements Action {
  readonly type = ClientActionTypes.LoadPoliciesFail;
  constructor(public payload: string) {}
}

/**
 * Update policies settings action
 *
 * @export
 * @class UpdatePolicies
 * @implements {Action}
 */
export class UpdatePolicies implements Action {
  readonly type = ClientActionTypes.UpdatePolicies;
  constructor(public payload: AuthenticationType[]) {}
}

export class UpdatePoliciesFail implements Action {
  readonly type = ClientActionTypes.UpdatePoliciesFail;
  constructor(public payload: string) {}
}

/**
 * Initiate user list load
 *
 * @export
 * @class LoadUsers
 * @implements {Action}
 */
export class LoadUsers implements Action {
  readonly type = ClientActionTypes.LoadUsers;
}

/**
 * Action that fires when user list are loaded
 *
 * @export
 * @class LoadUsersSuccess
 * @implements {Action}
 */
export class LoadUsersSuccess implements Action {
  readonly type = ClientActionTypes.LoadUsersSuccess;
  constructor(public payload: OpcuaUser[]) {}
}

export class LoadUsersFail implements Action {
  readonly type = ClientActionTypes.LoadUsersFail;
  constructor(public payload: string) {}
}

/**
 * Add new user action
 *
 * @export
 * @class AddUser
 * @implements {Action}
 */
export class AddUser implements Action {
  readonly type = ClientActionTypes.AddUser;
  constructor(public payload: OpcuaUser) {}
}

export class AddUserFail implements Action {
  readonly type = ClientActionTypes.AddUserFail;
  constructor(public payload: string) {}
}

/**
 * Action that used to display newly created/modified user and display generated password
 *
 * @export
 * @class SetManagedUser
 * @implements {Action}
 */
export class SetManagedUser implements Action {
  readonly type = ClientActionTypes.SetManagedUser;
  constructor(public payload: OpcuaUser) {}
}

/**
 * Update user action
 *
 * @export
 * @class UpdateUser
 * @implements {Action}
 */
export class UpdateUser implements Action {
  readonly type = ClientActionTypes.UpdateUser;
  constructor(public payload: { username: string; user: OpcuaUser }) {}
}

/**
 * Action that fires when user successfully updated
 *
 * @export
 * @class UpdateUserSuccess
 * @implements {Action}
 */
export class UpdateUserSuccess implements Action {
  readonly type = ClientActionTypes.UpdateUserSuccess;
  constructor(public payload: OpcuaUser) {}
}

export class UpdateUserFail implements Action {
  readonly type = ClientActionTypes.UpdateUserFail;
  constructor(public payload: string) {}
}

/**
 * Reset user password action
 *
 * @export
 * @class ResetUserPassword
 * @implements {Action}
 */
export class ResetUserPassword implements Action {
  readonly type = ClientActionTypes.ResetUserPassword;
  constructor(public payload: OpcuaUser) {}
}

/**
 * Action that fires on successfull password reset
 *
 * @export
 * @class ResetUserPasswordSuccess
 * @implements {Action}
 */
export class ResetUserPasswordSuccess implements Action {
  readonly type = ClientActionTypes.ResetUserPasswordSuccess;
  constructor(public payload: OpcuaUser) {}
}

export class ResetUserPasswordFail implements Action {
  readonly type = ClientActionTypes.ResetUserPasswordFail;
  constructor(public payload: string) {}
}

/**
 * Delete user action
 *
 * @export
 * @class DeleteUser
 * @implements {Action}
 */
export class DeleteUser implements Action {
  readonly type = ClientActionTypes.DeleteUser;
  constructor(public payload: OpcuaUser) {}
}

export class DeleteUserFail implements Action {
  readonly type = ClientActionTypes.DeleteUserFail;
  constructor(public payload: string) {}
}

export class StartServer implements Action {
  readonly type = ClientActionTypes.StartServer;
}

export class StartServerFail implements Action {
  readonly type = ClientActionTypes.StartServerFail;
  constructor(public payload: string) {}
}

export class StopServer implements Action {
  readonly type = ClientActionTypes.StopServer;
}

export class StopServerFail implements Action {
  readonly type = ClientActionTypes.StopServerFail;
  constructor(public payload: string) {}
}

export class RestartServer implements Action {
  readonly type = ClientActionTypes.RestartServer;
}

export class RestartServerFail implements Action {
  readonly type = ClientActionTypes.RestartServerFail;
  constructor(public payload: string) {}
}

export type ClientActions =
  | LoadClients
  | LoadClientsSuccess
  | LoadClientsFail
  | ToggleAutoRefresh
  | ToggleTrusted
  | ToggleTrustedSuccess
  | ToggleTrustedFail
  | DeleteClient
  | DeleteClientFail
  | DeleteAllClients
  | DeleteAllClientsFail
  | DownloadServerCertificate
  | LoadNodes
  | LoadNodesSuccess
  | LoadNodesFail
  | SelectNode
  | SaveNodes
  | SaveNodesFail
  | LoadStatus
  | LoadStatusSuccess
  | LoadStatusFail
  | LoadModes
  | LoadModesSuccess
  | LoadModesFail
  | UpdateModes
  | UpdateModesFail
  | LoadPolicies
  | LoadPoliciesSuccess
  | LoadPoliciesFail
  | UpdatePolicies
  | UpdatePoliciesFail
  | LoadUsers
  | LoadUsersSuccess
  | LoadUsersFail
  | AddUser
  | AddUserFail
  | SetManagedUser
  | UpdateUser
  | UpdateUserSuccess
  | UpdateUserFail
  | ResetUserPassword
  | ResetUserPasswordSuccess
  | ResetUserPasswordFail
  | DeleteUser
  | DeleteUserFail
  | StartServer
  | StartServerFail
  | StopServer
  | StopServerFail
  | RestartServer
  | RestartServerFail;
