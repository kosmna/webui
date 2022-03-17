import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, interval, forkJoin, Subject } from 'rxjs';
import { tap, map, startWith, switchMap } from 'rxjs/operators';

import {
  BootstrapServer,
  Cert,
  CpuInfo,
  DeviceInfo,
  DeviceMangCloud,
  DeviceMangCode,
  DeviceObject,
  DeviceStatus,
  FlatResource,
  HostCountry,
  HostDescription,
  HostDns,
  HostInfo,
  HostNTP,
  HostTime,
  HostTimezone,
  MemoryInfo,
  NetworkConfig,
  NetworkInterface,
  PostCert,
  SerialInterface,
  StorageInfo,
  Timezones,
  UploadId,
  UploadRequest,
  ZerotierNetwork,
  Modem,
  DeviceIdentity,
  ModemConfig,
  DmTemplate,
  DeviceMangCloudUrl,
} from '@app/system/models';
import { DemoAuthService, LocaleService } from '@app/core/services';
import { CrtStore } from '@app/system/models/certstore';
import { BackupCloud } from '@app/system/models/backup-restore-cloud';
import { InterceptorHttpParams } from '@app/core/classes';
import { ServerVersion } from '@app/core/models';
/**
 * A service for accessing the Device Management (dm) API
 */
@Injectable()
export class DeviceManagementService {
  deviceInfo: DeviceInfo;
  private readonly baseUrl = '/dm';
  private readonly deviceInfoUrl = this.baseUrl + '/deviceinfo';
  private readonly interval = 10000; // Refresh interval in MS
  private bootstrapServers: BootstrapServer[];
  private cpuInfo: CpuInfo[];
  private zerotierNetworks: ZerotierNetwork[];
  private deviceStatusSource$: BehaviorSubject<
    DeviceStatus[]
  > = new BehaviorSubject([]);
  get deviceStatus$(): BehaviorSubject<DeviceStatus[]> {
    return this.deviceStatusSource$;
  }
  private networkInterfacesSource$: BehaviorSubject<
    NetworkInterface[]
  > = new BehaviorSubject([]);
  get networkInterfaces(): BehaviorSubject<NetworkInterface[]> {
    return this.networkInterfacesSource$;
  }
  private serialInterfacesSource$: BehaviorSubject<
    SerialInterface[]
  > = new BehaviorSubject([]);
  get serialInterfaces(): BehaviorSubject<SerialInterface[]> {
    return this.serialInterfacesSource$;
  }
  private datasourceDeviceObjectsSource$: BehaviorSubject<
    DeviceObject[]
  > = new BehaviorSubject([]);
  get datasourceDeviceObjects(): BehaviorSubject<DeviceObject[]> {
    return this.datasourceDeviceObjectsSource$;
  }

  private friendlyNameChangeSource$: Subject<boolean> = new Subject();
  get friendlyNameChange$(): Observable<boolean> {
    return this.friendlyNameChangeSource$.asObservable();
  }

  constructor(
    private auth: DemoAuthService,
    private locale: LocaleService
  ) {}

  /**
   * Get bootstrap servers
   *
   * @returns {Observable<BootstrapServer[]>} - An observable that emits bootstrap servers array
   * @memberof DeviceManagementService
   */
  getAllBootstrapServers(): Observable<BootstrapServer[]> {
    if (this.bootstrapServers) {
      return of(this.bootstrapServers);
    }

    const url = this.locale.localizeUrl(`${this.baseUrl}/bsconfig`);
    return this.auth.httpClientGet(url);
  }

  /**
   * Create ne bootstrap server
   *
   * @param {BootstrapServer} server - Bootstrap server.
   * @returns {Observable<string>} - An observable that emits created bootstrap server id
   * @memberof DeviceManagementService
   */
  createBootstrapServer(server: BootstrapServer): Observable<string> {
    const newServer = {
      dtls: server.dtls,
      endpoint: server.endpoint,
      hostname: server.hostname,
      port: server.port,
    };

    const url = this.locale.localizeUrl(`${this.baseUrl}/bsconfig`);
    return this.auth
      .httpClientPost(url, newServer)
      .pipe(map(response => response['id']));
  }

  /**
   * Get bootstrap server details
   *
   * @param {string} id - Bootstrap server ID
   * @returns {Observable<BootstrapServer>} - An observable that emits bootstrap server info
   * @memberof DeviceManagementService
   */
  getBootstrapServerDetails(id: string): Observable<BootstrapServer> {
    if (this.bootstrapServers) {
      const server = this.bootstrapServers.find(x => x.id === id);
      if (server) {
        return of(server);
      }
    }

    const url = this.locale.localizeUrl(`${this.baseUrl}/bsconfig/${id}`);
    return this.auth.httpClientGet(url);
  }

  /**
   * Update bootstrap server
   *
   * @param {BootstrapServer} server - Updated bootstrap server info
   * @param {string} [id] - Bootstrap server ID
   * @returns {Observable<any>} - An observable that emits operation result
   * @memberof DeviceManagementService
   */
  updateBootstrapServer(server: BootstrapServer, id?: string): Observable<any> {
    let serverID: string;
    if (id) {
      serverID = id;
    } else {
      serverID = server.id;
    }

    const changes = {
      dtls: server.dtls,
      endpoint: server.endpoint,
      hostname: server.hostname,
      port: server.port,
    };

    const url = this.locale.localizeUrl(`${this.baseUrl}/bsconfig/${serverID}`);
    return this.auth.httpClientPut(url, changes);
  }

  /**
   * Delete bootstrap server
   *
   * @param {string} id - Bootstrap server ID
   * @returns {Observable<any>} - An observable that emits operation results
   * @memberof DeviceManagementService
   */
  deleteBootstrapServer(id: string): Observable<any> {
    const url = this.locale.localizeUrl(`${this.baseUrl}/bsconfig/${id}`);
    return this.auth.httpClientDelete(url);
  }

  /**
   * Get device information
   *
   * @returns {Observable<DeviceInfo>} - An observable that emits device information
   * @memberof DeviceManagementService
   */
  getDeviceInfo(): Observable<DeviceInfo> {
    if (this.deviceInfo) {
      return of(this.deviceInfo);
    }
    const url = this.locale.localizeUrl(this.deviceInfoUrl);
    return this.auth.httpClientGet<DeviceInfo>(url).pipe(
      tap(deviceInfo => {
        this.deviceInfo = deviceInfo;
      })
    );
  }

  /**
   * Get cpu information
   *
   * @returns {Observable<CpuInfo[]>} - An observable that emits CPU information
   * @memberof DeviceManagementService
   */
  getCpuInfo(): Observable<CpuInfo[]> {
    if (this.cpuInfo) {
      return of(this.cpuInfo);
    }

    const url = this.locale.localizeUrl(`${this.deviceInfoUrl}/cpu`);
    return this.auth.httpClientGet<CpuInfo[]>(url).pipe(
      tap(cpuInfo => {
        this.cpuInfo = cpuInfo;
      })
    );
  }

  /**
   * Update memory information
   *
   * @returns {Subscription} - Subscription for memory information
   * @memberof DeviceManagementService
   */
  getMemoryInfo(): Observable<MemoryInfo> {
    const url = this.locale.localizeUrl(`${this.deviceInfoUrl}/mem`);
    return interval(this.interval).pipe(
      startWith(-1),
      switchMap(() => this.auth.httpClientGet<MemoryInfo>(url))
    );
  }

  /**
   * Get network interfaces information
   *
   * @memberof DeviceManagementService
   */
  getNetworkInterfaces(): void {
    const url = this.locale.localizeUrl(`${this.deviceInfoUrl}/net`);
    this.auth
      .httpClientGet<NetworkInterface[]>(url)
      .subscribe(networkInterfaces => {
        this.networkInterfacesSource$.next(networkInterfaces);
      });
  }
  /**
   *  Get network interfaces without updating behavioral subject
   *
   */
  getNetInterfaces(): Observable<NetworkInterface[]> {
    const url = this.locale.localizeUrl(`${this.deviceInfoUrl}/net`);
    return this.auth.httpClientGet<NetworkInterface[]>(url);
  }

  /**
   * Get serial interfaces information
   *
   * @memberof DeviceManagementService
   */
  getSerialInterfaces(): void {
    const url = this.locale.localizeUrl(`${this.deviceInfoUrl}/ser`);
    this.auth
      .httpClientGet<SerialInterface[]>(url)
      .subscribe(serialInterfaces => {
        this.serialInterfacesSource$.next(serialInterfaces);
      });
  }

  /**
   * Update storage information
   *
   * @returns {Subscription} - Subscription for storage information
   * @memberof DeviceManagementService
   */
  getStorageInfo(): Observable<StorageInfo> {
    const url = this.locale.localizeUrl(`${this.deviceInfoUrl}/stor`);
    return interval(this.interval).pipe(
      startWith(-1),
      switchMap(_ => this.auth.httpClientGet<StorageInfo>(url))
    );
  }

  /**
   * Get network configuration information for network page
   *
   * @returns {Observable<NetworkConfig[]>} - An obsrvable that emits network configurations
   * @memberof DeviceManagementService
   */
  getAllNetworkConfigs(): Observable<NetworkConfig[]> {
    const url = this.locale.localizeUrl(`${this.baseUrl}/ifconfig`);
    return this.auth.httpClientGet<NetworkConfig[]>(url);
  }

  /**
   * Get network interface configuration
   *
   * @param {string} name - Interface name
   * @returns {Observable<NetworkConfig>} - An observable that emits network interface configuration
   * @memberof DeviceManagementService
   */
  getNetworkConfig(name: string): Observable<NetworkConfig> {
    const url = this.locale.localizeUrl(`${this.baseUrl}/ifconfig/${name}`);
    return this.auth.httpClientGet(url);
  }

  /**
   * Update network interface configuration
   *
   * @param {NetworkConfig} config - Interface configuration
   * @returns {Observable<any>} - An observable that emits operation result
   * @memberof DeviceManagementService
   */
  updateNetworkConfig(config: NetworkConfig): Observable<any> {
    const url = this.locale.localizeUrl(
      `${this.baseUrl}/ifconfig/${config.name}`
    );
    return this.auth.httpClientPut(url, config);
  }

  /**
   * Get device status
   *
   * @returns {Observable<DeviceStatus[]>} - An observable that emits device status array
   * @memberof DeviceManagementService
   */
  getDeviceStatus(): Observable<DeviceStatus[]> {
    const url = this.locale.localizeUrl(`/lwm2m/status`);
    this.auth
      .httpClientGet<DeviceStatus>(url)
      .subscribe(deviceStatus => this.deviceStatusSource$.next([deviceStatus]));
    return this.deviceStatusSource$;
  }

  /**
   * Reboot device
   *
   * @returns {Observable<any>} - An observable that emits operation results
   * @memberof DeviceManagementService
   */
  rebotDevice(): Observable<any> {
    const url = this.locale.localizeUrl(`${this.baseUrl}/status/reboot`);
    return this.auth.httpClientPut(url, null);
  }

  /**
   * Get all objects
   *
   * @memberof DeviceManagementService
   */
  getAllObjects(): void {
    const url = this.locale.localizeUrl(`/lwm2m/objects`);
    this.auth.httpClientGet<DeviceObject[]>(url).subscribe(objects => {
      objects.forEach(object => {
        object['data'] = [];
        if (object.instances) {
          object.instances.forEach(instance => {
            instance.resources.forEach(resource => {
              const flatResource = new FlatResource(object, instance, resource);
              object.data.push(flatResource);
            });
          });
        }
      });
      this.datasourceDeviceObjectsSource$.next(objects);
    });
  }

  /**
   * Get cloud status
   *
   * @returns {Observable<DeviceMangCloud>} - An observable that emits cloud activation status
   * @memberof DeviceManagementService
   */
  getCloudstatus(): Observable<DeviceMangCloud> {
    const url = this.locale.localizeUrl(`${this.baseUrl}/cloud`);
    return this.auth.httpClientGet(url);
  }

  /**
   * Deactivate cloud
   *
   * @returns {Observable<any>} - An observable that emits operation results
   * @memberof DeviceManagementService
   */
  deactivateCloud(): Observable<any> {
    const url = this.locale.localizeUrl(`${this.baseUrl}/cloud`);
    return this.auth.httpClientDelete(url);
  }

  /**
   * Register device in a cloud
   *
   * @param {DeviceMangCode} body - Device activatin code
   * @returns {Observable<any>} - An observable that emits operation results
   * @memberof DeviceManagementService
   */
  registerDevice(body: DeviceMangCode): Observable<any> {
    const url = this.locale.localizeUrl(`${this.baseUrl}/cloud`);
    return this.auth.httpClientPost(url, body);
  }

  /**
   * Get resource value
   *
   * @param {number} objectID - Object identifier
   * @param {number} instanceID - Instance identifier
   * @param {number} resourceID - Resource identifier
   * @returns {Observable<string>} - An observable that emits resource value
   * @memberof DeviceManagementService
   */
  getResourceValue(
    objectID: number,
    instanceID: number,
    resourceID: number
  ): Observable<string> {
    const url = this.locale.localizeUrl(
      `${this.baseUrl}/objects/${objectID}/${instanceID}/${resourceID}`
    );
    return this.auth.httpClientGet(url).pipe(map(result => result['value']));
  }

  /**
   * Get list of zerotier networks
   *
   * @returns {Observable<ZerotierNetwork[]>} - An observable that emits ZeroTier networks
   * @memberof DeviceManagementService
   */
  getZerotierNetworks(): Observable<ZerotierNetwork[]> {
    // if (this.zerotierNetworks) {
    //   return of(this.zerotierNetworks);
    // }

    const url = this.locale.localizeUrl(`${this.baseUrl}/zerotier/networks`);

    // Observable returns after the set interval.
    // "startWith(-1)"" means that it emits a value "-1" at the start
    // Effectively this is an observable with an interval that also loads instantly at the start
    return interval(this.interval).pipe(
      startWith(-1),
      switchMap(() => {
        return this.auth.httpClientGet<ZerotierNetwork[]>(url).pipe(
          map(arr => {
            return arr.map(net => {
              net.addrs = net.addrs.map(x => {
                const c = x.split('/');
                return c[0];
              });
              return net;
            });
          })
        );
      })
    );
  }

  /**
   * Get Zeritier network details
   *
   * @param {string} id - Zerotier network ID
   * @returns {Observable<ZerotierNetwork>} - An observable that emits zerotier network details
   * @memberof DeviceManagementService
   */
  getZerotierNetworkDetails(id: string): Observable<ZerotierNetwork> {
    if (this.zerotierNetworks) {
      const network = this.zerotierNetworks.find(x => x.id === id);
      if (network) {
        return of(network);
      }
    }

    const url = this.locale.localizeUrl(
      `${this.baseUrl}/zerotier/network/${id}`
    );
    return this.auth.httpClientGet(url);
  }

  /**
   * Join zerotier network
   *
   * @param {string} id - Zerotier network ID
   * @returns {Observable<any>} - An observable that emits operation results
   * @memberof DeviceManagementService
   */
  joinZerotierNetwork(id: string): Observable<any> {
    const url = this.locale.localizeUrl(`${this.baseUrl}/zerotier/networks`);
    return this.auth.httpClientPost(url, { id: id });
  }

  /**
   * Leave zerotier network
   *
   * @param {string} id - Zerotier network ID
   * @returns {Observable<any>} - An observable that emits operation results
   * @memberof DeviceManagementService
   */
  leaveZerotierNetwork(id: string): Observable<any> {
    const url = this.locale.localizeUrl(
      `${this.baseUrl}/zerotier/networks/${id}`
    );
    return this.auth.httpClientDelete(url);
  }

  /**
   * Get server version information
   *
   * @returns {Observable<ServerVersion>} - An observable that emits server version
   * @memberof DeviceManagementService
   */
  getServerVersion(): Observable<ServerVersion> {
    const url = this.locale.localizeUrl(`${this.baseUrl}/version`);
    return this.auth.httpClientGet<ServerVersion>(url);
  }

  // /dm/deviceinfo/crt
  /**
   * Get certificate information
   *
   * @returns {Observable<Cert>} - An observable that emits certificate information
   * @memberof DeviceManagementService
   */
  getCrt(): Observable<Cert> {
    const url = this.locale.localizeUrl(`${this.deviceInfoUrl}/crt`);
    return this.auth.httpClientGet(url);
  }

  // /dm/deviceinfo/crt
  /**
   * Create certificate
   *
   * @param {PostCert} cert - Certificate information
   * @returns {Observable<any>} - An observable that emits operation results
   * @memberof DeviceManagementService
   */
  postCrt(cert: PostCert): Observable<any> {
    const url = this.locale.localizeUrl(`${this.deviceInfoUrl}/crt`);
    return this.auth.httpClientPost(url, cert);
  }

  getCrtStore(): Observable<CrtStore[]> {
    const url = this.locale.localizeUrl(`${this.baseUrl}/certstore`);
    // return of(Crt_Store);
    return this.auth.httpClientGet<CrtStore[]>(url);
  }

  getCrtStoreDetail(id: string): Observable<CrtStore> {
    const url = this.locale.localizeUrl(`${this.baseUrl}/certstore/${id}`);
    return this.auth.httpClientGet<CrtStore>(url);
  }

  deleteCrtStore(id: string): Observable<any> {
    const url = this.locale.localizeUrl(`${this.baseUrl}/certstore/${id}`);
    return this.auth.httpClientDelete(url);
  }

  createCrtStoreUploadSession(uploadReq: UploadRequest): Observable<UploadId> {
    const url = this.locale.localizeUrl(`${this.baseUrl}/certstore`);
    return this.auth.httpClientPost<any>(url, uploadReq);
  }

  uploadCrtStore(id: string, file: any): Observable<any> {
    const headers = new Headers();
    const options = { headers: null };
    const formData: FormData = new FormData();
    headers.append('Content-Type', 'multipart/form-data');
    options.headers = headers;

    formData.append('uploadFile', file);

    const url = this.locale.localizeUrl(`${this.baseUrl}/certstore/${id}`);
    return this.auth.httpClientPut<any>(url, formData, options);
  }

  deviceIdentity(): Observable<DeviceIdentity> {
    const url = this.locale.localizeUrl(`${this.deviceInfoUrl}/identity`);
    return this.auth.httpClientGet<DeviceIdentity>(url);
  }
  /**
   * Create configuration backup
   *
   * @returns {Observable<any>} - An observable that emits configuration JSON.
   * @memberof DeviceManagementService
   */
  backupConfiguration(): Observable<any> {
    const url = this.locale.localizeUrl(`${this.baseUrl}/backup`);
    return this.auth.httpClientGet(url);
  }

  /**
   * Restore configuration from backup
   *
   * @param {*} payload - Configuration JSON
   * @returns {Observable<any>} - Am observable that emits operation result, in this case null.
   * @memberof DeviceManagementService
   */
  restoreConfiguration(payload: any): Observable<any> {
    const url = this.locale.localizeUrl(`${this.baseUrl}/backup`);
    return this.auth.httpClientPut(url, payload);
  }

  /**
   * Create backup template
   *
   * @returns {Observable<any>} - An observable that emits template
   * @memberof DeviceManagementService
   */
  backupConfigurationTemplate(): Observable<any> {
    const url = this.locale.localizeUrl(`${this.baseUrl}/backup/template`);
    return this.auth.httpClientGet(url);
  }

  getListCloudBackups(): Observable<BackupCloud[]> {
    const url = this.locale.localizeUrl(`${this.baseUrl}/backup/cloud`);
    return this.auth.httpClientGet(url, {
      params: new InterceptorHttpParams({ statusCodesToIgnore: [500] }),
    });
  }

  saveCloudBackup(): Observable<any> {
    const url = this.locale.localizeUrl(`${this.baseUrl}/backup/cloud`);
    return this.auth.httpClientPost(url, null);
  }

  restoreCloudBackup(id: string): Observable<any> {
    const url = this.locale.localizeUrl(`${this.baseUrl}/backup/cloud/${id}`);
    return this.auth.httpClientPut(url, null);
  }
  /**
   * Restore configuration template
   *
   * @param {*} payload - Configuration template JSON
   * @returns {Observable<any>} - An observable that emits operation result, in this case null.
   * @memberof DeviceManagementService
   */
  restoreConfigurationTemplate(payload: any): Observable<any> {
    const url = this.locale.localizeUrl(`${this.baseUrl}/backup/template`);
    return this.auth.httpClientPut(url, payload);
  }
  /**
   *  Create upload Session
   * @param {UploadRequest} uploadReq
   * @returns {Observable<UploadId>}
   * @memberof DeviceManagementService
   */
  createUploadSession(uploadReq: UploadRequest): Observable<UploadId> {
    const url = this.locale.localizeUrl(`${this.baseUrl}/swupdate`);
    return this.auth.httpClientPost<any>(url, uploadReq);
  }
  /**
   * Upload File for software updates
   * @param {string} id
   * @param {File} file
   * @returns {Observable<any>}
   * @memberof DeviceManagementService
   */
  uploadSwupdate(id: string, file: File): Observable<any> {
    const headers = new Headers();
    const options = { headers: null };
    const formData: FormData = new FormData();
    headers.append('Content-Type', 'multipart/form-data');
    options.headers = headers;

    formData.append('uploadFile', file);

    const url = this.locale.localizeUrl(`${this.baseUrl}/swupdate/${id}`);
    return this.auth.httpClientPut<any>(url, formData, options);
  }
  /**
   * Get Host Information
   *
   * @returns {Observable<HostInfo>}
   * @memberof DeviceManagementService
   */
  getHostInfo(): Observable<HostInfo> {
    const url = this.locale.localizeUrl(`${this.baseUrl}/host/info`);
    return this.auth.httpClientGet<HostInfo>(url);
  }
  /**
   * Get list of timezones
   * @returns {Observable<Timezones>}
   * @memberof DeviceManagementService
   */
  getTimezones(): Observable<Timezones> {
    const url = this.locale.localizeUrl(`${this.baseUrl}/host/timezones`);
    return this.auth.httpClientGet<Timezones>(url);
  }

  /**
   * Update host country
   *
   * @returns {*}
   * @memberof DeviceManagementService
   */
  updateHostCountry(body: HostCountry): Observable<any> {
    const url = this.locale.localizeUrl(`${this.baseUrl}/host/country`);
    return this.auth.httpClientPut<any>(url, body);
  }
  /**
   * Update host country
   *
   * @returns {*}
   * @memberof DeviceManagementService
   */
  updateHostdescription(body: HostDescription): Observable<any> {

    const url = this.locale.localizeUrl(`${this.baseUrl}/host/description`);
    return this.auth.httpClientPut<any>(url, body)
            .pipe(
              tap(() => this.friendlyNameChangeSource$.next(true))
            );
  }
  /**
   * Update host country
   *
   * @returns {*}
   * @memberof DeviceManagementService
   */
  updateHostDns(body: HostDns): Observable<any> {
    const url = this.locale.localizeUrl(`${this.baseUrl}/host/dns`);
    return this.auth.httpClientPut<any>(url, body);
  }
  /**
   * Update host country
   *
   * @returns {*}
   * @memberof DeviceManagementService
   */
  updateHostTimezone(body: HostTimezone): Observable<any> {
    const url = this.locale.localizeUrl(`${this.baseUrl}/host/timezone`);
    return this.auth.httpClientPut<any>(url, body);
  }
  /**
   * Update ntp servers
   *
   * @param {HostNTP} body
   * @returns {Observable<any>}
   * @memberof DeviceManagementService
   */
  updateHostNtp(body: HostNTP): Observable<any> {
    const url = this.locale.localizeUrl(`${this.baseUrl}/host/ntp`);
    return this.auth.httpClientPut(url, body);
  }

  getDeviceTime(): Observable<HostTime> {
    const url = this.locale.localizeUrl(`${this.baseUrl}/host/time`);
    return this.auth.httpClientGet(url);
  }

  /**
   * LTE Modem Interface
   * @returns {Observable<Modem[]>}
   * @memberof DeviceManagementService
   */
  mobileBroadbandInterfaces(): Observable<Modem[]> {
    const url = this.locale.localizeUrl(`${this.deviceInfoUrl}/modem`);
    return interval(this.interval).pipe(
      startWith(-1),
      switchMap(() => this.auth.httpClientGet<Modem[]>(url))
    );
  }

  /*
   *
   * Modem Config for network Page
   *
   */
  getModemConfigs(): Observable<ModemConfig[]> {
    const infoUrl = this.locale.localizeUrl(`${this.deviceInfoUrl}/modem`);
    const configUrl = this.locale.localizeUrl(`${this.baseUrl}/modem`);

    const modemConfig$ = this.auth.httpClientGet<ModemConfig[]>(configUrl);

    const interfaces$ = this.auth.httpClientGet<Modem[]>(infoUrl);
    return forkJoin(modemConfig$, interfaces$).pipe(
      map(res => {
        const modemConfigInfo = res[0];
        const modemInfo = res[1];
        return modemConfigInfo.map(y => {
          const modem = modemInfo.find(x => x.imei === y.imei);
          const { apnAssigned } = modem;
          return Object.assign(y, { apnAssigned });
        });
      })
    );
  }

  updateModemConfig(imei: string, body: any): Observable<any> {
    const payload = { apn: body.apn };
    const url = this.locale.localizeUrl(`${this.baseUrl}/modem/${imei}`);
    return this.auth.httpClientPut(url, payload);
  }

  getModemConfig(name: string): Observable<any> {
    const url = this.locale.localizeUrl(`${this.baseUrl}/modem/${name}`);
    return this.auth.httpClientGet(url);
  }

  /**
   * List available configuration items
   *
   * @returns {Observable<DmTemplate>}
   * @memberof DeviceManagementService
   */
  getTemplate(): Observable<DmTemplate> {
    const url = this.locale.localizeUrl(`${this.baseUrl}/template`);
    // return of(Templates);
    return this.auth.httpClientGet(url);
  }

  /**
   * Apply configuration template
   *
   * @param {*} template
   * @returns {Observable<any>}
   * @memberof DeviceManagementService
   */
  updateTemplate(file: File): Observable<any> {
    const url = this.locale.localizeUrl(`${this.baseUrl}/template`);

    return this.auth.httpClientPut(url, file);
  }

  /**
   * Create and return a configuration template
   *
   * @returns {Observable<any>}
   * @memberof DeviceManagementService
   */
  createTemplate(template): Observable<any> {
    const url = this.locale.localizeUrl(`${this.baseUrl}/template`);
    return this.auth.httpClientPost(url, template);
  }
  /**
   * Reads file from disk and passes it to handler
   *
   * @private
   * @param {File} file - File content
   * @param {(json: string) => any} handler - Function that handle result of reading
   * @memberof DeviceManagementService
   */
  readFile(file: File, handler: (json: string) => any) {
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      handler(fileReader.result as any);
    };
    fileReader.readAsText(file);
  }

  /**
   * Get cloud activation url
   *
   * @returns {Observable<DeviceMangCloudUrl>}
   * @memberof DeviceManagementService
   */
  getCloudUrl(): Observable<DeviceMangCloudUrl> {
    const url = this.locale.localizeUrl(`${this.baseUrl}/cloud/url`);
    return this.auth.httpClientGet(url);
  }
  /**
   * Set cloud url
   *
   * @param {string} body
   * @returns {Observable<any>}
   * @memberof DeviceManagementService
   */
  setCloudUrl(body: DeviceMangCloudUrl): Observable<any> {
    const url = this.locale.localizeUrl(`${this.baseUrl}/cloud/url`);
    return this.auth.httpClientPut(url, body);
  }

  /**
   * set to default cloud url activation
   *
   * @returns {Observable<any>}
   * @memberof DeviceManagementService
   */
  setToDefaultCloudUrl(): Observable<any> {
    const url = this.locale.localizeUrl(
      `${this.baseUrl}/cloud/url/resetToDefault`
    );
    return this.auth.httpClientPut(url, null);
  }
}
