export interface OpcuaNode {
  id?: string;
  name: string;
  type: NodeType;
  data?: TagData | any;
  children: Array<OpcuaNode>;
}

type NodeType = 'FOLDER' | 'DEVICE' | 'TAG';

export interface TagData {
  topic: string;
  dataType: TopicDataType;
}

type TopicDataType =
  | 'bool'
  | 'int16'
  | 'uint16'
  | 'int32'
  | 'uint32'
  | 'float'
  | 'double'
  | 'string';

export enum DataType {
  'bool',
  'int16',
  'uint16',
  'int32',
  'uint32',
  'float',
  'double',
  'string',
}
