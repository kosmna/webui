import { Tag } from '@app/marketplace/models';

export interface Repository {
  name: string;
  tags: Array<string>;
  tagsInfo?: Array<Tag>;
}
