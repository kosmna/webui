import { Schema } from '@app/kosmyna-cc/models/schema';

export interface Provider {
  id: string;
  name: string;
  editable: boolean;
  schema?: Schema;
  hidden: boolean;
}
