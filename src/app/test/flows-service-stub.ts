
import { Observable ,  of } from 'rxjs';
import { Flow } from '@app/flows/models';


const flow: Flow = {
    id: 'test Id',
    type: 'test type',
    label: 'test label',
    nodes: 100,
    link: 'test'
};

export const FlowServiceStub = {
    getFlows(): Observable<Flow[]> {
        return of([flow]);
    },
    deleteFlows(): Observable<any> {
        return of(true);
    },
    getFlowsDetail(): Observable<Flow[]> {
        return of([flow]);
    }
};
