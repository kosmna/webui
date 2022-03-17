import { Injectable } from '@angular/core';
import { Observable ,  BehaviorSubject } from 'rxjs';
import {
  DeviceRegister,
  OmaBinding,
} from '@app/cosmyna/models';
import { map } from 'rxjs/operators';


@Injectable()
export class RegistersStoreService {


  private registerSource$: BehaviorSubject<DeviceRegister[]> = new BehaviorSubject<DeviceRegister[]>([]);
  private dataStore: { registers: DeviceRegister[] } = { registers: [] };

  get registers$(): Observable<DeviceRegister[]> {
    /** Add Topics */
    return this.registerSource$.asObservable()
            .pipe(map(res => this.makeRegTopics(res)));
  }
  /**
   * Returns register List
   *
   * @readonly
   * @type {DeviceRegister[]}
   * @memberof RegistersStoreService
   */
  get registerList(): DeviceRegister[] {
    return this.dataStore.registers;
  }
  constructor() { }

  deleteRegister(register: DeviceRegister): void {
    const registerList = this.registerList;
    registerList.splice(registerList.findIndex(element => element.id === register.id), 1);
    this.registerSource$.next(registerList);
  }
  /**
   * Deleting Multiple registers
   *
   * @param {DeviceRegister[]} regArr
   * @memberof RegistersStoreService
   */
  deleteRegisters(regArr: DeviceRegister[]): void {
    let registers = this.registerList;
    if (regArr.length === registers.length ) {
      registers = [];
    } else {
      regArr.forEach((reg) => {
        registers.splice(registers.findIndex(element => element.id === reg.id), 1);
      });
    }

    this.registerSource$.next(registers);
  }
  /**
   *  Adds registers to list. Use it when initilizing list
   *
   * @param {DeviceRegister[]} registerList
   * @memberof RegistersStoreService
   */
  addRegisters(registerList: DeviceRegister[]): void {
    this.dataStore.registers = registerList;
    this.registerSource$.next(this.dataStore.registers);
  }
  /**
   * Add single Register
   *
   * @param {DeviceRegister} register
   * @memberof RegistersStoreService
   */
  addRegister(register: DeviceRegister): void {
    const regArr = this.registerList;
    regArr.push(register);

    this.registerSource$.next(regArr);
  }
  /**
   * Update register in list
   *
   * @param {DeviceRegister} register
   * @memberof RegistersStoreService
   */
  updateRegister(register: DeviceRegister): void {
    const registerList = this.registerList;
    const index = registerList.findIndex(element => element.id === register.id);
    registerList[index] = { ...registerList[index], ...register };
    this.registerSource$.next(registerList);
  }
  /**
   * Used to make ipso and raw topics
   * Called in map method
   * @param {DeviceRegister[]} registerList
   * @returns {DeviceRegister[]}
   * @memberof RegistersStoreService
   */
  makeRegTopics(registerList:  DeviceRegister[]):  DeviceRegister[] {
    registerList.forEach(register => {
      const rawTopic = `cosmyna.raw.${register.deviceId}.${register.id}`;
      let ipsoTopic = '';
      const oma = register.oma;
        if (oma) {
          ipsoTopic = `cosmyna.standard.${register.deviceId}.${oma['objectId']}.${oma['instanceId']}.${oma['resourceId']}`;
        }
        register.rawTopic = rawTopic;
        register.ipsoTopic = ipsoTopic;
    });
    return registerList;
  }

  /**
   * Add Oma Bindings
   *
   * @param {OmaBinding} omaBinding
   * @memberof RegistersStoreService
   */
  setRegisterOma(omaBinding: OmaBinding ): void {
    const registerList = this.registerList;
    const reg = registerList.find(element => element.id === omaBinding.registerId);
    reg.oma = omaBinding;
    this.registerSource$.next(registerList);
  }
  /**
   * Delete Oma Bindings
   *
   * @param {OmaBinding} omaBinding
   * @memberof RegistersStoreService
   */
  deleteRegisterOma(omaBinding: OmaBinding): void {
    const registerList = this.registerList;
    const reg = registerList.find(element => element.id === omaBinding.registerId);
    reg.oma = undefined;
    this.registerSource$.next(registerList);
  }

  deviceRegisters(deviceId: string): string[] {
    const reg = this.dataStore.registers.filter((x) => x.deviceId === deviceId).map((b) => b.id);
    return reg;
  }

  addStatus(statusArr: any[]): void {
    statusArr.forEach((statusObj: any) => {
      const {id, status} = statusObj;
      const reg = this.dataStore.registers.find((x) => x.id === id);
      reg.status = status;
    });
    this.registerSource$.next(this.dataStore.registers);
  }
}
