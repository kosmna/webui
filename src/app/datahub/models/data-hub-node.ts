// TODO: Give these properties apt descriptions

/**
 * A Node object recieved from the DataHub API
 * @property cloudConnectorID
 * @property dataType
 * @property description
 * @property id
 * @property inputTopic
 * @property instanceID
 * @property name
 * @property objectID
 * @property outputTopic
 * @property pubEnabled
 * @property resourceID
 */
export class DataHubNode {
  cloudConnectorID: string;
  dataType: string;
  description: string;
  id: string;
  inputTopic: string;
  instanceID: string;
  name: string;
  objectID: number;
  outputTopic: string;
  pubEnabled: true;
  resourceID: number;
}
