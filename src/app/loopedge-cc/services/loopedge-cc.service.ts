import { Injectable } from '@angular/core';
import { DemoAuthService, LocaleService } from '@app/core';
import { Observable } from 'rxjs';
import {
  Provider,
  Instance,
  Schema,
  Subscription,
} from '@app/kosmyna-cc/models';
import { map } from 'rxjs/operators/map';

@Injectable()
export class DemoCcService {
  private _providersUrl = '/cc/providers';
  private _instancesUrl = '/cc/instances';

  constructor(
    private _kosmynaAuthService: DemoAuthService,
    private _localeService: LocaleService
  ) {}

  /**
   * * Fetch providers list.
   *
   * @returns {Observable<Provider[]>}      - Observable of providers
   * @memberof DemoCcService
   */
  getProviders(): Observable<Provider[]> {
    return this._kosmynaAuthService
      .httpClientGet<Provider[]>(
        this._localeService.localizeUrl(this._providersUrl)
      )
      .pipe(map(providers => providers.filter(provider => !provider.hidden)));
  }

  /**
   * * Get schema for a specifier provider.
   *
   * @param {Provider} provider             - Provider
   * @returns {Observable<Schema>}          - Observable of provider's schema
   * @memberof DemoCcService
   */
  getProviderSchema(provider: Provider): Observable<Schema> {
    return this._kosmynaAuthService.httpClientGet<Schema>(
      this._localeService.localizeUrl(
        `${this._providersUrl}/${provider.id}/schema`
      )
    );
  }

  /**
   * Instances routines
   */

  /**
   * * Get instances list.
   *
   * @returns {Observable<Instance[]>}        - Observable array of instances
   * @memberof DemoCcService
   */
  getInstances(): Observable<Instance[]> {
    return this._kosmynaAuthService.httpClientGet(
      this._localeService.localizeUrl(this._instancesUrl)
    );
  }

  getInstance(instanceId: string): Observable<Instance> {
    return this._kosmynaAuthService.httpClientGet(
      this._localeService.localizeUrl(`${this._instancesUrl}/${instanceId}`)
    );
  }

  /**
   * * Create a new connector instance
   *
   * @param {Instance} payload                - New instance data
   * @returns {Observable<Instance>}          - Observable of created instance
   * @memberof DemoCcService
   */
  createInstance(payload: Instance): Observable<Instance> {
    return this._kosmynaAuthService.httpClientPost(
      this._localeService.localizeUrl(this._instancesUrl),
      payload
    );
  }

  /**
   * * Update connector instance
   *
   * @param {Instance} payload                - Instance data
   * @returns {Observable<any>}               - Observable without result
   * @memberof DemoCcService
   */
  updateInstance(payload: Instance): Observable<any> {
    return this._kosmynaAuthService.httpClientPut(
      this._localeService.localizeUrl(
        `${this._instancesUrl}/${payload.instanceId}`
      ),
      payload
    );
  }

  /**
   * * Enable connector instance
   *
   * @param {Instance} instance               - Instance to enable
   * @returns {Observable<any>}               - Just empty Observable
   * @memberof DemoCcService
   */
  enableInstance(instance: Instance): Observable<any> {
    return this._kosmynaAuthService.httpClientPut(
      this._localeService.localizeUrl(
        `${this._instancesUrl}/${instance.instanceId}/enable`
      ),
      undefined
    );
  }

  /**
   * * Disable connector instance
   *
   * @param {Instance} instance               - Instance to disable
   * @returns {Observable<any>}               - Just empty Observable
   * @memberof DemoCcService
   */
  disableInstance(instance: Instance): Observable<any> {
    return this._kosmynaAuthService.httpClientPut(
      this._localeService.localizeUrl(
        `${this._instancesUrl}/${instance.instanceId}/disable`
      ),
      undefined
    );
  }

  /**
   * * Remove connector instance
   *
   * @param {Instance} instance               - Instance to remove
   * @returns {Observable<any>}               - Just empty Observable
   * @memberof DemoCcService
   */
  removeInstance(instance: Instance): Observable<any> {
    return this._kosmynaAuthService.httpClientDelete(
      this._localeService.localizeUrl(
        `${this._instancesUrl}/${instance.instanceId}`
      )
    );
  }

  /**
   * * Fetch subscription topics for particular connector
   *
   * @param {string} instanceId               - Instance identifier
   * @returns {Observable<Subscription[]>}    - Observable with subscription topics array
   * @memberof DemoCcService
   */
  getConnectorSubscriptions(instanceId: string): Observable<Subscription[]> {
    return this._kosmynaAuthService.httpClientGet<Subscription[]>(
      this._localeService.localizeUrl(
        `${this._instancesUrl}/${instanceId}/subs`
      )
    );
  }

  /**
   * * Disable subscription topic
   *
   * @param {Subscription} subscription       - Subscription topic
   * @param {string} instanceId               - Instance identifier
   * @returns {Observable<any>}               - Just empty observable
   * @memberof DemoCcService
   */
  disableSubscriptionTopic(
    subscription: Subscription,
    instanceId: string
  ): Observable<any> {
    return this._kosmynaAuthService.httpClientPut(
      this._localeService.localizeUrl(
        `${this._instancesUrl}/${instanceId}/subs/${encodeURIComponent(
          subscription.topicId
        )}/disable`
      ),
      undefined
    );
  }

  /**
   * * Enable subscription topic
   *
   * @param {Subscription} subscription       - Subscription topic
   * @param {string} instanceId               - Instance identifier
   * @returns {Observable<any>}               - Just empty observable
   * @memberof DemoCcService
   */
  enableSubscriptionTopic(
    subscription: Subscription,
    instanceId: string
  ): Observable<any> {
    return this._kosmynaAuthService.httpClientPut(
      this._localeService.localizeUrl(
        `${this._instancesUrl}/${instanceId}/subs/${encodeURIComponent(
          subscription.topicId
        )}/enable`
      ),
      undefined
    );
  }

  /**
   * * Remove subscription topic
   *
   * @param {Subscription} subscription       - Subscription topic
   * @param {string} instanceId               - Instance identifier
   * @returns {Observable<any>}               - Just empty observable
   * @memberof DemoCcService
   */
  removeSubscriptionTopic(
    subscription: Subscription,
    instanceId: string
  ): Observable<any> {
    return this._kosmynaAuthService.httpClientDelete(
      `${this._instancesUrl}/${instanceId}/subs/${encodeURIComponent(
        subscription.topicId
      )}`
    );
  }

  /**
   * * Create subscription topic.
   *
   * @param {Subscription} subscription       - Subscription topic data
   * @param {string} instanceId               - Cloud connector instance identifier
   * @returns {Observable<Subscription>}      - Observable of created topic
   * @memberof DemoCcService
   */
  createSubscriptionTopic(
    subscription: Subscription,
    instanceId: string
  ): Observable<Subscription[]> {
    return this._kosmynaAuthService.httpClientPost<any>(
      this._localeService.localizeUrl(
        `${this._instancesUrl}/${instanceId}/subs`
      ),
      subscription
    );
  }
}
