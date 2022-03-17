import { Repository, Tag } from '@app/marketplace/models';
import { Observable } from 'rxjs';

export interface Registry {
  address: string;
  id?: string;
  name: string;
  username: string;
  password: string;
  tlsSkipVerify: boolean;
  repositories?: Observable<Repository[]>;
  repositoryInfo?: (Registry, Repository, string) => Observable<Tag>;
}
