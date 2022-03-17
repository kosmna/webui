import { SensorTable, PRNInfo, ConnectBody, PRNConnectionStatus, SensonodeInterface } from '@app/sensonode/models';
import { linkTable, dummyInterfaces, prnInfo, sensonodeSerialInterfaces } from '@app/sensonode/mock/dummyData';

import { of ,  Observable } from 'rxjs';

export const sensonodeServiceStub = {
    _checkSpeed(speed: string): string {
        return '115200';
    },
    getMacAddress(): string {
        return 'e';
    },
    getCloudCik(): Observable<any> {
        return of('CIKUniqueNumber');
    },
    activeCloud(): Observable<any> {
        return of(true);
    },
    listSerialInterfaces(): Observable<SensonodeInterface[]> {
        return of(sensonodeSerialInterfaces);
    },
    connectSensonode(sensonodeInterface: SensonodeInterface): Observable<any> {
        return of(true);
    },
    disconnectSensonode(sensonodeInterface: SensonodeInterface): Observable<any> {
        return of(true);
    },
    sendCommandV(sensonodeInterface: SensonodeInterface): Observable<PRNInfo> {
        return of(prnInfo);
    },
    sendCommandLA(sensonodeInterface: SensonodeInterface): Observable<SensorTable[]> {
        return of(linkTable);
    },
    sendCommandJ0(sensonodeInterface: SensonodeInterface): Observable<boolean> {
        return of(true);
    },
    sendCommandJ1(sensonodeInterface: SensonodeInterface): Observable<boolean> {
        return of(true);
    },
    sendCommandJR(sensonodeInterface: SensonodeInterface): Observable<any> {
        return of(true);
    },
    sendCommandNID(sensonodeInterface: SensonodeInterface, sensor: SensorTable): Observable<any> {
        return of(true);
    },
    sendCommandNDE(sensonodeInterface: SensonodeInterface, sensor: SensorTable): Observable<any> {
        return of(true);
    },
    sendCOmmandNVF(sensonodeInterface: SensonodeInterface, sensor: SensorTable): Observable<any> {
        return of(true);
    }
};

