import { CloudConnector } from '@app/datahub/models/cloud-connector';
/**
 * Common properties of the CloudConnector classes
 * @property id
 * @property IP address or hostname of MQTT servers
 * @property clientID
 * @property Cloud Connector name
 * @property TCP port (usualy 1883 for "tcp" scheme and 8883 for "ssl")
 * @property Network protocol scheme ("tcp" or "ssl")
 * @property Data topic for publishing data
 * @property Login username
 * @property Root CA certificate for "ssl" scheme
 * @property Login password
 * @property rawsub - The name of the "internal topic" (rawsub) from the API
 */
export interface CloudConnector {
  id?: string;
  address: string;
  clientID: string;
  name: string;
  port: number;
  scheme: string;
  topic: string;
  username: string;
  password?: string;
  sslRootCA?: string;
  rawsub?: string;
  uri?: string;
  state?: CloudConnectorStatus;
}

export interface CloudConnectorStatus {
  lastError: {
    code: number;
    msg: string;
    msgCode: string;
  };
  status: string;
}

/**
 * Data for a specific rawsub topic
 * @property cloudConnectorID - the ID of the cloudconnector this is related to
 * @property description - description of the rawsub topic
 * @property id - id of the rawsub topic
 * @property name - the name of the topic
 */
export class RawSub {
  cloudConnector: CloudConnector;
  cloudConnectorID: string;
  description: string;
  id: string;
  name: string;
  enabled?: boolean;
}

export interface ConnectorPassword {
  password: string;
}
