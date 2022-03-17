export class FlatResource {
  objectID: number;
  objectName: string;
  instanceID: number;
  resourceID: number;
  name: string;
  protected: boolean;
  value: string;
  constructor(object: DeviceObject, instance: DeviceObjectInstance, resource: DeviceObjectInstanceResource) {
    this.objectID = object.id;
    this.objectName = object.name;
    this.instanceID = instance.id;
    this.resourceID = resource.id;
    this.name = resource.name;
    this.protected = resource.protected;
    this.value = resource.value;
  }
}

export class DeviceObject {
  id: number;
  instances: DeviceObjectInstance[];
  name: string;
  data: FlatResource[];
}

export class DeviceObjectInstance {
  id: number;
  resources: DeviceObjectInstanceResource[];
}

export class DeviceObjectInstanceResource {
  id: number;
  name: string;
  protected: boolean;
  value: string;
}
