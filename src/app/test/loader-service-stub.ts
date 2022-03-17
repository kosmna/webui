import { Subject } from 'rxjs';

const isLoadingSource = new Subject<boolean>();
const isLoadingbarSource = new Subject<boolean>();

export const LoaderStub = {
    isLoadingSource,
    isLoadingbarSource,
};
