import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, interval, of } from 'rxjs';
import { DemoAuthService, ServerVersion, LocaleService } from '@app/core';
import { startWith, flatMap } from 'rxjs/operators';

import {
  CloudConnector,
  CloudConnectorStatus,
  DataHubNode,
  RawSub,
  StatsTopic,
  StatsTotal,
  ConnectorPassword,
} from '@app/datahub/models';

/**
 * A service for accessing the DataHub API
 */
@Injectable()
export class DatahubService {
  private readonly intervalMs = 30000; // Refresh interval set to 30 seconds
  private readonly baseUrl = '/datahub';
  private readonly cloudConnectorUrl = this.baseUrl + '/cloudconnectors';
  private readonly nodeUrl = this.baseUrl + '/nodes';
  private readonly rawsubUrl = this.baseUrl + '/rawsubs';
  private readonly versionUrl = this.baseUrl + '/version';

  /**
   * Cloud connectors stream
   *
   * @memberof DataHubService
   */
  private readonly cloudConnectorsStream$ = new BehaviorSubject<
    CloudConnector[]
  >([]);
  get cloudConnectors$(): BehaviorSubject<CloudConnector[]> {
    return this.cloudConnectorsStream$;
  }
  private readonly rawSubscriptionsStream$ = new BehaviorSubject<RawSub[]>([]);

  /**
   * Cloud connectors values array
   *
   * @readonly
   * @memberof DataHubService
   */
  get cloudConnectors() {
    return this.cloudConnectorsStream$.value;
  }

  get rawSubscriptions() {
    return this.rawSubscriptionsStream$.value;
  }

  get rawSubscriptions$() {
    return this.rawSubscriptionsStream$;
  }

  constructor(
    private auth: DemoAuthService,
    private locale: LocaleService
  ) {}
  /**
   * Emits changes
   *
   * @template T
   * @param {BehaviorSubject<T[]>} stream
   * @param {T} item
   * @memberof DataHubService
   */
  emitChange<T extends CloudConnector | RawSub>(
    stream: BehaviorSubject<T[]>,
    item: T
  ) {
    const index = stream
      .getValue()
      .findIndex(element => element.id === item.id);
    if (index === -1) {
      stream.getValue().push(item);
    } else {
      stream.getValue()[index] = item;
    }
    stream.next(stream.getValue());
  }

  emitRemoval<T extends CloudConnector | RawSub>(
    stream: BehaviorSubject<T[]>,
    item: T
  ) {
    stream.next(stream.getValue().filter(element => element.id !== item.id));
  }

  /**
   * Gets a list of all available DataHub Nodes
   *
   * @returns {Observable<DataHubNode[]>} An observable emitting a DataHubNode array
   * @memberof DatahubService
   */
  getNodes(): Observable<DataHubNode[]> {
    const url = this.locale.localizeUrl(this.nodeUrl);
    return this.auth.httpClientGet<DataHubNode[]>(url);
  }

  /**
   * Gets a specific DataHub Node by ID
   *
   * @param {string} id - The ID of the specified node
   * @returns {Observable<DataHubNode>} An observable emitting a single DataHubNode
   * @memberof DatahubService
   */
  getNode(id: string): Observable<DataHubNode> {
    const url = this.locale.localizeUrl(`${this.nodeUrl}/${id}`);
    return this.auth.httpClientGet<DataHubNode>(url);
  }

  /**
   * Gets a list of all available CloudConnectors
   *
   * @memberof DatahubService
   */
  getCloudConnectors() {
    const url = this.locale.localizeUrl(this.cloudConnectorUrl);
    this.auth
      .httpClientGet<CloudConnector[]>(this.cloudConnectorUrl)
      .subscribe(cloudConnectors =>
        this.cloudConnectorsStream$.next(
          cloudConnectors.sort((a, b) => a.name.localeCompare(b.name))
        )
      );
  }

  /**
   * Gets a specific CloudConnector by ID
   *
   * @param {string} id - The ID of the specified CloudConnector
   * @returns {Observable<CloudConnector>} An observable emitting a single CloudConnector
   * @memberof DatahubService
   */
  getCloudConnector(id: string): Observable<CloudConnector> {
    const url = this.locale.localizeUrl(`${this.cloudConnectorUrl}/${id}`);
    return this.auth.httpClientGet<CloudConnector>(url);
  }

  /**
   * Gets the password for a specified CloudConnector
   *
   * @param {string} id - The ID of the specified CloudConnector
   * @returns {Observable<ConnectorPassword>} An observable emitting a string of the CloudConnector password
   * @memberof DatahubService
   */
  getCloudConnectorPassword(id: string): Observable<ConnectorPassword> {
    const url = this.locale.localizeUrl(
      `${this.cloudConnectorUrl}/${id}/password`
    );
    return this.auth.httpClientGet<ConnectorPassword>(url);
  }

  /**
   * Get cloud connector status by id
   *
   * @param {string} id
   * @returns {Observable<CloudConnectorStatus>}
   * @memberof DatahubService
   */
  getCloudConnectorStatus(id: string) {
    const url = this.locale.localizeUrl(
      `${this.cloudConnectorUrl}/${id}/showStatus`
    );
    return this.auth.httpClientGet<CloudConnectorStatus>(url);
  }

  /**
   * Poll cloud connector status by id
   *
   * @param {string} id
   * @returns {Observable<CloudConnectorStatus>}
   * @memberof DatahubService
   */
  pollCloudConnectorStatus(id: string): Observable<CloudConnectorStatus> {
    const url = this.locale.localizeUrl(
      `${this.cloudConnectorUrl}/${id}/pollStatus`
    );
    return this.auth.httpClientGet<CloudConnectorStatus>(url);
  }

  /**
   * Gets a list of DataHub Nodes for a specified CloudConnector
   *
   * @param {string} id - The ID of the specified CloudConnector
   * @returns {Observable<DataHubNode[]>} An observable emitting a DataHubNode array
   * @memberof DatahubService
   */
  getNodesForCloudConnector(id: string): Observable<DataHubNode[]> {
    const url = this.locale.localizeUrl(
      `${this.cloudConnectorUrl}/${id}/nodes`
    );
    return this.auth.httpClientGet<DataHubNode[]>(url);
  }

  /**
   * Creates a new CloudConnector
   *
   * @param {CloudConnector} setup - A CloudConnector instance detailing the new CloudConnector
   * @returns {Observable<CloudConnector>} An observable emitting a string of the new CloudConnector's ID
   * @memberof DatahubService
   */
  createCloudConnector(setup: CloudConnector): Observable<CloudConnector> {
    const url = this.locale.localizeUrl(this.cloudConnectorUrl);
    return this.auth.httpClientPost<CloudConnector>(url, setup);
  }

  /**
   * Updates a given connector with attached parameters
   *
   * @param {CloudConnector} connector
   * @returns {Observable<any>}
   * @memberof DataHubService
   */
  updateCloudConnector(connector: CloudConnector) {
    const url = this.locale.localizeUrl(
      `${this.cloudConnectorUrl}/${connector.id}`
    );
    return this.auth.httpClientPut<CloudConnector>(url, connector);
  }

  /**
   * Enable cloud connector
   *
   * @param {CloudConnector} connector - Cloud connector object
   * @returns {Observable<any>} - An observable emitting operation result
   * @memberof DatahubService
   */
  enableCloudConnector(connector: CloudConnector): Observable<any> {
    const url = this.locale.localizeUrl(
      `${this.cloudConnectorUrl}/${connector.id}/enable`
    );
    return this.auth.httpClientPut(url, null);
  }

  /**
   * Disable cloud connector
   *
   * @param {CloudConnector} connector - Cloud connector object
   * @returns {Observable<any>} - An observable emitting operation result
   * @memberof DatahubService
   */
  disableCloudConnector(connector: CloudConnector): Observable<any> {
    const url = this.locale.localizeUrl(
      `${this.cloudConnectorUrl}/${connector.id}/disable`
    );
    return this.auth.httpClientPut(url, null);
  }

  /**
   * Updates a given node with the attached parameters
   *
   * @param {string} id - The ID of the specified node
   * @param {DataHubNode} node - The changes to make to the given DataHubNode (non-null properties)
   * @returns {Observable<any>} An observable emitting a any value for whether or not the request was successful
   * @memberof DatahubService
   */
  updateNode(id: string, node: DataHubNode): Observable<any> {
    const url = this.locale.localizeUrl(`${this.nodeUrl}/${id}`);
    const changesObject = {};
    for (const key in node) {
      if (node[key] !== null) {
        changesObject[key] = node[key];
      }
    }

    return this.auth.httpClientPut<DataHubNode>(url, <DataHubNode>(
      changesObject
    ));
  }

  /**
   * Deletes a given CloudConnector by ID
   *
   * @param {CloudConnector} connector - The ID of the specified CloudConnector
   * @returns {Observable<any>} An observable emitting a any value for whether or not the request was successful
   * @memberof DatahubService
   */
  deleteCloudConnector(connector: CloudConnector): Observable<any> {
    const url = this.locale.localizeUrl(
      `${this.cloudConnectorUrl}/${connector.id}`
    );
    return this.auth.httpClientDelete(url);
  }

  /**
   * Get topics
   *
   * @memberof DatahubService
   */
  getRawSubs() {
    const url = this.locale.localizeUrl(this.rawsubUrl);
    this.auth
      .httpClientGet<RawSub[]>(url)
      .subscribe(rawSubscriptions =>
        this.rawSubscriptionsStream$.next(
          rawSubscriptions.sort((a, b) => a.name.localeCompare(b.name))
        )
      );
  }

  /**
   * Creates a new topic
   *
   * @param {RawSub} topic - new topic data
   * @returns {Observable<RawSub>} An observable, emitting created topic
   * @memberof DatahubService
   */
  addTopic(topic: RawSub): Observable<RawSub> {
    const url = this.locale.localizeUrl(this.rawsubUrl);
    return this.auth.httpClientPost<RawSub>(url, topic);
  }

  /**
   * Deletes a given topic
   *
   * @param {RawSub} topic - topic to delete
   * @returns {Observable<any>} An observable emitting removal results
   * @memberof DatahubService
   */
  removeTopic(topic: RawSub): Observable<any> {
    const url = this.locale.localizeUrl(`${this.rawsubUrl}/${topic.id}`);
    return this.auth.httpClientDelete(url);
  }

  /**
   * Updates a given topic
   *
   * @param {RawSub} topic - topic to update
   * @returns {Observable<any>} An observable emitting updating results
   * @memberof DatahubService
   */
  updateTopic(topic: RawSub): Observable<any> {
    const url = this.locale.localizeUrl(`${this.rawsubUrl}/${topic.id}`);
    return this.auth.httpClientPut<RawSub>(url, topic);
  }

  getCloudConnectorsWithRawSubs(): Observable<CloudConnector[]> {
    return this.cloudConnectorsStream$.pipe(
      flatMap(cloudConnectors => {
        return this.rawSubscriptionsStream$.pipe(
          flatMap(rawsubs => {
            const results: CloudConnector[] = [];
            cloudConnectors.forEach(cloudConnector => {
              const rawsubConnector = cloudConnector as CloudConnector;
              const matchingRawsub = rawsubs.find(
                x => x.cloudConnectorID === rawsubConnector.id
              );
              if (matchingRawsub) {
                rawsubConnector.rawsub = matchingRawsub.name;
              }
            });
            return of(cloudConnectors);
          })
        );
      })
    );
  }

  /**
   * Gets the version of the DataHub server instance servicing requests
   *
   * @returns {Observable<ServerVersion>} An observable emitting a DataHubVersion object
   * @memberof DatahubService
   */
  getServerVersion(): Observable<ServerVersion> {
    const url = this.locale.localizeUrl(this.versionUrl);
    return this.auth.httpClientGet<ServerVersion>(this.versionUrl);
  }

  /**
   * Get statistics by topic
   *
   * @returns {Observable<StatsTopic[]>}
   * @memberof DatahubService
   */
  getStats(): Observable<StatsTopic[]> {
    const url = this.locale.localizeUrl(`${this.baseUrl}/stats`);
    return interval(this.intervalMs).pipe(
      startWith(-1),
      flatMap(() => this.auth.httpClientGet<StatsTopic[]>(url))
    );
  }

  /**
   * Get total statistics
   *
   * @returns {Observable<StatsTotal>}
   * @memberof DatahubService
   */
  getStatsTotal(): Observable<StatsTotal> {
    const url = this.locale.localizeUrl(`${this.baseUrl}/stats/totals`);
    return interval(this.intervalMs).pipe(
      startWith(-1),
      flatMap(() => this.auth.httpClientGet<StatsTotal>(url))
    );
  }

  /**
   * Reset current statistics
   *
   * @returns {Observable<any>}
   * @memberof DatahubService
   */
  resetStats(): Observable<any> {
    const url = this.locale.localizeUrl(`${this.baseUrl}/stats/reset`);
    return this.auth.httpClientPut(url, null);
  }

  /**
   * Enable topic subscription
   *
   * @param {RawSub} topic        - Topic
   * @returns {Observable<any>}   - An observable that emits operation result
   * @memberof DatahubService
   */
  enableTopic(topic: RawSub): Observable<any> {
    const url = this.locale.localizeUrl(
      `${this.baseUrl}/rawsubs/${topic.id}/enable`
    );
    return this.auth.httpClientPut(url, undefined);
  }

  /**
   * Disable topic subscription
   *
   * @param {RawSub} topic        - Topic
   * @returns {Observable<any>}   - An observable that emits operation result
   * @memberof DatahubService
   */
  disableTopic(topic: RawSub): Observable<any> {
    const url = this.locale.localizeUrl(
      `${this.baseUrl}/rawsubs/${topic.id}/disable`
    );
    return this.auth.httpClientPut(url, undefined);
  }
}
