
import { interfaceList, networkNode, networkNodeList } from '@app/cosmyna/services/dummy';
import { of ,  Observable } from 'rxjs';
import { Iface, NetworkNode } from '@app/cosmyna/models';

export const NetworkDiscoveryServiceStub = {
    getIfaces(): Observable<Iface[]> {
        return of(interfaceList);
    },
    disableIface(name: string): Observable<Object> {
        return of({});
    },
    enableIface(name: string): Observable<Object> {
        return of({});
    },
    getNodes(): Observable<NetworkNode[]> {
        return of(networkNodeList);
    },
    getNode(): Observable<NetworkNode[]> {
        return of(networkNodeList);
    }
};

