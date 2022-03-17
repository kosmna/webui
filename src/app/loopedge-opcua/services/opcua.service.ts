import { Injectable } from '@angular/core';
import { DemoAuthService } from '@app/core';
import { of, Observable } from 'rxjs';
import * as HIERARCHY from './hierarchy.json';
import * as SECURITY_MODES from './securityModes.json';
import * as AUTHENTICATION_TYPES from './authenticationTypes.json';
import * as USERS from './users.json';
import {
  Security,
  OpcuaNode,
  AuthenticationType,
  OpcuaUser,
  OpcuaStatus,
  OpcCertificate,
} from '@app/kosmyna-opcua/models';
import { InterceptorHttpParams } from '@app/core/classes/index.js';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class OpcuaService {
  private _baseUrl = '/opcua';
  constructor(private _kosmynaAuthService: DemoAuthService) {}

  /**
   * Get hierarchy from API.
   *
   * @returns {Observable<OpcuaNode[]>}       - Observable of array of nodes
   * @memberof OpcuaService
   */
  getHierarchy(): Observable<OpcuaNode> {
    return this._kosmynaAuthService.httpClientGet<OpcuaNode>(
      `${this._baseUrl}/get`
    );
  }

  /**
   * Save hierarchy to API.
   *
   * @param {OpcuaNode[]} node               - List of opcua nodes
   * @returns {Observable<any>}               - Observable of null value
   * @memberof OpcuaService
   */
  saveHierarchy(node: OpcuaNode): Observable<any> {
    return this._kosmynaAuthService.httpClientPost(
      `${this._baseUrl}/upload`,
      node
    );
  }

  /**
   * Get list of security modes.
   *
   * @returns {Observable<Security[]>}        - Observable of security modes with statuses
   * @memberof OpcuaService
   */
  getSecurityModes(): Observable<Security[]> {
    return this._kosmynaAuthService.httpClientGet(`${this._baseUrl}/modes`);
  }

  /**
   *  Update security mode statuses.
   *
   * @param {Security[]} modes                - List of current security modes with updated statuses
   * @returns {Observable<any>}               - Observable of null value
   * @memberof OpcuaService
   */
  updateSecurityModes(modes: Security[]): Observable<any> {
    return this._kosmynaAuthService.httpClientPut(
      `${this._baseUrl}/modes`,
      modes
    );
  }

  /**
   * Get list of security policies.
   *
   * @returns {Observable<AuthenticationType[]>}  - Observable of authentication types
   * @memberof OpcuaService
   */
  getPolicies(): Observable<AuthenticationType[]> {
    return this._kosmynaAuthService.httpClientGet(`${this._baseUrl}/policies`);
  }

  /**
   * Update security policies.
   *
   * @param {AuthenticationType[]} policies       - List of authentication types
   * @returns {Observable<any>}                   - Empty observable response
   * @memberof OpcuaService
   */
  updatePolicies(policies: AuthenticationType[]): Observable<any> {
    return this._kosmynaAuthService.httpClientPut(
      `${this._baseUrl}/policies`,
      policies
    );
  }

  /**
   * Get list of users in OPC UA.
   *
   * @returns {Observable<OpcuaUser[]>}           - Observable list of users
   * @memberof OpcuaService
   */
  getUsers(): Observable<OpcuaUser[]> {
    return this._kosmynaAuthService.httpClientGet(`${this._baseUrl}/users`);
  }

  /**
   * Add user to OPC UA.
   *
   * @param {OpcuaUser} user                      - User to add
   * @returns {Observable<OpcuaUser>}             - Created user with password
   * @memberof OpcuaService
   */
  addUser(user: OpcuaUser): Observable<OpcuaUser> {
    return this._kosmynaAuthService.httpClientPost(
      `${this._baseUrl}/users`,
      user
    );
  }

  /**
   * Update user by username.
   *
   * @param {string} username                     - Name of user to update
   * @param {OpcuaUser} user                      - Payload
   * @returns {Observable<any>}                   - Empty observable
   * @memberof OpcuaService
   */
  updateUser(username: string, user: OpcuaUser): Observable<any> {
    return this._kosmynaAuthService.httpClientPut(
      `${this._baseUrl}/users/${username}`,
      user
    );
  }

  /**
   * Reset user's password by name.
   *
   * @param {OpcuaUser} user                      - User to reset password
   * @returns {Observable<any>}                   - Observable user information with new password
   * @memberof OpcuaService
   */
  resetUserPassword(user: OpcuaUser): Observable<any> {
    return this._kosmynaAuthService.httpClientPut<OpcuaUser>(
      `${this._baseUrl}/users/${user.username}/password`,
      null
    );
  }

  /**
   * Delete user by name.
   *
   * @param {OpcuaUser} user                      - User to delete
   * @returns {Observable<any>}                   - Empty observable
   * @memberof OpcuaService
   */
  deleteUser(user: OpcuaUser): Observable<any> {
    return this._kosmynaAuthService.httpClientDelete(
      `${this._baseUrl}/users/${user.username}`
    );
  }

  /**
   * Get OPC UA status object.
   *
   * @returns {Observable<OpcuaStatus>}           - Status object
   * @memberof OpcuaService
   */
  getStatus(): Observable<OpcuaStatus> {
    return this._kosmynaAuthService.httpClientGet<OpcuaStatus>(
      `${this._baseUrl}/status`
    );
  }

  /**
   * Start OPC UA server.
   *
   * @returns {Observable<any>}                   - Empty observable result
   * @memberof OpcuaService
   */
  startServer(): Observable<any> {
    return this._kosmynaAuthService.httpClientPost(
      `${this._baseUrl}/start`,
      null,
      {
        params: new InterceptorHttpParams({ statusCodesToIgnore: [500] }),
      }
    );
  }

  /**
   * Stop the OPC UA server.
   *
   * @returns {Observable<any>}                   - Empty observable result
   * @memberof OpcuaService
   */
  stopServer(): Observable<any> {
    return this._kosmynaAuthService.httpClientPost(
      `${this._baseUrl}/stop`,
      null
    );
  }

  /**
   * Get connected clients certificates
   *
   * @returns {Observable<OpcCertificate[]>}        - List of clients certificates
   * @memberof OpcuaService
   */
  getCertificates(): Observable<OpcCertificate[]> {
    return this._kosmynaAuthService.httpClientGet(`${this._baseUrl}/certs`);
  }

  /**
   * Trust connected certificate
   *
   * @param {OpcCertificate} certificate            - Client certificate to trust
   * @returns {Observable<any>}                     - Empty observable response
   * @memberof OpcuaService
   */
  trustCertificate(certificate: OpcCertificate): Observable<any> {
    return this._kosmynaAuthService.httpClientPut(
      `${this._baseUrl}/certs/${certificate.id}/trust`,
      null
    );
  }

  /**
   * Reject connected certificate
   *
   * @param {OpcCertificate} certificate            - Client certificate to reject
   * @returns {Observable<any>}                     - Empty observable response
   * @memberof OpcuaService
   */
  unTrustCertificate(certificate: OpcCertificate): Observable<any> {
    return this._kosmynaAuthService.httpClientPut(
      `${this._baseUrl}/certs/${certificate.id}/untrust`,
      null
    );
  }

  /**
   * Disconnect client
   *
   * @param {OpcCertificate} certificate            - Client certificate to disconnect
   * @returns {Observable<any>}                     - Empty observable response
   * @memberof OpcuaService
   */
  deleteCertificate(certificate: OpcCertificate): Observable<any> {
    return this._kosmynaAuthService.httpClientDelete(
      `${this._baseUrl}/certs/${certificate.id}`
    );
  }

  /**
   * Disconnect all the clients
   *
   * @returns {Observable<any>}                     - Empty observable response
   * @memberof OpcuaService
   */
  deleteAllCertificates(): Observable<any> {
    return this._kosmynaAuthService.httpClientDelete(`${this._baseUrl}/certs`);
  }

  /**
   * Get server certificate
   *
   * @returns                                       - Certificate data
   * @memberof OpcuaService
   */
  getServerCertificate() {
    return this._kosmynaAuthService.httpClientGet(
      `${this._baseUrl}/certs/server`,
      {
        params: new InterceptorHttpParams({ statusCodesToIgnore: [404] }),
        headers: new HttpHeaders().set(
          'Content-type',
          'application/x-x509-ca-cert'
        ),
      }
    );
  }
}
